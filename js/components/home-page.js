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
            <div class="choose-group-form">\</div>\
            <div class="draw-group-page"></div>\
            <div class="dashboard"></div>\
            <div class="hidden-bill-form"></div>\
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
    removeGroupPage();

    //draw addabill, but it is hidden until click event makes it visible
    drawAddABill();

    //drawChooseGroupForm, but it is hidden until click event makes it visible
    drawChooseGroupForm();

    // Finally, set up bindings.
    document.querySelector('.current-user-name').addEventListener('click', logOut);
    document.querySelector('.nav-dashboard').addEventListener('click', drawDashboard);

    // make every add-bill-button a binding
    var addBillButtonEls = document.querySelectorAll('.add-bill-button');
    for (var i = 0; i < addBillButtonEls.length; i++) {
      addBillButtonEls[i].addEventListener('click', showAddABill);
    }

    // make every group choice element a binding in nav menu
    var groupListItemEls = document.querySelectorAll('.group-list-item');
    for (var i = 0; i < groupListItemEls.length; i++) {
      groupListItemEls[i].addEventListener('click', drawGroupPage);
    }
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
