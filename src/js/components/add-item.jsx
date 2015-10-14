import React from 'react';
import auth from './auth.jsx';

class AddItem extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();

    var canSubmit = true;
    var name = React.findDOMNode(this.refs.name).value.trim();
    var url = React.findDOMNode(this.refs.url).value.trim();
    var price = React.findDOMNode(this.refs.price).value.trim();
    var whoFor = React.findDOMNode(this.refs.whoFor).value.trim();
    var whoIsBuying = React.findDOMNode(this.refs.whoIsBuying).value.trim();
    var isBought = React.findDOMNode(this.refs.isBought).checked;

    if (!name || !url || !price || !whoFor || !whoIsBuying || typeof isBought === 'undefined') {
      canSubmit = false;
    }
    if (canSubmit) {
      this.props.onFormSubmit({ name, url, price, whoFor, whoIsBuying, isBought, _creator: auth.getToken() });

      var fields = ['name', 'url', 'price', 'whoFor', 'whoIsBuying', 'isBought'];

      fields.forEach((field) => {
        React.findDOMNode(this.refs[field]).value = '';
      });
    }
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Add Item</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className='form-group'>
                    <input type='text' className='form-group__input' ref='name' placeholder="Your name" autoFocus/>
                    <label className='form-group__label'>Item Name</label>
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-group__input' ref='url' placeholder="Url" />
                    <label className='form-group__label'>Item URL</label>
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-group__input' ref='price' placeholder="Price" />
                    <label className='form-group__label'>Item Price</label>
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-group__input' ref='whoFor' placeholder="Who is it for?" />
                    <label className='form-group__label'>Who For?</label>
                  </div>
                  <div className='form-group'>
                    <input type='text' className='form-group__input' ref='whoIsBuying' placeholder="Who is buying it?" />
                    <label className='form-group__label'>Who is Buying?</label>
                  </div>
                  <div className='form-group form-group--checkbox'>
                    <label className='form-group__label'>Item Status</label>
                    <div className='checkbox'>
                      <label>
                        <input type='checkbox' className='form-group__input' ref='isBought' /> Bought?
                      </label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'><span>Submit</span></button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddItem;
