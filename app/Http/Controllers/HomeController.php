<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Auth\Events\Authenticated;
class HomeController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:view posts', ['only' => ['view selection']]);
        $this->middleware('permission:create posts', ['only' => ['create', 'store']]);
        $this->middleware('permission:edit posts', ['only' => ['edit', 'update']]);
        $this->middleware('permission:delete posts', ['only' => ['destroy']]);
        $this->middleware('permission:publish posts', ['only' => ['publish']]);
        $this->middleware('permission:unpublish posts', ['only' => ['unpublish']]);

        $this->middleware('auth');
    }
    public function homeindex()
    {
        return view('dashboard.monitoring.home');
    }


}
