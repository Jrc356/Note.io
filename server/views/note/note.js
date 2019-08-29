var timeout;

function saveNote() {
  console.log(new Date() + " Saving note...");
  console.log("TEXT CHANGED");
  console.log($('#editArea').val());
}

function addAutoSave(){
  $('#editArea').keypress(function () {
    $('#status').attr('class', 'pending').text('Changes Pending');

    // If a timer was already started, clear it.
    if (timeout) clearTimeout(timeout);

    // Set timer that will save comment when it fires.
    timeout = setTimeout(function () {
        saveNote();
        $('#status').attr('class', 'saved').text('Changes Saved');
      }, 750);
  });

  $('#title').keypress(function () {
    $('#status').attr('class', 'pending').text('Changes Pending');

    // If a timer was already started, clear it.
    if (timeout) clearTimeout(timeout);

    // Set timer that will save comment when it fires.
    timeout = setTimeout(function () {
        saveNote();
        $('#status').attr('class', 'saved').text('Changes Saved');
      }, 750);
  });
}