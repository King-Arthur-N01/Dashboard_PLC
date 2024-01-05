<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UsertableController extends Controller
{
    public function readusertable(){
        return view ('dashboard.user.usertable');
    }
}
