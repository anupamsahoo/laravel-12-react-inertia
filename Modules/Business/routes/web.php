<?php

use Illuminate\Support\Facades\Route;
use Modules\Business\Http\Controllers\BusinessController;

Route::middleware(['auth', 'verified'])->group(function () {
    //Route::resource('business', BusinessController::class)->names('business');
    Route::get('business', [BusinessController::class, 'index'])->name('business.list');
});
