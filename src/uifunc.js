
function toggleLoginButton() {
    let loggedin = isLoggedIn();

    if (loggedin) {
        document.getElementById('btnLogin').style.display = 'none';
        document.getElementById('btnLogoff').style.display = 'block';

        togglePage("page_loggedin");
    } else {
        document.getElementById('btnLogin').style.display = 'block';
        document.getElementById('btnLogin').className = gisInited ? "button" : "button-disabled";

        document.getElementById('btnLogoff').style.display = 'none';

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

var currentPage;
var footerButtons = [
    "howto", "privacy", "contact"
]
function toggleFooter(button) {
    // Chage buttons to narmal
    footerButtons.forEach((b) => {
        document.getElementById(b).className = "button";
    });

    if (currentPage == button) {
        // same button clicked
        document.getElementById('otherinfo').innerHTML = "";
        currentPage = null;
    } else {
        // newly clicked or other button clicked
        button.className = "buttonSelected";

        const template = document.getElementById(button.id + "Template");
        const html = template.content.querySelector("." + button.id + "Html");
        document.getElementById('otherinfo').innerHTML = "";
        document.getElementById('otherinfo').appendChild(html.cloneNode(true));

        currentPage = button;
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

function startfinish_common2(node, start) {
    let origText = node.getAttribute("origText");
    if (!origText) {
        origText = eval(node.getAttribute("str"));
    }
    node.innerText = start ? "🌐" : origText;
}
function startfinish_common(els, start) {
    if (!els) {
        return;
    }
    if (Array.isArray(els)) {
        els.forEach(node => {
            // node.innerText = "🌐 > > > 💻";
            startfinish_common2(node, start);
        });
    } else {
        startfinish_common2(els, start);
    }
}
function startWaitUI(els) {
    startfinish_common(els, true);
}
function finishWaitUI(els) {
    startfinish_common(els, false);
}

function scrollToElement(element) {
    var elementTop = element.getBoundingClientRect().top; // 要素の画面上部の位置を取得
    var bodyRect = document.body.getBoundingClientRect();
    var offset = elementTop - bodyRect.top; // 要素の位置とbody要素の位置の差分を取得

    console.log("scroll to", offset);
    window.scrollTo(0, offset); // スクロールを移動
}
function showBottomTaskButtons(show) {
    document.getElementById("taskbuttons_only5moreitems").style.display =
        show ? 'block' : 'none';
}

function updateTitle(tasks) {
    const checkedCount = tasks.filter((task) => task.isChecked()).length;
    const totalTaskCount = tasks.filter((task) => task.getId() > 0).length;
    document.title = `${APP_NAME} (${checkedCount}/${totalTaskCount})`;
}

