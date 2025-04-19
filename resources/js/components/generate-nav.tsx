import { type NavGroup, type NavItem} from '@/types';
import { BriefcaseBusiness, KeyRound, UserRoundCog, Users } from 'lucide-react';

const generateNav = (authPermissions: string[]): NavGroup[] => {
    const hasPermission = (perm: string) => authPermissions.includes(perm);

    const navMain: NavGroup[] = [];

    // USER MANAGEMENT
    const userManagementItems = [];

    // Users
    const userItems: NavItem[] = [];
    if (hasPermission('user-list')) {
        userItems.push({ title: 'User List', href: '/users' });
    }
    if (hasPermission('user-create')) {
        userItems.push({ title: 'Add New User', href: '/users/create' });
    }
    if (userItems.length > 0) {
        userManagementItems.push({
            title: 'Users',
            href: '#',
            icon: Users,
            items: userItems,
        });
    }

    // Roles
    if (hasPermission('role-list')) {
        userManagementItems.push({
            title: 'Roles',
            href: '#',
            icon: UserRoundCog,
            items: [{ title: 'Roles List', href: '/roles' }],
        });
    }

    // Permissions
    if (hasPermission('permission-list')) {
        userManagementItems.push({
            title: 'Permissions',
            href: '#',
            icon: KeyRound,
            items: [{ title: 'Permissions List', href: '/permissions' }],
        });
    }

    if (userManagementItems.length > 0) {
        navMain.push({
            title: 'USER MANAGEMENT',
            items: userManagementItems,
        });
    }

    // PLATFORM
    const platformItems = [];
    if (hasPermission('business-list')) {
        platformItems.push({
            title: 'Business',
            href: '#',
            icon: BriefcaseBusiness,
            items: [{ title: 'Business List', href: '/business' }],
        });
    }

    if (platformItems.length > 0) {
        navMain.push({
            title: 'PLATFORM',
            items: platformItems,
        });
    }

    return navMain;
}
export default generateNav;
