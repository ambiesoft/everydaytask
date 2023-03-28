const CLIENT_ID = '335012850826-gvrev3vnd53u401ne1coqtrepudrmjje.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8';
const DISCOVERY_DOC_SCRIPT = 'https://script.googleapis.com/$discovery/rest?version=v1';
const DISCOVERY_DOC_SHEETS = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

const SCOPES = 'https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';

const today = new Date();
const year = today.getFullYear(); // 年を取得
const month = today.getMonth() + 1; // 月を取得（0-11の範囲で返されるため、1を加算）
const date = today.getDate(); // 日を取得
const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');
const seconds = today.getSeconds().toString().padStart(2, '0');

const UNCHECKMARK = "☐";
const CHECKMARK = "☑️";

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
      toggleLoginButton(tokenResponce);

      // const seconds = tokenResponce.expires_in;
      // const expires = new Date();
      // expires.setTime(expires.getTime() + (seconds * 1000));
      // Cookies.set('token', tokenResponce.access_token, {
      //   expires
      // });
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
    apiKey: API_KEY,
    discoveryDocs: [DISCOVERY_DOC_SCRIPT, DISCOVERY_DOC_SHEETS],
  });
  gapiInited = true;
}

window.onload = () => {
  console.log("window.onload has been called");

  // let token = Cookies.get('token');
  // console.log("Cookie", token);
  // if (token && !gapi.client.getToken()) {
  //   gapi.client.setToken(token);
  //   console.log("setToken called");
  // }
  toggleLoginButton(gapi.client.getToken() != null);
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

function getABC() {
  runRemoteScript((data) => {
    console.log(data);
  }, "getABC");
}
function getTasks() {
  runRemoteScript((data) => {
    const res = JSON.parse(data.response.result);
    console.log(res);
    clearTasks();
    for (const task of res.Tasks) {
      console.log(task);
      createTask(task);
    }
  },
    "getTasks",
    {
      year,
      month,
      date,
    });
}
function showGoogleTaskSheet() {
  runRemoteScript((data) => {
    const res = JSON.parse(data.response.result);
    console.log(res);
    window.open(res.url, "_blank");
  },
    "doGetTaskSheetURL");
}
function addNewTask() {
  runRemoteScript((data) => {
    const res = JSON.parse(data.response.result);
    console.log(res);
    if (res.result != "OK") {
      showError(res);
      return;
    }
    for (const task of res.Tasks) {
      console.log(task);
      createTask(task);
    }
  },
    "doAddNewTask");
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
      year,
      month,
      date,
      hours,
      minutes,
      seconds,
      id: el.dataset.taskid
    }
  );
  const url = el.dataset.taskaction;
  if (isValidURL(url)) {
    window.open(url, "_blank");
  }
  el.textContent = CHECKMARK;
}