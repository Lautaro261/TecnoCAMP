import { useState } from 'react';
import {
  Form,
  Select,
} from 'antd';

function SortFiltering() {

  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return ( 
     <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      
     
      <Form.Item >
        <Select placeholder="Ordenar por..." >
          <Select.Option value="MAYOR PRECIO">MAYOR PRECIO</Select.Option>
          <Select.Option value="MENOS PRECIO">MENOR PRECIO</Select.Option>
          <Select.Option value="A-Z">A-Z</Select.Option>
          <Select.Option value="Z-A">Z-A</Select.Option>
        </Select>
      </Form.Item>
   
    </Form>
  )
}

export default SortFiltering