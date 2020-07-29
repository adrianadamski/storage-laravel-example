<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StorageItem extends Model
{
    protected $fillable = [
        'name',
        'qty',
        'storage_id',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
    ];

    public function storage(): BelongsTo
    {
        return $this->belongsTo(Storage::class);
    }

    public function storageItemHistories(): HasMany
    {
        return $this->hasMany(StorageItemHistory::class);
    }
}
