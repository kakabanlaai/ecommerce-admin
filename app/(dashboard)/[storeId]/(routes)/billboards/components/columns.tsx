'use client';

import {ColumnDef} from '@tanstack/react-table';
import Action from './action';

export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'action',
    cell: (({ row }) => <Action data={row.original} />)
    
  }
];
