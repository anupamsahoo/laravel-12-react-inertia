import { Paginator } from '@/types/index';

export interface UserData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
    website: string;
    address:string;
    city:string;
    state:string;
    country:string;
    postcode:string;
    roles: string;
    status: number | string,
    created_at: string;
    last_login_at: string;
    total_business: string;
    role_names: [];
    user_role: [];
    [key: string]: unknown;
}

type Props = {
    permissions: Paginator<UserData>;
};
