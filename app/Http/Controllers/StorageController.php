<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\Storage as StorageResource;
use App\Services\StorageService;
use Illuminate\Http\Resources\Json\JsonResource;

class StorageController extends Controller
{
    /**
     * @var StorageService
     */
    protected $storageService;

    public function __construct()
    {
        $this->storageService = resolve(StorageService::class);
    }

    public function index(): JsonResource
    {
        return StorageResource::collection($this->storageService->getStorages());
    }
}
