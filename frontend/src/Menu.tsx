import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import GroupIcon from '@material-ui/icons/Group';
import Drawer from '@material-ui/core/Drawer';

export const Main: React.FC = () =>
    <div>
        <Drawer
            variant="permanent"
            open={true}
        >
            <IconButton
                edge="start"
            >
                <GroupIcon />
            </IconButton>

        </Drawer>
    </div>
