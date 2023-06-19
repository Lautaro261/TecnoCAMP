import logo from "./../../../img/LogoTienda.png"

const AboutUsData =()=>{
    const bg ={
        
        overflow: "hidden",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundSize: "300% 300%",
        backgroundImage: "linear-gradient(-180deg, rgb(0, 112, 177) 0%, rgb(38, 78, 114) 51%, #ffffff 100%)",
      }

    return(      
        <div style={{minHeight:"70vh", background:"linear-gradient(-180deg, rgb(0, 112, 177) 0%, rgb(38, 78, 114)70%, #ffffff 200%)"}}>
            <img src={logo} alt="" style={{width:"20vw", marginLeft:"40vw", marginTop:"10vh"}}/>
            <div style={{display:"flex", gap:"10vw", width:"70vw", marginLeft:"15vw"}}>
            <p style={{color:"white", fontSize:"1vw"}}>¡Bienvenido a nuestra tienda en línea, tu destino definitivo para la última tecnología! En nuestro ecommerce, te ofrecemos una amplia selección de productos de alta calidad que te permitirán estar a la vanguardia en el mundo digital. Explora nuestra colección de teléfonos inteligentes, donde encontrarás las marcas más reconocidas y los modelos más populares. Desde los últimos lanzamientos hasta los clásicos favoritos, estamos aquí para satisfacer tus necesidades y superar tus expectativas. Ya sea que busques una potente cámara, una pantalla vibrante o un rendimiento impecable, encontrarás el teléfono perfecto que se ajuste a tu estilo de vida.
            </p>
            <p style={{color:"white", fontSize:"1vw"}}> Además, sumérgete en el universo de los smartwatches, donde la moda se encuentra con la funcionalidad. Estos dispositivos elegantes y versátiles no solo te mantendrán conectado en todo momento, sino que también añadirán un toque de estilo a tu muñeca. Desde seguimiento de actividad hasta notificaciones inteligentes, nuestros smartwatches te mantendrán un paso adelante en cada movimiento.
                ¿Buscas una experiencia auditiva inigualable? Nuestra gama de auriculares y audífonos te envolverá en un sonido cristalino y envolvente. Descubre la libertad de la música inalámbrica con nuestros auriculares Bluetooth, o sumérgete en un mundo de precisión acústica con nuestros audífonos de alta fidelidad. Ya sea que estés en movimiento, en el gimnasio o relajándote en casa, nuestros dispositivos de audio te brindarán una experiencia sonora excepcional.
               </p>
            <p style={{color:"white", fontSize:"1vw"}}>
            En nuestra tienda en línea, no solo te ofrecemos productos de tecnología de primer nivel, sino también una experiencia de compra excepcional. Navega por nuestras categorías, lee las opiniones de otros clientes satisfechos y aprovecha nuestras ofertas especiales. Además, nuestro equipo de atención al cliente está listo para responder a todas tus preguntas y brindarte asistencia personalizada en cada paso del camino.
                No esperes más. Descubre la tecnología que transformará tu vida y únete a nuestra comunidad de entusiastas de la tecnología. ¡Tu próximo dispositivo te espera en nuestra tienda en línea de productos de tecnología! ¡Haz clic y sé parte de la revolución tecnológica hoy mismo!
            </p>
            </div>
     
           
        </div>
    )
}

export default AboutUsData;