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
  toggleLoginButton(gapi.client.getToken() != null);
}

function ensureToken() {
  if (gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    tokenClient.requestAccessToken({ prompt: 'consent' });
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

function clearTasks() {
  document.getElementById('container').innerHTML = '';
}
function createTask(task) {
  // テンプレートから要素を取得する
  const template = document.getElementById("taskTemplate");
  const item = template.content.querySelector(".item");
  const text = template.content.querySelector(".text");
  const button = template.content.querySelector(".taskbutton");

  button.dataset.taskid = task.id;
  button.dataset.taskname = task.name;
  button.dataset.taskaction = task.action;

  text.textContent = task.name;
  button.textContent = task.checked ? CHECKMARK : UNCHECKMARK;
  document.getElementById('container').appendChild(item.cloneNode(true));
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
      nazo: "Nodata",
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