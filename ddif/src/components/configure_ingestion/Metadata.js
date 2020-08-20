import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


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

export default function Metadata() {
  const classes = useStyles();
    const { useState } = React;
  
    const [columns, setColumns] = useState([
      { title: 'Column Number', field: 'colnum' },
      { title: 'Column Name', field: 'colname', initialEditValue: 'initial edit value' },
      { title: 'Data Type', field: 'datatype'},
      { title: 'Primary Key', field: 'primarykey'},
      { title: 'Nullable', field: 'nullable'},
      { title: 'DQ Check ', field: 'dqcheck'},
      { title: 'Default', field: 'default'},
      { title: 'Date Format', field: 'dateformat'},
      { title: 'Description', field: 'description'},
      { title: 'PII', field: 'pii'},
      { title: 'PII Type', field: 'piitype'},
    //   {
    //     title: 'Birth Place',
    //     field: 'birthCity',
    //     lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
    //   },
    ]);
  
    const [data, setData] = useState([
      { colnum: 1, colname: 'Region', datatype: 'string', primarykey: 'No',nullable:'Yes', dqcheck:'No',default:"",dateformat:"",description:"Region",pii:'No',piitype:"None"},
      { colnum: 2, colname: 'Country', datatype: 'string', primarykey: 'No',nullable:'Yes', dqcheck:'No',default:"",dateformat:"",description:"Country",pii:'No',piitype:"None"},
    ]);
  
    return (
      <div>
      <MaterialTable
        title="Metadata Discovery"
        columns={columns}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                
                resolve()
              }, 1000)
            }),
        }}
      />

      <div className={classes.root} style={{marginTop:"20px"}}>
        <Grid container>
                <Grid item xs={6} direction="column" container justify="flex-start" alignItems="flex-start">
                    <Button variant="contained" color='primary'  onClick = {(e)=>{
                      e.preventDefault();
                      window.location.href = "/ingestion/setup";
                  }}>Back</Button>
                </Grid>
                <Grid item xs={6} direction="column" container justify="flex-end" alignItems="flex-end">
                    <Button variant="contained" color='primary'  onClick = {(e)=>{
                      e.preventDefault();
                      window.location.href = "/ingestion/customrules";
                  }}>Next</Button>
                </Grid>
                </Grid>
        </div>
        </div>
    )
  }