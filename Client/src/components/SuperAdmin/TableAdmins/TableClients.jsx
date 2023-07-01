// import { Button, Form, Input, Popconfirm, Table } from 'antd';
// import React, { useContext, useEffect, useRef, useState} from 'react';
// import { banUser } from '../../../Redux/Features/admin/clients/adminClientsSlice';
// // import { banUser } from '../../../Redux/Features/admin/adminSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import {  notification } from 'antd';
// const EditableContext = React.createContext(null);
// const EditableRow = ({ index, ...props }) => {
//     const [form] = Form.useForm();
//     return (
//         <Form form={form} component={false}>
//             <EditableContext.Provider value={form}>
//                 <tr {...props} />
//             </EditableContext.Provider>
//         </Form>
//     );
// };
// const EditableCell = ({
//     title,
//     editable,
//     children,
//     dataIndex,
//     record,
//     handleSave,
//     ...restProps
// }) => {
//     const [editing, setEditing] = useState(false);
//     const inputRef = useRef(null);
//     const form = useContext(EditableContext);
//     useEffect(() => {
//         if (editing) {
//             inputRef.current.focus();
//         }
//     }, [editing]);
//     const toggleEdit = () => {
//         setEditing(!editing);
//         form.setFieldsValue({
//             [dataIndex]: record[dataIndex],
//         });
//     };
//     const save = async () => {
//         try {
//             const values = await form.validateFields();
//             toggleEdit();
//             handleSave({
//                 ...record,
//                 ...values,
//             });
//         } catch (errInfo) {
//             console.log('Save failed:', errInfo);
//         }
//     };
//     let childNode = children;
//     if (editable) {
//         childNode = editing ? (
//             <Form.Item
//                 style={{
//                     margin: 0,
//                 }}
//                 name={dataIndex}
//                 rules={[
//                     {
//                         required: true,
//                         message: `${title} is required.`,
//                     },
//                 ]}
//             >
//                 <Input ref={inputRef} onPressEnter={save} onBlur={save} />
//             </Form.Item>
//         ) : (
//             <div
//                 className="editable-cell-value-wrap"
//                 style={{
//                     paddingRight: 24,
//                 }}
//                 onClick={toggleEdit}
//             >
//                 {children}
//             </div>
//         );
//     }
//     return <td {...restProps}>{childNode}</td>;
// };
// const TableClients = () => {
//     const clientss=useSelector(state=>state.adminClients.allClients)

    
//     const data = clientss && clientss.map(c => {
//         return (
//             {
//                 key: c.sub,
//                 photo: c.photo,
//                 name: c.name,
//                 email: c.email,
//                 erased: c.erased,
//                 rol : c.rol
//             }
//         )
//     })
//     const token=window.localStorage.getItem("token")
//     const dispatch=useDispatch()
//     const [count, setCount] = useState(2);
//     const handleDelete = (key, erased) => {

//         notification.open({
//             message: 'ATENCIÓN',
//             description: erased?`Se ha restaurado el acceso al al usuario con el mail ${key}`:`Se ha bloqueado al usuario con el mail ${key}`,
//             placement:"top"
//           });
//         dispatch(banUser([key, token]))
//        console.log("baneando", key)
//     };
//     const defaultColumns = [
//         {
//             title: 'Foto',
//             dataIndex: 'photo',
//             width: '30%',
//             editable: true,
//         },
//         {
//             title: 'Nombre',
//             dataIndex: 'erased',
//         },
//         {
//             title: 'Email',
//             dataIndex: 'email',
//         },
//         {
//             title: 'Acciones',
//             dataIndex: 'acciones',
//             render: (_, record) =>
//                 (data.length >= 1) && record.erased ? 
//                     <Popconfirm title="¿Desea restaurar a este usuario?" onConfirm={() => handleDelete(record.key, record.erased)}>
//                     <Button type="primary">Restaurar</Button>
//                 </Popconfirm> : <Popconfirm title="¿Desea restringir a este usuario?" onConfirm={() => handleDelete(record.key)}>
//                 <Button danger >Restringir</Button>
//                     </Popconfirm>
//         },
//     ];

//     const handleSave = (row) => {
//         const newData = [...dataSource];
//         const index = newData.findIndex((item) => row.key === item.key);
//         const item = newData[index];
//         newData.splice(index, 1, {
//             ...item,
//             ...row,
//         });
//         setDataSource(newData);
//     };
//     const components = {
//         body: {
//             row: EditableRow,
//             cell: EditableCell,
//         },
//     };
//     const columns = defaultColumns.map((col) => {
//         if (!col.editable) {
//             return col;
//         }
//         return {
//             ...col,
//             onCell: (record) => ({
//                 record,
//                 editable: col.editable,
//                 dataIndex: col.dataIndex,
//                 title: col.title,
//                 handleSave,
//             }),
//         };
//     });

//     return (
//         <div>
          
//             <Table
//                 components={components}
//                 rowClassName={() => 'editable-row'}
//                 bordered
//                 dataSource={data}
//                 columns={columns}
//                 style={{marginTop:'8vh'}}
//             />
//         </div>
//     );
// };

// export default TableClients;
