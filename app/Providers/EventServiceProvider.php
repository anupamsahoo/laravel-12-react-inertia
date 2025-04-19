<?php

namespace App\Providers;

use App\Listeners\LogLastLoginAt;
use Illuminate\Auth\Events\Authenticated;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        Authenticated::class => [
            LogLastLoginAt::class,
        ],
    ];

    public function boot()
    {
        parent::boot();
    }
}
