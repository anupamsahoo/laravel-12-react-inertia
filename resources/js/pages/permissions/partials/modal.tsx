import {
    Button,
    Label, Modal,
    ModalBody, ModalFooter,
    ModalHeader,
    TextInput
} from 'flowbite-react';
import InputError from '@/components/input-error';
import { Transition } from '@headlessui/react';
import React, { FormEventHandler, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { type PermissionForm, type PermissionModalProps } from '@/types/permission';

const PermissionModal = ({ openModal, setOpenModal, actionType, permissionData }: PermissionModalProps) => {
    const { data, setData, patch, post, errors, reset, processing, recentlySuccessful } = useForm<Required<PermissionForm>>({
        id: permissionData.id,
        name: permissionData.name,
        alias: permissionData.alias,
    });

    useEffect(() => {
        if (openModal) {
            setData({
                id: permissionData.id ?? '',
                name: permissionData.name ?? '',
                alias: permissionData.alias ?? '',
            });
        }
    }, [openModal, permissionData]);
    function onCloseModal() {
        setOpenModal(false);
        reset();
    }
    const submit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const permissionID = data.id;

        if (permissionID) {
            patch(route('permissions.update', { permission: permissionID }), {
                preserveScroll: true,
            });
        } else {
            post(route('permissions.store'), {
                preserveScroll: true,
                onSuccess: () => onCloseModal(),
                onFinish: () => reset(),
            });
        }
    };
    return (
        <Modal show={openModal} onClose={onCloseModal}>
            <form method="post" id="permitionForm" onSubmit={submit}>
                <ModalHeader>
                    {actionType} Role
                </ModalHeader>
                <ModalBody>
                    <div className="space-y-6">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="permissionName">Permission Name</Label>
                            </div>
                            <TextInput
                                id="permissionName"
                                name="name"
                                placeholder="Permission Name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError className="mt-2" message={errors.name} />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="alias">Permission Alias</Label>
                            </div>
                            <TextInput id="alias"
                                      name="alias"
                                      placeholder="alias"
                                      onChange={(e) => setData('alias', e.target.value)}
                                      value={data.alias} />
                            <InputError className="mt-2" message={errors.alias} />
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

export default PermissionModal;
