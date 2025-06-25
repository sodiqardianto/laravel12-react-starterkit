<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermissionGroup extends Model
{
    protected $guarded = ['id'];
    
    public function permissions()
    {
        return $this->hasMany(Permission::class, 'group_id');
    }
}
