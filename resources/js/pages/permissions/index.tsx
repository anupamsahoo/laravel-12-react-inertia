import React, { useEffect, useState } from 'react';
import type { BreadcrumbItem, FlashProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, Badge, Button } from 'flowbite-react';
import { type PermissionNameInP } from '@/types/permission';
import PermissionModal from '@/pages/permissions/partials/modal';
import axios from 'axios';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { usePermissions } from '@/hooks/usePermissions';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Permissions List',
        href: '/permissions',
    },
];
const PermissionList = () => {
    const { hasPermission } = usePermissions();
    const [openModal, setOpenModal] = useState(false);
    const [actionType, setActionType] = useState('Add');
    const [permissionData, setPermissionData] = useState(false);
    const { delete: destroy, reset, clearErrors, processing } = useForm();
    const { permissions } = usePage<{ permissions: PermissionNameInP[] }>().props;
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const deletePermission = (event:React.FormEvent<HTMLFormElement>, permissionID:number) => {
        event.preventDefault();
        destroy(route('permissions.destroy', permissionID), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    const closeModal = () => {
        clearErrors();
        reset();
        setActionType('Add');
    };
    const resetModalForm = () => {
        setPermissionData(false);
        setActionType('Add');
        reset();
    }
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.success(flash.error);
        }
    }, [flash]);
    const retrievePermission = (permissionId: number) => {
        axios.get('/permissions/' + permissionId)
            .then((response) => {
                setActionType('Edit')
                setPermissionData(response.data.permissionName);
            })
            .catch(() => {
                console.log('Error');
            });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Permisssions List" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4">
                    <div
                        className="overflow-x-auto border border-gray-200 shadow-md sm:rounded-lg dark:border-gray-700">
                        <div className="flex flex-wrap gap-2 justify-between w-full">
                            <div
                                className="align-middle p-5 text-left text-xl font-bold text-gray-900 dark:text-white">
                                Permissions
                            </div>
                            {hasPermission('permission-create') && (
                                <div className="p-5 align-middle"><Button className="cursor-pointer" onClick={() => {setOpenModal(true); resetModalForm();}}><Plus className="mr-2 h-5 w-5" /> Add New</Button></div>
                            )}
                        </div>
                        <Table hoverable className="sm:rounded-lg">
                            <TableHead>
                                <TableRow key="table_head">
                                    <TableHeadCell>Permission name</TableHeadCell>
                                    <TableHeadCell>Assigned to</TableHeadCell>
                                    <TableHeadCell>Created Date</TableHeadCell>
                                    {hasPermission('permission-edit') && <TableHeadCell>Actions</TableHeadCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {permissions.map((permission) => {
                                    return (
                                        <>
                                            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                                      key={permission.name}>
                                                <TableCell key={`cell-1_${permission.name}`}
                                                    className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {permission.name}
                                                </TableCell>
                                                <TableCell key={`cell-2_${permission.name}`}>
                                                    <div className="flex flex-wrap gap-2">
                                                        {permission.assign_to.map((assign_to) => {
                                                            const array = ['info', 'gray', 'failure', 'success', 'warning', 'indigo', 'purple', 'pink'];
                                                            const randomIndex: number = Math.floor(Math.random() * array.length);
                                                            const randomValue: string = array[randomIndex];
                                                            return (
                                                                <Badge color={randomValue}>{assign_to}</Badge>
                                                            );
                                                        })}
                                                    </div>
                                                </TableCell>
                                                <TableCell key={`cell-3_${permission.name}`}>{permission.created_at}</TableCell>
                                                {hasPermission('permission-edit') && (
                                                <TableCell key={`cell-4_${permission.name}`} className="flex gap-1">
                                                    <Button size="xs" className="cursor-pointer" color="alternative" onClick={() => {setOpenModal(true); retrievePermission(permission.id);}}>
                                                        <Pencil className="-ml-1 h-3 w-3 mr-1" /> Edit
                                                    </Button>
                                                    {hasPermission('permission-delete') &&(
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button
                                                                outline
                                                                color="red"
                                                                size="xs"
                                                                href="#"
                                                                className="cursor-pointer"
                                                            >
                                                                <Trash2 className="-ml-1 h-3 w-3 mr-1" />
                                                                Delete
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogTitle>Are you sure you want to delete this Permission?</DialogTitle>
                                                            <DialogDescription>
                                                                Once {permission.name} is deleted, all of its resources and data will also be permanently deleted.
                                                            </DialogDescription>
                                                            <form className="space-y-6" onSubmit={(event) => deletePermission(event, permission.id)}>
                                                                <DialogFooter className="gap-2">
                                                                    <DialogClose asChild>
                                                                        <Button color="alternative" className="cursor-pointer" onClick={closeModal}>
                                                                            Cancel
                                                                        </Button>
                                                                    </DialogClose>

                                                                    <Button color="red" disabled={processing}>
                                                                        <button type="submit">Delete Permission</button>
                                                                    </Button>
                                                                </DialogFooter>
                                                            </form>
                                                        </DialogContent>
                                                    </Dialog>
                                                    )}
                                                </TableCell>
                                                )}
                                            </TableRow>
                                        </>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>
                <PermissionModal openModal={openModal} setOpenModal={setOpenModal} actionType={actionType} permissionData={permissionData}  />
                <Toaster position="top-right" richColors closeButton />
            </div>
        </AppLayout>
    )
}
export default PermissionList;
