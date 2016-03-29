var drawHomepage = (function () {
  var templateStrs = {
    friend: '<div class="friend">{{friend-name}}</div>',



    main: '\
      <div>\
        <div class="header">\
          <div>splitwise</div>\
          <button class="current-user-name">logout from {{user-name}}</button>\
        </div>\
        <div class="homepage">\
          <div class="navigation">\
            <div class="nav-dashboard">dashboard</div>\
            <div>recent activity</div>\
            <div>all expenses</div>\
            <div>{{group-list}}</div>\
            <div>{{friend-list}}</div>\
          </div>\
          <div class="console">\
            {{console-content}}\
            {{group-page}}\
          </div>\
          <div class="ad-space"></div>\
        </div>\
      </div>'
  };

  function drawHomepage() {
    // First, build the HTML string.
    var htmlStr = templateStrs.main
      .replace('{{user-name}}', getCurrentUserName())
      .replace('{{group-list}}', buildGroupListHtmlStr())
      .replace('{{friend-list}}', buildFriendListHtmlStr());

    // Then, add the HTML string to the DOM.
    document.body.innerHTML = htmlStr;

    drawDashboard();
    drawGroupPage();

    //draw addabill, but it is hidden until click event makes it visible
    drawAddABill();

    //drawChooseGroupForm, but it is hidden until click event makes it visible
    drawChooseGroupForm();

    // Finally, set up bindings.
    document.querySelector('.current-user-name').addEventListener('click', logOut);
    document.querySelector('.nav-dashboard').addEventListener('click', showDashboard);
    document.querySelector('.add-bill__cancel').addEventListener('click', hideAddABill);
    document.querySelector('.add-bill__choose-group-form').addEventListener('click', showChooseGroupForm);
    document.querySelector('.ex-out-of-group-form').addEventListener('click', hideChooseGroupForm);
    // make every add-bill-button a binding
    var addBillButtonEls = document.querySelectorAll('.add-bill-button');
    for (var i = 0; i < addBillButtonEls.length; i++) {
      addBillButtonEls[i].addEventListener('click', showAddABill);
    }
    // make every group choice element a binding in choose-group-form
    var groupChoiceEls = document.querySelectorAll('.group-choice');
    for (var i = 0; i < groupChoiceEls.length; i++) {
      groupChoiceEls[i].addEventListener('click', setGroup);
    }
    // make every group choice element a binding in nav menu
    var groupListItemEls = document.querySelectorAll('.group-list-item');
    for (var i = 0; i < groupListItemEls.length; i++) {
      groupListItemEls[i].addEventListener('click', showGroupPage);
    }
  }

  function showGroupPage() {
    document.querySelector('.group-page').style.display = "flex";
    hideDashboard();
  }

  function hideGroupPage() {
    document.querySelector('.group-page').style.display = "none";
    hideChooseGroupForm();
  }

  function showDashboard() {
    document.querySelector('.dashboard').style.display = "flex";
    hideGroupPage();
  }

  function hideDashboard() {
    document.querySelector('.dashboard').style.display = "none";
    hideChooseGroupForm();
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
    document.body.innerHTML = document.body.innerHTML.replace('choose group', this.innerHTML);
    hideChooseGroupForm();
  }

  function getCurrentUserName() {
    var currentUserId = parseInt(localStorage.getItem('session.userId'));
    return localStorage.getItem('user.' + currentUserId + '.name');
  }

  function buildFriendListHtmlStr() {
    currentUserId = parseInt(localStorage.getItem('session.userId'));
    var currentUserGroupIds = localStorage.getItem('user.' + currentUserId + '.groupIds');
    var friendListHtmlStr = '<div>friends</div>';

    currentUserId = parseInt(localStorage.getItem('session.userId'));
    var userIdsAlreadyAdded = [];
    var numberOfUsers = getModelCount('user');
    for (var userId = 0; userId < numberOfUsers; userId++) {
      if (userId === currentUserId) {
        continue;
      }

      var userGroupIds = localStorage.getItem('user.' + userId + '.groupIds');
      userGroupIds = userGroupIds.split(',');
      for (var k = 0; k < currentUserGroupIds.length; k++) {
        for (var l = 0; l < userGroupIds.length; l++) {
          if (userIdsAlreadyAdded.indexOf(userId) !== -1 ||
              currentUserGroupIds[k] !== userGroupIds[l]) {
            continue;
          }
          var friendName = localStorage.getItem('user.' + userId + '.name');
          var friendStr = templateStrs.friend;
          friendStr = friendStr.replace('{{friend-name}}', friendName);
          friendListHtmlStr += friendStr;
          userIdsAlreadyAdded.push(userId);
        }
      }
    }

    return friendListHtmlStr;
  }

  return drawHomepage;
})();
