import { NavLink } from "react-router-dom"; 

export default function Sidebar() {
    return (
        <aside className="app-sidebar">

            <h3 className="sidebar-title">Menu</h3>
      <nav className="sidebar-nav">

        <NavLink to="/dashboard" 
        className= {({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Dashboard
        </NavLink>

        <NavLink to="/employees" 
        className= {({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Employees
        </NavLink>

        <NavLink to="/settings" 
        className= {({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
            Settings
        </NavLink>

      </nav>
            
            </aside>
            );
            }
