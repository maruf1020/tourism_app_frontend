import {
    Button,
    Nav,
    Navbar,
    Container,
} from "react-bootstrap";


const ReviewBar = () => {
    const changeText = () => {
        window.location.href = "/";
        return;
    }
    const goHome = () => {
        window.location.href = "/userMainPage";
        return;
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>

                        <Button variant="outline-success" onClick={() => goHome()} >Home</Button>
                    </Nav>

                    <Nav className="justify-content-end" style={{ width: "100%" }} >

                        <Button variant="outline-success" onClick={() => changeText()} >Sign Out</Button>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
export default ReviewBar;

