var drawHomepage = (function () {
  var templateStrs = {
    dashboard: '\
      {{add-bill}}\
      <div class="console-shelf">\
        <div>dashboard</div>\
        <button class="add-bill-button dashboard-button">Add a Bill</button>\
        <button class="settle-up-button dashboard-button">settle up</button>\
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

    group: '<div>{{group-name}}</div>',

    friend: '<div class="friend">{{friend-name}}</div>',

    logOutPage: '\
      <div>\
        <div>goodbye</div>\
      </div>',

    main: '\
      <div>\
        <div class="header">\
          <div>splitwise</div>\
          <button class="current-user-name">logout from {{user-name}}</button>\
        </div>\
        <div class="homepage">\
          <div class="navigation">\
            <div>dashboard</div>\
            <div>recent activity</div>\
            <div>all expenses</div>\
            <div>{{group-list}}</div>\
            <div>{{friend-list}}</div>\
          </div>\
          <div class="console">\
            {{console-content}}\
          </div>\
          <div class="ad-space"></div>\
        </div>\
      </div>'
  };

  function drawHomepage() {
    // First, build the HTML string.
    var htmlStr = templateStrs.main
      .replace('{{console-content}}', templateStrs.dashboard)
      .replace('{{user-name}}', getCurrentUserName())
      .replace('{{group-list}}', buildGroupListHtmlStr())
      .replace('{{friend-list}}', buildFriendListHtmlStr());

    // Then, add the HTML string to the DOM.
    document.body.innerHTML = htmlStr;

    //draw addabill, but it is hidden until click event makes it visible
    drawAddABill();

    // Finally, set up bindings.
    document.body.querySelector('.current-user-name').addEventListener('click', logOut);
    document.body.querySelector('.add-bill-button').addEventListener('click', showAddABill);
  }

  function showAddABill() {
    document.querySelector('.add-bill-form').style.display = "flex";
  }

  function getCurrentUserName() {
    var currentUserId = parseInt(localStorage.getItem('session.userId'));
    return localStorage.getItem('user.' + currentUserId + '.name');
  }

  function buildGroupListHtmlStr() {
    currentUserId = parseInt(localStorage.getItem('session.userId'));
    var currentUserGroupIds = localStorage.getItem('user.' + currentUserId + '.groupIds');
    if (currentUserGroupIds.length === 0) {
      return '';
    }

    var groupListHtmlStr = '<div>groups</div>';
    currentUserGroupIds = currentUserGroupIds.split(',');
    for (var i = 0; i < currentUserGroupIds.length; i++) {
      var groupName = localStorage.getItem('group.' + i + '.name');
      var groupStr = templateStrs.group;
      groupStr = groupStr.replace('{{group-name}}', groupName);
      groupListHtmlStr += groupStr;
    }

    return groupListHtmlStr;
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

  function logOut() {
    clearScreen();
    localStorage.removeItem('session.userId');
    document.body.innerHTML = templateStrs.logOutPage;
  }
  return drawHomepage;
})();
