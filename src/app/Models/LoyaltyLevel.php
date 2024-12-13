<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LoyaltyLevel extends Model
{
    protected $guarded = [];

    public function users(): HasMany
    {
        return $this->hasMany(UserLoyalty::class, 'current_level_id');
    }
}
