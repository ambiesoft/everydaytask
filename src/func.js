
async function gisLoaded() {
  console.log("gisLoaded is called")

  google.accounts.id.initialize({
    client_id: CLIENT_ID, // Replace with your Google Client ID
    "data-callback": "handleCredentialResponse",
  });
  // // You can skip the next instruction if you don't want to show the "Sign-in" button
  // google.accounts.id.renderButton(
  //   document.getElementById("buttonDiv"), // Ensure the element exist and it is a div to display correcctly
  //   { theme: "outline", size: "large" }  // Customization attributes
  // );
  // google.accounts.id.prompt(); // Display the One Tap dialog

  // initialize a new token client with your web app's client ID
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    // https://developers.google.com/identity/protocols/oauth2/scopes
    scope: SCOPES,
    callback: async (tokenResponce) => {
      // This will be called after 'requestToken'
      console.log("tokenResponce called")
      console.log("tokenResponce", tokenResponce);
      toggleLoginButton();
      if (tokenResponce.expires_in) {
        // set timer when token expires
        setTimeout((access_token) => {
          // check if the previous token == current token 
          console.log("token compare", gapi.client.getToken(), access_token);
          if (gapi.client.getToken().access_token == access_token) {
            // the token expires
            if (confirm("セッションの有効期限が切れました。ページをリロードする必要があります。今リロードしますか？")) {
              // "Yes" がクリックされた場合の処理
              location.reload();
            } else {
              // "No" がクリックされた場合の処理
              gapi.client.setToken();
            }
          }
        },
          tokenResponce.expires_in * 1000, // timeout
          tokenResponce.access_token);
        console.log(`Timer is set in ${tokenResponce.expires_in * 1000}`);
      }
      if (tokenResponce.access_token != null) {
        authFailed = false;
        document.getElementById("id_please_login").innerText = "";
        try {
          if (!userData.spreadID) {
            await onGetSpread();
          }
          await onGetTasks();
        } catch (err) {
          console.error(err);
        }
      } else {
        authFailed = true;
        document.getElementById("id_please_login").innerText = str_please_login_again_to_authorize;
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
  console.log("gapi", gapi);

  let today = new Date().toISOString().substr(0, 10);
  document.querySelectorAll('.id_target_date').forEach((e) => {
    e.value = today;
  });

  toggleLoginButton();
}


function handleCredentialResponse(response) {
  // Here we can do whatever process with the response we want
  // Note that response.credential is a JWT ID token
  console.log("Encoded JWT ID token: ", response);
  const parsed = parseJwt(response.credential);
  console.log("parsed", parsed);
  cred = response.credential;
  // gapi.auth2.authorize({
  //   client_id: CLIENT_ID,
  //   response_type: 'permission', // Access Token.
  //   scope: SCOPES,
  //   login_hint: parsed.sub,
  // }, function (result) {
  //   console.log(result);
  //   onGetTasks();
  // });

  // onGetTasks();
}
function onLogin() {
  onGetTasks();
}

function isLoggedIn() {
  let loggedin = gapi.client.getToken() != null;
  loggedin &= gisInited;
  loggedin &= gapiInited;
  console.log("loggedin", loggedin);
  return loggedin;
}
function ensureToken() {
  console.log("ensureToken", gapi.client.getToken());
  console.log("ensureToken", tokenClient);
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    // https://developers.google.com/identity/protocols/oauth2/web-server#httprest_1
    tokenClient.requestAccessToken({
      prompt: !authFailed ? "none" : "",
    });
    return false;
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    // tokenClient.requestAccessToken({ prompt: '' });
    return true;
  }
}

function onLogoff() {
  clearTasksDom();
  revokeToken();
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
    onGetSpread();
    return;
  }
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  try {
    startWaitUI(Array.from(document.querySelectorAll(`[btnType=getTask]`)));
    let tasks = await doGetTasks();
    if (tasks) {
      clearTasksDom();
      for (let task of tasks) {
        appendTaskDom(task);
      }
      showBottomTaskButtons(tasks.length > 7);
      updateTitle(tasks);
      gTasks = tasks;
    } else {
      if (tasks !== null) {
        showError("Tasks must be not empty or null");
      }
    }
  } finally {
    finishWaitUI(Array.from(document.querySelectorAll(`[btnType=getTask]`)));
  }
}

function onShowSpread() {
  if (!userData.spreadID) {
    onGetSpread();
    return;
  }
  window.open(getTaskSheetUrl());
}

async function onAddNewTask() {
  if (!userData.spreadID) {
    onGetSpread();
    return;
  }
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  try {
    startWaitUI(Array.from(document.querySelectorAll(`[btnType=addTask]`)));
    const newTask = await doAddNewTask();
    gTasks.push(newTask);

    // New task created with default name, open edit mode
    appendTaskDom(newTask);

    // edit it
    await onEditItem2(newTask.id);

    // select all text of itemeditname element
    document.getElementById("itemeditinputname" + newTask.id).select();

    // scroll to editting element
    scrollToElement(document.getElementById("itemeditinputaction" + newTask.id));

    updateTitle(gTasks);
  } catch (err) {
    showError(err);
  } finally {
    finishWaitUI(Array.from(document.querySelectorAll(`[btnType=addTask]`)));
  }
}

function clearTasksDom() {
  document.getElementById('itemcontainer').innerHTML = '';
}

function appendTaskDom(task) {
  if (task instanceof Task) {
    // テンプレートから要素を取得する
    const template = document.getElementById("taskTemplate");
    const itemwrapper = template.content.querySelector(".itemwrapper");
    const text = template.content.querySelector(".text");
    const timetext = template.content.querySelector(".timetext");
    const taskbutton = template.content.querySelector(".taskbutton");
    const taskeditbutton = template.content.querySelector(".taskeditbutton");
    const editbutton = template.content.querySelector(".editbutton");
    const itemedit = template.content.querySelector(".itemedit");
    const itemeditinputname = template.content.querySelector(".itemeditinputname");
    const itemeditinputaction = template.content.querySelector(".itemeditinputaction");

    taskbutton.dataset.taskrow = task.getRow();
    taskbutton.dataset.taskid = task.getId();
    taskbutton.dataset.taskname = task.getName();
    taskbutton.dataset.taskaction = task.getAction();
    taskbutton.dataset.taskstarttime = task.getStartTime();
    taskbutton.dataset.taskendtime = task.getEndTime();
    taskbutton.dataset.taskenabled = task.isEnabled();

    taskbutton.id = task.getId();

    taskeditbutton.dataset.id = task.getId();
    editbutton.dataset.id = task.getId();
    editbutton.id = "editbutton" + task.getId();
    itemedit.id = "itemedit" + task.getId();

    text.textContent = task.getName();
    text.id = "tasktext" + task.getId();

    timetext.textContent = task.getTimeRangeAsString();

    itemeditinputname.id = "itemeditinputname" + task.getId();
    itemeditinputname.value = task.getName();

    itemeditinputaction.id = "itemeditinputaction" + task.getId();
    itemeditinputaction.value = task.getAction() ? task.getAction() : "";

    taskbutton.textContent = (task.isChecked() ? CHECKMARK : UNCHECKMARK);
    taskbutton.setAttribute("origText", taskbutton.textContent);
    editbutton.setAttribute("origText", editbutton.textContent);

    document.getElementById('itemcontainer').appendChild(itemwrapper.cloneNode(true));

    if (!task.isEnabled()) {
      document.getElementById(task.getId()).className = "taskbutton-disabled";
    }
  } else if (task instanceof Separator) {
    const template = document.getElementById("separatorTemplate");
    const itemseparator = template.content.querySelector(".itemseparator");
    const itemsep_h2 = template.content.querySelector(".itemsep_h2");
    itemsep_h2.innerText = task.getHeadText();
    document.getElementById('itemcontainer').appendChild(itemseparator.cloneNode(true));
  } else if (task instanceof ItemEmpty) {
    const template = document.getElementById("emptyTemplate");
    const emptyTask = template.content.querySelector(".emptyTask");
    document.getElementById('itemcontainer').appendChild(emptyTask.cloneNode(true));
  } else {
    console.error("Unkown task type")
  }
}

function toggleEdit(taskid) {
  let itemedit = document.getElementById("itemedit" + taskid);
  if (itemedit.style.display == "block") {
    itemedit.style.display = "none";
  } else {
    itemedit.style.display = "block";
  }
}
function onShowEdit(taskbutton) {
  console.log(taskbutton.dataset);
  toggleEdit(taskbutton.dataset.id);
}
async function onEditItem(eb) {
  const taskid = eb.dataset.id;
  onEditItem2(taskid);
}
async function onEditItem2(taskid) {
  let taskbutton = document.getElementById(taskid);
  let taskeditbutton = document.getElementById("editbutton" + taskid);

  console.log(taskbutton.dataset);
  console.log("taskbutton", taskbutton);

  // input element
  let itemeditinputname = document.getElementById("itemeditinputname" + taskid);
  let itemeditinputaction = document.getElementById("itemeditinputaction" + taskid);
  let inputtext = itemeditinputname.value;
  let inputaction = itemeditinputaction.value;

  // output element is taskbutton
  tasktext = document.getElementById("tasktext" + taskid);

  if (!userData.spreadID) {
    onGetSpread();
    return;
  }
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  try {
    startWaitUI(taskeditbutton);

    // Add check on remote cell
    let resUnused = await doTaskEditItem(taskid, inputtext, inputaction);
    console.log("res", resUnused);
    taskbutton.dataset.taskname = inputtext;
    taskbutton.dataset.taskaction = inputaction;
    tasktext.textContent = inputtext;

    toggleEdit(taskid);
  } catch (err) {
    console.error(err);
    showErrorWithCode(err.result.error.code);
  } finally {
    finishWaitUI(taskeditbutton);
  }

}

/**
* Called when user clicks a checkbox of the task
* @param {element} el - button element of the checkbox, it has dataset of taskname, taskid and taskaction
*/
async function onTaskAction(el) {
  console.log(el);
  console.log(el.dataset);

  if (el.dataset.taskenabled != "true") {
    alert(`このタスクの有効な時刻は${el.dataset.taskstarttime}から${el.dataset.taskendtime}です。`);
    return;
  }
  if (!userData.spreadID) {
    onGetSpread();
    return;
  }
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  try {
    startWaitUI(el);

    // Add check on remote cell
    if (!await doTaskAction(el.dataset.taskid)) {
      return;
    }

    // call setCheck
    for (let task of gTasks) {
      if (el.dataset.taskid == task.getId()) {
        task.setChecked(true);
        break;
      }
    }
    // open URL action if any
    if (el.dataset.taskaction) {
      const urls = el.dataset.taskaction.split(/\s+/);
      console.log("urls", urls);
      for (url of urls) {
        if (isValidURL(url)) {
          console.log("Opening", url);
          window.open(url, "_blank");
        } else {
          console.error(`${url} is not a valid url`);
        }
      }
    }
    el.textContent = CHECKMARK;
    el.setAttribute("origText", el.textContent);

    updateTitle(gTasks);
  } catch (err) {
    console.error(err);
    showErrorWithCode(err.result.error.code);
  } finally {
    finishWaitUI(el);
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

async function onGetSpread() {
  try {
    startWaitUI(Array.from(document.querySelectorAll(`[btnType=editTask]`)));
    await onGetSpread2();
  } finally {
    finishWaitUI(Array.from(document.querySelectorAll(`[btnType=editTask]`)));
  }
}
async function onGetSpread2() {
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  try {
    await onGetSpread3();
  } catch (e) {
    console.error(e);
  }
}

async function onGetSpread3() {
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
    userData.todaySheetYear = null;
    userData.todaySheetMonth = null;
    for (i = 2; i < spread.result.sheets.length; ++i) {
      let title = spread.result.sheets[i].properties.title;
      const matchResult = title.match(/^(\d{4})\/(\d{1,2})$/);  // 2023/4
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
    if (!userData.todaySheetID) {
      // create new log sheet
      let res = await doGetMonthSheet(STARTYEAR, STARTMONTH);
      userData.todaySheetID = res.result.replies[0].addSheet.properties.sheetId;
      userData.todaySheetYear = STARTYEAR;
      userData.todaySheetMonth = STARTMONTH;
      console.log("logsheetid", userData.todaySheetID);
    }
  } catch (e) {
    console.error(e);
  }
}

function onDateChange(dateInput) {
  if (!dateInput.value) {
    let today = new Date().toISOString().substr(0, 10);
    document.querySelectorAll('.id_target_date').forEach((e) => {
      e.value = today;
    });
    onDateChange(dateInput);
    return;
  }
  document.querySelectorAll('.id_target_date').forEach((e) => {
    if (dateInput != e) {
      e.value = dateInput.value;
    }
  });
  const today = new Date();
  const selectedDate = new Date(dateInput.value);
  if (selectedDate.getFullYear() === today.getFullYear()
    && selectedDate.getMonth() === today.getMonth()
    && selectedDate.getDate() === today.getDate()) {
    console.log('選択された日付は今日です');
    targetDate = null;
  } else {
    console.log('選択された日付は今日ではありません');
    targetDate = selectedDate;
  }

  console.log("targetDate", targetDate);
  onGetTasks();
}