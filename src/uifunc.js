
function toggleLoginButton() {
    let loggedin = isLoggedIn();

    if (loggedin) {
        document.getElementById('beforelogin').style.display = 'none';
        document.getElementById('afterlogin').style.display = 'block';

        togglePage("page_loggedin");
    } else {
        document.getElementById('beforelogin').style.display = 'block';
        document.getElementById('afterlogin').style.display = 'none';

        togglePage("page_loggedout");
    }
}
function togglePage(page) {
    switch (page) {
        case "page_loggedin":
            document.getElementById("page_loggedin").style.display = 'block';
            document.getElementById("page_loggedout").style.display = 'none';
            break;
        case "page_loggedout":
            document.getElementById("page_loggedin").style.display = 'none';
            document.getElementById("page_loggedout").style.display = 'block';
            break;
        default:
            console.error(`Unkown page ${page}`);
    }
}
function toggleFooter(infopage) {
    const template = document.getElementById(infopage + "Template");
    const html = template.content.querySelector("." + infopage + "Html");
    document.getElementById('otherinfo').innerHTML = "";
    document.getElementById('otherinfo').appendChild(html.cloneNode(true));
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
    Array.from(document.querySelectorAll(".guruguru")).forEach(node => {
        node.innerText = "🌐 > > > 💻";
    });
}
function finishWaitUI() {
    Array.from(document.querySelectorAll(".guruguru")).forEach(node => {
        node.innerText = "";
    });
}

function scrollToElement(element) {
    var elementTop = element.getBoundingClientRect().top; // 要素の画面上部の位置を取得
    var bodyRect = document.body.getBoundingClientRect();
    var offset = elementTop - bodyRect.top; // 要素の位置とbody要素の位置の差分を取得

    console.log("scroll to", offset);
    window.scrollTo(0, offset); // スクロールを移動
}
