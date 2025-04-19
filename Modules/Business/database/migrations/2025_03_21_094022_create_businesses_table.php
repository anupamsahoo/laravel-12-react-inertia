<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('businesses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('no action');
            $table->string('business_url')->nullable();
            $table->string('business_unique_name');
            $table->string('business_logo')->nullable();
            $table->string('background')->nullable();
            $table->string('business_color')->nullable();
            $table->string('business_name');
            $table->string('google_place_id')->nullable();
            $table->string('facebook_page_id')->nullable();
            $table->string('facebook_api_data')->nullable();
            $table->string('social_media')->nullable();
            $table->string('business_address')->nullable();
            $table->string('business_phone')->nullable();
            $table->string('postcode')->nullable();
            $table->boolean('status')->default(1);
            $table->string('review_filter')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('businesses');
    }
};
