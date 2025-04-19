<?php

namespace App\Listeners;

use Carbon\Carbon;
use Illuminate\Auth\Events\Authenticated;

class LogLastLoginAt
{
    /**
     * Handle the event.
     *
     * @return void
     */
    public function handle(Authenticated $event)
    {
        $event->user->last_login_at = Carbon::now();
        $event->user->save();
    }
}
