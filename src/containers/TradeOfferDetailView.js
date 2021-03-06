import React from 'react';
import axios from 'axios';
import { Typography, Spin, Button, Form, Select } from 'antd';
import { withRouter } from 'react-router-dom';

import TradeDetail from '../components/TradeDetail';
import path from '../path'

const { Title } = Typography;
const Option = Select.Option;

class TradeOfferDetail extends React.Component {

    state = {
        trade: {},
        next_level: {},
        tradeable_jcs: [],
        selected_jc_trade: 0
    }

    handleSelect = (val) => {
        this.setState({
            selected_jc_trade: val
        })
    }

    acceptTrade = (e) => {
        e.preventDefault();

        const id = this.state.trade.id;
        axios.put(`${path}/api/trades/${id}/conclude/`, {
            id_trader: this.state.selected_jc_trade
        })
        .then((res) => {
            this.props.history.push('/myprofile/myjavagochis');
        })
        .catch((err) => {
            console.log(err);
        });
    }

    removeTrade = () => {
        const id = this.state.trade.id;
        axios.delete(`${path}/api/trades/${id}/close`)
        .then((res) => {
            this.props.history.push('/myprofile/mytrades');
        })
        .catch((err) => {
            console.log(err);
        })
    }

    componentDidMount() {
        const id = this.props.match.params.tradeId;
        const user = localStorage.getItem('username');

        const token = localStorage.getItem('token');

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }

        axios.all([
            axios.get(`${path}/api/trades/${id}`),
            axios.get(`${path}/api/users/${user}/javagochis/`)
        ])
        .then(axios.spread((resTrade, resJc) => {
            const tradeable_jcs = resJc.data.filter(function (jc) { return jc.race.race === resTrade.data.interested_into.race; });
            this.setState({
                trade: resTrade.data,
                tradeable_jcs: tradeable_jcs
            });

            const lvl = this.state.trade.offering.current_level;
            axios.get(`${path}/api/javagochi/expmap/${lvl}/`)
            .then(res => {
                this.setState({
                    next_level: res.data
                })
            });
        }));
    }

    render() {
        if(this.state.next_level.exp_for_next_level === undefined || this.state.trade.offering === undefined) {
            return (
                <div>
                    <Title>Loading</Title>
                    <Spin />
                </div>
            )
        }
        else {
            const tradeable_jcs = this.state.tradeable_jcs;
            const offering = this.state.trade.offering;
            const user = this.state.trade.offering.owner;
            return (
                <div>
                    {
                        user.username === localStorage.getItem('username') ?
                            <Title>{"You are offering " + offering.nickname + " (" + offering.race.race + ")"}</Title>
                        :
                            <Title>{user.username + " offers " + offering.nickname + " (" + offering.race.race + ")"}</Title>
                    }
                    <TradeDetail data={this.state} />
                    {
                        this.state.trade.offering.owner.username === localStorage.getItem('username') ?
                            <div>
                                <Button type="primary" onClick={this.removeTrade}>Remove this trade</Button>
                            </div>
                        :
                            <div style={{ marginTop: 15 }}>
                                <p>Choose a Javagochi to trade</p>
                                <Form onSubmit={this.acceptTrade}>

                                    <Select
                                      showSearch
                                      placeholder="Choose a Javagochi to trade for this one"
                                      defaultActiveFirstOption={false}
                                      showArrow={true}
                                      style={{ width: 300, marginRight: 15 }}
                                      filterOption={true}
                                      onChange={this.handleSelect}
                                      notFoundContent={null}
                                    >
                                        {tradeable_jcs.map(jc => <Option key={jc.id}>{jc.nickname + " (" + jc.race.race + ")"}</Option>)}
                                    </Select>

                                    <Button type="primary" htmlType="submit">Trade</Button>
                                </Form>
                            </div>
                    }
                </div>
            );
        }
    }
}

export default withRouter(TradeOfferDetail);
