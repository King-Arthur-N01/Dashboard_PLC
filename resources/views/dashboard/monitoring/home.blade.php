@extends('layout.master')

@section('content')
<div class="row">
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <div class="page-header">
            <h2 class="pageheader-title">Dashboard </h2>
            <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
            <div class="page-breadcrumb">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a class="breadcrumb-link">Monitoring Machine</a></li>
                    </ol>
                </nav>
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
