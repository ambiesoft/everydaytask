

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
    await onGetTasks2();
  } finally {
    finishWaitUI();
  }
}
async function onGetTasks2() {
  var params = {
    spreadsheetId: userData.spreadID,
    ranges: ['Tasks!A:C'],
  };

  try {
    response = await gapi.client.sheets.spreadsheets.values.batchGet(params);
    console.log(response);
    // valueRange is a set of "ID", "Task" and "Action"
    // valueRanges[0][0] is a row of column names
    if (!response.result.valueRanges || response.result.valueRanges[0].values.length <= 1) {
      console.log("No tasks found");
      return;
    }

    clearTasks();
    for (i = 1; i < response.result.valueRanges[0].values.length; ++i) {
      taskdata = response.result.valueRanges[0].values[i];
      createTask({
        id: taskdata[0],
        name: taskdata[1],
        action: taskdata[2],
      });
    }
  } catch (error) {
    console.log('error: ' + error.result.error.message);
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
function onTaskAction(el) {
  console.log(el);
  console.log(el.dataset);

  runRemoteScript(
    (data) => {
      console.log(data);
    },
    "checkTask",
    {
      year: STARTYEAR,
      month: STARTMONTH,
      date: STARTDATE,
      hours: STARTHOURS,
      minutes: STARTMINUTES,
      seconds: STARTSECONDS,
      id: el.dataset.taskid
    }
  );
  const url = el.dataset.taskaction;
  if (isValidURL(url)) {
    window.open(url, "_blank");
  }
  el.textContent = CHECKMARK;
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
    userData.spreadID = spread.result.spreadsheetId; // { expires: 30 });
    userData.spreadURL = spread.result.spreadsheetUrl;
    userData.taskSheetID = spread.result.sheets[1].properties.sheetId;
    console.log("spread id is set", userData.spreadID);
  } catch (e) {
    console.error(e);
  }
}
