import { React, useEffect, useState } from "react";
import "./Box.css";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from 'react-toastify';
import Button from "react-bootstrap/Button";
import ReviewBar from "../components/Snackbar/reviewBar";
import renderReviewCard from "../components/card/reviewCard";
import ReviewDetails from "../models/Review/reviewDetails";
import UserService from "../service/UserService";
import { Card } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { ServerConfig } from "../config/ServerConfig";
import axios from 'axios';


import {

    Container,
} from "react-bootstrap";

const UserReviewPage
    = (props) => {
        const [rating, setRating] = useState("");
        const [details, setDetails] = useState(" ");
        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([]);

        let item = localStorage.getItem('location')
        const location = JSON.parse(item)
        const arr = location.amenities








        const styles = {


            button: {
                width: 100,
                marginTop: 20,
                backgroundColor: "black",
                padding: 15,

            },

        };



        const notifyRange = () => toast("please insert a valid rating number");
        const notifyRating = () => toast("Rating is mandatory");
        const notifyReview = () => toast("Review is mandatory");
        const notify = () => toast("successfully added review");

        async function handleClick(e) {
            e.preventDefault();

            if (rating === "") {
                notifyRating();
                return;
            }

            if (details === "") {
                notifyReview();
                return;
            }
            if (rating > 10 || rating < 0) {
                notifyRange();
            }



            const review = new ReviewDetails(

                location.id,
                localStorage.getItem('id'),
                localStorage.getItem('id'),
                rating,
                details,

            );



            const setAdminResponse = await UserService.instance.setReview(
                review
            );



            if (setAdminResponse.status === true) {
                notify();



            }

            if (setAdminResponse.status === false)
                alert("Add Review failed")


        }








        useEffect(() => {

            const reviewHotelRequest = {
                hotelId: location.id

            }
            const reviewHotelResponse = axios.post(ServerConfig.url.API_URL +
                '/get_specific_hotel_reviews/', reviewHotelRequest)
            fetch("http://127.0.0.1:8000/get_specific_hotel_reviews/")
                .then(res => reviewHotelResponse)
                .then(
                    (result) => {
                        console.log(result);
                        setIsLoaded(true);
                        setItems(result.data.reviews);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }, [])

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <div>
                        <ReviewBar></ReviewBar>
                    </div>
                    <div className="innerFull" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 1 }}>
                        <div >
                            <Card className="cardWithNoMargin" >
                                <Card.Body>
                                    <Card.Title>{location.name}</Card.Title>
                                    <p className="address-style">
                                        🗺️
                                        <span> {location.hotelAddress}</span>
                                    </p>


                                    <Card.Text >{location.description}</Card.Text>

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

                        </div>
                        <div >
                            <ToastContainer />
                            <div style={{ display: 'flex', justifyContent: 'center' }}><h3>Add Review</h3></div>
                            <div className="myForm">

                                <Container>
                                    <Form>
                                        <Form.Group controlId="form.rating">
                                            <Form.Label>Rating(0-10)</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter rating"
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group controlId="form.review">
                                            <Form.Label>Review</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                placeholder="Give Review"
                                                value={details}
                                                onChange={(e) => setDetails(e.target.value)} />
                                        </Form.Group>



                                    </Form>
                                    <Button style={styles.button} onClick={handleClick} >
                                        Add
                                    </Button>

                                </Container>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Container>
                            <div >{items.map(renderReviewCard)}</div>;
                        </Container>
                    </div>
                </div>
            );
        }










    };

export default UserReviewPage;
