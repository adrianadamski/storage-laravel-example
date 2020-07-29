<?php

namespace App\Observers;

use App\Models\StorageItem;
use App\Models\StorageItemHistory;

class StorageItemObserver
{
    public function updated(StorageItem $storageItem)
    {
        $originalQty = $storageItem->getOriginal('qty');
        $qtyDiff = $storageItem->qty - $originalQty;

        if (0 !== $qtyDiff) {
            StorageItemHistory::create([
                'qty_change' => $qtyDiff,
                'storage_item_id' => $storageItem->id,
            ]);
        }
    }
}
