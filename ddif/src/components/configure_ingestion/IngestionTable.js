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
import { useSnackbar } from 'notistack';
import PanToolIcon from '@material-ui/icons/PanTool';
import ScheduleIcon from '@material-ui/icons/Schedule';
import OfflineBoltTwoToneIcon from '@material-ui/icons/OfflineBoltTwoTone';
import PlayCircleFilledTwoToneIcon from '@material-ui/icons/PlayCircleFilledTwoTone';
import { useHistory } from 'react-router-dom';



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

export default function IngestionTable() {
    const classes = useStyles();
    const [tableData, settableData] = useState({})
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const { enqueueSnackbar } = useSnackbar();

    const history = useHistory();
    let local = 'http://localhost:4000'
    let deploy = 'https://driverless-data-ingestion.azurewebsites.net'
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function killScheduled(btnId,entryId,jobId){
        // console.log(jobId,"00")
        enqueueSnackbar('Job is getting Killed', {
            variant: 'success',
        });
        let b = document.getElementById(btnId);
        console.log(b)
        // b.setAttribute('hidden', 'true');

        Axios.post(`${local}/job/killjob`, {
            job_id : jobId,
            entryid :entryId
            
          }).then((response) => {
                
                if (response.data.message === 'success') {
                    
                    // enqueueSnackbar('Job is running ..', {
                    //     variant: 'success',
                    // });
                    // b.setAttribute('hidden', 'false')
                    getInfo()
                } else {
                    
                    // enqueueSnackbar('Job is running ..', {
                    //     variant: 'success',
                    // });
                    // b.setAttribute('hidden', 'false')
                    getInfo()
                }
            }).catch((err) => {
                console.log(err);
                
                // b.setAttribute('hidden', 'false')
                
                enqueueSnackbar('Failed to execute the job!', {
                    variant: 'error',
                });
                getInfo()
            })

    }



    function triggerScheduled(btnId,entryId,cronTime){

        enqueueSnackbar('Job is triggered', {
            variant: 'success',
        });
        let b = document.getElementById(btnId);
        console.log(b)
        // b.setAttribute('hidden', 'true');

        Axios.post(`${local}/job/schedule`, {
            entryid: parseInt(entryId),
            crontime: cronTime
            
          }).then((response) => {
            console.log(cronTime,"00")
                if (response.data.message === 'success') {
                    
                    enqueueSnackbar(`Job ${entryId} is running ..`, {
                        variant: 'success',
                    });
                    // b.setAttribute('hidden', 'false')
                    getInfo()
                } else {
                    enqueueSnackbar(`Job ${entryId} is Completed ..`, {
                        variant: 'success',
                    });
                    // b.setAttribute('hidden', 'false')
                    getInfo()
                }
            }).catch((err) => {
                console.log(err);
                // b.setAttribute('hidden', 'false')
                
                enqueueSnackbar(`Failed to execute the job ${entryId}!`, {
                    variant: 'error',
                });
                getInfo()
            })

    }



    function triggerJob(btnId, entryId) {
        // handleOpen();
        // setMsg('Job is triggered')
        enqueueSnackbar('Job is triggered', {
            variant: 'success',
        });
        let b = document.getElementById(btnId);
        console.log(b)
        // b.setAttribute('hidden', 'true');
        Axios.get(`${local}/ingestion/api/triggerOnDemand/${entryId}`)
            .then((response) => {
                if (response.data.message === 'success') {
                    // handleOpen();
                    // setMsg('Job is running ..')
                    enqueueSnackbar(`Job ${entryId} executed successfully`, {
                        variant: 'success',
                    });
                    // b.setAttribute('hidden', 'false')
                   
                    getInfo()
                } else {
                    // handleOpen();
                    // setMsg('Job is running ..')
                    enqueueSnackbar(`Job ${entryId} executed successfully`, {
                        variant: 'success',
                    });
                    // b.setAttribute('hidden', 'false')
                    getInfo()
                }
            }).catch((err) => {
                console.log(err);
                // b.setAttribute('hidden', 'false')
                
                // handleOpen();
                // setMsg('Failed to execute the job!')
                enqueueSnackbar(`Failed to execute the job ${entryId}!`, {
                    variant: 'error',
                });
                getInfo()
            })
    }

    function getInfo() {
        Promise.all(
            [Axios.post(`${local}/ingestion/getRecords`),
            ]).then((res) => {
                return [res]
            })
            .then((response) => {
                console.log(response)
                console.log(response[0][0].data.data,"****")
                // console.log("RESPONSE -- ", response[0][1].status)
                if (response[0][0].status === 200) {
                    settableData(response[0][0].data.data);
                    seterror(false);

                    setloading(false);
                    console.log('CAME !!!!!  ', response.length)
                } else {
                    console.log(response)
                    seterror(true);
                }

            }).catch((err) => {
                seterror(true)
            })
    }

    useEffect(() => {
        getInfo();
    }, [])


    if (!loading) {
        return (
            <div>
                {/* <Snackbar
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
        /> */}
                <div>
                    <Paper className={classes.paper}>
                        <strong style={{display:'flex',justifyContent:"left", color:"black", marginLeft:"10px"}}>Ingestion Job Log</strong>
                        <hr />
                        <TableContainer component={Paper} style={{ maxHeight: "420px" }}>
                            <Table className={classes.table} aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell ><b>Entry ID</b></TableCell>
                                        <TableCell><b>Job ID</b></TableCell>
                                        <TableCell><b>Project Name</b></TableCell>
                                        <TableCell><b>Status</b></TableCell>
                                        <TableCell style={{width:"200px"}}><b>Schedule Type</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row) => (
                                        <TableRow key={row.entryId} >
                                            <TableCell component="th" scope="row">
                                                {row.entryId}
                                            </TableCell>

                                            <TableCell onClick={(e) => {
                                                 history.push('/ingestion/' + row.entryId)
                                            }} >{row.jobname}</TableCell>

                                            <TableCell onClick={(e) => {
                                                 history.push('/ingestion/' + row.entryId)
                                            }}>{row.projectname}</TableCell>

                                            {row.status === "Completed" ?
                                                <TableCell onClick={(e) => {
                                                    history.push('/audit/' + row.entryId)
                                                }}>
                                                    <div style={{ color: "green" }}> <a>{row.status} </a></div> </TableCell> :

                                                row.status === "Scheduled" ?
                                                <TableCell> <div style={{ color: "orange" }}> <a>{row.status} </a></div> </TableCell>:
                                                row.status === "Created" ?
                                                <TableCell> <div style={{ color: "navy" }}> <a>{row.status} </a></div> </TableCell>:
                                                <TableCell>{row.status}</TableCell>
                                            }


                                            {row.Schedule.schedule_type === "On-Demand" && row.status !='draft' && row.status!='Scheduled'?
                                                <TableCell >
                                                    <Button id={row.entryId + 'ID'} variant="outlined" size="small" color='primary' onClick={(e) => {
                                                        e.preventDefault();
                                                        triggerJob(row.entryId + 'ID', row.entryId)
                                                    }}>
                                                        <OfflineBoltTwoToneIcon/> &nbsp; Trigger
                                                    </Button>
                                                </TableCell> :
                                                row.Schedule.schedule_type === 'On-Demand'? <TableCell >{row.Schedule.schedule_type}</TableCell>:

                                            row.Schedule.schedule_type === "Fixed Schedule" && row.status != 'draft' && row.status != 'Scheduled' ?
                                                <TableCell>
                                                    <Button id={row.entryId + 'ID'} variant="outlined" size="small" color='primary' onClick={(e) => {
                                                        e.preventDefault();
                                                        triggerScheduled(row.entryId+'ID',row.entryId,row.cron_time)
                                                    }}>
                                                        <PlayCircleFilledTwoToneIcon/> &nbsp; Start
                                                </Button> </TableCell> :
                                                row.Schedule.schedule_type === "Fixed Schedule" && row.status != 'draft' ?
                                                    <TableCell>
                                                        <Button id={row.entryId + 'ID'} variant="default" size="small" color='secondary' style={{
                                                            borderRadius:"80%",
                                                            color: "maroon"
                                                        }} onClick={(e) => {
                                                            e.preventDefault();
                                                            killScheduled(row.entryId+'ID',row.entryId, row.schedule_job_id)
                                                        }}>
                                                            <PanToolIcon color="red"/><small> &nbsp; <i>Stop to Edit Details</i></small>
                                                        </Button> 
                                                        </TableCell> :
                                                        
                                                        <TableCell>
                                                            {row.Schedule.schedule_type}
                                                         </TableCell>

                                            }


                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </div>

                <div style={{ marginTop: " 20px" }}>
                    <Grid container>
                        <Grid direction="column" container justify="flex-end" alignItems="flex-end">
                            <Button variant="contained" color='primary' onClick={(e) => {
                                e.preventDefault();
                                // window.location.href = "/ingestion/setup";
                                history.push("/ingestion");
                            }}>Create Ingestion </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    else {
        return (<div>
            <LinearProgress />
        </div>)
    }
}


//https://levelup.gitconnected.com/react-material-table-crud-operations-with-restful-api-data-ca1af738d3c5