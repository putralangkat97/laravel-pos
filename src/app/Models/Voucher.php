<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Voucher extends Model
{
    protected $guarded = [];
    protected $dates = ['valid_from', 'valid_to'];

    public function userVouchers(): HasMany
    {
        return $this->hasMany(UserVoucher::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
