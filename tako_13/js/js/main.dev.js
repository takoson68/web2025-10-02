"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var box = document.querySelector('.box');
  var buttons = document.querySelectorAll('.btn_box button');
  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var btnClass = button.className;
      box.className = 'box ' + btnClass;
    });
  });
});