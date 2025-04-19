"use client";

import {
    Button,
    Checkbox,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    Textarea,
    TextInput,
} from 'flowbite-react';
import React, { FormEventHandler } from 'react';
import { type RoleModalProps } from '@/types/role';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';

interface RoleForm {
    id:number,
    name: string;
    description: string;
    permission: string[];
}

const RoleModal = ({ openModal, setOpenModal, actionType, roleData, permissionsNames, rolePermissionsArray }: RoleModalProps) => {
    //const [roleName, setRoleName] = useState(roleData.name);
    //const [roleDescription, setRoleDescription] = useState(roleData.description);

    const { data, setData, patch, post, errors, reset, processing, recentlySuccessful } = useForm<Required<RoleForm>>({
        id: roleData.id,
        name: roleData.name,
        description: roleData.description,
        permission: rolePermissionsArray || [],
    });
    function onCloseModal() {
        setOpenModal(false);
        reset();
        //setRoleName("");
        //setRoleDescription("");
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, permission: string) => {
        const { checked } = event.target;
        setData('permission', checked ? [...data.permission, permission] : data.permission.filter((perm) => perm !== permission));
    };

    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const roleID = data.id;

        if (roleID) {
            patch(route('roles.update', { role: roleID }), {
                preserveScroll: true,
            });
        } else {
            post(route('roles.store'), {
                preserveScroll: true,
                onSuccess: () => onCloseModal(),
                onFinish: () => reset(),
            });
        }
    };

    return (
        <Modal show={openModal} size="4xl" onClose={onCloseModal}>
            <form method="post" onSubmit={submit}>
                <ModalHeader>
                    {actionType} Role
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="roleName">Role Name</Label>
                            </div>
                            <TextInput
                                id="roleName"
                                name="name"
                                placeholder="Role Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="description">Description</Label>
                            </div>
                            <Textarea id="Description"
                                      name="description"
                                      placeholder="Description"
                                      onChange={(e) => setData('description', e.target.value)}
                                      value={data.description} />
                            <InputError className="mt-2" message={errors.description} />
                        </div>
                        <div>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHead color="teal">
                                        <TableRow>
                                            <TableHeadCell colSpan={5} className="dark:bg-teal-600 dark:text-white">Role
                                                Permissions</TableHeadCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="divide-y">
                                        {permissionsNames.map((pName) => {
                                            return (
                                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={pName.name}>
                                                    <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                                                        {pName.name}
                                                    </TableCell>

                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id={`read-${pName.id}`}
                                                                value={`${pName.alias}-list`}
                                                                defaultChecked={!!rolePermissionsArray.includes(`${pName.alias}-list`)}
                                                                onChange={(e) => handleCheckboxChange(e, `${pName.alias}-list`)}
                                                            />
                                                            <Label htmlFor={`read-${pName.id}`} className="flex">
                                                                Read
                                                            </Label>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id={`create-${pName.id}`}
                                                                value={pName.alias + '-create'}
                                                                defaultChecked={!!rolePermissionsArray.includes(`${pName.alias}-create`)}
                                                                onChange={(e) => handleCheckboxChange(e, `${pName.alias}-create`)}
                                                            />
                                                            <Label htmlFor={`create-${pName.id}`} className="flex">
                                                                Create
                                                            </Label>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id={`update-${pName.id}`}
                                                                value={pName.alias + '-edit'}
                                                                defaultChecked={!!rolePermissionsArray.includes(`${pName.alias}-edit`)}
                                                                onChange={(e) => handleCheckboxChange(e, `${pName.alias}-edit`)}
                                                            />
                                                            <Label htmlFor={`update-${pName.id}`} className="flex">
                                                                Update
                                                            </Label>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox
                                                                id={`delete-${pName.id}`}
                                                                value={pName.alias + '-edit'}
                                                                defaultChecked={!!rolePermissionsArray.includes(`${pName.alias}-delete`)}
                                                                onChange={(e) => handleCheckboxChange(e, `${pName.alias}-delete`)}
                                                            />
                                                            <Label htmlFor={`delete-${pName.id}`} className="flex">
                                                                Delete
                                                            </Label>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-between">
                    <Button color="alternative" className="cursor-pointer" onClick={() => setOpenModal(false)}>Close</Button>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-md text-green-600">Saved</p>
                    </Transition>
                    <Button type="submit" color="green" className="cursor-pointer" disabled={processing}>Submit</Button>
                </ModalFooter>
            </form>
        </Modal>
);
}
export default RoleModal;
