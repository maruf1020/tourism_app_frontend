import {
    Button,


    Nav,
    Navbar,
    Container,
} from "react-bootstrap";


const RenderCustomerBar = () => {
    const changeText = () => {
        window.location.href = "/";
        return;
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>

                        {/* <Form className="d-flex">
                            <FormControl
                                width="100%"
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"


                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Nav>

                    <Nav className="justify-content-end" style={{ width: "100%" }} >

                        <Button variant="outline-success" onClick={() => changeText()} >Sign Out</Button>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}
export default RenderCustomerBar;

