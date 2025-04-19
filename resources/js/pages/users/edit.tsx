import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import UserForm from '@/pages/users/partials/userForm';
import { Roles } from '@/types/role';
import { UserData } from '@/types/users';
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
const EditUser = () => {
    const { user, roles, user_role } = usePage<{ user: UserData, roles: Roles[], user_role: Roles[] }>().props;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New User" />
            <div className="p-6">
                <UserForm roles={roles} user={user} user_role={user_role} />
            </div>
        </AppLayout>
    );
}
export default EditUser;
