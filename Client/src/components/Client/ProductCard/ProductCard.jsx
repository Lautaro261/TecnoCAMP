import { Row, Col, Space, Card, Tag, Button } from 'antd';
import {
	HeartOutlined,
	HeartFilled
} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addFavorite } from '../../../Redux/Features/products/clientProductsSlice';
import { useDispatch } from 'react-redux';

// id será usado para la vista de detalle
const ProductCard = ({ id, e_product_type, photo, name, price, is_available }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const { Meta } = Card;
	const dispacth = useDispatch();
	const token = window.localStorage.getItem("token");
	//console.log(photo);

	const onClick = (id) => {
		//console.log(id)
		const data = {
			productId: id,
			favorite: true
		}
		setIsFavorite(!isFavorite);
		dispacth(addFavorite({token, data}))
	};

	return (
		<Row justify='center'>
			<Col>
				<Row justify='end' >
					<button onClick={()=>{onClick(id)}} >
						{
							isFavorite ? (<HeartFilled />) : (<HeartOutlined />)
						}
					</button>
				</Row>
				<Link to={`/categories/product/${id}`}>
					<Card
						hoverable
						style={{ width: 180, margin: 0 }}
						cover={<img alt={name} src={photo[0]} style={{
							maxHeight: '20vh', width: 'auto', display: 'block',
							margin: '0 auto'
						}} />}
					>
						<div>{e_product_type}</div>
						<Meta
							title={name}
						/>
						<div>$ {price}</div>
						{is_available === false && (
							<Tag color="red">Sin stock</Tag>
						)}
					</Card>
				</Link>
			</Col>
		</Row>
	);
};

export default ProductCard;