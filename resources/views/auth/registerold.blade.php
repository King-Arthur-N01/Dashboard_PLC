<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Concept - Bootstrap 4 Admin Dashboard Template</title>
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="assets/vendor/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/vendor/fonts/circular-std/style.css">
    <link rel="stylesheet" href="assets/libs/css/style.css">
    <link rel="stylesheet" href="assets/vendor/fonts/fontawesome/css/fontawesome-all.css">

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
            padding-top: 40px;
            padding-bottom: 40px;
        }
    </style>
</head>
<!-- ============================================================== -->
<!-- signup form  -->
<!-- ============================================================== -->

<body>
    <!-- ============================================================== -->
    <!-- signup form  -->
    <!-- ============================================================== -->
    <form class="splash-container" action="{{ route('pushregister') }}" method="post">
        @csrf
        <div class="card">
            <div class="card-header">
                <h3 class="mb-1">Registrations Form</h3>
                <p>Please enter your user information.</p>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <input class="form-control form-control-lg" type="text" name="name" required placeholder="Username" autocomplete="off">
                </div>
                <div class="form-group">
                    <input class="form-control form-control-lg" type="text" name="nik" required placeholder="NIK" autocomplete="off">
                </div>
                <div class="form-group input-group-append">
                    <input class="form-control form-control-lg" type="password" name="password" required placeholder="Password Min:6 digits" id="password">
                    <button type="button" class="btn btn-outline-primary fas fa-eye" id="toggler"></button>
                </div>
                @error('password')
                    <strong>{{ $message }}</strong>
                @enderror
                <div class="form-group input-group-append">
                    <input class="form-control form-control-lg" name="password_confirmation" type="password" placeholder="Confirm Password" id="confirm_password">
                    <button type="button" class="btn btn-outline-primary fas fa-eye" id="confirm_toggler"></button>
                </div>

                <div class="form-group pt-2">
                    <button class="btn btn-block btn-primary" type="submit">Register My Account</button>
                </div>
            </div>
        </div>
    </form>

    <script src='assets/vendor/jquery/jquery-3.3.1.min.js'></script>
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
