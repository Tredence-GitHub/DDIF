import React from 'react';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BarChartIcon from '@material-ui/icons/BarChart';
import { makeStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';

import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import Tooltip from '@material-ui/core/Tooltip';
import DashboardIcon from '@material-ui/icons/Dashboard';

import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
    // fab: {
    //     margin: theme.spacing(2),
    // },
    // absolute: {
    //     position: 'absolute',
    //     bottom: theme.spacing(2),
    //     right: theme.spacing(3),
    // },
    // nested: {
    //     paddingLeft: theme.spacing(4),
    // },
    // root: {
    //     width: '100%',
    //     maxWidth: 360,
    //     backgroundColor: theme.palette.background.paper,
    // },

}));


export default function ListItems() {
    const classes = useStyles();
    const { useState } = React;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Paper elevation={0}>
                
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    // subheader={
                    //     <ListSubheader component="div" id="nested-list-subheader">
                    //         Nested List Items
                    //     </ListSubheader>
                    // }
                    className={classes.root}
                >
                    <ListItem to="/home" component={Link} button>
                        <ListItemIcon>
                        <Tooltip title="Home Page">
                            <HomeIcon fontSize="small" />
                        </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Home Page" />
                    </ListItem>
                    <ListItem to="/ingestiontable"  component={Link} button>
                        <ListItemIcon>
                        <Tooltip title="Configue Ingestion Job">
                            <BarChartIcon fontSize="small" />
                        </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Configue Ingestion Job" />
                    </ListItem>
                    <ListItem to="/admin"  component={Link} button >
                        <ListItemIcon>
                        <Tooltip title="Administration">
                            <PersonIcon fontSize="small" />
                        </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Job Monitor" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                        <Tooltip title="Job Monitor">
                            <SearchIcon fontSize="small" />
                        </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary="Job Monitor" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} to="#"  component={Link}>
                                <ListItemIcon>
                                <Tooltip title="Active Run">
                                    <AirplanemodeActiveIcon fontSize="small" />
                                </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Active run" />
                            </ListItem>

                            <ListItem button className={classes.nested} to="#"  component={Link}>
                                <ListItemIcon>
                                <Tooltip title="Operational Dashboard">
                                    <DashboardIcon fontSize="small" />
                                </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary="Operational Dashboard" />
                            </ListItem>
                        </List>
                    </Collapse>
                </List>
            </Paper>
        </div>
    )
};