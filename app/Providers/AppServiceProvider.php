<?php

namespace App\Providers;

use App\Models\StorageItem;
use App\Observers\StorageItemObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        StorageItem::observe(StorageItemObserver::class);
        //
    }
}
