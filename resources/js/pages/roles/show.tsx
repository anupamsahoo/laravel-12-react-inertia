import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type BreadcrumbItem, type FlashProps, type User } from '@/types';
import { type PermissionName, rolePermissionsArray, type Roles, type UsersCount } from '@/types/role';
import {
    Button,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow
} from 'flowbite-react';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import RoleModal from '@/pages/roles/partials/modal';
import { toast, Toaster } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Role',
        href: '/roles',
    },
    {
        title: 'Show',
        href: '#',
    },
];

const ShowRole = () => {
    const { role, users, users_count, permissionsNames, rolePermissionsArray } = usePage<{ role: Roles, users: User[], users_count: UsersCount, permissionsNames: PermissionName[], rolePermissionsArray: rolePermissionsArray }>().props;
    const [openModal, setOpenModal] = useState(false);
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const editRole = 'Edit';
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.success(flash.error);
        }
    }, [flash]);
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={`Role ${role.name}`} />
                <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-1 xl:grid-cols-12">
                        <Card className="gap-0 rounded-lg border border-gray-200 bg-white shadow-md sm:col-span-1 sm:rounded-lg lg:col-span-3 dark:border-gray-700 dark:bg-gray-800">
                            <div>
                                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">{role.name}</h5>
                                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{role.description}</p>
                            </div>
                            <div className="flex flex-col">
                                {role.permissions.map((permission) => (
                                    <div className="flex items-center py-1" key={permission.nice_name}>
                                        <span className="mr-3 h-1 w-2 rounded-full bg-blue-500"></span> {permission.nice_name}
                                    </div>
                                ))}
                                <div className="flex gap-2">
                                    <Button outline
                                        onClick={() => setOpenModal(true)}
                                        className="mt-3 w-1/2 cursor-pointer"
                                    >
                                        Edit Role
                                    </Button>
                                </div>
                            </div>
                        </Card>
                        <RoleModal openModal={openModal} setOpenModal={setOpenModal} actionType={editRole} roleData={role} permissionsNames={permissionsNames} rolePermissionsArray={rolePermissionsArray} />
                        <div className="w-full sm:col-span-1 lg:col-span-9">
                            <div className="relative border border-gray-200 shadow-md sm:rounded-lg dark:border-gray-700">
                                <Table className="sm:rounded-lg">
                                    <caption className="bg-white p-5 text-left text-xl font-bold text-gray-900 rtl:text-right dark:bg-gray-800 dark:text-white">
                                        Users Assigned ({users_count.toString()})
                                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                            The total number of users assigned to this role.
                                        </p>
                                    </caption>
                                    <TableHead>
                                        <TableRow>
                                            <TableHeadCell>User ID(#)</TableHeadCell>
                                            <TableHeadCell>Name</TableHeadCell>
                                            <TableHeadCell>Email</TableHeadCell>
                                            <TableHeadCell>
                                                <span className="sr-only">Action</span>
                                            </TableHeadCell>
                                        </TableRow>
                                    </TableHead>
                                    {users.length > 0 ? (
                                        <TableBody className="divide-y">
                                            {users.map((user) => (
                                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user.id}>
                                                    <TableCell className="py-0">{user.id}</TableCell>
                                                    <TableCell>{user.first_name + ' ' + user.last_name}</TableCell>
                                                    <TableCell>{user.email}</TableCell>
                                                    <TableCell className="flex gap-1">
                                                        <Button size="xs" color="alternative" href="#">
                                                            <Pencil className="-ml-1 h-3 w-3 mr-1" /> Edit
                                                        </Button>
                                                        <Button size="xs" color="red" outline href="#">
                                                            <Trash2 className="-ml-1 h-3 w-3 mr-1" /> Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    ) : (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={4} className="text-center py-4">
                                                    No users found.
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    )}
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster position="top-right" richColors closeButton />
            </AppLayout>
        </>
    );
};

export default ShowRole;
