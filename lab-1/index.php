<?php
include "back/check.php"; // for get request with page reload
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title>ЛР №1</title>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <link rel="stylesheet" href="front/style.css"/>
    <script src="front/script.js"></script>
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
    <div class="table section">
        <div class="table-header">
            <span>Предыдущие попытки</span>
            <div class="table-reset-btn">
                <input class="reset-btn" onclick="reset_table();" type="button" value="Сбросить">
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
            //            session_start();
            if (isset($_SESSION['result'])) {
                foreach ($_SESSION['result'] as $row) {
                    $inside = $row['inside'] ? "✅" : "❌";
                    echo "<tr> 
                            <td>{$row['x']}</td> <td>{$row['y']}</td> <td>{$row['r']}</td> <td>{$inside}</td> <td>{$row['cur_time']}</td> <td>{$row['time']}</td> 
                          </tr>";

                }
            }
            ?>
            </tbody>
        </table>

    </div>
    <form class="coords-form section" action="" onsubmit="submit_form(); return false;" name="coords">
        <div class="x-coord">
            <span>X:</span>
            <div class="x-chkboxes">
                <?php
                $x_values = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
                for ($i = 0; $i < count($x_values); $i++) {
                    echo "<div class=\"sel-bubble\">
                            <label for=\"x-chkbox-$i\">$x_values[$i]</label
                            ><input type=\"checkbox\" id=\"x-chkbox-$i\" name=\"x\" value=\"$x_values[$i]\"/>
                          </div>";
                }
                ?>
            </div>
            <span class="warn-msg"> — минимум один из вариантов должен быть выбран, <br> (<u>только первый</u> из них попадет в запрос).</span>
        </div>
        <div class="y-coord">
            <span>Y:</span>
            <label for="">
                <input type="text" name="y" placeholder="-3 < y < 5" required/>
            </label>
            <span class="warn-msg"> — поле должно содержать число в диапозоне (-3; 5).</span>
        </div>

        <div class="r-coord">
            <span>R:</span>
            <div class="r-radios">
                <?php
                $y_values = array(1, 2, 3, 4, 5);
                for ($i = 0; $i < count($y_values); $i++) {
                    echo "<div class=\"sel-bubble\">
                            <label for=\"r-radio-{$i}\">{$y_values[$i]}</label
                            ><input type=\"radio\" id=\"r-radio-{$i}\" name=\"r\" required value=\"{$y_values[$i]}\"/>
                          </div>";
                }
                ?>
            </div>
        </div>
        <div class="coords-submit-btn">
            <input class="submit-btn" type="submit" value="Выбрать">
        </div>
    </form>
</div>

<!--<footer></footer>-->
</body>
</html>
