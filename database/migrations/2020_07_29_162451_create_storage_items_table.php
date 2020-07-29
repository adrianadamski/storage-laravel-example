<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStorageItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('storage_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('qty')->unsigned();
            $table->integer('storage_id');
            $table->timestamps();
            $table->index('storage_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('storage_items');
    }
}
