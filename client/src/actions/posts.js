import * as api from '../api';

//Action Creators (Funciones que retornan acciones)

export const getPosts = () => async (dispatch) => { //Con redux thunk podemos usar logica asincrona 
    try {
        const { data } = await api.fetchPosts() //Obtenemos la respuesta de la api, la respuesta contiene data que en sí seria el post 
        
        dispatch({type: 'FETCH_ALL', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post) => async(dispath) => {
    try {
        const { data } = await api.createPost(post);

        dispath({type: 'CREATE', payload: data});
    } catch (error) {
        console.log(error)
    }
};

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error)
    }
} 

export const deletePost = (id) => async(dispath) => {
    try {
        await api.deletePost(id);

        dispath({type:'DELETE', payload: id})        
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);

        dispatch({ type: 'LIKE', payload: data})
    } catch (error) {
        console.log(error)
    }
}