@extends('layout.master')

@section('content')
    <div class="container-fluid  dashboard-content">
        <div class="row">
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="page-header" id="top">
                    <h2 class="pageheader-title">Form Elements </h2>
                    <p class="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet
                        vestibulum mi. Morbi lobortis pulvinar quam.</p>
                    <div class="page-breadcrumb">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a class="breadcrumb-link">Dashboard</a></li>
                                <li class="breadcrumb-item"><a class="breadcrumb-link">Forms</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Form Elements</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- ============================================================== -->
            <!-- valifation types -->
            <!-- ============================================================== -->
            <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div class="card">
                    <h5 class="card-header">Form Pendaftaran</h5>
                    <div class="card-body">
                        <form id="validationform" data-parsley-validate="" novalidate="">
                            <div class="row" align-items="center">
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-sm-right" style="margin-left: 4px;">Nama User</label>
                                        <div>
                                            <input class="form-control form-control-lg" type="text" required="" placeholder="Username">
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <label class="col-form-label text-sm-right" style="margin-left: 4px;">NIK</label>
                                        <div>
                                            <input class="form-control form-control-lg" type="text" required="" data-parsley-maxlength="5" placeholder="NIK">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row" align-items="center">
                                <div class="col-xl-6">
                                    <div class="form-group">
                                        <div>
                                            <label class="col-form-label text-sm-right" style="margin-left: 4px;">Password</label>
                                            <div class="form-password-group">
                                                <input class="form-password-control form-control-lg" type="password" name="password" required placeholder="Password Min:6 digits" id="password">
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
                                            <div class="form-password-group">
                                            <input class="form-password-control form-control-lg" name="password_confirmation" type="password" placeholder="Confirm Password" id="confirm_password">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <h4>Department</h4>
                                <form>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="radio-stacked" checked=""
                                            class="custom-control-input"><span
                                            class="custom-control-label">Engginering</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="radio-stacked" checked=""
                                            class="custom-control-input"><span class="custom-control-label">IT</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="radio-stacked" checked=""
                                            class="custom-control-input"><span class="custom-control-label">Assembly</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="radio-stacked" checked=""
                                            class="custom-control-input"><span class="custom-control-label">Pressing</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="radio-stacked" checked=""
                                            class="custom-control-input"><span class="custom-control-label">Wealding</span>
                                    </label>
                                    <label class="custom-control custom-radio">
                                        <input type="radio" name="radio-stacked" checked=""
                                            class="custom-control-input"><span class="custom-control-label">Spot</span>
                                    </label>
                                </form>
                            </div>

                            <div class="form-group row text-right">
                                <div class="col col-sm-10 col-lg-9 offset-sm-1 offset-lg-0">
                                    <button type="submit" class="btn btn-space btn-primary">Submit</button>
                                    <button class="btn btn-space btn-secondary">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    @endsection
