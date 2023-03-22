import React from 'react';
import { Item } from './Item';

const ItemsList = ({items}) => {
	return <>
		{
			items.map((item, idx) => {
				return <Item item={item} key={idx} />
			})
		}
	</>
} 

export default ItemsList