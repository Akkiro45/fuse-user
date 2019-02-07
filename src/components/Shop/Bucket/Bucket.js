import React, { Component } from 'react';

import module from './Bucket.module.css';
import Button from '../../UI/Button/Button';
import UpArrow from '../../UI/Icons/UpArrow/UpArrow';
import DownArrow from '../../UI/Icons/DownArrow/DownArrow';
import Items from '../../Cart/Items/Items';;

class Bucket extends Component {
  state = {
    show: false
  }
  onShow = () => {
    this.setState(prevState => {
      return { show: !prevState.show }
    });
  }
  render() {
    let info = null;
    if(this.state.show) {
      info = (
        <div className={module.Info} >
          <Items 
            items={this.props.bucket}
            deliverycharge={this.props.deliverycharge}
            bucket
            rmvItem={this.props.removeItem}
            updateItem={this.props.updateItem}
          />
        </div>
      );
    }
    return (
      <div className={module.Bucket} >
        {info}
        <div className={module.Footer} >
          <div className={module.Msg} onClick={this.onShow} >
            <div className={module.Text} >
              {this.state.show ? 'Hide' : 'Show'} Bucket ({this.props.bucket.length})
            </div>
            <div className={module.Icon} >
              {this.state.show ? (<UpArrow />) : (<DownArrow />)}
            </div>
          </div>
          <div className={module.Button} >
            <Button bgcolor='#27DF46' onClick={this.props.addToCart} >Add to Cart</Button>
          </div>  
        </div>
      </div>
    );
  }
}

export default Bucket;