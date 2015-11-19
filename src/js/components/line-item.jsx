import $ from 'jquery';
import React from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class LineItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {
  }

  handleIsBoughtClick() {
    this.props.onBoughtStatusChange(this.props._id, !this.props.isBought, this.props.index);
  }

  handleDeleteClick() {
    this.props.onDeleteClick(this.props._id, this.props.index);
  }

  getHost(href) {
    var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
    return match && match[3];
    // return match && {
    //   protocol: match[1],
    //   host: match[2],
    //   hostname: match[3],
    //   port: match[4],
    //   pathname: match[5],
    //   search: match[6],
    //   hash: match[7]
    // }
  }

  render () {
    return (
      <div className='line-item'>
        <span className='line-item__name' ref='name'>
          <span className='line-item__label'>Name</span>
          <a className='line-item__value' href={this.props.url} target='_blank' title={this.props.url}>{this.props.name}</a>
        </span>
        <span className='line-item__property line-item__property--url' ref='url'>
          <span className='line-item__label'>Found On</span>
          <span className='line-item__value'>{this.getHost(this.props.url)}</span>
        </span>
        <span className='line-item__property line-item__property--price' ref='price'>
          <span className='line-item__label'>Price</span>
          <span className='line-item__value'>{this.props.price.replace(/^([^\£])/, '£$1')}</span>
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
          <span className='line-item__value'>
            <span className={classNames('line-item__bought-status', { 'line-item__bought-status--active': this.props.isBought })}>Yes</span>
            &nbsp;|&nbsp;
            <span className={classNames('line-item__bought-status', { 'line-item__bought-status--active': !this.props.isBought })}>No</span>
          </span>
        </span>
        <span className='line-item__delete' onClick={this.handleDeleteClick.bind(this)}>Delete</span>
      </div>
    );
  }
}

LineItem.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default LineItem;
