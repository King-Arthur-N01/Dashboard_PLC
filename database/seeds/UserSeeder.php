<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superadmin = User::create([
            'name' => 'Super Admin',
            'nik' => '11379',
            'password' => bcrypt('superadmin12345'),
        ]);

        $superadmin->assignRole('superadmin');

        $admin = User::create([
            'name' => 'Admin',
            'nik' => '11111',
            'password' => bcrypt('admin12345'),
        ]);

        $admin->assignRole('admin');

        $user = User::create([
            'name' => 'User',
            'nik' => '12345',
            'password' => bcrypt('user123'),
        ]);

        $user->assignRole('user');
    }
}
