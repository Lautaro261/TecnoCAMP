import styles from "./Brands.module.css";
import { Row, Col } from "antd";

const Brands = ({ brands }) => {
    return (
        <Row align="middle">
            { brands.map((brand) => (
                <Col span={ 4 } align="middle" key={ brand }>
                    <img
                        src={ `/img/Smartphones/${ brand }.png` }
                        alt={ brand }
                        className={ styles.brands__image}
                    />
                </Col>
            )) }
        </Row>
    );
};

export default Brands;