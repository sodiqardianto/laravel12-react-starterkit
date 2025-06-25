<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Models\Permission as PermissionModel;

class Permission extends PermissionModel
{
    use SoftDeletes;

    public function group()
    {
        return $this->belongsTo(PermissionGroup::class, 'group_id');
    }
}
