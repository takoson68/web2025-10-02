$(document).ready(() => {
  const $initial = $('#initial'); // 初始投入，單位：萬元
  const $principal = $('#principal'); // 每月投入，單位：萬元
  const $years = $('#years');
  const $rate = $('#rate');
  const $result = $('#resultValue');
  const $totalInvested = $('#totalInvested');
  const $totalReturn = $('#totalReturn');
  const $error = $('#errorMsg');
  const $yearList = $('#yearList');

  const formatNumber = (num) => {
    if (Number.isNaN(num)) return '--';
    return num.toLocaleString('zh-TW', { maximumFractionDigits: 0 });
  };

  const fvByMonths = (monthly, months, monthlyRate) => {
    if (monthlyRate === 0) return monthly * months;
    const growth = Math.pow(1 + monthlyRate, months);
    return monthly * ((growth - 1) / monthlyRate);
  };

  const calculate = () => {
    const initialInTenThousands = parseFloat($initial.val());
    const principalInTenThousands = parseFloat($principal.val());
    const years = parseInt($years.val(), 10);
    const rate = parseFloat($rate.val());

    if ([initialInTenThousands, principalInTenThousands, years, rate].some((v) => Number.isNaN(v))) {
      $error.text('請完整填寫所有欄位');
      return;
    }
    if (initialInTenThousands < 0 || principalInTenThousands < 0 || years < 1 || rate < 0) {
      $error.text('投入金額需為非負數，年數需為正整數，利率需為非負數');
      return;
    }

    $error.text('');
    $yearList.empty();

    const initial = initialInTenThousands * 10000; // 轉為元
    const monthly = principalInTenThousands * 10000; // 轉為元
    const months = years * 12;
    const monthlyRate = rate / 100 / 12;

    const fvInitial = initial * Math.pow(1 + monthlyRate, months);
    const fvSip = fvByMonths(monthly, months, monthlyRate);
    const fv = fvInitial + fvSip;

    const totalInvest = initial + monthly * months;
    const totalReturn = fv - totalInvest;

    $result.text(`${formatNumber(fv)} 元`);
    $totalInvested.text(`${formatNumber(totalInvest)} 元`);
    $totalReturn.text(`${formatNumber(totalReturn)} 元`);

    let prevValue = 0;
    for (let y = 1; y <= years; y += 1) {
      const m = y * 12;
      const valueInitial = initial * Math.pow(1 + monthlyRate, m);
      const valueSip = fvByMonths(monthly, m, monthlyRate);
      const value = valueInitial + valueSip;
      const delta = value - prevValue;
      const item = `
        <li class="year-item">
          <span class="year-label">第${y}年</span>
          <span class="year-amount">${formatNumber(value)} 元</span>
          <span class="year-delta">+${formatNumber(delta)} 元</span>
        </li>
      `;
      $yearList.append(item);
      prevValue = value;
    }
  };

  $('#calcBtn').on('click', calculate);
});
