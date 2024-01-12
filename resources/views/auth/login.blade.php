<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Login</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="../assets/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/vendor/fonts/circular-std/style.css">
    <link rel="stylesheet" href="../assets/libs/css/style.css">
    <link rel="stylesheet" href="../assets/vendor/fonts/fontawesome/css/fontawesome-all.css">
    <link rel="stylesheet" href="assets/vendor/fonts/material-design-iconic-font/css/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/vendor/charts/c3charts/c3.css">
    <link rel="stylesheet" href="assets/vendor/fonts/flag-icon-css/flag-icon.min.css">
    <script src='assets/vendor/jquery/jquery-3.3.1.min.js'></script>
    <style>
        html,
        body {
            height: 100%;
        }

        body {
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            background-image: url("../asset/images/bglogin.png");
            padding-top: 40px;
            padding-bottom: 40px;
        }
    </style>
</head>

<body>
    <!-- ============================================================== -->
    <!-- login page  -->
    <!-- ============================================================== -->
    <div class="splash-container">
        <div class="card ">
            <div class="card-header text-center"><a><img class="logo-img" src="../assets/icons/logo.png"
                        alt="logo"></a><span class="splash-description">Please enter your user information.</span>
            </div>
            <div class="card-body">
                <form action="{{ route('pushlogin') }}" method="post">
                    @csrf
                    <div class="form-group">
                        <input class="form-control form-control-lg @error('nik') is-invalid @enderror" name="nik"
                            type="text" placeholder="NIK" autocomplete="off">
                    </div>
                    @error('nik')
                        <strong>{{ $message }}</strong>
                    @enderror
                    <div class="form-group">
                        <input class="form-control form-control-lg @error('password') is-invalid @enderror"
                            name="password" type="password" placeholder="Password">
                        <button class="form-control-button fas fa-eye" id="toggler"></button>
                    </div>
                    @error('password')
                    <strong>{{ $message }}</strong>
                    @enderror
            </div>
                    <button type="submit" class="btn btn-primary btn-lg btn-block mt-4">Sign in</button>
                </form>
            </div>
        </div>
    </div>
    <!-- ============================================================== -->
    <!-- end login page  -->
    <!-- ============================================================== -->
    <!-- Optional JavaScript -->
    <script src="../assets/vendor/jquery/jquery-3.3.1.min.js"></script>
    <script src="../assets/vendor/bootstrap/js/bootstrap.bundle.js"></script>

    <script>
        $(document).ready(function(){
            const passwordInput = document.getElementById('password');
            const passwordEye = document.getElementById('toggler');
            passwordEye.addEventListener('click', () => {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    passwordEye.classList.add('fa-eye-slash');
                    passwordEye.classList.remove('fa-eye');
                } else {
                    passwordInput.type = 'password';
                    passwordEye.classList.add('fa-eye');
                    passwordEye.classList.remove('fa-eye-slash');
                }
            });
        });
    </script>
</body>

</html>
