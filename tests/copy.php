<div class="row">
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header">Welding Machine #1</h5>
                <div class="card-body pt-0 pb-0">
                    <div id="c3chart_donut1"></div>
                </div>
            </div>
        </div>
        <!-- batas!!! -->
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header">Welding Machine #2</h5>
                <div class="card-body pt-0 pb-0">
                    <div id="c3chart_donut2"></div>
                </div>
            </div>
        </div>
        <!-- batas!!! -->
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header">Welding Machine #3</h5>
                <div class="card-body pt-0 pb-0">
                    <div id="c3chart_donut3"></div>
                </div>
            </div>
        </div>
        <!-- batas!!! -->
        <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
            <div class="card">
                <h5 class="card-header">Welding Machine #4</h5>
                <div class="card-body pt-0 pb-0">
                    <div id="c3chart_donut4"></div>
                </div>
            </div>
        </div>
    </div>

<script>
    $(document).ready(function () {
  const passwordInput = document.getElementById('password');
  const passwordEye = document.getElementById('toggler');

  passwordEye.addEventListener('click', (event) => {
    event.preventDefault();
    togglePasswordVisibility(passwordInput, passwordEye);
  });

  function togglePasswordVisibility(input, eye) {
    if (input.type === 'password') {
      input.type = 'text';
      eye.classList.remove('fa-eye');
      eye.classList.add('fa-eye-slash');
    } else {
      input.type = 'password';
      eye.classList.remove('fa-eye-slash');
      eye.classList.add('fa-eye');
    }
  }

  function confirmHapus(urlHapus) {
    if (confirm("Apakah anda yakin ingin menghapus USER ini ?")) {
      document.location = urlHapus;
    }
  }
});
</script>
