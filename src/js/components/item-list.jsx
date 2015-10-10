import React from 'react';
import LineItem from './line-item.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleOnBoughtStatusChange(id, isBought, index) {
    this.props.onBoughtStatusChange(id, isBought, index);
  }

  render() {
    var itemsList = this.props.items.map((item, index) => {
      return (
        <LineItem {...item} key={ index } index={index} onBoughtStatusChange={this.handleOnBoughtStatusChange.bind(this)} />
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {itemsList}
        </div>
      </div>
    );
  }
}

ItemList.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default ItemList;
