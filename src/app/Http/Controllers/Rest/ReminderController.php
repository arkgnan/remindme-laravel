<?php

namespace App\Http\Controllers\Rest;

use App\Http\Controllers\Controller;
use App\Http\Requests\ReminderRequest;
use App\Models\Reminder;
use App\Services\ReminderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ReminderController extends Controller
{
    /*
     * ReminderService
     */
    private $reminderService;

    /*
     * @var ReminderService $reminderService
     */
    public function __construct(
        ReminderService $reminderService
    ) {
        $this->reminderService = $reminderService;
    }

    /**
     * Display a listing of the reminder.
     *
     * @var Request
     *
     * @return array
     */
    public function index(Request $request)
    {
        $user = Auth()->user();
        $limit = $request->limit ?? 10;
        $reminders = $this->reminderService->list($user, $limit);

        return response()->json([
            'ok' => true,
            'data' => [
                'reminders' => $reminders,
            ],
        ], 200);
    }

    /**
     * Store a newly created reminder in database.
     *
     * @var ReminderRequest
     *
     * @return array
     */
    public function store(ReminderRequest $request)
    {
        $data = $request->validated();
        try {
            $reminder = $this->reminderService->create($data);

            return response()->json([
                'ok' => true,
                'data' => $reminder,
            ], 200);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            abort($e->getCode());
        }
    }

    /**
     * Display the specified reminder.
     *
     * @var Reminder
     *
     * @return array
     */
    public function show(Reminder $reminder)
    {
        return response()->json([
            'ok' => true,
            'data' => $reminder,
        ], 200);
    }

    /**
     * Update the specified reminder in database.
     *
     * @var ReminderRequest
     * @var Reminder
     *
     * @return array
     */
    public function update(ReminderRequest $request, Reminder $reminder)
    {
        $data = $request->validated();
        try {
            $reminder->update($data);

            return response()->json([
                'ok' => true,
                'data' => $reminder,
            ], 200);
        } catch (\Exception $e) {
            abort($e->getCode());
        }
    }

    /**
     * Remove the specified reminder from database.
     *
     * @var Reminder
     *
     * @return array
     */
    public function destroy(Reminder $reminder)
    {
        try {
            $reminder->delete();

            return response()->json([
                'ok' => true,
            ], 200);
        } catch (\Exception $e) {
            abort($e->getCode());
        }
    }
}
