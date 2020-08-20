import React, { Component, useState, useEffect } from 'react'
import ReactDom from 'react-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import image from '../assets/Images/flowchart.png';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from 'clsx';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import StoreIcon from '@material-ui/icons/Store';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import CompareIcon from '@material-ui/icons/Compare';
import PieChartIcon from '@material-ui/icons/PieChart';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import StorageIcon from '@material-ui/icons/Storage';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import CategoryIcon from '@material-ui/icons/Category';
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import './Home.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { green, pink, blue, yellow } from '@material-ui/core/colors';
import Axios from 'axios';


// const tutorialSteps = [
//     {
//       label: 'San Francisco – Oakland Bay Bridge, United States',
//       imgPath:
//       '../assets/Images/flowchart.png',
//     },
//     {
//       label: 'Bird',
//       imgPath:
//       '../assets/Images/flowchart.png',
//     },

//   ];

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const drawerWidth = 220
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
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
        margin: "3px",
        padding: "2px"
    },
    pos: {
        marginBottom: 12,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    gridListroot: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    img: {
        height: "400px",
        width:'100%',
        maxWidth: '100%',
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
    green: {
        // color: '#fff',
        backgroundColor: blue[800],
        marginLeft: '0px'
      },

}));





const useStylesLoad = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

function Home() {
    const classes = useStyles();
    const classesLoad = useStylesLoad();
    const theme = useTheme();
    const [state, setState] = React.useState({
        right: false,
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = 2;

    const [dashboardnumbers, setdashboardnumbers] = useState({});
    const [logData, setlogData] = useState({})
    const [error, seterror] = useState(false)
    const [loading, setloading] = useState(true)
    const [notficationsData, setnotficationsData] = useState({});

    let local = 'http://localhost:4000'


    function getInfo() {
        Promise.all(
            [Axios.get(`${local}/dashboard/dashboardInformation`), 
            Axios.post(`${local}/dashboard/getActivityLogs`),
            Axios.get(`${local}/dashboard/announcements`)
            ]).then((res)=>{
                return [res]
            })  
        .then((response)=>{
            console.log("RESPONSE -- ", response[0][1].status)
            if(response[0][0].status === 200 && response[0][1].status === 200){
                setdashboardnumbers(response[0][0].data.data);
                setlogData(response[0][1].data.data);
                setnotficationsData(response[0][2].data.data);

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

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
      };


    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'right',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {notficationsData.map((text, index) => (
                    <ListItem button key={index}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text.description} />
                        <Divider />
                    </ListItem>
                ))}
            </List>
           

        </div>
    );



if(!loading){
    return (
        <div className={classes.root} >
            <Grid container spacing={4}>
                <Grid item container xs={12} style={{
                    paddingLeft: "25px"
                }}  >
                    <Grid item  className="cardDivs">
                        <CardContent className="keyCards">
                            <Grid item container> 
                                <Avatar className = {classes.green}>
                                    <PersonIcon fontSize='small'/>
                                </Avatar>
                                <Typography className={classes.title}  color="textSecondary" gutterBottom>
                                    <span >Registered Users</span>
                                </Typography>
                            </Grid>
                            <Typography variant="h4" className="Numbers" >
                                {dashboardnumbers.total_users}
                            </Typography>
                        </CardContent>

                    </Grid>
                    
                    <Grid item  className="cardDivs">
                        <CardContent className="keyCards">
                        <Grid item container> 
                                <Avatar className = {classes.green}>
                                    <CategoryIcon fontSize='small'/>
                                </Avatar>
                                <Typography className={classes.title}  color="textSecondary" gutterBottom>
                                    <span >Project Categories</span>
                                </Typography>
                            </Grid>
                            <Typography variant="h4" className="Numbers" >
                            {dashboardnumbers.total_projecttypes}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item  className="cardDivs">
                        <CardContent className="keyCards">
                        <Grid item container> 
                                <Avatar className = {classes.green}>
                                    <StorageIcon fontSize='small'/>
                                </Avatar>
                                <Typography className={classes.title}  color="textSecondary" gutterBottom>
                                    <span >Data Sources</span>
                                </Typography>
                            </Grid>
                            <Typography variant="h4" className="Numbers" >
                            {dashboardnumbers.total_datasources}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item  className="cardDivs">
                        <CardContent className="keyCards">
                        <Grid item container> 
                                <Avatar className = {classes.green}>
                                    <SettingsInputComponentIcon fontSize='small'/>
                                </Avatar>
                                <Typography className={classes.title} variant="h6" color="textSecondary" gutterBottom>
                                    <span >Ingested Datasets</span>
                                </Typography>
                            </Grid>
                            <Typography variant="h4" className="Numbers" >
                            {dashboardnumbers.total_datasets}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item  className="cardDivs">
                        <CardContent className="keyCards">
                        <Grid item container> 
                                <Avatar className = {classes.green}>
                                    <AlarmAddIcon fontSize='small'/>
                                </Avatar>
                                <Typography className={classes.title}  color="textSecondary" gutterBottom>
                                    <span >Jobs Created</span>
                                </Typography>
                            </Grid>
                            <Typography variant="h4" className="Numbers" >
                            {dashboardnumbers.total_jobs}
                            </Typography>
                        </CardContent>
                    </Grid>
                    
                </Grid>
            </Grid>


            <Grid container spacing={3} style={{ height: "500px" }}>
                <Grid item xs={8}>
                    <Paper className={classes.paper} style={{ margin: "0 0 0 15px", padding: '1px' }}>
                        {/* <img src={image} width={'700px'} /> */}
                        {/* <Paper square elevation={0} className={classes.header}>
                            <Typography>{"DDIF-Flowchart"}</Typography>
                        </Paper> */}
                        {activeStep===0?  <Typography>{"Key Capabilities"}</Typography>: <Typography>{"Data Ingestion Framework"}</Typography>}
                        {activeStep===1?
                        <img
                            className={classes.img}
                            src={image}
                            maxWidth="100%"
                            alt={"DDIF-Flowchart"}
                        /> : 
                            
                            <Grid container spacing={4} style={{
                                position: "relative",
                                maxWidth: "900px"
                            }}>
                                <Grid item container xs={12} style={{
                                    // paddingLeft: "25px"
                                    // border: '1px solid blue'

                                }} >
                                    {/* Row 1 */}

                                    <Grid item container xs = {12} style={{
                                    // paddingLeft: "25px"
                                    // border: '1px solid yellow',
                                    padding: "1%",
                                    height: '200px'
                                }} >    
                                    <div className="innerCircle">
                                        <BuildIcon className="iconsize" ></BuildIcon>
                                        <small className="subtext">Metadata driven data extractor</small>
                                    </div>
                                    <div className="innerCircle">
                                        <StoreIcon className="iconsize"></StoreIcon>
                                        <small className="subtext">Metadata store</small>
                                    </div>
                                    <div className="innerCircle">
                                        <SettingsInputComponentIcon className="iconsize"></SettingsInputComponentIcon>
                                        <br/>
                                        <small className="subtext">Data Ingestion & Curation Engine </small>
                                    </div>
                                    <div className="innerCircle">
                                        <StorageIcon className="iconsize"></StorageIcon>
                                        <br/>
                                        <small className="subtext">Metadata driven data writer </small>
                                    </div>
                                    <div className="innerCircle">
                                        <PermDataSettingIcon className="iconsize"></PermDataSettingIcon>
                                        <br/>
                                        <small className="subtext">Operational Metadata </small>
                                    </div>

                                    </Grid>

                                    {/* Row 2 */}

                                    <Grid item container xs = {12} style={{
                                    // paddingLeft: "25px"
                                    // border: '1px solid red',
                                    padding: "1%",
                                    height: '200px'
                                }} >
                                        <div className="innerCircle">
                                        <BusinessCenterIcon className="iconsize" ></BusinessCenterIcon>
                                        <small className="subtext">Business & Technical Metadata Input</small>
                                    </div>
                                    <div className="innerCircle">
                                        <CompareIcon className="iconsize"></CompareIcon>
                                        <small className="subtext">Metadata Auto-Discovery</small>
                                    </div>
                                    <div className="innerCircle">
                                        <PieChartIcon className="iconsize"></PieChartIcon>
                                        <br/>
                                        <small className="subtext">Operational Dashboards & Analytics </small>
                                    </div>
                                    <div className="innerCircle">
                                        <SupervisedUserCircleIcon className="iconsize"></SupervisedUserCircleIcon>
                                        <br/>
                                        <small className="subtext">Role based Access Control </small>
                                    </div>
                                    <div className="innerCircle">
                                        <NotificationsIcon className="iconsize"></NotificationsIcon>
                                        <br/>
                                        <small className="subtext">Alerts & Notifications Framework </small>
                                    </div>

                                    </Grid>
                                </Grid>
                            </Grid>
                            
                            
                            
                            }
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            variant="dots"
                            activeStep={activeStep}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                    
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            
          </Button>
                            }
                        />
                    </Paper>


                </Grid>
                <Grid item container direction="column" xs={4}>
                    <Paper className={classes.paper}>
                        <Typography>Activity Log {['right'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button  color='default' style={{ width: '1px', border: 'none',backgroundColor: 'none' }} onClick={toggleDrawer(anchor, true)}><NotificationsIcon fontSize='small'/>({notficationsData.length})</Button>
                                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                    {list(anchor)}
                                </Drawer>
                            </React.Fragment>
                        ))}
                        </Typography>
                        <TableContainer component={Paper} style={{
                                maxHeight: "405px"

                        }}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell><b>Job ID</b></TableCell>
                                        <TableCell align="right"><b>Status</b></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {logData.map((row) => (
                                        <TableRow key={row.jobname}>
                                            <TableCell component="th" scope="row">
                                                {row.jobname}
                                            </TableCell>
                                            <TableCell align="right">{row.status}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>


                </Grid>
            </Grid>
        </div>
    );
}else{
    

    return(<div className={classesLoad.root}>
      <LinearProgress />
    </div>)
}
}

export default Home;