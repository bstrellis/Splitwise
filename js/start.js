// check whether user has signed up already.  if so, go directly to homepage
if (localStorage.getItem('session.userId') === null) {
  drawSignUpPage();
} else {
  drawHomepage();
}
