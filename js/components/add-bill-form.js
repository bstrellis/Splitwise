var drawAddABill = (function () {
  var templateStr = '\
    <div class="add-bill-form">\
      <header class="add-bill__header">add a bill</header>\
      <div class="add-bill__select-friends">\
        <div>With you and:</div>\
        <input type="text" value="enter friends here">\
      </div>\
      <div class="add-bill__description">\
        <div>\
          <div class="add-bill__description--icon"></div>\
        </div>\
        <div class="add-bill__description--input">\
          <input class="add-bill__description--input-button" type="text" value="bill description">\
          <input class="add-bill__amount--input-button" type="text" value="bill amount">\
        </div>\
      </div>\
      <div>\
        <div class="add-bill__paid-by">\
          <div>paid by you and split equally</div>\
          <div>$ per person</div>\
        </div>\
      </div>\
      <div class="add-bill__additional-options">\
        <input class="add-bill__date--input-button" type="text" value="date">\
        <button class="add-bill__additional-options--button">add image or notes</button>\
        <button class="add-bill__additional-options--button add-bill__choose-group-form">choose group</button>\
      </div>\
      <div class="add-bill__cancel-or-save">\
        <button class="add-bill__cancel">cancel</button>\
        <button class="add-bill__save">save</button>\
      </div>\
    </div>';

  // draws add a bill form
  function drawAddABill () {
    document.querySelector('.hidden-bill-form').innerHTML = templateStr;
    document.querySelector('.add-bill__choose-group-form').addEventListener('click', drawChooseGroupForm);

    document.querySelector('.add-bill__cancel').addEventListener('click', hideAddABill);
    document.querySelector('.add-bill__save').addEventListener('click', saveBill);

  }

  return drawAddABill;
})();
