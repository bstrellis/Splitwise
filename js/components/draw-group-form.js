var drawChooseGroupForm = (function () {
  var templateStr = '\
    <div class="add-bill__header">\
      <div>choose group</div>\
      <div class="ex-out-of-group-form"></div>\
    </div>\
    <div>non-group expenses</div>\
    <div>\
      {{choose-group-form-menu}}\
    </div>';

  function drawChooseGroupForm () {
    var groupsStr = buildGroupListHtmlStr();
    templateStr = templateStr.replace('{{choose-group-form-menu}}', groupsStr);
    document.body.innerHTML = document.body.innerHTML.replace('{{choose-group-form}}', templateStr);
  }

  return drawChooseGroupForm;
})();
