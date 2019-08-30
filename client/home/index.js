function getToken() {
  return sessionStorage.getItem('token');
}

function getNotes() {
  $.ajax('http://localhost:3000/notes', {
    method: "GET",
    headers: {
      'token': getToken()
    },
    success: (data) => {
      updateNotesTable(data);
    },
    error: (err) => {
      console.log("error");
      console.log(err);
    }
  });
}


function updateNotesTable(notes) {
  const table = document.getElementById('notes').getElementsByTagName('tbody')[0];

  notes.forEach((note) => {
    const id = note.notesID;
    const title = note.Title || "";
    const content = note.Content || "";
    const row = table.insertRow(-1);
    row.classList = "note clickable-row";
    row.setAttribute('data-href', `/note?id=${id}&token=${sessionStorage.getItem('token')}`);

    const titleTd = row.insertCell(-1);
    titleTd.classList = "notes_item";
    titleTd.innerHTML = title;

    const snippetTd = row.insertCell(-1);
    snippetTd.classList = "notes_item";
    snippetTd.innerHTML = content.substring(0, 200);
  });

  setClickables();
}


function setClickables() {
  $(".clickable-row").click(function() {
      window.location = $(this).data("href");
  });
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