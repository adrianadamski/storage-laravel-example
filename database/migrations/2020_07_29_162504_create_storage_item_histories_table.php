<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStorageItemHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('storage_item_histories', function (Blueprint $table) {
            $table->id();
            $table->integer('qty_change');
            $table->integer('storage_item_id');
            $table->timestamp('created_at')->useCurrent();
            $table->index('storage_item_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('storage_item_histories');
    }
}
