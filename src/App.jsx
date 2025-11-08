import './styles/global.css'
import './styles/layout.css'
import './styles/employees.css'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Employees from './pages/Employees.jsx'
import './styles/modal.css';

export default function App() {

  return (
        
      <div className="app-root">
          <Header />
     
      <div className="app-shell">
          <Sidebar />
        
      <main className="app-content">
         {/* <Dashboard /> */}
          <Employees />
        
      </main>
      
      </div>
    
    </div>




  );

}