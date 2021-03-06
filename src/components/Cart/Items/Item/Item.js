import React, { Component } from 'react';

import module from './Item.module.css';
import CrossIcon from '../../../UI/Icons/Cross/Cross';
import Incr from '../../../Shop/Incr/Incr';
import { awsS3BucketUrl } from '../../../../shared/utility';

class Item extends Component {
  render() {
    let src = null;
    if(this.props.src) {
      src = awsS3BucketUrl + this.props.src;
    }
    let p = (
      <div className={module.Price} >
        <div>Rs. {this.props.price * this.props.quantity}</div>
      </div>
    );
    if(this.props.bucket) {
      p = (
        <div className={module.Bucket} >
          <div className={module.Icon} >
            <div className={module.Cross} >
              <CrossIcon onClick={this.props.rmvItem} />
            </div>
          </div>
          <div className={module.P} >Rs. {this.props.price * this.props.quantity}</div>
          <div className={module.Incr} >
            <Incr
              value={this.props.quantity}
              onInc={this.props.onInc}
              onDec={this.props.onDec}
            />
          </div>
        </div>
      );
    }
    return (
      <div className={module.Item} >
        <div className={module.Container} >
          <div className={module.Photo} >
            {/* eslint-disable-next-line */}
            <img src={src} />
          </div>
          <div className={module.Both} >
            <div className={module.Info} >
              <div className={module.Sub} >
                <div className={module.Name} >{this.props.name}</div>
                <div className={module.Category} >{this.props.category}</div>
                <div className={module.Unit} >
                  {this.props.mUnit} : {this.props.mValue}
                </div>
                <div className={module.Quntity} >{this.props.quantity} &#10006; {this.props.price}</div>
              </div>
            </div>
            {p}
          </div>
        </div>
      </div>
    );
  }
}

export default Item;