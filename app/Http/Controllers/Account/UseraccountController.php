<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UseraccountController extends Controller
{
    public function readuser(){
        return view ('dashboard.user.account');
    }
}
