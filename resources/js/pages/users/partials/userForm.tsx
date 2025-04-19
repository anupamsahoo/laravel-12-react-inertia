import { useForm } from '@inertiajs/react';
import { Button, HR, Label, TextInput, Select } from 'flowbite-react';
import { Roles } from '@/types/role';
import { BsGlobeAmericas } from 'react-icons/bs';
import InputError from '@/components/input-error';
import { Radio, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { UserData } from '@/types/users';

type UserRole = {
    name: string | never;
};

type UserProps = {
    roles: Roles[];
    user?: UserData;
    user_role?: UserRole[];
    onSuccess?: () => void;
};

const UserForm = ({ roles, user, user_role, onSuccess } : UserProps) => {
    const isEdit = !!user;

    let defaultRole = 'Member';

    if (Array.isArray(user?.roles) && user.roles.length > 0) {
        defaultRole = user.roles[0].name;
    } else if (Array.isArray(user_role) && user_role.length > 0) {
        defaultRole = user_role[0].name;
    }

    const { data, setData, post, put, processing, errors } = useForm({
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: user?.password || '',
        confirm_password: user?.confirm_password || '',
        website: user?.website || '',
        address: user?.address || '',
        city: user?.city || '',
        state: user?.state || '',
        country: user?.country || '',
        postcode: user?.postcode || '',
        roles: defaultRole,
        status: user?.status || 1
    });
    let selectedRole = roles.find((r) => r.name === data.roles) || null;
    if (user_role && user_role.length > 0) {
        selectedRole = roles.find((r) => r.name === data.roles) || (user_role[0] as Roles);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(`/users/${user?.id}`, { onSuccess });
        } else {
            post('/users', { onSuccess });
        }
    };
    return (
        <form onSubmit={handleSubmit} className="border-1 border-gray-200 dark:border-0 mx-auto w-full space-y-6 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{isEdit ? 'Edit User' : 'Add New User'}</h2>
            <HR />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="first_name">First Name</Label>
                    </div>
                    <TextInput
                        id="first_name"
                        placeholder="Please enter your first name"
                        value={data.first_name}
                        onChange={(e) => setData('first_name', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.first_name} />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="last_name">Last Name</Label>
                    </div>
                    <TextInput
                        id="last_name"
                        placeholder="Please enter your last name"
                        value={data.last_name}
                        onChange={(e) => setData('last_name', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.last_name} />
                </div>

                {/* Password */}
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="email">Email Address (Username)</Label>
                    </div>
                    <TextInput
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Please enter your email address"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="phone">Phone Number</Label>
                    </div>
                    <TextInput
                        id="phone"
                        name="phone"
                        placeholder="Please enter your Last Name"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.phone} />
                </div>
            </div>
            <HR />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="password">{isEdit ? 'New Password (optional)' : 'Password'}</Label>
                    </div>
                    <TextInput
                        id="password"
                        name="password"
                        type="password"
                        placeholder={isEdit ? 'Please enter New Password (optional)' : 'Please enter Password'}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.password} />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="confirm_password">{isEdit ? 'Re-Type New Password (optional)' : 'Re-Type Password'}</Label>
                    </div>
                    <TextInput
                        id="confirm_password"
                        name="confirm_password"
                        type="password"
                        placeholder={isEdit ? 'Re-Type New Password Again(optional)' : 'Re-Type Password Again'}
                        onChange={(e) => setData('confirm_password', e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.confirm_password} />
                </div>
            </div>
            <HR />
            <div>
                <div className="mb-1 block">
                    <Label htmlFor="website">Website Url</Label>
                </div>
                <TextInput
                    id="website"
                    name="website"
                    placeholder="Enter Website Url"
                    value={data.website}
                    icon={BsGlobeAmericas}
                    onChange={(e) => setData('website', e.target.value)}
                />
            </div>
            <HR />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="address">Address</Label>
                    </div>
                    <TextInput
                        id="address"
                        name="address"
                        placeholder="Please enter your Address"
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="city">City</Label>
                    </div>
                    <TextInput
                        id="city"
                        name="city"
                        placeholder="Please enter your city"
                        value={data.city}
                        onChange={(e) => setData('city', e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="state">State</Label>
                    </div>
                    <TextInput
                        id="state"
                        name="state"
                        placeholder="Please enter your state"
                        value={data.state}
                        onChange={(e) => setData('state', e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="country">Country</Label>
                    </div>
                    <TextInput
                        id="country"
                        name="country"
                        placeholder="Please enter your country"
                        value={data.country}
                        onChange={(e) => setData('country', e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="address">Postcode</Label>
                    </div>
                    <TextInput
                        id="postcode"
                        name="postcode"
                        placeholder="Please enter your postcode"
                        value={data.postcode}
                        onChange={(e) => setData('postcode', e.target.value)}
                    />
                </div>
                <div>
                    <div className="mb-1 block">
                        <Label htmlFor="status">Status</Label>
                    </div>
                    <Select id="status" name="status" onChange={(e) => setData('status', e.target.value)}>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </Select>
                </div>
            </div>
            <HR />
            <div>
                <div className="flex gap-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">Select Role</h2>
                    <InputError className="mt-2" message={errors.roles} />
                </div>
                <RadioGroup
                    by="name"
                    aria-label="Role"
                    value={selectedRole}
                    onChange={(role: Roles) => setData('roles', role.name)}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {roles.map((role) =>
                        <Radio
                            key={role.id}
                            value={role}
                            className="border-1 border-gray-200 dark:border-0 group relative flex cursor-pointer rounded-lg bg-white/5 px-5 py-4 text-white dark:text-black shadow-md transition focus:outline-none data-[checked]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                            <div className="flex w-full items-center justify-between">
                                <div className="text-sm/6">
                                    <p className="font-semibold text-black dark:text-white">{role.name}</p>
                                    <div className="flex gap-2 text-black dark:text-white">
                                        <div>{role.description}</div>
                                    </div>
                                </div>
                                <CheckCircleIcon className="size-6 fill-cyan-900 border dark:fill-white opacity-0 transition group-data-[checked]:opacity-100" />
                            </div>
                        </Radio>
                    )}
                </RadioGroup>
            </div>
            <HR />
            <div className="flex w-full justify-between">
                <Button href="/users" outline>
                    Back
                </Button>
                <Button type="submit" className="cursor-pointer" disabled={processing}>
                    {processing ? (isEdit ? 'Updating...' : 'Adding...') : isEdit ? 'Update User' : 'Add User'}
                </Button>
            </div>
        </form>
    );
};

export default UserForm;
