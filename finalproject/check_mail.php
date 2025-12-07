<?php
$to = "your.email@example.com";
$subject = "Test Email";
$message = "This is a test email from your server.";
$headers = "From: test@yourdomain.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Test email sent successfully! Check your inbox (and spam folder).";
} else {
    echo "Failed to send test email. mail() may be disabled or misconfigured.";
}
?>