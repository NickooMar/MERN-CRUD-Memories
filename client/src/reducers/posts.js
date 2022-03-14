export default (posts = [], action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload; //action.payload es el post en si como definimos en actions (folder) 
        case 'CREATE':
            return [...posts, action.payload]; //Action.payload contiene los datos del newPost
        case 'UPDATE':
        case 'LIKE': 
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            //si el id del post es igual que el id que vamos a editar entonces retornamos action.payload y sino devolvemos el post
        case 'DELETE':
            return posts.filter((post) => post._id !== action.payload); 
        default:
            return posts;
    }
}

//Reducer es una funcion que acepta un estado (posts) y a su vez acepta un estado