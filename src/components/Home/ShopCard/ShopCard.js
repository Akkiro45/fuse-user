import React  from 'react';

import module from './ShopCard.module.css';
import PlayArrow from '../../UI/Icons/PlayArrow/PlayArrow';

const shopCard = (props) => {
	let category =  props.category.map(c => {
		return c.category;
	}).join(', ');
	return (
		<div className={module.Box} onClick={props.onShopClick} >
			<div className={module.Name} >
				{props.name}
			</div>
			<div className={module.Photo} >
				{/* eslint-disable-next-line */}
				<img src={props.src ? props.src : 'https://www.image.ie/images/no-image.png'}  />
			</div>
			<div className={module.Data} >
				<div className={module.Inner} >
					<div className={module.Address} >
						<div className={module.Icon} > <PlayArrow /> </div>
						<div className={module.Text} >
							{props.address}
						</div>
					</div>
					<div className={module.Category} >
						<div className={module.Icon} > <PlayArrow /> </div>
						<div className={module.Text} >
							{category}
						</div>
					</div>
					<div className={props.isStatic ? module.No : module.Yes} >
						Delivery {props.isStatic ? 'Not' : ''} Available
					</div>
				</div>
			</div>
		</div>
	);
}

export default shopCard;