import React from 'react';
import axios from 'axios';
import { Input } from 'antd';
import ItemCells from '../components/ItemCells';
import Loading from '../components/Loading';

import '../styles/JcList.css';

const Search = Input.Search;

class ItemList extends React.Component {

    state = {
        items: [],
        searched: []
    }

    componentDidMount() {
        axios.get('http://localhost:8000/api/items/market')
            .then(res => {
                this.setState({
                    items: res.data,
                    searched: res.data
                });
            })
    }

    render() {
        const items = this.state.items;

        if(items[0] !== undefined) {
            return (
                <div>
                    <Search
                      placeholder="Search..."

                      onChange={(e) => {
                          this.setState({
                              searched: []
                          });
                          var interesting = [];

                          this.state.items.forEach(function (item) {
                              if(item.name.includes(e.target.value)) {
                                  interesting.push(item);
                              }
                          });

                          this.setState( {
                              searched: interesting
                          })
                      }}

                      className="test-class"

                      style={{ marginBottom: 15, width: 300 }}
                    />
                    <ItemCells data={this.state.searched} />
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

export default ItemList;
