const csv2json = (data, delimiter = ',') => {
    const titles = data.slice(0, data.indexOf('\r\n')).split(delimiter);
    return data
        .slice(data.indexOf('\n') + 1)
        .split('\r\n')
        .map(v => {
            const values = v.split(delimiter);
            return titles.reduce(
                (obj, title, index) => ((obj[title] = isNaN(Number(values[index]))?values[index]:Number(values[index])), obj), {}
            );
        });
};

const readCvs = (e) => {
    var arrData = [];
    var headers = [];
    var rows = e.target.result.split("\r\n");
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].split(",");
        var rowData = {};
        for(var j=0;j<cells.length;j++){
            if(i==0){
                var headerName = cells[j].trim();
                headers.push(headerName);
            }else{
                var key = headers[j];
                if(key){
                    rowData[key] = cells[j].trim();
                    var num = Number(rowData[key]);
                    if (!isNaN(num)) {
                        rowData[key] = num;
                    }
                }
            }
        }
        //skip the first row (header) data
        if(i != 0){
            arrData.push(rowData);
        }

        if(i >= 10){
            console.dir(arrData);
            break;
        }
    }

    var jsonString = JSON.stringify(arrData);
    var jsonData = JSON.parse(jsonString);
    console.dir(jsonString);
    console.dir(jsonData);
};

const csvFileToJSON = (file) => {
    try {
        var reader = new FileReader();
        reader.readAsText(file, 'euc-kr');
        reader.onload = (e) => {
            data = csv2json(e.target.result);
            console.dir(data);
            // data = readCvs(e)
            // console.dir(data);
            drawChart(data.slice(0, 1000));
            // drawChart(data);
        };
    } catch(e) {
        console.error(e);
    }
}
