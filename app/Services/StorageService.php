<?php declare(strict_types=1);

namespace App\Services;

use App\Models\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class StorageService
{
    public function getStorages(): Collection
    {
        return Storage::all();
    }
}
