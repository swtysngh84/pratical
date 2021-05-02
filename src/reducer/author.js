import {GET_AUTHORS, GET_SELECTED_AUTHOR, GET_AUTHORS_POSTS, GET_SELECTED_POST, GET_POSTS_COMMENTS, GET_TOP_LIKED_POST } from '../type'

const INITIAL_STATE={
    authorList:[],
    selectedAuthor:{},
    selectedPost:{}
}

export default (state=INITIAL_STATE,actions)=>{
    switch (actions.type) {
        case GET_AUTHORS:{
            return {
                ...state,
                authorList: actions.payload,
            }
        }
        case GET_SELECTED_AUTHOR:{
            return {
                ...state,
                selectedAuthor:{
                    ...actions.payload
                }
            }
        }
        case GET_AUTHORS_POSTS:{
            return {
                ...state,
                selectedAuthor:{
                    ...state.selectedAuthor,
                    post: actions.payload
                }
            }
        }
        case GET_SELECTED_POST : return {
            ...state,
            selectedPost:{
                ...actions.payload
            }
        }
        case GET_POSTS_COMMENTS: return {
            ...state,
            selectedPost: {
                ...state.selectedPost,
                comments:actions.payload
            }
        }
        case GET_TOP_LIKED_POST : return {
            ...state,
            post:actions.payload
        }
        default: return state
    }
}