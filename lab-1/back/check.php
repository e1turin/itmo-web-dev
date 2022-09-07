<?php
$start_time = microtime(true);
session_start();
date_default_timezone_set('Europe/Moscow');
error_reporting(E_ALL);
ini_set('display_errors', 'Off');

$x = isset($_GET["x"]) ? $_GET["x"] : null;
$y = isset($_GET["y"]) ? str_replace(",", ".", $_GET["y"]) : null;
$r = isset($_GET["r"]) ? $_GET["r"] : null;
$msg = "";

function validate_coords($x, $y, $r)
{
    function _validate_y_coord($y)
    {
        if (preg_match('/^-[012]\.[0-9]*/', $y) || preg_match('/^[01234]\.[0-9]*/', $y) // in range of floats (-3;0] || [0;5)
            || preg_match('/^-[012]/', $y) || preg_match('/^[01234]', $y) // in range of integers (-3;0] || [0;5)
        ) {
            return true;
        } else {
            return false;
        }
    }

    if (in_array($x, ["-5", "-4", "-3", "-2", "-1", "0", "1", "2", "3"], true) &&
        in_array($r, ["1", "2", "3", "4", "5"], true) &&
        is_numeric($x) && is_numeric($r) && is_numeric($y) &&
        _validate_y_coord($y)
    ) {
        return true;
    } else {
//        $msg = "wrong values";
        //todo: give msg
        $msg = "one or more coordinates are not in allowed range";
        return false;
    }
}


if (!validate_coords($x, $y, $r)) {
    //http_response_code(400); // invalid input
    return;
}

function inside_area($x, $y, $r)
{
    function _in_circle($x, $y, $r)
    {
        //todo: msg
        return $x <= 0 && $y >= 0 // II term
            && 4 * ($x * $x + $y * $y) <= $r * $r; // in quad of circle
    }

    function _in_triangle($x, $y, $r)
    {
        //todo: msg
        return $x <= 0 && $y <= 0 //III term
            && 2 * ($x + $y) >= -$r; // in triangle
    }

    function _in_rectangle($x, $y, $r)
    {
        //todo: msg
        return $x >= 0 && $y <= 0 //IV term
            && $x <= $r && 2 * $y >= -$r;// in rectangle
    }

    if (_in_circle($x, $y, $r) || _in_triangle($x, $y, $r) || _in_rectangle($x, $y, $r)) {
        return true;
    } else {
        //todo: msg
        return false;
    }

}

$current_time = date("H:i:s");
$time = number_format(microtime(true) - $start_time, 10, ".", "") * 1000000;

$response = array(
    'x' => $x,
    'y' => $y,
    'r' => $r,
    'inside' => inside_area($x, $y, $r),
    'cur_time' => $current_time,
    'time' => (int)$time,
    'msg' => $msg
);


if (!isset($_SESSION['result'])) {
    $_SESSION = array();
}
$_SESSION['result'][] = $response; // todo: compact format

//$json_response = json_encode($response); // this script is used in index.php to provide full page reload on request
//echo $json_response;
