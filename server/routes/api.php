<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('pizzas', 'PizzaController@index');
Route::get('orders', 'OrdersController@index');
Route::get('pizza/{id}', 'PizzaController@show');
Route::post('pizza', 'PizzaController@store');
Route::post('order', 'OrdersController@store');
Route::delete('pizza', 'PizzaController@destroy');
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
