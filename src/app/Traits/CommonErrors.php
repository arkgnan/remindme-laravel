<?php

namespace App\Traits;

trait CommonErrors
{
    public function badRequest(): array
    {
        return [
            'ok' => false,
            'err' => 'ERR_BAD_REQUEST',
            'msg' => 'invalid value of `type`',
        ];
    }

    public function unauthorized(): array
    {
        return [
            'ok' => false,
            'err' => 'ERR_INVALID_ACCESS_TOKEN',
            'msg' => 'invalid access token',
        ];
    }

    public function forbidden(): array
    {
        return [
            'ok' => false,
            'err' => 'ERR_FORBIDDEN_ACCESS',
            'msg' => "user doesn't have enough authorization",
        ];
    }

    public function notFound(): array
    {
        return [
            'ok' => false,
            'err' => 'ERR_NOT_FOUND',
            'msg' => 'resource is not found',
        ];
    }

    public function internalServerError(): array
    {
        return [
            'ok' => false,
            'err' => 'ERR_INTERNAL_ERROR',
            'msg' => 'unable to connect into database',
        ];
    }
}
