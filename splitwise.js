
// TODO THIS COMMIT
// modify log-in page to have sign-up and log-in component
// function to check if user email is known and load user's homepage if it is
// function to find attributes of userId associated with email

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

var templateStrings = {
  signUpPage: '\
    <div class="screen">\
      <div class="sign-up-segment">\
        <div>My name is...</div>\
        <input class="user-name" type="text">\
        <div>My email is...</div>\
        <input class="sign-up-user-email" type="text">\
        <div>My password is...</div>\
        <input class="user-password" type="text">\
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
  document.body.querySelector('.log-in-button').addEventListener('click', findUserIdWithEmail);
}

// Stores name, email, and pw of new user in local storage, then calls
// drawHomepage to move user to homepage
function storeSignUpData() {
  var userName = document.querySelector('.user-name').value;
  localStorage.setItem('session.user', userName);

  var userEmail = document.querySelector('.sign-up-user-email').value;
  localStorage.setItem('session.email', userEmail);

  var userPassword = document.querySelector('.user-password').value;
  localStorage.setItem('session.password', userPassword);

  localStorage.setItem('session.known', 'true')

  drawHomepage();
}


// function
// function LogIn() {
//   // checks to see whether user email address is associated with a known User ID.
//   // if it is, logs in and loads homepage with user's associated data
//   // if not, prompts user to sign up with message
//   var found = emailExistsInLocalStorage();
//   if (found === true) {
//     // assign session.user to
//     drawHomepage();
//     // populate username in logout button
//     var userName = localStorage.getItem('session.user');
//     htmlStr = htmlStr.replace('{{user-name}}', userName);
//   }
//     // populate homepage with user's information??
//   } else {
//   }
// }

// user puts in email in log-in field. sessionUserId is determined
sessionUserId = null;
function findUserIdWithEmail() {
  var userEmail = document.querySelector('.log-in-user-email').value;
  for (var i = 0; i < Infinity; i++) {
    var key = 'user.' + i + '.email';
    var value = localStorage.getItem(key);
    if (userEmail === value) {
      sessionUserId = i;
      findAttributesOfSessionUserId();
      drawHomepage();
      break;
    } else if (value === null) {
      alert("Your email is not in our database! Please sign up.");
      break;
    }
  }
}

// find all attributes of sessionUserId

function findAttributesOfSessionUserId() {
  var sessionUserNameKey = 'user.' + sessionUserId + '.name';
  var sessionUserName = localStorage.getItem(sessionUserNameKey);

  var sessionUserGroupIdsKey = 'user.' + sessionUserId + '.groupIds';
  var sessionUserGroupIds = localStorage.getItem(sessionUserGroupIdsKey);
}

// // using sessionUserId  fields on homepage are autopopulated
// function populateHomepageforSessionUserId() {
//   // populate username in logout bar
//   var sessionUserName = localStorage.getItem('sessionUser.name');
//   htmlStr = htmlStr.replace('{{user-name}}', sessionUserName);
//
//   // populate groups
//   // populate bills
//   // populate payments
//   //
// }

// sets up generic homepage
function drawHomepage() {
  // clearScreen();

  var htmlStr = templateStrings.homePage.main;
  htmlStr = htmlStr.replace('{{console-content}}', templateStrings.homePage.dashboard);

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

// Return the number of the type of model specified.
// For example, if there are two bills in local storage, then...
//   getModelCount('bills') ==> 2
function getModelCount(modelType) {
  var numModels = 0;
  for (var i = 0; i < Infinity; i++) {
    var key = modelType + '.' + i + '.id';
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
  var amountKey = 'bills.' + id + '.amount';
  var dateKey = 'bills.' + id + '.date';
  var groupIdKey = 'bills.' + id + '.groupId';
  var nameKey = 'bills.' + id + '.name';

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

// populate local storage when loading page
populateLocalStorage();
