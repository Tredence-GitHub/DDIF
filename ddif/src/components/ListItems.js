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
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));

// const classes = useStyles();
export default function mainListItems() {

    return (
        <div>
            <Paper elevation={0}>
                <MenuList aria-label="main mailbox folders">
                    <MenuItem to="/Home" component={Link}>
                        <ListItemIcon>
                        <Tooltip title="Home Page">
                            <HomeIcon fontSize="small" />
                        </Tooltip>
                        </ListItemIcon>
                    </MenuItem>
                    <MenuItem to="/Ingestion"  component={Link}>
                        <ListItemIcon>
                        <Tooltip title="Configue Ingestion Job">
                            <BarChartIcon fontSize="small" />
                        </Tooltip>
                        </ListItemIcon>
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    )
};