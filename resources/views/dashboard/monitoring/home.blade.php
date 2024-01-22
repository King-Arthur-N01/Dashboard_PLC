@extends('layout.master')
@section('title','Dashboard')

@section('content')
<div class="row">
    <div class="card-dashboard col-md-4">
        <div class="card card-custom-1">
            <div class="card-body-custom">
                <h2 class="card-title">01</h2>
                <h3 class="card-title">STATUS</h3>
                <div class="card-footer-item-custom card-footer-item-bordered">
                    <a class="card-link">View Details<i></i></a>
                </div>
            </div>
        </div>
    </div>
    <div class="card-dashboard col-md-4">
        <div class="card card-custom-2">
            <div class="card-body">
                <h2 class="card-title">02</h2>
                <h3 class="card-title">DIAGRAM</h3>
            </div>
        </div>
    </div>
    <div class="card-dashboard col-md-4">
        <div class="card card-custom-3">
            <div class="card-body">
                <h2 class="card-title">03</h2>
                <h3 class="card-title">SETUP</h3>
            </div>
        </div>
    </div>
</div>
<div class="row">
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Welding Machine #1</h5>
            <div class="card-body pt-0 pb-0">
                <div id="c3chart_donut1"></div>
            </div>
        </div>
    </div>
    {{-- batas!!! --}}
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Welding Machine #2</h5>
            <div class="card-body pt-0 pb-0">
                <div id="c3chart_donut2"></div>
            </div>
        </div>
    </div>
    {{-- batas!!! --}}
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Welding Machine #3</h5>
            <div class="card-body pt-0 pb-0">
                <div id="c3chart_donut3"></div>
            </div>
        </div>
    </div>
    {{-- batas!!! --}}
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
        <div class="card">
            <h5 class="card-header">Welding Machine #4</h5>
            <div class="card-body pt-0 pb-0">
                <div id="c3chart_donut4"></div>
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
@endsection
