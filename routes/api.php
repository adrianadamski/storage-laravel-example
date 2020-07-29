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

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('storage', 'StorageController@index');
    Route::get('storage-item/{id}', 'StorageItemController@index');
    Route::post('storage-item', 'StorageItemController@store');
    Route::put('storage-item/{id}/qty', 'StorageItemController@put');
});
