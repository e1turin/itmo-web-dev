<?php
session_start();
if (isset($_SESSION['result'])) {
    unset($_SESSION['result']);
}
echo "session result cleared";
