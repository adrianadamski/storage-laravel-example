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

    public function create(Request $request): Activity
    {
        $request->merge(['act_is_selectable' => !!$request->get('act_active')]);

        return $this->repository->create($request->all());
    }
}
