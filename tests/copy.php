.form-style{
    color: #555;
    display: flex;
    padding: 2px;
    border: 1px solid currentColor;
    border-radius: 5px;
    margin: 0 0 30px;
}

.form-password-control {
    display: inline-block;
    width: 100%;
    font-size: 14px;
    /* line-height: 1.42857143; */
    /* color: #71748d; */
    background: transparent;
    border: 1px solid transparent;

    /* =======batas!!!======== */
    margin: 0;
    /* border: 3px solid; */
}

.form-password-control form:focus, .form-password-control form:active {
    outline: none;
}

.form-password-control button {
    width: 100%;
    border: none;
}

.form-password-control-button {
    padding: 5px;
    margin: 0;
    border-radius: inherit;
    background: transparent;
    /* <========BATAS!!!!========> */
    /* border: 0px solid transparent; */
    cursor: pointer;
}

.form-password-control:focus {
    color: #71748d;
    background-color: #fff;
    border-color: #a7a7f0;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(214, 214, 255, .75);
}




.splash-container {
    width: 100%;
    max-width: 380px;
    /* padding: 15px; */
    margin: auto;
}







@media screen and (prefers-reduced-motion: reduce) {
    .form-control {
        transition: none;
    }
}
.form-control::-ms-expand {
    background-color: transparent;
    border: 0;
}
.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
.form-control::-webkit-input-placeholder {
    color: #6c757d;
    opacity: 1;
}
.form-control::-moz-placeholder {
    color: #6c757d;
    opacity: 1;
}
.form-control:-ms-input-placeholder {
    color: #6c757d;
    opacity: 1;
}
.form-control::-ms-input-placeholder {
    color: #6c757d;
    opacity: 1;
}
.form-control::placeholder {
    color: #6c757d;
    opacity: 1;
}
.form-control:disabled,
.form-control[readonly] {
    background-color: #e9ecef;
    opacity: 1;
}
select.form-control:not([size]):not([multiple]) {
    height: calc(2.25rem + 2px);
}
select.form-control:focus::-ms-value {
    color: #495057;
    background-color: #fff;
}
.form-control-file,
.form-control-range {
    display: block;
    width: 100%;
}
.col-form-label {
    padding-top: calc(0.375rem + 1px);
    padding-bottom: calc(0.375rem + 1px);
    margin-bottom: 0;
    font-size: inherit;
    line-height: 1.5;
}
.col-form-label-lg {
    padding-top: calc(0.5rem + 1px);
    padding-bottom: calc(0.5rem + 1px);
    font-size: 1.25rem;
    line-height: 1.5;
}
.col-form-label-sm {
    padding-top: calc(0.25rem + 1px);
    padding-bottom: calc(0.25rem + 1px);
    font-size: 0.875rem;
    line-height: 1.5;
}
.form-control-plaintext {
    display: block;
    width: 100%;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    margin-bottom: 0;
    line-height: 1.5;
    color: #212529;
    background-color: transparent;
    border: solid transparent;
    border-width: 1px 0;
}
.form-control-plaintext.form-control-lg,
.form-control-plaintext.form-control-sm,
.input-group-lg > .form-control-plaintext.form-control,
.input-group-lg > .input-group-append > .form-control-plaintext.btn,
.input-group-lg
    > .input-group-append
    > .form-control-plaintext.input-group-text,
.input-group-lg > .input-group-prepend > .form-control-plaintext.btn,
.input-group-lg
    > .input-group-prepend
    > .form-control-plaintext.input-group-text,
.input-group-sm > .form-control-plaintext.form-control,
.input-group-sm > .input-group-append > .form-control-plaintext.btn,
.input-group-sm
    > .input-group-append
    > .form-control-plaintext.input-group-text,
.input-group-sm > .input-group-prepend > .form-control-plaintext.btn,
.input-group-sm
    > .input-group-prepend
    > .form-control-plaintext.input-group-text {
    padding-right: 0;
    padding-left: 0;
}
.form-control-sm,
.input-group-sm > .form-control,
.input-group-sm > .input-group-append > .btn,
.input-group-sm > .input-group-append > .input-group-text,
.input-group-sm > .input-group-prepend > .btn,
.input-group-sm > .input-group-prepend > .input-group-text {
    padding: 0.25rem 0.5rem;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
.input-group-sm > .input-group-append > select.btn:not([size]):not([multiple]),
.input-group-sm
    > .input-group-append
    > select.input-group-text:not([size]):not([multiple]),
.input-group-sm > .input-group-prepend > select.btn:not([size]):not([multiple]),
.input-group-sm
    > .input-group-prepend
    > select.input-group-text:not([size]):not([multiple]),
.input-group-sm > select.form-control:not([size]):not([multiple]),
select.form-control-sm:not([size]):not([multiple]) {
    height: calc(1.8125rem + 2px);
}
.form-control-lg,
.input-group-lg > .form-control,
.input-group-lg > .input-group-append > .btn,
.input-group-lg > .input-group-append > .input-group-text,
.input-group-lg > .input-group-prepend > .btn,
.input-group-lg > .input-group-prepend > .input-group-text {
    padding: 0.5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
    border-radius: 0.3rem;
}
.input-group-lg > .input-group-append > select.btn:not([size]):not([multiple]),
.input-group-lg
    > .input-group-append
    > select.input-group-text:not([size]):not([multiple]),
.input-group-lg > .input-group-prepend > select.btn:not([size]):not([multiple]),
.input-group-lg
    > .input-group-prepend
    > select.input-group-text:not([size]):not([multiple]),
.input-group-lg > select.form-control:not([size]):not([multiple]),
select.form-control-lg:not([size]):not([multiple]) {
    height: calc(2.875rem + 2px);
}
