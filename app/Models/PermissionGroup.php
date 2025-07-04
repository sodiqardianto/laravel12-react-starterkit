<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PermissionGroup extends Model
{
    use SoftDeletes;

    protected $guarded = ['id'];
    
    public function permissions()
    {
        return $this->hasMany(Permission::class, 'group_id');
    }
}
