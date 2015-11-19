import React from 'react';
import LineItem from './line-item.jsx';
import classNames from 'classnames';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBought: false
    };
  }

  handleOnBoughtStatusChange(id, isBought, index) {
    this.props.onBoughtStatusChange(id, isBought, index);
  }

  handleDeleteClick(id, index) {
    this.props.onDeleteClick(id, index);
  }

  handleTabClick(bool) {
    this.setState({
      isBought: bool
    });
  }

  render() {
    var itemsList = this.props.items.map((item, index) => {
      var whoFor = item.whoFor.toLowerCase();
      var whoIsBuying = item.whoIsBuying.toLowerCase();
      if (whoFor.indexOf(this.props.filterData.whoFor.toLowerCase()) > -1 && whoIsBuying.indexOf(this.props.filterData.whoIsBuying.toLowerCase()) > -1 && item.isBought === this.state.isBought) {
        return (
          <LineItem {...item} key={ index } index={index} onBoughtStatusChange={this.handleOnBoughtStatusChange.bind(this)} onDeleteClick={this.handleDeleteClick.bind(this)} />
        );
      }
    });

    return (
      <div className='item-list [ grid ]'>
        <div className='[ grid__col grid__col--half ]'>
          <h1 className='item-list__title'>
            <a href='javascript:void(0)' className={classNames('item-list__title-link', { 'item-list__title-link--active': this.state.isBought === false })} onClick={this.handleTabClick.bind(this, false)}>Your Items To Buy</a>
          </h1>
        </div>
        <div className='[ grid__col grid__col--half ]'>
          <h1 className='item-list__title'>
            <a href='javascript:void(0)' className={classNames('item-list__title-link', { 'item-list__title-link--active': this.state.isBought === true })} onClick={this.handleTabClick.bind(this, true)}>Items You Have Bought</a>
          </h1>
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
