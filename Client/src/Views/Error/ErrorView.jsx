import construccion from '../../img/Error/construcción.png';

const ErrorView = ()=>{
    return(
        <div>
            <button onClick={ ()=> window.history.back()}>Volver</button>
            <img src={construccion} alt="construccion"/>
        </div>
    )
}

export default ErrorView;