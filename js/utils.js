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

function populateLocalStorage() {
  localStorage.setItem('group.0.name', '1461 Pine St');
  localStorage.setItem('group.1.name', 'Cali House Trip');
  localStorage.setItem('group.2.name', 'Yosemite Camping Trip');

  localStorage.setItem('bill.0.amount', '100.00');
  localStorage.setItem('bill.0.date', 'January 15, 2016');
  localStorage.setItem('bill.0.name', 'boxes');
  localStorage.setItem('bill.0.groupId', '0');
  localStorage.setItem('bill.1.amount', '140.00');
  localStorage.setItem('bill.1.date', 'January 13, 2016');
  localStorage.setItem('bill.1.name', 'cheetos');
  localStorage.setItem('bill.1.groupId', '0');
  localStorage.setItem('bill.2.amount', '9.00');
  localStorage.setItem('bill.2.date', 'February 4, 2016');
  localStorage.setItem('bill.2.name', 'count chocula');
  localStorage.setItem('bill.2.groupId', '1');
  localStorage.setItem('bill.3.amount', '7.00');
  localStorage.setItem('bill.3.date', 'February 3, 2016');
  localStorage.setItem('bill.3.name', 'corn pops');
  localStorage.setItem('bill.3.groupId', '1');
  localStorage.setItem('bill.4.amount', '80.00');
  localStorage.setItem('bill.4.date', 'March 22, 2016');
  localStorage.setItem('bill.4.name', 'condoms');
  localStorage.setItem('bill.4.groupId', '2');
  localStorage.setItem('bill.5.amount', '75.00');
  localStorage.setItem('bill.5.date', 'March 24, 2016');
  localStorage.setItem('bill.5.name', 'chocolate');
  localStorage.setItem('bill.5.groupId', '2');


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

function removeDashboard () {
  document.querySelector('.dashboard').innerHTML = '';
}

function removeGroupPage () {
  document.querySelector('.draw-group-page').innerHTML = '';
}

function clearScreen() {
  document.body.innerHTML = '';
}

function showAddABill() {
  document.querySelector('.add-bill-form').style.display = "flex";
}

function hideAddABill() {
  document.querySelector('.add-bill-form').style.display = "none";
  hideChooseGroupForm();
}

function showChooseGroupForm() {
  document.querySelector('.choose-group-form').style.display = "flex";
}

function hideChooseGroupForm() {
  document.querySelector('.choose-group-form').style.display = "none";
}

function setGroup() {
  document.querySelector('.add-bill__choose-group-form').innerHTML = this.innerHTML;
  hideChooseGroupForm();
}
