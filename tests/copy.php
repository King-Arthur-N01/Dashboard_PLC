<?php
protected $redirectTo = RouteServiceProvider::HOME;

public function __construct()
{
    $this->middleware('guest');
}

public function indexregistration()
{
    return view('auth.register');
}

public function authenticateCreate(Request $request)
{
    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'nik' => ['required', 'numeric', 'max:5', 'unique:users'],
        'password' => ['required', 'string', 'min:6', 'confirmed'],
    ]);
    $data = $request->all();
    $check = $this->createUser($data);
    return redirect("home")->withSuccess('You have signed-in');
}

protected function createUser(array $data)
{
    return User::create([
        'name' => $data['name'],
        'nik' => $data['nik'],
        'password' => Hash::make($data['password']),
    ]);
}
?>
