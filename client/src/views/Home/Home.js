import React from 'react'
import Button from 'react-bootstrap/Button';
import logo from '../glogo.png'
import refer from './refer.png'
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import anmt from "../Dashboard/announcement.png";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    const login=()=>{
        navigate('/login')
    }
    const signUp=()=>{
      navigate('/signup')
  }
  return (
    <div>
        <div className=' container-fluid d-flex justify-content-between '>
            <div>
                <img
                    src={logo}
                    className="mx-4 link sound-image"
                    height={"100vw"}
                    alt=''></img>
            </div>
            <div className=' align-content-center '>
            <Button variant="outline-success " size='sm' className='mx-4' onClick={()=>login()} >Login</Button>{' '}
            </div>
        </div>

        <div className="justify-content-center mb-5  ">
            <div className="w-75 announcement-box rounded d-flex flex-column text-center  justify-content-center overflow-hidden">
              <div>
                <span className="answ fs-3 ">Announcement:
                <img
                  src={anmt}
                  className="link sound-image"
                  height={"65vw"}
                  alt=''
                ></img></span>

               </div>

              <p>
                This is an important announcement for all users.
                <br />
                <a href="https://t.me/growmore_refer_and_earn" target="/blank">
          https://t.me/growmore_refer_and_earn
                </a>
              </p>

              {/* <FontAwesomeIcon icon={faBullhorn} className="announcement-icon fs-3"/> */}
          </div>
        </div>
        <div className=" mt-5 pt-5 mb-5 container d-flex flex-column-reverse flex-md-row justify-content-around align-items-center ">
        <div className=" w-75 mt-5">
          <h1 className=" text-success">
          Refer and Earn ₹1500
          </h1>
          <p className="text-dark fs-6 mt-5 mb-4 ">
            Make a profitable business from these niches, Grow your profit,
            invest now. <br></br> See The Platform, Feel The Shine
          </p>
          <Row>
              <Col className=' col-lg-6'>
                <Card className="text-center mx-0 bg-white text-dark">
                  <Card.Header className="d-flex justify-content-between align-content-center ">
                    <div>
                      <h5>Most Popular plan</h5>
                    </div>
                    <div className="px-1 rounded-2  perce">
                      <h3 className="text-success ">75%</h3>
                      <p className="fs-6">Return</p>
                    </div>
                  </Card.Header>

                  <p>
                    <IoMdCheckmarkCircleOutline />
                    Profit -- Every Day
                  </p>
                  <p>
                    <IoMdCheckmarkCircleOutline />
                    Capital will come back -- <span className="sign">yes</span>
                  </p>
                  <p>
                    <IoMdCheckmarkCircleOutline />
                    Repeatable -- 10 Times
                  </p>

                  <h3 className="text-success">2000₹</h3>

                  <Card.Footer>
                    {/* <Button variant="danger">Invest Now</Button> */}
                    <button
                      type="button"
                      variant="success"
                      className="btn btn-success"
                      onClick={()=>signUp()}
                    >
                      Invest Now
                    </button>
                  </Card.Footer>
                </Card>
              </Col>
              </Row>
    
        </div>
        <div className="">
          <img src={refer} alt="" className="w-100 h-100"></img>
        </div>
      </div>

    </div>
    
  )
}

export default Home
