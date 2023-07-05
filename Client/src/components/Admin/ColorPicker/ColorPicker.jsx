import React from 'react';
import { BlockPicker } from 'react-color';
import { Button, Form, InputNumber, Row, Col } from 'antd';
import { useState } from 'react';
const colors=['#FFF8F2', '#F47373', '#697689', '#37D67A', '#2CCCE4', '#555555', '#dce775', '#ff8a65', '#ba68c8']



const ColorPicker = ( {SetFormColors, formColors} ) =>{
    const [total,SetTotal]= useState(formColors?formColors:[])

    const [open, SetOpen] = useState(false)
    const [Acolor, setcolor]=useState("#FFFFFF")
    const [Acant, setCant]=useState(1)

    const handleChange=(color)=>{
        setcolor(color.hex)
    }
    const handleCant=(e)=>{
        setCant(e)
        console.log(Acant)
    }
    const addColor=()=>{
            SetOpen(!open)
        }
    const createColor=(e)=>{
            SetTotal([...total, [Acolor, Acant]])
            SetOpen(!open)
            console.log(total)
            SetFormColors([...total, [Acolor, Acant]])
        }

    const deleteColor=(e)=>{
        const todelete=(e.target.attributes.data.textContent).split(",")
        SetTotal(total.filter(item => (item[0] !== todelete[0])))
        SetFormColors(total.filter(item => (item[0] !== todelete[0])))
        console.log("borrando", todelete) 
    }
        
        return(
            <div style={{margin:"10px"}}>
            <Button onClick={addColor}>+ Agregar</Button>
            {open &&
            <Row style={{width:"30vw", margin:"30px", background:"#D9E3F0"}}>
                <Col span={12}>                
                <BlockPicker colors={colors} onChange={handleChange}  />
                </Col>

                <Col span={12}>
                <p>Cantidad en stock:</p> <InputNumber size="large" min={1} max={100000} defaultValue={Acant} onChange={handleCant} />
                <Button onClick={createColor}>Crear Color</Button>
                </Col>

                <Col>
                </Col>
            </Row>}
            <Row>
                
            <Col>
            {total.map((i)=>{
                return(
                    <div key={i}>
                        <div data={i} style={{width:"30px", height:"30px",borderRadius:"100px" , background:`${i[0]}`}} onClick={deleteColor} >{i[1]}
                        </div>
                        
                    </div>
                    )
            })
            }
            </Col>
            </Row>
            
        </div>
    )

}


export default ColorPicker;