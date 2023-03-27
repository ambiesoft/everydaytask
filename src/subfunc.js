function isValidURL(url) {
    const urlRegExp = /^(?:http(?:s)?:\/\/(?:www\.)?)?[^\s.]+\.[^\s]{2,}$/i;
    return urlRegExp.test(url);
}

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

var depid_head = "AKfycbznJza6mTsxZhaa-uUnN9PIzo5eTNIRhsFZWPmo5f2L";
var depid_anygoogleaccount = "AKfycbyT-Hf9cu92lOoR6MaJ1mScTewD-SAayC8pDTPTngZoAYwTJaGx0MD0EcXGuqIYwvW8Rg";
var depid_anyone = "AKfycbxyG52BkbMZd-EneXxwaLpC-8KUj2QQsi0B1kW3zpLYKlQTciFGiFeCK_vTeUR4Q0j5aA";
var depid_tanin = "AKfycbw1uH-oQ8FO4RmdXzRdykkFUdcBPMce4EJ1xcRTd1qG8T-S5kE";

function runRemoteScript(callback, func, parameters) {
    if (!ensureToken()) {
        return;
    }
    let url = `https://script.googleapis.com/v1/scripts/${depid_head}:run`;
    // let data = "key=AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8";
    let postdata = {
        "function": func,
        "parameters": parameters,
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
