<?php declare(strict_types=1);

namespace App\Services;

use App\Models\StorageItem;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

class StorageItemService
{
    public function getStorageItemsByStorageId(int $storageId): Collection
    {
        return StorageItem::where('storage_id', $storageId)->get();
    }

    public function getActiveActivities(): Collection
    {
        return $this->repository->getActiveActivities();
    }

    public function updateActivities(array $activities): bool
    {
        foreach ($activities['name'] as $id => $name) {
            $this->repository->update($id, [
                'act_name' => $name,
                'act_display_name' => $activities['display_name'][$id] ?? '',
                'act_active' => $activities['active'][$id] ?? 0,
                'act_is_selectable' => $activities['active'][$id] ?? 0,
            ]);
        }

        return true;
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

    public function validate(Request $request)
    {
        return $this->validateRequest($request, [
            'name' => 'required',
            'qty' => 'required|numeric',
            'storage_id' => 'required|exists:storages,id',
        ]);
    }

    public function validateQty(Request $request)
    {
        return $this->validateRequest($request, [
            'qty' => 'required|numeric',
            'id' => 'required|exists:storage_items,id',
        ]);
    }

    protected function validateRequest(Request $request, array $rules)
    {
        return Validator::make($request->all(), $rules);
    }
}
