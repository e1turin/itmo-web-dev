<?php
session_start();
if (isset($_SESSION['result'])) {
    $res = json_encode($_SESSION['result']);
    echo $res;
//    session_destroy();
}
