import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num: string) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue !== null && operation && !newNumber) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    } else {
      setPreviousValue(current);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div
        style={{
          background: '#9BC59D',
          padding: '12px',
          marginBottom: '12px',
          fontFamily: 'monospace',
          fontSize: '24px',
          textAlign: 'right',
          border: '2px inset',
          minHeight: '40px',
          overflow: 'hidden',
        }}
        data-testid="calculator-display"
      >
        {display}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
        <button className="btn" onClick={() => handleNumber('7')} data-testid="button-7">7</button>
        <button className="btn" onClick={() => handleNumber('8')} data-testid="button-8">8</button>
        <button className="btn" onClick={() => handleNumber('9')} data-testid="button-9">9</button>
        <button className="btn" onClick={() => handleOperation('÷')} data-testid="button-divide">÷</button>
        
        <button className="btn" onClick={() => handleNumber('4')} data-testid="button-4">4</button>
        <button className="btn" onClick={() => handleNumber('5')} data-testid="button-5">5</button>
        <button className="btn" onClick={() => handleNumber('6')} data-testid="button-6">6</button>
        <button className="btn" onClick={() => handleOperation('×')} data-testid="button-multiply">×</button>
        
        <button className="btn" onClick={() => handleNumber('1')} data-testid="button-1">1</button>
        <button className="btn" onClick={() => handleNumber('2')} data-testid="button-2">2</button>
        <button className="btn" onClick={() => handleNumber('3')} data-testid="button-3">3</button>
        <button className="btn" onClick={() => handleOperation('-')} data-testid="button-subtract">-</button>
        
        <button className="btn" onClick={() => handleNumber('0')} data-testid="button-0">0</button>
        <button className="btn" onClick={handleDecimal} data-testid="button-decimal">.</button>
        <button className="btn" onClick={handleEquals} data-testid="button-equals">=</button>
        <button className="btn" onClick={() => handleOperation('+')} data-testid="button-add">+</button>
      </div>
      <div style={{ marginTop: '12px' }}>
        <button className="btn" style={{ width: '100%' }} onClick={handleClear} data-testid="button-clear">
          Clear
        </button>
      </div>
    </div>
  );
}
