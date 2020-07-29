<?php declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\StorageItem as StorageItemResource;
use App\Services\StorageItemService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StorageItemController extends Controller
{
    /**
     * @var StorageItemService
     */
    protected $storageItemService;

    public function __construct()
    {
        $this->storageItemService = resolve(StorageItemService::class);
    }

    public function index(int $id): JsonResource
    {
        return StorageItemResource::collection($this->storageItemService->getStorageItemsByStorageId($id));
    }

    public function store(Request $request): JsonResponse
    {
        $validator = $this->storageItemService->validate($request);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $this->storageItemService->create($request);

        return response()->json([
            'success' => true,
        ]);
    }

    public function put(Request $request, int $id): JsonResponse
    {
        $request->merge(['id' => $id]);

        $validator = $this->storageItemService->validateQty($request);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $this->storageItemService->changeQty($request);

        return response()->json([
            'success' => true,
        ]);
    }
}
