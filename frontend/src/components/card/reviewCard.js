import { Card } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";


require("react-bootstrap/ModalHeader");





const renderReviewCard = (card, index) => {

    return (
        <Card style={{ display: 'flex', flexDirection: 'row' }} key={index} className="box">

            <Card.Body>
                <div style={{ display: "flex" }}>

                    <Card.Title className="smallFont"  >{card[0]}</Card.Title>
                    {card[3] === 1 ? <Badge className="smallerFont redbg" style={{ marginLeft: "auto" }} pill bg="secondary">
                        {"not recommended"}
                    </Badge> : <Badge className="smallerFont greenbg" style={{ marginLeft: "auto" }} pill bg="secondary">
                        {"recommended"}
                    </Badge>}



                </div>

                <p style={{ paddingTop: 12 }} >

                    <span>{card[2]}</span>
                </p>




            </Card.Body>
        </Card>
    );
};
export default renderReviewCard;
