import React, { useEffect, useState } from "react";
import { Grow, Grid, Container } from "@material-ui/core";
import { Posts, Form } from "../../components";

import { useDispatch } from "react-redux";
import { getPosts } from '../../actions/posts'


import useStyles from "./styles";

const Home = () => {

    const [currentId, setCurrentId] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getPosts())
  }, [currentId ,dispatch]) //Apenas se haga un cambio en el id entonces se llamara a la funcion de getpost 
  //y devolvera el post ya editado

    return (
        <Grow in>
        <Container>
          <Grid className={classes.mainContainer} container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home
