
import "./Box.css";
import renderCard from "../components/card/locationCard";
import RenderCustomerBar from "../components/Snackbar/CustomerNavBar";
import { React, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Location from "../models/Location/Location";
import UserService from "../service/UserService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InfiniteScroll from "react-infinite-scroll-component";
import { ServerConfig } from "../config/ServerConfig";
import axios from 'axios';
import {

  Container,
} from "react-bootstrap";
import Tags from "../models/Location/tags";

const AdminMainPage = () => {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [airConditioning, setAirConditioning] = useState(false);
  const [cableTV, setCableTV] = useState(false);
  const [roomService, setRoomService] = useState(false);
  const [dryCleaning, setDryCleaning] = useState(false);
  const [indoorSwimmingPool, setIndoorSwimmingPool] = useState(false);

  const notify = () => toast("Hotel added successfully");



  const notifyName = () => toast("name is mandatory ");
  const notifyAddress = () => toast("location is mandatory")
  const notifyDescription = () => toast("fillup description")



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


  if (localStorage.getItem("reload") == 1) {
    notify();
    localStorage.setItem("reload", 0);
  }

  async function handleClick(e) {
    e.preventDefault();

    if (name === "") {
      notifyName()
      return;
    }

    if (address === "") {
      notifyAddress()
      return;
    }

    if (description === "") {
      notifyDescription()
      return;
    }




    const tags = new Tags(
      airConditioning,
      cableTV,
      roomService,
      dryCleaning,
      indoorSwimmingPool,
    )

    let jsonTag = JSON.stringify(tags)

    const location = new Location(
      name,
      address,
      description,
      jsonTag,

    );


    const setAdminResponse = await UserService.instance.setLocation(
      location,
    );



    if (setAdminResponse.status === true) {
      setName("");
      setAddress("");
      setDescription("");
      setAirConditioning(false)
      setCableTV(false)

      localStorage.setItem("reload", 1);
      window.location.reload();





    }

    if (setAdminResponse.status === false)
      alert("Add Location failed")


  }
  const styles = {

    button: {
      width: 100,
      marginTop: 20,
      backgroundColor: "black",
      padding: 15,

    },

  };
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>

        <div>

          <RenderCustomerBar></RenderCustomerBar>
          <div className="">
            <div className="">
              <div className="innerFull">
                <ToastContainer />
                <div style={{ display: 'flex', justifyContent: 'center', }}><h3>Add hotel</h3></div>
                <div className="myForm">

                  <Container>
                    <Form>
                      <Form.Group controlId="form.Name">
                        <Form.Label>Hotel Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter name"
                          value={name}
                          onChange={(e) => setName(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="form.Location">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)} />
                      </Form.Group>

                      <Form.Group controlId="form.Description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} />
                      </Form.Group>
                      <Form.Group controlId="form.Description">
                        <Form.Label>Add tags</Form.Label>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="Air Conditioning"
                          value={airConditioning}
                          onChange={(e) => { airConditioning ? setAirConditioning(false) : setAirConditioning(true) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="Cable TV"
                          value={cableTV}
                          onChange={(e) => { cableTV ? setCableTV(false) : setCableTV(true) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="Room Service"
                          value={roomService}
                          onChange={(e) => { roomService ? setRoomService(false) : setRoomService(true) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="Indoor Swimming Pool"
                          value={indoorSwimmingPool}
                          onChange={(e) => { indoorSwimmingPool ? setIndoorSwimmingPool(false) : setIndoorSwimmingPool(true) }} />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check
                          type="checkbox"
                          label="Dry Cleaning"
                          value={dryCleaning}
                          onChange={(e) => { dryCleaning ? setDryCleaning(false) : setDryCleaning(true) }} />
                      </Form.Group>

                    </Form>
                    <Button style={styles.button} onClick={handleClick} >
                      Add
                    </Button>

                  </Container>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default AdminMainPage;
