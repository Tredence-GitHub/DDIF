import React, { Component, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


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
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true);
    const [dataTable, setDataTable] = useState({});
  
    const [columns, setColumns] = useState([
      { title: 'Column Number', field: 'Column Number' },
      { title: 'Column Name', field: 'Column Name', initialEditValue: 'initial edit value' },
      { title: 'Data Type', field: 'Data Type'},
      // { title: 'Primary Key', field: 'primarykey'},
      {
        title: 'Primary Key',
        field: 'primarykey',
        lookup: { 1: 'Yes', 0: 'No' },
      },
      {
        title: 'Nullable',
        field: 'nullable',
        lookup: { 1: 'Yes', 0: 'No' },
      },
      {
        title: 'DQ Check',
        field: 'dqcheck',
        lookup: { 1: 'Yes', 0: 'No' },
      },
      
      // { title: 'Nullable', field: 'nullable'},
      // { title: 'DQ Check ', field: 'dqcheck'},
      { title: 'Default', field: 'default'},
      { title: 'Date Format', field: 'dateformat'},
      { title: 'Description', field: 'Description'},
      { title: 'PII', field: 'PII'},
      { title: 'PII Type', field: 'PII Type'},
    ]);
  
    // const [data, setData] = useState([
    //   { colnum: 1, colname: 'Region', datatype: 'string', primarykey: 0,nullable:1, dqcheck:0,default:"",dateformat:"",description:"Region",pii:'No',piitype:"None"},
    //   { colnum: 2, colname: 'Country', datatype: 'string', primarykey: 0,nullable:1, dqcheck:0,default:"",dateformat:"",description:"Country",pii:'No',piitype:"None"},
    // ]);

    const entryid = {
      entryId : 1
    }

    let local = 'http://localhost:4000';

    function getInfo() {
    let resp = Axios.post(`${local}/ingestion/api/getMetadata`,

        ).then((response) => {
            console.log(response.data.data);
            if (response.status === 200) {
               console.log(JSON.parse(JSON.stringify(response.data.data)),"AAA");
               
             let datax = JSON.parse(response.data.data);
            console.log(datax,"**");
            console.log(typeof(datax),"**");
            const arr=[]
             
             datax.index.map((item,index)=>{
                datax.data.map((item,index)=>{
                // console.log(item)
                arr.push({
                  'Column Number':item[0],"Column Name":item[1],"Data Type":item[2],"Description":item[3],"PII":item[4],"PII Type":item[5],primarykey: 0,nullable:1, dqcheck:0,default:"",dateformat:""
              },)
              console.log(arr)
             
           })   
           })   
           setDataTable(arr);
           setloading(false);
            }
            else if (response.status === 400) {
                // handleOpen()
                // setMsg('failed!')
                // // alert('You are not registered with us! Please register!')
                // // return window.location.href = "/";
                // enqueueSnackbar("Failed", {
                //     variant: 'warning',
                // })
            }

        }).catch((err) => {
            console.log(err);
        });
      }



      // function getRes(){
      //   let result = '{"columns":["Column Number","Column Name","Data Type","Description","PII","PII Type"],"index":[0,1,2,3,4,5,6],"data":[[1,"SK","int","SK","No","None"],[2,"sofifa_id","int","Sofifa Id","No","None"],[3,"dob","datetime","Date Of Birth","No","None"],[4,"nationality","string","Nationality","No","None"],[5,"overall","float","Overall","No","None"],[6,"team_position","string","Team Position","No","None"],[7,"Year","int","Year","No","None"]]}';
      //        let datax = JSON.parse((result));
      //        console.log(typeof(datax));

      //        datax.index.map((item,index)=>{
      //           const arr1=[]
      //             datax.data.map((item,index)=>{
      //             console.log(item)
      //             const arr=[]
      //             arr.push({
      //               'Column Number':item[0],"Column Name":item[1],"Data Type":item[2],"Description":item[3],"PII":item[4],"PII Type":item[5]
      //           },)
      //          arr1.push(arr[0]);
      //         // console.log(arr1,"((((")
      //         setDataTable(arr1); 
      //        })   
      //        })  
      // };
        useEffect(() => {
          getInfo();
      }, [])

    // console.log(dataTable,"**")

  if(!loading){
    return (
      <div>
      <MaterialTable
        title="Metadata Discovery"
        columns={columns}
        data={dataTable}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setDataTable([...dataTable, newData]);
                
                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...dataTable];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setDataTable([...dataUpdate]);
  
                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...dataTable];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setDataTable([...dataDelete]);
                
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
                      // window.location.href = "/ingestion/setup";
                  }}>Back</Button>
                </Grid>
                <Grid item xs={6} direction="column" container justify="flex-end" alignItems="flex-end">
                    <Button variant="contained" color='primary'  onClick = {(e)=>{
                      e.preventDefault();
                      // window.location.href = "/ingestion/customrules";
                  }}>Next</Button>
                </Grid>
                </Grid>
        </div>
        </div>
    )
  }
  else{
    return(<div className={classes.progress} style={{marginLeft:"550px"}}>
        <CircularProgress />
      </div>)
}
}
