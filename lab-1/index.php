<?php
//  script doesn't work correctly if session is started later
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>ЛР №1</title>
    <link rel="icon" type="image/x-icon" href="/front/favicon.ico">
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <link rel="stylesheet" href="front/style.css"/>
    <script src="front/script.js"></script>
    <script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
</head>
<body>
<header>
    <h1>Тюрин Иван</h1>
    <h2>335047</h2>
    <h3>Вариант: 1022</h3>
</header>

<div class="main">
    <div class="areas section">
        <!--        <img src="areas.png" alt="areas"/>-->
        <?php
        include "areas.svg";
        ?>
    </div>
    <form class="coords-form section" onreset="" name="coords">
        <div class="input-coord">
            <div class="x-coord">
                <span>X:</span>
                <div class="x-checkboxes">
                    <?php
                    $x_values = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
                    for ($i = 0; $i < count($x_values); $i++) {
                        echo
                        "<div class=\"selection\">
                            <label for=\"x-input-$i\">$x_values[$i]</label>
                            <input type=\"checkbox\" class=\"x-input\" id=\"x-input-$i\" name=\"x\" value=\"$x_values[$i]\"/>
                         </div>";
                    }
                    ?>
                </div>
            </div>
            <div class="warn">
                <span><i class='fas fa-exclamation-triangle warn-icon'>[ ! ]</i></span>
                <span class="warn-msg"> — <u>Только самый левый</u> из выбранных попадает в запрос.</span>
            </div>
        </div>
        <div class="input-coord">
            <div class="y-coord">
                <span>Y:</span>
                <input class="y-input" id="y-input" type="text" name="y" placeholder="-3 < y < 5" required/>
            </div>
            <div class="warn">
                <span><i class='fas fa-exclamation-triangle warn-icon'>[ ! ]</i></span>
                <span class="warn-msg"> — Поле должно содержать число в десятичной форме из диапозона (-3; 5), дробная часть ограничивается 4 знаками.</span>
            </div>
        </div>
        <div class="input-coord">
            <div class="r-coord">
                <span>R:</span>
                <div class="r-radios">
                    <?php
                    $y_values = array(1, 2, 3, 4, 5);
                    for ($i = 0; $i < count($y_values); $i++) {
                        echo
                        "<div class=\"selection\">
                            <label for=\"r-input-$i\">$y_values[$i]</label>
                            <input type=\"radio\" class=\"r-input\" id=\"r-input-$i\" name=\"r\" required value=\"$y_values[$i]\"/>
                         </div>";
                    }
                    ?>
                </div>
            </div>
            <div class="warn">
                <span><i class='fas fa-exclamation-triangle warn-icon'>[ ! ]</i></span>
                <span class="warn-msg"> — Необходимо выбрать один из пунктов</span>
            </div>
        </div>
        <div class="form-final">
            <div class="final-input">
                <table class="final-input-table">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td id="final-input-x">❌</td>
                        <td id="final-input-y">❌</td>
                        <td id="final-input-r">❌</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="form-submit">
                <input class="submit-btn" id="form-submit-btn" type="submit" value="Выбрать" disabled>
            </div>
            <div class="form-reset">
                <button onclick="" type="reset" class="reset" value="Очистить форму">Очистить форму</button>
            </div>
        </div>
    </form>
    <div class="table section">
        <div class="table-header">
            <span>Предыдущие попытки</span>
            <div class="table-reset-btn">
                <form action="back/reset_table.php" method="get" name="reset-table">
                    <button class="reset-btn" name="reset" type="submit" value="true">Сбросить</button>
                </form>
            </div>

        </div>
        <table class="results-table">
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>AC</th>
                <th>Время на сервере</th>
                <th>Время ответа, мс</th>
            </tr>
            </thead>
            <tbody>
            <?php
//            if (isset($_SESSION['result'])) {
//                foreach ($_SESSION['result'] as $row) {
//                    $inside = $row['inside'] ? "✅" : "❌";
//                    echo "<tr>
//                            <td>{$row['x']}</td> <td>{$row['y']}</td> <td>{$row['r']}</td> <td>{$inside}</td> <td>{$row['cur_time']}</td> <td>{$row['time']}</td>
//                          </tr>";
//
//                }
//            }
            ?>
            </tbody>
        </table>

    </div>
</div>

<!--<footer></footer>-->
</body>
</html>
