<?php

namespace App\Http\Controllers\Monitoring;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DatatableController extends Controller
{
    public function readtable(){
        return view ('dashboard.monitoring.table');
    }
}
