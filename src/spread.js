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
                        "rowCount": 10,
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
                        "rowCount": 1,
                        "columnCount": 26
                    },
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
                                            "stringValue": "ID",
                                        },
                                    },
                                    {
                                        // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
                                        "userEnteredValue": {
                                            // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
                                            "stringValue": "Task",
                                        },
                                    },
                                    {
                                        // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
                                        "userEnteredValue": {
                                            // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
                                            "stringValue": "Action",
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
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

// https://developers.google.com/drive/api/v3/reference/files/list
async function doGetSpread(spreadid) {
    if (!spreadid) {
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
        spreadid = res.result.files[0].id;
    }

    var params = {
        // The spreadsheet to request.
        spreadsheetId: spreadid,  // TODO: Update placeholder value.

        // The ranges to retrieve from the spreadsheet.
        ranges: [],  // TODO: Update placeholder value.

        // True if grid data should be returned.
        // This parameter is ignored if a field mask was set in the request.
        includeGridData: false,  // TODO: Update placeholder value.
    };

    return await gapi.client.sheets.spreadsheets.get(params);
}

async function doGetMonthSheet(year, month) {
    // If not the sheet, create it
    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#AddSheetRequest
    let param = {
        spreadsheetId: userData.spreadID,
        resource: {
            requests: [
                {
                    'addSheet': {
                        'properties': {
                            'title': `${year}/${month}`,
                        }
                    }
                }
            ],
        }
    };
    console.log("param", param);
    let res = await gapi.client.sheets.spreadsheets.batchUpdate(param);
    console.log(res);
    return res;
}
async function doGetTasks() {
    let params = {
        spreadsheetId: userData.spreadID,
        ranges: ['Tasks!A:C', `${userData.todaySheetYear}/${userData.todaySheetMonth}!A:B`],
    };

    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
    response = await gapi.client.sheets.spreadsheets.values.batchGet(params);
    console.log(response);
    // valueRange[0] is a set of "ID", "Task" and "Action"
    // valueRanges[0][0] is a row of column names
    if (!response.result.valueRanges || response.result.valueRanges[0].values.length <= 1) {
        console.log("No tasks found");
        return;
    }

    let tasks = [];
    for (i = 1; i < response.result.valueRanges[0].values.length; ++i) {
        let taskdata = response.result.valueRanges[0].values[i];
        if (!taskdata[0] || taskdata[0] <= 0)
            continue;
        tasks.push({
            row: i + 1, // first row is header
            id: taskdata[0],
            name: taskdata[1],
            action: taskdata[2],
        });
    }

    // valueRange[1] is a set of "Date" and "Check"
    if (!response.result.valueRanges[1].values || response.result.valueRanges[1].values.length <= 0) {
        // No tasks checked
    } else {
        for (task of tasks) {
            for (i = 0; i < response.result.valueRanges[1].values.length; ++i) {
                if (response.result.valueRanges[1].values[i][1] == task.id) {
                    task.checked = true;
                }
            }
        }
    }

    return tasks;
}

async function doTaskAction(taskid) {
    if (!userData.spreadID) {
        showError("No spread id");
        return;
    }
    // Get the sheet of current month
    if (!userData.todaySheetID) {
        showError("No todaySheetID");
        return;
    }

    if (!isCorrectDate()) {
        showError("Current date has been changed. Please refresh the page.");
        return;
    }

    // Append Check to log sheet
    let values = [
        [
            `${STARTDATE}`, taskid, // Cell values ...
        ],
        // Additional rows ...
    ];

    const body = {
        values: values,
    };

    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update
    let res = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: userData.spreadID,
        range: [`${userData.todaySheetYear}/${userData.todaySheetMonth}!A:B`],
        valueInputOption: 'USER_ENTERED',
        resource: body,
    });

    const result = res.result;
    console.log(`${result.updatedCells} cells updated.`);
}
