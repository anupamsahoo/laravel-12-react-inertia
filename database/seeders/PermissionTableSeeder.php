<?php

namespace Database\Seeders;

use App\Models\PermissionName;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissionNames = [
            [
                'id' => 1,
                'name' => 'Role Management',
                'alias' => 'role',
            ],
            [
                'id' => 2,
                'name' => 'Permission Management',
                'alias' => 'permission',
            ],
            [
                'id' => 3,
                'name' => 'User Management',
                'alias' => 'user',
            ]
        ];
        $permissions = [
            [
                'name_id' => 1,
                'name' => 'role-list',
                'nice_name' => 'View Role',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 1,
                'name' => 'role-create',
                'nice_name' => 'Create Role',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 1,
                'name' => 'role-edit',
                'nice_name' => 'Edit Role',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 1,
                'name' => 'role-delete',
                'nice_name' => 'Delete Role',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 2,
                'name' => 'permission-list',
                'nice_name' => 'View Permission',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 2,
                'name' => 'permission-create',
                'nice_name' => 'Create Permission',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 2,
                'name' => 'permission-edit',
                'nice_name' => 'Edit Permission',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 2,
                'name' => 'permission-delete',
                'nice_name' => 'Delete Permission',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 3,
                'name' => 'user-list',
                'nice_name' => 'View User',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 3,
                'name' => 'user-create',
                'nice_name' => 'Create User',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 3,
                'name' => 'user-edit',
                'nice_name' => 'Edit User',
                'guard_name' => 'web',
            ],
            [
                'name_id' => 3,
                'name' => 'user-delete',
                'nice_name' => 'Delete User',
                'guard_name' => 'web',
            ]
        ];
        foreach ($permissionNames as $permissionName) {
            PermissionName::create(
                [
                    'id' => $permissionName['id'],
                    'name' => $permissionName['name'],
                    'alias' => $permissionName['alias']
                ]
            );
        }
        foreach ($permissions as $permission) {
            Permission::create(
                [
                    'name' => $permission['name'],
                    'name_id' => $permission['name_id'],
                    'nice_name' => $permission['nice_name'],
                    'guard_name' => $permission['guard_name']
                ]
            );
        }
    }
}
