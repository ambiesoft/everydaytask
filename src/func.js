

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
      toggleLoginButton(tokenResponce.access_token != null);
      if (tokenResponce.access_token != null) {
        if (!userData.spreadID) {
          OnGetSpread();
        }
      }

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

function onGetTasks() {
  if (!userData.spreadID) {
    OnGetSpread();
    return;
  }
  var params = {
    spreadsheetId: userData.spreadID,
    ranges: ['Tasks!A2:C4'],
  };
  var request = gapi.client.sheets.spreadsheets.values.batchGet(params);
  request.then(function (response) {
    console.log(response);
    for (taskdata of response.result.valueRanges[0].values) {
      createTask({
        id: taskdata[0],
        name: taskdata[1],
        action: taskdata[2],
      });
    }
  }, function (response) {
    console.log('error: ' + response.result.error.message);
  });
}
function onShowSpread() {
  if (!userData.spreadID) {
    OnGetSpread();
    return;
  }
  window.open(getTaskSheetUrl());
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

// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create
async function doCreateSpread() {
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
  return res;
}
function OnGetSpread() {
  if (!gapi.client.getToken()) {
    ensureToken();
    return;
  }

  document.getElementById("guruguru").innerText = "Guru";
  getSpread().then((spread) => {
  }).catch(e => {
    console.error(e);
  }).finally(() => {
    document.getElementById("guruguru").innerText = "";
  });
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
// https://developers.google.com/drive/api/v3/reference/files/list
async function doGetSpread() {
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
  if (res.result.files.length == 0) {
    return null;
  }

  res.result.files[0].id;

  var params = {
    // The spreadsheet to request.
    spreadsheetId: res.result.files[0].id,  // TODO: Update placeholder value.

    // The ranges to retrieve from the spreadsheet.
    ranges: [],  // TODO: Update placeholder value.

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    includeGridData: false,  // TODO: Update placeholder value.
  };

  return await gapi.client.sheets.spreadsheets.get(params);
}

