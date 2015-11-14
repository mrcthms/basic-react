import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: false
    };
  }

  handleChange() {
    var data = {
      whoFor: React.findDOMNode(this.refs.filterWhoFor).value.trim(),
      whoIsBuying: React.findDOMNode(this.refs.filterWhoIsBuying).value.trim()
    };
    this.props.onFilterChange(data);
  }

  render() {
    return (
      <div className='filter'>
        <form className='filter__form'>
          <div className='[ grid__col grid__col--third ]'>
            <h3>Filter results</h3>
          </div>
          <div className='[ grid__col grid__col--third ]'>
            <div className='form-group'>
              <input type='text' className='form-group__input' ref='filterWhoIsBuying' id='filterWhoIsBuying' placeholder="Who is buying it?" onChange={this.handleChange.bind(this)} />
              <label className='form-group__label' htmlFor='whoIsBuying'>Who is Buying?</label>
            </div>
          </div>
          <div className='[ grid__col grid__col--third ]'>
            <div className='form-group'>
              <input type='text' className='form-group__input' ref='filterWhoFor' id='filterWhoFor' placeholder="Who is it for?" onChange={this.handleChange.bind(this)} />
              <label className='form-group__label' htmlFor='whoFor'>Who For?</label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Filter;
