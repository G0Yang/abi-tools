'use client'

import * as React from 'react'
import { Box, IconButton, List, ListItem, ListItemButton, Drawer, Tooltip } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import NetworkSelect from '@/src/components/networkSelect'

export default function SettingToolbar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

  return (
    <React.Fragment>
      <Tooltip title='Setting' onClick={() => setDrawerOpen(!drawerOpen)}>
        <div>
          <IconButton type='button' aria-label='setting'>
            <SettingsIcon />
          </IconButton>
        </div>
      </Tooltip>
      <Drawer anchor={'right'} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ height: 64 }} />
        <Box sx={{ width: 300 }} role='presentation'>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <NetworkSelect />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}
