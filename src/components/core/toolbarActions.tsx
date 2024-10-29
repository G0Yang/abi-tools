'use client'

import * as React from 'react'
import Search from '@/src/components/core/toolbarActions/search'
import SettingToolbar from '@/src/components/core/toolbarActions/setting'
import { Fragment } from 'react'

export default function ToolbarActions() {
  return (
    <Fragment>
      <Search />
      <SettingToolbar />
    </Fragment>
  )
}
