import React, { Component, useState, useEffect } from 'react'
import ReactDom from 'react-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
        backgroundColor: '#f5f5f578'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 300,
    },

}));

export default function IngestionTable(){
    const classes = useStyles();
    const [tableData, settableData] = useState({})
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    
    let local = 'http://localhost:4000'
 
    function scheduleNow(){

    }

    function getInfo() {
        Promise.all(
            [Axios.post(`${local}/ingestion/getRecords`), 
            ]).then((res)=>{
                return [res]
            })  
          .then((response)=>{
            console.log(response)
            console.log(response[0][0].data)
            // console.log("RESPONSE -- ", response[0][1].status)
            if(response[0][0].status === 200 ){
                settableData(response[0][0].data.data);
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

    
if(!loading){
    return(
        <div>
        <div>
        <Paper className={classes.paper}>
                        <strong>Job Log</strong>
                        <hr/>
                        <TableContainer component={Paper} style={{maxHeight:"400px"}}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Entry ID</b></TableCell>
                                        <TableCell><b>Job ID</b></TableCell>
                                        <TableCell><b>Project Name</b></TableCell>
                                        <TableCell><b>Status</b></TableCell>
                                        <TableCell><b>Schedule Type</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {tableData.map((row) => (
                                        <TableRow key={row.entryId} onClick={(e)=>{
                                            window.location.href='/ingestion/'+row.entryId
                                        }}>
                                            <TableCell component="th" scope="row">
                                                {row.entryId}
                                            </TableCell>
                                            <TableCell >{row.jobname}</TableCell>
                                            <TableCell >{row.projectname}</TableCell>
                                            <TableCell >{row.status}</TableCell>
                                            {row.Schedule.schedule_type==="On-Demand"?
                                                <TableCell >
                                                    <Button variant="contained" color='primary'> 
                                                        {row.Schedule.schedule_type}
                                                    </Button>
                                                </TableCell>:
                                                <TableCell >{row.Schedule.schedule_type}</TableCell> }
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
        </div>

        <div style={{marginTop:" 20px"}}>
            <Grid container>
        <Grid direction="column" container justify="flex-end" alignItems="flex-end">
            <Button variant="contained" color='primary' onClick = {(e)=>{
                e.preventDefault();
                // window.location.href = "/ingestion/setup";
                window.location.href = "/ingestion";
            }}>Create Ingestion </Button>
        </Grid>
        </Grid>
        </div>
        </div>
    )
}

else{
    return(<div>
      <LinearProgress />
    </div>)
}
}


//https://levelup.gitconnected.com/react-material-table-crud-operations-with-restful-api-data-ca1af738d3c5