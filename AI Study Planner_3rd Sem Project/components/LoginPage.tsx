import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-sm p-8 space-y-6 bg-brand-card shadow-lg rounded-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-brand-red">AI Study Planner</h1>
          <p className="mt-2 text-brand-gray">Your personalized academic assistant.</p>
        </div>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div>
            <label htmlFor="studentId" className="text-sm font-medium text-brand-charcoal">Student ID</label>
            <input
              id="studentId"
              name="studentId"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-brand-charcoal bg-brand-beige border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
              defaultValue="12345"
            />
          </div>
          <div>
            <label htmlFor="password"  className="text-sm font-medium text-brand-charcoal">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 mt-1 text-brand-charcoal bg-brand-beige border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
              defaultValue="password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-brand-red rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;