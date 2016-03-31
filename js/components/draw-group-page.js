var drawGroupPage = (function () {
  var templateStr = '\
    <div class="group-page">\
      <div class="hidden-bill-form"></div>\
      <div class="group-page-header">\
        <div class="group-page-name"></div>\
        <button class="add-bill-button dashboard-button">Add a Bill</button>\
        <button class="settle-up-button dashboard-button">settle up</button>\
      </div>\
      <ul class="bill-list"></ul>\
    </div>';

  function drawGroupPage () {
    removeDashboard();

    document.querySelector('.draw-group-page').innerHTML = templateStr;

    drawAddABill();
    drawChooseGroupForm();



    var chosenGroupNameStr = this.innerHTML;
    for ( i = 0; i < getModelCount('group'); i++) {
      if (chosenGroupNameStr === localStorage.getItem('group.' + i + '.name')) {
        var chosenGroupId = i;
        break;
      }
    }

    var billItemsStr = '';
    for (j = 0; j < getModelCount('bill'); j++) {
      billItemStr = '\
        <li class="bill-item">\
          <div class="bill-date">{{bill date}}</div>\
          <div class="bill-name">{{bill name}}</div>\
          <div class="bill-amount">{{bill amount}}</div>\
        </li>';
      if (parseInt(localStorage.getItem('bill.' + j + '.groupId')) === chosenGroupId) {
        billItemStr = billItemStr.replace('{{bill date}}', localStorage.getItem('bill.' + j + '.date'));
        billItemStr = billItemStr.replace('{{bill name}}', localStorage.getItem('bill.' + j + '.name'));
        billItemStr = billItemStr.replace('{{bill amount}}', localStorage.getItem('bill.' + j + '.amount'));
        billItemsStr += billItemStr;
      }
    }

    document.querySelector('.bill-list').innerHTML = billItemsStr;
    document.querySelector('.group-page-name').innerHTML = chosenGroupNameStr;

    document.querySelector('.add-bill-button').addEventListener('click', showAddABill);
  }

  return drawGroupPage;
})();
