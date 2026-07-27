<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inquiry extends Model
{
    use HasFactory;

    public const STATUS_NEW = 'new';

    public const STATUS_CONTACTED = 'contacted';

    public const STATUS_COMPLETED = 'completed';

    protected $fillable = [
        'service_id',
        'name',
        'phone',
        'email',
        'requested_service',
        'requested_date',
        'message',
        'status',
    ];

    protected function casts(): array
    {
        return [
            'requested_date' => 'date',
        ];
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
