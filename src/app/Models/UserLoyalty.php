<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserLoyalty extends Model
{
    protected $guarded = [];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function currentLevel(): BelongsTo
    {
        return $this->belongsTo(LoyaltyLevel::class, 'current_level_id');
    }
}
