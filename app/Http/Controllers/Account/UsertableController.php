<?php

namespace App\Http\Controllers\Account;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Permission;
use App\User;
use Illuminate\Http\Request;

class UsertableController extends Controller
{
    public function __construct(){
        $this->middleware('permission:view posts', ['only' => ['readusertable']]);
        $this->middleware('permission:create posts', ['only' => ['create', 'store']]);
        $this->middleware('permission:edit posts', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete posts', ['only' => ['destroy']]);
        $this->middleware('permission:publish posts', ['only' => ['publish']]);
        $this->middleware('permission:unpublish posts', ['only' => ['unpublish']]);
    }
    public function readusertable(){
        $user=User::get();
        return view ('dashboard.user.usertable',['users'=>$user]);
    }

}
