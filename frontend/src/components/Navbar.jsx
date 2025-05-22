import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
export default function Navbar1() {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const navigate = useNavigate()
  return (
      <Navbar bg="primary" data-bs-theme="dark" className='sticky-top shadow p-3 mb-3 bg-body-tertiary'>
        <Container>
          <Navbar.Brand href="/">LEUCINE</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/" className='text-white text-bold'>Home</Nav.Link>
          </Nav>
          <button variant="outline-light" className="me-2" bg="light" onClick={()=>navigate(role === "Admin" ? "/create-software" : role === "Manager" ? "/pending-requests" : "/request-access")}>
            {!role?"Get Started":role === "Admin" ? "Create Software" : role === "Manager" ? "Pending Requests" : "Request Access"}
          </button>
            <Nav>
                {token && <Nav.Link href="/login" onClick={()=>{localStorage.clear()}}>Log Out</Nav.Link>}
            </Nav>
        </Container>
      </Navbar>
  );
}
