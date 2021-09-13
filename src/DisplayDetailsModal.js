import { Modal, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const DisplayDetailsModal = (props) =>{
    const {handleClose,show,user} = props

    return(
        <div>
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title>{user.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                <h5 >Contactnumber  {user.phone}</h5>
                <h5>Email {user.email}</h5>
                <h5>Skills {user.skills}</h5>
                <h5> Experience {user.experience}</h5>
                </div>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
      </Modal>
      </div>
    )
}

export default DisplayDetailsModal