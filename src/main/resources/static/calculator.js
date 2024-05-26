let table_body = document.querySelector("table").querySelector("tbody");
let result = document.getElementById("result");
let num_activities = 1;

document.getElementById("add_row").addEventListener('click', function(evt) {
    let newTableRow = document.createElement('tr');
    let data_name = document.createElement('td');
    let data_name_short = document.createElement('td');
    let data_weight = document.createElement('td');
    let data_grade = document.createElement('td');
    let data_percent = document.createElement('td');
    let input_weight = document.createElement('input');
    let input_grade1 = document.createElement('input');
    let span_slash = document.createElement('span');
    let input_grade2 = document.createElement('input');

    table_body.append(newTableRow);
    newTableRow.appendChild(data_name);
    newTableRow.appendChild(data_name_short);
    newTableRow.appendChild(data_weight);
    newTableRow.appendChild(data_grade);
    newTableRow.appendChild(data_percent);
    data_weight.appendChild(input_weight);
    data_grade.appendChild(input_grade1);
    data_grade.appendChild(span_slash);
    data_grade.appendChild(input_grade2);

    data_name.innerHTML = "Activity " + ++num_activities;
    data_name_short.innerHTML = "A" + num_activities;
    data_weight.id = "weight" + num_activities
    data_grade.id = "grade" + num_activities;
    input_weight.type = "text";
    input_grade1.type = "text";
    input_grade2.type = "text";
    span_slash.innerHTML = " / ";

    input_grade1.addEventListener('input', function(evt) {
        if (input_grade2.value != "")
            data_percent.innerHTML = input_grade1.value / input_grade2.value * 100 + '%';
    })
    input_grade2.addEventListener('input', function(evt) {
        if (input_grade1.value != "")
            data_percent.innerHTML = input_grade1.value / input_grade2.value * 100 + '%';
    })
});

let activity1 = table_body.children[1]
let input1 = activity1.children[3].children[0];
let input2 = activity1.children[3].children[2];
let percent = activity1.children[4];
input1.addEventListener('input', function(evt) {
    if (input2.value != "")
        percent.innerHTML = input1.value / input2.value * 100 + '%';
})
input2.addEventListener('input', function(evt) {
    if (input1.value != "")
        percent.innerHTML = input1.value / input2.value * 100 + '%';
})

document.getElementById("mean").addEventListener('click', function(evt) {
    let sum = 0;
    for (let i = 0; i < table_body.children.length; i++) {
        let row = table_body.children[i];
        if (row.id == "table_row_top") continue;
        sum += row.children[3].children[0].value / row.children[3].children[2].value;
    }
    result.innerHTML = sum / num_activities;
})

document.getElementById("weighted").addEventListener('click', function(evt) {
    let sum = 0;
    let weight = 0;
    for (let i = 0; i < table_body.children.length; i++) {
        let row = table_body.children[i];
        if (row.id == "table_row_top") continue;
        let row_weight = row.children[2].children[0].value
        sum += row.children[3].children[0].value / row.children[3].children[2].value * row_weight;
        weight += parseInt(row_weight);
    }
    result.innerHTML = sum / weight;
})