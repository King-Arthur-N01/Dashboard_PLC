<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Toggle Show Password</title>
    <style>
        .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
        }
        .password-eye {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div class="container">
        <label for="password">Password</label>
        <div class="password-wrapper">
            <input type="password" id="password" name="password">
            <i class="password-eye fas fa-eye"></i>
        </div>
    </div>
    <script>
        const passwordInput = document.getElementById('password');
        const passwordEye = document.querySelector('.password-eye');

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
    </script>
</body>
</html>
