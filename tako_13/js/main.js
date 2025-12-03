document.addEventListener('DOMContentLoaded', () => {
  const box = document.querySelector('.box');
  const buttons = document.querySelectorAll('.btn_box button');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const btnClass = button.className;
      box.className = 'box ' + btnClass;
      console.log(btnClass);
    });
  });

});