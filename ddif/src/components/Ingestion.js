import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import Setup from './configure_ingestion/Setup';
import SetupTest from './configure_ingestion/SetupTest';
import { Link } from 'react-router-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Metadata from './configure_ingestion/Metadata';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    table: {
        minWidth: 650,
    },
}));



function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


export default function Ingestion(props) {
    // const {match, history} = props;
    // const {params} = match;
    // const {page} = params;

    // const tabNametoIndex ={
    //     0: "setup",
    //     1:"metadata",
    //     2:"customrules",
    //     3:"review"
    // };

    // const indexToTabName ={
    //     setup :0,
    //     metadata:1,
    //     customrules:2,
    //     review:3
    // };



    const classes = useStyles();
    // const [value, setValue] = React.useState(indexToTabName[page]);
    const [value, setValue] = React.useState(0);
    const [setup, setSetup] = React.useState(false);
    const [enable, setEnable] = React.useState(false);


    const handleChange = (event, newValue) => {
        // history.push(`/ingestion/${tabNametoIndex[newValue]}`)
        setValue(newValue);
    };

    const handleSetup =(data) =>{
        setSetup(data)
        console.log(data)
        if(data.done===1){
            setEnable(true)
        }
        else{
            setEnable(false)
        }
    };



    return (

        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    aria-label="full width tabs example">
                    <Tab label="Setup" {...a11yProps(0)}/>
                    {/* <Tab label="Metadata Discovery" disabled={enable} {...a11yProps(1)} /> */}
                    <Tab label="Metadata Discovery" {...a11yProps(1)} />
                    <Tab label="Custom Rules" {...a11yProps(2)} />
                    <Tab label="Review & Ingest" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            
            <TabPanel value={value} index={0}>
                <SetupTest onPassSetup={handleSetup}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Metadata/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
        </div>

        

    );
}