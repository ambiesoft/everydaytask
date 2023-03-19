function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
function renderGoogleButton() {
    google.accounts.id.renderButton(
        document.getElementById('myid'), // ボタンを描画する要素のID
        {
            click_listener: handleToken
        }
    );
}
function removeGoogleButton() {
    document.getElementById('myid').innerHTML = "";
}
// google.accounts.id.prompt((notification) => {
      //   console.log(notification);
      //   if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
      //     // continue with another identity provider.
      //     console.log(notification.getNotDisplayedReason())
      //   }
      // });
      // google.accounts.id.renderButton(document.getElementById("myid"));
