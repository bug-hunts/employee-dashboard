import { use, useEffect, useState } from "react";



export default function Employees(){

    //create a state variable for employees
    const [employees, setEmployees] = useState([]); 

    //create a search term state
    const [searchTerm, setSearchTerm] = useState("");

    //stimulate api fetching

    useEffect(() => {
        setTimeout(() => { 

            const mockData = [  
                { id: 1, name: "John Doe", role: "Engineer", department: "Engineering", status: "Active" },
                { id: 2, name: "Jane Smith", role: "Marketing Manager", department: "Marketing", status: "Inactive" },
                { id: 3, name: "Alice Johnson", role: "Sales Executive", department: "Sales", status: "Active" },
                { id: 4, name: "Bob Brown", role: "HR Officer", department: "HR", status: "Active" },
                ];
            setEmployees (mockData);
        }, 1000);
    }, []);

    //handle delete
         const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };

       // Handle search filtering
          const filteredEmployees = employees.filter((emp) =>
       emp.name.toLowerCase().includes(searchTerm.toLowerCase())
             );



    return(

        <div className="container">
            <div className="employee-header"> 

            <h1 style={{ marginBottom: 12 }}>Employees</h1>
            <button className="button" style={{ marginBottom: 12 }}>Add Employee</button>

             </div>

             <div className="search-bar">
                <input type="text" 
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
             </div>


             <table className="employee-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredEmployees.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                  {employees.length === 0 ? "Loading employees..." : "No employees found"}
                            </td>
                        </tr>
                    ) :
                    
                    (
                    filteredEmployees.map((emp) => (
                        
                    <tr key={emp.id}>   
                        <td>{emp.name}</td>
                        <td>{emp.role}</td>
                        <td>{emp.department}</td>  
                        <td>
                             <span className={`status ${emp.status === "Active" ? "active" : "inactive"}`}>
                            {emp.status}
                            </span>
                        </td>

                        <td>
                            <button className="table-button">Edit</button>
                            <button className="table-button danger" onClick={() => handleDelete(emp.id)}>Delete</button>
                        </td>
                    </tr>
                    ))
                )
                }
                </tbody>
                
            </table>

        </div>


    );
}