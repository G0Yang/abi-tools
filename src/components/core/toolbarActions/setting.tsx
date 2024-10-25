'use client';

import * as React from 'react';
import {IconButton, Tooltip } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';

export default function SettingToolbar() {
    return (
        <React.Fragment>
            <Tooltip title="Setting" enterDelay={1000}>
                <div>
                    <IconButton
                        type="button"
                        aria-label="setting"
                    >
                        <SettingsIcon />
                    </IconButton>
                </div>
            </Tooltip>
        </React.Fragment>
    );
}