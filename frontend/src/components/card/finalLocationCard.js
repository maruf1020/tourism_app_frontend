import { Card } from "react-bootstrap";
import { Button, Nav, Navbar } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";

require("react-bootstrap/ModalHeader");



const finalLocationCard = (card) => {
    const arr = card.amenities


    return (
        <Card style={{ width: "18rem" }} key={card.id} className="box">
            <Card.Header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link> */}
                            <p>
                                <span className="recipe-rating">
                                    ★★★★<span>☆</span>
                                </span>
                            </p>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Card.Header>
            <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <p className="address-style">
                    🗺️
                    <span> {card.hotelAddress}</span>
                </p>


                <Card.Text className="text-limit">{card.description}</Card.Text>

                <div className="all-badges">
                    {
                        arr.map((a, i) => <Badge pill bg="primary" key={i}>
                            🔹 {a}
                        </Badge>)
                    }

                </div>
                {/* <Button variant="success">Review</Button> */}
            </Card.Body>
        </Card>
    );
};
export default finalLocationCard;
