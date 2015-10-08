import React from 'react';
import LineItem from './line-item.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var itemsList = this.props.items.map((item, index) => {
      return (
        <LineItem {...item} key={ index } />
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
