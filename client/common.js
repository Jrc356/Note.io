function getToken() {
    return sessionStorage.getItem('token');
}

function setTokens() {
    let href = $("#newNote").attr('href');
    $("#newNote").attr('href', `${href}&token=${getToken()}`);
    
    href = $('#logout').attr('href');
    $("#logout").attr('href', `${href}?token=${getToken()}`);
    $('#logout').click(() => {
        sessionStorage.removeItem('token');
    })
}