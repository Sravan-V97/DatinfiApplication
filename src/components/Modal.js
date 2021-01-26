import { Button, Modal } from "react-bootstrap";

const MyVerticallyCenteredModal = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.handleClose}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Click to open {props.heading}</h4>
        <ul>
          {props.links.map((link) => (
            <li>
              <a href={link ? link.toString() : ""} target="_blank">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default MyVerticallyCenteredModal;
