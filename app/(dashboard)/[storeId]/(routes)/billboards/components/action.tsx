import React, {useState} from 'react';
import {BillboardColumn} from './columns';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button';
import {Copy, Edit, MoreHorizontal, Trash} from 'lucide-react';
import {useParams, useRouter} from 'next/navigation';
import toast from 'react-hot-toast';
import axios from 'axios';
import {AlertModal} from '@/components/modals/alert-modal';

interface ActionProps {
  data: BillboardColumn;
}

const Action: React.FC<ActionProps> = ({data}) => {
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Billboard id copied to the clipboard');
  };

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/billboards/${data.id}`);

      router.refresh();
      toast.success('Billboard deleted.');
    } catch (error: any) {
      toast.error(
        'Make sure you removed all categories using this billboard first.'
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => {
              onCopy(data.id);
            }}
          >
            <Copy className='h-4 w-4 mr-2' />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => {
              router.push(`/${params.storeId}/billboards/${data.id}`);
            }}
          >
            <Edit className='h-4 w-4 mr-2' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className='h-4 w-4 mr-2' />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Action;
