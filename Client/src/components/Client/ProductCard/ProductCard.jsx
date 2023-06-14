import styles from './ProductCard.module.css';
import { Row, Col, Space, Card } from 'antd';
import {
	HeartOutlined, 
	HeartFilled 
} from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// id será usado para la vista de detalle
const ProductCard = ({ id, e_product_type, photo, name, price }) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const { Meta } = Card;

	const onClick = () => {
		setIsFavorite(!isFavorite);
	};

	return (
		<Link to={`/categories/product/${id}`}>
		<Row justify='center' className={ styles.productCard__mainCardContainer }>
		    <Col className={ styles.productCard__secondaryCardContainer }>
		        <Row justify='end' className={ styles.productCard__heart }>
		            <button onClick={ onClick } className={ styles.productCard__heartButton }>
		                {
		                	isFavorite ? (<HeartFilled />) : (<HeartOutlined />)
		                }
		            </button>
		    	</Row>
				<Card
				    hoverable
				    style={{ width: 240 }}
				    cover={<img alt={ name } src={ photo } />}
				>
				    <div>{ e_product_type }</div>
				    <Meta 
				        title={ name }
				    />
				    <div>$ { price }</div>
				</Card>
			</Col>
		</Row>
		</Link> 
	);
};

export default ProductCard;