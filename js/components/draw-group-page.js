var drawGroupPage = (function () {
  var templateStr = '\
    <div class="group-page">\
      <div class="group-page-header">{{group-page-name}}\
        <button class="add-bill-button dashboard-button">Add a Bill</button>\
        <button class="settle-up-button dashboard-button">settle up</button>\
      </div>\
      <ul class="bill-list">bill list</ul>\
    </div>';

  function drawGroupPage () {
    document.body.innerHTML = document.body.innerHTML.replace('{{group-page}}', templateStr);
  }

  return drawGroupPage;
})();
