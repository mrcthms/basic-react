import React from 'react';
import LineItem from './line-item.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnBoughtStatusChange(id, isBought, index) {
    this.props.onBoughtStatusChange(id, isBought, index);
  }

  handleDeleteClick(id, index) {
    this.props.onDeleteClick(id, index);
  }

  render() {
    var itemsList = this.props.items.map((item, index) => {
      return (
        <LineItem {...item} key={ index } index={index} onBoughtStatusChange={this.handleOnBoughtStatusChange.bind(this)} onDeleteClick={this.handleDeleteClick.bind(this)} />
      );
    });

    return (
      <div className='item-list [ grid ]'>
        <div className='[ grid__col grid__col--half ]'>
          <h1 className='item-list__title'>Your Items To Buy</h1>
        </div>
        <div className='[ grid__col grid__col--half ]'>
          <h1 className='item-list__title'>Items You Have Bought</h1>
        </div>
        {itemsList}
      </div>
    );
  }
}

ItemList.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ItemList;
