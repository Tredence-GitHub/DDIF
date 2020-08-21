import React, { Component, useState, useEffect } from 'react'
import ReactDom from 'react-dom';
import { makeStyles,withStyles  } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MenuItem from '@material-ui/core/MenuItem';
import PersonIcon from '@material-ui/icons/Person';
import { lightBlue } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Onedrive from '../configure_ingestion/Onedrive';
import Googledrive from '../configure_ingestion/Googledrive';
import Mysql from '../configure_ingestion/Mysql';
import Hive from '../configure_ingestion/Hive';
import AzureBlob from '../configure_ingestion/AzureBlob';
import ADLSGenOne from '../configure_ingestion/ADLSGenOne';
import ADLSGenTwo from './ADLSGenTwo';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OnDemand from '../configure_ingestion/OnDemand';
import OneTime from './OneTime'
import FixedSchedule from './FixedSchedule';
import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// import {useSnackbar} from 'notistack';


const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);

  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  const AccordionDetails = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiAccordionDetails);



const projects = [
    {
        value: 'Retail',
        label: 'Retail',
    },
    {
        value: 'CPG',
        label: 'CPG',
    },
    {
        value: 'Healthcare',
        label: 'Healthcare',
    },
    {
        value: 'IT',
        label: 'IT',
    },
    {
        value: 'Supply Chain',
        label: 'Supply Chain',
    },
];


const sources = [
    {
        value: 'Google Drive',
        label: 'Google Drive',
    },
    {
        value: 'Mysql',
        label: 'Mysql',
    },
    {
        value: 'One Drive',
        label: 'One Drive',
    },
    {
        value: 'Hive',
        label: 'Hive',
    },
    {
        value: 'AzureBlob',
        label: 'AzureBlob',
    },
];

const targets = [
    {
        value: 'ADLS Gen 1',
        label: 'ADLS Gen 1',
    },
    {
        value: 'ADLS Gen 2',
        label: 'ADLS Gen 2',
    },
    {
        value: 'Azure SQL',
        label: 'Azure SQL',
    },
];



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
    progress: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
}));



export default function Setup(props) {
    const classes = useStyles();
    const [project, setProject] = React.useState(0);
    const [jobTitle, setjobTitle] = React.useState('');
    const [rationale, setRationale] = React.useState('');
    const [value, setValue] = React.useState('');
    // const [value1, setValue1] = React.useState('');
    const [value2, setValue2] = React.useState('');
    const [sourcetype, setSourcetype] = React.useState('');
    const [sourcetypeAbbrv, setSourcetypeAbbrv] = React.useState('');
    const [targettype, setTargettype] = React.useState('');
    const [targettypeAbbrv, setTargettypeAbbrv] = React.useState('');
    const [expanded, setExpanded] = React.useState('panel1');
    const [sourceParams, setsourceParams] = React.useState({});
    const [targetParams, settargetParams] = React.useState({});
    const [scheduleParams, setscheduleParams] = React.useState({});
    const [dropDownProject, setdropDownProject] = useState({})
    const [dropDownSource, setdropDownSource] = useState({})
    const [dropDownTarget, setdropDownTarget] = useState({})
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    // const {enqueueSnackbar} = useSnackbar();
    let local = 'http://localhost:4000';

    function getInfo() {
        Promise.all(
            [Axios.get(`${local}/ingestion/getDropdowns`), 
            
            ]).then((res)=>{
                return [res]
            })  
          .then((response)=>{
            console.log("RESPONSE -- ", response[0][0].status)
            console.log(response)
            if(response[0][0].status === 200){
                setdropDownProject(response[0][0].data.data.project_types);
                setdropDownSource(response[0][0].data.data.data_sources);
                setdropDownTarget(response[0][0].data.data.data_targets);
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
   
    
    const handleChangeAccordion = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    // const handleChange1 = (event) => {
    //     setValue1(event.target.value);
    // };

    const handleChange2 = (event) => {
        setValue2(event.target.value);
    };


    const handleChangeProject= (event) => {
        setProject(event.target.value);
        console.log(event.target.value);
    };

    const handleChangejobTitle= (event) => {
        setjobTitle(event.target.value);
        console.log(jobTitle)
    };

    const handleChangeRationale= (event) => {
        setRationale(event.target.value);
    };

    const handleChangeSourcetype= (event) => {
        setSourcetype(event.target.value);
        // setSourcetypeAbbrv(event.target.name);
        
        dropDownSource.map((item,index)=>{
            if(item.typeId === event.target.value){
                setSourcetypeAbbrv(item.abbrv);
            }
        })

    };

    const handleChangeTargettype= (event) => {
        setTargettype(event.target.value);
        

        dropDownTarget.map((item,index)=>{
            if(item.typeId === event.target.value){
                console.log(item.abbrv);
                setTargettypeAbbrv(item.abbrv);
            }
        })
    };

    const handleOnedrive = (data) =>{
        setsourceParams(data)
    }
    const handleGoogleDrive =(data) =>{
        setsourceParams(data)
    }
    const handleMysql =(data) =>{
        setsourceParams(data)
    }
    const handleHive =(data) =>{
        setsourceParams(data)
    }
    const handleAzureBlob =(data) =>{
        setsourceParams(data)
    }
    // target
    const handleADLSGenOne =(data) =>{
        settargetParams(data)
    }
    const handleADLSGenTwo =(data) =>{
        settargetParams(data)
    }

    //Scheduler
    const handleOneTimeSchedule = (data)=>{
        setscheduleParams(data)
    }

    const handleFixedSchedule = (data)=>{
        setscheduleParams(data)
        // console.log(data,"8888888888");
    }
    const handleOnDemandSchedule = (data)=>{
        setscheduleParams(data)
        // console.log(data,"8888888888");
    }

    

    const sourceFormDisplay = () =>{
        if (sourcetype ===5) {
            return <Onedrive onPassOneDrive={handleOnedrive}/>
        }
        else if(sourcetype ===2){
            return <Googledrive onPassGoogleDrive={handleGoogleDrive}/>
        }
        else if(sourcetype ===4){
            return <Mysql onPassMysql={handleMysql}/>
        }
        else if(sourcetype ===3){
            return <Hive onPassHive={handleHive}/>
        }
        else if(sourcetype === 1){
            return <AzureBlob onPassAzureBlob={handleAzureBlob}/>
        }
        else{
            return <div></div>
        }
        
    };

    const targetFormDisplay = () =>{
        if (targettype ===1) {
            return <ADLSGenOne onPassADLSGenOne={handleADLSGenOne}/>
        }
        else if(targettype ===2){
            return <ADLSGenTwo onPassADLSGenTwo={handleADLSGenTwo}/>
        }
        else if(targettype ===3){
            return <div></div>
        }
        else{
            return <div></div>
        }
        
    };

    const isFormValid = () => {
        // console.log(project,jobTitle ,rationale ,sourcetype ,targettype ,value, value2, Object.keys(sourceParams)[0], targetParams) ;
        // console.log(project>0 && jobTitle.length>0 && rationale.length>0 && sourcetype>0 && targettype>0 && value.length>0 && value2.length>0 && Object.keys(sourceParams)[0].length>0 && Object.keys(targetParams)[0].length>0);
        return project>0 && jobTitle.length>0 && rationale.length>0 && sourcetype>0 && targettype>0 && value.length>0 && value2.length>0 && Object.keys(sourceParams)[0].length>0 && Object.keys(targetParams)[0].length>0
      };
    console.log(sourceParams,"5%%%")

      const ScheduleDisplay = () =>{
        if (value ==='On-Demand') {
            return <OnDemand onPassOnDemandSchedule={handleOnDemandSchedule}/>
        }
        else if(value ==='One-Time'){
            return <OneTime onPassOneTimeSchedule={handleOneTimeSchedule}/>
        }
        else if(value ==='Fixed Schedule'){
            return <FixedSchedule onPassFixedSchedule={handleFixedSchedule}/>
        }
        else{
            return <div></div>
        }
        
    };

    const saveData= ()=>{
        let param = {
            username: localStorage.getItem('username'),
            rationale: rationale,
            project_type: project,
            jobname: "",
            projectname : jobTitle,
            created_by : localStorage.getItem('username'),
            created_at : new Date(), 
            source_type : sourcetype,
            target_type : targettype,
            operation: value2,
            status :'draft',
            updated_at :new Date(),
            updated_by :localStorage.getItem('username'),
            source_abbrv : sourcetypeAbbrv,
            target_abbrv : targettypeAbbrv,
            source_parameter:sourceParams,
            target_parameter:targetParams,
            source_query:sourceParams.sourceQuery,
            target_file_type: targetParams.TargetFileType,
            target_file_delimiter: targetParams.TargetFileDelimiter,
            schedule_type:value,
            recurrence_type:scheduleParams.scheduleType,
            recurrence:Number(scheduleParams.hours_minutes),
            days:scheduleParams.weeks,
            start_time:scheduleParams.selectedTime,
            start_date:scheduleParams.startDate,
            end_date:scheduleParams.endDate
        }
        // console.log(param)
        // console.log(typeof(param.start_date))

        let resp = Axios.post(`${local}/ingestion/setupDataSave`,param

        ).then((response) => {
            console.log(response);
            if (response.status === 200) {
               console.log(response);
               handleOpen()
                setMsg(response.data.message)

            // enqueueSnackbar("Success", {
            //     variant: 'success',
            // });
            //    window.location.href = "/ingestion/metadata";

            // Redirection to metadata tab

            }
            else if (response.status === 400) {
                handleOpen()
                setMsg('failed!')
                // // alert('You are not registered with us! Please register!')
                // // return window.location.href = "/";
                // enqueueSnackbar("Failed", {
                //     variant: 'warning',
                // })
            }

        }).catch((err) => {
            console.log(err);
            handleOpen()
            setMsg('Failed!')
            // // alert('You are not registered with us! Please register!')
            // // return window.location.href = "/";
            // enqueueSnackbar("Failed", {
            //     variant: 'warning',
            // })
        });
    }

    const handleSetupOk =()=>{
        let data ={
            "done":1,
        }

        props.onPassSetup(data);
    }



    if(!loading){
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
      <Accordion square expanded={expanded === 'panel1'} onChange={handleChangeAccordion('panel1')} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Project Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid  container direction="column" alignItems="center"justify="center">
                        <Paper className={classes.paper}>
                        <Paper className={classes.paper} style={{ width: "500px"}}>
                            <strong>Project Information </strong>
                            <hr />
                            <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                    <TextField
                                        id="projects"
                                        select
                                        label=""
                                        value={project}
                                        onChange={handleChangeProject}
                                        helperText="Please select the Project Type"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <VerifiedUserIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                        {dropDownProject.map((option) => (
                                            <MenuItem key={option.typeId} value={option.typeId}>
                                                {option.project_type}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>

                                <div>
                                    <TextField
                                        id="jobTitle"
                                        label="Enter Job title"
                                        placeholder="Job Title"
                                        onChange={handleChangejobTitle}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                                <div>
                                    <TextField
                                        id="rationale"
                                        label="Rationale"
                                        placeholder="Rationale for onboarding the specific data"
                                        onChange={handleChangeRationale}
                                        multiline 
                                        rows={2}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </div>

                            </form>
                        </Paper>
                        </Paper>
                    </Grid>
        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'panel2'} onChange={handleChangeAccordion('panel2')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Source</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="column" alignItems="center"justify="center">
                        <Paper className={classes.paper}>
                        <Paper className={classes.paper} style={{ width: "500px"}}>
                        <strong>Source</strong>
                            <hr />
                            <form className={classes.root} noValidate autoComplete="off">
                            <div>
                                    <TextField
                                        id="sources"
                                        select
                                        label=""
                                        name = "abbrv"
                                        value={sourcetype}
                                        onChange={handleChangeSourcetype}
                                        helperText="Please select the Source"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <VerifiedUserIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    >
                                        {dropDownSource.map((option) => (
                                            
                                            <MenuItem key={option.typeId} value={option.typeId}>
                                                {option.source_type}
                                            </MenuItem>
                                            
                                        ))}
                                    </TextField>
                                </div>

                                {sourceFormDisplay()}

                            </form>

                        </Paper>
                        </Paper>
                    </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel3'} onChange={handleChangeAccordion('panel3')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Target</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="column" alignItems="center"justify="center">
                            <Paper className={classes.paper}>
                            <Paper className={classes.paper} style={{ width: "500px"}}>
                            <strong>Target</strong>
                                <hr />
                                <form className={classes.root} noValidate autoComplete="off">
                                <div>
                                        <TextField
                                            id="targets"
                                            select
                                            label=""
                                            value={targettype}
                                            onChange={handleChangeTargettype}
                                            helperText="Please select the Target"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <VerifiedUserIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {dropDownTarget.map((option) => (
                                                <MenuItem key={option.typeId} value={option.typeId}>
                                                    {option.target_type}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>

                                    {targetFormDisplay()}

                                </form>

                            </Paper>
                            </Paper>
                        </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel4'} onChange={handleChangeAccordion('panel4')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4d-content" id="pane42d-header">
          <Typography>Schedule</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="column" alignItems="center"justify="center">
                        <Paper className={classes.paper}>
                        <Paper className={classes.paper} style={{ width: "500px"}}>
                            <strong>Schedule</strong>
                            <hr/>
                            <FormControl component="fieldset">
                                {/* <FormLabel component="legend">Gender</FormLabel> */}
                                <RadioGroup aria-label="schedule" name="schedule" value={value} onChange={handleChange} row>
                                    <FormControlLabel value="On-Demand" control={<Radio />} label="On-Demand" />
                                    <FormControlLabel value="One-Time" control={<Radio />} label="One-Time" />
                                    <FormControlLabel value="Fixed Schedule" control={<Radio />} label="Fixed Schedule" />
                                </RadioGroup>
                            </FormControl>
                            {ScheduleDisplay()}
                        {/* Scheduler comes here */}
                        </Paper>
                        </Paper>

                    </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'panel5'} onChange={handleChangeAccordion('panel5')}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Additional Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <Grid container direction="column" alignItems="center" justify="center">
                        <Paper className={classes.paper}>
                        <Paper className={classes.paper} style={{ width: "500px"}}>
                            <strong>Additional Information</strong>
                            <hr/>
                            
                            {/* <Typography>Ingestion Pattern</Typography> */}
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Ingestion Pattern</FormLabel>
                                <RadioGroup aria-label="ingestion pattern" name="ingestion pattern" value={value2} onChange={handleChange2} row>
                                    <FormControlLabel value="Overwrite" control={<Radio />} label="Overwrite" />
                                    <FormControlLabel value="Append" control={<Radio />} label="Append" />
                                    <FormControlLabel value="Upsert" control={<Radio />} label="Upsert" />
                                </RadioGroup>
                            </FormControl>
                        </Paper>   
                        </Paper>

                    </Grid>
        </AccordionDetails>
      </Accordion>
    


        <div className={classes.buttonRoot} style={{marginTop:"20px"}}>
        <Grid container>
                
                <Grid item xs={6} direction="column" container justify="flex-start" alignItems="flex-start">
                    <Button variant="contained" color='primary' onClick = {(e)=>{
                            e.preventDefault();
                            window.location.href = "/ingestiontable";
                    }} >Back</Button>
                </Grid>
                <Grid item xs={6} direction="column" container justify="flex-end" alignItems="flex-end">
                    <Button variant="contained" color='primary' disabled={!isFormValid()} onClick = {(e)=>{
                            e.preventDefault();
                            saveData();
                            handleSetupOk();
                            
                    }} >Next</Button>
                </Grid>
        </Grid>
        </div>
        </div>
    );
}

else{
    return(<div className={classes.progress} style={{marginLeft:"550px"}}>
        <CircularProgress />
      </div>)
}
}

