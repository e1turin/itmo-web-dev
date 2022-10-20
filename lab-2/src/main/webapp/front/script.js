(() => {
    const URL_ROOT = "/lab-2-1.0-SNAPSHOT/";
    const Point = {x: null, y: null, r: 2};
    let canvas = null;
    let cft = null;
    let hits = [];

    document.addEventListener("DOMContentLoaded", () => {
        update_point();
        canvas = document.getElementById("area");
        cft = ((canvas.width / 2 - 10 - 10 - 10) / 5 / 2);
        canvas.addEventListener("click", function (e) {
            make_hit_by_click(canvas, e)
        });
        draw_canvas(canvas);
        restore_table();

        let x_inputs = document.getElementsByClassName("x-input");
        for (let x of x_inputs) {
            x.addEventListener("input", on_x_change);
        }

        let y_inputs = document.getElementsByClassName("y-input");
        for (let y of y_inputs) {
            y.addEventListener("input", on_y_change);
        }

        let r_inputs = document.getElementsByClassName("r-input");
        for (let r of r_inputs) {
            r.addEventListener("input", on_r_change);
        }

        let form = document.forms['coords'];
        form.onsubmit = submit_form;

        let reset_form = document.forms['reset-table'];
        reset_form.onsubmit = reset_table;


    });

    function update_point() {
        const submit_btn = document.getElementById("form-submit-btn");
        let valid_point = true;
        let x_final = document.getElementById("final-input-x");
        if (Point.x == null) {
            valid_point = false;
            x_final.innerHTML = "❌";
        } else {
            x_final.innerHTML = Point.x;
        }

        let y_final = document.getElementById("final-input-y");
        if (Point.y == null) {
            valid_point = false;
            y_final.innerHTML = "❌";
        } else {
            y_final.innerHTML = Point.y;
        }

        let r_final = document.getElementById("final-input-r");
        if (Point.r == null) {
            valid_point = false;
            r_final.innerHTML = "❌";
        } else {
            r_final.innerHTML = Point.r;
        }
        submit_btn.disabled = !valid_point;
    }

    function on_x_change(event) {
        console.log('x:', event);
        Point.x = get_x_value();
        update_point();
    }

    function on_y_change(event) {
        console.log('y:', event);
        Point.y = get_y_value(event.target.value);
        update_point();
    }

    function on_r_change(event) {
        console.log('r:', event);
        Point.r = get_r_value();
        update_point();
        draw_canvas(canvas);

    }

    function get_x_value() {
        let el = [...document.forms['coords']['x']].find(el => el.checked);
        if (el !== undefined) {
            el = el.value;
        }
        return el;
    }

    function get_r_value() {
        let el = [...document.forms['coords']['r']].find(el => el.checked);
        if (el !== undefined) {
            el = el.value;
        }
        return el;
    }

    function get_y_value(new_y, precession = 4) {
        let y_input = new_y.toString().replaceAll(",", ".").trim();
        if (!/^-?\d+\.?\d*$/.test(y_input)) return null; // ban exponential form
        let y_as_num = ParseFloat(y_input, precession);
        if (isNaN(y_as_num)) return null;
        if (y_as_num >= 5 || y_as_num <= -3) {
            return null;
        } else {
            return y_as_num;
        }
    }

    function ParseFloat(str, precession=4) {
        str = str.toString();
        str = str.slice(0, (str.indexOf(".")) + precession + 1);
        return Number(str);
    }

    function submit_point(x, y, r) {
        let params = `?x=${x}`
            + `&y=${y}`
            + `&r=${r}`;
        fetch(URL_ROOT + "AreaCheckServlet" + params)
            .then(async response => {
                handle_response(await response.text());
            })
    }

    function submit_form(e) {
        e.preventDefault();
        submit_point(Point.x, Point.y, Point.r);
    }

    function restore_table() {
        let params = "?restore=true"
        fetch(URL_ROOT + "ControllerServlet" + params)
            .then(async response => {
                handle_response(await response.text());
            });
    }

    function reset_table(e) {
        hits = [];
        draw_canvas(canvas);
        console.log(e.target);
        e.preventDefault();
        let params = "?reset=true";
        fetch(URL_ROOT + "ControllerServlet" + params)
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

    function add_res_row(json_response) {
        let tbody = get_res_table().getElementsByTagName('tbody')[0];
        let new_row = document.createElement('tr');

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
        AC.innerHTML = json_response['isInsideArea'] ? "✅" : "❌";
        new_row.appendChild(AC);

        let server_time = document.createElement('td');
        server_time.innerHTML = json_response['currentTime'];
        new_row.appendChild(server_time);

        let response_time = document.createElement('td');
        response_time.innerHTML = json_response['runningTime'];
        new_row.appendChild(response_time);


        tbody.appendChild(new_row);
        hits.push({"x": Number(json_response['x']), "y": Number(json_response['y']), "isInsideArea": json_response['isInsideArea']})
        draw_hit(Number(json_response['x']), Number(json_response['y']), null)//json_response['isInsideArea']
    }

    function get_res_table() {
        return document.getElementsByClassName("results-table")[0];
    }

    /*
     *      Graph
     */
    function make_hit_by_click(canvas, event) {
        let rect = canvas.getBoundingClientRect()
        console.log("x: ", event.clientX - rect.left, " y: ", event.clientY - rect.top);
        let x_click = (event.clientX - rect.left - canvas.width / 2) / cft / 2;
        let y_click = -(event.clientY - rect.top - canvas.height / 2) / cft / 2;
        if (Point.r == null){
            alert("Select Radius first")
            return;
        }
        submit_point(ParseFloat(x_click), ParseFloat(y_click), Point.r);

        // Point.y = ParseFloat(y_click);
        // Point.x = ParseFloat(x_click);
        // update_point();
    }

    function draw_hit(x, y, isInsideArea) {
        let ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.arc(x * 2 * cft + canvas.width / 2,
            -y * 2 * cft + canvas.height / 2,
            3, 0, 7, false
        );
        ctx.closePath();
        if (isInsideArea == null){
            ctx.fillStyle = "#8f8d8d";
        } else if (isInsideArea === true) {
            ctx.fillStyle = "#248809";
        } else {
            ctx.fillStyle = "#c71717";
        }
        ctx.fill();
    }


    function draw_canvas(canvas) {
        let context = canvas.getContext('2d');
        let r_canvas;
        if (Point.r == null) {
            r_canvas = 2;
        } else {
            r_canvas = Point.r;
        }
        let step = cft * r_canvas;
        context.clearRect(0, 0, canvas.width, canvas.height);
        //draw target
        context.lineWidth = 3;
        context.beginPath();
        context.moveTo(canvas.width / 2, canvas.height / 2);
        context.arc(canvas.width / 2, canvas.height / 2, step, 0, Math.PI / 2, false);
        context.moveTo(canvas.width / 2, canvas.height / 2 + step);
        context.lineTo(canvas.width / 2, canvas.height / 2 + 2 * step);
        context.lineTo(canvas.width / 2 - 2 * step, canvas.height / 2 + 2 * step);
        context.lineTo(canvas.width / 2 - 2 * step, canvas.height / 2);
        context.lineTo(canvas.width / 2, canvas.height / 2);
        context.lineTo(canvas.width / 2, canvas.height / 2 - 2 * step);
        context.lineTo(canvas.width / 2 + step, canvas.height / 2);
        context.lineTo(canvas.width / 2, canvas.height / 2);
        context.closePath();
        context.stroke();
        context.fillStyle = '#f4b943';
        context.fill();

        //draw lines
        context.beginPath();
        context.moveTo(10, canvas.height / 2);
        context.lineTo(canvas.width - 10, canvas.height / 2);
        context.lineTo(canvas.width - 20, canvas.height / 2 - 10);
        context.lineTo(canvas.width - 20, canvas.height / 2 + 10);
        context.lineTo(canvas.width - 10, canvas.height / 2);

        context.moveTo(canvas.width / 2, canvas.height - 10);
        context.lineTo(canvas.width / 2, 10);
        context.lineTo(canvas.width / 2 - 10, 20);
        context.lineTo(canvas.width / 2 + 10, 20);
        context.lineTo(canvas.width / 2, 10);

        context.moveTo(canvas.width / 2 - 2 * step, canvas.height / 2 + 10);
        context.lineTo(canvas.width / 2 - 2 * step, canvas.height / 2 - 10);
        context.moveTo(canvas.width / 2 - step, canvas.height / 2 + 10);
        context.lineTo(canvas.width / 2 - step, canvas.height / 2 - 10);
        context.moveTo(canvas.width / 2 + step, canvas.height / 2 + 10);
        context.lineTo(canvas.width / 2 + step, canvas.height / 2 - 10);
        context.moveTo(canvas.width / 2 + 2 * step, canvas.height / 2 + 10);
        context.lineTo(canvas.width / 2 + 2 * step, canvas.height / 2 - 10);

        context.moveTo(canvas.width / 2 + 10, canvas.height / 2 - 2 * step);
        context.lineTo(canvas.width / 2 - 10, canvas.height / 2 - 2 * step);
        context.moveTo(canvas.width / 2 + 10, canvas.height / 2 - step);
        context.lineTo(canvas.width / 2 - 10, canvas.height / 2 - step);
        context.moveTo(canvas.width / 2 + 10, canvas.height / 2 + step);
        context.lineTo(canvas.width / 2 - 10, canvas.height / 2 + step);
        context.moveTo(canvas.width / 2 + 10, canvas.height / 2 + 2 * step);
        context.lineTo(canvas.width / 2 - 10, canvas.height / 2 + 2 * step);
        context.closePath();
        context.fillStyle = "#000000";
        context.fill();
        context.lineWidth = 2;
        context.stroke();
        console.log(hits);
        for(let i=0; i< hits.length; ++i){
            console.log(hits[i].x, hits[i].y);
            draw_hit(hits[i].x, hits[i].y, null);
        }
    }

})();
