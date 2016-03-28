var drawSignUpPage = (function () {
  var templateStr = '\
    <div>\
      <div class="sign-up-segment">\
        <div>My name is...</div>\
        <input class="sign-up-user-name" type="text">\
        <div>My email is...</div>\
        <input class="sign-up-user-email" type="text">\
        <button class="sign-up-button front-page-button">sign up</button>\
      </div>\
      <div class="log-in-segment">\
        <div>Im a known user and my email is...</div>\
        <input class="log-in-user-email" type="text">\
        <button class="log-in-button front-page-button">log in</button>\
      </div>\
    </div>';

  function drawSignUpPage() {
    document.body.innerHTML = templateStr;

    document.body.querySelector('.sign-up-button').addEventListener('click', signUp);
    document.body.querySelector('.log-in-button').addEventListener('click', logIn);
  }

  function signUp() {
    if (!signUpInfoIsValid()) {
      alert('shits not valid, bra');
      return;
    }

    var newUserId = createUser();
    localStorage.setItem('session.userId', newUserId);
    drawHomepage();
  }

  function signUpInfoIsValid() {
    var userName = document.querySelector('.sign-up-user-name').value;
    if (userName.length === 0) {
      return false;
    }

    var userEmail = document.querySelector('.sign-up-user-email').value;
    if (userEmail.length === 0) {
      return false;
    }

    if (userEmail.indexOf('@') === -1 || userEmail.indexOf('.') === -1) {
      return false;
    }

    return findUserIdWithEmail(userEmail) === null;
  }

  function createUser() {
    var newUserId = getModelCount('user');

    var userName = document.querySelector('.sign-up-user-name').value;
    localStorage.setItem('user.' + newUserId + '.name', userName);

    var userEmail = document.querySelector('.sign-up-user-email').value;
    localStorage.setItem('user.' + newUserId + '.email', userEmail);

    localStorage.setItem('user.' + newUserId + '.groupIds', '');

    return newUserId;
  }

  function logIn() {
    var userEmail = document.querySelector('.log-in-user-email').value;
    var currentUserId = findUserIdWithEmail(userEmail)
    if (currentUserId === null) {
      alert("Your email is not in our database! Please sign up.");
    } else {
      localStorage.setItem('session.userId', currentUserId);
      drawHomepage();
    }
  }

  function findUserIdWithEmail(email) {
    for (var i = 0; i < Infinity; i++) {
      var key = 'user.' + i + '.email';
      var value = localStorage.getItem(key);
      if (email === value) {
        return i;
      } else if (value === null) {
        return null;
      }
    }
  }
  return drawSignUpPage;
})();
