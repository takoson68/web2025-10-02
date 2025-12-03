// Vue 2 計算機
new Vue({
  el: '#app',
  data() {
    return {
      display: '0',
      history: '',
      previousValue: null,
      currentOperator: null,
      shouldResetDisplay: false
    };
  },
  methods: {
    // 輸入數字
    appendNumber(num) {
      if (this.display === '0' || this.shouldResetDisplay) {
        this.display = num;
        this.shouldResetDisplay = false;
      } else {
        // 防止多個小數點
        if (num === '.' && this.display.includes('.')) return;
        this.display += num;
      }
    },

    // 清除
    clear() {
      this.display = '0';
      this.history = '';
      this.previousValue = null;
      this.currentOperator = null;
      this.shouldResetDisplay = false;
    },

    // 倒退
    backspace() {
      if (this.shouldResetDisplay) return;
      if (this.display.length > 1) {
        this.display = this.display.slice(0, -1);
      } else {
        this.display = '0';
      }
    },

    // 百分比
    percent() {
      this.display = String(parseFloat(this.display) / 100);
    },

    // 運算符號
    operate(operator) {
      if (this.currentOperator !== null && !this.shouldResetDisplay) {
        this.calculate();
      }
      this.previousValue = parseFloat(this.display);
      this.currentOperator = operator;
      this.shouldResetDisplay = true;
      this.history = `${this.display} ${operator}`;
    },

    // 計算結果
    calculate() {
      if (this.currentOperator === null || this.shouldResetDisplay) return;

      const prev = this.previousValue;
      const current = parseFloat(this.display);
      let result = 0;

      switch (this.currentOperator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '×':
          result = prev * current;
          break;
        case '÷':
          if (current === 0) {
            alert('不能除以零！');
            this.clear();
            return;
          }
          result = prev / current;
          break;
      }

      // 修正浮點數精度問題
      result = Math.round(result * 100000000) / 100000000;

      // 更新歷史記錄
      this.history = `${prev} ${this.currentOperator} ${current} =`;

      this.display = String(result);
      this.currentOperator = null;
      this.shouldResetDisplay = true;
    }
  }
});
