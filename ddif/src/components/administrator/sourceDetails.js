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
import Axios from 'axios';
import { lightBlue } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    progress: {
        display: 'flex',
        '& > * + *': {
          marginLeft: theme.spacing(2),
        },
      },
}));

export default function SourceDetails(){
    const classes = useStyles();
    const [TargetFileType, setTargetFileType] = React.useState('');
    const [Disabled, setDisabled] = React.useState(true);
    const [value2, setValue2] = React.useState('  ');
    const [links, setLinks] = React.useState(true);
    const [dbc, setDbc] = React.useState(true);
    const [blob, setBlob] = React.useState(true);
    const [Format, setFormat] = useState('')
    const [gddelimiter, setgdDelimiter] = React.useState('');
    const [errorinfo, seterrorinfo] = React.useState(false);
    const [error, seterror]= React.useState('Allowed: , ; |');

    const [checkedA, setcheckedA] = React.useState(false);

    const [dropDownSource, setdropDownSource] = useState({})
    const [loading, setloading] = useState(true);
    const [loaderror, setloaderror] = useState(false);
    const [msg, setMsg] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const [SourceType, setSourceType] = useState(0);
    const [Default, setDefault] = useState(0);
    const [ConnectionName, setConnectionName] = useState('')
    const [Path, setPath] = useState('');
    const [Hostname, setHostname] = useState('');
    const [AccountName, setAccountName] = useState('');
    const [AccountKey, setAccountKey] = useState('');
    const [SourceQuery, setSourceQuery] = useState('');
    const [LocationName, setLocationName] = useState('');
    const [Port, setPort] = useState('');
    const [Submitted, setSubmitted] = useState(false);
    const [Edited, setEdited] = useState(false);
    const [Fresh, setFresh] = useState(false);
    const history = useHistory()
    const targetformats = [
        {
            value: 'csv',
            label: 'csv',
        },
        {
            value: 'orc',
            label: 'orc',
        },
        {
            value: 'parquet',
            label: 'parquet',
        },
    ];

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleChangeTargetFileType= (event) => {
        setTargetFileType(event.target.value);
        if (event.target.value==='csv') {
            setDisabled(false)
        }
        else{
            setDisabled(true)
            setgdDelimiter('-');
        }
    };

    const handleChangeSource = (event) =>{
        console.log(event.target.value);
        setSourceType(event.target.value);
    }

    const handleChangeCheck = (event) => {
        setcheckedA(event.target.checked);
        if(event.target.value === 'true'){
            setDefault(1);
        }else{
            setDefault(0);
        }
      };

    const handleChange2 = (event) => {
        if(event.target.value === 'link'){
            setFormat('link');
            setDbc(true);
            setBlob(true);
            setPath('');
            setgdDelimiter('');
            setLinks(false);
        }
        else if(event.target.value === 'blob'){
            
            setBlob(false);
            setFormat('blob');
            setLinks(true);
            setDbc(true);
        }else{
            setHostname(''); setAccountKey('');
            setAccountName('');
            setPort('');
            setSourceQuery('');
            setTargetFileType('');
            setLocationName('');
            setBlob(true);
            setFormat(event.target.value);
            setLinks(true);
            setDbc(false);
        }
    };
    const handleChangeConnection = (event) =>{
        setConnectionName(event.target.value);
    }

    const handleChangeLink = (event) =>{
        setPath(event.target.value);
    }

    const handleChangegdDelimiter= (event) => {
        setgdDelimiter(event.target.value);
        if((event.target.value !== ',') && (event.target.value !== ';') && (event.target.value !== '|')){
            seterrorinfo(true)
            seterror("Invalid Delimiter")
        }
        else{
            seterrorinfo(false)
            seterror("")
        }
    };

    const handleChangePort = (event) =>{
        setPort(event.target.value);
    }

    const handleChangeLocation = (event) =>{
        setLocationName(event.target.value);
    }

    

    const handleChangeAccountName = (event) =>{
        setAccountName(event.target.value);
    }

    const handleChangeAccountKey = (event) =>{
        setAccountKey(event.target.value);
    }

    const handleChangeQuery = (event) =>{
        setSourceQuery(event.target.value);
    }
    const handleSubmit =()=>{
        if(Format === 'link'){
        setHostname(''); setAccountKey('');
        setAccountName('');
        setPath('');
        setTargetFileType('');
        setPort('');
        setSourceQuery('');
        setLocationName('');
        }

        
        let data ={
            "type_id":SourceType,
            "type":'source',
            "connection_name":ConnectionName.trim(),
            "default":Default,
            "format":Format,
            "hostname": Hostname.trim(),
            "account_name": AccountName.trim(),
            "account_key": AccountKey.trim(),
            "source_query": SourceQuery.trim(),
            "location_name": LocationName.trim(),
            "path": Path.trim(),
            "delimiter": gddelimiter.trim(),
            "file_type": TargetFileType,
            "port": Port
        }
        
        if(dbc===false && Hostname.trim().length>0 && AccountKey.trim().length>0 && Port.trim().length>0 && 
            SourceQuery.trim().length> 0 && LocationName.trim().length>0 && ConnectionName.trim().length>0){
                saveSubmit(data);
            }
         else if(blob===false && AccountName.trim().length>0 && AccountKey.trim().length>0 && Path.trim().length > 0 
                && LocationName.trim().length>0 && ConnectionName.trim().length>0){
                    saveSubmit(data);
                }
        else if(links===false && Path.trim().length>0 && gddelimiter.trim().length > 0 && ConnectionName.trim().length>0){
            saveSubmit(data);
        }else{
            handleOpen();
            setMsg('Please fill the required fields');
        }
        console.log('DATA -- ', data);

        
    }

    const handleEdit = () => {
        let data = {
            "row_id":parseInt(window.location.href.split('/')[4]),
            "type_id":SourceType,
            "type":'source',
            "connection_name":ConnectionName.trim(),
            "default":Default,
            "format":Format,
            "hostname": Hostname.trim(),
            "account_name": AccountName.trim(),
            "account_key": AccountKey.trim(),
            "source_query": SourceQuery.trim(),
            "location_name": LocationName.trim(),
            "path": Path.trim(),
            "delimiter": gddelimiter.trim(),
            "file_type": TargetFileType,
            "port": Port
        }

        if(dbc===false && Hostname.trim().length>0 && AccountKey.trim().length>0 && Port.trim().length>0 && 
            SourceQuery.trim().length> 0 && LocationName.trim().length>0 && ConnectionName.trim().length>0){
                updateData(data);
            }
         else if(blob===false && AccountName.trim().length>0 && AccountKey.trim().length>0 && 
               LocationName.trim().length>0 && ConnectionName.trim().length>0){
                    updateData(data);
                }
        else if(links===false && Path.trim().length>0 && gddelimiter.trim().length > 0 && ConnectionName.trim().length>0){
            updateData(data);
        }else{
            handleOpen();
            setMsg('Please fill the required fields');
        }
    }

    let local = 'http://localhost:4000';
    let deploy = 'https://driverless-data-ingestion.azurewebsites.net'

    function updateData(data){
        setEdited(true)
        setMsg('Updating... ')
        handleOpen()
        Axios.post(`${deploy}/administration/updateConnection`, data)
        .then((response)=>{
            if(response.status == 200){
                let msg = response.data.message;
                setMsg(msg) 
                handleOpen() 
                 setEdited(false);
                // history.push('/admin');
            }
        }).catch((err)=>{
            console.log(err, "while saving ")
            handleOpen() 
            setMsg('Failed to update the source!') 
        })
    }

    function saveSubmit(data) {
        setSubmitted(true);
        setMsg('Saving... ')
        handleOpen()
        Axios.post(`${deploy}/administration/saveConnection`, data)
        .then((response)=>{
            if(response.status === 200){
                let msg = response.data.message;
                setMsg(msg) 
                handleOpen() 
                setSubmitted(false);
                // history.push('/admin');
            }
        }).catch((err)=>{
            console.log(err, "while saving ")
            handleOpen() 
            setMsg('Failed to record the source!') 
        })
    }

    function getInfo() {
        Promise.all(
            [Axios.get(`${deploy}/ingestion/getDropdowns`), 
            
            ]).then((res)=>{
                return [res]
            })  
          .then((response)=>{
            console.log("RESPONSE -- ", response[0][0].status)
            console.log(response)
            if(response[0][0].status === 200){
                setdropDownSource(response[0][0].data.data.data_sources);
                setSubmitted(false);
                setFresh(true);
                setloaderror(false);
                setloading(false);
                console.log('CAME !!!!!  ', response.length)
            }else{
                console.log(response)
                setloaderror(true);
            }
    
        }).catch((err)=>{
            seterror(true)
        })
    }

    function getData(rowid){
        
        Promise.all(
            [Axios.get(`${deploy}/ingestion/getDropdowns`), 
            Axios.get(`${deploy}/administration/getById/${rowid}`)
            ]).then((res)=>{
                return [res]
            })  
        .then((response)=>{
            console.log(response);
            if(response[0][0].status === 200 && response[0][1].status === 200){
            setSourceType(response[0][1].data.data[0].type_id);
            setDefault(response[0][1].data.data[0].default);
            setFormat(response[0][1].data.data[0].format);
            setgdDelimiter(response[0][1].data.data[0].delimiter);
            setPath(response[0][1].data.data[0].path)
            setHostname(response[0][1].data.data[0].hostname); 
            setAccountKey(response[0][1].data.data[0].account_key);
            setConnectionName(response[0][1].data.data[0].connection_name)
            setAccountName(response[0][1].data.data[0].account_name);
            setPort(response[0][1].data.data[0].port);
            setSourceQuery(response[0][1].data.data[0].source_query);
            setTargetFileType(response[0][1].data.data[0].file_type);
            setLocationName(response[0][1].data.data[0].location_name);
            setdropDownSource(response[0][0].data.data.data_sources);

            if(response[0][1].data.data[0].format === 'link'){
                setLinks(false);
            }else if(response[0][1].data.data[0].format === 'blob'){
                setBlob(false);
            }else{
                setDbc(false)
            }
            setloaderror(false);
            setloading(false);
            }
        }).catch((err)=>{
            console.log(err, 'ERROR population');
            setloaderror(true);
            handleOpen();
            setMsg('The ID does not exist!');
        })
    }
    
    useEffect(() => {
        console.log(window.location.href.split('/'))
        if(window.location.href.split('/').length === 4){
            getInfo();
        }else{
            getData(window.location.href.split('/')[4])
        }
    }, [])

    const handleChangeHost = (event) => {
        setHostname(event.target.value);
    }

    if(!loading){
    return(
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
            <form className={classes.root}  noValidate autoComplete="off">
                <center>
                    <strong textAlign="center">Source Information </strong>
                </center>
                <hr />
        

                <Grid container style ={{
                    padding: "2%"
                }}>
                <TextField
                        id="source"
                        select
                        label="Choose Source"
                        value={SourceType}
                        onChange={handleChangeSource}
                        helperText="Please select the source"
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
                    <TextField
                        id="Source Name"
                        label="Source Name"
                        placeholder="eg: Hive - New Link"
                        onChange={handleChangeConnection}
                        multiline 
                        value={ConnectionName}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormControlLabel
                            control={<Checkbox checked={checkedA} onChange={handleChangeCheck} name="checkedA" />}
                            label="Set as default connection"
                        />
                    
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Connection Type</FormLabel>
                        <RadioGroup aria-label="ingestion pattern" name="ingestion pattern" value={Format} onChange={handleChange2} row>
                            <FormControlLabel value="jdbc" control={<Radio />} label="jdbc" />
                            <FormControlLabel value="odbc" control={<Radio />} label="odbc" />
                            <FormControlLabel value="link" control={<Radio />} label="link" />
                            <FormControlLabel value="blob" control={<Radio />} label="blob" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
              <Grid container style ={{
                    padding: "2%"
                }} hidden={links}>
                    <TextField
                        id="inputlink"
                        label="Add link"
                        placeholder="Link"
                        value={Path}
                        onChange={handleChangeLink}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="gdDelimiter"
                        label="Enter Delimiter"
                        placeholder="eg: ;"
                        onChange={handleChangegdDelimiter}
                        error = {errorinfo}
                        value={gddelimiter}
                        helperText= 'Allowed: , ; |'
                        
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid style ={{
                    padding: "2%",
                    spacing: '10'
                }} hidden={dbc}>
                    <TextField
                        id="hostname"
                        label="Hostname"
                        placeholder="Enter Hostname"
                        value={Hostname}
                        onChange={handleChangeHost}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
            
                    <TextField
                        id="username"
                        label=" Enter Username"
                        placeholder="Enter username"
                        value={AccountName}
                        onChange={handleChangeAccountName}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
                     <TextField
                        id="password"
                        label="Password"
                        placeholder="Enter password"
                        value={AccountKey}
                        onChange={handleChangeAccountKey}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="sourcequery"
                        label="Source Query"
                        placeholder="Set Session Context"
                        value= {SourceQuery}
                        onChange={handleChangeQuery}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
            
                    <TextField
                        id="databasename"
                        label="Database Name"
                        placeholder="Enter database name"
                        value={LocationName}
                        onChange={handleChangeLocation}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
                     
                     <TextField
                        id="port"
                        label="Port"
                        placeholder="Enter Port Number"
                        value={Port}
                        onChange={handleChangePort}
                        type="number" 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid container style={{
                    padding: "2%"
                }} hidden={blob}>
                    <TextField
                        id="username"
                        label="Storage Account Name"
                        placeholder="Enter Storage Account Name"
                        value={AccountName}
                        onChange={handleChangeAccountName}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    /> 

                     <TextField
                        id="StorageAccountAccessKey"
                        label="Storage Account Access Key"
                        placeholder="Enter Access Key"
                        value={AccountKey}
                        onChange={handleChangeAccountKey}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
            
                     <TextField
                        id="container"
                        label="Container Name"
                        placeholder="Enter name"
                        value={LocationName}
                        onChange={handleChangeLocation}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        id="path"
                        label="Path"
                        placeholder="Enter path"
                        value={Path}
                        onChange={handleChangeLink}
                        multiline 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />
            
                    <TextField
                        id="format"
                        label="Format"
                        placeholder="Enter format"
                        value={TargetFileType}
                        onChange={handleChangeTargetFileType}
                        select 
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}>
                        {targetformats.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        id=""
                        label="Delimiter"
                        placeholder="eg: ;"
                        value={gddelimiter}
                        onChange={handleChangegdDelimiter}
                        disabled={Disabled}
                        helperText= 'Allowed: , ; |'
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    
                                </InputAdornment>
                            ),
                        }}
                    />

                </Grid>
            </form>

        <div>
           
            <Button variant="contained" color='primary' size="small" justify="flex-right" onClick = {(e)=>{
                            e.preventDefault();
                            handleSubmit();
                            // window.location.href = "/addSource";
                        }} disabled={Submitted} hidden={!Fresh}>Save Source </Button>
            <Button variant="contained" color='primary' size="small" justify="flex-right" onClick = {(e)=>{
                            e.preventDefault();
                            handleEdit();
                            
                        }} hidden={Fresh} disabled={Edited}>Update Source </Button>
        </div>
        </Paper>
    )
    }
    else{
        return(<div className={classes.progress} style={{marginLeft:"550px"}}>
        <CircularProgress />
      </div>)
    }

}