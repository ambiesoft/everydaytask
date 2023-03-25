const CLIENT_ID = '335012850826-gvrev3vnd53u401ne1coqtrepudrmjje.apps.googleusercontent.com';
const API_KEY = 'AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8';
const DISCOVERY_DOC_SCRIPT = 'https://script.googleapis.com/$discovery/rest?version=v1';
const DISCOVERY_DOC_SHEETS = 'https://sheets.googleapis.com/$discovery/rest?version=v4';

const SCOPES = 'https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';

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
function gisLoaded() {
  console.log("gisLoaded is called")

  // initialize a new token client with your web app's client ID
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (tokenResponce) => {
      console.log("tokenResponce called")
      console.log(tokenResponce)
    }
  });
  console.log("tokenClient", tokenClient)
  gisInited = true;
}

var depid_head = "AKfycbznJza6mTsxZhaa-uUnN9PIzo5eTNIRhsFZWPmo5f2L";
var depid_anygoogleaccount = "AKfycbyT-Hf9cu92lOoR6MaJ1mScTewD-SAayC8pDTPTngZoAYwTJaGx0MD0EcXGuqIYwvW8Rg";
var depid_anyone = "AKfycbxyG52BkbMZd-EneXxwaLpC-8KUj2QQsi0B1kW3zpLYKlQTciFGiFeCK_vTeUR4Q0j5aA";
var depid_tanin = "AKfycbw1uH-oQ8FO4RmdXzRdykkFUdcBPMce4EJ1xcRTd1qG8T-S5kE";

function runRemoteScript(func, callback) {
  if (!ensureToken()) {
    return;
  }
  let url = `https://script.googleapis.com/v1/scripts/${depid_head}:run`;
  // let data = "key=AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8";
  let postdata = {
    "function": func,
    "parameters": [
    ],
    // "sessionState": string,
    // "devMode": true,
  };
  token = gapi.client.getToken();
  console.log(token)

  fetch(url, {
    method: 'POST',
    redirect: "follow",
    headers: {
      // 'Accept': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'application/json',
      'Authorization': token.token_type + ' ' + token.access_token,
    },
    body: JSON.stringify(postdata),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      callback(data);
    })
    .catch(error => console.error(error));
}
function getABC() {
  runRemoteScript("getABC", (data) => {
    console.log(data);
  });
}
function createSpread() {
  runRemoteScript("createSpread");
}
function getTasks() {
  runRemoteScript("getTasks", (data) => {
    const res = JSON.parse(data.response.result);
    console.log(res);
    for (const task of res.Tasks) {
      console.log(task);
      createTask(task.name, task.action);
    }
  });
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function createTask(taskName, action) {
  // テンプレートから要素を取得する
  const template = document.getElementById("myTemplate");
  const item = template.content.querySelector(".item");
  const text = template.content.querySelector(".text");
  const button = template.content.querySelector(".taskbutton");
  button.dataset.value = action;
  // 動的に要素を生成する
  text.textContent = taskName;
  button.textContent = "☐";
  document.getElementById('container').appendChild(item.cloneNode(true));
}
function isValidURL(url) {
  const urlRegExp = /^(?:http(?:s)?:\/\/(?:www\.)?)?[^\s.]+\.[^\s]{2,}$/i;
  return urlRegExp.test(url);
}

function onTaskAction(el) {
  console.log(el);
  console.log(el.dataset.value);

  const url = el.dataset.value;
  if (isValidURL(url)) {
    window.open(url, "_blank");
  }
  el.textContent = "☑️"
}