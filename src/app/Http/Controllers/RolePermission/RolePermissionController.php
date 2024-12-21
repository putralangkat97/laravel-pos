<?php

namespace App\Http\Controllers\RolePermission;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class RolePermissionController extends Controller
{
    public function index()
    {
        $roles = Role::whereNotIn('name', ['superadmin'])->get();
        return Inertia::render('POS/RolePermission/RoleIndex', [
            'roles' => $roles,
        ]);
    }
}
