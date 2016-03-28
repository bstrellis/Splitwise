function chooseGroup () {

var templateStr = '<div class="chosen-group">{{chosen-group}}</div>'
  // find groups user belongs to
    var templateStr = buildGroupListHtmlStr();


  document.body.innerHTML = document.body.innerHTML.replace('{{chosen-group}}', groupOptionsTemplateStr);

  // create dropdown list of groups user belongs to
  // add html for each group and position absolutely underneath each other
  // remove html and autofill input field with selected group on click event
}
