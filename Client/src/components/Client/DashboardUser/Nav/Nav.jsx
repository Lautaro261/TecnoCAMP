import { ProfileFilled, HomeOutlined, DatabaseFilled , TagsOutlined, LoadingOutlined, ShopOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getItems, clearProductsByCategory } from '../../../../Redux/Features/productsClient/productsClientSlice';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.productsClient.allCategories);
 // const [current, setCurrent] = useState('Inicio');


  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  if (allCategories.length === 0) {
    return <LoadingOutlined style={{ color: 'white', fontSize: '24px' }} />;
  }

  const childrenSource = allCategories && allCategories.map(c => {  //childrenSource = [{label key}, { } ]
    return {
      label: c.name,
      key: c.name,
      icon: <TagsOutlined style={{ fontSize: '18px' }}/>,
      id: c.id
    };
  });


  const items = [
    {
      label: 'Inicio',
      key: 'home',
      icon: <HomeOutlined style={{ fontSize: '22px' }}/>,
    },
    {
      label: 'Todos los productos',
      key: 'all-categories',
      icon: <ShopOutlined style={{ fontSize: '22px' }}/>,
    },
    {
      label: 'Categorias',
      key: 'categories',
      icon: <DatabaseFilled style={{ fontSize: '20px' }}/>,
      children:[ {
        type: 'group',
        label: '',
        children: childrenSource, 
      }]
    }
  ];  

  const onClick = (e)=>{  
    dispatch(clearProductsByCategory())

    if(e.key === 'home'|| e.key === 'all-categories'){
      window.localStorage.removeItem('category_id');
      window.localStorage.removeItem('category_name');
      navigate(`/${e.key}`)
    }else{
      //console.log('FOR!!!',items);
       for (let index = 2; index < items.length; index++) {

        let chil = items[index].children[0].children;
        //console.log(index, chil);
        for (let x = 0; x < chil.length; x++) {
          if (e.key === chil[x].label) {
            let id = chil[x].id;
            let name = chil[x].label; 
            //console.log('Encontré el id', chil[x].id);
            //console.log("Es el let id", id)
            window.localStorage.setItem('category_id', id)
            window.localStorage.setItem('category_name', name)
            break; // Salir del bucle interno si se encuentra una coincidencia
          }
        }
      } 

      //console.log('ID ',items[2].children[0].children);
      navigate(`/categories/${e.key}`);
    }
  };

  return (
    <Menu onClick={onClick} /* selectedKeys={[current]} */ mode="horizontal" items={ items } style={{ flex: 1, justifyContent: 'center', paddingLeft: '20px', paddingRight: '20px'}}/>
  );
};

export default Nav;


 

