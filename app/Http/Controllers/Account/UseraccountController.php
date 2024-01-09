<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class UseraccountController extends Controller
{
    public function readuser(){
        return view ('dashboard.user.account');
    }
    public function deleteuser($id){
        $user = User::find($id);
    }
}
