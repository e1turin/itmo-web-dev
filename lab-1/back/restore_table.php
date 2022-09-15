<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (isset($_SESSION['result'])) {
    $res = json_encode($_SESSION['result']);
    echo $res;
}
