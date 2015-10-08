import React from 'react';
import $ from 'jquery';
import ItemList from './item-list.jsx';
import AddItem from './add-item.jsx';
import { ITEMS_URL } from '../config';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        name: 'Xbox',
        url: 'http://amazon.com',
        price: '£19.99',
        whoFor: 'Amy',
        whoIsBuying: 'Marc',
        isBought: false,
        _id: "asdfasdf234234"
      }]
    };
  }

  componentDidMount() {
    this.loadItemsFromServer();
  }

  loadItemsFromServer() {
    console.log('hello world');
    $.ajax({
      url: ITEMS_URL,
      type: 'GET',
      cache: false,
      success: (items) => {
        this.setState({
          items: items
        })
      },
      error: (xhr, status, err) => {
        console.log(xhr, status, err);
      }
    })
  }

  handleFormSubmit(item) {
    var items = this.state.items;
    var newItems = items.concat(item);
    this.setState({
      items: newItems
    });
    this.addItem(item);
  }

  addItem(item) {
    $.ajax({
      url: ITEMS_URL,
      type: 'POST',
      data: item,
      success: (items) => {
        this.setState({
          items: items
        })
      },
      error: (xhr, status, err) => {
        console.log(xhr, status, err);
      }
    });
  }

  render() {
    return (
      <div className="xmas-list">
        <ItemList items={this.state.items}>
        </ItemList>
        <AddItem onFormSubmit={this.handleFormSubmit.bind(this)} />
      </div>
    );
  }
};

export default Home;
