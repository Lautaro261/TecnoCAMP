import {Pagination} from 'antd';

const onShowSizeChange = (current, pageSize)=>{

    console.log(current,pageSize);
}

const PaginationVip = ()=>{

    <Pagination
    showSizeChange 
    onShowSizeChange={onShowSizeChange}
    defaultCurrent={3}
    total={500}
    />
    
}

export default PaginationVip;