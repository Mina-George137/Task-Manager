import { Route, Routes, Navigate, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import SignIn from './pages/signin'
import SignUp from './pages/signup'
import Dashboard from './pages/dashboard'
import type { JSX } from 'react'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-1 rounded border hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? ' Dark' : ' Light'}
    </button>
  );
}

function HeaderNav() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/60 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-4 h-14">
        <Link to="/" className="font-semibold">Task Manager</Link>
        <nav className="text-sm space-x-4 flex items-center">
          {user ? (
            <ThemeToggleButton />
          ) : (
            <>
              <Link to="/signin" className="hover:underline">Sign in</Link>
              <Link to="/signup" className="hover:underline">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
          <HeaderNav />
          <main className="max-w-4xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
