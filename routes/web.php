<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/home','HomeController@homeindex')->name('home');

Route::get('/login','Auth\LoginController@indexlogin')->name('login');
Route::post('/login','Auth\LoginController@authenticateuser')->name('pushlogin');
Route::get('/logout','Auth\LoginController@signout')->name('logout');


Route::get('/monitoring','Monitoring\MonitoringController@readmonitor')->name('monitoring');
Route::post('/monitoring','Montoring\MonitoringController@getTotalDaysInMonth')->name('pushmonitor');

Route::get('/datatable','Monitoring\DatatableController@readtable')->name('datatable');
// Route::post('/datatable','Monitoring\DatatableController@createtable')->name('createdatatable');

// <======================== Admin panel dashboard route configuration ========================>
Route::get('/manageuser','Account\UsertableController@readusertable')->name('manageuser');

Route::get('/account','Account\UseraccountController@readuser')->name('account');
Route::get('/register','Auth\RegisterController@indexregistration')->name('register');
Route::post('/register','Auth\RegisterController@authenticatecreate')->name('pushregister');
Route::get('/userdelete/{id}','Auth\RegisterController@deleteuser')->name('deleteaccount');
// <====================== Admin panel dashboard route configuration end ======================>



// <============================= HATI-HATI KHUSUS DEBUGING =============================>


Route::get('/registerold','Auth\RegisterController@indexregistrationold');
Route::get('/debug','DebugController@indexdebug');

// <=========================== HATI-HATI KHUSUS DEBUGING END ===========================>
