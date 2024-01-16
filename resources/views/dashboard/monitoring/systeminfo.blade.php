@extends('layout.master')
@section('title','System Info')
@section('content')

<div class="container-fluid  dashboard-content">
    <!-- ============================================================== -->
    <!-- pageheader -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- end pageheader -->
    <!-- ============================================================== -->
    <div class="row">
        <!-- ============================================================== -->
        <!--multi line lables chart  -->
        <!-- ============================================================== -->
        {{-- <div class="col-6">
            <div class="card">
                <h5 class="card-header">Multi-line Labels</h5>
                <div class="card-body">
                    <div class="ct-chart-bipolar ct-golden-section">
                        <p class="text-in-chart">Day</p>
                    </div>
                </div>
            </div>
        </div> --}}

        <div class="col-6">
            <div class="card">
                <h5 class="card-header">Bar Charts</h5>
                <div class="card-body">
                    <canvas id="chartjs_bar"></canvas>
                </div>
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- end multi line lables chart  -->
        <!-- ============================================================== -->
    </div>
</div>

@endsection
