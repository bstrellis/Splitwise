// TODO THIS COMMIT
// html and input fields for sign up page
// movement to dashboard

// run when page first loads
setSignUpPage();

// sets up Sign Up Page for new users
// TODO at some point: bypass sign up page for logged in user
function setSignUpPage() {
  var htmlElements = document.body.innerHTML = '<div class = "screen"><div>My name is...</div>\
    <input class = "userName" type="text">\
    <div>My email is...</div><input class = "userEmail" type="text">\
    <div>My password is...</div><input class = "userPassword" type="text">\
    <button class = "sign-up-button">sign up</button>\
    </div>';

  document.body.querySelector('.sign-up-button').addEventListener('click', storeSignUpData);
}

// Stores name, email, and pw of new user in local storage, then calls
// setHomepage to move user to dashboard
function storeSignUpData(){
  var userName = document.getElementsByClassName('userName');
  localStorage.setItem('session.user', userName);
  var userEmail = document.getElementById('userEmail');
  localStorage.setItem('session.email', userEmail);
  var userPassword = document.getElementById('userPassword');
  localStorage.setItem('session.password', userPassword);

  setHomepage();
}

// sets up homepage
function setHomepage() {
  clearScreen();

  var homepageElements = document.body.innerHTML = '<div class="screen"><div class="header"></div>\
    <div class="homepage"><div class="navigation"></div>\
    <div class="console"></div><div class="ad-space"></div></div></div>';
}

// removes all html nested within body element
function clearScreen() {
  document.body.removeChild(document.querySelector('.screen'));
}




// function get(){
//     var one = document.getElementById('1').value
//     one = localStorage.getItem("kidStore");
// }
