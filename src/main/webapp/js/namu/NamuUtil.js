const NamuUtil = {
    arrReduceSum: (keyword, targets, arrData) => {
        var result = [];
        arrData.reduce((res, value) => {
            if (!res.hasOwnProperty(value[keyword])) {
                res[value[keyword]] = {none: 0}
                res[value[keyword]][keyword] = value[keyword];
                for (const target of targets) {
                    res[value[keyword]][target.value] = 0;
                }

                result.push(res[value[keyword]])
            }

            for (const target of targets) {
                res[value[keyword]][target.value] += value[target.value];
            }

            return res;
        }, {});

        return result;
    },
    arrDateFormat: (keyword, format, arrData) => {
        arrData.sort((a, b) => a[keyword] - b[keyword]);

        var result = [];
        arrData.reduce((res, value, index) => {
            res[index] = value;
            res[index][keyword] = new Date(moment(value[keyword], format)).getTime();
            result.push(res[index]);
            return res;
        }, {});

        return result;
    },
    strToDate: (dateString) => {
        let reggie = /(\d{4})(\d{2})(\d{2})(\d{2})/
            , [,year, month, day, hours] = reggie.exec(dateString)
            , dateObject = new Date(year, month-1, day, hours);

        return dateObject;
    },
}
