<?php
    $email = $_POST['email'];
    $message = $_POST['message'];

    $subject = "=?utf-8?B?".base64_encode("Повідомлення з сайта-портфоліо")."?=";
    $headers = "From: $email\r\nReply-to: $email\r\nContent-type: text/html; charset=utf-8\r\n";

    $success = mail("kolosovskyi.dmytro@gmail.com", $subject, $message, $headers);
    echo $success;
?>