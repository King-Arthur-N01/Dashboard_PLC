@extends('layout.master')
@section('title','Manage User')
@section('content')
<div class="container-fluid  dashboard-content">
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
