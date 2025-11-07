export default function Dashboard(){

    return(
       
        <div className="container">
             <h1 style={{ marginBottom: 12 }}>Dashboard</h1>

            <div className="card" style={{ marginBottom: 12 }}>
                          <h2 style={{ margin: 0, fontSize: 18 }}>Quick Stats</h2>
                     <p style={{ marginTop: 8, color: '#6b7280' }}>
          T         his is a placeholder. We’ll show counts like total employees, departments, active vs inactive, etc.
                        </p>
        
            </div>

            <div className="card">
                 <h2 style={{ margin: 0, fontSize: 18 }}>Recent Activity</h2>

                <ul style={{ marginTop: 8, color: '#374151' }}>
                    <li>Created employee: Jane Doe</li>
                    <li>Updated department: Engineering</li>
                    <li>Deleted employee: John Smith</li>
                </ul>
                
            </div>     

         </div>

    );
}