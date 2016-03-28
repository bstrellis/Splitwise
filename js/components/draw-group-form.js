var drawChooseGroupForm = (function () {
  var templateStr = '\
    <div class="add-bill__header">\
      <div>choose group</div>\
      <div class="ex-out-of-group-form"></div>\
    </div>\
    <div class="group-choices">\
    <div class="group-choice">non-group expenses</div>\
      {{choose-group-form-menu}}\
    </div>';

  function drawChooseGroupForm () {
    var groupsStr = buildGroupListHtmlStr();
    groupsStr = groupsStr.replace(/group-list-item/g, 'group-choice');
    templateStr = templateStr.replace('{{choose-group-form-menu}}', groupsStr);
    document.body.innerHTML = document.body.innerHTML.replace('{{choose-group-form}}', templateStr);
  }

  return drawChooseGroupForm;
})();
