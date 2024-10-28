'use client';

import Typography from '@mui/material/Typography';
import {SidebarFooterProps} from "@toolpad/core";

export default function SidebarFooter({ mini }: SidebarFooterProps) {
  return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {mini ? '© ender' : `© ${new Date().getFullYear()} Made by ender`}
        </Typography>
  );
}
