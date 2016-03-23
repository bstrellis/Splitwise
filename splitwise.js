

var templateStrings = {
  signUpPage: '\
    <div class="screen">\
      <div>My name is...</div>\
      <input class="user-name" type="text">\
      <div>My email is...</div>\
      <input class="user-email" type="text">\
      <div>My password is...</div>\
      <input class="user-password" type="text">\
      <button class="sign-up-button">sign up</button>\
    </div>',

  homePage: {
    dashboard: '\
      <div class="console-shelf">\
        <div>dashboard</div>\
        <button>add a bill</button>\
        <button>settle up</button>\
      </div>\
      <div class="console-shelf">\
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
      <div class="console-shelf">\
        <div>YOU OWE</div>\
        <div>listchart</div>\
        <div>YOU ARE OWED</div>\
      </div>\
      <div class="console-shelf">\
        <div>YOU OWE item</div>\
        <div>YOU ARE OWED item</div>\
      </div>',
    main: '\
      <div class="screen">\
        <div class="header">\
          <div>splitwise</div>\
          <div class="session-owner">logout from {{user-name}}</div>\
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
            {{console-content}}\
          </div>\
          <div class="ad-space"></div>\
        </div>\
      </div>'
  },
  logOutPage: '\
    <div class="screen">\
      <div>goodbye</div>\
    </div>'
};

// removes all html nested within body element
function clearScreen() {
  document.body.removeChild(document.querySelector('.screen'));
}

// sets up Sign Up Page for new users
function drawSignUpPage() {
  var htmlElements = document.body.innerHTML = templateStrings.signUpPage;

  document.body.querySelector('.sign-up-button').addEventListener('click', storeSignUpData);
}

// Stores name, email, and pw of new user in local storage, then calls
// drawHomepage to move user to homepage
function storeSignUpData() {
  var userName = document.querySelector('.user-name').value;
  localStorage.setItem('session.user', userName);

  var userEmail = document.querySelector('.user-email').value;
  localStorage.setItem('session.email', userEmail);

  var userPassword = document.querySelector('.user-password').value;
  localStorage.setItem('session.password', userPassword);

  localStorage.setItem('session.known', 'true')

  drawHomepage();
}

// sets up homepage
function drawHomepage() {
  // clearScreen();

  var htmlStr = templateStrings.homePage.main;
  htmlStr = htmlStr.replace('{{console-content}}', templateStrings.homePage.dashboard);

  var userName = localStorage.getItem('session.user');
  htmlStr = htmlStr.replace('{{user-name}}', userName);

  var homepageElements = document.body.innerHTML = htmlStr;

  document.body.querySelector('.session-owner').addEventListener('click', logOut);
}

// logs user out of homepage and takes them to signed out page
function logOut() {
  clearScreen();
  localStorage.removeItem('session.known');
  document.body.innerHTML = templateStrings.logOutPage;
}

// check whether user has signed up already.  if so, go directly to homepage
var isKnownUser = localStorage.getItem('session.known');
if (isKnownUser === 'true') {
  drawHomepage();
} else {
  drawSignUpPage();
}
