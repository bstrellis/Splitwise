var drawDashboard = (function () {
  var templateStr = '\
    <div class="dashboardcontainer">\
      <div class="console-shelf console-shelf__dashboard">\
        <div class="dashboard-title">dashboard</div>\
        <div class="dashboard-buttons">\
          <button class="add-bill-button dashboard-button">Add a Bill</button>\
          <button class="settle-up-button dashboard-button">Settle up</button>\
        </div>\
      </div>\
      <div class="console-shelf console-shelf-2">\
        <div class="shelf-2-container">\
          <div class="shelf-2-text">total balance</div>\
          <div class="shelf-2-number">$90</div>\
        </div>\
        <div class="shelf-2-container shelf-2-center">\
          <div class="shelf-2-text">you owe</div>\
          <div class="shelf-2-number">$90</div>\
        </div>\
        <div class="shelf-2-container">\
          <div class="shelf-2-text">you are owed</div>\
          <div class="shelf-2-number">$90</div>\
        </div>\
      </div>\
      <div class="console-shelf console-shelf-3">\
        <div class="shelf-3-text">YOU OWE</div>\
        <div class="listcharts">\
          <div class="listchart-container">\
            <div class="listchart-icon--list"></div>\
          view as list\
          </div>\
          <div class="listchart-container listchart-container2">\
            <div class="listchart-icon--chart"></div>\
          view chart\
          </div>\
        </div>\
        <div class="shelf-3-text">YOU ARE OWED</div>\
      </div>\
      <div class="console-shelf">\
        <div></div>\
        <div></div>\
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
