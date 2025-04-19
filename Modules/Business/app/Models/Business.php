<?php

namespace Modules\Business\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
// use Modules\Business\Database\Factories\BusinessFactory;

class Business extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'business_url',
        'business_unique_name',
        'business_logo',
        'background',
        'business_color',
        'business_name',
        'google_place_id',
        'facebook_page_id',
        'facebook_api_data',
        'social_media',
        'business_address',
        'business_phone',
        'postcode',
        'status',
        'review_filter'
    ];

    // protected static function newFactory(): BusinessFactory
    // {
    //     // return BusinessFactory::new();
    // }
}
