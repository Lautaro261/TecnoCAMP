import construccion from '../../img/Error/construcción.png';
import { Button } from 'antd';

const ErrorView = ()=>{
    return(
        <div style={{background:"linear-gradient(0deg, rgba(88,181,194,1) 0%, rgba(191,197,222,1) 100%)", height:"100vh"}}>
            <img src={construccion} alt="construccion" style={{maxWidth:"65vw", maxHeight:"65vh", marginLeft:"28vw", marginTop:"15vh"}}/>
            <Button style={{marginLeft:"47vw"}} onClick={ ()=> window.history.back()}>Volver</Button>
        </div>
    )
}

export default ErrorView;