import React from 'react';
import moment from 'moment';

import Input from '../components/UI/Inputs/Input/Input';
import RInput from '../components/UI/RInput/RInput';
import RSelect from '../components/UI/RSelect/Select';
import Select from '../components/UI/Inputs/Select/Select';
import * as districts from './statewisedistrict';

export const updateObject = (oldObject, updatedproperties) => {
  return {
      ...oldObject,
      ...updatedproperties
  }
}

export const validateForm = (data, isSignup) => {
  if(data.email || data.phoneNumber)  {
    if(data.email) {
      if(data.email) {
        if(!(validateEmail(data.email))) {
          return { valid: false, msg: 'Invalid Email!' };
        }
      }
    }
    if(data.phoneNumber) {
      if(!(data.phoneNumber.length === 10)) {
        return { valid: false, msg: 'Invalid Mobile Number!' };
      }
      if(!(validatePhoneNumber(data.phoneNumber))) {
        return { valid: false, msg: 'Invalid Mobile Number!' };
      }
    }
    if(!(data.password.length >= 8)) {
      return { valid: false, msg: 'Password must ne larger than 7 character' };
    }
  } else {
    return { valid: false, msg: 'Please fill required fields' };
  }
  if(isSignup) {
    if(!(data.password.length >= 8 && data.confirmPassword.length >= 8)) {
      return { valid: false, msg: 'Password must ne larger than 7 character' };
    }
    if(!(2 <= data.firstName.length <= 60)) {
      return { valid: false, msg: 'First Name must contain 2 to 60 character!' };
    }
    if(!(2 <= data.lastName.length <= 120)) {
      return { valid: false, msg: 'First Name must contain 2 to 60 character!' };
    }
    if(!(data.password === data.confirmPassword)) {
      return { valid: false, msg: 'Please fill correct password and Confirm Password' };
    }
    if(!data.tac) {
      return { valid: false, msg: 'Please check terms and conditions!' };
    }
  }
  return { valid: true };
}

const validateEmail = (email) => {
  // eslint-disable-next-line
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validatePhoneNumber = (phoneNumber) => {
  // eslint-disable-next-line
  let re = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
  return re.test(phoneNumber);
}

export const getInput = (field, handler) => {
  return (
    <Input
      type={field.type}
      placeholder={field.placeholder}
      value={field.value}
      name={field.name}
      minLength={field.minLength}
      maxLength={field.maxLength}
      required={field.required}
      width={field.width}
      height={field.height}
      onChange={(e) => handler(e)}
    />
  );
}
export const getRInput = (field, handler) => {
  return (
    <RInput
      key={field.name}
      type={field.type}
      placeholder={field.placeholder}
      value={field.value}
      name={field.name}
      minLength={field.minLength}
      maxLength={field.maxLength}
      required={field.required}
      onChange={(e) => handler(e)}
      fontsize={field.fontsize}
      bradius={field.bradius}
    />
  );
}
export const getSelect = (field, options, handler, type) => {
  return (
    <Select 
      name={field.name}
      value={field.value}
      options={options}
      onChange={(e) => handler(e, type)}
      type={field.type}
      width={field.width}
      height={field.height}
    />
  );
}
export const getRSelect = (field, options, handler, type) => {
  return (
    <RSelect 
      name={field.name}
      value={field.value}
      options={options}
      onChange={(e) => handler(e, type)}
      type={field.type}
      bradius={field.bradius}
    />
  );
}

export const checkwhiteSpaces = (str) => {
  for(let i=0; i<str.length; i++) {
    if(str[i] !== ' ') {
      return false;
    }
  }
  return true;
}


export const convertAddress = (address) => {
  return `${address.streetAdd}, ${address.landmark}, ${address.city}-${address.pincode}, ${address.state}`;
}

export const validateFilters = (delivery, district, category, shopName) => {
  let finalData = {};
  finalData.delivery = delivery;
  if(district !== 'District') {
    finalData.district = district;
  }
  if(category.value !== 'Category*') {
    finalData.shopCategories = category.value;
  }
  if(!checkwhiteSpaces(shopName.value)) {
    finalData.shopSrchName = shopName.value;
  }
  return finalData;
}

export const compareCategory = (a,b) => {
  if (a.category < b.category)
    return -1;
  if (a.category > b.category)
    return 1;
  return 0;
}
export const compareItem = (a,b) => {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

export const filterCart = (itms, shopID) => {
  let items = itms.map(i => {
    return { itemID: i._id, quantity: i.quantity, mValue: i.mValue };
  });
  return {
    items,
    shopID
  };
}

export const capatalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const dateTimeFormate = (timeStamp) => {
  let timeStampInt = parseInt(timeStamp);
  return moment(timeStampInt).format('MMMM Do YYYY, h:mm a');
}

const forEmpty = (data) => {
  if(checkwhiteSpaces(data.value)) {
    return { valid: false, msg: `Please fill ${data.placeholder}.` };
  }
}
const checkLimit = (data) => {
  if((parseInt(data.maxLength) < data.value.length) || (data.value.length < parseInt(data.minLength))) {
    return { valid: false, msg: `${data.placeholder} must be between ${data.minLength} to ${data.maxLength} character.` };
  }
}
const checkForNumber = (str) => {
  // eslint-disable-next-line
  let re = /^\d+$/;
  return re.test(str);
}

export const validateAddress = (address) => {
  let finalData = {};
  let fields = [address.streetAdd, address.landmark, address.pincode];
  for(let i=0; i<fields.length; i++) {
    if(forEmpty(fields[i])) {
      return forEmpty(fields[i]);
    }
    if(checkLimit(fields[i])) {
      return checkLimit(fields[i]);
    }
  }
  if(address.state.value === 'state*') {
    return { valid: false, msg: `Please select state!` };
  }
  if(address.district.value === 'district*') {
    return { valid: false, msg: `Please select district!` };
  }
  if(!checkForNumber(address.pincode.value)) {
    return { valid: false, msg: `Please enter valid ${address.pincode.placeholder}` };
  }
  finalData = {
    streetAdd: address.streetAdd.value,
    landmark: address.landmark.value,
    city: address.district.value,
    pincode: address.pincode.value,
    state: address.state.value
  }
  return { valid: true, data: finalData };
}

export const generateOptions = (list) => {
  return list.map(e => {
    return { name: e, value: e };
  });
}

export const getDistrictsOptions = (state) => {
  if(state !== 'state*') {
    state = state.split(' ').join('');
    return districts[state];
  }
}

export const awsS3BucketUrl = 'https://s3.ap-south-1.amazonaws.com/fuse-photos/'; 
// export const awsS3BucketUrl = '';