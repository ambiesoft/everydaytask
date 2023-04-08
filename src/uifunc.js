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
function showErrorWithCode(code) {
    let message;
    switch (code) {
        case 401:
            message = "認証に失敗しました。ページをリロードしてログインし直してください";
            break;
        default:
            message = "未知のエラーです";
    }
    showError(message);
}
function startWaitUI() {
    document.getElementById("guruguru").innerText = "🌐 > > > 💻";
}
function finishWaitUI() {
    document.getElementById("guruguru").innerText = "";
}
function scrollToElement(element) {
    var elementTop = element.getBoundingClientRect().top; // 要素の画面上部の位置を取得
    var bodyRect = document.body.getBoundingClientRect();
    var offset = elementTop - bodyRect.top; // 要素の位置とbody要素の位置の差分を取得

    console.log("scroll to", offset);
    window.scrollTo(0, offset); // スクロールを移動
}
