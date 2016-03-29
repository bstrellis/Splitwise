var logOut = (function () {
  var templateStr = '\
    <div>\
      <div>goodbye</div>\
    </div>';

  function logOut() {
    clearScreen();
    localStorage.removeItem('session.userId');
    document.body.innerHTML = templateStr;
  }

  return logOut;
})();
