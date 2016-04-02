var drawAddABill = (function () {
  var templateStr = '\
    <div class="add-bill-form">\
      <header class="add-bill__header">Add a bill\
        <div class="add-bill__header-icon"></div>\
      </header>\
      <div class="add-bill__select-friends">\
        <div>With <strong>you</strong> and:</div>\
        <input type="text" class="add-bill__input" value="Enter friends here">\
      </div>\
      <div class="add-bill__description">\
        <div>\
          <div class="add-bill__description--icon"></div>\
        </div>\
        <div class="add-bill__description--input">\
          <input class="add-bill__description--input-button" type="text" value="Enter a description">\
          <div class="add_bill__dollars">\
            <div class="add_bill__dollars-icon"></div>\
            <input class="add-bill__amount--input-button" type="text" value="0.00">\
          </div>\
        </div>\
      </div>\
      <div>\
        <div class="add-bill__paid-by">\
          <div class="paid-by__sentence">\
            <div class="paid-by__text">Paid by</div>\
            <div class="paid-by__button">you</div>\
            <div class="paid-by__text">and split</div>\
            <div class="paid-by__button">equally</div>\
            <div class="period">.</div>\
          </div>\
          <div class="split">($0.00/person)</div>\
        </div>\
      </div>\
      <div class="add-bill__additional-options">\
        <input class="add-bill__additional-options--button add-bill__date--input-button" type="text" value="Enter date">\
        <button class="add-bill__additional-options--button">Add image/notes</button>\
        <button class="add-bill__additional-options--button add-bill__choose-group-form">No group</button>\
      </div>\
      <div class="add-bill__cancel-or-save">\
        <button class="add-bill__cancel">Cancel</button>\
        <button class="add-bill__save">Save</button>\
      </div>\
    </div>';

  // draws add a bill form
  function drawAddABill () {
    document.querySelector('.hidden-bill-form').innerHTML = templateStr;
    document.querySelector('.add-bill__choose-group-form').addEventListener('click', drawChooseGroupForm);

    document.querySelector('.add-bill__cancel').addEventListener('click', hideAddABill);
    document.querySelector('.add-bill__save').addEventListener('click', saveBill);
    document.querySelector('.add-bill__header-icon').addEventListener('click', hideAddABill);
  }

  return drawAddABill;
})();
