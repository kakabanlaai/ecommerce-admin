'use client';

import {ColumnDef} from '@tanstack/react-table';

import {CellAction} from './cell-action';
import {Color} from '@prisma/client';

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  category: string;
  size: string;
  colors: Color[];
  createdAt: string;
  isFeatured: boolean;
  isArchived: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({row}) => (
      <div className='flex-col items-center space-y-2'>
        {row.original.colors.map((item) => (
          <div className='flex items-center justify-between' key={item.id}>
            {item.value}{' '}
            <div
              className='h-6 w-6 rounded-full border'
              style={{backgroundColor: item.value}}
            />
          </div>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({row}) => <CellAction data={row.original} />,
  },
];
