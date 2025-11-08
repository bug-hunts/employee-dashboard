
export default function Modal({isOpen, title, children, onClose}) {

    if (!isOpen) return null; //if modal is closed dont render

     return (
         <div className="modal-overlay">
             <div className="modal">
                 <div className="modal-header">
                    <h3>{title}</h3>
                    <button className="close-button" onClick={onClose}>×</button>
                 </div>
       
                     <div className="modal-content">
                         {children}
                     </div>
                </div>
        
         </div>
  );
}