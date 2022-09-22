<?php
$start_time = microtime(true);
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$date_time = new \DateTime('now', new \DateTimeZone('Europe/Moscow'));
error_reporting(E_ALL);
ini_set('display_errors', 'Off');

$x = isset($_GET['x']) ? $_GET['x'] : null;
$y = isset($_GET['y']) ? get_y_value($_GET['y'], 4) : null;
$r = isset($_GET['r']) ? $_GET['r'] : null;
$msg = '';

if (
    $x === null || $y === null || $r === null ||
    !validate_coords($x, $y, $r)
) {
    http_response_code(400); // bad request
    return;
}

$current_time = date('H:i:s');
$time = number_format(microtime(true) - $start_time, 10, '.', '') * 1000000;

$response = array(
    'x' => $x,
    'y' => $y,
    'r' => $r,
    'inside' => inside_area($x, $y, $r),
    'cur_time' => $date_time->format(\DateTime::RFC850),
    'time' => (int)$time,
    'msg' => $msg
);


if (!isset($_SESSION['result'])) {
    $_SESSION = array();
}
$_SESSION['result'][] = $response; // todo: compact format

//$json_response = json_encode($response); // this script is used in index.php to provide full page reload on request
//echo $json_response;

function get_y_value($str, $precession = 4)
{
    $matches = array();
    if (!preg_match('/^(-?\d+)\.?(\d*)$/', $str, $matches)) {
        return null;
    }
    $integer_part = $matches[1];
    $float_part = substr($matches[2], 0, $precession);
    return floatval("$integer_part.$float_part");
}

function validate_coords($x, $y, $r)
{
    function _validate_y($y)
    {
        return $y > -3 && $y < 5;
    }

    if (in_array($x, ['-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3'], true) // validate x
        && in_array($r, ['1', '2', '3', '4', '5'], true) //validate r
        && _validate_y($y) // y: float with fixed precession 4
    ) {
        return true;
    } else {
        $msg = 'one or more coordinates are not in allowed range';
        return false;
    }

}

function inside_area($x, $y, $r)
{
    function _in_circle($x, $y, $r)
    {
        return $x <= 0 && $y >= 0 // II term
            && 4 * ($x ** 2 + $y ** 2) <= $r ** 2; // in quad of circle
    }

    function _in_triangle($x, $y, $r)
    {
        return $x <= 0 && $y <= 0 //III term
            && 2 * ($x + $y) >= -$r; // in triangle
    }

    function _in_rectangle($x, $y, $r)
    {
        return $x >= 0 && $y <= 0 //IV term
            && $x <= $r && 2 * $y >= -$r;// in rectangle
    }

    if (_in_circle($x, $y, $r) || _in_triangle($x, $y, $r) || _in_rectangle($x, $y, $r)) {
        return true;
    } else {
        return false;
    }

}
