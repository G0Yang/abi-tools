import * as React from 'react';
import {
    Box, Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Drawer,
    Tooltip
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import {useState} from "react";

export default function SettingToolbar() {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

    return (
        <React.Fragment>
            <Tooltip title="Setting" enterDelay={1000} onClick={() => setDrawerOpen(!drawerOpen)}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="setting"
                    >
                        <SettingsIcon />
                    </IconButton>
                </div>
            </Tooltip>
            <Drawer
                anchor={'right'}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <Box sx={{height: 64}}/>
                <Box
                    sx={{width: 250}}
                    role="presentation"
                    onClick={() => setDrawerOpen(false)}
                    onKeyDown={() => setDrawerOpen(false)}
                >
                    <List>
                        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </React.Fragment>
    );
}