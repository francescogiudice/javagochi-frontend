import React from 'react';
import { getAllTrades } from '../store/actions/trades';
import { connect } from 'react-redux';
import TradeCells from '../components/TradeCells';
import { Typography, Input } from 'antd';
import Loading from '../components/Loading';

const { Title } = Typography;
const Search = Input.Search;

class TradeOffers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            currentlyDisplayed: []
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        const allTrades = this.props.trades;
        let newlyDisplayed = allTrades.filter(trade => trade.offering.race.race.includes(e.target.value));
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }

    componentDidMount() {
      const user = localStorage.getItem('username');
      this.props.dispatch(getAllTrades(user));
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            searchTerm: '',
            currentlyDisplayed: newProps.trades
        });
    }

    render() {
        //const trades = this.props.trades;
        const loading = this.props.loading;

        if(!loading) {
            return (
                <div>
                    <Search
                      placeholder="Search..."
                      onChange={this.onInputChange}
                      className="test-class"
                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <Title>All trades happening</Title>
                    <TradeCells data={this.state.currentlyDisplayed} />
                </div>
            );
        }
        else {
            return (
                <Loading />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        trades: state.tradesReducer.allTrades,
        loading: state.tradesReducer.fetchingAllTrades
    }
}

export default connect(mapStateToProps)(TradeOffers);
