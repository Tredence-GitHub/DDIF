import React, { Component } from 'react'
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



const projects = [
    {
        value: 'project 1',
        label: 'project 1',
    },
    {
        value: 'project 2',
        label: 'project 2',
    },
    {
        value: 'project 3',
        label: 'project 3',
    },
    {
        value: 'project 4',
        label: 'project 4',
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



function Setup() {
    const classes = useStyles();
    const [project, setProject] = React.useState('');
    const [rationale, setRationale] = React.useState('');
    const [value, setValue] = React.useState('  ');
    const [value1, setValue1] = React.useState('  ');
    const [value2, setValue2] = React.useState('  ');
    const [sourcetype, setSourcetype] = React.useState('');


    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChange1 = (event) => {
        setValue1(event.target.value);
    };

    const handleChange2 = (event) => {
        setValue2(event.target.value);
    };


    const handleChangeProject= (event) => {
        setProject(event.target.value);
    };

    const handleChangeRationale= (event) => {
        setRationale(event.target.value);
    };

    const handleChangeSourcetype= (event) => {
        setSourcetype(event.target.value);
    };

    


    
    const formDisplay = () =>{
        if (sourcetype ==='One Drive') {
            return <Onedrive/>
        }
        else if(sourcetype ==='Google Drive'){
            return <Googledrive/>
        }
        else if(sourcetype ==='Mysql'){
            return <Mysql/>
        }
        else if(sourcetype ==='Hive'){
            return <Hive/>
        }
        else if(sourcetype ==='AzureBlob'){
            return <AzureBlob/>
        }
        else{
            return <div></div>
        }
        
    };

    return (
        <div className={classes.root} >
            <Grid container spacing={2} >
                <Grid item xs={6} container direction="column" alignItems="center"justify="center">
                    <Paper className={classes.paper}>
                    <Paper className={classes.paper} style={{ width: "500px", height:"400px"}}>
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
                                    helperText="Please select your Project"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VerifiedUserIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {projects.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
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
                <Grid item xs={6} container direction="column" alignItems="center"justify="center">
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
                                    {sources.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            {formDisplay()}

                        </form>

                    </Paper>
                    </Paper>
                </Grid>

            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={6} container direction="column" alignItems="center"justify="center">
                    <Paper className={classes.paper}>
                    <Paper className={classes.paper} style={{ width: "500px", height:"300px"}}>
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

                    </Paper>
                    </Paper>

                </Grid>
                <Grid item xs={6} container direction="column" alignItems="center" justify="center">
                    <Paper className={classes.paper}>
                    <Paper className={classes.paper} style={{ width: "500px", height:"300px"}}>
                        <strong>Additional Information</strong>
                        <hr/>
                        <Typography>Does dataset have any known PII/PHI Information</Typography>
                        <FormControl component="fieldset">
                            {/* <FormLabel component="legend">Does dataset have any known PII/PHI Information</FormLabel> */}
                            <RadioGroup aria-label="pii" name="pii" value={value1} onChange={handleChange1} row>
                                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                                <FormControlLabel value="No" control={<Radio />} label="No" />
                            </RadioGroup>
                        </FormControl>
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
                <Grid item xs={12} direction="column" container justify="flex-end" alignItems="flex-end">
                    <Button variant="outlined" color='primary' href="/ingestion/metadata" >Next</Button>
                </Grid>

            </Grid>
        </div>
    );
}

export default Setup;