import React, {useEffect, useState} from 'react'
import {Spin, Row, Col} from "antd";
import {useDispatch, useSelector} from "react-redux";

import Table  from '../../../component/tabel';
import NavRoute from "../../../component/NavBar/navRoute";

import {getPostDetails, getPostsComment} from "../../../action";


import './post.css'

const PostDetails =(props) => {
    const [isLoading,setLoading]=useState(true)
    const [page, setPage] = useState(1)
    const [totalCount, setCount] = useState()
    const dispatch = useDispatch();
    const { selectedPost } = useSelector(state=>state.author)

    const handleTableChange = (props) =>{
      setPage(props)
    }

    useEffect(() => {
        if( !Object.keys(selectedPost).length){
            dispatch(getPostDetails(props.match.params.postId))
            dispatch(getPostsComment(props.match.params.postId,page)).then((response)=>{
                setCount(response.count)
                setLoading(false)
            })
        }else {
            dispatch(getPostsComment(selectedPost.id)).then(()=> {
                setLoading(false)
            })
        }

    }, [dispatch,page,props])


    const columns = [
        {
            title: 'Commented Text',
            dataIndex: 'body',
            key: 'body',
            render: (body,record) => {
                return <NavRoute url={`/author/${props.match.params.authorId}`} text={body}/>
            },
        }
    ];
    return (
        <div className='post-details-wrapper'>
            {
                isLoading ? <Spin size="large" /> :
                    <div>
                        <div className='post-details'>
                            <Row gutter={16}>
                                <Col span={6} className='text-bold'>Title :</Col>
                                <Col span={6} >{selectedPost.title}</Col>
                                <Col span={6} className='text-bold'>Published Date: </Col>
                                <Col span={6}>{selectedPost.publishedDate}</Col>
                            </Row>
                        </div>
                        <Table
                            dataSource={selectedPost.comments} columns={columns}
                            title={`${selectedPost.title} comments` }
                            onChange={handleTableChange}
                            pagination={{
                                total: totalCount, // total count returned from backend
                                defaultCurrent:1,
                                current:page
                            }}
                        />
                    </div>
            }
        </div>
    );
}

export default PostDetails;
