import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GroupIcon from '@material-ui/icons/Group';
import Accessibility from '@material-ui/icons/Accessibility';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MyLocation from '@material-ui/icons/MyLocation';
import Drawer from '@material-ui/core/Drawer';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
        },
        drawerPaper: {
            width: `${drawerWidth}px`
        },
    }))

export const InGroupMenu: React.FC = (p) => {
    const classes = useStyles();

    return (
        <div>
            <Box ml={`${drawerWidth}px`}>
                {p.children}
            </Box>
            <Drawer
                variant="permanent"
                anchor="left"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <List>
                    <ListItem button key="gearing-need">
                        <ListItemIcon><Accessibility /></ListItemIcon>
                        <ListItemText primary="Gearing needs" />
                    </ListItem>
                    <ListItem button key="atlas">
                        <ListItemIcon><MyLocation /></ListItemIcon>
                        <ListItemText primary="Atlas" />
                    </ListItem>
                    <Divider />
                    <ListItem button key="profile">
                        <ListItemIcon><AccountCircle /></ListItemIcon>
                        <ListItemText primary="Characters" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}
