import { Card } from "react-bootstrap";
import { Button, Nav, Navbar } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";


require("react-bootstrap/ModalHeader");




const renderCard = (card) => {

  let startWotk = () => {
    localStorage.setItem('location', JSON.stringify(card));



    if (localStorage.getItem('type') === "admin") {
      window.location.href = "/AdminReviewPage";
      return;
    }
    else {
      window.location.href = "/UserReviewPage";
      return;
    }

  };

  const arr = card.amenities
  const slicedArray = arr.slice(0, 5);

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
                  {card.isRecommended === 2 ? <Badge className="smallerFont redbg" style={{ marginLeft: "auto" }} pill bg="secondary">
                    {"not recommended"}
                  </Badge> : <Badge className="smallerFont greenbg" style={{ marginLeft: "auto" }} pill bg="secondary">
                    {"recommended"}
                  </Badge>}
                </span>
              </p>
            </Nav>

            <Button onClick={startWotk} className="revBG " variant="success">
              Review and Details
            </Button>
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
            slicedArray.map((a, i) => <Badge pill bg="primary" key={i}>
              🔹 {a}
            </Badge>)
          }

        </div>
        {/* <Button variant="success">Review</Button> */}
      </Card.Body>
    </Card>
  );
};
export default renderCard;
