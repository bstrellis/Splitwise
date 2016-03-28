var buildGroupListHtmlStr = (function () {
  var templateStr = '<div class="group-list-item">{{group-name}}</div>';

  function buildGroupListHtmlStr() {
    currentUserId = parseInt(localStorage.getItem('session.userId'));
    var currentUserGroupIds = localStorage.getItem('user.' + currentUserId + '.groupIds');
    if (currentUserGroupIds.length === 0) {
      return '';
    }

    var groupListHtmlStr = '';
    currentUserGroupIds = currentUserGroupIds.split(',');
    for (var i = 0; i < currentUserGroupIds.length; i++) {
      var groupName = localStorage.getItem('group.' + i + '.name');
      var groupStr = templateStr;
      groupStr = groupStr.replace('{{group-name}}', groupName);
      groupListHtmlStr += groupStr;
    }

    return groupListHtmlStr;
  }

  return buildGroupListHtmlStr;
})();
