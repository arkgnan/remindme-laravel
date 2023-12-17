<?php

namespace App\Jobs;

use App\Mail\RemindEventMail;
use App\Models\Reminder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class RemindEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $sendMail;

    protected $reminder;

    /**
     * Create a new job instance.
     */
    public function __construct($sendMail, Reminder $reminder)
    {
        $this->sendMail = $sendMail;
        $this->reminder = $reminder;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $email = new RemindEventMail($this->reminder);
        Mail::to($this->sendMail)->send($email);
    }
}
