import {GET_AUTHORS,GET_SELECTED_AUTHOR, GET_AUTHORS_POSTS, GET_SELECTED_POST, GET_POSTS_COMMENTS,GET_TOP_LIKED_POST} from '../type'

import axios from "../services/baseUrl";

// export const getAuthorList = (params)=>{
//     return  (dispatch,getState)=>{
//         try{
//             const res = await axios.get('/author')
//             console.log(res)
//             dispatch({
//                 type:GET_AUTHORS,
//                 payload:params
//             })
//         }catch (error){
//
//         }
//
//     }
// }

export const getAuthorList = () => async (dispatch) => {
    try {
        const res = await axios.get('/author')
        dispatch({
            type: GET_AUTHORS,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const getAuthorDetails = (record) => async (dispatch) => {
    try {
        if(typeof record === "object"){
            dispatch({
                type: GET_SELECTED_AUTHOR,
                payload: record,
            });
            return Promise.resolve(record);
        }else{
            const res = await axios.get(`/author/${record}`)
            dispatch({
                type: GET_SELECTED_AUTHOR,
                payload: res.data,
            });
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
};

export const getAuthorsPost = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/author/${id}/posts`)
            dispatch({
                type: GET_AUTHORS_POSTS,
                payload: res.data,
            });
            return Promise.resolve(res.data);

    } catch (err) {
        return Promise.reject(err);
    }
};

export const getPostDetails = (record) => async (dispatch) => {
    try {
        if(typeof record === "object"){
            dispatch({
                type: GET_SELECTED_POST,
                payload: record,
            });
            return Promise.resolve(record);
        }else{
            const res = await axios.get(`/posts/${record}`)
            dispatch({
                type: GET_SELECTED_POST,
                payload: res.data,
            });
            return Promise.resolve(res.data);
        }

    } catch (err) {
        return Promise.reject(err);
    }
};

export const getPostsComment = (id,page) => async (dispatch) => {
    try {
        const res = await axios.get(`/posts/${id}/comments?_page=${page}&_limit=10`)
        console.log(res)
        dispatch({
            type: GET_POSTS_COMMENTS,
            payload: res.data,
        });
        return Promise.resolve({count:res.headers['x-total-count']});

    } catch (err) {
        return Promise.reject(err);
    }
};

export const getTopPostsLike = () => async (dispatch) => {
    try {
        const res = await axios.get(`/posts?_embed=likes`)
        const data = res.data
        const liked = data.map((post)=> ({id:post.id, title: post.title, published: post.publishedDate, likes :post.likes ? post.likes[0]?.like:0}))
        dispatch({
            type: GET_TOP_LIKED_POST,
            payload: liked.sort((a, b) => b.likes - a.likes).slice(0, 10),
        });
        return Promise.resolve(res.data);

    } catch (err) {
        return Promise.reject(err);
    }
};