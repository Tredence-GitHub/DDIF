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

const useStyles = makeStyles({
    root: {
        width: 360,
    },
});

export default function mainListItems() {
    return (
        <div>
            <Paper elevation={0}>
                <MenuList aria-label="main mailbox folders">
                    <MenuItem to="/Home" component={Link}>
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Home</Typography>
                    </MenuItem>
                    <MenuItem to="/Ingestion" component={Link}>
                        <ListItemIcon>
                            <BarChartIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Configure Ingestion Jobs</Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </div>
    )
};