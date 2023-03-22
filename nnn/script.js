/**
         * Callback after api.js is loaded.
         */
function gapiLoaded() {
    gapi.load('client', initializeGapiClient);
}

/**
 * Callback after the API client is loaded. Loads the
 * discovery doc to initialize the API.
 */
async function initializeGapiClient() {
    await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
    });
    gapiInited = true;
    maybeEnableButtons();
}

/**
 * Callback after Google Identity Services are loaded.
 */
function gisLoaded() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: '', // defined later
    });
    gisInited = true;
    maybeEnableButtons();
}

/**
 * Enables user interaction after all libraries are loaded.
 */
function maybeEnableButtons() {
    if (gapiInited && gisInited) {
        document.getElementById('authorize_button').style.visibility = 'visible';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick() {
    tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
            throw (resp);
        }
        document.getElementById('signout_button').style.visibility = 'visible';
        document.getElementById('authorize_button').innerText = 'Refresh';
        await createScript();
    };

    if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        // Skip display of account chooser and consent dialog for an existing session.
        tokenClient.requestAccessToken({ prompt: '' });
    }
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick() {
    const token = gapi.client.getToken();
    if (token !== null) {
        google.accounts.oauth2.revoke(token.access_token);
        gapi.client.setToken('');
        document.getElementById('content').innerText = '';
        document.getElementById('authorize_button').innerText = 'Authorize';
        document.getElementById('signout_button').style.visibility = 'hidden';
    }
}

/**
 * Creates a new 'Hello world' script.
 */
async function createScript() {
    let response;
    try {
        const createRequest = {
            resource: {
                title: 'My Script',
            },
        };
        response = await gapi.client.script.projects.create(createRequest);

        const updateContentRequest = {
            scriptId: response.result.scriptId,
            resource: {
                files: [{
                    name: 'hello',
                    type: 'SERVER_JS',
                    source: 'function helloWorld() {\n  console.log("Hello, world!");\n}',
                }, {
                    name: 'appsscript',
                    type: 'JSON',
                    source: '{"timeZone":"America/New_York","' +
                        'exceptionLogging":"CLOUD"}',
                }],
            },
        };
        response = await gapi.client.script.projects.updateContent(updateContentRequest);
        const output = `Script URL: https://script.google.com/d/${response.result.scriptId}/edit`;
        document.getElementById('content').innerText = output;
    } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
    }
}

function test_api() {
    let url = 'https://script.googleapis.com/v1/scripts/AKfycbxAU6LlCs8_H9R3d2stU0uUScj7N4N5-NToNWGSgeciYukkETdKlTsOBCDBYoJu3yo6Pg:run';
    // let data = "key=AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8";
    let postdata = {
        "function": "doGet",
        "parameters": [
            123
        ],
        // "sessionState": string,
        "devMode": true,
    };

    fetch(url, {
        method: 'POST',
        redirect: "follow",
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(postdata),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}  