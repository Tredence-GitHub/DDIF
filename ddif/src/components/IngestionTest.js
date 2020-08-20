import React, { Component, useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import Setup from './configure_ingestion/Setup';
import Axios from 'axios';

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom";

import {
  Drawer, List, ListItem,
  ListItemIcon, ListItemText,
  Container, Typography,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  drawerPaper: { width: 'inherit' },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}))

function Ingestion() {
  const classes = useStyles();

  const [tableData, settableData] = useState({})
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(true)
  let local = 'http://localhost:4000'

  function getInfo() {
    Promise.all(
        [Axios.get(`${local}/ingestion/getRecords`), 
        ]).then((res)=>{
            return [res]
        })  
      .then((response)=>{
        console.log(response)
        // console.log("RESPONSE -- ", response[0][1].status)
        if(response[0][0].status === 200){
            settableData(response[0][1].data.data);
            seterror(false);
            setloading(false);
            console.log('CAME !!!!!  ', response.length)
        }else{
            console.log(response)
            seterror(true);
        }

    }).catch((err)=>{
        seterror(true)
    })
}

useEffect(() => {
    getInfo();
}, [])



  return (
    <Router>
      <div >
        <Drawer
          style={{ width: '150px' }}
          variant="persistent"
          anchor="right"
          open={true}
          classes={{ paper: classes.drawerPaper }}
        >
          <List>
            <Link to="/ingestion/setup" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Setup"} />
              </ListItem>
            </Link>
            <Link to="/ingestion/metadata" className={classes.link}>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={"Metadata Discovery"} />
              </ListItem>
            </Link>
          </List>
        </Drawer>
        <Switch>
          <Route exact path="/ingestion/setup">
            <Container>
                <Setup/>
            </Container>
          </Route>
          <Route exact path="/ingestion/metadata">
            <Container>
            <Setup/>
            </Container>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Ingestion;