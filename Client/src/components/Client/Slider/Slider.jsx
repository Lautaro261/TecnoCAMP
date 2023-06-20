import { Carousel } from 'antd';
import s1 from "../../../img/Slider/1.png"
import s2 from "../../../img/Slider/2.png"
import s3 from "../../../img/Slider/3.png"
import s4 from "../../../img/Slider/4.png"
import { Link } from 'react-router-dom';

const contentStyle = {
  height: ' auto',
  width:"70vw",
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
  marginLeft:"15%",
  marginTop:"1.4%",
  marginBottom:"1.4%"

};

const divStyle = {
    overflow:"hidden",
    zIndex:"-1",
    height: ' auto',
    width:"100vw",
    position:"fixed",
    filter: "blur(20px)"
    
};
const Slider = () => (
  <Carousel autoplay>
    <div >
      <Link to="/all-categories">      
      <img src={s1} style={divStyle}/>
      <img src={s1} style={contentStyle}/>
      </Link>
    </div>
    <div>
    <Link to="/categories/Celulares">    
    <img src={s2} style={divStyle}/>
    <img src={s2} style={contentStyle}/>
    </Link>
    </div>
    <div>
    <Link to="/offers">  
    <img src={s3} style={divStyle}/>
    <img src={s3} style={contentStyle}/>
    </Link>
    </div>
    <div>
    <Link to="/all-categories">  
    <img src={s4} style={divStyle}/>
    <img src={s4} style={contentStyle}/>
    </Link>
    </div>
  </Carousel>
);
export default Slider;