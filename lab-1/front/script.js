let res
(function () {
    fetch("back/restore_table.php")
        .then(async response => {res = await response.text(); console.log(res);});
})()

function submitForm() {
    const coords = document.forms['coords'];
    let x = get_x_value(coords);
    let y = get_y_value(coords);
    let r = get_r_value(coords);

    if (validateForm(x, y, r)) {
        let req = `?x=${x}&y=${y}&r=${r}`;
        fetch("back/check.php" + req)
            .then(async response => console.log(await response.text()));
    } else {
        //todo inactive btn
        alert("INVALID INPUT");
    }
}

function handle_response(response) {
    let json = JSON.parse(response);
    console.log(json);
}

function validateForm(x, y, r) {
    let result = true;

    if (x === undefined) {
        //todo hint lyke rma
        result = false;
    }
    if (y === undefined) {
        //todo hint
        result = false;
    }
    if (r === undefined) {
        //todo hint
        result = false;
    }
    return result

}

function get_x_value(form) {
    let el = [...form['x']].find(el => el.checked);
    if (el !== undefined) {
        el = el.value;
    }
    return el;
}

function get_y_value(form) {
    let y_coords = form['y'];
    let y_input = y_coords.value.replaceAll(",", ".");
    let y_as_num = Number(y_input);
    if (!isNaN(y_as_num) && -3 < y_as_num && y_as_num < 5) {
        return y_as_num;
    }
    return undefined;
}

function get_r_value(form) {
    let el = [...form['r']].find(el => el.checked);
    if (el !== undefined) {
        el = el.value;
    }
    return el;
}

