$(document).ready(
    function(){
    const passwordInput = document.getElementById('password');
    const passwordEye = document.getElementById('toggler');
    passwordEye.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordEye.classList.add('fa-eye-slash');
            passwordEye.classList.remove('fa-eye');
        }else {
            passwordInput.type = 'password';
            passwordEye.classList.add('fa-eye');
            passwordEye.classList.remove('fa-eye-slash');
        }
    })
    function confrimHapus(urlHapus) {
        if (confirm("Apakah anda yakin ingin menghapus USER ini ?")){
          document.location = urlHapus;
        }
      }
});
