<?php

namespace App\Console\Commands;

use App\Jobs\RemindEmailJob;
use App\Models\Reminder;
use Carbon\Carbon;
use Illuminate\Console\Command;

class SendEmailReminder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:email:reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send email to reminding event';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $remindTime = Carbon::now()->subMinutes(5);
        $reminders = Reminder::with('user')->where('remind_at', '<=', $remindTime->timestamp)->get();
        foreach ($reminders as $reminder) {
            $this->output->writeln("<info>Event Reminder : $reminder->title</info>");
            RemindEmailJob::dispatch($reminder->user->email, $reminder);
        }
    }
}
