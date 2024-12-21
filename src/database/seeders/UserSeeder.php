<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Define users and roles
        $users = [
            [
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'email' => 'superadmin@ariutomo.com',
                'password' => 'password',
                'role' => 'superadmin',
            ],
            [
                'first_name' => 'Store',
                'last_name' => 'Manager',
                'email' => 'storemanager@ariutomo.com',
                'password' => 'password',
                'role' => 'store manager',
            ],
            [
                'first_name' => 'Cashier',
                'last_name' => 'User',
                'email' => 'cashier@ariutomo.com',
                'password' => 'password',
                'role' => 'cashier',
            ],
            [
                'first_name' => 'Inventory',
                'last_name' => 'Staff',
                'email' => 'inventorystaff@ariutomo.com',
                'password' => 'password',
                'role' => 'inventory staff',
            ],
            [
                'first_name' => 'Customer',
                'last_name' => 'Service',
                'email' => 'customerservice@ariutomo.com',
                'password' => 'password',
                'role' => 'customer service',
            ],
            [
                'first_name' => 'Regular',
                'last_name' => 'Customer',
                'email' => 'customer@ariutomo.com',
                'password' => 'password',
                'role' => 'customer',
            ],
        ];

        // Create users and assign roles
        foreach ($users as $user_data) {
            // Combine first and last name to create full_name
            $user_data['full_name'] = "{$user_data['first_name']} {$user_data['last_name']}";

            // Create the user
            $user = User::create([
                'first_name' => $user_data['first_name'],
                'last_name' => $user_data['last_name'],
                'full_name' => $user_data['full_name'],
                'email' => $user_data['email'],
                'password' => Hash::make($user_data['password']),
            ]);

            // Assign role to the user
            $role = Role::where('name', $user_data['role'])->first();

            if ($role) {
                $user->assignRole($role);
            } else {
                $this->command->error("Role '{$user_data['role']}' not found.");
            }
        }
    }
}
