<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$reset = isset($_GET['reset']) ? $_GET['reset'] : null;

if ($reset === 'true' && isset($_SESSION['result'])) {
    unset($_SESSION['result']);
}

echo 'previous result cleared';
return;
