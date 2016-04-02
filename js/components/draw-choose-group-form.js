var drawChooseGroupForm = (function () {
  var templateStr = '\
    <div class="add-bill__header">\
      <div>Choose group</div>\
      <div class="add-bill__header-icon close-choose-group-form"></div>\
    </div>\
    <div class="group-choices">\
    <div class="group-choice group-choice__chosen">Non-group expenses</div>\
    <div class="choose-group-form-menu">\
    </div>';

  function drawChooseGroupForm () {
    document.querySelector('.choose-group-form').innerHTML = templateStr;
    var groupsStr = buildGroupListHtmlStr();
    groupsStr = groupsStr.replace(/group-list-item/g, 'group-choice');
    groupsStr = groupsStr.replace(/group-list-icon/g, '');
    document.querySelector('.choose-group-form-menu').innerHTML = groupsStr;


    // make every group choice element a binding in choose-group-form
    var groupChoiceEls = document.querySelectorAll('.group-choice');
    for (var i = 0; i < groupChoiceEls.length; i++) {
      groupChoiceEls[i].addEventListener('click', setGroup);
    }

    document.querySelector('.close-choose-group-form').addEventListener('click', hideChooseGroupForm);
    document.querySelector('.add-bill__choose-group-form').addEventListener('click', showChooseGroupForm);
  }

  return drawChooseGroupForm;
})();

// after group is selected, you can't reopen the form and make a new choice
