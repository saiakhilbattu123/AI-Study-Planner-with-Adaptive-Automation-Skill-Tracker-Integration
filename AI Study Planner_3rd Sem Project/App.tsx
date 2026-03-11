
import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen font-sans text-brand-charcoal">
      {isLoggedIn ? <DashboardPage /> : <LoginPage onLogin={handleLogin} />}
    </div>
  );
};

export default App;
