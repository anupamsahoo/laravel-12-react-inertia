import { Permission } from '@/types/role';
import React from 'react';

export interface PermissionNameInP{
    id: number,
    name: string,
    alias: string,
    permissions: Permission[],
    assign_to: [],
    created_at: string,
    [key: string]: unknown;
}
export interface PermissionForm {
    id:number,
    name: string;
    alias: string;
}

export interface PermissionModalProps{
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    actionType: string;
    permissionData: PermissionForm<never[]>;
}
