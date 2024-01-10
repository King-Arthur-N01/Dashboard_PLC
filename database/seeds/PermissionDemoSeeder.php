<?php

use Illuminate\Database\Seeder;
use App\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionDemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // reset cahced roles and permission
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'view page']);
        Permission::create(['name' => 'create page']);
        Permission::create(['name' => 'edit page']);
        Permission::create(['name' => 'delete page']);
        Permission::create(['name' => 'publish page']);
        Permission::create(['name' => 'unpublish page']);

        //create roles and assign existing permissions
        $userRole = Role::create(['name' => 'user']);
        // $userRole->givePermissionTo('view page');
        $userRole->givePermissionTo('create page');
        $userRole->givePermissionTo('edit page');
        $userRole->givePermissionTo('delete page');

        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo('view page');
        $adminRole->givePermissionTo('create page');
        $adminRole->givePermissionTo('edit page');
        $adminRole->givePermissionTo('delete page');
        $adminRole->givePermissionTo('publish page');
        $adminRole->givePermissionTo('unpublish page');

        $superadminRole = Role::create(['name' => 'super-admin']);
        // gets all permissions via Gate::before rule

        // create demo users
        $user = User::create([
            'name' => 'user',
            'nik' => '12345',
            'department' => 'Engginering',
            'password' => bcrypt('user123')
        ]);
        $user->assignRole($userRole);

        $user = User::create([
            'name' => 'admin',
            'nik' => '11111',
            'department' => 'IT Administrator',
            'password' => bcrypt('admin123')
        ]);
        $user->assignRole($adminRole);

        $user = User::create([
            'name' => 'superadmin',
            'nik' => '11379',
            'department' => 'IT Administrator',
            'password' => bcrypt('superadmin12345')
        ]);
        $user->assignRole($superadminRole);
    }
}
