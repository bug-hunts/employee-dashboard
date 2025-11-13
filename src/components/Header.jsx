import { useAppContext } from "../context/AppContext";


export default function Header() {

    const {user, theme, toggletheme} = useAppContext();

    return (
        <header className="app-header">
            <h2>Employee Management Dashboard</h2>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span>Welcome, {user.name}</span>
        <button
          onClick={toggletheme}
          style={{
            background: theme ? "#4b5563" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
          }}
        >
          {theme ? "Dark" : "Light"}
        </button>
      </div>
        </header>
    );
}