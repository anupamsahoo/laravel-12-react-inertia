<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;

class PermissionName extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'alias',
    ];

    public function getPermissions()
    {
        return $this->hasMany(Permission::class, 'name_id');
    }
}
