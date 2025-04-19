import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">🏠 FrED IoT Home System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#iot-devices">IoT Devices</Nav.Link>
            <Nav.Link href="#network-status">Network Status</Nav.Link>
            <Nav.Link href="#settings">Settings</Nav.Link>
            <Nav.Link href="#activity-logs">Activity Logs</Nav.Link>
            <Nav.Link href="#alerts">Alerts</Nav.Link>
            <Nav.Link href="#support">Support</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#notifications">Notifications</Nav.Link>
            <Nav.Link eventKey={2} href="#account"
              onClick={() => {
                localStorage.removeItem("isFormSubmitted");
                window.location.reload(); 
              }}
            >Exit ↪</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
