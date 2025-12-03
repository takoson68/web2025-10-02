document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('calc-display');
    const historyDisplay = document.getElementById('calc-history');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '0';
    let previousInput = '';
    let operator = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.dataset.action;
            const value = button.dataset.value;

            if (value !== undefined) {
                handleNumber(value);
            } else {
                handleAction(action);
            }
        });
    });

    function handleNumber(num) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = num;
            shouldResetDisplay = false;
        } else {
            // Prevent multiple decimals
            if (num === '.' && currentInput.includes('.')) return;
            currentInput += num;
        }
        updateDisplay();
    }

    function handleAction(action) {
        switch (action) {
            case 'clear':
                currentInput = '0';
                previousInput = '';
                operator = null;
                historyDisplay.textContent = '';
                break;
            case 'backspace':
                if (shouldResetDisplay) return; // Don't backspace result
                if (currentInput.length > 1) {
                    currentInput = currentInput.slice(0, -1);
                } else {
                    currentInput = '0';
                }
                break;
            case 'percent':
                currentInput = (parseFloat(currentInput) / 100).toString();
                break;
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                handleOperator(action);
                break;
            case 'calculate':
                calculate();
                break;
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (operator !== null && !shouldResetDisplay) {
            calculate();
        }
        previousInput = currentInput;
        operator = op;
        shouldResetDisplay = true;
        updateHistory();
    }

    function calculate() {
        if (operator === null || shouldResetDisplay) return;
        
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result = 0;

        switch (operator) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                if (current === 0) {
                    alert("不能除以零！");
                    result = 0;
                } else {
                    result = prev / current;
                }
                break;
        }

        // Fix floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        // Update history before resetting operator
        historyDisplay.textContent = `${previousInput} ${getOperatorSymbol(operator)} ${currentInput} =`;

        currentInput = result.toString();
        operator = null;
        shouldResetDisplay = true;
    }

    function updateDisplay() {
        display.value = currentInput;
    }

    function updateHistory() {
        if (operator) {
            historyDisplay.textContent = `${currentInput} ${getOperatorSymbol(operator)}`;
        } else {
            historyDisplay.textContent = '';
        }
    }

    function getOperatorSymbol(op) {
        switch (op) {
            case 'add': return '+';
            case 'subtract': return '-';
            case 'multiply': return '×';
            case 'divide': return '÷';
            default: return '';
        }
    }
});
