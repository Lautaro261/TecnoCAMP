import { Row, Col, Space, Card, Tag, Button, notification } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addFavorite } from '../../../Redux/Features/products/clientProductsSlice';
import { useDispatch } from 'react-redux';

const ProductCard = ({ id, e_product_type, photo, name, price, is_available, token }) => {
  const { Meta } = Card;
  const dispatch = useDispatch();

  const onClick = (id) => {
    const data = {
      productId: id,
      favorite: true
    }
    dispatch(addFavorite({ token, data }));
	notification.success({
		message: 'Se cargó/quitó el producto a favoritos',
		placement:"top"
	  });
  };

  return (
    <Row justify='center'>
      <Col>
        {token && (
          <Row justify='end'>
            <Button onClick={() => { onClick(id) }}>
              <HeartOutlined />
            </Button>
          </Row>
        )}
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
