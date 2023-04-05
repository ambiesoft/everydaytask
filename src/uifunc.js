function toggleLoginButton() {
    let loggedin = gapi.client.getToken() != null;
    loggedin &= gisInited;
    loggedin &= gapiInited;
    if (loggedin) {
        document.getElementById('beforelogin').style.display = 'none';
        document.getElementById('afterlogin').style.display = 'block';
    } else {
        document.getElementById('beforelogin').style.display = 'block';
        document.getElementById('afterlogin').style.display = 'none';
    }
}
function showError(res) {
    window.alert(res);
}

function startWaitUI() {
    document.getElementById("guruguru").innerText = "🌐 > > > 💻";
}
function finishWaitUI() {
    document.getElementById("guruguru").innerText = "";
}