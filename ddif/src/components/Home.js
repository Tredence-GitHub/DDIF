import React, { Component } from 'react'
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
import './Home.css';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';


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

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minWidth: 275,
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
        height: "350px",
        width:'100%',
        maxWidth: '700px',
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },

}));



function createData(Activity, Logs) {
    return { Activity, Logs };
}

const rows = [
    createData('Frozen yoghurt', 159),
    createData('Ice cream sandwich', 237),
    createData('Eclair', 262),
    createData('Cupcake', 305),
    createData('Gingerbread', 356),
];

function Home() {
    const classes = useStyles();
    const theme = useTheme();
    const [state, setState] = React.useState({
        bottom: false,
    });
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = 2;

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
                [classes.fullList]: anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>

        </div>
    );




    return (
        <div className={classes.root}>
            {/* <Grid container spacing={3}>
                <Grid item container xs={12}>
                    <Grid item xs={2} >
                        <CardContent style={{backgroundColor:'lightgrey', boxShadow:"2px 3px 5px 10px lightgrey", borderRadius:"20px"}}>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Registered Users
                                </Typography>
                            <Typography variant="h5" component="h2">
                                5
                                </Typography>
                        </CardContent>

                    </Grid>
                    <Grid item xs={2}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Registered Users
                                </Typography>
                            <Typography variant="h5" component="h2">
                                5
                                </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={2}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Registered Users
                                </Typography>
                            <Typography variant="h5" component="h2">
                                5
                                </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={2}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Registered Users
                                </Typography>
                            <Typography variant="h5" component="h2">
                                5
                                </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={2}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Registered Users
                                </Typography>
                            <Typography variant="h5" component="h2">
                                5
                                </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={2}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                Registered Users
                                </Typography>
                            <Typography variant="h5" component="h2">
                                5
                                </Typography>
                        </CardContent>
                    </Grid>
                    
                </Grid>
            </Grid> */}


            <div className={classes.paper} style={{ display: 'block' }}>
                <Grid container spacing={3}>
                    <Grid item xs={2} >
                        <Paper style={{ padding: "20px", backgroundColor: 'rgb(245,245,245)' }}>
                            Registered User : 5
                </Paper>
                    </Grid>
                    <Grid item xs={2} >
                        <Paper style={{ padding: "20px", backgroundColor: 'rgb(245,245,245)' }}>
                            Projects : 15
                </Paper>
                    </Grid>
                    <Grid item xs={2} >
                        <Paper style={{ padding: "20px", backgroundColor: 'rgb(245,245,245)' }}>
                            Data Sources : 6
                </Paper>
                    </Grid>
                    <Grid item xs={2} >
                        <Paper style={{ padding: "20px", backgroundColor: 'rgb(245,245,245)' }}>
                            Datasets : 5
                </Paper>
                    </Grid>
                    <Grid item xs={2} >
                        <Paper style={{ padding: "20px", backgroundColor: 'rgb(245,245,245)' }}>
                            Jobs : 2
                </Paper>
                    </Grid>
                    <Grid item xs={2} >
                        <Paper style={{ padding: "20px", backgroundColor: 'rgb(245,245,245)' }}>
                            Failures : 0
                </Paper>
                    </Grid>
                </Grid>
            </div>


            <Grid container spacing={3} style={{ height: "500px" }}>
                <Grid item xs={8}>
                    <Paper className={classes.paper} style={{ margin: "0 0 0 15px" }}>
                        {/* <img src={image} width={'700px'} /> */}
                        <Paper square elevation={0} className={classes.header}>
                            <Typography>{"DDIF-Flowchart"}</Typography>
                        </Paper>
                        {activeStep===0?
                        <img
                            className={classes.img}
                            src={image}
                            alt={"DDIF-Flowchart"}
                        /> : <div>Hello</div>}
                        <MobileStepper
                            steps={maxSteps}
                            position="static"
                            variant="text"
                            activeStep={activeStep}
                            nextButton={
                                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                    Next
                                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
                            }
                        />
                    </Paper>


                </Grid>
                <Grid item container direction="column" xs={4}>
                    <Paper className={classes.paper}>
                        <Typography>Activity Log</Typography>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Activity</TableCell>
                                        <TableCell align="right">Logs</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow key={row.name}>
                                            <TableCell component="th" scope="row">
                                                {row.Activity}
                                            </TableCell>
                                            <TableCell align="right">{row.Logs}</TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    
                    <div style={{margin:"40px 0 0 0 "}}>
                        {['bottom'].map((anchor) => (
                            <React.Fragment key={anchor}>
                                <Button variant='contained' color='primary' style={{ width: '365px' }} onClick={toggleDrawer(anchor, true)}>Announcements <NotificationsIcon fontSize='small'/></Button>
                                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                    {list(anchor)}
                                </Drawer>
                            </React.Fragment>
                        ))}
                    </div>


                </Grid>
            </Grid>
        </div>
    );
}

export default Home;