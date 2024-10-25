'use client';

import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {useState} from "react";
import {Account} from '@/src/define/types';

export default function AccountPage() {
    const [accounts, setAccounts] = useState<Account[]>([
        {
            alias: "test",
            address: "1",
            privateKey: "2"
        }
    ])

    return (
        <DataGrid
            rows={accounts.map((item, id)=>({...item, id}))}
            columns={[
                {field: "alias"},
                {field: "address"},
                {field: "privateKey"},
            ]}
        />
    );
}
