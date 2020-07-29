<?php

use App\Models\Storage;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(Storage::class, 20)->create();
        // $this->call(UserSeeder::class);
    }
}
