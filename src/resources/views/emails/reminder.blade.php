<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            background: #965bf0;
            padding: 0 24px;
            margin: 0;
            height: 100vh;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            background: #ffffff;
            padding: 24px;
            width: calc(90% - 50px);
            color: #3b1f66;
        }

        .card-primary {
            background: #eee3ff;
            padding: 20px 24px;
            border-radius: 12px;
            font-size: larger;
            font-weight: 400;
        }

        .card-secondary {
            border: 2px solid #3b1f66;
            padding: 24px;
            border-radius: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Event Reminder</h1>
        <p>Dear {{ $user }},</p>
        <p>Don't forget to your event.</p>
        <p class="card-primary">{{ $title }}</p>
        <p>This event will be held on <strong>{{ $event_at }}</strong></p>

        <p class="card-secondary">
            <strong>Detail :</strong>
            <br/>
            {{ $description }}
        </p>
    </div>
</body>
</html>