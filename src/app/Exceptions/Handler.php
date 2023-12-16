<?php

namespace App\Exceptions;

use App\Traits\CommonErrors;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    use CommonErrors;

    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception $e
     * @return \Illuminate\Http\Response
     */
    // public function render($request, Throwable $e)
    // {
    //     if ($request->expectsJson() && in_array(env('APP_ENV'), ['stage', 'production'])) {
    //         // Default response of 400
    //         $status = 400;

    //         if ($request->is('api/*')) {
    //             if ($e instanceof ModelNotFoundException || $e instanceof NotFoundHttpException) {
    //                 $status = 404;
    //             }
    //         }

    //         // If this exception is an instance of HttpException
    //         if ($this->isHttpException($e)) {
    //             if ($e->getCode() === 0) {
    //                 if ($e instanceof HttpExceptionInterface) {
    //                     $status = $e->getStatusCode();
    //                 }
    //             } else {
    //                 $status = $e->getCode();
    //             }
    //         }

    //         switch ($status) {
    //             case 401:
    //                 $response = $this->unauthorized();
    //                 break;
    //             case 403:
    //                 $response = $this->forbidden();
    //                 break;
    //             case 404:
    //                 $response = $this->notFound();
    //                 break;
    //             case 500:
    //                 $response = $this->internalServerError();
    //                 break;
    //             default:
    //                 $response = $this->badRequest();
    //                 break;
    //         }

    //         return response()->json($response, $status);
    //     }

    //     // Default to the parent class' implementation of handler
    //     return parent::render($request, $e);
    // }

    protected function unauthenticated($request, Throwable $exception)
    {
        if ($request->expectsJson()) {
            return response()->json($this->unauthorized(), 401);
        }

        return redirect()->guest(route('login'));
    }
}
