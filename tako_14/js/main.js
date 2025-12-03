document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitBtn');
  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');
  const resultDiv = document.getElementById('result');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = nameInput.value;
      const score = parseInt(scoreInput.value);

      if (!name || isNaN(score)) {
        resultDiv.textContent = '請輸入正確的姓名和分數';
        return;
      }

      if (score >= 60) {
        resultDiv.textContent = `${name} 的成績為 ${score} 分，及格！`;
        resultDiv.style.color = 'green';
      } else {
        resultDiv.textContent = `${name} 的成績為 ${score} 分，不及格。`;
        resultDiv.style.color = 'red';
      }
    });
  }
});