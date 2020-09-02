import React, { Component, useState, useEffect } from 'react'
import ReactDom from 'react-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import {useSnackbar} from 'notistack';

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

const scheduletypes = [
    {
        value: 'minute',
        label: 'minute',
    },
    {
        value: 'hourly',
        label: 'hourly',
    },
    {
        value: 'daily',
        label: 'daily',
    },
    {
        value: 'weekly',
        label: 'weekly',
    },
];

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
    const [sourceConnection, setsourceConnection] = React.useState('');
    const [targetConnection, settargetConnection] = React.useState('');

    // check old connection with new
    const [oldsourceConnection, setoldsourceConnection] = React.useState('');
    const [oldtargetConnection, setoldtargetConnection] = React.useState('');

    const [sourcetypeId, setSourcetypeId] = React.useState('');
    const [targettype, setTargettype] = React.useState('');
    const [targettypeAbbrv, setTargettypeAbbrv] = React.useState('');
    const [expanded, setExpanded] = React.useState('panel1');
    const [sourceParams, setsourceParams] = React.useState({});
    const [targetParams, settargetParams] = React.useState({});
    const [scheduleParams, setscheduleParams] = React.useState({});
    const [dropDownProject, setdropDownProject] = useState({})
    const [dropDownSource, setdropDownSource] = useState({})
    const [dropDownTarget, setdropDownTarget] = useState({})
    const [dropDownSourceConnection, setdropDownSourceConnection] = useState({})
    const [dropDownTargetConnection, setdropDownTargetConnection] = useState({})
    const [sourceSecondDropdown, setsourceSecondDropdown] = useState({})
    const [targetSecondDropdown, settargetSecondDropdown] = useState({})
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');

    const [odlink, setodLink] = React.useState('');
    const [oddelimiter, setodDelimiter] = React.useState('');
    const [fileid, setFileid] = React.useState('');
    const [gddelimiter, setgdDelimiter] = React.useState('');
    const [jdbcHostname, setjdbcHostname] = React.useState('');
    const [jdbcUsername, setjdbcUsername] = React.useState('');
    const [jdbcPassword, setjdbcPassword] = React.useState('');
    const [jdbcDatabaseName, setjdbcDatabaseName] = React.useState('');
    const [jdbcsourceQuery, setjdbcsourceQuery] = React.useState('');
    const [odbcHostname, setodbcHostname] = React.useState('');
    const [odbcUsername, setodbcUsername] = React.useState('');
    const [odbcPassword, setodbcPassword] = React.useState('');
    const [odbcDatabaseName, setodbcDatabaseName] = React.useState('');
    const [odbcsourceQuery, setodbcsourceQuery] = React.useState('');
    const [StorageAccountAccessKey, setStorageAccountAccessKey] = React.useState('');
    const [StorageAccountName, setStorageAccountName] = React.useState('');
    const [ContainerName, setContainerName] = React.useState('');
    const [Path, setPath] = React.useState('');
    const [Format, setFormat] = React.useState('');
    const [blobDelimiter, setblobDelimiter] = React.useState('');
    const [Disabled, setDisabled] = React.useState(true)
    const [ApplicationID, setApplicationID] = React.useState('');
    const [ApplicationCredential, setApplicationCredential] = React.useState('');
    const [DirectoryID, setDirectoryID] = React.useState('');
    const [adlAccountName, setadlAccountName] = React.useState('');
    const [TargetFileType, setTargetFileType] = React.useState('');
    const [TargetFileDelimiter, setTargetFileDelimiter] = React.useState('');
    const [ApplicationID2, setApplicationID2] = React.useState('');
    const [ApplicationCredential2, setApplicationCredential2] = React.useState('');
    const [DirectoryID2, setDirectoryID2] = React.useState('');
    const [adlAccountName2, setadlAccountName2] = React.useState('');
    const [TargetFileType2, setTargetFileType2] = React.useState('');
    const [TargetFileDelimiter2, setTargetFileDelimiter2] = React.useState('');
    const [jdbcHostname2, setjdbcHostname2] = React.useState('');
    const [jdbcUsername2, setjdbcUsername2] = React.useState('');
    const [jdbcPassword2, setjdbcPassword2] = React.useState('');
    const [jdbcDatabaseName2, setjdbcDatabaseName2] = React.useState('');
    const [jdbcsourceQuery2, setjdbcsourceQuery2] = React.useState('');
    // const [startTime, setStartTime] = React.useState(new Date().toISOString());
    const [selectedTime, setSelectedTime] = React.useState();
    const [scheduleType, setscheduleType] = React.useState('');
    const [hours_minutes, setHoursMinutes] = React.useState(0);
    const [weeks, setWeeks] = React.useState('');
    const [startDate, setStartDate] = React.useState();
    const [endDate, setEndDate] = React.useState();

    const [hiddenOneDrive, sethiddenOneDrive] = React.useState(true);
    const [hiddenGoogleDrive, sethiddenGoogleDrive] = React.useState(true);
    const [hiddenMysql, sethiddenMysql] = React.useState(true);
    const [hiddenHive, sethiddenHive] = React.useState(true);
    const [hiddenAzureBlob, sethiddenAzureBlob] = React.useState(true);
    const [hiddenADLS1, sethiddenADLS1] = React.useState(true);
    const [hiddenADLS2, sethiddenADLS2] = React.useState(true);
    const [hiddenAzureSql, sethiddenAzureSql] = React.useState(true);
    const [hiddenOneTime, sethiddenOneTime] = React.useState(true);
    const [hiddenFixedSchedule, sethiddenFixedSchedule] = React.useState(true);
    const [hiddenminute, setHiddenMinute] = React.useState("none");
    const [hiddenhour, setHiddenHour] = React.useState("none");
    const [hiddenday, setHiddenDay] = React.useState("none");
    const [hiddenweek, setHiddenWeek] = React.useState("none");
    const [entryId, setEntryId] = React.useState(0);

    const {enqueueSnackbar} = useSnackbar();
    let local = 'http://localhost:4000';

    function getInfo() {
        Promise.all(
            [Axios.get(`${local}/ingestion/getDropdowns`),

            ]).then((res) => {
                return [res]
            })
            .then((response) => {
                console.log("RESPONSE -- ", response[0][0].status)
                console.log(response)
                if (response[0][0].status === 200) {
                    setdropDownProject(response[0][0].data.data.project_types);
                    setdropDownSource(response[0][0].data.data.data_sources);
                    setdropDownTarget(response[0][0].data.data.data_targets);
                    let sources = [];
                    let targets = [];
                    response[0][0].data.data.connection_types.map((item, index) => {
                        if (item.type === 'source') {
                            sources.push(item)
                        } else {
                            targets.push(item)
                        }
                    })
                    setdropDownSourceConnection(sources)
                    setdropDownTargetConnection(targets)
                    setsourceSecondDropdown(sources)
                    settargetSecondDropdown(targets)

                    // setsourceParams(response[0][0].data.data.connection_types)
                    console.log(response[0][0].data.data.connection_types)

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

    function getEdit(entryid) {
        // let entryid = props.entryid;
        console.log(entryid, "Edit Mode");
        Promise.all(
            [Axios.get(`${local}/ingestion/api/getEntryData/${entryid}`),
            // [Axios.get(`${local}/ingestion/api/getEntryData/52`),
            Axios.get(`${local}/ingestion/getDropdowns`)

            ]).then((res) => {
                return [res]
            })
            .then((response) => {
                // console.log("RESPONSE -- ", response[0][0].status)
                console.log(response)
                if ((response[0][0].status === 200) && (response[0][1].status === 200)) {

                    let sources = [];
                    let targets = [];
                    response[0][1].data.data.connection_types.map((item, index) => {
                        if (item.type === 'source') {
                            sources.push(item)
                        } else {
                            targets.push(item)
                        }
                    })

                    // console.log(response[0][1].data.data.connection_types, "000")
                    setdropDownSourceConnection(sources)
                    setdropDownTargetConnection(targets)
                    setsourceSecondDropdown(sources)
                    settargetSecondDropdown(targets)

                    setdropDownProject(response[0][1].data.data.project_types);
                    setdropDownSource(response[0][1].data.data.data_sources);
                    setdropDownTarget(response[0][1].data.data.data_targets);
                    setjobTitle(response[0][0].data.data[0].projectname)
                    setProject(response[0][0].data.data[0].project_type)
                    setRationale(response[0][0].data.data[0].rationale)
                    setSourcetype(response[0][0].data.data[0].source_type)
                    response[0][1].data.data.data_sources.map((item,index)=>{
                        if(item.typeId===response[0][0].data.data[0].source_type){
                            setSourcetypeAbbrv(item.abbrv)
                        }
                    })
                    setTargettype(response[0][0].data.data[0].target_type)
                    response[0][1].data.data.data_targets.map((item,index)=>{
                        if(item.typeId===response[0][0].data.data[0].target_type){
                            setTargettypeAbbrv(item.abbrv)
                        }
                    })
                    // console.log(response[0][0].data.data[0].Parameter.SourceParameter)
                    setValue(response[0][0].data.data[0].Schedule.schedule_type)
                    setSelectedTime(new Date(response[0][0].data.data[0].Schedule.start_time))
                    // setSelectedTime(new Date(new Date(response[0][0].data.data[0].Schedule.start_time).toGMTString()));
                    console.log(new Date(new Date(response[0][0].data.data[0].Schedule.start_time).toGMTString()));
                    setscheduleType(response[0][0].data.data[0].Schedule.recurrence_type)
                    setHoursMinutes((response[0][0].data.data[0].Schedule.recurrence))
                    setWeeks(response[0][0].data.data[0].Schedule.days)
                    setStartDate(response[0][0].data.data[0].Schedule.start_date)
                    setEndDate(response[0][0].data.data[0].Schedule.end_date)
                    setValue2(response[0][0].data.data[0].operation)
                    setsourceParams(JSON.parse(response[0][0].data.data[0].Parameter.SourceParameter));
                    let SourceParameters = JSON.parse(response[0][0].data.data[0].Parameter.SourceParameter);
                    // console.log(SourceParameters.type, "AA");

                    setodLink(SourceParameters.path)
                    setFileid(SourceParameters.path)
                    setgdDelimiter(SourceParameters.delimiter)
                    setodDelimiter(SourceParameters.delimiter)
                    setjdbcHostname(SourceParameters.hostname)
                    setjdbcUsername(SourceParameters.account_name)
                    setjdbcPassword(SourceParameters.account_key)
                    setjdbcDatabaseName(SourceParameters.location_name)
                    setjdbcsourceQuery(SourceParameters.source_query)
                    setodbcHostname(SourceParameters.hostname)
                    setodbcUsername(SourceParameters.account_name)
                    setodbcPassword(SourceParameters.account_key)
                    setodbcDatabaseName(SourceParameters.location_name)
                    setodbcsourceQuery(SourceParameters.source_query)
                    setStorageAccountAccessKey(SourceParameters.account_key)
                    setStorageAccountName(SourceParameters.account_name)
                    setContainerName(SourceParameters.location_name)
                    setPath(SourceParameters.path)
                    setFormat(SourceParameters.file_type)
                    setblobDelimiter(SourceParameters.delimiter)
                    setsourceConnection(SourceParameters.connection_name)
                    setoldsourceConnection(SourceParameters.connection_name)

                    let sourcesecondDropdown = []

                    response[0][1].data.data.connection_types.map((item1, index1) => {
                        if ((item1.type === "source") && (response[0][0].data.data[0].source_type == item1.type_id)) {
                            sourcesecondDropdown.push(item1);
                        }
                    })

                    setsourceSecondDropdown(sourcesecondDropdown)
                    if (response[0][0].data.data[0].source_type === 5) {
                        sethiddenOneDrive(false)
                        sethiddenGoogleDrive(true)
                        sethiddenMysql(true)
                        sethiddenHive(true)
                        sethiddenAzureBlob(true)
                    }
                    else if (response[0][0].data.data[0].source_type === 2) {
                        sethiddenOneDrive(true)
                        sethiddenGoogleDrive(false)
                        sethiddenMysql(true)
                        sethiddenHive(true)
                        sethiddenAzureBlob(true)
                    }
                    else if (response[0][0].data.data[0].source_type === 4) {
                        sethiddenOneDrive(true)
                        sethiddenGoogleDrive(true)
                        sethiddenMysql(false)
                        sethiddenHive(true)
                        sethiddenAzureBlob(true)
                    }
                    else if (response[0][0].data.data[0].source_type === 3) {
                        sethiddenOneDrive(true)
                        sethiddenGoogleDrive(true)
                        sethiddenMysql(true)
                        sethiddenHive(false)
                        sethiddenAzureBlob(true)
                    }
                    else {
                        sethiddenOneDrive(true)
                        sethiddenGoogleDrive(true)
                        sethiddenMysql(true)
                        sethiddenHive(true)
                        sethiddenAzureBlob(false)
                    }



                    let targetsecondDropdown = []

                    response[0][1].data.data.connection_types.map((item1, index1) => {
                        if ((item1.type === "target") && (response[0][0].data.data[0].target_type == item1.type_id)) {
                            targetsecondDropdown.push(item1);
                        }
                    })
                    settargetSecondDropdown(targetsecondDropdown)

                    if (response[0][0].data.data[0].target_type === 1) {
                        sethiddenADLS1(false)
                        sethiddenADLS2(true)
                        sethiddenAzureSql(true)
                    }
                    else if (response[0][0].data.data[0].target_type === 2) {
                        sethiddenADLS1(true)
                        sethiddenADLS2(false)
                        sethiddenAzureSql(true)
                    }
                    else {
                        sethiddenADLS1(true)
                        sethiddenADLS2(true)
                        sethiddenAzureSql(false)
                    }


                    if(response[0][0].data.data[0].Schedule.schedule_type==="One-Time"){
                        sethiddenFixedSchedule(true)
                        sethiddenOneTime(false)
                    }
                    else if(response[0][0].data.data[0].Schedule.schedule_type==="Fixed Schedule"){
                        sethiddenFixedSchedule(false)
                        sethiddenOneTime(true)
                    }
                    else{
                        sethiddenFixedSchedule(true)
                        sethiddenOneTime(true)
                    }
                    //////////////////////////////////////////////////////

                    if (response[0][0].data.data[0].Schedule.recurrence_type=== "minute") {
                        setHiddenHour("none")
                        setHiddenDay("none")
                        setHiddenWeek("none")
                        setHiddenMinute("block")
            
                    }
                    else if (response[0][0].data.data[0].Schedule.recurrence_type === "hourly") {
                        setHiddenMinute("none")
                        setHiddenDay("none")
                        setHiddenWeek("none")
                        setHiddenHour("block")
            
                    }
                    else if (response[0][0].data.data[0].Schedule.recurrence_type === "daily") {
                        setHiddenMinute("none")
                        setHiddenHour("none")
                        setHiddenWeek("none")
                        setHiddenDay("block")
                    }
                    else {
                        setHiddenMinute("none")
                        setHiddenHour("none")
                        setHiddenDay("none")
                        setHiddenWeek("block")
                    }




                    settargetParams(JSON.parse(response[0][0].data.data[0].Parameter.TargetParameter))
                    let TargetParameters = JSON.parse(response[0][0].data.data[0].Parameter.TargetParameter);

                    setApplicationID(TargetParameters.hostname)
                    setApplicationCredential(TargetParameters.account_key)
                    setDirectoryID(TargetParameters.location_name)
                    setadlAccountName(TargetParameters.account_name)
                    setTargetFileType(TargetParameters.file_type)
                    setTargetFileDelimiter(TargetParameters.delimiter)
                    setApplicationID2(TargetParameters.hostname)
                    setApplicationCredential2(TargetParameters.account_key)
                    setDirectoryID2(TargetParameters.location_name)
                    setadlAccountName2(TargetParameters.account_name)
                    setTargetFileType2(TargetParameters.file_type)
                    setTargetFileDelimiter2(TargetParameters.delimiter)
                    setjdbcHostname2(TargetParameters.hostname)
                    setjdbcUsername2(TargetParameters.account_name)
                    setjdbcPassword2(TargetParameters.account_key)
                    setjdbcDatabaseName2(TargetParameters.location_name)
                    setjdbcsourceQuery2(TargetParameters.source_query)
                    settargetConnection(TargetParameters.connection_name)
                    setoldtargetConnection(TargetParameters.connection_name)

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
        console.log(window.location.href.split('/'))
        if((window.location.href.split('/').length === 4) && (props.entryid === 0) ){
            getInfo();
        }else if(props.entryid>0)
        {
            setEntryId(props.entryid)
            getEdit(props.entryid);

        }
        else if(window.location.href.split('/').length>4)
        {   setEntryId(window.location.href.split('/')[4])
            getEdit(window.location.href.split('/')[4]);
        }

        // if (props.entryid === 0) {
        //     getInfo();
        // }
        // else {
        //     getEdit();
        // }
        // getEdit()

    }, [])


    const handleChangeodLink = (event) => {
        setodLink(event.target.value);
    };

    const handleChangeodDelimiter = (event) => {
        setodDelimiter(event.target.value);
        // if ((event.target.value !== ',') && (event.target.value !== ';')) {
        //     seterrorinfo(true)
        //     seterror("Invalid Delimiter")
        // }
        // else {
        //     seterrorinfo(false)
        //     seterror("")
        // }

    };

    const handleChangeFileid = (event) => {
        setFileid(event.target.value);
    };
    const handleChangegdDelimiter = (event) => {
        setgdDelimiter(event.target.value);
        // if ((event.target.value !== ',') && (event.target.value !== ';')) {
        //     seterrorinfo(true)
        //     seterror("Invalid Delimiter")
        // }
        // else {
        //     seterrorinfo(false)
        //     seterror("")
        // }
    };

    const handleChangejdbcHostname = (event) => {
        setjdbcHostname(event.target.value);
    };

    const handleChangejdbcUsername = (event) => {
        setjdbcUsername(event.target.value);
    };

    const handleChangejdbcPassword = (event) => {
        setjdbcPassword(event.target.value);
    };

    const handleChangejdbcDatabaseName = (event) => {
        setjdbcDatabaseName(event.target.value);
    };

    const handleChangejdbcsourceQuery = (event) => {
        setjdbcsourceQuery(event.target.value);
    };

    const handleChangeodbcHostname = (event) => {
        setodbcHostname(event.target.value);
    };

    const handleChangeodbcUsername = (event) => {
        setodbcUsername(event.target.value);
    };

    const handleChangeodbcPassword = (event) => {
        setodbcPassword(event.target.value);
    };

    const handleChangeodbcDatabaseName = (event) => {
        setodbcDatabaseName(event.target.value);
    };

    const handleChangeodbcsourceQuery = (event) => {
        setodbcsourceQuery(event.target.value);
    };

    const handleChangeStorageAccountAccessKey = (event) => {
        setStorageAccountAccessKey(event.target.value);
    };

    const handleChangeStorageAccountName = (event) => {
        setStorageAccountName(event.target.value);
    };

    const handleChangeContainerName = (event) => {
        setContainerName(event.target.value);
    };

    const handleChangePath = (event) => {
        setPath(event.target.value);
    };

    const handleChangeblobDelimiter = (event) => {
        setblobDelimiter(event.target.value);
    };

    const handleChangeFormat = (event) => {
        setFormat(event.target.value);
        if (event.target.value === 'csv') {
            setDisabled(false)
        }
        else { setDisabled(true) }
    };

    // Target

    const handleChangeApplicationID = (event) => {
        setApplicationID(event.target.value);
    };

    const handleChangeApplicationCredential = (event) => {
        setApplicationCredential(event.target.value);
    };

    const handleChangeDirectoryID = (event) => {
        setDirectoryID(event.target.value);
    };

    const handleChangeadlAccountName = (event) => {
        setadlAccountName(event.target.value);
    };

    const handleChangeTargetFileDelimiter = (event) => {
        setTargetFileDelimiter(event.target.value);

        // if ((event.target.value !== ',') && (event.target.value !== ';')) {
        //     seterrorinfo(true)
        //     seterror("Invalid Delimiter")
        // }
        // else {
        //     seterrorinfo(false)
        //     seterror("")
        // }
    };

    const handleChangeTargetFileType = (event) => {
        setTargetFileType(event.target.value);
        if (event.target.value === 'csv') {
            setDisabled(false)
        }
        else { setDisabled(true) }
    };

    // ADLS Gen 2
    const handleChangeApplicationID2 = (event) => {
        setApplicationID2(event.target.value);
    };

    const handleChangeApplicationCredential2 = (event) => {
        setApplicationCredential2(event.target.value);
    };

    const handleChangeDirectoryID2 = (event) => {
        setDirectoryID2(event.target.value);
    };

    const handleChangeadlAccountName2 = (event) => {
        setadlAccountName2(event.target.value);
    };

    const handleChangeTargetFileDelimiter2 = (event) => {
        setTargetFileDelimiter2(event.target.value);

        // if ((event.target.value !== ',') && (event.target.value !== ';')) {
        //     seterrorinfo(true)
        //     seterror("Invalid Delimiter")
        // }
        // else {
        //     seterrorinfo(false)
        //     seterror("")
        // }
    };

    const handleChangeTargetFileType2 = (event) => {
        setTargetFileType2(event.target.value);
        if (event.target.value === 'csv') {
            setDisabled(false)
        }
        else { setDisabled(true) }
    };
    // Azure sql

    const handleChangejdbcHostname2 = (event) => {
        setjdbcHostname2(event.target.value);
    };

    const handleChangejdbcUsername2 = (event) => {
        setjdbcUsername2(event.target.value);
    };

    const handleChangejdbcPassword2 = (event) => {
        setjdbcPassword2(event.target.value);
    };

    const handleChangejdbcDatabaseName2 = (event) => {
        setjdbcDatabaseName2(event.target.value);
    };

    const handleChangejdbcsourceQuery2 = (event) => {
        setjdbcsourceQuery2(event.target.value);
    };




    // const handleTimeChangeOneTime = (date) => {
    //     setStartTime(date);
    //     // console.log(startTime)
    // };

    // const handleTimeChange = (date) => {
    //     setSelectedTime(date);
    // };

    const handleTimeChange = (time) => {
        console.log(time);
        setSelectedTime(time);
    };

    const handleChangescheduleType = (event) => {
        setscheduleType(event.target.value);

        if (event.target.value === "minute") {
            setHiddenHour("none")
            setHiddenDay("none")
            setHiddenWeek("none")
            setHiddenMinute("block")

        }
        else if (event.target.value === "hourly") {
            setHiddenMinute("none")
            setHiddenDay("none")
            setHiddenWeek("none")
            setHiddenHour("block")

        }
        else if (event.target.value === "daily") {
            setHiddenMinute("none")
            setHiddenHour("none")
            setHiddenWeek("none")
            setHiddenDay("block")
        }
        else {
            setHiddenMinute("none")
            setHiddenHour("none")
            setHiddenDay("none")
            setHiddenWeek("block")
        }
    };

    const handleChangehoursminutes = (event) => {
        setHoursMinutes(event.target.value);
    };

    const handleChangeweek = (event) => {
        setWeeks(event.target.value);
    };

    const handleChangeStartDate = (date) => {
        setStartDate(date);
    };

    const handleChangeEndDate = (date) => {
        setEndDate(date);
    };


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

    const handleChangeSchedule = (event) => {
        setValue(event.target.value);
        console.log(event.target.value,"QQQ")
        if(event.target.value==="One-Time"){
            sethiddenFixedSchedule(true)
            sethiddenOneTime(false)
        }
        else if(event.target.value==="Fixed Schedule"){
            sethiddenFixedSchedule(false)
            sethiddenOneTime(true)
        }
        else{
            sethiddenFixedSchedule(true)
            sethiddenOneTime(true)
        }
    };

    // const handleChange1 = (event) => {
    //     setValue1(event.target.value);
    // };

    const handleChange2 = (event) => {
        setValue2(event.target.value);
    };


    const handleChangeProject = (event) => {
        setProject(event.target.value);
        console.log(event.target.value);
    };

    const handleChangejobTitle = (event) => {
        setjobTitle(event.target.value);
        console.log(jobTitle)
    };

    const handleChangeRationale = (event) => {
        setRationale(event.target.value);
    };

    const handleChangeSourcetype = (event) => {
        setSourcetype(event.target.value);
        let sourcesecondDropdown = [];
        dropDownSource.map((item, index) => {
            if (item.typeId === event.target.value) {
                setSourcetypeAbbrv(item.abbrv);

                dropDownSourceConnection.map((item1, index1) => {
                    if (item1.type_id == event.target.value) {
                        sourcesecondDropdown.push(item1);
                    }
                })
            }
        })
        setsourceSecondDropdown(sourcesecondDropdown);

    };



    const handleChangeSourceConnectiontype = (event) => {
        setsourceConnection(event.target.value);

        dropDownSourceConnection.map((item1, index1) => {
            if (item1.connection_name === event.target.value) {
                // sourcesecondDropdown.push(item1);
                setsourceParams(item1)
                setodLink(item1.path)
                setFileid(item1.path)
                setgdDelimiter(item1.delimiter)
                setodDelimiter(item1.delimiter)
                setjdbcHostname(item1.hostname)
                setjdbcUsername(item1.account_name)
                setjdbcPassword(item1.account_key)
                setjdbcDatabaseName(item1.location_name)
                setjdbcsourceQuery(item1.source_query)
                setodbcHostname(item1.hostname)
                setodbcUsername(item1.account_name)
                setodbcPassword(item1.account_key)
                setodbcDatabaseName(item1.location_name)
                setodbcsourceQuery(item1.source_query)
                setStorageAccountAccessKey(item1.account_key)
                setStorageAccountName(item1.account_name)
                setContainerName(item1.location_name)
                setPath(item1.path)
                setFormat(item1.file_type)
                setblobDelimiter(item1.delimiter)
                // console.log(item1,"00000");
            }

        })
        if (sourcetype === 5) {
            sethiddenOneDrive(false)
            sethiddenGoogleDrive(true)
            sethiddenMysql(true)
            sethiddenHive(true)
            sethiddenAzureBlob(true)

        }
        else if (sourcetype === 2) {
            sethiddenOneDrive(true)
            sethiddenGoogleDrive(false)
            sethiddenMysql(true)
            sethiddenHive(true)
            sethiddenAzureBlob(true)
        }
        else if (sourcetype === 4) {
            sethiddenOneDrive(true)
            sethiddenGoogleDrive(true)
            sethiddenMysql(false)
            sethiddenHive(true)
            sethiddenAzureBlob(true)
        }
        else if (sourcetype === 3) {
            sethiddenOneDrive(true)
            sethiddenGoogleDrive(true)
            sethiddenMysql(true)
            sethiddenHive(false)
            sethiddenAzureBlob(true)
        }
        else if (sourcetype === 6) {
            sethiddenOneDrive(true)
            sethiddenGoogleDrive(true)
            sethiddenMysql(false)
            sethiddenHive(true)
            sethiddenAzureBlob(true)
        }
        else {
            sethiddenOneDrive(true)
            sethiddenGoogleDrive(true)
            sethiddenMysql(true)
            sethiddenHive(true)
            sethiddenAzureBlob(false)
        }

        // console.log(event.target.value);
    };

    const handleChangeTargettype = (event) => {
        setTargettype(event.target.value);
        let targetsecondDropdown = [];

        dropDownTarget.map((item, index) => {
            if (item.typeId === event.target.value) {
                console.log(item.abbrv);
                setTargettypeAbbrv(item.abbrv);
                dropDownTargetConnection.map((item1, index1) => {
                    if (item1.type_id == event.target.value) {
                        targetsecondDropdown.push(item1);
                        settargetParams(item1)
                    }
                })
            }
        })

        settargetSecondDropdown(targetsecondDropdown);

    };

    const handleChangeTargetConnectiontype = (event) => {
        settargetConnection(event.target.value);
        // console.log(event.target.value);
        if (targettype === 1) {
            sethiddenADLS1(false)
            sethiddenADLS2(true)
            sethiddenAzureSql(true)
        }
        else if (targettype === 2) {
            sethiddenADLS1(true)
            sethiddenADLS2(false)
            sethiddenAzureSql(true)
        }
        else {
            sethiddenADLS1(true)
            sethiddenADLS2(true)
            sethiddenAzureSql(false)
        }

        dropDownTargetConnection.map((item1, index1) => {
            if (item1.connection_name === event.target.value) {
                // sourcesecondDropdown.push(item1);
                settargetParams(item1)
                setApplicationID(item1.hostname)
                setApplicationCredential(item1.account_key)
                setDirectoryID(item1.location_name)
                setadlAccountName(item1.account_name)
                setTargetFileType(item1.file_type)
                setTargetFileDelimiter(item1.delimiter)
                setApplicationID2(item1.hostname)
                setApplicationCredential2(item1.account_key)
                setDirectoryID2(item1.location_name)
                setadlAccountName2(item1.account_name)
                setTargetFileType2(item1.file_type)
                setTargetFileDelimiter2(item1.delimiter)
                setjdbcHostname(item1.hostname)
                setjdbcUsername(item1.account_name)
                setjdbcPassword(item1.account_key)
                setjdbcDatabaseName(item1.location_name)
                setjdbcsourceQuery(item1.source_query)
                // console.log(item1,"***");
            }
        })
    };


    // const handleOnedrive = (data) => {
    //     setsourceParams(data)
    // }
    // const handleGoogleDrive = (data) => {
    //     setsourceParams(data)
    // }
    // const handleMysql = (data) => {
    //     setsourceParams(data)
    // }
    // const handleHive = (data) => {
    //     setsourceParams(data)
    // }
    // const handleAzureBlob = (data) => {
    //     setsourceParams(data)
    // }
    // target
    // const handleADLSGenOne = (data) => {
    //     settargetParams(data)
    // }
    // const handleADLSGenTwo = (data) => {
    //     settargetParams(data)
    // }

    //Scheduler
    const handleOneTimeSchedule = (data) => {
        setscheduleParams(data)
    }

    const handleFixedSchedule = (data) => {
        setscheduleParams(data)
        // console.log(data,"8888888888");
    }
    const handleOnDemandSchedule = (data) => {
        setscheduleParams(data)
        // console.log(data,"8888888888");
    }



    // const sourceFormDisplay = () => {
    //     if (sourcetype === 5) {
    //         return <Onedrive onPassOneDrive={handleOnedrive} />
    //     }
    //     else if (sourcetype === 2) {
    //         return <Googledrive onPassGoogleDrive={handleGoogleDrive} />
    //     }
    //     else if (sourcetype === 4) {
    //         return <Mysql onPassMysql={handleMysql} />
    //     }
    //     else if (sourcetype === 3) {
    //         return <Hive onPassHive={handleHive} />
    //     }
    //     else if (sourcetype === 1) {
    //         return <AzureBlob onPassAzureBlob={handleAzureBlob} />
    //     }
    //     else {
    //         return <div></div>
    //     }

    // };

    // const targetFormDisplay = () => {
    //     if (targettype === 1) {
    //         return <ADLSGenOne onPassADLSGenOne={handleADLSGenOne} />
    //     }
    //     else if (targettype === 2) {
    //         return <ADLSGenTwo onPassADLSGenTwo={handleADLSGenTwo} />
    //     }
    //     else if (targettype === 3) {
    //         return <div></div>
    //     }
    //     else {
    //         return <div></div>
    //     }

    // };

    // const isFormValidation = () => {
    //     // console.log(project,jobTitle ,rationale ,sourcetype ,targettype ,value, value2, Object.keys(sourceParams)[0], targetParams) ;
    //     // console.log(project>0 && jobTitle.length>0 && rationale.length>0 && sourcetype>0 && targettype>0 && value.length>0 && value2.length>0 && Object.keys(sourceParams)[0].length>0 && Object.keys(targetParams)[0].length>0);
    //     return project > 0 && jobTitle.length > 0 && rationale.length > 0 && sourcetype > 0 && targettype > 0 && value.length > 0 && value2.length > 0 && Object.keys(sourceParams)[0].length > 0 && Object.keys(targetParams)[0].length > 0
    // };
    // console.log(sourceParams,"5%%%")

    // const ScheduleDisplay = () => {
    //     if (value === 'On-Demand') {
    //         return <OnDemand onPassOnDemandSchedule={handleOnDemandSchedule} />
    //     }
    //     else if (value === 'One-Time') {
    //         return <OneTime onPassOneTimeSchedule={handleOneTimeSchedule} />
    //     }
    //     else if (value === 'Fixed Schedule') {
    //         return <FixedSchedule onPassFixedSchedule={handleFixedSchedule} />
    //     }
    //     else {
    //         return <div></div>
    //     }

    // };

    const passParam = () => {

        let param = {
            username: localStorage.getItem('username'),
            rationale: rationale,
            project_type: project,
            jobname: "",
            projectname: jobTitle,
            created_by: localStorage.getItem('username'),
            created_at: new Date(),
            source_type: sourcetype,
            target_type: targettype,
            operation: value2,
            status: 'draft',
            updated_at: new Date(),
            updated_by: localStorage.getItem('username'),
            source_abbrv: sourcetypeAbbrv,
            target_abbrv: targettypeAbbrv,
            source_parameter: sourceParams,
            target_parameter: targetParams,
            source_query: sourceParams.source_query,
            target_file_type: targetParams.file_type,
            target_file_delimiter: targetParams.delimiter,
            schedule_type: value,
            recurrence_type: scheduleType,
            recurrence: Number(hours_minutes),
            days: weeks,
            start_time: selectedTime,
            start_date: startDate,
            end_date: endDate
            // recurrence_type: scheduleParams.scheduleType,
            // recurrence: Number(scheduleParams.hours_minutes),
            // days: scheduleParams.weeks,
            // start_time: scheduleParams.selectedTime,
            // start_date: scheduleParams.startDate,
            // end_date: scheduleParams.endDate
        }
        // console.log(param)
        // console.log(typeof(param.start_date))
        props.onPassSetup(param,'save')

        //API
    }

    const passEditParam = () => {
        let param = {
            username: localStorage.getItem('username'),
            rationale: rationale,
            project_type: project,
            jobname: "",
            projectname: jobTitle,
            created_by: localStorage.getItem('username'),
            created_at: new Date(),
            source_type: sourcetype,
            target_type: targettype,
            operation: value2,
            status: 'draft',
            updated_at: new Date(),
            updated_by: localStorage.getItem('username'),
            source_abbrv: sourcetypeAbbrv,
            target_abbrv: targettypeAbbrv,
            source_parameter: sourceParams,
            target_parameter: targetParams,
            source_query: sourceParams.source_query,
            target_file_type: targetParams.file_type,
            target_file_delimiter: targetParams.delimiter,
            schedule_type: value,
            recurrence_type: scheduleType,
            recurrence: Number(hours_minutes),
            days: weeks,
            start_time: selectedTime,
            start_date: startDate,
            end_date: endDate,
            entryId: entryId
            // recurrence_type: scheduleParams.scheduleType,
            // recurrence: Number(scheduleParams.hours_minutes),
            // days: scheduleParams.weeks,
            // start_time: scheduleParams.selectedTime,
            // start_date: scheduleParams.startDate,
            // end_date: scheduleParams.endDate
        }
        // console.log(param)
        // console.log(typeof(param.start_date))
        if(oldsourceConnection === sourceConnection){
            props.onPassSetup(param,'edit')
        }else{
            props.onPassSetup(param, 'saveEdit')
        }

        //API
    }

    const isFormValid = () => {
        if ((project > 0 && jobTitle.length > 0 && rationale.length > 0 
                && sourcetype > 0 && targettype > 0 && value.length > 0 
                && value2.length > 0 && Object.keys(sourceParams)[0].length > 0 
                && Object.keys(targetParams)[0].length > 0) === true) {
            passParam();
        }
        else{
            // handleOpen()
            // setMsg("Please Fill All the Details!")
            enqueueSnackbar('Please Fill All the Details!',{
                variant: 'warning',
            })
        }
    };

    const isFormValidEdit = () => {
        if ((project > 0 && jobTitle.length > 0 && rationale.length > 0 
                && sourcetype > 0 && targettype > 0 && value.length > 0 
                && value2.length > 0 && Object.keys(sourceParams)[0].length > 0 
                && Object.keys(targetParams)[0].length > 0) === true) {
            passEditParam();
        }
        else{
            // handleOpen()
            // setMsg("Please Fill All the Details!")
            enqueueSnackbar('Please Fill All the Details!',{
                variant: 'warning',
            })
        }
    };


    if (!loading) {
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

                <Grid container direction="column"
                    alignItems="center"
                    justify="center">
                    <Paper className={classes.paper} style={{width:"1148px"}}>
                        <form className={classes.root} noValidate autoComplete="off">
                            <div style={{ marginBottom: "50px" }}>
                                <strong>Project Information </strong>
                                <hr />
                                <Grid container spacing={2}>
                                    <Grid item xs={4} direction="column" container >
                                        <TextField
                                            id="projects"
                                            select
                                            label="Please select the Project Type"
                                            value={project}
                                            onChange={handleChangeProject}
                                            defaultValue={project}
                                            // helperText="Please select the Project Type"
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
                                    </Grid>

                                    <Grid item xs={4} direction="column" container >
                                        <TextField
                                            id="jobTitle"
                                            label="Enter Job title"
                                            placeholder="Job Title"
                                            onChange={handleChangejobTitle}
                                            defaultValue={jobTitle}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <TextField
                                            id="rationale"
                                            label="Rationale"
                                            placeholder="Rationale for onboarding"
                                            onChange={handleChangeRationale}
                                            defaultValue={rationale}
                                            multiline
                                            // rows={2}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </div>

                            <div style={{ marginTop: "50px" }}>
                                <strong>Source </strong>
                                <hr />
                                <Grid container spacing={2}>
                                    <Grid item xs={4} direction="column" container>
                                        <TextField
                                            id="sources"
                                            select
                                            label=""
                                            name="abbrv"
                                            value={sourcetype}
                                            defaultValue={sourcetype}
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
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <TextField
                                            id="sourceConnection"
                                            select
                                            label=""
                                            name="abbrv"
                                            value={sourceConnection}
                                            defaultValue={sourceConnection}
                                            onChange={handleChangeSourceConnectiontype}
                                            helperText="Please select the Source Connection"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <VerifiedUserIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {sourceSecondDropdown.map((option) => (
                                                <MenuItem key={option.type_id} value={option.connection_name}>
                                                    {option.connection_name}
                                                </MenuItem>

                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                {/* One drive parameter starts */}
                                <Grid container spacing={2} hidden={hiddenOneDrive}>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="link"
                                                label="Enter One Drive Link"
                                                placeholder="Link"
                                                onChange={handleChangeodLink}
                                                disabled
                                                value={odlink}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <div >
                                            <TextField
                                                id=" odDelimiter"
                                                label="Enter Delimiter"
                                                placeholder="Delimiter"
                                                onChange={handleChangeodDelimiter}
                                                disabled
                                                value={oddelimiter}
                                                // error={errorinfo}
                                                // helperText={error}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    {/* One drive parameter ends */}

                                </Grid>


                                <Grid container spacing={2} hidden={hiddenGoogleDrive}>
                                    {/* Google drive parameter starts */}
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id="FileId"
                                                label="Enter File ID"
                                                placeholder="File ID"
                                                onChange={handleChangeFileid}
                                                disabled
                                                value={fileid}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id="gdDelimiter"
                                                label="Enter Delimiter"
                                                placeholder="Delimiter"
                                                onChange={handleChangegdDelimiter}
                                                disabled
                                                value={gddelimiter}
                                                // error={errorinfo}
                                                // helperText={error}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    {/* Google drive parameter ends*/}
                                </Grid>

                                <Grid container spacing={2} hidden={hiddenMysql}>
                                    {/* Mysql parameters start */}
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id="jdbcHostname"
                                                label="Enter jdbcHostname"
                                                placeholder="jdbcHostname"
                                                required
                                                onChange={handleChangejdbcHostname}
                                                disabled
                                                value={jdbcHostname}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" jdbcUsername"
                                                label="Enter jdbcUsername"
                                                placeholder="jdbcUsername"
                                                onChange={handleChangejdbcUsername}
                                                disabled
                                                value={jdbcUsername}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" jdbcPassword"
                                                label="Enter jdbcPassword"
                                                placeholder="jdbcPassword"
                                                type="password"
                                                onChange={handleChangejdbcPassword}
                                                disabled
                                                value={jdbcPassword}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} hidden={hiddenMysql}>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" jdbcDatabaseName"
                                                label="Enter jdbcDatabaseName"
                                                placeholder="jdbcDatabaseName"
                                                onChange={handleChangejdbcDatabaseName}
                                                disabled
                                                value={jdbcDatabaseName}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" sourcejdbcQuery"
                                                label="Enter Source Query"
                                                placeholder="Source Query"
                                                onChange={handleChangejdbcsourceQuery}
                                                disabled
                                                value={jdbcsourceQuery}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    {/* Mysql parameters ends */}
                                </Grid>

                                <Grid container spacing={2} hidden={hiddenHive}>
                                    {/* Hive parameters start */}
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id="odbcHostname"
                                                label="Enter odbcHostname"
                                                placeholder="odbcHostname"
                                                required
                                                onChange={handleChangeodbcHostname}
                                                disabled
                                                value={odbcHostname}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" odbcUsername"
                                                label="Enter odbcUsername"
                                                placeholder="odbcUsername"
                                                onChange={handleChangeodbcUsername}
                                                disabled
                                                value={odbcUsername}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" odbcPassword"
                                                label="Enter odbcPassword"
                                                placeholder="odbcPassword"
                                                type="password"
                                                onChange={handleChangeodbcPassword}
                                                disabled
                                                value={odbcPassword}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} hidden={hiddenHive}>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" odbcDatabaseName"
                                                label="Enter odbcDatabaseName"
                                                placeholder="odbcDatabaseName"
                                                onChange={handleChangeodbcDatabaseName}
                                                disabled
                                                value={odbcDatabaseName}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" sourceodbcQuery"
                                                label="Enter Source Query"
                                                placeholder="Source Query"
                                                onChange={handleChangeodbcsourceQuery}
                                                disabled
                                                value={odbcsourceQuery}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    {/* Hive parameters ends */}
                                </Grid>

                                <Grid container spacing={2} hidden={hiddenAzureBlob}>
                                    {/* Azure Blob parameters start */}
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id="StorageAccountAccessKey"
                                                label="Enter StorageAccountAccessKey"
                                                placeholder="StorageAccountAccessKey"
                                                value={StorageAccountAccessKey}
                                                onChange={handleChangeStorageAccountAccessKey}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" StorageAccountName"
                                                label="Enter StorageAccountName"
                                                placeholder="StorageAccountName"
                                                onChange={handleChangeStorageAccountName}
                                                disabled
                                                value={StorageAccountName}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" ContainerName"
                                                label="Enter ContainerName"
                                                placeholder="ContainerName"
                                                onChange={handleChangeContainerName}
                                                disabled
                                                value={ContainerName}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} hidden={hiddenAzureBlob}>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" Path"
                                                label="Enter Path"
                                                placeholder="Path"
                                                onChange={handleChangePath}
                                                value={Path}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id="Format"
                                                select
                                                label="Enter Format"
                                                value={Format}
                                                disabled
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
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" blobDelimiter"
                                                label="Enter Delimiter"
                                                placeholder="Delimiter"
                                                disabled={Disabled}
                                                onChange={handleChangeblobDelimiter}
                                                value={blobDelimiter}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    {/* Azure Blob parameters ends */}
                                </Grid>


                                {/* {sourceFormDisplay()} */}
                            </div>

                            <div style={{ marginTop: "50px" }}>
                                <strong>Target </strong>
                                <hr />
                                <Grid container spacing={2}>
                                    <Grid item xs={4} direction="column" container>
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
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>
                                        <TextField
                                            id="targetConnection"
                                            select
                                            label=""
                                            name="abbrv"
                                            value={targetConnection}
                                            defaultValue={targetConnection}
                                            onChange={handleChangeTargetConnectiontype}
                                            helperText="Please select the Target Connection"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <VerifiedUserIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {targetSecondDropdown.map((option) => (
                                                <MenuItem key={option.type_id} value={option.connection_name}>
                                                    {option.connection_name}
                                                </MenuItem>

                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                {/* ADLS Gen 1 parameter starts */}
                                <Grid container spacing={2} hidden={hiddenADLS1}>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="ApplicationID"
                                                label="Enter ApplicationID"
                                                placeholder="ApplicationID"
                                                onChange={handleChangeApplicationID}
                                                value={ApplicationID}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id=" ApplicationCredential"
                                                label="Enter ApplicationCredential"
                                                placeholder="ApplicationCredential"
                                                onChange={handleChangeApplicationCredential}
                                                value={ApplicationCredential}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="DirectoryID"
                                                label="Enter DirectoryID"
                                                placeholder="DirectoryID"
                                                onChange={handleChangeDirectoryID}
                                                value={DirectoryID}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} hidden={hiddenADLS1}>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="adlAccountName"
                                                label="Enter adlAccountName"
                                                placeholder="adlAccountName"
                                                onChange={handleChangeadlAccountName}
                                                value={adlAccountName}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="TargetFileType"
                                                select
                                                label="Enter Format"
                                                value={TargetFileType}
                                                defaultValue={TargetFileType}
                                                onChange={handleChangeTargetFileType}
                                                disabled
                                                helperText="Please select the format"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <VerifiedUserIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            >{targetformats.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container >
                                        <div>
                                            <TextField
                                                id="TargetFileDelimiter"
                                                label="Enter Delimiter"
                                                placeholder="Delimiter"
                                                // disabled={Disabled}
                                                value={TargetFileDelimiter}
                                                disabled
                                                // error={errorinfo}
                                                // helperText={error}
                                                onChange={handleChangeTargetFileDelimiter}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                {/* ADLS Gen 1 parameter ends */}

                                {/* ADLS Gen 2 parameter starts */}
                                <Grid container spacing={2} hidden={hiddenADLS2}>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="ApplicationID2"
                                                label="Enter ApplicationID"
                                                placeholder="ApplicationID"
                                                onChange={handleChangeApplicationID2}
                                                value={ApplicationID2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id=" ApplicationCredential2"
                                                label="Enter ApplicationCredential"
                                                placeholder="ApplicationCredential"
                                                onChange={handleChangeApplicationCredential2}
                                                value={ApplicationCredential2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="DirectoryID2"
                                                label="Enter DirectoryID"
                                                placeholder="DirectoryID"
                                                onChange={handleChangeDirectoryID2}
                                                value={DirectoryID2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} hidden={hiddenADLS2}>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="adlAccountName2"
                                                label="Enter adlAccountName"
                                                placeholder="adlAccountName"
                                                onChange={handleChangeadlAccountName2}
                                                value={adlAccountName2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="TargetFileType"
                                                select
                                                label="Enter Format"
                                                value={TargetFileType2}
                                                disabled
                                                onChange={handleChangeTargetFileType2}
                                                helperText="Please select the format"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <VerifiedUserIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            >{targetformats.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container >
                                        <div >
                                            <TextField
                                                id="TargetFileDelimiter2"
                                                label="Enter Delimiter"
                                                placeholder="Delimiter"
                                                // disabled={Disabled}
                                                // error={errorinfo}
                                                // helperText={error}
                                                value={TargetFileDelimiter2}
                                                disabled
                                                onChange={handleChangeTargetFileDelimiter2}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                {/* ADLS Gen 2 parameter ends */}

                                {/* Azure SQL parameters starts */}
                                <Grid container spacing={2} hidden={hiddenAzureSql}>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id="jdbcHostname2"
                                                label="Enter jdbcHostname"
                                                placeholder="jdbcHostname"
                                                required
                                                onChange={handleChangejdbcHostname2}
                                                value={jdbcHostname2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" jdbcUsername2"
                                                label="Enter jdbcUsername"
                                                placeholder="jdbcUsername"
                                                onChange={handleChangejdbcUsername2}
                                                value={jdbcUsername2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" jdbcPassword2"
                                                label="Enter jdbcPassword"
                                                placeholder="jdbcPassword"
                                                type="password"
                                                onChange={handleChangejdbcPassword2}
                                                value={jdbcPassword2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} hidden={hiddenAzureSql}>
                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" jdbcDatabaseName2"
                                                label="Enter jdbcDatabaseName"
                                                placeholder="jdbcDatabaseName"
                                                onChange={handleChangejdbcDatabaseName2}
                                                value={jdbcDatabaseName2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <div>
                                            <TextField
                                                id=" sourcejdbcQuery2"
                                                label="Enter Source Query"
                                                placeholder="Source Query"
                                                onChange={handleChangejdbcsourceQuery2}
                                                value={jdbcsourceQuery2}
                                                disabled
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>

                                {/* Azure SQL parameters ends */}


                                {/* {targetFormDisplay()} */}
                            </div>

                            <div style={{margin:"50px 20px"}}>
                                <strong>Schedule </strong>
                                <hr />
                                <Grid container spacing={2}>
                                    <FormControl component="fieldset" >
                                        {/* <FormLabel component="legend">Gender</FormLabel> */}
                                        <RadioGroup aria-label="schedule" name="schedule" value={value} onChange={handleChangeSchedule} row >
                                            <FormControlLabel value="On-Demand" control={<Radio />} label="On-Demand" style={{ marginRight: "50px" }} />
                                            <FormControlLabel value="One-Time" control={<Radio />} label="One-Time" style={{ margin: " 0 50px" }} />
                                            <FormControlLabel value="Fixed Schedule" control={<Radio />} label="Fixed Schedule" style={{ marginLeft: "50px" }} />
                                        </RadioGroup>
                                    </FormControl>

                                </Grid>
                                {/* One time schedule parameters */}
                                <Grid container spacing={2} hidden={hiddenOneTime}>
                                    <Grid item xs={4} direction="column" container>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="timepicker"
                                                label="Select Time"
                                                value={selectedTime}
                                                helperText="Time format is GMT(+5:30)"
                                                onChange={handleTimeChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                {/* One time schedule parameters */}

                                {/* Fixed Schedule Parameters */}
                                <Grid container spacing={2} hidden={hiddenFixedSchedule}>
                                    <Grid item xs={4} direction="column" container>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardTimePicker
                                                margin="normal"
                                                id="time-picker"
                                                label="Select Time"
                                                value={selectedTime}
                                                helperText="Time format is GMT(+5:30)"
                                                onChange={handleTimeChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change time',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>

                                        {/* <TextField
                                                id="time"
                                                label="Alarm clock"
                                                type="time"
                                                // defaultValue="07:30"
                                                className={classes.textField}
                                                value={selectedTime}
                                                onChange={handleTimeChange}
                                                InputLabelProps={{
                                                shrink: true,
                                                }}
                                                inputProps={{
                                                step: 300, // 5 min
                                                }}
                                            /> */}
                                    </Grid>

                                    <Grid item xs={4} direction="column" container>
                                        <TextField
                                            id="scheduletype"
                                            select
                                            label="Recurrence"
                                            value={scheduleType}
                                            onChange={handleChangescheduleType}
                                            // helperText="Please select the Schedule Type"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <VerifiedUserIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        >
                                            {scheduletypes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <div style={{ display: hiddenminute }}>
                                        <Grid item xs={4} direction="column" container>
                                            <TextField
                                                id=" minutes"
                                                label="Enter minutes"
                                                placeholder="Minutes"
                                                type="number"
                                                value={hours_minutes}
                                                onChange={handleChangehoursminutes}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </div>

                                    <div style={{ display: hiddenhour }}>
                                        <Grid item xs={4} direction="column" container>
                                            <TextField
                                                id=" hours"
                                                label="Enter Hour"
                                                placeholder="Hour"
                                                type="number"
                                                value={hours_minutes}
                                                onChange={handleChangehoursminutes}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </div>


                                    <div style={{ display: hiddenweek }}>
                                        <Grid item xs={4} direction="column" container>
                                            <TextField
                                                id="weekly"
                                                label="Enter your choice"
                                                placeholder="Weekday"
                                                onChange={handleChangeweek}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                    </div>
                                </Grid>

                                <Grid container spacing={2} hidden={hiddenFixedSchedule}>
                                    <Grid item xs={4} direction="column" container>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog-start"
                                                label="Select Start Date"
                                                format="MM/dd/yyyy"
                                                value={startDate}
                                                onChange={handleChangeStartDate}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                    <Grid item xs={4} direction="column" container>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <KeyboardDatePicker
                                                margin="normal"
                                                id="date-picker-dialog-end"
                                                label="Select End Date"
                                                format="MM/dd/yyyy"
                                                value={endDate}
                                                onChange={handleChangeEndDate}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </Grid>
                                </Grid>
                                {/* Fixed Schedule Parameters */}
                                

                                {/* On demand schedule parameters */}
                                {/* On demand schedule parameters */}

                                {/* <div style={{ marginTop: "30px" }}>
                                    {ScheduleDisplay()}
                                </div> */}
                            </div>

                            <div style={{margin:"50px 20px"}}>
                                <strong>Ingestion Pattern </strong>
                                <hr />
                                <Grid container spacing={2}>
                                    <FormControl component="fieldset">
                                        {/* <FormLabel component="legend">Ingestion Pattern</FormLabel> */}
                                        <RadioGroup aria-label="ingestion pattern" name="ingestion pattern" value={value2} onChange={handleChange2} row>
                                            <FormControlLabel value="Overwrite" control={<Radio />} label="Overwrite" style={{ marginRight: "55px" }} />
                                            <FormControlLabel value="Append" control={<Radio />} label="Append" style={{ margin: " 0 60px" }} />
                                            <FormControlLabel value="Upsert" control={<Radio />} label="Upsert" style={{ marginLeft: "60px" }} />
                                        </RadioGroup>
                                    </FormControl>

                                </Grid>
                            </div>

                            <div className={classes.buttonRoot} style={{ marginTop: "20px" }}>
                                {entryId===0 ?
                                <Grid container>
                                <Grid item  container justify="center" alignItems="center">
                                    <Button variant="contained" color='primary' onClick={(e) => {
                                        e.preventDefault();
                                        isFormValid();
                                    }} >Save & Next</Button>
                                </Grid>
                                </Grid> :
                                <Grid container>
                                <Grid item  container justify="center" alignItems="center">
                                        <Button variant="contained" color='primary' onClick={(e) => {
                                            e.preventDefault();
                                            isFormValidEdit();
                                        }} >Update & Next</Button>
                                </Grid>
                                </Grid>}
                                {/* <Grid container>
                                    <Grid item xs={6} direction="column" container justify="flex-start" alignItems="flex-start">
                                        <Button variant="contained" color='primary' onClick={(e) => {
                                            e.preventDefault();
                                            isFormValid();
                                        }} >Save Details</Button>
                                    </Grid> */}

                                    {/* <Grid item xs={6} direction="column" container justify="flex-end" alignItems="flex-end">
                                        <Button variant="contained" color='primary' onClick={(e) => {
                                            e.preventDefault();
                                            isFormValidEdit();
                                        }} >Update Details</Button>
                                    </Grid> */}

                                {/* </Grid> */}
                            </div>

                            {/* <div className={classes.buttonRoot} style={{ marginTop: "20px" }}>
                                <Grid container>
                                    <Grid item xs={6} direction="column" container justify="flex-end" alignItems="flex-end">
                                        <Button variant="contained" color='primary' onClick={(e) => {
                                            e.preventDefault();
                                            isFormValidEdit();
                                        }} >Update Details</Button>
                                    </Grid>

                                </Grid>
                            </div> */}
                        </form>
                    </Paper>
                </Grid>
            </div >
        );
    }

    else {
        return (
        <div className={classes.progress} style={{ marginLeft: "550px",height:"500px"  }}>
            <CircularProgress />
        </div>)
    }
}

