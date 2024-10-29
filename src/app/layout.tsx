'use client'

import * as React from 'react'
import { Suspense } from 'react'
import { AppProvider } from '@toolpad/core/nextjs'
import { NotificationsProvider } from '@toolpad/core'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'

import theme from '@/src/theme'
import { navigation } from '@/src/components/core/navigation'
import SidebarFooter from '@/src/components/core/sidebarFooter'
import ToolbarActions from '@/src/components/core/toolbarActions'
import Init from '@/src/components/core/init'

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en' data-toolpad-color-scheme='light' suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <Suspense>
            <AppProvider
              navigation={navigation}
              branding={{
                title: 'ABI Tools'
              }}
              theme={theme}
            >
              <NotificationsProvider>
                <Init>
                  <DashboardLayout
                    slots={{
                      toolbarActions: ToolbarActions,
                      sidebarFooter: SidebarFooter
                    }}
                  >
                    {props.children}
                  </DashboardLayout>
                </Init>
              </NotificationsProvider>
            </AppProvider>
          </Suspense>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
