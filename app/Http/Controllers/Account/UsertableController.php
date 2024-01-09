<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class UsertableController extends Controller
{
    public function readusertable(){
        $user=User::get();

        return view ('dashboard.user.usertable',['users'=>$user]);
    }

}
