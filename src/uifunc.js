function toggleLoginButton(loggedin) {
    // if (loggedin) {
    //     document.getElementById('beforelogin').style.visibility = 'hidden';
    //     document.getElementById('afterlogin').style.visibility = 'visible';
    // } else {
    //     document.getElementById('beforelogin').style.visibility = 'visible';
    //     document.getElementById('afterlogin').style.visibility = 'hidden';
    // }

    if (loggedin) {
        document.getElementById('beforelogin').style.display = 'none';
        document.getElementById('afterlogin').style.display = 'block';
    } else {
        document.getElementById('beforelogin').style.display = 'block';
        document.getElementById('afterlogin').style.display = 'none';
    }
}
function showError(res) {
    window.alert(res.detail);
}