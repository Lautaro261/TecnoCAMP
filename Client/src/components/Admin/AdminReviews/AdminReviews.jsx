import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReviews } from '../../../Redux/Features/reviews/adminReviewsSlice'; 

const AdminReviews = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const allReviews = useSelector(state => state.adminReviews.allReviews);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        dispatch(getAllReviews(token));
    }, []);

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
        filterDropdown: ({
            setSelectedKeys, 
            selectedKeys, 
            confirm, 
            clearFilters, 
            close 
        }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation() }>
                <Input
                    ref={ searchInput } 
                    placeholder={ `Search ${ dataIndex }`} 
                    value={ selectedKeys[0] } 
                    onChange={ (e) => setSelectedKeys(e.target.value ? [e.target.value] : []) }
                    onPressEnter={ () => handleSearch(selectedKeys, confirm, dataIndex) }
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type='primary' 
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex) } 
                        icon={ <SearchOutlined /> }
                        size='small'
                        style={{ inlineSize: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={ () => clearFilters && handleReset(clearFilters) }
                        size='small' 
                        style={{ inlineSize: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type='link' 
                        size='small' 
                        onClick={ () => {
                            confirm({
                                closeDropdown: false
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        } }
                    >
                        Filter
                    </Button>
                    <Button
                        type='link' 
                        size='small' 
                        onClick={ () => {
                            close();
                        } }
                    >
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? '#1677ff' : undefined }}
            />
        ),
        onFilter: (value, record) => 
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()), 
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) => searchedColumn === dataIndex ? (
            <Highlighter
                highlightStyle = {{ padding: 0, backgroundColor: '#ffc069' }} 
                searchWords = { [searchText] }
                autoEscape 
                textToHighlight={ text ? text.toString() : '' }
            />
        ) : (text)
    });

    const data = allReviews.length > 0 ? allReviews.map(review => {
        return {
            key: review.id, 
            name: review.product.name, 
            photo: review.product.photo && review.product.photo[0], 
            userSub: review.userSub, 
            rating: review.rating, 
            comment: review.comment
        };
    }) : 0

    console.log(allReviews);

    const columns = [
        {
            key: 'key', 
            title: 'Foto', 
            dataIndex: 'photo', 
            render: (photo) => (
                <img 
                    src={ photo }
                    alt={ photo } 
                    style={{ maxBlockSize: '10vh', inlineSize: '5vw', borderRadius: '10%' }}
                />
            )
        },
        {
            key: 'key', 
            title: 'Producto',
            dataIndex: 'name', 
            sorter: (a, b) => a.name.localeCompare(b.name),
            ...getColumnSearchProps('name')
        },
        {
            key: 'key', 
            title: 'Cliente', 
            dataIndex: 'userSub', 
            sorter: (a, b) => a.userSub.localeCompare(b.userSub), 
            ...getColumnSearchProps('userSub')
        }, 
        {
            key: 'key', 
            title: 'Puntuación',
            dataIndex: 'rating', 
            filters: [
                { text: 'Excelente', value: 5 },
                { text: 'Bueno', value: 4 }, 
                { text: 'Regular', value: 3 }, 
                { text: 'Malo', value: 2 }, 
                { text: 'Pésimo', value: 1 }
            ],
            onFilter: (value, record) => record.rating === value
            
        },
        {
            key: 'key', 
            title: 'Comentario',
            dataIndex: 'comment'
        }
    ];

    return (
        <Table 
            dataSource={ data } 
            columns={ columns } 
            pagination={{ pageSize: 5 }}
            style={{ marginBlockStart: '8vh' }} 
        />
    );
};

export default AdminReviews;