function toggleLoginButton() {
  let loggedin = isLoggedIn();

  if (loggedin) {
    document.getElementById('btnLogin').style.display = 'none';
    document.getElementById('btnLogoff').style.display = 'block';

    togglePage('page_loggedin');
  } else {
    document.getElementById('btnLogin').style.display = 'block';
    document.getElementById('btnLogin').className = gisInited
      ? 'button'
      : 'button-disabled';

    document.getElementById('btnLogoff').style.display = 'none';

    togglePage('page_loggedout');
  }
}
function togglePage(page) {
  switch (page) {
    case 'page_loggedin':
      document.getElementById('page_loggedin').style.display = 'block';
      document.getElementById('page_loggedout').style.display = 'none';
      break;
    case 'page_loggedout':
      document.getElementById('page_loggedin').style.display = 'none';
      document.getElementById('page_loggedout').style.display = 'block';
      break;
    default:
      console.error(`Unkown page ${page}`);
  }
}

var currentFooterPage;
const footerButtons = ['howto', 'privacy', 'contact', 'settings'];
function toggleFooter(button) {
  // Change buttons to narmal
  footerButtons.forEach((b) => {
    document.getElementById(b).className = 'button';
  });

  if (currentFooterPage == button) {
    // same button clicked
    document.getElementById('otherinfo').innerHTML = '';
    currentFooterPage = null;
  } else {
    // newly clicked or other button clicked
    button.className = 'buttonSelected';

    const template = document.getElementById(button.id + 'Template');
    const html = template.content.querySelector('.' + button.id + 'Html');

    document.getElementById('otherinfo').innerHTML = '';
    let copiedHtml = html.cloneNode(true);
    copiedHtml.innerHTML = getString(`str_${button.id}Html`);
    document.getElementById('otherinfo').appendChild(copiedHtml);

    if (button.id == 'settings') {
      SETID_TO_COOKIE.forEach((idcookie) => {
        document.getElementById(idcookie.id).checked =
          Cookies.get(idcookie.cookie) == 'true' ? true : false;
      });

      let curLangIndex = Cookies.get(COOKIE_SETTING_LANG);
      if (curLangIndex < 0) curLangIndex = 0;

      // Create lang combo
      let langSelect = document.getElementById('settings_lang');
      appendLangOption(langSelect, curLangIndex);

      // set current lang
      // Create event handler
      langSelect.addEventListener('change', (event) => {
        console.log(langSelect.selectedIndex);
        Cookies.set(
          COOKIE_SETTING_LANG,
          langSelect.selectedIndex,
          getCookieExpire()
        );
      });
    }

    currentFooterPage = button;
  }
}

function getStringFromObject(obj) {
  if (isString(obj)) {
    return obj;
  }
  return JSON.stringify(obj);
}
function showError(res) {
  const str = getStringFromObject(res);
  window.alert(str);
}
function showErrorWithCode(code) {
  let message;
  switch (code) {
    case 401:
      message = str_http_401;
      break;
    default:
      message = str_unknown_error;
  }
  showError(message);
}

function startfinish_common2(node, start) {
  let origText = node.getAttribute('origText');
  if (!origText) {
    origText = eval(node.getAttribute('str'));
  }
  node.innerText = start ? str_networking : origText;
}
function startfinish_common(els, start) {
  if (!els) {
    return;
  }
  if (Array.isArray(els)) {
    els.forEach((node) => {
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
  var elementTop = element.getBoundingClientRect().top;
  var bodyRect = document.body.getBoundingClientRect();
  var offset = elementTop - bodyRect.top;

  console.log('scroll to', offset);
  window.scrollTo(0, offset);
}
function showBottomTaskButtons(show) {
  document.getElementById('taskbuttons_only5moreitems').style.display = show
    ? 'block'
    : 'none';
}

function updateTitle(tasks) {
  const checkedCount = tasks.filter((task) => task.isChecked()).length;
  const totalTaskCount = tasks.filter((task) => task.getId() > 0).length;
  document.title = `${APP_NAME} (${checkedCount}/${totalTaskCount})`;
}
