import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const JavagochiOwnedCard = (props) => {

    const javagochi = props.javagochi;
    const window_width = window.innerWidth

    if(window_width > 300) {
        return (

            <Card
              style={{ width: 300, height: 400 }}
              cover={<img alt="example" src={javagochi.race.image} style={{ width: 300, height: 300 }} />}
              hoverable
            >
                <Meta
                  title={javagochi.nickname + ", " + javagochi.race.race}
                  description={"Health: " + javagochi.current_health + "/" + javagochi.race.max_health}
                />
            </Card>
        );
    }
    else {
        let w = 0.8*window_width;
        let h = 3/2*w;
        return (

            <Card
              style={{ width: w, height: h }}
              cover={<img alt="example" src={javagochi.race.image} style={{ width: w, height: w }} />}
              hoverable
            >
                <Meta
                  title={javagochi.nickname + ", " + javagochi.race.race}
                  description={"Health: " + javagochi.current_health + "/" + javagochi.race.max_health}
                />
            </Card>
        );
    }
}

export default JavagochiOwnedCard;
