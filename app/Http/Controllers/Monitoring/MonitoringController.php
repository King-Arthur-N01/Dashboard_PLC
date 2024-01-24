<?php

namespace App\Http\Controllers\Monitoring;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class MonitoringController extends Controller
{
    public function readmonitor(){
        $datenow = carbon::now()->format('d M Y');
        return view("dashboard.monitoring.systeminfo",['datenow' => $datenow]);
    }
}
