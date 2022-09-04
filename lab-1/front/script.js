(function () {
    fetch("back/restore_table.php")
        .then(async response => {
            handle_response(await response.text());
        });
})()

function submit_form() {
    const coords = document.forms['coords'];
    let x = get_x_value(coords);
    let y = get_y_value(coords);
    let r = get_r_value(coords);

    if (validate_form(x, y, r)) {
        let req = `?x=${x}&y=${y}&r=${r}`;
        fetch("back/check.php" + req)
            .then(async response => {
                handle_response(await response.text())
            });
    } else {
        //todo inactive btn
        alert("invalid input in form");
    }
}

function reset_table() {
    fetch("back/reset_table.php")
        .then(async response => {
            console.log(await response);
            let res_table = get_res_table();
            res_table.getElementsByTagName('tbody')[0].remove();
            res_table.appendChild(document.createElement("tbody"))
        });
}

function handle_response(response) {
    if (response !== "") {
        let json = JSON.parse(response);
        console.log(json);
        if (Array.isArray(json)) {
            for (let res of json) {
                add_res_row(res);
            }
        } else {
            add_res_row(json);
        }
    } else {
        console.log("response is empty");
    }
}

function get_res_table() {
    return document.getElementsByClassName("results-table")[0];
}

function add_res_row(json_response) {
    let tbody = get_res_table().getElementsByTagName('tbody')[0];
    let new_row = document.createElement('tr');
    // for(const [key, val] of json_response){ }

    let x = document.createElement('td');
    x.innerHTML = json_response['x'];
    new_row.appendChild(x);

    let y = document.createElement('td');
    y.innerHTML = json_response['y'];
    new_row.appendChild(y);

    let r = document.createElement('td');
    r.innerHTML = json_response['r'];
    new_row.appendChild(r);

    let AC = document.createElement('td');
    AC.innerHTML = json_response['inside'] ? "✅" : "❌";
    new_row.appendChild(AC);

    let server_time = document.createElement('td');
    server_time.innerHTML = json_response['cur_time'];
    new_row.appendChild(server_time);

    let response_time = document.createElement('td');
    response_time.innerHTML = json_response['time'];
    new_row.appendChild(response_time);

    tbody.appendChild(new_row);
}


function validate_form(x, y, r) {
    let result = true;

    if (x === undefined) { //todo hint lyke rma
        result = false;
    }
    if (y === undefined) { //todo hint
        result = false;
    }
    if (r === undefined) { //todo hint
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

