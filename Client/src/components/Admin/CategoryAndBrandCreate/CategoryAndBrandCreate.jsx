import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Tag, Row, Col, Button, Typography, Popconfirm, Modal, Input } from 'antd';
import { getAllCategories, deleteCategory, updateCategory, createCategory } from "../../../Redux/Features/admin/categories/adminCategoriesSlice";
import { getAllBrands, deleteBrand, updateBrand, createBrand } from "../../../Redux/Features/admin/brands/adminBrandsSlice";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;


const CategoryAndBrandCreate = () => {

    const dispatch = useDispatch();
    const allCategories = useSelector(state => state.adminCategories.allCategories)
    const allBrands = useSelector(state => state.adminBrands.allBrands)
    const token = window.localStorage.getItem('token')
    const categoryResponse = useSelector(state => state.adminCategories.updateResponseCat)
    const [editCategoryData, setEditCategoryData] = useState({
        visible: false,
        name:'',
        id:null,
    })
    const [editBrandData, setEditBrandData] = useState({
        visible: false,
        name:'',
        id:null,
    })

    const [createCategoryData, setCreateCategoryData] = useState({
        visible: false,
        name:'',
    })
    const [createBrandData, setCreateBrandData] = useState({
        visible: false,
        name:'',
    })

    // useEffect(()=> {
    //     if(categoryResponse.message )
    // },[])


    useEffect(() => {
        dispatch(getAllCategories(token))
        dispatch(getAllBrands(token))
    }, [])

    const handleCreateCategory = () => {
        const values = { name: createCategoryData.name };
        dispatch(createCategory({ token, values }));
        setCreateCategoryData({ visible: false, name: '' });
    }

    const handleCreateBrand = () => {
        const values = { name: createBrandData.name };
        dispatch(createBrand({ token, values }));
        setCreateBrandData({ visible: false, name: '' });
    }

    const dataCategory = allCategories.map(category => {
        return (
            {
                key: category.id,
                category: category.name,
                is_available: category.is_available
            }
        )
    })


    const dataBrand = allBrands.map(brand => {
        return ({
            key: brand.id,
            brand: brand.name,
            is_available: brand.is_available,
        })
    })

    const renderCategoryTags = (_, record) => (
        <Tag color="magenta" key={record.category}>
            {record.category}
        </Tag>
    );


    const renderBrandTags = (_, record) => (
        <Tag color="purple" key={record.brand}>
            {record.brand}
        </Tag>
    );

    const handleSubmitCategory = () => {
        const values = { id: editCategoryData.id, name: editCategoryData.name};
        dispatch(updateCategory({token, values}));
        setEditCategoryData({visible:false, id:null, name:''})
    }

    const handleSubmitBrand = () => {
        const values = { id: editBrandData.id, name: editBrandData.name};
        dispatch(updateBrand({token, values}));
        setEditBrandData({visible:false, id:null, name:''})
    }


    const columnsCategory = [
        {
            title: 'Categorías',
            dataIndex: 'category',
            key: 'category',
            align: 'center',
            render: renderCategoryTags,

        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={()=>{
                        setEditCategoryData({
                            visible: true,
                            name: record.category,
                            id: record.key
                        })
                    }}/>

                    <Popconfirm
                        title='¿Estas seguro de eliminar esta categoría?'
                        onConfirm={() => dispatch(deleteCategory({ token, id: record.key }))}
                        onText='Sí'
                        cancelText='No'
                    >
                        <Button icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const columnsBrand = [
        {
            title: 'Marca',
            key: 'brand',
            dataIndex: 'brand',
            align: 'center',
            render: renderBrandTags
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={()=>{
                        setEditBrandData({
                            visible: true,
                            name: record.brand,
                            id: record.key
                        })
                    }} />
                    <Popconfirm
                        title='¿Estas seguro de eliminar esta marca?'
                        onConfirm={() => dispatch(deleteBrand({ token, id: record.key }))}
                        onText='Sí'
                        cancelText='No'
                    >
                        <Button icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Row>
                <Col span={24}> <Title level={3}>Gestionar categorías y marcas.</Title></Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Button block  onClick={() => setCreateCategoryData({ visible: true, name: '' })}>Crear nueva categoría</Button>
                    <Table columns={columnsCategory} dataSource={dataCategory} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Button block onClick={() => setCreateBrandData({ visible: true, name: '' })}>Crear nueva marca</Button>
                    <Table columns={columnsBrand} dataSource={dataBrand} />
                </Col>
            </Row>

            <Modal
                title='Editar categoría'
                open={editCategoryData.visible}
                onCancel={() => setEditCategoryData({...editCategoryData, visible:false})}
                footer={null}>
                <Input 
                value={editCategoryData.name}
                onChange={(e)=> setEditCategoryData({...editCategoryData, name: e.target.value})}
                />

                <Button type="primary" onClick={handleSubmitCategory}>Enviar</Button>

            </Modal>


            <Modal
                title='Editar marca'
                open={editBrandData.visible}
                onCancel={() => setEditBrandData({...editBrandData, visible: false})}
                footer={null}>
                        <Input 
                        value={editBrandData.name}
                        onChange={(e)=> setEditBrandData({...editBrandData, name: e.target.value})}
                        />
                    <Button type="primary" onClick={handleSubmitBrand}>Enviar</Button>
            </Modal>

            <Modal
                title="Crear nueva categoría"
                open={createCategoryData.visible}
                onCancel={() => setCreateCategoryData({ visible: false, name: '' })}
                footer={[
                    <Button key="cancel" onClick={() => setCreateCategoryData({ visible: false, name: '' })}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={handleCreateCategory}>
                        Crear
                    </Button>,
                ]}
            >
                <Input
                    placeholder="Escriba el nombre de la nueva categoría"
                    value={createCategoryData.name}
                    onChange={e => setCreateCategoryData({ ...createCategoryData, name: e.target.value })}
                />
            </Modal>

            <Modal
                title="Crear nueva marca"
                open={createBrandData.visible}
                onCancel={() => setCreateBrandData({ visible: false, name: '' })}
                footer={[
                    <Button key="cancel" onClick={() => setCreateBrandData({ visible: false, name: '' })}>
                        Cancelar
                    </Button>,
                    <Button key="create" type="primary" onClick={handleCreateBrand}>
                        Crear
                    </Button>,
                ]}
            >
                <Input
                    placeholder="Escriba el nombre de la nueva marca"
                    value={createBrandData.name}
                    onChange={e => setCreateBrandData({ ...createBrandData, name: e.target.value })}
                />
            </Modal>
        </>
    )
}

export default CategoryAndBrandCreate;

