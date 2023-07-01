import { Row, Col, Rate, Divider } from 'antd';

const desc = ['terrible', 'malo', 'regular', 'bueno', 'excelente'];

const ReviewsSectionCard = (props) => {
    const { rating, comment, userSub } = props;

    return (
        <Col style={{ maxInlineSize: '400px', marginBlock: '10px', marginInline: '30px' }}>
            <Row>
                <span>
                    <Rate tooltips={ desc } value={ rating } disabled />
                    { <span className="ant-rate-text">{ desc[rating - 1] }</span> }
                </span>
            </Row>
            <Row style={{ marginBlock: '10px', fontStyle: 'italic' }}>
                { comment }
            </Row>
            <Row>
                { userSub }
            </Row>
            <Divider style={{ margin: '5px' }} />
        </Col>
    );
};

export default ReviewsSectionCard;