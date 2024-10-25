'use client';

import * as React from 'react';
import Search from "@/src/components/core/toolbarActions/search";
import SettingToolbar from "@/src/components/core/toolbarActions/setting";

export default function ToolbarActions() {
  return (
        <React.Fragment>
            <Search/>
            <SettingToolbar/>
        </React.Fragment>
  );
}
