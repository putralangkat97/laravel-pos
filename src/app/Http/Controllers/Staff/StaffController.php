<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class StaffController extends Controller
{
    public function index()
    {
        $users = User::with('roles')->whereNotIn('id', [Auth::user()->id])->get();
        return Inertia('POS/Staff/StaffIndex', [
            'users' => $users,
        ]);
    }

    public function view(string|int $staff_id)
    {
        $user = User::with('roles')->where('id', $staff_id)->first();
        return Inertia('POS/Staff/StaffView', [
            'user' => $user,
        ]);
    }

    public function edit(string|int $staff_id)
    {
        $user = User::with('roles')->where('id', $staff_id)->first();
        $roles = Role::whereNotIn('name', ['superadmin'])->get();
        return Inertia('POS/Staff/StaffEdit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, string|int $staff_id)
    {
        $validated = $request->validate([
            'first_name' => 'required|max:50',
            'last_name' => 'nullable|max:50',
            'email' => ['required', Rule::unique('users')->ignore($staff_id)],
            'phone' => 'nullable|numeric',
            'gender' => 'nullable',
            'status' => 'required',
            'birthdate' => 'nullable|max:15',
            'role_id' => 'nullable'
        ]);

        if ($validated) {
            $validated['full_name'] = "{$validated['first_name']} {$validated['last_name']}";
            $validated['status'] = $validated['status'] == 'active' ?? false;
            $staff = User::find($staff_id);
            $staff->first_name = $validated['first_name'];
            $staff->last_name = $validated['last_name'];
            $staff->full_name = $validated['full_name'];
            $staff->email = $validated['email'];
            $staff->phone = $validated['phone'];
            $staff->gender = $validated['gender'];
            $staff->birthdate = $validated['birthdate'];
            $staff->status = $validated['status'];
            $staff->save();
            if ($validated['role_id']) {
                $role = Role::where('id', $validated['role_id'])->first();
                $staff->syncRoles($role);
            }
        }
    }
}
