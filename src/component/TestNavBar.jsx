import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import "./NavbarStyles.css";
function TestNavbar() {
  return (
    <div className="container1233">
      <Navbar className="navbar-custom" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Finance Analyzer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/TimedGraph">
              TimeGraph
            </Nav.Link>
            <Nav.Link as={Link} to="/NonTimed">
              Non-TimedGraph
            </Nav.Link>
            <Nav.Link as={Link} to="/RiskAnalysis">
              Risk Analysis
            </Nav.Link>
            <Nav.Link as={Link} to="/Others">
              Others
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default TestNavbar;
