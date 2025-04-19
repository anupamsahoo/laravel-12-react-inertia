import React from 'react';

export interface Roles {
    id: number,
    name: string,
    description: string,
    permissions: Permission[],
    users_count: number,
    created_at: string,
    updated_at: string,
    [key: string]: unknown;
}
export interface PermissionName{
    id: number,
    name: string,
    alias: string,
    permissions: Permission[],
    [key: string]: unknown;
}
export interface Permission {
    id: number,
    name_id: number,
    nice_name: string,
    created_at: string,
    updated_at: string,
    [key: string]: unknown;
}
export interface UsersCount{
    users_count: number;
}
export interface RoleModalProps {
    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    actionType: string;
    roleData: Roles<never[]>;
    permissionsNames: PermissionName[];
    rolePermissionsArray: rolePermissionsArray<never[]>
}
export interface rolePermissionsArray{
    name: string;
}
