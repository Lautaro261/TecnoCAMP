import { Row, Col } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReviewsSectionCard from '../ReviewsSectionCard/ReviewsSectionCard';
import { getAllReviewsByProductId } from '../../../Redux/Features/reviews/clientReviewsSlice';

const ReviewsSection = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const productId = pathname.split('/').pop();
    const allReviewsByProductId = useSelector(state => state.clientReviews.allReviewsByProductId);

    useEffect(() => {
        dispatch(getAllReviewsByProductId(productId));
    }, []);

    return (
        <Col align='middle' style={{ color: 'black' }}>
            <Row justify='center' style={{ marginBlockStart: '25px', fontSize: '15px', fontWeight: 'bold' }}>
                Opiniones del producto
            </Row>
            <Row justify='center' >
                { allReviewsByProductId.length > 0 ? allReviewsByProductId.map(review => (
                    <ReviewsSectionCard 
                        key = { review.id }
                        rating = { review.rating } 
                        comment = { review.comment }
                        userSub = { review.userSub }
                    />
                )) : 'No hay reviews para mostrar' }
            </Row>
        </Col>
    );
};

export default ReviewsSection;