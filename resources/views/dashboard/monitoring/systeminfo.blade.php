@extends('layout.master')
@section('title','System Info')
@section('content')

    <div class="row">
        <div class="card col-12 highcharts-figure">
            <div id="container"></div>

            <p class="highcharts-description">
                A basic column chart comparing estimated corn and wheat production
                in some countries.

                The chart is making use of the axis crosshair feature, to highlight
                the hovered country.
            </p>
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
    {{-- <script src="{{asset('assets/vendor/high-chart/column-basic.js')}}"></script> --}}

    <script src="{{asset('code/highcharts.js')}}"></script>
    <script src="{{asset('code/modules/exporting.js')}}"></script>
    <script src="{{asset('code/modules/export-data.js')}}"></script>
    <script src="{{asset('code/modules/accessibility.js')}}"></script>


{{-- <=========================BATAS HARDCODED JAVASCRIPT!!!!=========================> --}}
<script type="text/javascript">

    $(document).ready(
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Report Uptime VS Downtime',
            align: 'left'
        },
        subtitle: {
            text:'{{$datenow}}',
            align: 'left'
        },
        xAxis: {
            categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augtus', 'September', 'October', 'November', 'Desember'],
            crosshair: true,
            accessibility: {
                description: 'Month'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: '1000 Minute (minute)'
            }
        },
        tooltip: {
            valueSuffix: '(Hours)'
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Up Time',
                data: [406292, 260300, 107000, 65300, 57500, 50500, 476292, 280000, 277000, 22300, 27500, 25500]
            },
            {
                name: 'Down Time',
                data: [49086, 16600, 29500, 14000, 107180, 17000, 11086, 146000, 18500, 141000, 17180, 9000]
            }
        ]
    }));
</script>
{{-- <=======================BATAS HARDCODED JAVASCRIPT END!!!!=======================> --}}
@endpush
