import { React, useEffect, useState } from "react";
import "./Box.css";
import renderCard from "../components/card/locationCard";
import RenderCustomerBar from "../components/Snackbar/CustomerNavBar";
import InfiniteScroll from "react-infinite-scroll-component";
import { ServerConfig } from "../config/ServerConfig";
import axios from 'axios';

import {

  Container,
} from "react-bootstrap";

const CustomerMainPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);

  const [page, setpage] = useState(0);





  useEffect(() => {
    const x = {
      page: page
    }
    axios.post(ServerConfig.url.API_URL +
      '/hotel_dashboard/', x)

      .then(res => res)
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setItems(result.data.hotelData);
          setpage(page + 20)
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);
  const fetchData = async () => {
    const x = {
      page: page
    }
    axios.post(ServerConfig.url.API_URL +
      '/hotel_dashboard/', x)

      .then(res => res)
      .then(
        (result) => {
          setIsLoaded(true);
          setpage(page + 20)
          sethasMore(true)
          setItems(result.data.hotelData);
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  };


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <RenderCustomerBar></RenderCustomerBar>
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={fetchData}
          hasMore={hasMore}
          loader={<p>lloading</p>}
          endMessage={<p>end</p>}
        >

          <Container>
            <div className="grid">{items.map(renderCard)}</div>;
          </Container>
        </InfiniteScroll>
      </div>

    );
  }



};

export default CustomerMainPage;
