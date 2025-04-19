import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type BreadcrumbItem, type FlashProps } from '@/types';
import { type PermissionName, type Roles } from '@/types/role';
import { Button } from 'flowbite-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React, { useEffect, useState } from 'react';
import RoleModal from '@/pages/roles/partials/modal';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { toast, Toaster } from 'sonner';
import { usePermissions } from '@/hooks/usePermissions';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Roles List',
        href: '/roles',
    },
];

const RoleList = () => {
    const { roles, permissionsNames } = usePage<{ roles: Roles[], permissionsNames: PermissionName[] }>().props;
    const { hasPermission } = usePermissions();
    const [openModal, setOpenModal] = useState(false);
    const addRole = 'Add';
    const { delete: destroy, processing, reset, clearErrors  } = useForm();
    const { flash } = usePage<{ flash: FlashProps }>().props;
    const deleteRole = (event:React.FormEvent<HTMLFormElement>, roleId:number) => {
        event.preventDefault();
        destroy(route('roles.destroy', roleId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };
    const closeModal = () => {
        clearErrors();
        reset();
    };
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }

        if (flash.error) {
            toast.success(flash.error);
        }
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles List" />

            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-4 md:grid-cols-3">
                    {
                        roles.map((role) => {
                            const maxVisible = 5;
                            const permissions = role.permissions.map((p) => p.nice_name);
                            const visiblePermissions = permissions.slice(0, maxVisible);
                            const hiddenCount = permissions.length - maxVisible;
                            return (
                                <Card key={role.id} className="gap-3">
                                    <CardHeader>
                                        <CardTitle>{role.name}</CardTitle>
                                        <CardDescription>
                                            Total users with this role: {role.users_count}
                                            <p className="mt-2">{role.description}</p>
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-full">
                                        <div className="flex flex-col">
                                            {visiblePermissions.map((perm, index) => (
                                                <>
                                                    <div className="flex items-center py-1" key={perm}>
                                                        <span className="mr-3 h-1 w-2 rounded-full bg-blue-500"></span>
                                                        {perm}
                                                        {index < visiblePermissions.length - 1 ? ', ' : ''}
                                                    </div>
                                                </>
                                            ))}
                                            {hiddenCount > 0 && (
                                                <div className="flex items-center py-1">
                                                    <span className="mr-3 h-1 w-2 rounded-full bg-blue-500"></span>
                                                    <em> and {hiddenCount} more...</em>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                    {hasPermission('role-edit') && (
                                    <CardFooter className="justify-end">
                                        <div className="flex justify-between gap-2 w-full">
                                            <Button
                                                outline
                                                href={`/roles/${role.id}`}
                                                className="cursor-pointer"
                                            >
                                                View/Edit Role
                                            </Button>
                                            {role.id != 1 && (
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            outline
                                                            color="red"
                                                            href="#"
                                                            className="cursor-pointer"
                                                        >
                                                            Delete Role
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogTitle>Are you sure you want to delete this Role?</DialogTitle>
                                                        <DialogDescription>
                                                            Once role {role.name} is deleted, all of its resources and data will also be permanently deleted.
                                                        </DialogDescription>
                                                        <form className="space-y-6" onSubmit={(event) => deleteRole(event, role.id)}>
                                                            <DialogFooter className="gap-2">
                                                                <DialogClose asChild>
                                                                    <Button color="alternative" className="cursor-pointer" onClick={closeModal}>
                                                                        Cancel
                                                                    </Button>
                                                                </DialogClose>

                                                                <Button color="red" disabled={processing}>
                                                                    <button type="submit">Delete role</button>
                                                                </Button>
                                                            </DialogFooter>
                                                        </form>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                        </div>
                                    </CardFooter>
                                    )}
                                </Card>
                            );
                        })
                    }
                    {hasPermission('role-create') && (
                    <Card>
                        <CardHeader></CardHeader>
                        <CardContent className="text-center h-full self-center align-middle">
                            <a href={'#'}
                               onClick={() => setOpenModal(true)}
                               className="cursor-pointer text-xl font-bold hover:text-blue-600">
                                <img src="https://sslsforfree.com/assets/media/illustrations/sketchy-1/4.png" alt="" className="h-[150px] w-[150px]" />
                                Add New Role
                            </a>
                        </CardContent>
                        <CardFooter></CardFooter>
                    </Card>
                    )}
                </div>
                <RoleModal openModal={openModal} setOpenModal={setOpenModal} actionType={addRole} roleData={[]} permissionsNames={permissionsNames} rolePermissionsArray={[]} />
            </div>
        </AppLayout>
    )};
export default RoleList;
