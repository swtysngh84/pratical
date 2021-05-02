import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector   } from 'react-redux'
import {Spin} from 'antd'

import Table  from '../../component/tabel';


import { getTopPostsLike } from '../../action'

const LikedPostList =(props) => {
    const [isLoading,setLoading]=useState(true)
    const dispatch = useDispatch();
    const { post } = useSelector(state=>state.author)

    useEffect(() => {
        dispatch(getTopPostsLike()).then(()=>{
            setLoading(false)
        })
    }, [dispatch])

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },{
            title: "Publish Date",
            dataIndex: "published",
            key: "published",
        },{
        title:'Like',
            dataIndex: "likes",
            key: "likes",
        }
    ];
    return (
        <div className='author-wrapper'>
            {
                isLoading ? <Spin size="large" /> :
                    <Table dataSource={post} columns={columns}  title='Top 10 Liked Post'/>
            }

        </div>
    );
}

export default LikedPostList;
