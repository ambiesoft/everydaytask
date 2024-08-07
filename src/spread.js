// https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/create
async function doCreateSpread() {
  var spreadsheetBody = {
    properties: {
      title: `${SPREAD_NAME}`,
    },
    sheets: [
      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#Sheet
      {
        // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#SheetProperties
        properties: {
          title: 'README',
          index: 0,
          sheetType: 'GRID',
          gridProperties: {
            rowCount: 10,
            columnCount: 26,
          },
        },
        data: [
          {
            // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#GridData
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#RowData
                values: [
                  {
                    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
                    userEnteredValue: {
                      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
                      stringValue: str_sheet_title,
                    },
                  },
                ],
              },
              {
                // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#RowData
                values: [
                  {
                    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData
                    userEnteredValue: {
                      // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
                      stringValue: str_sheet_explanation,
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        properties: {
          title: 'Tasks',
          index: 1,
          sheetType: 'GRID',
          gridProperties: {
            rowCount: 1,
            columnCount: 26,
          },
        },
        data: [
          {
            // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#GridData
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#RowData
                values: [
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
      userEnteredValue: {
        // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/other#ExtendedValue
        stringValue: column,
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
                        "title": "sheet1",
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
    console.log('drive > list', res);
    if (res.result.files.length == 0) {
      return null;
    }
    spreadid = res.result.files[0].id;
  }

  var params = {
    // The spreadsheet to request.
    spreadsheetId: spreadid, // TODO: Update placeholder value.

    // The ranges to retrieve from the spreadsheet.
    ranges: [], // TODO: Update placeholder value.

    // True if grid data should be returned.
    // This parameter is ignored if a field mask was set in the request.
    includeGridData: false, // TODO: Update placeholder value.
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
          addSheet: {
            properties: {
              title: `${year}/${month}`,
            },
          },
        },
      ],
    },
  };
  console.log('param', param);
  let res = await gapi.client.sheets.spreadsheets.batchUpdate(param);
  console.log(res);
  return res;
}

function getTaskColumnRange() {
  let endColumn = TASK_COLUMNS.length;
  return `A:${getAlpahFromColumnIndex(endColumn - 1)}`;
}
async function doGetTasks(colIndexes, bIncludesDeleted) {
  const searchDate = targetDate ? targetDate : new Date();

  let params = {
    spreadsheetId: userData.spreadID,
    // ranges: ['Tasks!A:E', `${userData.todaySheetYear}/${userData.todaySheetMonth}!A:C`],
    ranges: [
      `Tasks!${getTaskColumnRange()}`,
      `${searchDate.getFullYear()}/${searchDate.getMonth() + 1}!A:D`,
    ],
  };
  console.log('params', params);

  // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
  response = await gapi.client.sheets.spreadsheets.values.batchGet(params);
  console.log('responce', response);

  // valueRange[0] is a set of "ID", "Task", "Action", ...
  // valueRanges[0][0] is a row of column names
  if (
    !response.result.valueRanges ||
    response.result.valueRanges[0].values.length <= 1
  ) {
    console.log('No tasks found');
    return [new ItemEmpty()];
  }

  // response.result.valueRanges[0].values[0][0]==="ID"
  const retRows = response.result.valueRanges[0].values;
  const missingRows = getMissingRows(retRows[0]);
  if (missingRows.length > 0) {
    // TODO:I18N
    const message = `The following Task sheet columns are missing\n${missingRows}`;
    showError(message);
    throw new Error(message);
  }

  if (!colIndexes) {
    colIndexes = {};
  }

  colIndexes.iDColumnIndex = getColumnIndexFromColumnName(
    retRows[0],
    TASK_COLUMN_ID
  );
  colIndexes.taskColumnIndex = getColumnIndexFromColumnName(
    retRows[0],
    TASK_COLUMN_TASK
  );
  colIndexes.actionColumnIndex = getColumnIndexFromColumnName(
    retRows[0],
    TASK_COLUMN_ACTION
  );
  colIndexes.stateColumnIndex = getColumnIndexFromColumnName(
    retRows[0],
    TASK_COLUMN_STATE
  );
  colIndexes.memoColumnIndex = getColumnIndexFromColumnName(
    retRows[0],
    TASK_COLUMN_MEMO
  );
  colIndexes.createdColumnIndex = getColumnIndexFromColumnName(
    retRows[0],
    TASK_COLUMN_CREATED
  );
  colIndexes.startTimeColumnIndex = getColumnIndexFromColumnName(
    retRows[0],
    TASK_COLUMN_STARTTIME
  );
  colIndexes.endTimeColumnIndex = getColumnIndexFromColumnName(
    retRows[0],
    TASK_COLUMN_ENDTIME
  );

  // check Duplicated id
  let idsForDupCheck = [];
  for (i = 1; i < retRows.length; ++i) {
    let rowdata = retRows[i];
    if (
      !rowdata[colIndexes.iDColumnIndex] ||
      !isPositiveInteger(rowdata[colIndexes.iDColumnIndex])
    )
      continue;
    idsForDupCheck.push(rowdata[colIndexes.iDColumnIndex]);
  }
  const dupIDs = getDuplicateValues(idsForDupCheck);
  if (dupIDs.length != 0) {
    showError(
      `TaskID ${dupIDs.join(
        ','
      )} are duplicated. Please fix them by editting the tasks.`
    );
    return null;
  }
  // start of log sheet

  let tasks = [];
  for (i = 1; i < retRows.length; ++i) {
    let rowdata = retRows[i];
    if (!rowdata[colIndexes.iDColumnIndex]) continue;
    if (!bIncludesDeleted && rowdata[colIndexes.stateColumnIndex] == 'deleted')
      continue;

    // if searchDate < Created , skip it
    if (rowdata[colIndexes.createdColumnIndex]) {
      try {
        const createdDate = new Date(rowdata[colIndexes.createdColumnIndex]);
        console.log('searchDate', searchDate);
        console.log('createdDate', createdDate);
        if (searchDate < createdDate) {
          console.log('Skipping task that was created before target date');
          continue;
        }
      } catch {
        // run through if illegal date
      }
    }

    if (!isPositiveInteger(rowdata[colIndexes.iDColumnIndex])) {
      // Specail Item
      switch (rowdata[colIndexes.iDColumnIndex]) {
        case 'separator':
          tasks.push(new Separator(rowdata[colIndexes.taskColumnIndex]));
          break;
      }
    } else {
      // Normal Task
      tasks.push(
        new Task(
          i + 1, // first row is header
          rowdata[colIndexes.iDColumnIndex],
          rowdata[colIndexes.taskColumnIndex],
          rowdata[colIndexes.actionColumnIndex],
          rowdata[colIndexes.memoColumnIndex],
          rowdata[colIndexes.startTimeColumnIndex],
          rowdata[colIndexes.endTimeColumnIndex],
          false
        )
      );
    }
  }
  for (let task of tasks) {
    if (task instanceof Task) {
      if (!checkTaskTime(task)) {
        showError(
          `TaskID ${task.getId()} has invalid time value(s)` +
            '\n' +
            getLastError()
        );
        return null;
      }
    }
  }
  // end of 'tasks' sheet

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
    const [taskYesterdayStart, taskYesterdayEnd] = getTaskYesterday(
      searchDate,
      task
    );
    const [taskTodayStart, taskTodayEnd] = getTaskToday(searchDate, task);

    if (searchDate != targetDate) {
      // searchDate is now
      if (taskYesterdayStart <= searchDate && searchDate < taskYesterdayEnd) {
        task.setEnabled(true);
      } else if (taskTodayStart <= searchDate && searchDate < taskTodayEnd) {
        task.setEnabled(true);
      }
    } else {
      // searching specific date
      task.setEnabled(false);
    }

    for (i = 0; i < dcLen; ++i) {
      if (dc.values[i][3] == 'deleted') {
        continue;
      }
      if (dc.values[i][1] != task.getId()) {
        continue;
      }

      const logDate = getLogDate(
        searchDate.getFullYear(),
        searchDate.getMonth() + 1,
        dc.values[i][0],
        dc.values[i][2]
      );

      if (taskYesterdayStart <= searchDate && searchDate < taskYesterdayEnd) {
        if (taskYesterdayStart <= logDate && logDate < taskYesterdayEnd) {
          task.setChecked(true);
        }
      } else if (taskTodayStart <= logDate && logDate < taskTodayEnd) {
        task.setChecked(true);
      }
    }
  }
  return tasks.length != 0 ? tasks : [new ItemEmpty()];
}

function isTodaySheetReady(date) {
  if (!userData.spreadID) {
    showError('No spread id');
    return false;
  }
  // Get the sheet of current month
  if (!userData.todaySheetID) {
    showError('No todaySheetID');
    return false;
  }

  if (!isCorrectDate(date)) {
    showError('The date has been changed. Please refresh the page.');
    return false;
  }
  return true;
}

async function doTaskAction(taskid) {
  const date = new Date();
  if (!isTodaySheetReady(date)) {
    return false;
  }

  const currentHOURS = date.getHours().toString().padStart(2, '0');
  const currentMINUTES = date.getMinutes().toString().padStart(2, '0');
  const currentSECONDS = date.getSeconds().toString().padStart(2, '0');

  // Append Check to log sheet
  let values = [
    [
      `${STARTDATE}`,
      taskid,
      `${currentHOURS}:${currentMINUTES}:${currentSECONDS}`, // Cell values ...
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
    showError('No spread id');
    return;
  }
  // Get the sheet of current month
  if (!userData.todaySheetID) {
    showError('No todaySheetID');
    return;
  }

  // First, find the row of the task
  let colIndexes = {};
  let tasks = await doGetTasks(colIndexes);
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

  const data = [
    {
      range: `Tasks!${getAlpahFromColumnIndex(
        colIndexes.taskColumnIndex
      )}${row}`,
      values: [[taskname]],
    },
    {
      range: `Tasks!${getAlpahFromColumnIndex(
        colIndexes.actionColumnIndex
      )}${row}`,
      values: [[taskaction]],
    },
  ];
  let params = {
    spreadsheetId: userData.spreadID,
    resource: {
      data: data,
      valueInputOption: 'USER_ENTERED',
    },
  };
  console.log('params', params);

  // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
  res = await gapi.client.sheets.spreadsheets.values.batchUpdate(params);

  console.log(res);
  return res;
}

async function doTaskDeleteLastCheck(task) {
  const date = new Date();
  if (!isTodaySheetReady(date)) {
    return false;
  }

  const searchDate = date;
  let params = {
    spreadsheetId: userData.spreadID,
    ranges: [`${searchDate.getFullYear()}/${searchDate.getMonth() + 1}!A:D`],
  };
  console.log('params', params);

  // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
  response = await gapi.client.sheets.spreadsheets.values.batchGet(params);
  console.log('responce', response);

  // valueRanges[0][i] is data of today's sheet value
  if (
    !response.result.valueRanges ||
    response.result.valueRanges[0].values.length <= 1
  ) {
    console.log('No check data found');
    return false;
  }

  // find the range of deleting cell
  const [taskYesterdayStart, taskYesterdayEnd] = getTaskYesterday(
    searchDate,
    task
  );
  const [taskTodayStart, taskTodayEnd] = getTaskToday(searchDate, task);

  let rowDeleting = -1;
  const dc = response.result.valueRanges[0];
  for (i = 0; i < dc.values.length; ++i) {
    if (dc.values[i][1] == task.getId() && dc.values[i][3] != 'deleted') {
      rowDeleting = i;
    }
  }
  if (rowDeleting == -1) {
    showError(`No checks found for task '${task.getName()}'`);
    return false;
  }

  // Check rowDeleting can be deleted
  const logDate = getLogDate(
    searchDate.getFullYear(),
    searchDate.getMonth() + 1,
    dc.values[rowDeleting][0],
    dc.values[rowDeleting][2]
  );

  let okToDelete = false;
  if (taskYesterdayStart <= searchDate && searchDate < taskYesterdayEnd) {
    if (taskYesterdayStart <= logDate && logDate < taskYesterdayEnd) {
      okToDelete = true;
    }
  } else if (taskTodayStart <= logDate && logDate < taskTodayEnd) {
    okToDelete = true;
  }

  if (!okToDelete) {
    showError(`No checks found for task '${task.getName()}' in today.`);
    return false;
  }

  // Add 'deleted' on the today' sheet
  const data = [
    {
      range: `${searchDate.getFullYear()}/${searchDate.getMonth() + 1}!D${
        rowDeleting + 1
      }`,
      values: [['deleted']],
    },
  ];
  params = {
    spreadsheetId: userData.spreadID,
    resource: {
      data: data,
      valueInputOption: 'USER_ENTERED',
    },
  };
  console.log('params', params);

  // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
  res = await gapi.client.sheets.spreadsheets.values.batchUpdate(params);

  console.log(res);
  return res;
}
async function doTaskDeleteItem(taskid) {
  if (!userData.spreadID) {
    showError('No spread id');
    return;
  }
  // Get the sheet of current month
  if (!userData.todaySheetID) {
    showError('No todaySheetID');
    return;
  }

  // First, find the row of the task
  let colIndexes = {};
  let tasks = await doGetTasks(colIndexes);
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

  const data = [
    {
      range: `Tasks!${getAlpahFromColumnIndex(
        colIndexes.stateColumnIndex
      )}${row}`,
      values: [['deleted']],
    },
  ];
  let params = {
    spreadsheetId: userData.spreadID,
    resource: {
      data: data,
      valueInputOption: 'USER_ENTERED',
    },
  };
  console.log('params', params);

  // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
  res = await gapi.client.sheets.spreadsheets.values.batchUpdate(params);

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
async function doAddNewTask(afterId) {
  if (!userData.spreadID) {
    showError('No spread id');
    return;
  }
  if (!userData.taskSheetID) {
    showError('No taskSheet id');
    return;
  }
  // First, determine new ID = (max value of IDs) + 1
  let tasks = await doGetTasks({}, true);
  let maxid = 0;
  for (const task of tasks) {
    maxid = Math.max(maxid, task.getId());
  }
  const newID = maxid + 1;
  const newTaskName = str_new_task;

  let newRow;

  if (afterId) {
    // Find the row to insert
    let rowToInsert = -1;
    for (const task of tasks) {
      if (task.getId() == afterId) {
        rowToInsert = task.getRow();
      }
    }
    if (rowToInsert == -1) {
      showError('Failed to find row index to insert');
      return;
    }

    // 2, Use https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate?hl=ja to insert row
    // 3, set new data there by 'update' or 'batchUpdate'
    let postDataData = `${newID},"${newTaskName}", ,,,"${new Date().toDateString()}"`; // 'sample1, sample2, sample3'
    ooo = {
      requests: [
        {
          insertRange: {
            range: {
              sheetId: userData.taskSheetID,
              startRowIndex: rowToInsert,
              endRowIndex: rowToInsert + 1,
            },
            shiftDimension: 'ROWS',
          },
        },
        {
          pasteData: {
            data: postDataData,
            type: 'PASTE_NORMAL',
            delimiter: ',',
            coordinate: {
              sheetId: userData.taskSheetID,
              rowIndex: rowToInsert,
            },
          },
        },
      ],
    };
    res = await gapi.client.sheets.spreadsheets.batchUpdate({
      spreadsheetId: userData.spreadID,
      resource: ooo,
    });
    // console.log(res);
    newRow = rowToInsert + 1;
  } else {
    // Appen new task with newID and default name
    let values = [
      [
        newID,
        newTaskName,
        '', // Action
        '', // State
        '', // Memo
        new Date().toDateString(), // created
      ],
      // Additional rows ...
    ];

    const body = {
      values: values,
    };

    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
    res = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: userData.spreadID,
      range: [`Tasks!A:B`],
      valueInputOption: 'USER_ENTERED',
      resource: body,
    });

    const result = res.result;
    console.log(`${result.updatedCells} cells updated.`);
    newRow = getRowFromRanges(result.updates.updatedRange);
  }
  return new Task(newRow, newID, newTaskName, null, null, null, null, true);
}

async function doGetTaskHistory(task) {
  const searchDate = targetDate ? targetDate : new Date();
  let params = {
    spreadsheetId: userData.spreadID,
    ranges: [`${searchDate.getFullYear()}/${searchDate.getMonth() + 1}!A:D`],
  };
  console.log('params', params);

  let responce;
  try {
    // https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchUpdate
    response = await gapi.client.sheets.spreadsheets.values.batchGet(params);
  } catch (err) {
    // if the sheet is not found, it maybe comes here.
    if (err.status == 400) {
      console.log('No check data found');
      return rets;
    }
    throw err;
  }
  console.log('responce', response);

  const rets = [];
  // valueRanges[0][i] is data of today's sheet value
  if (
    !response.result.valueRanges ||
    // if the sheet not present, there is no 'values' property.
    !('values' in response.result.valueRanges[0]) ||
    response.result.valueRanges[0].values.length < 1
  ) {
    console.log('No check data found');
    return rets;
  }

  const dc = response.result.valueRanges[0];
  for (i = 0; i < dc.values.length; ++i) {
    // dc.values[i][0] is DAY
    // dc.values[i][1] is taskid
    // dc.values[i][2] is TIME
    // dc.values[i][3] is deleted or None
    if (dc.values[i][1] == task.getId() && dc.values[i][3] != 'deleted') {
      rets.push({
        year: searchDate.getFullYear(),
        month: searchDate.getMonth() + 1,
        day: dc.values[i][0],
        time: dc.values[i][2],
      });
    }
  }
  return rets;
}
