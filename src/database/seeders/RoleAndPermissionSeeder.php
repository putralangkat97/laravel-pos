<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // roles
        $roles = [
            'superadmin',
            'store manager',
            'cashier',
            'inventory staff',
            'customer service',
            'customer',
        ];

        // permissions
        $permissions = [
            'users' => [
                'view-users' => 'User can view the list of users.',
                'create-users' => 'User can create new users.',
                'edit-users' => 'User can edit existing users.',
                'view-roles' => 'User can view the list of roles.',
            ],
            'products' => [
                'view-products' => 'User can view the list of products.',
                'manage-stock' => 'User can manage product stock levels.',
                'view-stock-history' => 'User can view the stock history.',
                'view-product-reports' => 'User can view product-related reports.',
                'view-stock-reports' => 'User can view stock-related reports.',
            ],
            'customers' => [
                'view-customers' => 'User can view the list of customers.',
                'create-customers' => 'User can create new customer records.',
                'edit-customers' => 'User can edit existing customer records.',
                'view-customer-points' => 'User can view customer loyalty points.',
                'view-customer-reports' => 'User can view reports related to customers.',
            ],
            'transactions' => [
                'create-transaction' => 'User can create new transactions.',
                'view-transactions' => 'User can view transaction records.',
                'print-receipt' => 'User can print receipts for transactions.',
                'access-pos' => 'User can access the Point of Sale system.',
            ],
            'vouchers' => [
                'view-vouchers' => 'User can view the list of vouchers.',
                'issue-vouchers' => 'User can issue vouchers to customers.',
                'view-voucher-history' => 'User can view the history of issued vouchers.',
            ],
            'membership' => [
                'view-membership-levels' => 'User can view membership levels.',
                'view-point-history' => 'User can view the history of loyalty points.',
            ],
            'reports' => [
                'view-sales-reports' => 'User can view sales reports.',
            ],
            'settings' => [
                'view-settings' => 'User can view system settings.',
                'manage-store-settings' => 'User can manage store settings.',
            ],
            'profile' => [
                'view-own-profile' => 'User can view their own profile.',
                'edit-own-profile' => 'User can edit their own profile.',
                'view-own-points' => 'User can view their own loyalty points.',
                'view-own-level' => 'User can view their own membership level.',
                'view-own-transactions' => 'User can view their own transaction history.',
                'view-available-vouchers' => 'User can view vouchers available to them.',
                'redeem-vouchers' => 'User can redeem their own vouchers.',
                'view-own-vouchers' => 'User can view the vouchers they have redeemed.',
            ],
        ];

        // create roles
        foreach ($roles as $role) {
            Role::firstOrCreate(['name' => $role]);
        }

        // create permissions
        foreach ($permissions as $group => $group_permissions) {
            foreach ($group_permissions as $permission_name => $description) {
                Permission::firstOrCreate([
                    'name' => $permission_name,
                    'group' => $group,
                    'description' => $description,
                ]);
            }
        }

        // assign permissions to roles
        $role_permissions = [
            'superadmin' => Permission::all()->pluck('name')->toArray(),
            'store manager' => array_keys(array_merge(...array_values($permissions))),
            'cashier' => array_merge(
                array_keys($permissions['products']),
                array_keys($permissions['customers']),
                array_keys($permissions['transactions']),
                ['view-sales-reports']
            ),
            'inventory staff' => array_merge(
                array_keys($permissions['products']),
                ['view-product-reports', 'view-stock-reports']
            ),
            'customer service' => array_merge(
                array_keys($permissions['customers']),
                array_keys($permissions['membership']),
                array_keys($permissions['vouchers']),
                ['view-customer-reports']
            ),
            'customer' => array_keys($permissions['profile']),
        ];

        foreach ($role_permissions as $role_name => $permission_names) {
            $role = Role::where('name', $role_name)->first();
            if ($role) {
                $role->syncPermissions($permission_names);
            }
        }
    }
}
