var timeout;

var id = getParameterByName('id');

function saveNote() {
  console.log(new Date() + " Saving note...");
  console.log("TEXT CHANGED");
  console.log($('#editArea').val());
}

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = (element.scrollHeight)+"px";
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
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

  $('#editArea').keyup(function () {
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

  $('#title').keyup(function () {
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