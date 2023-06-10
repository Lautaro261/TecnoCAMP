import { Row, Col } from "antd";

const Brands = ({ brands }) => {
    return (
        <Row>
            { brands.map((brand) => (
                <Col span={ 4 } align="center" key={ brand }>
                    { brand }
                </Col>
            )) }
        </Row>
    );
};

export default Brands;