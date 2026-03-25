// 🔄 Simple Fallback Component для отображения при ошибках
import React from 'react';

interface SimpleFallbackProps {
  error?: Error;
  retry?: () => void;
  message?: string;
}

export function SimpleFallback({ 
  error, 
  retry = () => window.location.reload(), 
  message = "Что-то пошло не так" 
}: SimpleFallbackProps) {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#0B0B0C',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        textAlign: 'center', 
        maxWidth: '500px',
        background: '#121214',
        padding: '40px',
        borderRadius: '12px',
        border: '1px solid #232428'
      }}>
        <div style={{ 
          fontSize: '48px', 
          marginBottom: '20px' 
        }}>
          ⚠️
        </div>
        
        <h1 style={{ 
          color: '#91040C', 
          marginBottom: '16px',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          GTS Platform
        </h1>
        
        <p style={{ 
          color: '#A6A7AA', 
          marginBottom: '24px',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          {message}
        </p>
        
        {error && (
          <details style={{ 
            background: '#17181A', 
            padding: '12px', 
            borderRadius: '6px',
            marginBottom: '24px',
            textAlign: 'left',
            border: '1px solid #232428'
          }}>
            <summary style={{ 
              cursor: 'pointer', 
              marginBottom: '10px',
              color: '#A6A7AA',
              fontSize: '14px'
            }}>
              Показать техническую информацию
            </summary>
            <pre style={{ 
              fontSize: '12px', 
              color: '#A6A7AA', 
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              margin: 0,
              fontFamily: 'monospace'
            }}>
              {error.toString()}
              {error.stack && '\n\nStack trace:\n' + error.stack}
            </pre>
          </details>
        )}
        
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button 
            onClick={retry}
            style={{
              background: '#91040C',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            Перезагрузить
          </button>
          
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              background: 'transparent',
              color: '#A6A7AA',
              border: '1px solid #232428',
              padding: '12px 24px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            На главную
          </button>
        </div>
        
        <div style={{
          marginTop: '24px',
          padding: '12px',
          background: '#17181A',
          borderRadius: '6px',
          fontSize: '12px',
          color: '#A6A7AA'
        }}>
          💡 Если проблема повторяется, попробуйте:<br/>
          • Очистить кеш браузера<br/>
          • Отключить блокировщики рекламы<br/>
          • Проверить подключение к интернету
        </div>
      </div>
    </div>
  );
}

export default SimpleFallback;