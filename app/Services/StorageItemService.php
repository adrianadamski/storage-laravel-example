<?php declare(strict_types=1);

namespace App\Services;

use App\Models\StorageItem;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class StorageItemService
{
    public function getStorageItemsByStorageId(int $storageId): Collection
    {
        return StorageItem::where('storage_id', $storageId)->get();
    }

    public function create(Request $request): StorageItem
    {
        return StorageItem::create($request->all());
    }

    public function changeQty(Request $request): StorageItem
    {
        $storageItem = StorageItem::find($request->id);
        $storageItem->qty = $request->qty;
        $storageItem->save();

        return $storageItem;
    }

    public function validate(Request $request): Validator
    {
        return $this->validateRequest($request, [
            'name' => 'required',
            'qty' => 'required|numeric',
            'storage_id' => 'required|exists:storages,id',
        ]);
    }

    public function validateQty(Request $request): Validator
    {
        return $this->validateRequest($request, [
            'qty' => 'required|numeric',
            'id' => 'required|exists:storage_items,id',
        ]);
    }

    protected function validateRequest(Request $request, array $rules): Validator
    {
        return Validator::make($request->all(), $rules);
    }
}
