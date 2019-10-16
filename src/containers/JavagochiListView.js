import React from 'react';
import { connect } from "react-redux";
import { getJcRaces } from "../store/actions/javagochi";
import { getUser } from "../store/actions/auth";

import { Typography, Input } from 'antd';
import JavagochiCells from '../components/JavagochiCells';
import Loading from '../components/Loading';

import '../styles/JcList.css';

const { Title } = Typography;
const Search = Input.Search;

class JavagochiList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            currentlyDisplayed: []
        }

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(e) {
        const allJavagochis = this.props.javagochis;
        const userLevel = this.props.user.level;
        let newlyDisplayed = allJavagochis.filter(javagochi => (javagochi.race.includes(e.target.value) && (javagochi.min_user_level <= userLevel)));
        this.setState({
            searchTerm: e.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }

    componentDidMount() {
        const user = localStorage.getItem('username');
        this.props.dispatch(getJcRaces());
        this.props.dispatch(getUser(user));
    }

    componentWillReceiveProps(newProps) {
        const userLevel = newProps.user.level;
        const allJavagochis = newProps.javagochis;
        let newlyDisplayed = allJavagochis.filter(javagochi => (javagochi.min_user_level <= userLevel));
        if(userLevel != null) {
          this.setState({
              searchTerm: '',
              currentlyDisplayed: newlyDisplayed
          });
        }
    }

    render() {
        // const javagochis = this.props.javagochis;
        const loading = this.props.loading;
        const user = this.props.user;

        if(!loading) {
            return (
                <div>
                    <Search
                      placeholder="Search..."
                      onChange={this.onInputChange}
                      className="test-class"
                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <Title>All Javagochis {user.level}</Title>
                    <JavagochiCells data={this.state.currentlyDisplayed} />
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

function mapStateToProps(state) {
    return {
        user: state.userReducer.user,
        javagochis: state.jcReducer.jcRaces,
        loading: state.jcReducer.fetchingRaces,
        error: state.jcReducer.jcError
    }
}

export default connect(mapStateToProps)(JavagochiList);
