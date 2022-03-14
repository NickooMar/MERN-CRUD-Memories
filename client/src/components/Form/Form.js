import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId , setCurrentId }) => {
  const [postData, setPostData] = useState({title:'', message:'', tags:'', selectedFile:'' })
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId): null)
  //Si tenemos un id entonces lo buscamos por el que tenga la misma id que el currentId
  const classes = useStyles();
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    if(post) setPostData(post);
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(currentId){  //Si tenemos el id del post entonces NO vamos a crear uno
      dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
    } else {
      dispatch(createPost({...postData, name: user?.result?.name }))
    }
    clear()
  };

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center"> Please sign in to create your own memories </Typography>
      </Paper>
    )
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({ title:'', message:'', tags:'', selectedFile:'' })
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>

        <TextField name="title" variant="outlined" label="Title" fullWidth  value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})}
        //El problema de poner creator: es que en otros textsFields se va a sobreescribir todo y
        // quedara unicamente el valor del creator por eso se especifica el ...postData y luego se cambia el valor que se supone que se va a alterar en el textField
        //El valor se va a almacenar en el estado, especificamente el llamado postData.creator
        /> 
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>

        <div className={classes.fileInput}>
            <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper> 
  );
};

export default Form;