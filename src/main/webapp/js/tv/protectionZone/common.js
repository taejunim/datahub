var startDate;
var endDate;
//모달로 넘겨줄 좌표
var selectSafetyAreaLocation = [];
var selectedCellId;
var selectedCoordinates;

$(document).ready(() => {
    $('.progress-body').css('display','block');

    $(".datepicker").datepicker({
        dateFormat:"yy-mm-dd",
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        yearSuffix: '년'
    });

    $('body').css('height', window.screen.height- (window.outerHeight - window.innerHeight) - 30);
    $('.content-wrapper').css('height', window.screen.height- (window.outerHeight - window.innerHeight) - 95);
    $('.main-sidebar').css('height', window.screen.height- (window.outerHeight - window.innerHeight) - 75);

    searchFacilityCompareInformation();

    //날짜 관련 select box option 추가
    makeDateSelectBoxOption();
    //날짜 관련 select box 및 datepicker 기본값 선택
    setDefaultDateValue();

    vw.MapControllerOption = {
        container : "vMap",
        mapMode :  'ws3d-map',
        basemapType : vw.ol3.BasemapType.GRAPHIC,
        controlDensity : vw.ol3.DensityType.BASIC,
        interactionDensity : vw.ol3.DensityType.BASIC,
        controlsAutoArrange : true,
        homePosition : vw.ol3.CameraPosition,
        initPosition : vw.ol3.CameraPosition
    };
    mapController = new vw.MapController(vw.MapControllerOption);
    proj4.defs("EPSG:5186", "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +units=m +no_defs");
    ol.proj.setProj4(proj4);

    vw.ws3dInitCallBack = function() {
        // 호출 내용 구현
        var defaultCoord  = new vw.CoordZ(126.4975067, 33.4893725, 100)
        var defaultCenter = new vw.CameraPosition(defaultCoord, new vw.Direction(0, -40, 0));
        mapController.Map3D.moveTo(defaultCenter);
        $('#3dButton').addClass('select');
        $('.progress-body').css('display','none');
    };

    for(var i=0; i < mapControllerObject.protectionZone.length; i ++) {
        var protectionZone = mapControllerObject.protectionZone[i];
        if(protectionZone.type === 'marker')  mapControllerObject.getMarkerData(protectionZone);
        else if(protectionZone.type === 'polygon')  mapControllerObject.getTwPolygonData(protectionZone);
        else mapControllerObject.getTwMultiData(protectionZone);
    }

    //날짜 관련 select box option 추가
    makeDateSelectBoxOption();

    //날짜 관련 select box 및 datepicker 기본값 선택
    setDefaultDateValue();

    $('#search-target').change(function() {
        setPeriodOption();
    });

    // 해당 셀렉트 박스에 change event binding 하기
    $("#dayOptionStartYear, #dayOptionStartMonth").change(function() {
        $("#dayOptionStartDay option:eq(0)").prop("selected", true);
        $("#dayOptionEndDay option:eq(0)").prop("selected", true);
        changeDay($("#dayOptionStartYear").val(), $("#dayOptionStartMonth").val());
    });

    $('#mapSearchButton').click(function(){
        searchSafetyArea();
    });

    // 보호구역 내 리스트 클릭
    $(document).on("click", ".zoneInfo-zoneList-list-item", function() {
        var xy = $($(this).children('.location')[0]).val().split(',');
        $(".zoneInfo-zoneList-list-item").removeClass('select');
        $(this).addClass('select');
        selectSafetyAreaLocation = xy;
        mapControllerObject.moveCenter(xy);
        searchFacilityInformation(xy);
        getCellId(xy);

        var address = $($($(this).children('div')[0]).children('.address')[0])[0].innerHTML + ', ' + $($($(this).children('div')[0]).children('.title')[0])[0].innerHTML;
        $('#zoneDetail-location').text(address);

        $('#speedChart').hide();
        $('#trafficChart').hide();
        $(".detailInfo_noData").text('조회조건 선택 후 조회하십시오.');
        $(".detailInfo_noData").css('display', 'block');

        clearChartData();

        setDefaultDateValue();  // '통행 일시' 날짜,시간 초기화 후 현재 날짜,시간으로 재설정
    });

    // 모든 정보 초기화 초기화 클릭
    $(document).on("click", "#resetButton", function () {

        selectSafetyAreaLocation = [];
        clearChartData();  // 차트정보 초기화 및 숨김

        setDefaultDateValue();               // 날짜 조건 초기화
        $('.facility-table span').text('-');
    });
});


/**
 * 보호구역 조회 callback
 * */
function searchSafetyAreaCallback(areaList) {
    clearChartData();     // 차트정보 초기화 및 숨김
    setDefaultDateValue();
    selectSafetyAreaLocation = [];
}

function set24Hour(startDate) {

    var date = new Date(startDate + " " + "00:00:00");
    date.setDate(date.getDate() + 1);

    return date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString())  + " " + "00:00";
}

function setNextDate(startDate, option) {

    var date = new Date(startDate);

    if(option === 'day') date.setDate(date.getDate() + 1);
    else if(option === 'month') date.setMonth(date.getMonth() + 1);

    return date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
}

function setNextDateNoHyphen(startDate, option) {

    var date = new Date(startDate);

    if(option === 'day') date.setDate(date.getDate() + 1);
    else if(option === 'month') date.setMonth(date.getMonth() + 1);

    return date.getFullYear() + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
}

function setPrevDate(endDate) {

    var date = new Date(endDate);
    date.setDate(date.getDate() - 1);
    return date.getFullYear() + "-" + ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1).toString() : "0" + (date.getMonth() + 1)) + "-" + (date.getDate() > 9 ? date.getDate().toString() : "0" + date.getDate().toString());
}

function searchFacilityInformation(xy){

    $.ajax({
        url: "/tv/common/selectAreaFacilityCount.json",
        type: "POST",
        data: {'latitude': xy[0], 'longitude': xy[1]},
        dataType: "json",
        beforeSend: function () { $('.progress-body').css('display','block') },
        success: function (res) {
            $('#cctvCount').text(res.cctvCount);
            $('#fenceCount').text(res.fenceCount);
            $('#crossWalkCount').text(res.crossWalkCount);
            $('#crossRoadCount').text(res.crossRoadCount);
            $('#childPickupZoneCount').text(res.childPickupZoneCount);
            $('#childWaySchoolCount').text(res.childWaySchoolCount);
            $('#oneWayRoadCount').text(res.oneWayRoadCount);
            $('#speedBumpCount').text(res.speedBumpCount);
        }, error: function(error) {
            console.log(error);
            $('.progress-body').css('display','none');
        }
    }).done(function () {
        $('.progress-body').css('display','none');
    });
}

function searchFacilityCompareInformation(){
    $.ajax({
        url: "/tv/common/getFacilityCompareData.json",
        type: "POST",
        data: {},
        dataType: "json",
        success: function (res) {
           var result = res.result;
           var html = '';
            $(".protectionZoneTotalCount").text(result.protectionZoneTotalCount);

           if(result.cctvCompare) {
               let cctvCompare = result.cctvCompare;
               html += '<th>CCTV</th>';
               html += ' <td><span>' + cctvCompare.totalcount + '</span>&nbsp;&nbsp;개</span>';
               html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + cctvCompare.maxzone + '" flow="down">' + cctvCompare.max + '</span>&nbsp;&nbsp;개</span>';
               html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + cctvCompare.minzone + '" flow="down">' + cctvCompare.min + '</span>&nbsp;&nbsp;개</span>';
               html += ' <td><span>' + cctvCompare.avg + '</span>&nbsp;&nbsp;개</span>';
               html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + cctvCompare.includezone + '" flow="down">' + cctvCompare.includezonecount + '</span>&nbsp;&nbsp;곳/';
               html += ' <span class="underLine" class="underLine" data-tooltip-text="' + cctvCompare.misszone + '" flow="down">' + cctvCompare.misszonecount + '</span>&nbsp;&nbsp;곳</span></td>';
           } else {
               html += '<th>CCTV</th><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;곳</span>/<span>-&nbsp;&nbsp;곳</span></td>';
           }
           $("#cctvCompareTr").html(html);
           html = '';

            if(result.crossWalkCompare) {
                let crossWalkCompare = result.crossWalkCompare;
                html += '<th>횡단보도</th>';
                html += ' <td><span>' + crossWalkCompare.totalcount + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + crossWalkCompare.maxzone + '" flow="down">' + crossWalkCompare.max + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + crossWalkCompare.minzone + '" flow="down">' + crossWalkCompare.min + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span>' + crossWalkCompare.avg + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + crossWalkCompare.includezone + '" flow="down">' + crossWalkCompare.includezonecount + '</span>&nbsp;&nbsp;곳/';
                html += ' <span class="underLine" class="underLine" data-tooltip-text="' + crossWalkCompare.misszone + '" flow="down">' + crossWalkCompare.misszonecount + '</span>&nbsp;&nbsp;곳</span></td>';
            } else {
                html += '<th>횡단보도</th><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;곳</span>/<span>-&nbsp;&nbsp;곳</span></td>';
            }
            $("#crossWalkCompareTr").html(html);
            html = '';

            if(result.childPickupZoneCompare) {
                let childPickupZoneCompare = result.childPickupZoneCompare;
                html += '<th>승/하차구역</th>';
                html += ' <td><span>' + childPickupZoneCompare.totalcount + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + childPickupZoneCompare.maxzone + '" flow="down">' + childPickupZoneCompare.max + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + childPickupZoneCompare.minzone + '" flow="down">' + childPickupZoneCompare.min + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span>' + childPickupZoneCompare.avg + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + childPickupZoneCompare.includezone + '" flow="down">' + childPickupZoneCompare.includezonecount + '</span>&nbsp;&nbsp;곳/';
                html += ' <span class="underLine" class="underLine" data-tooltip-text="' + childPickupZoneCompare.misszone + '" flow="down">' + childPickupZoneCompare.misszonecount + '</span>&nbsp;&nbsp;곳</span></td>';
            } else {
                html += '<th>승/하차구역</th><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;곳</span>/<span>-&nbsp;&nbsp;곳</span></td>';
            }
            $("#childPickupZoneCompareTr").html(html);
            html = '';

            if(result.oneWayRoadCompare) {
                let oneWayRoadCompare = result.oneWayRoadCompare;
                html += '<th>일방통행도로</th>';
                html += ' <td><span>' + oneWayRoadCompare.totalcount + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + oneWayRoadCompare.maxzone + '" flow="down">' + oneWayRoadCompare.max + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + oneWayRoadCompare.minzone + '" flow="down">' + oneWayRoadCompare.min + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span>' + oneWayRoadCompare.avg + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + oneWayRoadCompare.includezone + '" flow="down">' + oneWayRoadCompare.includezonecount + '</span>&nbsp;&nbsp;곳/';
                html += ' <span class="underLine" class="underLine" data-tooltip-text="' + oneWayRoadCompare.misszone + '" flow="down">' + oneWayRoadCompare.misszonecount + '</span>&nbsp;&nbsp;곳</span></td>';
            } else {
                html += '<th>일방통행도로</th><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;곳</span>/<span>-&nbsp;&nbsp;곳</span></td>';
            }
            $("#oneWayRoadCompareTr").html(html);
            html = '';

            if(result.fenceCompare) {
                let fenceCompare = result.fenceCompare;
                html += '<th>펜스</th>';
                html += ' <td><span>' + fenceCompare.totalcount + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + fenceCompare.maxzone + '" flow="up">' + fenceCompare.max + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + fenceCompare.minzone + '" flow="up">' + fenceCompare.min + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span>' + fenceCompare.avg + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + fenceCompare.includezone + '" flow="up">' + fenceCompare.includezonecount + '</span>&nbsp;&nbsp;곳/';
                html += ' <span class="underLine" class="underLine" data-tooltip-text="' + fenceCompare.misszone + '" flow="up">' + fenceCompare.misszonecount + '</span>&nbsp;&nbsp;곳</span></td>';
            } else {
                html += '<th>펜스</th><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;곳</span>/<span>-&nbsp;&nbsp;곳</span></td>';
            }
            $("#fenceCompareTr").html(html);
            html = '';

            if(result.crossRoadCompare) {
                let crossRoadCompare = result.crossRoadCompare;
                html += '<th>교차로</th>';
                html += ' <td><span>' + crossRoadCompare.totalcount + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + crossRoadCompare.maxzone + '" flow="up">' + crossRoadCompare.max + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + crossRoadCompare.minzone + '" flow="up">' + crossRoadCompare.min + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span>' + crossRoadCompare.avg + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + crossRoadCompare.includezone + '" flow="up">' + crossRoadCompare.includezonecount + '</span>&nbsp;&nbsp;곳/';
                html += ' <span class="underLine" class="underLine" data-tooltip-text="' + crossRoadCompare.misszone + '" flow="up">' + crossRoadCompare.misszonecount + '</span>&nbsp;&nbsp;곳</span></td>';
            } else {
                html += '<th>교차로</th><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;곳</span>/<span>-&nbsp;&nbsp;곳</span></td>';
            }
            $("#crossRoadCompareTr").html(html);
            html = '';

            if(result.childWaySchoolCompare) {
                let childWaySchoolCompare = result.childWaySchoolCompare;
                html += '<th>통학로</th>';
                html += ' <td><span>' + childWaySchoolCompare.totalcount + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + childWaySchoolCompare.maxzone + '" flow="up">' + childWaySchoolCompare.max + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + childWaySchoolCompare.minzone + '" flow="up">' + childWaySchoolCompare.min + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span>' + childWaySchoolCompare.avg + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + childWaySchoolCompare.includezone + '" flow="up">' + childWaySchoolCompare.includezonecount + '</span>&nbsp;&nbsp;곳/';
                html += ' <span class="underLine" class="underLine" data-tooltip-text="' + childWaySchoolCompare.misszone + '" flow="up">' + childWaySchoolCompare.misszonecount + '</span>&nbsp;&nbsp;곳</span></td>';
            } else {
                html += '<th>통학로</th><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;곳</span>/<span>-&nbsp;&nbsp;곳</span></td>';
            }
            $("#childWaySchoolCompareTr").html(html);
            html = '';

            if(result.speedBumpCompare) {
                let speedBumpCompare = result.speedBumpCompare;
                html += '<th>과속방지턱</th>';
                html += ' <td><span>' + speedBumpCompare.totalcount + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + speedBumpCompare.maxzone + '" flow="up">' + speedBumpCompare.max + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + speedBumpCompare.minzone + '" flow="up">' + speedBumpCompare.min + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span>' + speedBumpCompare.avg + '</span>&nbsp;&nbsp;개</span>';
                html += ' <td><span class="underLine" class="underLine" data-tooltip-text="' + speedBumpCompare.includezone + '" flow="up">' + speedBumpCompare.includezonecount + '</span>&nbsp;&nbsp;곳/';
                html += ' <span class="underLine" class="underLine" data-tooltip-text="' + speedBumpCompare.misszone + '" flow="up">' + speedBumpCompare.misszonecount + '</span>&nbsp;&nbsp;곳</span></td>';
            } else {
                html += '<th>과속방지턱</th><td><span>-&nbsp;&nbsp;개</span></td><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;개</span><td><span>-&nbsp;&nbsp;곳</span>/<span>-&nbsp;&nbsp;곳</span></td>';
            }
            $("#speedBumpCompareTr").html(html);

        }, error: function(error) {
            console.log(error);
        }
    });
}

function getCellId(xy) {

    let tempCoordinates = xy[0] + " " + xy[1];

    $.ajax({
        url: "/tv/common/getCellId.json",
        type: "POST",
        data: {selectedCoordinates: tempCoordinates},
        dataType: "json",
        beforeSend: function () { $('.progress-body').css('display','block') },
        success: function (res) {
            selectedCellId = res.cellId;
            selectedCoordinates = tempCoordinates;
        },
        error: function(error) {
            console.log(error);
            $('.progress-body').css('display','none');
        }
    }).done(function () {
        $('.progress-body').css('display','none');
    });
}

function setPeriodOption() {
    var selectVal = $('#search-target option:selected').val();

    $('.detailInfo-searchCondition-Option').css('display','none');

    switch (selectVal) {
        case 'day'  :
            $('#detailInfo-searchCondition-dayOption').css('display','contents');
            break;
        case 'month' :
            $('#detailInfo-searchCondition-monthOption').css('display','contents');
            break;
        case 'year' :
            $('#detailInfo-searchCondition-yearOption').css('display','contents');
            break;
        default : break;
    }
}

//datepicker 제외 날짜 관련 select box 만들기
function makeDateSelectBoxOption() {
    var minYear = 2021;
    var date = new Date();
    date.setDate(date.getDate() + 1);

    var yearHtml = '';
    for(var i = 0; i <= (date.getFullYear() - minYear); i ++ ) {
        yearHtml += '<option value="' + (date.getFullYear() - i) + '">' + (date.getFullYear() - i) + '</option>';
    }

    //연 select box
    $(".selectYear").html(yearHtml);

    var monthHtml = '';
    for(var j = 1; j <= 12; j ++ ) {
        monthHtml += '<option value="' + ((j < 10) ? '0' + j : j) + '">' + ((j < 10) ? '0' + j : j)  + '</option>';
    }

    //월 select box
    $(".selectMonth").html(monthHtml);

    var dayHtml = '';
    for(var k = 1; k <= 31; k ++ ) {
        dayHtml += '<option value="' + ((k < 10) ? '0' + k : k) + '">' + ((k < 10) ? '0' + k : k)  + '</option>';
    }

    //일 select box
    $(".selectDay").html(dayHtml);
}

//datepicker 및 날짜 관련 selectbox 값 초기화
function setDefaultDateValue(){

    let currentDate = new Date();

    let startDateString = currentDate.getFullYear() + "-" + ((currentDate.getMonth() + 1) > 9 ? (currentDate.getMonth() + 1).toString() : "0" + (currentDate.getMonth() + 1)) + "-" + (currentDate.getDate() > 9 ? currentDate.getDate().toString() : "0" + currentDate.getDate().toString());

    $("#dayOptionStartDate").val(startDateString);
    $("#dayOptionEndDate").val(startDateString);

    $(".selectMonth").val((currentDate.getMonth() + 1) > 9 ? (currentDate.getMonth() + 1).toString() : "0" + (currentDate.getMonth() + 1));
    $(".selectYear").val(currentDate.getFullYear());

    $("#search-target").val("day");
    $("#dateConditionOption").text($('#search-target option:selected').text());

    //선택한 라디오 option에 따라 select-box display : none;
    setPeriodOption();
}
//선택한 달에 따라 날짜 select box 변경
function changeDay(year, month) {

    var lastDate = new Date(year, month, 0);
    var last     = lastDate.getDate();

    $("#dayOptionStartDay option").show();
    $("#dayOptionEndDay option").show();

    $("#dayOptionStartDay option:eq(" + (last - 1) + ")").nextAll().hide();
    $("#dayOptionEndDay option:eq(" + (last - 1) + ")").nextAll().hide();
}

// '일 별' 클릭 후 일 변경 시 항상 시작일은 끝나는 일 이하, 끝나는 일은 시작일 이상
$(document).on("change", ".selectDay", function () {
    var endDate = new Date($("#dayOptionEndDate").val());
    var startDate = new Date( $("#dayOptionStartDate").val());

   if(($("#dayOptionStartDate").val() > $("#dayOptionEndDate").val()) || ((endDate - startDate) / (1000 * 60 * 60 * 24) > 7)){
       if($(this)[0].id === 'dayOptionStartDate')
           return $("#dayOptionEndDate").val($("#dayOptionStartDate").val());
       else if($(this)[0].id === 'dayOptionEndDate')
           return $("#dayOptionStartDate").val($("#dayOptionEndDate").val());
   }
})

// '월 별' 클릭 후 월 변경 시 항상 시작월은 끝나는 월 이하, 끝나는 월은 시작월 이상
$(document).on("change", ".selectMonth", function () {
   if($("#monthOptionStartMonth").val() > $("#monthOptionEndMonth").val()){
       if($(this)[0].id === 'monthOptionStartMonth')
           return $("#monthOptionEndMonth").val($("#monthOptionStartMonth").val());
       else if($(this)[0].id === 'monthOptionEndMonth')
           return $("#monthOptionStartMonth").val($("#monthOptionEndMonth").val());
   }
})

// '연 별' 클릭 후 연도 변경 시 항상 시작연도는 끝나는 연도 이하, 끝나는 연도는 시작연도 이상
$(document).on("change", ".selectYear", function () {
   if($("#yearOptionStartYear").val() > $("#yearOptionEndYear").val()){
       if($(this)[0].id === 'yearOptionStartYear')
           return $("#yearOptionEndYear").val($("#yearOptionStartYear").val());
       else if($(this)[0].id === 'yearOptionEndYear')
           return $("#yearOptionStartYear").val($("#yearOptionEndYear").val());
   }
});

//맵 모드 설정
function setMapMode(mapMode) {
    $('.progress-body').css('display','block');
    if(mapMode !== mapController.getMode()) {
        mapControllerObject.setMapMode(mapMode);

    } else {
        mapControllerObject.hideMapControllerObject(mapMode);
    }
}