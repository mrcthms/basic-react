import React from 'react';
import auth from './auth.jsx';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: false
    };
  }

  handleOnClick() {
    this.props.onClick();
  }

  handleSubmit(event) {
    event.preventDefault();

    var canSubmit = true;
    var url = React.findDOMNode(this.refs.url).value.trim();
    var price = parseInt(React.findDOMNode(this.refs.price).value.trim(), 10).toFixed(2);
    var whoFor = React.findDOMNode(this.refs.whoFor).value.trim();
    var whoIsBuying = React.findDOMNode(this.refs.whoIsBuying).value.trim();
    var isBought = React.findDOMNode(this.refs.isBought).checked;

    if (!url || !price || !whoFor || !whoIsBuying || typeof isBought === 'undefined') {
      canSubmit = false;
    }
    if (canSubmit) {
      this.props.onFormSubmit({ url, price, whoFor, whoIsBuying, isBought, _creator: auth.getToken() });

      var fields = ['url', 'price', 'whoFor', 'whoIsBuying', 'isBought'];

      fields.forEach((field) => {
        React.findDOMNode(this.refs[field]).value = '';
      });
    } else {
      this.setState({
        errors: 'Please make sure you fill in all the fields'
      });
    }
  }

  render() {
    return (
      <div className='add-item'>
        <div className='add-item__bg'></div>
        <div className='add-item__close' onClick={this.handleOnClick.bind(this)}>&times;</div>
        <div className='add-item__modal'>
          <div className='add-item__form [ grid ]'>
            <div className='[ grid__col grid__col--half ]'>
              <h1 className='add-item__title'>Add Item</h1>
            </div>
            <div className='[ grid__col grid__col--half ]'>
              <span className='form-error'>{this.state.errors}</span>
            </div>
            <form onSubmit={this.handleSubmit.bind(this)}>
              <div className='form-group'>
                <input type='text' className='form-group__input' ref='url' id='url' placeholder="Url" />
                <label className='form-group__label' htmlFor='url'>Item URL</label>
              </div>
              <div className='form-group'>
                <input type='text' className='form-group__input' ref='price' id='price' placeholder="Price" />
                <label className='form-group__label' htmlFor='price'>Item Price</label>
              </div>
              <div className='[ grid__col grid__col--half ]'>
                <div className='form-group'>
                  <input type='text' className='form-group__input' ref='whoFor' id='whoFor' placeholder="Who is it for?" />
                  <label className='form-group__label' htmlFor='whoFor'>Who For?</label>
                </div>
              </div>
              <div className='[ grid__col grid__col--half ]'>
                <div className='form-group'>
                  <input type='text' className='form-group__input' ref='whoIsBuying' id='whoIsBuying' placeholder="Who is buying it?" />
                  <label className='form-group__label' htmlFor='whoIsBuying'>Who is Buying?</label>
                </div>
              </div>
              <div className='form-group form-group--checkbox'>
                <label className='form-group__checkbox' htmlFor='isBought'>
                  <input type='checkbox' className='form-group__input' ref='isBought' id='isBought' />
                  <span className='form-group__label'>Is this already bought?</span>
                </label>
              </div>
              <button type='submit' className='btn btn-primary'><span>Submit</span></button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
