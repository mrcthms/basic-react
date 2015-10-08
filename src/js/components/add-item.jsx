import React from 'react';

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
    var isBought = React.findDOMNode(this.refs.isBought).value.trim();

    if (!name || !url || !price || !whoFor || !whoIsBuying || typeof isBought === 'undefined') {
      canSubmit = false;
    }

    this.props.onFormSubmit({ name, url, price, whoFor, whoIsBuying, isBought });

    var fields = ['name', 'url', 'price', 'whoFor', 'whoIsBuying', 'isBought'];

    fields.forEach((field) => {
      React.findDOMNode(this.refs[field]).value = '';
    });
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
                  <div className={'form-group'}>
                    <label className='control-label'>Item Name</label>
                    <input type='text' className='form-control' ref='name' placeholder="Your name" autoFocus/>
                  </div>
                  <div className={'form-group'}>
                    <label className='control-label'>Item URL</label>
                    <input type='text' className='form-control' ref='url' placeholder="Url" />
                  </div>
                  <div className={'form-group'}>
                    <label className='control-label'>Item Price</label>
                    <input type='text' className='form-control' ref='price' placeholder="Price" />
                  </div>
                  <div className={'form-group'}>
                    <label className='control-label'>Who For?</label>
                    <input type='text' className='form-control' ref='whoFor' placeholder="Who is it for?" />
                  </div>
                  <div className={'form-group'}>
                    <label className='control-label'>Who iss Buying?</label>
                    <input type='text' className='form-control' ref='whoIsBuying' placeholder="Who is buying it?" />
                  </div>
                  <div className={'form-group'}>
                    <label className='control-label'>Item Status</label>
                    <div className='checkbox'>
                      <label>
                        <input type='checkbox' className='form-control' ref='isBought' /> Bought?
                      </label>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
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
