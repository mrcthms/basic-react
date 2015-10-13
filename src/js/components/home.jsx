import React from 'react';
import $ from 'jquery';
import ItemList from './item-list.jsx';
import Button from './button.jsx';
import AddItem from './add-item.jsx';
import { requireAuth } from '../app/functions.jsx';
import auth from './auth.jsx';
import { ITEMS_URL } from '../config';

var Home = requireAuth(class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showForm: false
    };
  }

  componentDidMount() {
    this.loadItemsFromServer();
  }

  loadItemsFromServer() {
    $.ajax({
      url: ITEMS_URL,
      type: 'GET',
      data: {
        userId: auth.getToken()
      },
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
      success: (savedItem) => {
        var currentItems = this.state.items.slice(0, -1);
        var newItems = currentItems.concat(savedItem);

        this.setState({
          items: newItems
        });
      },
      error: (xhr, status, err) => {
        console.log(xhr, status, err);
      }
    });
  }

  handleButtonClick() {
    this.setState({
      showForm: true
    });
  }

  handleOnBoughtStatusChange(id, isBought, index) {
    $.ajax({
      url: `${ITEMS_URL}/${id}`,
      type: 'PUT',
      data: {
        isBought
      },
      success: (updatedItem) => {
        var items = this.state.items;
        items[index] = updatedItem;
        this.setState({
          items: items
        });
      },
      error: (xhr, status, err) => {
        console.log(xhr, status, err);
      }
    });
  }

  render() {
    var token = auth.getToken();
    return (
      <div className={this.state.showForm ? "xmas-list js-show-add-form" : "xmas-list"}>
        <ItemList items={this.state.items} onBoughtStatusChange={this.handleOnBoughtStatusChange.bind(this)}>
        </ItemList>
        <Button onClick={this.handleButtonClick.bind(this)}>Add New Item</Button>
        <AddItem onFormSubmit={this.handleFormSubmit.bind(this)} />
      </div>
    );
  }
});

export default Home;
