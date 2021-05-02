import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector   } from 'react-redux'
import {Button, Spin} from 'antd'

import Table  from '../../component/tabel';
import NavRoute from "../../component/NavBar/navRoute";

import { getAuthorList, getAuthorDetails } from '../../action'

import './author.css'
import Drawer from "../../component/Drawer";

const AuthorList =(props) => {
     const [isLoading,setLoading]=useState(true)
    const dispatch = useDispatch();
    const { authorList } = useSelector(state=>state.author)

    useEffect(() => {
        dispatch(getAuthorList()).then(()=>{
            setLoading(false)
        })
    }, [dispatch])

    const onClick = (record) =>{
        dispatch(getAuthorDetails(record))
    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name,record) => {
                return <div onClick={()=> onClick(record)}>
                    <NavRoute url={`/author/${record.id}`} text={name}/>
                </div>
            },
        }
    ];
    return (
        <div className='author-wrapper'>
            <Drawer placement={'right'} className='drawer-wrapper'>
                <Button type="primary" onClick={()=>props.history.push('/posts')}>
                    Top 10 Liked Post
                </Button>
                <Button type="primary" onClick={()=>props.history.push('/posts')}>
                    Top 10 commented Post
                </Button>
            </Drawer>
            {
            isLoading ? <Spin size="large" /> :
             <Table dataSource={authorList} columns={columns}  title='Author'/>
        }

        </div>
    );
}

export default AuthorList;
