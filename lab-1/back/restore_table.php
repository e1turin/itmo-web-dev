<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$restore = isset($_GET['restore']) ? $_GET['restore'] : null;

if ($restore === 'true' && isset($_SESSION['result'])) {
    $res = json_encode($_SESSION['result']);
    echo $res;
}
