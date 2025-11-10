import { useEffect, useState } from "react";
import Modal from "../components/Modal";

export default function Employees(){

    //create a state variable for employees
    const [employees, setEmployees] = useState([]); 

    //create a search term state
    const [searchTerm, setSearchTerm] = useState("");

    //modal control
    const [isModalOpen, setIsModalOpen] = useState(false);

    //edit mode or not
    const [EditMode, setEditMode] = useState(false);

    //track which employee is being edited  
    const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
    
    //form structure
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        status: "Active",
    });

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

    //handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    //handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();


        //validation
        if (!formData.name || !formData.role || !formData.department) {
            alert("Please fill in all required fields.");
            return;
        }

        if(EditMode){
            
            const updatedEmployees = employees.map((emp) =>
                emp.id === currentEmployeeId ? { ...emp, ...formData } : emp
                );
            setEmployees (updatedEmployees);
             setEditMode(false);
            setCurrentEmployeeId(null);
        
        } else {

        const newEmployee = {
            id: Date.now(),
            ...formData,
        };

        setEmployees([...employees, newEmployee]);

        }

         setFormData({ name: "", role: "", department: "", status: "Active" });
          setIsModalOpen(false);
        
        };

         //handle edit
            const handleEdit = (employee) => {

                
        setFormData({
        name: employee.name,
        role: employee.role,
        department: employee.department,
        status: employee.status,
        });
        setEditMode(true);
        setCurrentEmployeeId(employee.id);
        setIsModalOpen(true);
        };


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
            <div className="employees-header"> 

            <h1 style={{ marginBottom: 12 }}>Employees</h1>
            
            <button className="button" onClick={() => setIsModalOpen(true)}>+ Add Employee</button>

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
                            <button className="table-button" onClick={() => handleEdit(emp)}>Edit</button>
                            <button className="table-button danger" onClick={() => handleDelete(emp.id)}>Delete</button>
                        </td>
                    </tr>
                    ))
                )
                }
                </tbody>
                
            </table>

         {/* Modal for Add Employee  */}
           <Modal
            isOpen={isModalOpen}
            title={EditMode ? "Edit Employee" : "Add Employee"}
            onClose={() => {
            setIsModalOpen(false);
            setEditMode(false);
            setFormData({ name: "", role: "", department: "", status: "Active" });
                }}
                    >

          <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Employee Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Role / Job Title"
            value={formData.role}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleInputChange}
          />
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button type="submit" className="submit">
            {EditMode ? "Save Changes" : "Add Employee"}
          </button>
        </form>
      </Modal>
    </div>
  );
}