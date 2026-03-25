import React from "react";
import { GTSRouter } from "./components/GTSRouter";
import { AuthProvider } from "./contexts/AuthContext";
import { GTSAuthProvider } from "./contexts/GTSAuthContext";
import { GTSExpeditionsProvider } from "./contexts/GTSExpeditionsContext";
import { GTSScrollToTop } from "./components/shared/GTSScrollToTop";
import { GTSScrollProgress } from "./components/shared/GTSScrollProgress";
import { CMSProvider } from "./cms/CMSProvider";

function App() {
  return (
    <CMSProvider>
      <AuthProvider>
        <GTSAuthProvider>
          <GTSExpeditionsProvider>
            {/* Индикатор прогресса скролла */}
            <GTSScrollProgress position="top" height={3} />
            
            {/* Основной роутер */}
            <GTSRouter />
            
            {/* Кнопка прокрутки наверх */}
            <GTSScrollToTop showAfter={400} />
          </GTSExpeditionsProvider>
        </GTSAuthProvider>
      </AuthProvider>
    </CMSProvider>
  );
}

export default App;
