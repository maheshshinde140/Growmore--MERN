import React, { useEffect } from "react";
import Profile from "./download.png";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaCircleUser } from "react-icons/fa6";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaUserShield } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import axios from "axios";
import { MdAccountBalanceWallet } from "react-icons/md";
import "./Admin.css";
function Admin() {
  const values = [true, "sm-down", "md-down", "lg-down", "xl-down", "xxl-down"];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [url, setUrl] = useState();
  const [admin, setAdmin] = useState("");
  const [user, setUser] = useState("");
  const [balance, setBalance] = useState("");
  const [profit, setProfit] = useState("");
  const [reffer, setReffer] = useState("");
  const [result, setResult] = useState("");
  const [fet, setFet] = useState("");
  const [client, setClient] = useState([]);
  const [cmpbal,setCmpbal] = useState();
  useEffect(() => {
    const getUserData = async () => {
      const storedData = localStorage.getItem('user');
      const formData=JSON.parse(storedData)[1]
      const reqData = await fetch("http://localhost/growmore/admin.php/"+formData);
      const resData = await reqData.json();
      setAdmin(resData[0].username);
      setCmpbal(resData[0].cmp);
      setData(resData);
    };
    getUserData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost/growmore/client.php/" + fet);
    const pop = await res.json();
    setReffer(pop.length - 1);
    setUrl(pop[0].user_id);
    setBalance(pop[0].balance);
    setProfit(pop[0].profit);
    setUser(pop[0].username);
    setResult(pop[1].result);
    setClient(pop);
  };

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  return (
    <div className="container text-center ">
      <h2 className="text-success ">Admin Panel</h2>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)} >
        <Modal.Header closeButton className="text-success">
          <Modal.Title>{user} Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pop">
          <Container className="mt-5">
            <h2 className="text-dark m-5"> Dashboard</h2>
            <div className="d-flex flex-column p-sm-2  me-3 align-items-center ">
              <FaCircleUser className="fs-1 text-success mx-4" />
              <h4 className="text-dark">{user}</h4>
            </div>
            <Row className=" justify-content-md-around text-white g-3 d-flex flex-column flex-md-row ">
              <Col xs lg="3" className=" p-4 rounded-3 mx-1  " >
                <Row className="g-2 justify-content-center text-center ">
                  <Col
                    variant="outline-success"
                    className=" mx-2 col-3 align-content-center  me-3 justify-items-center rounded-circle "
                  >
                    <Button variant="outline-success">
                      {" "}
                      <FaUserShield className="fs-3" />{" "}
                    </Button>
                  </Col>
                  <Col>
                    <p className="text-dark">
                      User ID:<h4 className="text-dark w-25 mx-4 ">{url}</h4>
                    </p>
                  </Col>
                </Row>
              </Col>
             
              <Col xs lg="3" className=" mx-1 p-4 rounded-3   ">
                <Row >
                  <Col
                    variant="outline-success"
                    className=" col-3  mx-2 align-content-center me-3 justify-items-center rounded-circle "
                  >
                    <Button variant="outline-success">
                      {" "}
                      <HiUserGroup className="fs-3" />{" "}
                    </Button>
                  </Col>
                  <Col>
                    <p className="text-dark">
                      Total Reffer:{" "}
                      {
                        //Check if message failed
                        result == undefined ? (
                          <h4 className="text-dark">{reffer}</h4>
                        ) : (
                          <h4 className="text-dark">{result}</h4>
                        )
                      }
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col xs lg="3" className=" mx-1 p-4 rounded-3   ">
                <Row>
                  <Col
                    variant="outline-success"
                    className=" col-3  mx-2 align-content-center me-3 justify-items-center rounded-circle "
                  >
                    <Button variant="outline-success">
                      {" "}
                      <MdAccountBalanceWallet className="fs-3" />{" "}
                    </Button>
                  </Col>
                  <Col>
                    <p className="text-dark">
                      Total Balance:<h4 className="text-dark">{balance}₹</h4>
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col xs lg="3" className=" mx-1 p-4 rounded-3   ">
                <Row>
                  <Col
                    variant="outline-success"
                    className=" col-3  mx-2 align-content-center me-3 justify-items-center rounded-circle "
                  >
                    <Button variant="outline-success">
                      {" "}
                      <MdAccountBalanceWallet className="fs-3" />{" "}
                    </Button>
                  </Col>
                  <Col>
                    <p className="text-dark">
                      Total Profit:<h4 className="text-dark">{profit}₹</h4>
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <div className="container">
            <h2 className="text-dark mx-5">Reffer to</h2>
            <div>
            <div className="overflow-scroll overflow-y-scroll table fs-4 container   mt-5">
          <table className="table text-dark mt-4 overflow-scroll overflow-y-scroll text-start  ">
            <thead className="bg-Red">
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Username</th>
                <th scope="col">User Email</th>
                <th scope="col">Plan</th>
            
              </tr>
            </thead>
            <tbody>
              {client.slice(1).map((row, index) => (
                <tr key={index}>
                  <td>
                    <form onSubmit={handleSubmit}>
                      <button
                        type="submit"
                        className="navi border-0  "
                        onClick={() => {
                          setShow(true);
                          setFet(row.user_id);
                        }}
                      >
                        <img
                          src={Profile}
                          alt=""
                          width={"8%"}
                          className="me-2 rounded-circle border-2 border border-success btn p-0"
                        ></img>
                        {row.user_id}
                      </button>
                    </form>
                  </td>
                  <td>{row.username}</td>
                  <td>{row.email}</td>
                  <td>{row.plan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div>
        <div>
          <Navbar expand="lg" className="bg-body-tertiary  ">
            <Container fluid className="d-flex justify-content-around ">
              <Nav
                className=" my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <div className="d-flex flex-column align-items-end p-sm-2 ">
                  <Nav.Link href="#action1">
                    <FaCircleUser className="fs-1  text-dark mx-4 border-2 border border-success rounded-circle" />
                    <h4 className="text-dark">{admin}</h4>
                  </Nav.Link>
                </div>
              </Nav>

              <Row className="g-2">
                <Col
                  variant="outline-success"
                  className=" me-1  col-3 align-content-center justify-items-center rounded-circle "
                >
                  <Button variant="outline-success" className="mx-5">
                    {" "}
                  <MdAccountBalanceWallet className="fs-4" />{" "}
                  </Button>
                </Col>
                <Col>
                  <p className="text-success mb-0 ">Company Balance:  </p><h4 className="text-dark">{cmpbal}₹</h4>   
                </Col>
              </Row>
{/* 
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search person"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form> */}
            </Container>
          </Navbar>
        </div>

        <div className="overflow-scroll overflow-y-scroll table fs-4 container   mt-5">
          <table className="table text-dark mt-4 overflow-scroll overflow-y-scroll text-start  ">
            <thead className="bg-Red">
              <tr>
                <th scope="col">User Id</th>
                <th scope="col">Username</th>
                <th scope="col">User Email</th>
                <th scope="col">Plan</th>
                <th scope="col">Amount</th>
                <th scope="col">Profit</th>
                <th scope="col">Referral By</th>
            
              </tr>
            </thead>
            <tbody>
              {data.slice(1).map((row, index) => (
                <tr key={index}>
                  <td>
                    <form onSubmit={handleSubmit}>
                      <button
                        type="submit"
                        className="navi border-0  "
                        onClick={() => {
                          setShow(true);
                          setFet(row.user_id);
                        }}
                      >
                        <img
                          src={Profile}
                          alt=""
                          width={"8%"}
                          className="me-2 rounded-circle border-2 border border-success btn p-0"
                        ></img>
                        {row.user_id}
                      </button>
                    </form>
                  </td>
                  <td>{row.username}</td>
                  <td>{row.email}</td>
                  <td>{row.plan}</td>
                  <td>{row.balance}</td>
                  <td>{row.profit}</td>
                  <td>{row.reffer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
