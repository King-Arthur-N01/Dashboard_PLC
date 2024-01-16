@extends('layout.master')
@section('title','Manage User')
@section('content')
<div class="container-fluid  dashboard-content">
    <!-- ============================================================== -->
    <!-- pageheader -->
    <!-- ============================================================== -->
    {{-- <div class="row">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="page-header">
                <h2 class="pageheader-title">Data Tables</h2>
                <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                <div class="page-breadcrumb">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item"><a class="breadcrumb-link">Dashboard</a></li>
                            <li class="breadcrumb-item"><a class="breadcrumb-link">User Setting</a></li>
                            <li class="breadcrumb-item active" aria-current="page">Manage User</li>
                        </ol>
                    </nav>
                </div>
            </div>
        </div>
    </div> --}}
    <!-- ============================================================== -->
    <!-- end pageheader -->
    <!-- ============================================================== -->
    <div class="row">
        <!-- ============================================================== -->
        <!-- basic table  -->
        <!-- ============================================================== -->
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header">Basic Table</h5>
                    <div class="col-sm-12 col-md-12">
                        <div class="dt-buttons">
                            <a class="btn btn-block btn-primary" href="{{ route('register') }}" tabindex="0" aria-controls="example">+ Add User</a>
                        </div>
                    </div>
                <div class="card-body">
                    @if(session('success'))
                    <div class="alert alert-success">{{ session('success') }}</div>
                    @endif
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered first">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>NIK</th>
                                    <th>Dapartment</th>
                                    <th>Create Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($users as $user)
                                <tr>
                                    <td>{{$user->id}}</td>
                                    <td>{{$user->name}}</td>
                                    <td>{{$user->nik}}</td>
                                    <td>{{$user->department}}</td>
                                    <td>{{$user->created_at}}</td>
                                    <td><a class="btn btn-primary btn-xm" style="color:white" href="">Edit</a>
                                        <a class="btn btn-primary btn-xm" style="color:white" href="{{route('deleteaccount',$user->id)}}" >Delete</a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- ============================================================== -->
        <!-- end basic table  -->
        <!-- ============================================================== -->
    </div>
</div>
@endsection
