'use client';

import * as React from 'react';
import {AppProvider} from '@toolpad/core/nextjs';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v14-appRouter';
import {DashboardLayout} from '@toolpad/core/DashboardLayout';

import theme from '../theme';
import {navigation} from "@/src/components/core/navigation"
import SidebarFooter from "@/src/components/core/sidebarFooter";
import ToolbarActions from "@/src/components/core/toolbarActions";

import {Suspense} from 'react'

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" data-toolpad-color-scheme="light" suppressHydrationWarning>
        <body>

        <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <Suspense>
                <AppProvider
                    navigation={navigation}
                    branding={{
                        title: 'ABI Tools',
                    }}

                    theme={theme}
                >
                    <DashboardLayout
                        slots={{
                            toolbarActions: ToolbarActions,
                            sidebarFooter: SidebarFooter,
                        }}
                    >
                        {props.children}
                    </DashboardLayout>
                </AppProvider>
            </Suspense>
        </AppRouterCacheProvider>

        </body>
        </html>
    );
}
