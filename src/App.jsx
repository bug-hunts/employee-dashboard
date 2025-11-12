import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css'
import './styles/layout.css'
import './styles/employees.css'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Employees from './pages/Employees.jsx'
import Settings from './pages/settings.jsx'

import './styles/modal.css';

export default function App() {


  return (

    <Router>
        
      <div className="app-root">
          <Header />
     
      <div className="app-shell">
          <Sidebar />
        
      <main className="app-content">

        <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      
      </div>
    
    </div>
    </Router>

  );
}