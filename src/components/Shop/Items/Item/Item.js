import React, { Component } from 'react';

import module from './Item.module.css';
import Incr from '../../Incr/Incr';
import Button from '../../../UI/Button/Button';
import Aux from '../../../../hoc/Auxx/Auxx';
import DetailedItem from '../DetailedItem/DetailedItem';

class Item extends Component {
  state = {
    quantity: 1,
    show: false
  }
  onInc = () => {
    this.setState(prevState => {
      if(prevState.quantity < 100) {
        return { quantity: prevState.quantity + 1 };
      }
    });
  }
  onDec = () => {
    this.setState(prevState => {
      if(prevState.quantity > 1) {
        return { quantity: prevState.quantity - 1 };
      }
    });
  }
  onDetail = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  }
  onDetailAdd = () => {
    this.setState({ show: false });
    this.props.onAddItem(this.props.item, this.state.quantity);
  }
  render() {
    let detailedItem = null;
    if(this.state.show) {
      detailedItem = (
        <DetailedItem 
          value={this.state.quantity}
          onInc={this.onInc}
          onDec={this.onDec}
          isStatic={this.props.isStatic}
          item={this.props.item}
          onDetail={this.onDetail}
          show={this.state.show}
          onAddItem={this.onDetailAdd}
        />
      );
    }
    let controlls = null;
    if(!this.props.isStatic) {
      controlls = (
        <Aux>
          <div className={module.Incr} >
            <Incr 
              value={this.state.quantity}
              onInc={this.onInc}
              onDec={this.onDec}
            />
          </div>
          <div className={module.AddB} >
            <Button onClick={() => this.props.onAddItem(this.props.item, this.state.quantity)} >Add</Button>
          </div>
        </Aux>
      );
    }
    return (
      <div className={module.Item} >
        {detailedItem}
        <div className={module.Container} >
          <div className={module.Photo} >
            {/* eslint-disable-next-line */}
            <img src={this.props.item.src ? this.props.item.src : 'https://www.image.ie/images/no-image.png'} className={module.Img} />
          </div>
          <div className={module.Name} >
            {this.props.item.name}
          </div>
          <div className={module.MUnit} >
            {this.props.item.mUnit} : {this.props.item.mValue}
          </div>  
          <div className={module.Price} >
            Rs. {this.props.item.price}
          </div>
          <div className={module.Controlls} >
            {controlls}
          </div>
          <div className={module.DButton} >
             <Button onClick={this.onDetail} >More Details</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;