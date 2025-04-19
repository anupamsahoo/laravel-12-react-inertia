<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserStatus
{
    public function handle(Request $request, Closure $next)
    {
        // Check user's status
        if (Auth::check() && !Auth::user()->status) {
            Auth::logout();
            return redirect()->route('login')->withErrors([
                'is_active' => 'Your account is inactive. Please contact support.',
            ]);
        }

        return $next($request);
    }
}
