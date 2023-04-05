function toggleLoginButton() {
    let loggedin = gapi.client.getToken() != null;
    loggedin &= gisInited;
    loggedin &= gapiInited;
    console.log("loggedin", loggedin);
    if (loggedin) {
        document.getElementById('beforelogin').style.display = 'none';
        document.getElementById('afterlogin').style.display = 'block';

        document.getElementById("loggedin").style.display = 'block';
        document.getElementById("loggedout").style.display = 'none';
    } else {
        document.getElementById('beforelogin').style.display = 'block';
        document.getElementById('afterlogin').style.display = 'none';

        document.getElementById("loggedin").style.display = 'none';
        document.getElementById("loggedout").style.display = 'block';
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