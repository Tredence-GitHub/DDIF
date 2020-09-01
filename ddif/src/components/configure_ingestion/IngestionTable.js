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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {useSnackbar} from 'notistack';


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
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const {enqueueSnackbar} = useSnackbar();
    
    let local = 'http://localhost:4000'
    
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    function scheduleNow(){

    }

    function triggerJob(btnId, entryId){
        handleOpen();
        setMsg('Job is triggered')
        let b = document.getElementById(btnId);
        console.log(b)
        b.setAttribute('hidden', 'true');
        Axios.get(`${local}/ingestion/api/triggerOnDemand/${entryId}`)
        .then((response)=>{
            if(response.data.message === 'success'){
                handleOpen();
                setMsg('Job is running ..')
                b.setAttribute('hidden', 'false')
                window.location.href='/ingestiontable';
            }else{
                handleOpen();
                setMsg('Job is running ..')
                b.setAttribute('hidden', 'false')
                window.location.href='/ingestiontable';
            }
        }).catch((err)=>{
            console.log(err);
            b.setAttribute('hidden', 'false')
            handleOpen();

            setMsg('Failed to execute the job!')
        })
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
        <div>
        <Paper className={classes.paper}>
                        <strong>Job Log</strong>
                        <hr/>
                        <TableContainer component={Paper} style={{maxHeight:"100%"}}>
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
                                        <TableRow key={row.entryId} >
                                            <TableCell component="th" scope="row">
                                                {row.entryId}
                                            </TableCell>
                                            <TableCell onClick={(e)=>{
                                            window.location.href='/ingestion/'+row.entryId
                                        }} >{row.jobname}</TableCell>
                                            <TableCell onClick={(e)=>{
                                            window.location.href='/ingestion/'+row.entryId
                                        }}>{row.projectname}</TableCell>
                                            <TableCell >{row.status}</TableCell>
                                            {row.Schedule.schedule_type==="On-Demand" ?
                                                <TableCell >
                                                    <Button  id={row.entryId+'ID'} variant="contained" size="small" color='default' onClick={(e)=>{
                                                        e.preventDefault();
                                                        triggerJob(row.entryId+'ID', row.entryId)
                                                    }}> 
                                                        trigger
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