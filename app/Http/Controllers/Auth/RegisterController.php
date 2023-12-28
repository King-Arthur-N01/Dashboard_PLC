<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;
    public function __construct()
    {
        $this->middleware('guest');
    }
    public function indexregistration()
    {
        return view('auth.register');
    }
    public function authenticatecreate(Request $request)
    {
        // dd($request);
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'nik' => ['required', 'string', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);
        $data = $request->all();
        $check = $this->createuser($data);
        return redirect("home")->withSuccess('You have signed-in');
    }
    protected function createuser(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'nik' => $data['nik'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
?>
