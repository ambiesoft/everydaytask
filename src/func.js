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
        document.getElementById('googlelogin'), // ボタンを描画する要素のID
        {
            click_listener: handleToken
        }
    );
}
function removeGoogleButton() {
    document.getElementById('googlelogin').innerHTML = "";
}
// google.accounts.id.prompt((notification) => {
//   console.log(notification);
//   if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
//     // continue with another identity provider.
//     console.log(notification.getNotDisplayedReason())
//   }
// });
// google.accounts.id.renderButton(document.getElementById("googlelogin"));

function testGet() {
    // let url = 'https://script.google.com/macros/s/AKfycbw1uH-oQ8FO4RmdXzRdykkFUdcBPMce4EJ1xcRTd1qG8T-S5kE/exec?a=abc';
    let url = 'https://script.googleapis.com/v1/scripts/AKfycbxAU6LlCs8_H9R3d2stU0uUScj7N4N5-NToNWGSgeciYukkETdKlTsOBCDBYoJu3yo6Pg:run';
    let data = "key=AIzaSyBwo4I6oVCzFCW3X10Dch0AIJeTLR0VmK8";

    fetch(url, {
        method: 'POST',
        redirect: "follow",
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "",
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(data)
    // })
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));

    // fetch(url, {
    //     redirect: "follow",
    //     method: "POST",
    //     body: JSON.stringify(data),
    //     headers: {
    //         "Content-Type": "text/plain;charset=utf-8",
    //     },
    // })
}