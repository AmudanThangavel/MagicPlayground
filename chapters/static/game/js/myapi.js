console.log("API JavaScript");
var editor = ace.edit("editor");
editor.autofocus;
var chapID = document.getElementById("chapID").innerHTML;
var userID = document.getElementById("user").innerHTML;
var successCode;
var sucCode;
userID = parseInt(userID);

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');



async function readCode() {
  console.log(userID);
  console.log(chapID);
  var url = 'http://127.0.0.1:8000/codeGet/' + userID + '/' + chapID + '/';

  await fetch(url)
    .then((response) => response.json())
    .then(function (data) {
      details = data;
      console.log(details["submitted_code"]);
      if (details["submitted_code"] === undefined) {
        editor.setValue("# Write your code here");
        document.getElementById("tries").innerHTML = "1";
      } else {
        editor.setValue(details["submitted_code"]);
        sucCode = details["submitted_code"];
        document.getElementById("tries").innerHTML = details["tries"];
        if (details["success_code"] == true) {
          successCode = "yes";
        } else {
          successCode = "no";
        }
      }
    })
  await sleep(200);
}

readCode();

function saveCode(fcodeStr, fwin, fscore, ftries) {
  var url = 'http://127.0.0.1:8000/codeUC/' + userID + '/' + chapID + '/';
  if (successCode == "yes") {
    console.log("True");
    fwin = true;
    fscore = 100;
    fcodeStr = sucCode;
  } else if (successCode == "no") {
    console.log("False");
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({
      "submitted_code": fcodeStr,
      "success_code": fwin,
      "score": fscore,
      "tries": ftries,
      "user": userID,
      "chapter_id": chapID
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
