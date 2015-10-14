import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';

class LineItem extends React.Component {
  constructor(props) {
    super(props);
    //this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  onChange(state) {
    this.setState(state);
  }

  handleIsBoughtClick() {
    this.props.onBoughtStatusChange(this.props._id, !this.props.isBought, this.props.index);
  }

  render () {
    return (
      <div className='line-item'>
        <span className='line-item__property line-item__property--name' ref='name'>
          <span className='line-item__label'>Name</span>
          <Link className='line-item__value' to={'/items/' + this.props._id}>{this.props.name}</Link>
        </span>
        <span className='line-item__property line-item__property--url' ref='url'>
          <span className='line-item__label'>Url</span>
          <span className='line-item__value'>{this.props.url}</span>
        </span>
        <span className='line-item__property line-item__property--price' ref='price'>
          <span className='line-item__label'>Price</span>
          <span className='line-item__value'>{this.props.price}</span>
        </span>
        <span className='line-item__property line-item__property--who-is-buying' ref='whoIsBuying'>
          <span className='line-item__label'>Who is buying?</span>
          <span className='line-item__value'>{this.props.whoIsBuying}</span>
        </span>
        <span className='line-item__property line-item__property--who-for' ref='whoFor'>
          <span className='line-item__label'>Who is the recipient?</span>
          <span className='line-item__value'>{this.props.whoFor}</span>
        </span>
        <span className='line-item__property line-item__property--status' ref='isBought' onClick={this.handleIsBoughtClick.bind(this)}>
          <span className='line-item__label'>Is it bought?</span>
          <span className='line-item__value'>{this.props.isBought ? 'Yes' : 'No'}</span>
        </span>
      </div>
    );
  }
}

LineItem.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default LineItem;
