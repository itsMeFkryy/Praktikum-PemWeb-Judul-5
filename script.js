class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.historyPreview = document.getElementById('historyPreview');
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistory');
        
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.waitingForNewInput = false;
        this.memory = 0;
        this.history = [];
        
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        document.querySelectorAll('.btn-number').forEach(button => {
            button.addEventListener('click', () => {
                this.inputNumber(button.getAttribute('data-number'));
            });
        });

        document.querySelectorAll('.btn-operator').forEach(button => {
            button.addEventListener('click', () => {
                this.inputOperator(button.getAttribute('data-operation'));
            });
        });

        document.getElementById('decimal').addEventListener('click', () => {
            this.inputDecimal();
        });

        document.getElementById('equals').addEventListener('click', () => {
            this.calculate();
        });

        document.getElementById('clear').addEventListener('click', () => {
            this.clearAll();
        });

        document.getElementById('clear-entry').addEventListener('click', () => {
            this.clearEntry();
        });

        document.getElementById('mc').addEventListener('click', () => {
            this.memoryClear();
        });

        document.getElementById('mr').addEventListener('click', () => {
            this.memoryRecall();
        });

        document.getElementById('m-plus').addEventListener('click', () => {
            this.memoryAdd();
        });

        document.getElementById('m-minus').addEventListener('click', () => {
            this.memorySubtract();
        });

        this.clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });

        document.addEventListener('keydown', (event) => {
            this.handleKeyboardInput(event);
        });
    }

    inputNumber(number) {
        if (this.waitingForNewInput) {
            this.currentInput = number;
            this.waitingForNewInput = false;
        } else {
            this.currentInput = this.currentInput === '0' ? number : this.currentInput + number;
        }
        this.updateDisplay();
    }

    inputOperator(nextOperation) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === '') {
            this.previousInput = this.currentInput;
        } else if (this.operation) {
            const result = this.performCalculation();
            this.currentInput = String(result);
            this.previousInput = this.currentInput;
        }

        this.waitingForNewInput = true;
        this.operation = nextOperation;
        this.updateHistoryPreview();
    }

    inputDecimal() {
        if (this.waitingForNewInput) {
            this.currentInput = '0.';
            this.waitingForNewInput = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }

    calculate() {
        if (this.operation && this.previousInput !== '') {
            const result = this.performCalculation();
            
            this.addToHistory(`${this.previousInput} ${this.operation} ${this.currentInput} = ${result}`);
            
            this.currentInput = String(result);
            this.operation = null;
            this.previousInput = '';
            this.waitingForNewInput = true;
            this.updateDisplay();
            this.clearHistoryPreview();
        }
    }

    performCalculation() {
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);
        
        if (isNaN(prev) || isNaN(current)) return 0;

        switch (this.operation) {
            case '+':
                return prev + current;
            case '-':
                return prev - current;
            case '×':
                return prev * current;
            case '÷':
                if (current === 0) {
                    this.handleError('Tidak bisa dibagi nol');
                    return 0;
                }
                return prev / current;
            default:
                return current;
        }
    }

    clearAll() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operation = null;
        this.waitingForNewInput = false;
        this.updateDisplay();
        this.clearHistoryPreview();
    }

    clearEntry() {
        this.currentInput = '0';
        this.updateDisplay();
    }

    memoryClear() {
        this.memory = 0;
        this.showNotification('Memory cleared');
    }

    memoryRecall() {
        this.currentInput = String(this.memory);
        this.waitingForNewInput = true;
        this.updateDisplay();
    }

    memoryAdd() {
        const currentValue = parseFloat(this.currentInput);
        if (!isNaN(currentValue)) {
            this.memory += currentValue;
            this.showNotification(`Added to memory: ${currentValue}`);
        }
    }

    memorySubtract() {
        const currentValue = parseFloat(this.currentInput);
        if (!isNaN(currentValue)) {
            this.memory -= currentValue;
            this.showNotification(`Subtracted from memory: ${currentValue}`);
        }
    }

    addToHistory(calculation) {
        this.history.unshift(calculation);
        if (this.history.length > 5) {
            this.history.pop();
        }
        this.updateHistoryDisplay();
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.currentInput;
    }

    updateHistoryPreview() {
        if (this.operation && this.previousInput) {
            this.historyPreview.textContent = `${this.previousInput} ${this.operation}`;
        } else {
            this.historyPreview.textContent = '';
        }
    }

    clearHistoryPreview() {
        this.historyPreview.textContent = '';
    }

    updateHistoryDisplay() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<div class="history-empty">Belum ada riwayat</div>';
        } else {
            this.historyList.innerHTML = this.history
                .map(item => `<div class="history-item">${item}</div>`)
                .join('');
        }
    }

    handleError(message) {
        this.showNotification(message);
        this.clearAll();
    }

    showNotification(message) {
        alert(message);
    }

    handleKeyboardInput(event) {
        const key = event.key;
        
        if ('0123456789+-*/.='.includes(key) || key === 'Enter' || key === 'Escape') {
            event.preventDefault();
        }

        if (key >= '0' && key <= '9') {
            this.inputNumber(key);
        } else if (key === '.') {
            this.inputDecimal();
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            const operationMap = {
                '+': '+',
                '-': '-',
                '*': '×',
                '/': '÷'
            };
            this.inputOperator(operationMap[key]);
        } else if (key === '=' || key === 'Enter') {
            this.calculate();
        } else if (key === 'Escape' || key === 'Delete') {
            this.clearAll();
        } else if (key === 'Backspace') {
            this.clearEntry();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});