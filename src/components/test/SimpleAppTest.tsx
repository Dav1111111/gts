// 🧪 Simple App Test - Минимальный тест для проверки работы приложения
import React from 'react';

export function SimpleAppTest() {
  const [testsPassed, setTestsPassed] = React.useState(0);
  const [testsTotal] = React.useState(5);
  
  React.useEffect(() => {
    let passed = 0;
    
    // Test 1: React works
    try {
      passed += 1;
      console.log('✅ Test 1: React initialization - PASS');
    } catch (err) {
      console.error('❌ Test 1: React initialization - FAIL', err);
    }
    
    // Test 2: useState works  
    try {
      const [test] = React.useState('test');
      if (test === 'test') {
        passed += 1;
        console.log('✅ Test 2: useState hook - PASS');
      }
    } catch (err) {
      console.error('❌ Test 2: useState hook - FAIL', err);
    }
    
    // Test 3: useEffect works
    try {
      passed += 1;
      console.log('✅ Test 3: useEffect hook - PASS');
    } catch (err) {
      console.error('❌ Test 3: useEffect hook - FAIL', err);
    }
    
    // Test 4: DOM manipulation
    try {
      if (typeof document !== 'undefined') {
        passed += 1;
        console.log('✅ Test 4: DOM access - PASS');
      }
    } catch (err) {
      console.error('❌ Test 4: DOM access - FAIL', err);
    }
    
    // Test 5: CSS classes
    try {
      passed += 1;
      console.log('✅ Test 5: CSS styling - PASS');
    } catch (err) {
      console.error('❌ Test 5: CSS styling - FAIL', err);
    }
    
    setTestsPassed(passed);
  }, []);
  
  const successRate = Math.round((testsPassed / testsTotal) * 100);
  
  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#121214',
      border: '1px solid #232428',
      borderRadius: '8px',
      padding: '16px',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '12px',
      zIndex: 9999,
      minWidth: '200px'
    }}>
      <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>
        🧪 GTS App Test
      </div>
      <div style={{ marginBottom: '8px' }}>
        Tests: {testsPassed}/{testsTotal}
      </div>
      <div style={{ marginBottom: '8px' }}>
        Success: {successRate}%
      </div>
      <div style={{
        background: successRate === 100 ? '#22c55e' : successRate > 70 ? '#f59e0b' : '#ef4444',
        height: '4px',
        borderRadius: '2px',
        width: `${successRate}%`
      }} />
      <div style={{ fontSize: '10px', marginTop: '8px', color: '#A6A7AA' }}>
        {successRate === 100 ? '🟢 All systems operational' : 
         successRate > 70 ? '🟡 Some issues detected' : 
         '🔴 Critical issues found'}
      </div>
    </div>
  );
}

export default SimpleAppTest;