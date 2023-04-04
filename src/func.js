

function gisLoaded() {
  console.log("gisLoaded is called")

  // initialize a new token client with your web app's client ID
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (tokenResponce) => {
      // This will be called after 'requestToken'
      console.log("tokenResponce called")
      console.log(tokenResponce)
      toggleLoginButton();
      if (tokenResponce.access_token != null) {
        if (!userData.spreadID) {
          OnGetSpread();
        }
      }
    }
  });
  console.log("tokenClient", tokenClient)
  gisInited = true;
}

function gapiLoaded() {
  console.log("gapiLoaded is called")
  gapi.load('client', initializeGapiClient);
}

/**
* Callback after the API client is loaded. Loads the
* discovery doc to initialize the API.
*/
async function initializeGapiClient() {
  console.log("initializeGapiClient is called")
  await gapi.client.init({
    // apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC_SCRIPT, DISCOVERY_DOC_DRIVE, DISCOVERY_DOC_SHEETS],
  });
  gapiInited = true;
  toggleLoginButton();
}

window.onload = () => {
  console.log("window.onload has been called");

  // let token = Cookies.get('token');
  // console.log("Cookie", token);
  // if (token && !gapi.client.getToken()) {
  //   gapi.client.setToken(token);
  //   console.log("setToken called");
  // }
  console.log(gapi);
  toggleLoginButton();
}

function ensureToken() {
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    // https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1
    tokenClient.requestAccessToken();
    return false;
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    // tokenClient.requestAccessToken({ prompt: '' });
    return true;
  }
}

function revokeToken() {
  const token = gapi.client.getToken();
  if (token !== null) {
    google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken('');
    toggleLoginButton(false);
  }
}

async function onGetTasks() {
  if (!userData.spreadID) {
    OnGetSpread();
    return;
  }
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  try {
    startWaitUI();
    let tasks = await doGetTasks();
    clearTasks();
    for (task of tasks) {
      createTask(task);
    }

  } finally {
    finishWaitUI();
  }
}

function onShowSpread() {
  if (!userData.spreadID) {
    OnGetSpread();
    return;
  }
  window.open(getTaskSheetUrl());
}

function onAddNewTask() {

}
function clearTasks() {
  document.getElementById('container').innerHTML = '';
}
function createTask(task) {
  // テンプレートから要素を取得する
  const template = document.getElementById("taskTemplate");
  const itemwrapper = template.content.querySelector(".itemwrapper");
  const text = template.content.querySelector(".text");
  const taskbutton = template.content.querySelector(".taskbutton");
  const taskeditbutton = template.content.querySelector(".taskeditbutton");
  const editbutton = template.content.querySelector(".editbutton");
  const itemedit = template.content.querySelector(".itemedit");
  const itemeditinputname = template.content.querySelector(".itemeditinputname");
  const itemeditinputaction = template.content.querySelector(".itemeditinputaction");

  taskbutton.dataset.taskrow = task.row;
  taskbutton.dataset.taskid = task.id;
  taskbutton.dataset.taskname = task.name;
  taskbutton.dataset.taskaction = task.action;
  taskbutton.id = task.id;

  taskeditbutton.dataset.id = task.id;
  editbutton.dataset.id = task.id;
  itemedit.id = "itemedit" + task.id;

  text.textContent = task.name;
  itemeditinputname.value = task.name;
  itemeditinputaction.value = task.action;

  taskbutton.textContent = task.checked ? CHECKMARK : UNCHECKMARK;
  document.getElementById('container').appendChild(itemwrapper.cloneNode(true));
}












function onShowEdit(el) {
  console.log(el.dataset);
  document.getElementById("itemedit" + el.dataset.id).style.display = "block";
}
function onEditItem(el) {
  console.log(el.dataset);
}
/**
* Called when user clicks a checkbox of the task
* @param {element} el - button element of the checkbox, it has dataset of taskname, taskid and taskaction
*/
async function onTaskAction(el) {
  console.log(el);
  console.log(el.dataset);

  if (!userData.spreadID) {
    OnGetSpread();
    return;
  }
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  try {
    // Find the row of taskid
    let tasks = await doGetTasks();
    let row = -1;
    for (task of tasks) {
      if (task.id == el.dataset.taskid) {
        row = task.row;
        break;
      }
    }
    if (row < 0) {
      showError(`No rows found from taskid(${el.dataset.taskid})`);
      return;
    }

    // Add check on remote cell
    await doTaskAction(row);

    // open URL action if any
    const url = el.dataset.taskaction;
    if (isValidURL(url)) {
      window.open(url, "_blank");
    }
    el.textContent = CHECKMARK;
  } catch (err) {
    console.log(err);
  }
}

function getFile() {
  const request = gapi.client.drive.files.get({
    fileId: FILEID
  });
  request.execute((data) => {
    console.log(data);
  })
}

async function OnGetSpread() {
  try {
    startWaitUI();
    await OnGetSpread2();
  } finally {
    finishWaitUI();
  }
}
async function OnGetSpread2() {
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  try {
    startWaitUI();
    await getSpread();
  } catch (e) {
    console.error(e);
  }
}

async function getSpread() {
  try {
    let spread = await doGetSpread();
    if (!spread) {
      spread = await doCreateSpread();
    }
    if (!spread) {
      throw new Error("Failed to get Google Sheet");
    }
    console.log("spread", spread);
    userData.spreadID = spread.result.spreadsheetId;
    userData.spreadURL = spread.result.spreadsheetUrl;
    userData.taskSheetID = spread.result.sheets[1].properties.sheetId;
    console.log("spread id is set", userData.spreadID);

    // find log sheet
    userData.todaySheetID = null;
    userData.todaySheetYear =null;
    userData.todaySheetMonth = null;
    for (i = 2; i < spread.result.sheets.length; ++i) {
      let title = spread.result.sheets[i].title;
      const matchResult = title.match(/^(\d{4})\/\(d{1,2})$/);  // 2023/4
      if (matchResult) {
        const year = matchResult[1];
        const month = matchResult[2];
        if (STARTYEAR == year && STARTMONTH == month) {
          userData.todaySheetID = spread.result.sheets[i].properties.sheetId;
          userData.todaySheetYear = year;
          userData.todaySheetMonth = month;
          break;
        }
      }
    }
    if(!userData.taskSheetID) {
      // create new log sheet
      
    }


  } catch (e) {
    console.error(e);
  }
}
