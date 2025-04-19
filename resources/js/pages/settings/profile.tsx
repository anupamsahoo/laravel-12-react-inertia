import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { HR, TextInput } from 'flowbite-react';
import { BsGlobeAmericas } from 'react-icons/bs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

interface ProfileForm {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    city: string;
    country: string;
    state: string;
    postcode: string;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        first_name: auth.user.first_name ?? '',
        last_name: auth.user.last_name ?? '',
        email: auth.user.email ?? '',
        phone: (auth.user.phone as string | undefined) ?? '',
        website: (auth.user.website as string | undefined) ?? '',
        address: (auth.user.address as string | undefined) ?? '',
        city: (auth.user.city as string | undefined) ?? '',
        country: (auth.user.country as string | undefined) ?? '',
        state: (auth.user.state as string | undefined) ?? '',
        postcode: (auth.user.postcode as string | undefined) ?? '',
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };
    console.log(data);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <Label htmlFor="first_name">First Name</Label>
                                <TextInput
                                    id="first_name"
                                    className="mt-1 block w-full"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                    autoComplete="first_name"
                                    placeholder="First name"
                                />
                                <InputError className="mt-2" message={errors.first_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last_name">Last Name</Label>

                                <TextInput
                                    id="last_name"
                                    className="mt-1 block w-full"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                    autoComplete="last_name"
                                    placeholder="Last name"
                                />

                                <InputError className="mt-2" message={errors.last_name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>

                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.email} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">Phone Number</Label>

                                <TextInput
                                    id="phone"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="Email address"
                                />

                                <InputError className="mt-2" message={errors.phone} />
                            </div>
                        </div>
                        <HR />
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>

                            <TextInput
                                id="website"
                                type="text"
                                icon={BsGlobeAmericas}
                                className="mt-1 block w-full"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                placeholder="Website URL"
                            />

                            <InputError className="mt-2" message={errors.website} />
                        </div>
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>

                                <TextInput
                                    id="address"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    placeholder="Enter your address"
                                />

                                <InputError className="mt-2" message={errors.address} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="city">City</Label>

                                <TextInput
                                    id="city"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.city}
                                    onChange={(e) => setData('city', e.target.value)}
                                    placeholder="Enter your city"
                                />

                                <InputError className="mt-2" message={errors.city} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="state">State</Label>

                                <TextInput
                                    id="state"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.state}
                                    onChange={(e) => setData('state', e.target.value)}
                                    placeholder="Enter your state"
                                />

                                <InputError className="mt-2" message={errors.state} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="country">Country</Label>

                                <TextInput
                                    id="country"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.country}
                                    onChange={(e) => setData('country', e.target.value)}
                                    placeholder="Enter your country"
                                />

                                <InputError className="mt-2" message={errors.country} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="postcode">Postcode</Label>

                                <TextInput
                                    id="postcode"
                                    type="text"
                                    className="mt-1 block w-full"
                                    value={data.postcode}
                                    onChange={(e) => setData('postcode', e.target.value)}
                                    placeholder="Enter your postcode"
                                />

                                <InputError className="mt-2" message={errors.postcode} />
                            </div>
                        </div>



                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
