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
                                    // filled by following lines
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    };

    for (column of TASK_COLUMNS) {
        spreadsheetBody.sheets[1].data[0].rowData[0].values.push({
            // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
            "userEnteredValue": {
                // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
                "stringValue": column,
            },
        });
    }
    console.log(spreadsheetBody);


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
            q: `mimeType='application/vnd.google-apps.spreadsheet' and name='${SPREAD_NAME}' and trashed = false`,
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
        console.log("drive > list", res);
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

function getTaskColumnRange() {
    let endColumn = TASK_COLUMNS.length;
    return `A:${getAlpahFromColumnIndex(endColumn)}`;

}
async function doGetTasks() {
    let params = {
        spreadsheetId: userData.spreadID,
        // ranges: ['Tasks!A:E', `${userData.todaySheetYear}/${userData.todaySheetMonth}!A:C`],
        ranges: [`Tasks!${getTaskColumnRange()}`, `${userData.todaySheetYear}/${userData.todaySheetMonth}!A:C`],
    };
    console.log("params", params);

    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
    response = await gapi.client.sheets.spreadsheets.values.batchGet(params);
    console.log("responce", response);
    // valueRange[0] is a set of "ID", "Task", "Action", ...
    // valueRanges[0][0] is a row of column names
    if (!response.result.valueRanges || response.result.valueRanges[0].values.length <= 1) {
        console.log("No tasks found");
        return [new ItemEmpty()];
    }

    // response.result.valueRanges[0].values[0][0]==="ID"
    const retRows = response.result.valueRanges[0].values;
    const missingRows = getMissingRows(retRows[0]);
    if (missingRows.length > 0) {
        const message = `以下のTaskシートのコラムがありません\n${missingRows}`;
        showError(message);
        throw new Error(message);
    }
    const iDColumnIndex = getColumnIndexFromColumnName(retRows[0], TASK_COLUMN_ID);
    const taskColumnIndex = getColumnIndexFromColumnName(retRows[0], TASK_COLUMN_TASK);
    const actionColumnIndex = getColumnIndexFromColumnName(retRows[0], TASK_COLUMN_ACTION);
    const startTimeColumnIndex = getColumnIndexFromColumnName(retRows[0], TASK_COLUMN_STARTTIME);
    const endTimeColumnIndex = getColumnIndexFromColumnName(retRows[0], TASK_COLUMN_ENDTIME);

    // check Duplicated id
    let idsForDupCheck = [];
    for (i = 1; i < retRows.length; ++i) {
        let rowdata = retRows[i];
        if (!rowdata[iDColumnIndex] || !isPositiveInteger(rowdata[iDColumnIndex]))
            continue;
        idsForDupCheck.push(rowdata[iDColumnIndex]);
    }
    const dupIDs = getDuplicateValues(idsForDupCheck);
    if (dupIDs.length != 0) {
        showError(`TaskID ${dupIDs.join(",")} are duplicated. Please fix them by editting the tasks.`);
        return null;
    }

    let tasks = [];
    for (i = 1; i < retRows.length; ++i) {
        let rowdata = retRows[i];
        if (!rowdata[iDColumnIndex])
            continue;
        if (!isPositiveInteger(rowdata[iDColumnIndex])) {
            // Specail Item
            switch (rowdata[iDColumnIndex]) {
                case "separator":
                    tasks.push(new Separator(rowdata[taskColumnIndex]));
                    break;
            }
        } else {
            // Normal Task
            tasks.push(new Task(
                i + 1, // first row is header
                rowdata[iDColumnIndex],
                rowdata[taskColumnIndex],
                rowdata[actionColumnIndex],
                rowdata[startTimeColumnIndex],
                rowdata[endTimeColumnIndex],
                false));
        }
    }
    for (let task of tasks) {
        if (task instanceof Task) {
            if (!checkTaskTime(task)) {
                showError(`TaskID ${task.getId()} has invalid time value(s)` + "\n" + getLastError());
                return null;
            }
        }
    }
    // end of 'tasks' sheet

    // start of log sheet
    const now = new Date();
    // valueRange[1] is a set of "Date" and "Check"
    const dc = response.result.valueRanges[1];
    let dcLen = 0;
    if (!dc.values || dc.values.length <= 0) {
        dcLen = 0;
    } else {
        dcLen = dc.values.length;
    }
    for (let task of tasks) {
        if (!(task instanceof Task)) {
            continue;
        }
        const [taskYesterdayStart, taskYesterdayEnd] = getTaskYesterday(now, task);
        const [taskTodayStart, taskTodayEnd] = getTaskToday(now, task);

        if (taskYesterdayStart <= now && now < taskYesterdayEnd) {
            task.setEnabled(true);
        } else if (taskTodayStart <= now && now < taskTodayEnd) {
            task.setEnabled(true);
        }

        for (i = 0; i < dcLen; ++i) {
            if (dc.values[i][1] != task.getId()) {
                continue;
            }

            const logDate = getLogDate(
                userData.todaySheetYear,
                userData.todaySheetMonth,
                dc.values[i][0],
                dc.values[i][2]);

            if (taskYesterdayStart <= now && now < taskYesterdayEnd) {
                if (taskYesterdayStart <= logDate && logDate < taskYesterdayEnd) {
                    task.setChecked(true);
                }
            } else if (taskTodayStart <= logDate && logDate < taskTodayEnd) {
                task.setChecked(true);
            }
        }
    }
    return tasks;
}

async function doTaskAction(taskid) {
    if (!userData.spreadID) {
        showError("No spread id");
        return false;
    }
    // Get the sheet of current month
    if (!userData.todaySheetID) {
        showError("No todaySheetID");
        return false;
    }

    const date = new Date();
    if (!isCorrectDate(date)) {
        showError("The date has been changed. Please refresh the page.");
        return false;
    }
    const currentHOURS = date.getHours().toString().padStart(2, '0');
    const currentMINUTES = date.getMinutes().toString().padStart(2, '0');
    const currentSECONDS = date.getSeconds().toString().padStart(2, '0');

    // Append Check to log sheet
    let values = [
        [
            `${STARTDATE}`, taskid, `${currentHOURS}:${currentMINUTES}:${currentSECONDS}`, // Cell values ...
        ],
        // Additional rows ...
    ];

    const body = {
        values: values,
    };

    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
    let res = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: userData.spreadID,
        range: [`${userData.todaySheetYear}/${userData.todaySheetMonth}!A:C`],
        valueInputOption: 'USER_ENTERED',
        resource: body,
    });

    const result = res.result;
    console.log(`${result.updatedCells} cells updated.`);

    return true;
}
async function doTaskEditItem(taskid, taskname, taskaction) {
    if (!userData.spreadID) {
        showError("No spread id");
        return;
    }
    // Get the sheet of current month
    if (!userData.todaySheetID) {
        showError("No todaySheetID");
        return;
    }

    // First, find the row of the task
    let tasks = await doGetTasks();
    let row = -1;
    for (let task of tasks) {
        if (task.getId() == taskid) {
            row = task.getRow();
            break;
        }
    }
    if (row <= 0) {
        showError(`Illegal row ${row}`);
        throw new Error(`Illegal row ${row}`);
    }

    // Update the spread on row
    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#AddSheetRequest
    let param = {
        spreadsheetId: userData.spreadID,
        range: `Tasks!B${row}:C${row}`,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: [
                [taskname, taskaction],
            ],
        },
    };

    console.log("param", param);
    let res = await gapi.client.sheets.spreadsheets.values.update(param);
    console.log(res);
    return res;
}

function getRowFromRanges(str) {
    const regex = /^Tasks!A(\d+):B(\d+)$/;
    const match = str.match(regex);
    if (match && match[1] === match[2]) {
        return parseInt(match[1], 10);
    }
    return null;
}
async function doAddNewTask() {
    if (!userData.spreadID) {
        showError("No spread id");
        return;
    }

    // First, determine new ID = (max value of IDs) + 1
    let tasks = await doGetTasks();
    let maxid = 0;
    for (const task of tasks) {
        maxid = Math.max(maxid, task.getId());
    }
    const newID = maxid + 1;
    const newTaskName = "新しいタスク";
    // Appen new task with newID and default name
    let values = [
        [
            newID, newTaskName, // Cell values ...
        ],
        // Additional rows ...
    ];

    const body = {
        values: values,
    };

    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
    let res = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId: userData.spreadID,
        range: [`Tasks!A:B`],
        valueInputOption: 'USER_ENTERED',
        resource: body,
    });

    const result = res.result;
    console.log(`${result.updatedCells} cells updated.`);
    const row = getRowFromRanges(result.updates.updatedRange);
    return new Task(row, newID, newTaskName, null, null, null, true);
}