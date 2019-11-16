import React from 'react';
import { getItemDetail } from '../store/actions/items';
import { buyItem } from '../store/actions/items';
import { Typography, Modal, Button, Form, InputNumber  } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ItemDetail from '../components/ItemDetail';
const { Text } = Typography;

class ItDetail extends React.Component {

    state = {
        popupVisible: false,
        buying: 1
    }

    showModal = (e) => {
        this.setState({
            popupVisible: true
        });
    }

    handleOk = (e) => {
        this.setState({
            popupVisible: false
        });
        this.props.history.push('/myprofile/myitems');
    }

    handleCancel = (e) => {
        this.setState({
            popupVisible: false
        });
    }

    handleBuy = (e) => {
        e.preventDefault();

        const user = e.target[0].value;
        const item = e.target[1].value;
        const amount = e.target[2].value;
        this.props.dispatch(buyItem(user, item, amount));
        this.showModal();
    }

    increaseAmount = (value) => {
        this.setState({
            buying: value
        });
    }

    componentDidMount() {
        const itemName = this.props.match.params.itemName;
        this.props.dispatch(getItemDetail(itemName));
    }

    render() {
        const item = this.props.item;

        if(localStorage.getItem('username') !== undefined && localStorage.getItem('username') !== null) {
            return (
                <div>
                    <Modal
                      title="The page says:"
                      visible={this.state.popupVisible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                    >
                        <Text>{this.props.message}</Text>
                    </Modal>
                    <ItemDetail item={item} />

                    <Form onSubmit={this.handleBuy}>
                        <input type="hidden" id="user" name="user" value={localStorage.getItem('username')} />
                        <input type="hidden" id="race" name="race" value={item.name} />
                        <InputNumber min={1} max={99} defaultValue={1} onChange={this.increaseAmount} style={{ width: 85, marginRight: 15, marginBottom: 15 }} />
                        <Button type="primary" htmlType="submit" style={{marginLeft: 10 }}>{"Purchase (" + item.cost * this.state.buying + " coins)"}</Button>
                    </Form>
                </div>
            );
        }
        else {
            return (
                <div>
                    <ItemDetail item={this.state.item} />

                    <Button type="primary" style={{margin: 20}}><Link to="/login">Login to buy this item!</Link></Button>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        item: state.itemsReducer.selectedItem,
        message: state.itemsReducer.message,
    }
}

export default connect(mapStateToProps)(ItDetail);
