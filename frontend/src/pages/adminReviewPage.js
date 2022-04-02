import { React, useEffect, useState } from "react";
import "./Box.css";
import { ServerConfig } from "../config/ServerConfig";
import axios from 'axios';
import { Card } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";




import AdminReviewBar from "../components/Snackbar/adminReviewBar";
import renderReviewCard from "../components/card/reviewCard";


import {

    Container,
} from "react-bootstrap";

const AdminReviewPage
    = () => {


        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);
        const [items, setItems] = useState([]);





        let item = localStorage.getItem('location')
        const location = JSON.parse(item)

        const arr = location.amenities

        useEffect(() => {

            const reviewHotelRequest = {
                hotelId: "HOTEL_32f0127e_0e67_4bca_a466_0501257b2697"

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
                        <AdminReviewBar></AdminReviewBar>
                    </div>

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



                    <div>
                        <Container>
                            <div >{items.map(renderReviewCard)}</div>;
                        </Container>
                    </div>
                </div>
            );
        }





    };

export default AdminReviewPage;
