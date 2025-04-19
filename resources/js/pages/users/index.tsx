import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, Paginator, SharedData } from '@/types';
import { UserData } from '@/types/users';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { usePermissions } from '@/hooks/usePermissions';
import debounce from 'debounce';
import {
    Avatar,
    Button,
    Badge,
    HR,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeadCell,
    TableRow,
    TextInput,
    Tooltip
} from 'flowbite-react';
import { ChevronSort } from 'flowbite-react-icons/outline';
import { PencilIcon, Plus, Search, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';
import { IoEllipsisHorizontalSharp } from 'react-icons/io5';
import { LuCircleDot } from 'react-icons/lu';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Users List',
        href: '/users',
    },
];

const UserList = () => {
    const { delete: destroy, processing, reset, clearErrors  } = useForm();
    const { hasPermission } = usePermissions();
    const { users, filters } = usePage<{ users: Paginator<UserData>; filters: { search: string } }>().props;
    const [inputValue, setInputValue] = useState(filters?.search || '');
    const handleSearch = debounce((value: string) => {
        router.get(
            '/users',
            { search: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    }, 300);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        handleSearch(value);
    };
    const deleteUser = (event: React.FormEvent<HTMLFormElement>, userID: number) => {
        event.preventDefault();
        destroy(route('users.destroy', userID), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    }
    const handleStatusChange = ( userID:number, status:number) => {
        router.post(
            route('users.status_change', userID),
           {
               status: status,
               _method: 'PUT'
           },
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            }
        )
    }
    const closeModal = () => {
        clearErrors();
        reset();
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users List" />
            <div className="flex flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4">
                    <div className="border border-gray-200 shadow-md sm:rounded-lg dark:border-gray-700">
                        <div className="flex w-full flex-wrap justify-between gap-2">
                            <div className="self-center p-3 text-left text-xl font-bold text-gray-900 dark:text-white">Users</div>
                        </div>
                        <HR className="my-0" />
                        <div className="flex w-full flex-wrap justify-between">
                            <div className="max-w-md p-3">
                                <TextInput
                                    id="userSearch"
                                    onChange={(e) => handleChange(e)}
                                    type="search"
                                    icon={Search}
                                    value={inputValue}
                                    placeholder="Search User"
                                    required
                                />
                            </div>
                            {hasPermission('user-create') && (
                                <div className="p-3 align-middle">
                                    <Button className="cursor-pointer" href={route('users.create')}>
                                        <Plus className="mr-2 h-5 w-5" /> Add New
                                    </Button>
                                </div>
                            )}
                        </div>
                        <Table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                            <TableHead>
                                <TableRow key="table_head">
                                    <TableHeadCell>
                                        <span className="flex items-center">
                                            User
                                            <ChevronSort className="ms-1 h-4 w-4" />
                                        </span>
                                    </TableHeadCell>
                                    <TableHeadCell>Phone</TableHeadCell>
                                    <TableHeadCell>
                                        <span className="flex items-center">
                                            Total Businesses
                                            <ChevronSort className="ms-1 h-4 w-4" />
                                        </span>
                                    </TableHeadCell>
                                    <TableHeadCell>Role</TableHeadCell>
                                    <TableHeadCell>
                                        <span className="flex items-center">
                                            Status
                                            <ChevronSort className="ms-1 h-4 w-4" />
                                        </span>
                                    </TableHeadCell>
                                    <TableHeadCell>Last Login</TableHeadCell>
                                    <TableHeadCell>Join Date</TableHeadCell>
                                    {hasPermission('user-edit') && (
                                        <TableHeadCell>
                                            <span className="sr-only">Actions</span>
                                        </TableHeadCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody className="divide-y">
                                {users.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} className="py-6 text-center text-gray-500 dark:text-gray-400">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.data.map((user) => {
                                        const getInitials = () => {
                                            const firstInitial = user.first_name?.charAt(0).toUpperCase() || '';
                                            const lastInitial = user.last_name?.charAt(0).toUpperCase() || '';
                                            return `${firstInitial}${lastInitial}`;
                                        };
                                        const avatarUrl = '';
                                        return (
                                            <React.Fragment key={user.id}>
                                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={user.id}>

                                                    <TableCell
                                                        key={`cell-1_${user.first_name}`}
                                                        className="flex items-center px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white"
                                                    >
                                                        {avatarUrl ? (
                                                            <Avatar
                                                                rounded
                                                                size="md"
                                                                className="h-10 w-10 rounded-full"
                                                                img={avatarUrl}
                                                                alt={`${user.first_name} ${user.last_name}`}
                                                            />
                                                        ) : (
                                                            <Avatar
                                                                rounded
                                                                size="md"
                                                                className="h-10 w-10 rounded-full"
                                                                placeholderInitials={getInitials()}
                                                            />
                                                        )}
                                                        <div className="ps-3">
                                                            <div className="text-base font-semibold">{user.first_name + ' ' + user.last_name}</div>
                                                            <div className="font-normal text-gray-500">{user.email}</div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell key={`cell-6_${user.first_name}`}>{user.phone ?? 'Not Found'}</TableCell>
                                                    <TableCell key={`cell-7_${user.first_name}`}>{user.total_business}</TableCell>
                                                    <TableCell key={`cell-2_${user.first_name}`}>
                                                        <div className="flex flex-wrap gap-2">
                                                            {user.role_names.map((role) => {
                                                                const array = [
                                                                    'info',
                                                                    'gray',
                                                                    'failure',
                                                                    'success',
                                                                    'warning',
                                                                    'indigo',
                                                                    'purple',
                                                                    'pink',
                                                                ];
                                                                const randomIndex: number = Math.floor(Math.random() * array.length);
                                                                const randomValue: string = array[randomIndex];
                                                                return <Badge color={randomValue} key={randomValue}>{role}</Badge>;
                                                            })}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell key={`cell-8_${user.first_name}`}>
                                                        <div className="flex items-center">
                                                            {user.status ? (
                                                                <>
                                                                    <div className="me-2 h-2.5 w-2.5 rounded-full bg-green-500"></div>
                                                                    {hasPermission('user-edit') ? (
                                                                    <Tooltip content="Click here to make user inactive" onClick={()=> handleStatusChange(user.id, 0)} placement="top" className="cursor-pointer">
                                                                        Active
                                                                    </Tooltip>
                                                                        ) : (
                                                                       <>Active</>
                                                                    )}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="me-2 h-2.5 w-2.5 rounded-full bg-red-500"></div>
                                                                    {hasPermission('user-edit') ? (
                                                                    <Tooltip content="Click here to make user active" placement="top" onClick={()=> handleStatusChange(user.id, 1)} className="cursor-pointer">
                                                                        Inactive
                                                                    </Tooltip>
                                                                    ) : (
                                                                        <>Active</>
                                                                    )}
                                                                    </>
                                                            )}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell key={`cell-3_${user.first_name}`}>{user.last_login_at}</TableCell>
                                                    <TableCell key={`cell-4_${user.first_name}`}>{user.created_at}</TableCell>
                                                    {hasPermission('user-edit') && (
                                                    <TableCell key={`cell-5_${user.first_name}`} className="flex gap-1 items-center justify-end text-sm font-medium text-gray-500 whitespace-nowrap dark:text-gray-400">
                                                        {hasPermission('user-edit') && (
                                                        <Menu>
                                                            <MenuButton className="inline-flex cursor-pointer items-center gap-2 border-none border-transparent px-3 py-1.5 hover:bg-gray-100 focus:border-0 focus:outline-0 data-[open]:bg-gray-100 dark:hover:border-1 dark:hover:bg-gray-700 dark:focus:border-none dark:focus:outline-0 dark:data-[open]:bg-gray-700">
                                                                <IoEllipsisHorizontalSharp className="size-4 fill-black/60 dark:fill-white/60" />
                                                            </MenuButton>

                                                            <MenuItems
                                                                transition
                                                                anchor="bottom end"
                                                                className="border-gray/40 w-52 origin-top-right rounded-xl rounded-tr-none border bg-white/95 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 dark:border-white/5 dark:bg-gray-700"
                                                            >
                                                                <MenuItem>
                                                                    <Link href={route('users.edit', user.id)} className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-black/60 data-[focus]:bg-gray-100 dark:text-white/70 dark:data-[focus]:bg-white/10">
                                                                        <PencilIcon className="size-4 fill-black/60 dark:fill-white/70" />
                                                                        Edit
                                                                    </Link>
                                                                </MenuItem>
                                                                {user.id != 1 && (
                                                                <MenuItem>
                                                                    <button className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 cursor-pointer text-black/60 data-[focus]:bg-gray-100 dark:text-white/70 dark:data-[focus]:bg-white/10">
                                                                        {user.status ? (<>
                                                                            <LuCircleDot className="size-4 text-red-400" />
                                                                            Suspend User
                                                                            </>):(<>
                                                                            <LuCircleDot className="size-4 text-green-400" />
                                                                            Suspend User
                                                                            </>)}
                                                                    </button>
                                                                </MenuItem>
                                                                    )}
                                                            </MenuItems>
                                                        </Menu>
                                                        )}
                                                        {user.id != 1 && hasPermission('user-delete') && (
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <button
                                                                        className="group flex w-full items-center gap-2 cursor-pointer rounded-lg pl-3 py-1.5 text-red-400 data-[focus]:bg-gray-100 dark:data-[focus]:bg-white/10 border border-red-400  hover:text-white hover:bg-red-400">
                                                                        <TrashIcon className="size-4" />
                                                                        Delete
                                                                    </button>
                                                                </DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogTitle>Are you sure you want to delete this User?</DialogTitle>
                                                                    <DialogDescription>
                                                                        Once user <strong>{user.first_name}</strong> is deleted, all of its resources and data will also be permanently deleted.
                                                                    </DialogDescription>
                                                                    <DialogFooter className="gap-2">
                                                                        <DialogClose asChild>
                                                                            <Button color="alternative" className="cursor-pointer">
                                                                                Cancel
                                                                            </Button>
                                                                        </DialogClose>
                                                                        <form className="space-y-6" onSubmit={(event) => deleteUser(event, user.id)}>
                                                                            <Button color="red" disabled={processing} type="submit">
                                                                                Delete User
                                                                            </Button>
                                                                        </form>
                                                                    </DialogFooter>
                                                                </DialogContent>
                                                            </Dialog>
                                                        )}
                                                    </TableCell>
                                                    )}
                                                </TableRow>
                                            </React.Fragment>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};
export default UserList;
