<?php

namespace App\Http\Controllers\Monitoring;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MonitoringController extends Controller
{
    public function readmonitor(){
        return view("dashboard.monitoring.systeminfo");
    }
}
