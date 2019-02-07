import React from 'react';

import module from './Category.module.css';
import Cat from './Item/Item';
import { compareCategory } from '../../../shared/utility';

const category = (props) => {
  let flag;
  let categories = props.categories.sort(compareCategory).map((c, i) => {
    flag = props.items.find(i => i.category === c.category );
    if(flag) {
      return (
        <Cat 
          key={i}
          name={c.category}
          // src={flag.photo.name}
          active={props.category}
          onClick={() => props.onCatClick(c.category)}
        />
      );
    } else {
      return null;
    }
  });
  return (
    <div className={module.Category} >
      <div className={module.Title} >
        CATEGORIES
      </div>
      <div className={module.Container} >
        {categories}
      </div>
    </div>
  );
}

export default category;