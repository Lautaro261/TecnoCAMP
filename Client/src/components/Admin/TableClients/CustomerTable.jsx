import React, { useRef, useState } from 'react';
import { Button, Input, Space, Table, Row, Col, Popconfirm, Empty, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { banUser } from '../../../Redux/Features/admin/clients/adminClientsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from 'antd';
 const {Title} = Typography;
const CustomerTable = () => {
    const dispatch = useDispatch();
    const token = window.localStorage.getItem('token');
    const clients = useSelector(state => state.adminClients.allClients)

    const dataClients = clients && clients.map(c => {
        return (
            {
                key: c.sub,
                photo: c.photo,
                name: c.name,
                email: c.email,
                erased: c.erased,
                rol: c.rol,
            }
        )
    })



    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };



    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };


    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const handleDelete = (key, erased) => {
        dispatch(banUser([key, token]))
        notification.open({
            message: 'ATENCIÓN',
            description: erased ? `Se ha restaurado el acceso al  usuario con el email ${key}` : `Se ha bloqueado al usuario con el mail ${key}`,
            placement: "top"
        });
        console.log("baneando", key)
    };

    const columns = [
        {
            title: 'Imagen',
            dataIndex: 'photo',
            key: 'photo',
            width: '20%',
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '30%',
            ...getColumnSearchProps('email'),
            sorter: (a, b) => a.email.length - b.email.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Acciones',
            dataIndex: 'acciones',
            key: 'acciones',
            render: (_, record) =>
                (dataClients.length >= 1) && record.erased ?
                    <Popconfirm title="¿Desea restaurar a este usuario?" onConfirm={() => handleDelete(record.key, record.erased)}>
                    <Button type="primary">Restaurar</Button>
                    </Popconfirm> : <Popconfirm title="¿Desea restringir a este usuario?" onConfirm={() => handleDelete(record.key)}>
                    <Button danger >Restringir</Button>
                    </Popconfirm>
        },
    ];
    return (
        <Row>
            <Col span={24}> <Title level={3}>Tabla de usuarios.</Title></Col>
            {
            !clients.length ?
            <Col span={24} style={{ marginTop: "2vh" }}>
            <Empty /> 
            </Col>
            :
            <Col span={24}>
                <Table columns={columns} dataSource={dataClients} style={{ marginTop: "2vh" }} />
            </Col>
            }
        </Row>
    );
};
export default CustomerTable;