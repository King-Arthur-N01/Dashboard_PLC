<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function homeindex()
    {
        return view('dashboard.monitoring.home');
    }
    // public function about()
    // {
    //     return view('dashboard.monitoring.readmonitor');
    // }

}
