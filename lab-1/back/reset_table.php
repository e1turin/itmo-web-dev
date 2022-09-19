<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
if (isset($_SESSION['result'])) {
    unset($_SESSION['result']);
}
return;
