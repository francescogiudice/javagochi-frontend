import React from 'react';
import { Carousel, Typography, Button } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const img_path = "http://javaimagesbalancer-257274074.us-east-1.elb.amazonaws.com";

const Intro = () => {

    return (
        <div>
            <Carousel autoplay>
                <div><img alt="first_carusel_image" src={img_path + "/intro/first_carusel_image.jpg"} /></div>
                <div><img alt="second_carusel_image" src={img_path + "/intro/second_carusel_image.jpg"} /></div>
                <div><img alt="second_carusel_image" src={img_path + "/intro/third_carusel_image.jpg"} /></div>
                <div><img alt="second_carusel_image" src={img_path + "/intro/fourth_carusel_image.jpg"} /></div>
            </Carousel>

            <div className="bulk blue">
                <div className="contained left white-txt">
                    <img alt="example" src={img_path + "/intro/leafagochi.png"} />
                </div>

                <div className="contained right white-txt">
                    <Title>Javagochi</Title>
                    <Title level={3}>Collect them,
                    feed them,
                    love them</Title>
                    {
                      (localStorage.getItem('username'))
                      ?
                      <div></div>
                      :
                      <div>
                        <Button type="primary" style={{marginRight: 20}}><Link to="/signup">Start your adventure!</Link></Button>
                        <Button type="primary" style={{marginLeft: 20}}><Link to="/login">Login</Link></Button>
                      </div>
                    }
                </div>
            </div>

            <div className="bulk white">
                <div className="contained left">
                    <Title>What is a javagochi?</Title>
                    <Title level={4}>Cute, little monsters that you can take care of!</Title>
                </div>

                <div className="contained right">
                    <img alt="example" src={img_path + "/intro/cutie_patutie.png"} />
                </div>
            </div>

            <div className="bulk blue">
                <div className="contained left white-txt">
                    <img alt="example" src={img_path + "/intro/cool.png"} />
                </div>

                <div className="contained right white-txt">
                    <Title>Choose your Javagochis!</Title>
                    <Title level={4}>Choose the Javagochi that you prefer, among hundreds of them!</Title>
                </div>
            </div>

            <div className="bulk white">
                <Title>What are you waiting for?</Title>
                <Title level={2}>Start your adventure right now!</Title>

                {
                  (localStorage.getItem('username'))
                  ?
                  <div></div>
                  :
                  <div>
                    <Button type="primary" style={{marginRight: 20}}><Link to="/signup">Signup</Link></Button>
                    <Button type="primary" style={{marginLeft: 20}}><Link to="/login">Login</Link></Button>
                  </div>
                }
            </div>
        </div>
    );
}

export default Intro;
