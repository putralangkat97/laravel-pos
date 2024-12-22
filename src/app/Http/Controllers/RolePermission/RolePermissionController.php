<?php

namespace App\Http\Controllers\RolePermission;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
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

    public function view(string|int $role_id)
    {
        $role = Role::with('permissions')->find($role_id);
        $permissions = Permission::all();
        $role_permission_ids = $role->permissions->pluck('id')->toArray();

        $grouped_permissions = $permissions->groupBy('group')->map(function ($group) {
            return $group->map(function ($permission) {
                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    'description' => $permission->description
                ];
            });
        });

        return Inertia('POS/RolePermission/RoleView', [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
            ],
            'role_permissions' => $role_permission_ids,
            'grouped_permissions' => $grouped_permissions
        ]);
    }

    public function update(Request $request, $role_id)
    {
        // TODO: update the permisison group
        $role = Role::find($role_id);
        $role->permissions()->sync($request->permissions);
    }
}
