// TODO THIS COMMIT
// add basic html to homepage
// TODO Next commit
// add basic functionality:
// name autopopulates based on user
// groups autopopulates
// friends autopopulates

// run when page first loads - not running this now bc it's a pain
// setSignUpPage();

// sets up Sign Up Page for new users
// TODO at some point: bypass sign up page for logged in user
function setSignUpPage() {
  var htmlElements = document.body.innerHTML = '\
    <div class = "screen"><div>My name is...</div>\
      <input class = "userName" type="text">\
      <div>My email is...</div>\
      <input class = "userEmail" type="text">\
      <div>My password is...</div>\
      <input class = "userPassword" type="text">\
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
  // clearScreen();

  var homepageElements = document.body.innerHTML = '\
    <div class="screen">\
      <div class="header">\
        <div>splitwise</div>\
        <div>session owner</div>\
      </div>\
      <div class="homepage">\
        <div class="navigation">\
          <div>dashboard</div>\
          <div>recent activity</div>\
          <div>all expenses</div>\
          <div>groups</div>\
          <div>friends</div>\
        </div>\
        <div class="console">\
          <div class = "console-shelf">\
            <div>dashboard</div>\
            <button>add a bill</button>\
            <button>settle up</button>\
          </div>\
          <div class = "console-shelf">\
            <div>\
              <div>total balance</div>\
              <div>$90</div>\
            </div>\
            <div>\
              <div>you owe</div>\
              <div>$90</div>\
            </div>\
            <div>\
              <div>you are owed</div>\
              <div>$90</div>\
            </div>\
          </div>\
          <div class = "console-shelf">\
            <div>YOU OWE</div>\
            <div>listchart</div>\
            <div>YOU ARE OWED</div>\
          </div>\
          <div class = "console-shelf">\
            <div>YOU OWE item</div>\
            <div>YOU ARE OWED item</div>\
          </div>\
        </div>\
        <div class="ad-space"></div>\
      </div>\
    </div>';
}

setHomepage();

// removes all html nested within body element
function clearScreen() {
  document.body.removeChild(document.querySelector('.screen'));
}




// function get(){
//     var one = document.getElementById('1').value
//     one = localStorage.getItem("kidStore");
// }
