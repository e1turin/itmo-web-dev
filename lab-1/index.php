<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <link rel="stylesheet" href="front/style.css"/>
    <title>ЛР №1</title>
</head>
<body>
<header>Тюрин Иван 335047</header>

<div class="main">
    <div class="areas">
        <img src="../areas.png" alt="areas"/>
        <!-- <canvas></canvas> -->
        <div class="result">
            <span>Нет попадания</span>
        </div>
    </div>
    <div class="table">
        <span>Предыдущие попытки</span>
        <hr/>
        <table>
            <thead>
            <tr>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>AC</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>miss</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>miss</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>miss</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>miss</td>
            </tr>
            </tbody>
        </table>
    </div>
    <form class="coords" action="check.php" method="get">
        <div class="x-coord">
            <span>X:</span>
            <!-- div.checkboxes>div.sel-bubble*9>label[for=x-chkbox-$]+input[type=checkbox id=x-chkbox-$] -->
            <div class="x-chkboxes">
                <?php
                $x_values = array(-5, -4, -3, -2, -1, 0, 1, 2, 3);
                for ($i = 0; $i < count($x_values); $i++) {
                    echo "<div class=\"sel-bubble\">
                            <label for=\"x-chkbox-{$i}\">{$x_values[$i]}</label
                            ><input type=\"checkbox\" id=\"x-chkbox-{$i}\" />
                          </div>";
                }
                ?>
            </div>
        </div>

        <div class="y-coord">
            <span>Y:</span>
            <label for="">
                <input type="text" name="" id=""/>
            </label>
            <span class="y-coord-warn">field must contain number</span>
        </div>

        <div class="r-coord">
            <span>R:</span>
            <div class="r-radios">
                <?php
                $y_values = array(1, 2, 3, 4, 5);
                for ($i = 0; $i < count($y_values); $i++) {
                    echo "<div class=\"sel-bubble\">
                            <label for=\"r-radio-{$i}\">{$y_values[$i]}</label
                            ><input type=\"radio\" id=\"r-radio-{$i}\" name=\"r-coord-radio\"/>
                          </div>";
                }
                ?>
            </div>
        </div>
        <div class="coords-submit-btn">
            <input class="submit-btn" type="submit" value="Save">
        </div>
    </form>
</div>

<footer>footer</footer>
</body>
</html>
