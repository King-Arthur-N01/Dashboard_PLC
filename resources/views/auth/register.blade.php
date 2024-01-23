@extends('layout.master')
@section('title','Add User')
@section('content')
        <div class="row">
            <!-- ============================================================== -->
            <!-- valifation types -->
            <!-- ============================================================== -->
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="card">
                    <h5 class="card-header">Form Pendaftaran</h5>
                    <div class="card-body">
                        <form action="{{route('pushregister')}}" id="validationform" method="post">
                            @csrf
                            <div class="row" align-items="center">
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-sm-right" style="margin-left: 4px;">Nama User</label>
                                        <div>
                                            <input class="form-control form-control-lg" type="text" name="name" placeholder="Username">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-sm-right" style="margin-left: 4px;">NIK</label>
                                        <div>
                                            <input class="form-control form-control-lg" type="text" name="nik" data-parsley-maxlength="5" placeholder="NIK">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" align-items="center">
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label text-sm-right" style="margin-left: 4px;">Password</label>
                                            <div class="form-password-group" style="margin: 0px;">
                                                <input class="form-password-control form-control-lg" type="password" name="password" required placeholder="Password Min:6 digits" id="password">
                                                <button type="button" class="form-password-control-button fa fa-eye-slash" style="padding: 10px;" id="toggler"></button>
                                            </div>
                                        </div>
                                        @error('password')
                                        <strong>{{ $message }}</strong>
                                        @enderror
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label text-sm-right" style="margin-left: 4px;">Confirm Password</label>
                                            <div class="form-password-group" style="margin: 0px;">
                                            <input class="form-password-control form-control-lg" name="password_confirmation" type="password" placeholder="Confirm Password" id="confirm_password">
                                            <button type="button" class="form-password-control-button fa fa-eye-slash" style="padding: 10px;" id="confirm_toggler"></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <h4>Department</h4>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="department" value="Engginering" class="custom-control-input">
                                        <span class="custom-control-label">Engginering</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="department"  value="IT" class="custom-control-input">
                                            <span class="custom-control-label">IT</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="department" value="Assembly" class="custom-control-input">
                                            <span class="custom-control-label">Assembly</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="department"  value="Pressing" class="custom-control-input">
                                        <span class="custom-control-label">Pressing</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="department" value="Wealding" class="custom-control-input">
                                        <span class="custom-control-label">Wealding</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="department" value="Spot" class="custom-control-input">
                                        <span class="custom-control-label">Spot</span>
                                    </label>
                            </div>
                            <div class="form-group row text-right">
                                <div class="col col-sm-10 col-lg-9 offset-sm-1 offset-lg-0">
                                    <button type="submit" class="btn btn-space btn-primary">Submit</button>
                                    <button type="button" href="{{route('manageuser')}}" class="btn btn-space btn-secondary">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    @endsection
    @push('style')
        <link rel="stylesheet" type="text/css" href="{{asset('assets/vendor/inputmask/css/inputmask.css')}}">
        <link rel="stylesheet" type="text/css" href="{{asset('')}}">
        <link rel="stylesheet" type="text/css" href="{{asset('')}}">
    @endpush
    @push('script')
        <!-- custom js -->
        <script src="{{asset('assets/vendor/inputmask/js/jquery.inputmask.bundle.js')}}"></script>
        <script src="{{asset('assets/vendor/custom-js/hardcoded.js')}}"></script>
    @endpush
