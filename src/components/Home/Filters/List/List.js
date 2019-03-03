import React, { Component } from 'react';

import module from './List.module.css';
import BackIcon from '../../../UI/Icons/Back/Back';
import { district } from '../../../../shared/district';
import { checkwhiteSpaces } from '../../../../shared/utility';

class List extends Component {
  state = {
    input: '',
    districts: district
  }
  onClickDistrict = (district) => {
    this.props.setDistrict(district);
    this.props.toggleShowd();
  }
  onInputChangedHandler = (e) => {
    let districts;
    let pattren = new RegExp(e.target.value, 'i');
    if(checkwhiteSpaces(e.target.value)) {
      districts = district;
    } else {
      districts = district.filter(d => {
        return (pattren.test(d));
      });
    }
    this.setState({ input: e.target.value, districts });
  }
  render() {
    let districts = this.state.districts.map((d, i) => {
      return (
        <div 
          className={module.Option} 
          key={i} 
          onClick={() => this.onClickDistrict(d)}
        >
          {d}
        </div>
      );
    });
    if(districts.length === 0) {
      districts.push((
        <div className={module.Invalid} key={-1} >
          Invalid Search!
        </div>
      ));
    }
    return (
      <div className={module.List} >
        <div className={module.Icon} >
          <BackIcon onClick={this.props.toggleShowd} />
        </div>
        <input 
          className={module.Input}
          autoComplete='off'
          placeholder='Search...'
          value={this.state.input}
          onChange={(e) => this.onInputChangedHandler(e)}
          autoFocus
        />
        <div className={module.Options} >
          {districts}
        </div>
      </div>
    );
  }
}

export default List;