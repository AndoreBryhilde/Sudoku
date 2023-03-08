function get_record() {
    fetch('/record/getrecord', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            let obj=[];
            for(let e of json['body']){
                obj.push(e[0]);
            }
            show_record_list(obj);
        });//
    function show_record_list(json){
        let recordtable = document.getElementById('recordtable');
        let tbody = recordtable.getElementsByTagName('tbody')[0];
        while (tbody.hasChildNodes()) {tbody.removeChild(tbody.firstChild);}
        let columnName = ['Id', 'type', 'costtime'];
        if (Object.keys(json).length != 0) {
            for (let row of json) {
                let tr = document.createElement('tr');
                for (let col of columnName) {
                    let td = document.createElement('td');
                    let value = row[col];
                    switch (col) {
                        case 'costtime':
                            if (value < 60) {
                                value = `00:00:${value>9?value:'0'+value}`;
                            } else if (value < 3600) {
                                let sec = value % 60;
                                let min = (value - sec) / 60;
                                value = `00:${min ? (min>9?min:'0'+min) : '00'}:${sec ? sec>9?sec:'0'+sec : '00'}`;
                            } else {
                                let sec = value % 60;
                                let min = ((value - sec) % 3600) / 60;
                                let hour = (value - sec - min * 60) / 3600;
                                value = `${hour>9?hour:'0'+hour}:${min ? (min>9?min:'0'+min) : '00'}:${sec ? sec>9?sec:'0'+sec : '00'}`;
                            }
                            break;
                        default:
                            break;
                    }
                    td.innerText = value;
                    tr.appendChild(td);
                }
                tbody.appendChild(tr);
            }
        }
    }
}

function save(id, type, costtime) {
    let data = { 'gamer_id': id, 'choose_type': type, 'costtime': costtime };
    fetch('/record/savedata', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(json => {
            if (json['res'] == 'success') {
                document.querySelector('#result-save').classList.remove('btn-blue');
                document.querySelector('#result-save').classList.add('btn');
                document.querySelector('#result-save').innerHTML='Success';
                document.querySelector('#result-save').removeAttribute("onclick");
            }
        });
}