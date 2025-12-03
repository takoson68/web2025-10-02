document.addEventListener('DOMContentLoaded', () => {
  const calculateBtn = document.getElementById('calculate-btn');
  const resultDiv = document.getElementById('result');

  calculateBtn.addEventListener('click', () => {
    const expenses = parseFloat(document.getElementById('expenses').value) || 0;
    const years = parseFloat(document.getElementById('years').value) || 0;
    const currentSavings = parseFloat(document.getElementById('current-savings').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;

    if (expenses <= 0 || years <= 0 || rate <= 0) {
      resultDiv.innerHTML = '<p style="color: red;">請輸入有效的數值 (開銷、年限、報酬率需大於 0)</p>';
      return;
    }

    // 1. 計算目標資金（財富自由數字）
    // 假設我們希望靠投資回報生活（永續年金）
    // 目標資金 * 年報酬率 = 年開銷
    // 目標資金 = (月開銷 * 12) / (年報酬率 / 100)
    const annualRateDecimal = rate / 100;
    const targetCapital = (expenses * 12) / annualRateDecimal;

    // 2. 計算目前存款的未來價值
    // FV = PV * (1 + r/n)^(nt)
    // 假設每月複利
    const monthlyRate = annualRateDecimal / 12;
    const totalMonths = years * 12;
    const fvCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, totalMonths);

    // 3. 計算資金缺口
    const shortfall = targetCapital - fvCurrentSavings;

    let monthlyDeposit = 0;
    if (shortfall > 0) {
      // 4. 計算每月需存金額 (PMT)
      // PMT = FV * r / ((1 + r)^n - 1)
      monthlyDeposit = shortfall * monthlyRate / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    // 格式化數字
    const fmt = (num) => Math.round(num).toLocaleString();

    resultDiv.innerHTML = `
      <h3>計算結果</h3>
      <p>為了在 <strong>${years}</strong> 年後達到財富自由（完全靠被動收入覆蓋每月 <strong>${fmt(expenses)}</strong> 元開銷）：</p>
      <ul>
        <li>你需要累積的總資產目標為：<strong>${fmt(targetCapital)}</strong> 元</li>
        <li>目前存款在 ${years} 年後會成長為：<strong>${fmt(fvCurrentSavings)}</strong> 元</li>
        <li>${shortfall > 0 ? `你每個月還需要投資：<strong>${fmt(monthlyDeposit)}</strong> 元` : `恭喜！以目前的存款和複利，你已經可以在 ${years} 年後達成目標，不需要額外存錢。`}</li>
      </ul>
      <p class="note">註：此計算假設年化報酬率為 ${rate}%，且退休後僅使用投資收益支付開銷（本金不動）。</p>
    `;
  });
});