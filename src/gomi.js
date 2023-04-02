async function doCreateSpread_error() {
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