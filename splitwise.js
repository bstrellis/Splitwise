// TODO THIS COMMIT
// friends populates based on groups
// TODO THIS COMMIT
// add a bill

var templateStrings = {
  group: '<div>{{group-name}}</div>',

  signUpPage: '\
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
      <div>\
        <div class="header">\
          <div>splitwise</div>\
          <div class="session-owner">logout from {{user-name}}</div>\
        </div>\
        <div class="homepage">\
          <div class="navigation">\
            <div>dashboard</div>\
            <div>recent activity</div>\
            <div>all expenses</div>\
            <div class="groups">groups</div>\
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
    <div>\
      <div>goodbye</div>\
    </div>'
};

function populateLocalStorage() {
  localStorage.setItem('group.0.name', '1461 Pine St');
  localStorage.setItem('group.1.name', 'Cali House Trip');
  localStorage.setItem('group.2.name', 'Yosemite Camping Trip');

  localStorage.setItem('bill.0.amount', '140.00');
  localStorage.setItem('bill.0.date', 'January 13, 2016');
  localStorage.setItem('bill.0.name', 'cheetos');
  localStorage.setItem('bill.0.groupId', '0');
  localStorage.setItem('bill.1.amount', '7.00');
  localStorage.setItem('bill.1.date', 'February 3, 2016');
  localStorage.setItem('bill.1.name', 'corn pops');
  localStorage.setItem('bill.1.groupId', '1');
  localStorage.setItem('bill.2.amount', '80.00');
  localStorage.setItem('bill.2.date', 'March 22, 2016');
  localStorage.setItem('bill.2.name', 'condoms');
  localStorage.setItem('bill.2.groupId', '2');

  localStorage.setItem('user.0.email', 'bob@bob.com');
  localStorage.setItem('user.0.name', 'bob');
  localStorage.setItem('user.0.groupIds', '0,1');
  localStorage.setItem('user.1.email', 'joe@joe.com');
  localStorage.setItem('user.1.name', 'joe');
  localStorage.setItem('user.1.groupIds', '0,1');
  localStorage.setItem('user.2.email', 'terrance@terrance.com');
  localStorage.setItem('user.2.name', 'terrance');
  localStorage.setItem('user.2.groupIds', '0,2');

  localStorage.setItem('payment.0.amount', '130.00');
  localStorage.setItem('payment.0.date', 'January 16, 2016');
  localStorage.setItem('payment.0.billId', '0');
  localStorage.setItem('payment.0.userId', '1');
  localStorage.setItem('payment.1.amount', '30.00');
  localStorage.setItem('payment.1.date', 'February 28, 2016');
  localStorage.setItem('payment.1.billId', '1');
  localStorage.setItem('payment.1.userId', '0');
  localStorage.setItem('payment.2.amount', '100.00');
  localStorage.setItem('payment.2.date', 'March 27, 2016');
  localStorage.setItem('payment.2.billId', '2');
  localStorage.setItem('payment.2.userId', '2');
}

function clearScreen() {
  document.body.innerHTML = '';
}

function drawSignUpPage() {
  document.body.innerHTML = templateStrings.signUpPage;

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

// function findAttributesOfSessionUserId() {
//   var sessionUserNameKey = 'user.' + sessionUserId + '.name';
//   var sessionUserName = localStorage.getItem(sessionUserNameKey);
//
//   var sessionUserGroupIdsKey = 'user.' + sessionUserId + '.groupIds';
//   var sessionUserGroupIds = localStorage.getItem(sessionUserGroupIdsKey);
// }

function drawHomepage() {
  // clearScreen();

  var htmlStr = templateStrings.homePage.main;
  htmlStr = htmlStr.replace('{{console-content}}', templateStrings.homePage.dashboard);

  currentUserId = parseInt(localStorage.getItem('session.userId'));
  var sessionUserName = localStorage.getItem('user.' + currentUserId + '.name');
  htmlStr = htmlStr.replace('{{user-name}}', sessionUserName);

  document.body.innerHTML = htmlStr;

  // create div for each group the user belongs to
  var groupIds = localStorage.getItem('user.' + currentUserId + '.groupIds');
  if (groupIds.length !== 0) {
    groupIds = groupIds.split(',');
    for (var i = 0; i < groupIds.length; i++) {
      var groupName = localStorage.getItem('group.' + i + '.name');
      var groupStr = templateStrings.group;
      groupStr = groupStr.replace('{{group-name}}', groupName);
      var groupsContainer = document.querySelector('.groups');
      groupsContainer.innerHTML += groupStr;
    }
  }

  // populate total balance, you are owed, and you owe fields
  // var


  document.body.querySelector('.session-owner').addEventListener('click', logOut);

  populateHomepageForUser();
}

// logs user out of homepage and takes them to signed out page
function logOut() {
  clearScreen();
  localStorage.removeItem('session.userId');
  document.body.innerHTML = templateStrings.logOutPage;
}

// Return the number of the type of model specified.
// For example, if there are two bills in local storage, then...
//   getModelCount('bill') ==> 2
function getModelCount(modelType) {
  var numModels = 0;
  for (var i = 0; i < Infinity; i++) {
    if (modelType === 'bill' || modelType === 'user' || modelType === 'group') {
      var key = modelType + '.' + i + '.name';
    } else {
      var key = modelType + '.' + i + '.amount';
    }
    var value = localStorage.getItem(key);
    if (value === null) {
      break;
    } else {
      numModels++;
    }
  }
  return numModels;
}

// return bill if it belongs to user, otherwise, reject user's attempt
function findBillWithIdForUser(id, user) {
  var amountKey = 'bill.' + id + '.amount';
  var dateKey = 'bill.' + id + '.date';
  var groupIdKey = 'bill.' + id + '.groupId';
  var nameKey = 'bill.' + id + '.name';

  var groupIdOfBill = parseInt(localStorage.getItem(groupIdKey));
  var userCanAccessBill = itemExistsInArray(groupIdOfBill, user.groupIds);
  if (userCanAccessBill) {
    return {
      id: parseInt(id),
      amount: parseInt(localStorage.getItem(amountKey)),
      date: new Date(localStorage.getItem(dateKey)),
      groupId: groupIdOfBill,
      name: localStorage.getItem(nameKey)
    };
  } else {
    throw new Error('Access denied!');
  }
}

// does this thing exist?
function itemExistsInArray(item, array) {
  for (var i = 0; i < array.length; i++) {
    if (item === array[i]) {
      return true;
    }
  }

  return false;
}

// find all the bills!
function findAllBillsForUser(user) {
  var bills = [];

  for (var i = 0; i < getModelCount('bills'); i++) {
    var bill = findBillWithIdForUser(i, user);
    if (itemExistsInArray(bill.groupId, user.groupIds)) {
      bills.push(bill);
    }
  }

  return bills;
}

// check whether user has signed up already.  if so, go directly to homepage
if (localStorage.getItem('session.userId') === null) {
  drawSignUpPage();
} else {
  drawHomepage();
}
