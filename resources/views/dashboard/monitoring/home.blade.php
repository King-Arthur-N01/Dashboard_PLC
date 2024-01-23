@extends('layout.master')
@section('title', 'Dashboard')

@section('content')
    <div class="row">
        <div class="card-dashboard col-md-4">
            <div class="card card-custom-1">
                <div class="card-body-custom">
                    <div class="row-card-custom">
                        <div class="col-6">
                            <img style="height: 70px" src="assets/icons/robotics_2.png">
                        </div>
                        <div class="col-6">
                            <h2 class="card-title">01</h2>
                            <h3 class="card-title">STATUS</h3>
                        </div>
                        <div class="card-footer-item-custom-1">
                            <a class="card-link">View Details &nbsp;<i class="mdi mdi-settings"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-dashboard col-md-4">
            <div class="card card-custom-2">
                <div class="card-body-custom">
                    <div class="row-card-custom">
                        <div class="col-6">
                            <img style="height: 70px" src="assets/icons/bar_chart_2.png">
                        </div>
                        <div class="col-6">
                            <h2 class="card-title">02</h2>
                            <h3 class="card-title">DIAGRAM</h3>
                        </div>
                        <div class="card-footer-item-custom-2">
                            <a class="card-link">View Details &nbsp;<i class="mdi mdi-settings"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-dashboard col-md-4">
            <div class="card card-custom-3">
                <div class="card-body-custom">
                    <div class="row-card-custom">
                        <div class="col-6">
                            <img style="height: 70px" src="assets/icons/maintenance_2.png">
                        </div>
                        <div class="col-6">
                            <h2 class="card-title">03</h2>
                            <h3 class="card-title">SETUP</h3>
                        </div>
                        <div class="card-footer-item-custom-3">
                            <a class="card-link">View Details &nbsp;<i class="mdi mdi-settings"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-6">
            <div class="card">
                <h5 class="card-header">Combination Chart </h5>
                <div class="card-body">
                    <div id="c3chart_combine"></div>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="card">
                <h5 class="card-header">Bar Charts</h5>
                <div class="card-body">
                    <canvas id="chartjs_bar"></canvas>
                </div>
            </div>
        </div>
    </div>
    {{-- <<==============================chart bar!!!!==============================>> --}}
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Horizontal Chart Bar</h5>
            <div class="card-body">
                <div class="ct-chart-horizontal ct-golden-section"></div>
            </div>
        </div>
    </div>
    {{-- <<=============================end chart bar!!!!============================>> --}}
@endsection

@push('style')
    <link rel="stylesheet" href="{{ asset('assets/vendor/charts/c3charts/c3.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/charts/chartist-bundle/chartist.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/vendor/charts/chartist-bundle/Chartistjs.js') }}">
@endpush
@push('script')
    <script src="{{ asset('assets/vendor/charts/c3charts/c3.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/charts/c3charts/d3-5.4.0.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/charts/c3charts/C3chartjs.js') }}"></script>
    <script src="{{ asset('assets/vendor/charts/chartist-bundle/Chartistjs.js') }}"></script>
    <script src="{{ asset('assets/vendor/charts/chartist-bundle/chartist.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/charts/chartist-bundle/Chartistjs.js') }}"></script>
    <script src="{{ asset('assets/vendor/charts/charts-bundle/Chart.bundle.js') }}"></script>
    <script src="{{ asset('assets/vendor/charts/charts-bundle/chartjs.js') }}"></script>
@endpush
