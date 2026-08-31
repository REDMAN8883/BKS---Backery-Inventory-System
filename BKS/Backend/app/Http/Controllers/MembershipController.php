<?php

namespace App\Http\Controllers;

use App\Models\membership;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function index(){
        return response()->json(
            membership::where('estado', true)->get()
        );
    }
}
