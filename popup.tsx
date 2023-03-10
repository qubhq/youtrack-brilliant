function IndexPopup() {
    let saveToken = function (token) {
        chrome.storage.local.set({youtrack_token: token}).then(() => {
            console.log('saveToken called with token ', token);
        });
    }

    chrome.storage.local.get(['youtrack_token']).then((result) => {
        console.log('youtrack_token called with data ', result);
        document.getElementById("youtrack_token").setAttribute('value', result.youtrack_token);
    });

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: 16
            }}>
            <h2>
                Youtrack plugin for Chainstack {" "}
                <a href="https://chainstack.myjetbrains.com/youtrack/users/me?tab=account-security" target="_blank">
                    Get Your Token here
                </a>{" "}

            </h2>
            <label htmlFor="youtrack_token">Insert your youtrack token</label>
            <input onChange={(e) => saveToken(e.target.value)} id="youtrack_token"/>
        </div>
    )
}

export default IndexPopup
