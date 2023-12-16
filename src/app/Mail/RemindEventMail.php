<?php

namespace App\Mail;

use App\Models\Reminder;
use Carbon\Carbon;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class RemindEventMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $reminder;

    /**
     * Create a new message instance.
     */
    public function __construct(Reminder $reminder)
    {
        $this->reminder = $reminder;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('noreply@gmail.com', env('app.name')),
            subject: 'Reminding your event',

        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.reminder',
            with: [
                'title' => $this->reminder->title,
                'description' => $this->reminder->description,
                'user' => $this->reminder->user->name,
                'event_at' => Carbon::createFromTimestamp($this->reminder->event_at)->format('d M Y H:i'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
