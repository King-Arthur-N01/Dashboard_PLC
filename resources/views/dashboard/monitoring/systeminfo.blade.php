@extends('layout.master')
@section('title','System Info')
@section('content')

    <div class="row">
        {{-- <div class="col-6">
            <div class="card">
                <h5 class="card-header">Multi-line Labels</h5>
                <div class="card-body">
                    <div class="ct-chart-bipolar ct-golden-section">
                    </div>
                </div>
            </div>
        </div> --}}

        <div class="card">
            <h5 class="card-header">Compositebar Line Chart</h5>
            <div class="card-body">
                <div id="compositebar" class="spark-chart"></div>
                <div class="spark-chart-info">
                    <h5 class="mb-0">Sales</h5>
                    <p>70%</p>
                </div>
            </div>
        </div>
    </div>


@endsection

@push('style')
    <link rel="stylesheet" href="{{asset('assets/vendor/charts/c3charts/c3.css')}}">
    <link rel="stylesheet" href="{{asset('assets/vendor/charts/chartist-bundle/chartist.css')}}">
@endpush
@push('script')
    <script src="{{asset('assets/libs/js/main-js.js')}}"></script>
    <script src="{{asset('assets/vendor/charts/charts-bundle/Chart.bundle.js')}}"></script>
    <script src="{{asset('assets/vendor/charts/charts-bundle/chartjs.js')}}"></script>

    <script src="{{asset('assets/vendor/charts/sparkline/jquery.sparkline.js')}}"></script>
    <script src="{{asset('assets/vendor/charts/sparkline/spark-js.js')}}"></script>

    <script src="{{asset('assets/vendor/charts/chartist-bundle/chartist.min.js')}}"></script>
    <script src="{{asset('assets/vendor/charts/chartist-bundle/Chartistjs.js')}}"></script>
@endpush
