// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import CreateCaseStudy from './pages/CreateCaseStudy';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Login from './pages/Login';
import About from './pages/About';
import AuthRedirect from './components/AuthRedirect';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/callback" element={<AuthRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }>
              <Route path="/" element={<HomePage />} />
              <Route path="/create" element={<CreateCaseStudy />} />
              <Route path="/case-study/:id" element={<CaseStudyDetail />} />
              <Route path="/about" element={<About />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
