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

const formats = [
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

export default function AzureBlob(props){
    const classes = useStyles();
    const [StorageAccountAccessKey, setStorageAccountAccessKey] = React.useState('');
    const [StorageAccountName, setStorageAccountName] = React.useState('');
    const [ContainerName, setContainerName] = React.useState('');
    const [Path, setPath] = React.useState('');
    const [Format, setFormat] = React.useState('');
    const [blobDelimiter, setblobDelimiter] = React.useState('');
    const [Disabled, setDisabled] = React.useState(true)

    

    const handleChangeStorageAccountAccessKey= (event) => {
        setStorageAccountAccessKey(event.target.value);
    };

    const handleChangeStorageAccountName= (event) => {
        setStorageAccountName(event.target.value);
    };

    const handleChangeContainerName= (event) => {
        setContainerName(event.target.value);
    };

    const handleChangePath= (event) => {
        setPath(event.target.value);
    };

    const handleChangeblobDelimiter= (event) => {
        setblobDelimiter(event.target.value);
    };

    const handleChangeFormat= (event) => {
        setFormat(event.target.value);
        if (event.target.value==='csv') {
            setDisabled(false)
        }
        else{setDisabled(true)}
    };


    const handleAzureBlobOk =()=>{
        let data ={
            "StorageAccountAccessKey":StorageAccountAccessKey,
            "StorageAccountName":StorageAccountName,
            "StorageAccountName":StorageAccountName,
            "ContainerName":ContainerName,
            "Path":Path,
            "Format":Format,
            "blobDelimiter":blobDelimiter,
            "sourceQuery":""
        }

        props.onPassAzureBlob(data);
    }


    return(
        <form className={classes.root} noValidate autoComplete="off">
        <div>
                            <TextField
                                    id="StorageAccountAccessKey"
                                    label="Enter StorageAccountAccessKey"
                                    placeholder="StorageAccountAccessKey"
                                    onChange={handleChangeStorageAccountAccessKey}
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
                                    id=" StorageAccountName"
                                    label="Enter StorageAccountName"
                                    placeholder="StorageAccountName"
                                    onChange={handleChangeStorageAccountName}
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
                                    id=" ContainerName"
                                    label="Enter ContainerName"
                                    placeholder="ContainerName"
                                    onChange={handleChangeContainerName}
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
                                    id=" Path"
                                    label="Enter Path"
                                    placeholder="Path"
                                    onChange={handleChangePath}
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
                                    id="Format"
                                    select
                                    label="Enter Format"
                                    value={Format}
                                    onChange={handleChangeFormat}
                                    helperText="Please select the format"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <VerifiedUserIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                >
                                    {formats.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>

                            <div>
                            <TextField
                                    id=" blobDelimiter"
                                    label="Enter Delimiter"
                                    placeholder="Delimiter"
                                    disabled={Disabled}
                                    onChange={handleChangeblobDelimiter}
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
                                <Button variant="contained" color="primary" onClick={(e)=>{
                                    e.preventDefault();
                                    handleAzureBlobOk()
                                    }}>Ok</Button>
                            </div>
                            {/* AzureBlob parameter ends */}
                        </form>
    )
}