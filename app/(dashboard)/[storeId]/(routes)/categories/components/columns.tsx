'use client';

import {ColumnDef} from '@tanstack/react-table';
import Action from './action';

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'billboardLabel',
    header: 'Billboard',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'action',
    cell: ({row}) => <Action data={row.original} />,
  },
];
