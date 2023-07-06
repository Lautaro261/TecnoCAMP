import React from 'react';
import { BlockPicker } from 'react-color';
import { Button, Form, InputNumber, Row, Col } from 'antd';
import { useState } from 'react';
const colors=['#FFFFFF', '#000000', '#004dcf', '#37D67A', '#ff9800', '#9c27b0', '#F44336', '#46241F', '#E0EB12']


const PseudoColorPicker = ( {SetFormColors, formColors} ) =>{
    const [total,SetTotal]= useState(formColors)

    const [open, SetOpen] = useState(false)
    const [Acolor, setcolor]=useState("#FFFFFF")
    const [Acant, setCant]=useState(1)
    const [actual,setActual]=useState(null)

    const handleChange=(color)=>{
        setcolor(color.hex)
    }
    const handleCant=(e)=>{
        setCant(e)
        console.log(Acant)
    }
    const addColor=(e)=>{
            SetOpen(!open)
            const canti=(e.target.attributes.data.textContent).split(",")
            canti[1]=Number(canti[1])
            setActual(canti)
            setCant(canti[1])
            setcolor(canti[0])
        }
    const saveColor=(e)=>{
        
        var arr=total
            for(var i=0; i<total.length; i++){
                console.log("comparando: ", actual, " con: ",arr[i])
                if(arr[i][1]=== actual[1] && arr[i][0]=== actual[0]){
                    console.log("encontre")
                    arr[i]=[Acolor, Acant]
                }
            }
            SetTotal(arr)
            SetFormColors(arr)
            SetOpen(!open)
        }

    const deleteColor=(e)=>{
        const todelete=(e.target.attributes.data.textContent).split(",")
        SetTotal(total.filter(item => (item[0] !== todelete[0])))
        SetFormColors(total.filter(item => (item[0] !== todelete[0])))
        console.log("borrando", todelete) 
    }
        
        return(
            <div style={{margin:"10px"}}>
            <Row>
                
            <Col>
            {total.map((i)=>{
                return(
                    <div key={i}>
                        <div data={i} style={{width:"30px", height:"30px",borderRadius:"100px" , background:`${i[0]}`}} onClick={addColor} >{i[1]}
                        </div>
                        
                    </div>
                    )
            })
            }
            </Col>
            </Row>
            {open &&
            <Row style={{width:"30vw", margin:"30px", background:"#D9E3F0"}}>
                <Col span={12}>                
                <BlockPicker colors={colors} onChange={handleChange}  color={Acolor} />
                </Col>

                <Col span={12}>
                <p>Cantidad en stock:</p> <InputNumber size="large" min={1} max={100000} defaultValue={Acant} onChange={handleCant} />
                <Button onClick={saveColor}>Guardar Color</Button>
                </Col>

                <Col>
                </Col>
            </Row>}

            
        </div>
    )

}


export default PseudoColorPicker;