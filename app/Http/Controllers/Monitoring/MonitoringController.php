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
    public function getTotalDaysInMonth($year, $month) {
        $totalDays = 0;
        // Create a Carbon instance for the first day of the month
        $currentDate = Carbon::create($year, $month, 1);
        // Loop through each day of the month
        while ($currentDate->month == $month) {
            $totalDays++;
            $currentDate->addDay();
        }
        return ['totaldays' => $totalDays];
    }
}
