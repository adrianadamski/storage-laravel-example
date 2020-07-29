<?php declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StorageItemHistory extends Model
{
    protected $fillable = [
        'qty_change',
        'storage_item_id',
    ];

    protected $dates = [
        'created_at',
    ];

    public function setUpdatedAtAttribute($value)
    {

    }
}
