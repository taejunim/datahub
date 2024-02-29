document.write('<script src="/js/namu/NamuLayer.js"></script>');

var map; //맵 변수 선언 : 지도 객체
var view;
var aKey = "D5152B22-77A2-311E-B514-EFD1422CD4ED";
var formatString = 'YYYY-MM-DD HH:mm:ss';

$(() => {
    view = new ol.View({ //뷰 생성
        projection: 'EPSG:3857', //좌표계 설정 (EPSG:3857은 구글에서 사용하는 좌표계)
        center: new ol.geom.Point([126.5398, 33.3876]) //처음 중앙에 보여질 경도, 위도
            .transform('EPSG:4326', 'EPSG:3857') //GPS 좌표계 -> 구글 좌표계
            .getCoordinates(), //포인트의 좌표를 리턴함
        zoom: 10.5, //초기지도 zoom의 정도값
        minZoom: 10.5,
        maxZoom: 20
    });

    map = new ol.Map({ //맵 생성
        target: 'vMap', //html 요소 id 값
        view: view //뷰
    });

    NamuLayer.setMap(map);

    NamuLayer.createVworldMapLayer('Base', 'base', true, 'png');

    $(".ol-zoom").hide();

    ol.proj.proj4.register(proj4);

    var accType = $("#pm-acc-type").val();
    var location = $("#pm-acc-loc").val();
    var pmKind = $("#pm-acc-kind").val();
    var gender = $("#pm-acc-gender").val();
    var age = $("#pm-acc-age").val();
    var company = $("#pm-acc-company").val();

    $(".datepicker").datepicker({
        format: "yyyy-mm-dd"
        ,autoclose: true
        ,language: "ko"
        ,todayBtn: "linked"
        ,clearBtn: true
    });

    $.datepicker.setDefaults({
        dateFormat:"yy-mm-dd",
        closeText: "닫기",
        currentText: "오늘",
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        weekHeader: "주",
        yearSuffix: '년'
    });

    // 디폴트로 쓸 날짜 가져오기
    var currentDate = new Date();
    var previousMonthDate = new Date(currentDate);
    // previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
    previousMonthDate.setFullYear(previousMonthDate.getFullYear() - 1);

    $("#startSearchDt").datepicker();

    $("#startSearchDt").datepicker("setDate", previousMonthDate);
    $("#endSearchDt").datepicker("setDate", currentDate);

    var startSearchDt = moment($("#startSearchDt").val(), 'YYYY-MM-DD').format(formatString);
    var endSearchDt = moment($("#endSearchDt").val(), 'YYYY-MM-DD').format(formatString);

    $(".custom-modal-close").click(function (e) {
        NamuLayer.removeLayer("vector", "search_vector");

        $(".loc-modal").removeClass("custom-modal-show");
        $(".loc-modal").addClass("custom-modal-none");
    })

    var accTable = $('#accTable').DataTable({
        searching : false,
        paging: true,
        responsive: true,
        language: lang_kor,
        lengthChange: true,
        processing: true,
        serverSide: true,
        order : [],
        scrollX: "100%",
        createdRow : function(row, data, dataIndex) {
            $(row).css('cursor', 'pointer');
        },
        initComplete: function(settings, json) {
            this.api().page('last').draw('page');
            $("#accTable_length").css("display", "none");
        },
        drawCallback: function(settings) {
            $("#accTable_paginate").addClass("pagination");
            $("#accTable_paginate .active").addClass("on");
        },
        language: {
            lengthMenu: "_MENU_",
            info: ''
        },
        lengthMenu: [[10, 20, 30], [10, 20, 30]],
        ajax: {
            url: '/pm/accident/getOverallAccidentList.json',
            type: "POST",
            data: function (d) {
              d.accType = accType;
              d.location = location;
              d.pmKind = pmKind;
              d.gender = gender;
              d.age = age;
              d.company = company;
              d.startSearchDt = startSearchDt;
              d.endSearchDt = endSearchDt;
            },
            dataType: 'json',
            dataSrc: function (data) {
                $("#pm-acc-total").text(data.recordsTotal);
                return data.list;
            },
        },
        columns: [
            {
                title: '순번',
                width: "30px",
                className: 'colNum',
                render: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                orderable: false
            },{
                title: '사고 구분',
                width: "120px",
                data: 'acdnt_type',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '운영사',
                width: "50px",
                data: 'oper_co',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: 'PM 종류',
                width: "60px",
                data: 'pm_type',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '성별',
                width: "30px",
                data: 'sexd',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '나이',
                width: "30px",
                data: 'age',
                render: function (data, type, row, meta) {
                    if (data == null || data == "" || data =="-") {
                        return '-';
                    } else {
                        return data;
                    }
/*
                    var pattern = /^\d{4}-\d{2}-\d{2}$/;

                    if (data !== null && pattern.test(data)) {
                        var dateParts = data.split("-");
                        return dateParts[0] + "." + dateParts[1] + "." + dateParts[2];
                    } else {
                        return '-';
                    }
*/
                },
                orderable: false
            },{
                title: '사고날짜',
                width: "60px",
                data: 'acdnt_ocrn_dt',
                render: function (data, type, row, meta) {
                    if (data !== null) {
                        var date = new Date(data);

                        var year = date.getFullYear();
                        var month = date.getMonth() + 1;
                        var day = date.getDate();
                        // var hours = date.getHours();
                        // var minutes = date.getMinutes();
                        // var seconds = date.getSeconds();

                        // return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                        return `${year}.${month.toString().padStart(2, '0')}.${day.toString().padStart(2, '0')}`;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '사고지역',
                width: "60px",
                data: 'acdnt_spot',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '사고장소',
                width: "300px",
                data: 'acdnt_ocrn_plc',
                className: 'col20',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            },{
                title: '사고 내용',
                data: 'acdnt_cn',
                className: 'col30',
                render: function (data, type, row, meta) {
                    if (data !== null && data !== '') {
                        return data;
                    } else {
                        return '-';
                    }
                },
                orderable: false
            }
        ],
    });

    $("#pm-acc-dropdown").on("change", function() {
        var val = parseInt(this.value);
        var dropdown = document.querySelector('.dataTables_length select');

        if (dropdown instanceof HTMLSelectElement) {
            var changeEvent = new Event("change");
            if (val === 10) {
                dropdown.selectedIndex = 0;
            } else if (val === 20) {
                dropdown.selectedIndex = 1;
            } else if (val === 30) {
                dropdown.selectedIndex = 2;
            }
            dropdown.dispatchEvent(changeEvent);
        }
    });

    $(document).on('click', '#accTable tbody tr', function (e) {
        var rowData = accTable.row(this).data();

        if (!rowData) {
            return false;
        }
        if (rowData) {
            var xy = [rowData.acdnt_x, rowData.acdnt_y];

            NamuLayer.setCenter(xy);
            NamuLayer.setMarker(rowData.acdnt_y, rowData.acdnt_x, "red", "accident")

            $(".loc-modal").removeClass("custom-modal-none");
            $(".loc-modal").addClass("custom-modal-show");
        }
    })

    $("#resetBtn").on("click", () => {
        window.location.reload();
    });

    // 검색조건 : 검색버튼 클릭 이벤트
    $("#searchBtn").on("click", () => {
        submit();
    });

    $("#excelBtn").on("click", () => {
        var formatString = 'YYYY-MM-DD HH:mm:ss';
        var startSearchDt = $("input[name='startSearchDt']").val() ? moment($("input[name='startSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : 0;
        var endSearchDt = $("input[name='endSearchDt']").val() ? moment($("input[name='endSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : 0;
        var data = {
            "gender": $("#pm-acc-gender").val(),
            "accType": $("#pm-acc-type").val(),
            "location": $("#pm-acc-loc").val(),
            "pmKind": $("#pm-acc-kind").val(),
            "age": $("#pm-acc-age").val(),
            "company": $("#pm-acc-company").val(),
            "startSearchDt": startSearchDt,
            "endSearchDt": endSearchDt,
            "pagingYn": false
        };

        $.ajax({
            url: "/pm/accident/downloadExcel.json",
            type: "POST",
            data: data,
            dataType: "json",
            success: (res) => {
                var fileName = res.fileName
                $("#excelDownForm #excelFileName").val(fileName);
                $("#excelDownForm #excelFileDownName").val("PM_사고_조회");
                $("#excelDownForm").attr("action", "/common/downloadExcel.json");
                $('#excelDownForm').submit();
            }, error: function(error) {
                alert('서버 에러가 발생했습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
                console.log(error.code);
            }
        });
    });

    function submit() {
        var formatString = 'YYYY-MM-DD HH:mm:ss';

        gender = $("#pm-acc-gender").val();
        accType = $("#pm-acc-type").val();
        location = $("#pm-acc-loc").val();
        pmKind = $("#pm-acc-kind").val();
        age = $("#pm-acc-age").val();
        company = $("#pm-acc-company").val();
        startSearchDt = $("input[name='startSearchDt']").val() ? moment($("input[name='startSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "";
        endSearchDt = $("input[name='endSearchDt']").val() ? moment($("input[name='endSearchDt']").val(), 'YYYY-MM-DD').format(formatString) : "";

        if (moment(startSearchDt).isAfter(endSearchDt)) {
            alert("검색종료일은 검색시작일보다 이후 날짜를 입력해야 합니다.");
            $("input[name='startSearchDt']").focus();
            return false;
        }

        accTable.ajax.reload();
    }

    /*var calcAge = (birth) => {
        const today = new Date();
        const birthDate = new Date(birth);

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age > 200) {
            return '-';
        }

        return age;
    }*/
})
