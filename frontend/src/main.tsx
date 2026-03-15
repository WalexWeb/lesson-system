import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { TeacherPage } from './pages/TeacherPage';
import { StudentPage } from './pages/StudentPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/teacher" element={<TeacherPage />} />
        <Route path="/student" element={<StudentPage />} />
        <Route path="*" element={<Navigate to="/teacher" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

