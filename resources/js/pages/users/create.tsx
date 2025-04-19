import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import UserForm from '@/pages/users/partials/userForm';
import { Roles } from '@/types/role';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users List',
        href: '/users',
    },
    {
        title: 'Create New User',
        href: '#',
    },
];
const CreateUser = () => {
    const { roles } = usePage<{ roles: Roles[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New User" />
            <div className="p-6">
                <UserForm roles={roles} user_role={[]} />
            </div>
        </AppLayout>
    );
}
export default CreateUser;
