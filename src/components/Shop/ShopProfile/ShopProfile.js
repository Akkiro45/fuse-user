import React, { Component } from 'react';

import module from './ShopProfile.module.css';
import Aux from '../../../hoc/Auxx/Auxx';
import { convertAddress, awsS3BucketUrl } from '../../../shared/utility';
import UpIcon from '../../UI/Icons/UpArrow/UpArrow';
import DownIcon from '../../UI/Icons/DownArrow/DownArrow';
import Label from '../Label/Label';
import Space from '../../Space/Space';
import LinkLabel from '../SocialLinkLabel/SocialLinkLabel';
import FaceBookIcon from '../../UI/Icons/FaceBook/FaceBook';
import InstagramIcon from '../../UI/Icons/Instagram/Instagram';
import TwitterIcon from '../../UI/Icons/Twitter/Twitter';
import ShopPhoto from '../../../assets/Img/ShopPhoto.png';

class ShopProfile extends Component {
  state = {
    show: false
  }
  getIcon = (type) => {
    type = type.toLowerCase();
    if(type === 'twitter') return <TwitterIcon />;
    if(type === 'facebook') return <FaceBookIcon />;
    if(type === 'instagram') return <InstagramIcon />;
  }
  onShow = () => {
    this.setState(prevState => {
      return { show: !prevState.show };
    });
  }
  render() {
    let src = ShopPhoto;
    if(this.props.shop.shopPhotos.length > 0) {
      src = awsS3BucketUrl + this.props.shop.shopPhotos[0].name;
    }
    let socialLinks = null;
    socialLinks = this.props.shop.socialLinks.map((l, i) => {
      return (
        <LinkLabel
          key={i}
          icon={this.getIcon(l.type)}
          text={l.link}
        />
      )
    });
    let categories = null;
    categories = this.props.shop.shopCategories.map((c, i) => {
      return (
        <div key={i} className={module.Category} >
          {c.category}
        </div>
      )
    });
    let show = (
      <div className={module.Both} >
        <div className={module.Left} >
          {this.state.show ? <UpIcon /> : <DownIcon /> }
        </div>
        <div>
          Show {this.state.show ? 'Less' : 'More'} Information
        </div>
      </div>
    );
    let extra = null;
    if(this.state.show) {
      extra = (
        <div className={module.Extra} >
          <Label>Categories :</Label>
          {categories}
          <Space height='10px' />
          {!this.props.shop.isStatic ? 
            (
            <div className={module.H} >
                <div style={{ float: 'left' }} >
                  <Label>Delivery Charge : </Label>
                </div>
                <div className={module.DCharge} >
                  Rs. {this.props.shop.deliveryCharge}
                </div>
            </div>
            ) : null}
          <Space height='10px' />
          <div className={module.H} >
            <div style={{ float: 'left' }} >
              <Label>Phone Number : </Label>
            </div>
            <div className={module.DCharge} >
              {this.props.shop.phoneNumber}
            </div>
          </div>
          <Space height='10px' />
          {socialLinks}
          <Label>About Us : </Label>
          <div className={module.ShopDesc} >
            {this.props.shop.description}
          </div>
        </div>
      );
    }
    let ren = (
      <div className={module.Box} >
        <div className={module.Container} >
          <div className={module.Name} >
            {this.props.shop.shopName}
          </div>
          <div className={module.SInfo} >
            <div className={module.Photo} >
              {/* eslint-disable-next-line */}
              <img src={src}  />
            </div>
            <div className={module.Address} >
              <div className={module.Add} >
                {convertAddress(this.props.shop.shopAddress[0])}
              </div>
              <div className={this.props.shop.isStatic ? module.No : module.Yes} >
                Delivery {this.props.shop.isStatic ? 'Not' : ''} Available
              </div>
            </div>
          </div>
        </div>
        {extra}
        <div className={module.Show} onClick={this.onShow} >
          {show}
        </div>
      </div>
    );
    return (
      <Aux>
        {ren}
      </Aux>
    );
  }
}

export default ShopProfile;