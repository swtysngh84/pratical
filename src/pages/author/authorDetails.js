import React, {useEffect, useState} from 'react'
import {Spin, Row, Col} from "antd";

import Table  from '../../component/tabel';
import NavRoute from "../../component/NavBar/navRoute";

import {useDispatch, useSelector} from "react-redux";
import {getAuthorDetails, getAuthorsPost, getPostDetails} from "../../action";


import './author.css'

const AuthorDetails =(props) => {
    const [isLoading,setLoading]=useState(true)
    const dispatch = useDispatch();
    const { selectedAuthor } = useSelector(state=>state.author)

    useEffect(() => {
        if( !Object.keys(selectedAuthor).length){
            dispatch(getAuthorDetails(props.match.params.authorId))
                dispatch(getAuthorsPost(props.match.params.authorId)).then(()=>{
                setLoading(false)
            })
        }else {
            dispatch(getAuthorsPost(selectedAuthor.id)).then(()=> {
                setLoading(false)
            })
        }

    }, [dispatch,props])
    const onClick = (record) =>{
        dispatch(getPostDetails(record))
    }

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (name,record) => {
                return<div onClick={()=> onClick(record)}>
                    <NavRoute url={`/author/${selectedAuthor.id}/post/${record.id}`} text={name}/>
                </div>
            },
        },{
            title: "Publish Date",
            dataIndex: "publishedDate",
            key: "publishedDate",
            sorter: (a, b) => new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime()
        }
    ];
    return (
        <div className='author-details-wrapper'>
            {
                isLoading ? <Spin size="large" /> :
                    <div>
                        <div className='author-details'>
                        <Row gutter={16}>
                            <Col span={6} className='text-bold'>Author name :</Col>
                            <Col span={6} >{selectedAuthor.name}</Col>
                            <Col span={6} className='text-bold'>Email: </Col>
                            <Col span={6}>{selectedAuthor.email}</Col>
                        </Row>
                        </div>
                    <Table dataSource={selectedAuthor.post} columns={columns}  title={`${selectedAuthor.name} Post` }/>
                    </div>
            }
        </div>
    );
}

export default AuthorDetails;
