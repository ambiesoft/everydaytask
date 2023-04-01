const CLIENT_ID = '335012850826-gvrev3vnd53u401ne1coqtrepudrmjje.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8';
const DISCOVERY_DOC_SCRIPT = 'https://script.googleapis.com/$discovery/rest?version=v1';
const DISCOVERY_DOC_SHEETS = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const DISCOVERY_DOC_DRIVE = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

// const SCOPES = 'https://www.googleapis.com/auth/script.projects https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets';
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.currentonly https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/script.storage https://www.googleapis.com/auth/drive.appdata';

const today = new Date();
const year = today.getFullYear(); // 年を取得
const month = today.getMonth() + 1; // 月を取得（0-11の範囲で返されるため、1を加算）
const date = today.getDate(); // 日を取得
const hours = today.getHours().toString().padStart(2, '0');
const minutes = today.getMinutes().toString().padStart(2, '0');
const seconds = today.getSeconds().toString().padStart(2, '0');

const SPREAD_NAME = "EverydayTask.Ambiesoft.com_16053688-8F91-400D-8CBE-4AF19E561586";
const UNCHECKMARK = "☐";
const CHECKMARK = "☑️";

const COOKIE_SHEETID = "SheetID";

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
  //  gapi.load('drive','v3',initializeGapiClient);
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
  toggleLoginButton(gapi.client.getToken() != null);
  console.log("sheet id", Cookies.get(COOKIE_SHEETID));
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

// https://developers.google.com/drive/api/guides/about-files
// https://developers.google.com/drive/api/v3/reference/files/get
const FILEID = "1opOkG7rQjtkNUzZf3S9EaECcTXu8e93n";
const SHEETID = "1cdqSOdEx_JOIsgvi9XBB-pYZAiNwQfwC";

function ttt() {
  var fileMetadata = {
    'name': 'config.json',
    'parents': ['appDataFolder']
  };
  var media = {
    mimeType: 'application/json',
    body: '"sample text"'
  };
  const request = gapi.client.drive.files.create({
    resource: fileMetadata,
    media,
    fields: 'id'
  })
  request.execute(function (data) {
    console.log(data);
  })
}
function getFile() {
  const request = gapi.client.drive.files.get({
    fileId: FILEID
  });
  request.execute((data) => {
    console.log(data);
  })
}

// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create
async function doCreateNewGoogleSheet() {
  var spreadsheetBody = {
    properties: {
      "title": `${SPREAD_NAME}`,
    },
    "sheets": [
      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#Sheet
      {
        // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetProperties
        "properties": {
          "title": "README",
          "index": 0,
          "sheetType": "GRID",
          "gridProperties": {
            "rowCount": 1000,
            "columnCount": 26
          }
        },
        "data": [
          {
            // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#GridData
            "startRow": 0,
            "startColumn": 0,
            "rowData": [
              {
                // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#RowData
                "values": [
                  {
                    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
                    "userEnteredValue": {
                      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
                      "stringValue": "AAAAAAAAA",
                    },
                  },
                ],
              },
              {
                // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#RowData
                "values": [
                  {
                    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
                    "userEnteredValue": {
                      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
                      "stringValue": "BBBBBBBBBBBBBBBB",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        "properties": {
          "title": "Tasks",
          "index": 1,
          "sheetType": "GRID",
          "gridProperties": {
            "rowCount": 1000,
            "columnCount": 26
          }
        }
      }
    ],
  };

  const res = await gapi.client.sheets.spreadsheets.create({}, spreadsheetBody);

  /*
  {
      "result": {
          "spreadsheetId": "1crN_IU_k2m-oEDiPIIrjKpeshVCrV7J7d6pe5DLBHDY",
          "properties": {
              "title": "EverydayTask.Ambiesoft.com_16053688-8F91-400D-8CBE-4AF19E561586",
              "locale": "ja_JP",
              "autoRecalc": "ON_CHANGE",
              "timeZone": "Etc/GMT",
              "defaultFormat": {
                  "backgroundColor": {
                      "red": 1,
                      "green": 1,
                      "blue": 1
                  },
                  "padding": {
                      "top": 2,
                      "right": 3,
                      "bottom": 2,
                      "left": 3
                  },
                  "verticalAlignment": "BOTTOM",
                  "wrapStrategy": "OVERFLOW_CELL",
                  "textFormat": {
                      "foregroundColor": {},
                      "fontFamily": "arial,sans,sans-serif",
                      "fontSize": 10,
                      "bold": false,
                      "italic": false,
                      "strikethrough": false,
                      "underline": false,
                      "foregroundColorStyle": {
                          "rgbColor": {}
                      }
                  },
                  "backgroundColorStyle": {
                      "rgbColor": {
                          "red": 1,
                          "green": 1,
                          "blue": 1
                      }
                  }
              },
              "spreadsheetTheme": {
                  "primaryFontFamily": "Arial",
                  "themeColors": [
                      {
                          "colorType": "TEXT",
                          "color": {
                              "rgbColor": {}
                          }
                      },
                      {
                          "colorType": "BACKGROUND",
                          "color": {
                              "rgbColor": {
                                  "red": 1,
                                  "green": 1,
                                  "blue": 1
                              }
                          }
                      },
                      {
                          "colorType": "ACCENT1",
                          "color": {
                              "rgbColor": {
                                  "red": 0.25882354,
                                  "green": 0.52156866,
                                  "blue": 0.95686275
                              }
                          }
                      },
                      {
                          "colorType": "ACCENT2",
                          "color": {
                              "rgbColor": {
                                  "red": 0.91764706,
                                  "green": 0.2627451,
                                  "blue": 0.20784314
                              }
                          }
                      },
                      {
                          "colorType": "ACCENT3",
                          "color": {
                              "rgbColor": {
                                  "red": 0.9843137,
                                  "green": 0.7372549,
                                  "blue": 0.015686275
                              }
                          }
                      },
                      {
                          "colorType": "ACCENT4",
                          "color": {
                              "rgbColor": {
                                  "red": 0.20392157,
                                  "green": 0.65882355,
                                  "blue": 0.3254902
                              }
                          }
                      },
                      {
                          "colorType": "ACCENT5",
                          "color": {
                              "rgbColor": {
                                  "red": 1,
                                  "green": 0.42745098,
                                  "blue": 0.003921569
                              }
                          }
                      },
                      {
                          "colorType": "ACCENT6",
                          "color": {
                              "rgbColor": {
                                  "red": 0.27450982,
                                  "green": 0.7411765,
                                  "blue": 0.7764706
                              }
                          }
                      },
                      {
                          "colorType": "LINK",
                          "color": {
                              "rgbColor": {
                                  "red": 0.06666667,
                                  "green": 0.33333334,
                                  "blue": 0.8
                              }
                          }
                      }
                  ]
              }
          },
          "sheets": [
              {
                  "properties": {
                      "sheetId": 0,
                      "title": "シート1",
                      "index": 0,
                      "sheetType": "GRID",
                      "gridProperties": {
                          "rowCount": 1000,
                          "columnCount": 26
                      }
                  }
              }
          ],
          "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/1crN_IU_k2m-oEDiPIIrjKpeshVCrV7J7d6pe5DLBHDY/edit"
      },
      "status": 200,
      "statusText": null
  }
  */
  console.log(res);
  return res.result.spreadsheetId;
}
async function doCreateNewGoogleSheet_error() {
  let res = await gapi.client.drive.files.create({
    resource: {
      name: 'aaaaa',
      parents: ['appDataFolder'],
      mimeType: 'application/vnd.google-apps.spreadsheet'
    },
    fields: 'id'
  });
  /*
  {
      "result": {
          "error": {
              "code": 403,
              "message": "Method not supported for files within the Application Data folder.",
              "errors": [
                  {
                      "message": "Method not supported for files within the Application Data folder.",
                      "domain": "global",
                      "reason": "notSupportedForAppDataFolderFiles"
                  }
              ]
          }
      },
      "body": "{\n  \"error\": {\n    \"code\": 403,\n    \"message\": \"Method not supported for files within the Application Data folder.\",\n    \"errors\": [\n      {\n        \"message\": \"Method not supported for files within the Application Data folder.\",\n        \"domain\": \"global\",\n        \"reason\": \"notSupportedForAppDataFolderFiles\"\n      }\n    ]\n  }\n}\n",
      "headers": {
          "cache-control": "private, max-age=0",
          "content-encoding": "gzip",
          "content-length": "180",
          "content-type": "application/json; charset=UTF-8",
          "date": "Sat, 01 Apr 2023 07:43:23 GMT",
          "expires": "Sat, 01 Apr 2023 07:43:23 GMT",
          "server": "ESF",
          "vary": "Origin, X-Origin"
      },
      "status": 403,
      "statusText": null
  }
  */
  console.log(res);
  return res;
}

function OnGetTasksGoogleSheet() {
  getTasksGoogleSheet();
}
async function getTasksGoogleSheet() {
  let sheetid = Cookies.get(COOKIE_SHEETID);
  if (sheetid) {
    console.log("sheet id is in cookie", sheetid);
    return;
  }
  try {
    sheetid = await doGetTasksGoogleSheet();
    if (!sheetid) {
      sheetid = await doCreateNewGoogleSheet();
    }
    if (!sheetid) {
      throw new Error("Failed to get Google Sheet");
    }
    Cookies.set(COOKIE_SHEETID, sheetid); // { expires: 30 });
    console.log("sheet id", Cookies.get(COOKIE_SHEETID));
  } catch (e) {
    console.error(e);
  }
}
// https://developers.google.com/drive/api/v3/reference/files/list
async function doGetTasksGoogleSheet() {
  let res = await gapi.client.drive.files.list({
    q: `mimeType='application/vnd.google-apps.spreadsheet' and name='${SPREAD_NAME}'`,
    // fields: 'nextPageToken, files(id, name)',
    // spaces: 'appDataFolder',
  });
  /*
{
    "result": {
        "kind": "drive#fileList",
        "incompleteSearch": false,
        "files": [
            {
                "kind": "drive#file",
                "mimeType": "application/vnd.google-apps.spreadsheet",
                "id": "1vA8F9N2sn4BhcbQshsqneBV_WdWsAZ50_q57jtEgkvU",
                "name": "EverydayTask.Ambiesoft.com_16053688-8F91-400D-8CBE-4AF19E561586"
            }
        ]
    },
    "body": "{\n  \"kind\": \"drive#fileList\",\n  \"incompleteSearch\": false,\n  \"files\": [\n    {\n      \"kind\": \"drive#file\",\n      \"mimeType\": \"application/vnd.google-apps.spreadsheet\",\n      \"id\": \"1vA8F9N2sn4BhcbQshsqneBV_WdWsAZ50_q57jtEgkvU\",\n      \"name\": \"EverydayTask.Ambiesoft.com_16053688-8F91-400D-8CBE-4AF19E561586\"\n    }\n  ]\n}\n",
    "headers": {
        "cache-control": "no-cache, no-store, max-age=0, must-revalidate",
        "content-encoding": "gzip",
        "content-length": "251",
        "content-type": "application/json; charset=UTF-8",
        "date": "Sat, 01 Apr 2023 07:01:18 GMT",
        "expires": "Mon, 01 Jan 1990 00:00:00 GMT",
        "pragma": "no-cache",
        "server": "ESF",
        "vary": "Origin, X-Origin"
    },
    "status": 200,
    "statusText": null
}  
  */
  console.log(res);
  if (res.result.files.length != 0) {
    return res.result.files[0].id;
  }
  return null;
}



// gapi.client.sheets.spreadsheets.create({
//   "properties": {
//     "title": "mysheet",
//   },
//   "sheets": [
//     "sheet1",
//     "sheet2",
//     "sheet3",
//   ]
// }).then(function (response) {
//   console.log(response);
// });

// }

function updateValues(spreadsheetId, range, valueInputOption, _values, callback) {
  let values = [
    [
      1 // Cell values ...
    ],
    // Additional rows ...
  ];
  values = _values;
  const body = {
    values: values,
  };
  try {
    gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId,
      range: range,
      valueInputOption: valueInputOption,
      resource: body,
    }).then((response) => {
      const result = response.result;
      console.log(`${result.updatedCells} cells updated.`);
      if (callback) callback(response);
    });
  } catch (err) {
    document.getElementById('content').innerText = err.message;
    return;
  }
}
function appendData() {

  values = [["Void", "Canvas", "Website"], ["Paul", "Shan", "Human"]];

  var body = {
    values: values
  };
  try {
    gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: SHEETID,
      range: 'Sheet1!A2:B', //Change Sheet1 if your worksheet's name is 
      //something else
      valueInputOption: "USER_ENTERED",
      insertDataOption: 'INSERT_ROWS',
      resource: body

    }).then((data) => {
      console.log(data);
    });
  } catch (err) {
    console.error(err);
  }
}
function setCellValue() {
  appendData();
  // updateValues(SHEETID, "A1", "USER_ENTERED", null);
}