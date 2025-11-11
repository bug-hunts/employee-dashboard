import { useEffect, useState } from "react";
import axios from "axios";
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

    const API_URL = "http://localhost:5000/employees";

    //stimulate api fetching

    useEffect(() => {

        const fetchEmployees = async () => {

            try{
                const res = await axios.get (API_URL);
                setEmployees (res.data);
            } catch(err)
            {
                console.error("Error fetching employees:", err);
            }
        };

        fetchEmployees();

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
    const handleSubmit = async (e) => {
        e.preventDefault();


        //validation
        if (!formData.name || !formData.role || !formData.department) {
            alert("Please fill in all required fields.");
            return;
        }

        try{

        if(EditMode){
            
            await axios.put(`${API_URL}/${currentEmployeeId}`, formData);
            setEmployees((prev) =>
                prev.map((emp) =>
                emp.id === currentEmployeeId ? {...formData, id: emp.id } : emp
                )
            );

            setEditMode(false);
            setCurrentEmployeeId(null);
        
        } else {

            const res = await axios.post(API_URL, formData);
            setEmployees([...employees, res.data]);
        }
        
        setFormData({ name: "", role:"", department: "", status: "Active"});
        setIsModalOpen(false);

    }   catch(err){
        console.error("Error saving employee: ", err);
    }

    };


    //handle delete
         const handleDelete = async (id) => {
         const confirmed = window.confirm("Are you sure you want to delete this employee?");
            if (!confirmed) return;

         try {
        await axios.delete(`${API_URL}/${id}`);

           setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));    
         } catch (err) {
        console.error("Error deleting employee: ", err);
         }
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
                    filteredEmployees?.map((emp) => (
                        
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


