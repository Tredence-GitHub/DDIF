import React, { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({

  root: {

    '& .MuiTextField-root': {

      margin: theme.spacing(2),

      width: '30ch',

    },

  },

  paper: {

    padding: theme.spacing(2),

    textAlign: 'center',

    color: theme.palette.text.secondary,

  },

  buttonRoot: {

    '& > *': {

      margin: theme.spacing(1),

    },

  },

}));


export default function Metadata(props) {
  const classes = useStyles();
  const { useState } = React;
  const [error, seterror] = useState(false)
  const [loading, setloading] = useState(true);
  const [dataTable, setDataTable] = useState({});
  const [open, setOpen] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  const [columns, setColumns] = useState([

    { title: 'Column ID', field: 'column_id' },

    { title: 'Column Name', field: 'column_name', initialEditValue: 'initial edit value' },

    { title: 'Data Type', field: 'data_type' },

    {

      title: 'Primary Key',

      field: 'primary_key',

      lookup: { 'Yes': 'Yes', 'No': 'No' },

      default: 'No'

    },

    {

      title: 'Nullable',

      field: 'nullable',

      lookup: { 'Yes': 'Yes', 'No': 'No' },

      default: 'Yes'
    },

    {

      title: 'DQ Check',

      field: 'dqcheck',

      lookup: { 'Tier 1': 'Tier 1', 'Tier 2': 'Tier 2', 'Tier 3': 'Tier 3', 'NO': 'NO' },

    },



    { title: 'Default', field: 'default' },

    { title: 'Date Format', field: 'format', 
     lookup: { '%d-%m-%Y': '%d-%m-%Y', '%d-%b-%Y': '%d-%b-%Y' , '%Y-%b-%d': '%Y-%b-%d', '%Y-%m-%d': '%Y-%m-%d', '%d-%m-%y %H:%M:%S': '%d-%m-%y %H:%M:%S' }, },

    { title: 'Description', field: 'description' },

    { title: 'PII', field: 'pii' },

    { title: 'PII Type', field: 'pii_yype' },

  ]);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };



  // const entryid = {

  //   entryId: 1

  // }
  let local = 'http://localhost:4000';

  function getSavedMetadata(entryid) {
    Axios.get(`${local}/ingestion/getSavedMetadata/${entryid}`)
      .then((response) => {
        console.log('IN EDIT OF METADATA ', response.data.data);
        setDataTable(response.data.data);
        setloading(false);
      }).catch((err) => {
        console.log(err, "%%%");
      })
  }

  function updateMetadata() {
    setloading(true)
    let resp = Axios.post(`${local}/ingestion/saveMetadata`, {
      entryId: parseInt(props.entryid),
      metadata: dataTable
    }).then((response) => {
      if (response.status === 200) {
        // alert(response.data.message);
        handleOpen();
        setMsg(response.data.message)
        setloading(false)
        
      } else {
        handleOpen();
        setMsg('Something went wrong')
        // alert('Something went wrong');
      }

    }).catch((err) => {
      console.log(err, ' Saving metadata')
      handleOpen();
      setMsg('Something went wrong')
    })

  }




  function getInfo() {
    let entryid = props.entryid;
        handleOpen()
        setMsg("Resetting............ Please Wait")
        setloading(true)
    let resp = Axios.post(`${local}/ingestion/api/getMetadata`,{entryId : entryid})
      .then((response) => {
        console.log(response.data.data);
        
        if (response.status === 200) {
          console.log(JSON.parse(JSON.stringify(response.data.data)), "AAA");

          let datax = JSON.parse(response.data.data);
          console.log(datax, "**");
          console.log(typeof (datax), "**");

          const arr = []
          datax.data.map((item, index) => {

            // console.log(item) 

            arr.push({
              'column_id': item[0], "column_name": item[1], "data_type": item[2].trim(), "description": item[3], "pii": item[4], "pii_type": item[5], primary_key: 0, nullable: 1, dqcheck: 0, default: "", format: ""
            })

          })

          console.log(arr)

          Axios.post(`${local}/ingestion/saveMetadata`, {
            entryId: parseInt(props.entryid),
            metadata: arr

          }).then((response) => {

            if (response.status === 200) {
              // alert(response.data.message);
              handleOpen();
              setMsg(response.data.message)
              setDataTable(arr);
              seterror(false);
              setloading(false);

            } else {
              // alert('Something went wrong');
              handleOpen();
              setMsg('Something went wrong')
            }

          }).catch((err) => {
            console.log(err, ' Saving metadata')
          })
        }

        else if (response.status === 400) {
          handleOpen();
          setMsg('Something went wrong')
          // alert('Something went wrong');
        }

      }).catch((err) => {
        console.log(err);
        handleOpen()
        setMsg('Something is wrong')
        // alert("Something is wrong")
      });

  }


  useEffect(() => {

    if (props.entryid != "error" && props.editFn !== 'edit') {
      console.log(props.entryid)
      getInfo()
    }
    else if (props.editFn === 'edit') {
      getSavedMetadata(props.entryid)
    }

  }, [])





  if (!loading) {
    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={<span id="message-id">{msg}</span>}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        {console.log(dataTable, "*********")}

        <MaterialTable
          title="Metadata Discovery"
          key="column_id"
          columns={columns}
          data={dataTable}
          editable={{
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  const dataUpdate = [...dataTable];
                  const index = oldData.tableData.id;
                  newData.column_name = newData.column_name.trim().replace(' ', '_');
                  dataUpdate[index] = newData;
                  setDataTable([...dataUpdate]);
                  resolve();
                }, 1000)
              }),
          }}
        />

        <div className={classes.root} style={{ marginTop: "20px" }}>
          <Grid container>
            <Grid item  direction="row" container justify="flex-end" alignItems="flex-end">
              <Button variant="contained" color='primary' onClick={(e) => {
                e.preventDefault();
                updateMetadata();
                props.onPassMetadata(props.entryid, 'edit');
                // window.location.href = "/ingestion/setup"; 
              }}>Update & Next</Button>
            
              <Button variant="contained" color='primary' onClick={(e) => {
                e.preventDefault();
                getInfo();
              }}>Reset</Button>
              </Grid>
              {/* <Grid item xs={4} direction="column" container justify="flex-end" alignItems="flex-end">

              {/* <Button variant="contained" color='primary' onClick={(e) => {
                e.preventDefault();
                
              }}>Next</Button> */}
              {/* </Grid>  */}
          </Grid>
        </div>
      </div>
    )
  }

  else if (loading && error === false) {
    return (<div className={classes.progress} style={{ marginLeft: "550px" }}>
      <CircularProgress />
    </div>)
  }
  else {
    return (<div>
      Please fill the Setup details
    </div>)
  }
} 