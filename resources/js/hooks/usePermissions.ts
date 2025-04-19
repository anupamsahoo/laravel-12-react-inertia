// hooks/usePermissions.ts
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types'; // adjust path as needed

export const usePermissions = () => {
    const { auth } = usePage<SharedData>().props;
    const permissions: string[] = auth.permissions ?? [];

    const hasPermission = (perm: string): boolean => permissions.includes(perm);

    return {
        permissions,
        hasPermission,
    };
};
