import { DataTable } from '@/components/DataTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User } from '@/types';
import { Head, usePage } from '@inertiajs/react';

import { ColumnDef } from '@tanstack/react-table';
import { CreateUser } from './Create';
import { DeleteUser } from './Delete';
import { EditUser } from './Edit';

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: '',
    },
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'email',
        header: 'Email Address',
    },
    {
        accessorKey: 'edit',
        header: '',
        cell: ({ row }) => <EditUser data={row.original as User} />,
    },
    {
        accessorKey: 'delete',
        header: '',
        cell: ({ row }) =>
            usePage().props.auth.user.id === row.original.id ? (
                <></>
            ) : (
                <DeleteUser data={row.original as User} />
            ),
    },
];

export default function Users(users: { users: User[] }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm dark:bg-gray-800 sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <CreateUser />
                            <DataTable columns={columns} data={users.users} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
