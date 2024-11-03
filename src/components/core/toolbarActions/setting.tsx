'use client'

import * as React from 'react'
import { Box, IconButton, List, ListItem, Drawer, Tooltip, Card, Divider } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import NetworkSelect from '@/src/components/networkSelect'
import { useNetworkStatus } from '@/src/store/networkStatus'
import Typography from '@mui/material/Typography'

export default function SettingToolbar() {
  const { status } = useNetworkStatus()
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
          <List sx={{ px: 1 }}>
            <ListItem disablePadding>
              <Card sx={{ width: '100%', p: 1 }}>
                <Typography gutterBottom sx={{ fontSize: 20 }}>
                  Connection Info
                </Typography>
                <Typography sx={{ fontSize: 16 }}>Rpc Url</Typography>
                <NetworkSelect />
                <Typography sx={{ fontSize: 16 }}>Chain Id</Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }} align='right'>
                  {status?.chainId || status?.netVersion}
                </Typography>
                <Divider />
                <Typography sx={{ fontSize: 16 }}>Name</Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }} align='right'>
                  {status?.name}
                </Typography>
                <Divider />
                <Typography sx={{ fontSize: 16 }}>Client</Typography>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }} align='right'>
                  {status?.clientVersion}
                </Typography>
              </Card>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  )
}
