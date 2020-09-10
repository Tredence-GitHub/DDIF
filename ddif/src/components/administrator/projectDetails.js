import React, { useEffect, useState, Component } from 'react'
import ReactDom from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
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
import Axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
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

export default function TargetDetails() {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [Project, setProject] = React.useState('');
    const [dropDownProject, setdropDownProject] = useState({})
    const [businessFunction, setBusinessFunction] = useState('')
    const [description, setDescription] = useState('')
    const [owner, setOwner] = useState('')
    const [dropDownOwner, setdropDownOwner] = useState({})
    const [newProject, setNewProject] = React.useState('');

    const [hiddenNewProject, setHiddenNewProject] = React.useState(true);
    const [HiddenExistingProject, setHiddenExistingProject] = React.useState(true);
    const [HiddenValue, setHiddenValue] = React.useState(false);
    
    const [error, seterror] = React.useState('Allowed: , ; |');
    const [msg, setMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [loading, setloading] = useState(true);
    const [loaderror, setloaderror] = useState(false);

    const [Submitted, setSubmitted] = useState(false);
    const [Edited, setEdited] = useState(false);
    const [Fresh, setFresh] = useState(false);
    const history = useHistory()
    // const targetformats = [
    //     {
    //         value: 'csv',
    //         label: 'csv',
    //     },
    //     {
    //         value: 'orc',
    //         label: 'orc',
    //     },
    //     {
    //         value: 'parquet',
    //         label: 'parquet',
    //     },
    // ];

    const handleChangeValue = (event) => {
        console.log(event.target.value);
        setValue(event.target.value);

        if(event.target.value==="Existing Project"){
            setHiddenExistingProject(false)
            setHiddenNewProject(true)
        }
        else{
            setHiddenExistingProject(true)
            setHiddenNewProject(false)
        }
    }

    const handleChangeProject = (event) => {
        console.log(event.target.value);
        setProject(event.target.value);
    }

    const handleChangeBusinessFunction = (event) => {
        setBusinessFunction(event.target.value);
    }

    const handleChangeDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleChangeOwner = (event) => {
        setOwner(event.target.value);
    }

    const handleChangeNewProject = (event) => {
        // console.log(event.target.value);
        setNewProject(event.target.value);
    }

   

    const handleSubmit = () => {

        if(value==="Existing Project"){
            let data ={
            
                "project_type":Project,
                "business_function":businessFunction.trim(),
                "description":description.trim(),
                "owner":owner,
                "entrytype":"existing",
                
            }
            saveSubmit(data);
        }
        else{
            let data ={
            
                "project_type":newProject.trim(),
                "business_function":businessFunction.trim(),
                "description":description.trim(),
                "owner":owner,
                "entrytype":value,
                
            }
            saveSubmit(data);
        }
        
        

        // if(dbc===false && Hostname.trim().length>0 && SourceType > 0 && AccountKey.trim().length>0 && Port.trim().length>0 && 
        //     SourceQuery.trim().length> 0 && LocationName.trim().length>0 && ConnectionName.trim().length>0){
        //         saveSubmit(data);
        //     }
        //  else if(blob===false && AccountName.trim().length>0 && AccountKey.trim().length>0 
        //  && LocationName.trim().length>0 && ConnectionName.trim().length>0){
        //             saveSubmit(data);
        //         }
        // else if(links===false && Path.trim().length>0 && gddelimiter.trim().length > 0 && ConnectionName.trim().length>0){
        //     saveSubmit(data);
        // }else{
        //     handleOpen();
        //     setMsg('Please fill the required fields');
        // }
        // console.log('DATA -- ', data);


    }


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const handleEdit = () => {

        let data ={
            "project_type":Project,
            "business_function":businessFunction.trim(),
            "description":description.trim(),
            "owner":owner,
            "row_id":window.location.href.split('/')[4]
        }
        updateData(data);

        

        // if(dbc===false && Hostname.trim().length>0 && SourceType > 0 &&  AccountKey.trim().length>0 && Port.trim().length>0 && 
        // SourceQuery.trim().length> 0 && LocationName.trim().length>0 && ConnectionName.trim().length>0){
        //     updateData(data);
        // }
        // else if(blob===false && AccountName.trim().length>0 && AccountKey.trim().length>0 
        // && LocationName.trim().length>0 && ConnectionName.trim().length>0){
        //             updateData(data);
        //         }
        // else if(links===false && Path.trim().length>0 && SourceType > 0 &&  gddelimiter.trim().length > 0 && ConnectionName.trim().length>0){
        //     updateData(data);
        // }else{
        //     handleOpen();
        //     setMsg('Please fill the required fields');
        //  }
        // console.log(data, '--- DATA')
    }

    let local = 'http://localhost:4000';
    let deploy = 'https://driverless-data-ingestion.azurewebsites.net';

    function updateData(data) {
        setEdited(true);
        setMsg('Updating... ')
        handleOpen()
        Axios.post(`${deploy}/administration/updateProject`, data)
            .then((response) => {
                console.log(response);
                if (response.status == 200) {
                    setMsg(response.data.message)
                    handleOpen()
                    setEdited(false);
                    // history.push('/admin');
                }
            }).catch((err) => {
                console.log(err, "while saving ")
                handleOpen()
                setMsg('Failed to update the source!')
            })
    }

    function saveSubmit(data) {
        setSubmitted(true);
        setMsg('Saving... ')
        handleOpen()
        Axios.post(`${deploy}/administration/saveProject`, data)
            .then((response) => {
                if (response.status === 200) {
                    let msg = response.data.message;
                    setMsg(msg)
                    handleOpen()
                    setSubmitted(false);
                    // history.push('/admin');
                }
            }).catch((err) => {
                console.log(err, "while saving ")
                handleOpen()
                setMsg('Failed to record the source!')
            })
    }

    function getData(rowid) {

        Promise.all(
            [Axios.get(`${deploy}/ingestion/getDropdowns`),
            Axios.get(`${deploy}/administration/getProjectById/${rowid}`),
            Axios.get(`${deploy}/administration/getUsers`)
            ]).then((res) => {
                return [res]
            })
            .then((response) => {
                console.log(response);
                if (response[0][0].status === 200 && response[0][1].status === 200) {
                    
                    setdropDownProject(response[0][0].data.data.project_types);
                    setdropDownOwner(response[0][2].data.data)
                    setProject(response[0][1].data.data[0].project_type)
                    setBusinessFunction(response[0][1].data.data[0].business_function)
                    setDescription(response[0][1].data.data[0].description)
                    setOwner(response[0][1].data.data[0].owner)
                    setHiddenExistingProject(false)
                    setHiddenValue(true)

                    setloaderror(false);
                    setloading(false);
                }
            }).catch((err) => {
                console.log(err, 'ERROR population');
                setloaderror(true);
                handleOpen();
                setMsg('The ID does not exist!');
            })
    }

    function getInfo() {
        Promise.all(
            [Axios.get(`${deploy}/ingestion/getDropdowns`),
            Axios.get(`${deploy}/administration/getUsers`)

            ]).then((res) => {
                return [res]
            })
            .then((response) => {
                console.log("RESPONSE -- ", response[0][0].status)
                console.log(response)
                if (response[0][0].status === 200) {
                    setdropDownProject(response[0][0].data.data.project_types)
                    setdropDownOwner(response[0][1].data.data)
                    setSubmitted(false);
                    setFresh(true);
                    setloaderror(false);
                    setloading(false);
                    console.log('CAME !!!!!  ', response.length)
                } else {
                    console.log(response)
                    setloaderror(true);
                }

            }).catch((err) => {
                seterror(true)
            })
    }

    useEffect(() => {
        if (window.location.href.split('/').length === 4) {
            getInfo();
        } else {
            getData(window.location.href.split('/')[4])
        }
    }, [])

 

    if (!loading) {
        return (

            <Paper style={{
                padding: "2%"
            }}>
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
                <form className={classes.root} noValidate autoComplete="off">
                    <center>
                        <strong textAlign="center">Project Information </strong>
                    </center>
                    <hr />

                    <Grid container style={{ marginLeft: "3.5%" }} hidden={HiddenValue}>
                        <FormControl component="fieldset" >
                            {/* <FormLabel component="legend">Gender</FormLabel> */}
                            <RadioGroup aria-label="schedule" name="schedule" value={value} onChange={handleChangeValue} row >
                                <FormControlLabel value="Existing Project" control={<Radio />} label="Existing Project" style={{ marginRight: "50px" }} />
                                <FormControlLabel value="New Project" control={<Radio />} label="New Project" style={{ marginLeft: "50px" }} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid container style={{ padding: "2%" }} hidden={HiddenExistingProject}>
                        <TextField
                            id="ProjectType"
                            select
                            label="Choose Project Name"
                            value={Project}
                            onChange={handleChangeProject}
                            // helperText="Please select the project name"
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
                        <TextField
                            id="Busniess Function"
                            label="Business Function"
                            placeholder=""
                            value={businessFunction}
                            onChange={handleChangeBusinessFunction}
                            multiline
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            id="Description"
                            label="Description"
                            placeholder=""
                            value={description}
                            onChange={handleChangeDescription}
                            multiline
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            id="Owner"
                            select
                            label="Owner"
                            placeholder=""
                            value={owner}
                            onChange={handleChangeOwner}
                            
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                            }}
                        >
                        {dropDownOwner.map((option) => (
                                <MenuItem key={option.username} value={option.username}>
                                    {option.username}
                                </MenuItem>
                            ))}
                            </TextField>

                    </Grid>

                    <Grid container style={{ padding: "2%" }} hidden={hiddenNewProject}>
                        <TextField
                            id="NewProjectType"
                            label="Enter Project Name"
                            value={newProject}
                            onChange={handleChangeNewProject}
                            // helperText="Please enter the project name"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        
                                    </InputAdornment>
                                ),
                            }}
                        >
                            {/* {dropDownProject.map((option) => (
                                <MenuItem key={option.typeId} value={option.typeId}>
                                    {option.project_type}
                                </MenuItem>
                            ))} */}
                        </TextField>
                        <TextField
                            id="Busniess Function"
                            label="Business Function"
                            placeholder=""
                            value={businessFunction}
                            onChange={handleChangeBusinessFunction}
                            multiline
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            id="Description"
                            label="Description"
                            placeholder=""
                            value={description}
                            onChange={handleChangeDescription}
                            multiline
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            id="Owner"
                            label="Owner"
                            select
                            placeholder=""
                            value={owner}
                            onChange={handleChangeOwner}
                            
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">

                                    </InputAdornment>
                                ),
                            }}
                        >
                            {dropDownOwner.map((option) => (
                                <MenuItem key={option.username} value={option.username}>
                                    {option.username}
                                </MenuItem>
                            ))}
                            </TextField>


                        

                    </Grid>
                </form>
                <div>

                    <Button variant="contained" color='primary' size="small" justify="flex-right" style={{marginLeft:"3.5%",marginTop:"3.5%"}} onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        // window.location.href = "/addSource";
                    }} disabled={Submitted} hidden={!Fresh}>Save Project </Button>
                    <Button variant="contained" color='primary' size="small" justify="flex-right" style={{marginLeft:"3.5%",marginTop:"3.5%"}} onClick={(e) => {
                        e.preventDefault();
                        handleEdit();

                    }} hidden={Fresh} disabled={Edited}>Update Project </Button>
                </div>

            </Paper>
        )
    }
    else {
        return (
            <div>
                <CircularProgress />
            </div>
        )
    }

}