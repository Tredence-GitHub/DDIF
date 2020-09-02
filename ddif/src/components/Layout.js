import React, { Fragment } from 'react'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Link from '@material-ui/core/Link';
import { Badge, Drawer } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
//import TredenceLogo from '../../assets/Images/tredence-logo.png'
import TredenceLogo from '../assets/Images/tredence-logo.png'
import Divider from '@material-ui/core/Divider';
import mainListItems from './ListItems';
import List from '@material-ui/core/List';
import Home from './Home';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Ingestion from './Ingestion';
import ChangePassword from './ChangePassword';
import IngestionTable from './configure_ingestion/IngestionTable';
import Administration from './administrator/administration';
import SourceDetails from './administrator/sourceDetails';
import TargetDetails from './administrator/targetDetails';
import Setup from './configure_ingestion/Setup';
import Audit from './Audit';
import Tooltip from '@material-ui/core/Tooltip';

const drawerWidth = 70;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}));

function logout (){
    localStorage.clear()
    return window.location.href = "/";

}

export default function Layout() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };

    const ExpansionPanel = withStyles({
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
    })(MuiExpansionPanel);

    const ExpansionPanelSummary = withStyles({
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
    })(MuiExpansionPanelSummary);

    const ExpansionPanelDetails = withStyles((theme) => ({
        root: {
            padding: theme.spacing(2),
        },
    }))(MuiExpansionPanelDetails);

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.title} align={'left'}>
                    <img src={TredenceLogo} height={'40px'} width={'80px'} /> &nbsp;  Driverless Data Ingestion Framework
                    </Typography>
                    <IconButton color='inherit'>
                    <Tooltip title="Help" arrow>
                        <Badge color="secondary">
                            <HelpOutlineIcon  onClick={(e)=>{
                                
                            }}/>
                        </Badge>
                        </Tooltip>
                    </IconButton>
                    <IconButton color='inherit'>
                        <Tooltip title="Sign Out" arrow>
                        <Badge color="secondary">
                            <PowerSettingsNewIcon  onClick={(e)=>{
                                logout();
                            }}/>
                        </Badge>
                        </Tooltip>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Router>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    // open={open}
                >
                    <div className={classes.toolbarIcon}>
                        {/* <img src={TredenceLogo} height={'40px'} width={'60px'} alt="Tredence Logo" /> */}
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems()}</List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container}>
                        {/* <Paper> */}
                            <Switch>
                                <Fragment>
                                    <Route exact path="/home" >
                                        <Home />
                                    </Route>
                                    <Route exact path={['/ingestion','/ingestion/:param']} >
                                        <Ingestion />
                                    </Route>
                                    {/* <Route exact path="/ingestion/:page" render={props=> <Ingestion {...props}/>}>
                                    </Route> */}
                                    <Route exact path="/ingestiontable" >
                                        <IngestionTable/>
                                    </Route>
                                    <Route exact path={['/audit','/audit/:param']} >
                                        <Audit />
                                    </Route>
                                    <Route exact path="/admin">
                                        <Administration/>
                                    </Route>
                                    <Route path = {['/addSource','/addSource/:param']}>
                                        <SourceDetails/>
                                    </Route>
                                   
                                    <Route exact  path = {['/addTarget','/addTarget/:param']}>
                                        <TargetDetails/>
                                    </Route>
                                    {/* <Route path = {['/ingestion','/ingestion/:param']}>
                                        <Setup/>
                                    </Route> */}
                                </Fragment>
                            </Switch>

                        {/* </Paper> */}
                    </Container>

                </main>
            </Router>
        </div>
    );
}