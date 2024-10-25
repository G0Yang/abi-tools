import type { Navigation } from '@toolpad/core/AppProvider';

import DashboardIcon from '@mui/icons-material/Dashboard';

export const navigation: Navigation = [
  {
    kind: 'header',
    title: 'Contract',
  },
  {
    kind: "page",
    segment: 'contract/ethers',
    title: 'Ethers',
    icon: <DashboardIcon />,
  },
  {
    segment: 'contract/metamask',
    title: 'Metamask',
    icon: <DashboardIcon />,
  },
  {
    title: 'Tools',
    segment: 'tools',
    children: [
      {
        segment: 'debug',
        title: 'Debug',
        icon: <DashboardIcon />,
      },
    ]
  },
  {
    title: 'Setting',
    segment: 'setting',
    children: [
      {
        segment: 'account',
        title: 'Account',
        icon: <DashboardIcon />,
      },
      {
        segment: 'network',
        title: 'Network',
        icon: <DashboardIcon />,
      },
      {
        segment: 'abi',
        title: 'ABI',
        icon: <DashboardIcon />,
      },
    ]
  },
]