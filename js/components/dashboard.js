var drawDashboard = (function () {
  var templateStr = '\
    <div class="dashboardcontainer">\
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
      </div>\
    </div>';

  function drawDashboard () {
    removeGroupPage();
    document.querySelector('.dashboard').innerHTML = templateStr;

    var addBillButtonEls = document.querySelectorAll('.add-bill-button');
    for (var i = 0; i < addBillButtonEls.length; i++) {
      addBillButtonEls[i].addEventListener('click', showAddABill);
    }
  }

  return drawDashboard;
})();
