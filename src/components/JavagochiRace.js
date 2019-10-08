import React from 'react';
import { Typography , Progress, Card, Row, Col } from 'antd';

const { Meta } = Card;
const { Title } = Typography;

const JavagochiRace = (props) => {
    const javagochi = props.javagochi;
    const window_width = window.innerWidth;
    const img_width = window_width > 300 ? 300 : window_width;

    if(window_width > 1000) {
        return (
            <div style={{ padding: '30px' }}>
                <Row>
                    <Col xs={{ span: 5 }} sm={{ span: 6 }} md={{ span: 7 }} lg={{ span: 8 }} xl={{ span: 9}} xxl={{ span: 10 }}>
                        <Title>{javagochi.race}</Title>
                        <Card
                            bordered={false}
                            cover={<img alt="example" src={javagochi.image} style={{ width: img_width, height: img_width }}/>}
                        >
                            <Meta title={javagochi.race + ", " + parseInt(javagochi.cost) + " coins"} />
                        </Card>
                    </Col>

                    <Col xs={{ span: 5 }} sm={{ span: 6 }} md={{ span: 7 }} lg={{ span: 8 }} xl={{ span: 9}} xxl={{ span: 10 }}>
                        <Card
                            title="Statistics"
                            bordered={false}
                        >
                            <Progress percent={100} size="small" showInfo={false} />
                            <p>{"Health: " + javagochi.max_health + "/" + javagochi.max_health}</p>

                            <Progress percent={0} size="small" showInfo={false} />
                            <p>{"Maximum age: " + javagochi.max_age}</p>

                            <Progress percent={0} size="small" showInfo={false} />
                            <p>{"Hunger: 0/" + javagochi.max_hunger}</p>

                            <Progress percent={0} size="small" showInfo={false} />
                            <p>{"Hot: 0/" + javagochi.max_hot}</p>

                            <Progress percent={0} size="small" showInfo={false} />
                            <p>{"Cold: 0/" + javagochi.max_cold}</p>

                            <p>{"Strength: " + javagochi.strength}</p>

                            <p>{"Min. user level: " + javagochi.min_user_level}</p>

                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
    else {
        return (
            <div style={{ padding: '30px' }}>
                <Row>
                    <Col xs={{ span: 5 }} sm={{ span: 6 }} md={{ span: 7 }} lg={{ span: 8 }} xl={{ span: 9}} xxl={{ span: 10 }}>
                        <Title>{javagochi.race}</Title>
                        <Card
                            bordered={false}
                            cover={<img alt="example" src={javagochi.image} style={{ width: img_width, height: img_width }}/>}
                        >
                            <Meta title={javagochi.race + ", " + parseInt(javagochi.cost) + " coins"} />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ span: 5 }} sm={{ span: 6 }} md={{ span: 7 }} lg={{ span: 8 }} xl={{ span: 9}} xxl={{ span: 10 }}>
                        <Card
                            title="Statistics"
                            bordered={false}
                        >
                            <Progress percent={100} size="small" showInfo={false} />
                            <p>{"Health: " + javagochi.max_health + "/" + javagochi.max_health}</p>

                            <Progress percent={0} size="small" showInfo={false} />
                            <p>{"Maximum age: " + javagochi.max_age}</p>

                            <Progress percent={0} size="small" showInfo={false} />
                            <p>{"Hunger: 0/" + javagochi.max_hunger}</p>

                            <Progress percent={0} size="small" showInfo={false} />
                            <p>{"Hot: 0/" + javagochi.max_hot}</p>

                            <Progress percent={0} size="small" showInfo={false} />
                            <p>{"Cold: 0/" + javagochi.max_cold}</p>

                            <p>{"Strength: " + javagochi.strength}</p>

                            <p>{"Min. user level: " + javagochi.min_user_level}</p>

                        </Card>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default JavagochiRace;
