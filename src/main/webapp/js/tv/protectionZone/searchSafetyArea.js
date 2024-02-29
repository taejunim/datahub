function searchSafetyArea() {

    //보호구역 상세 정보 초기화
    $('#zoneDetail-location').text('-');
    $('#zoneDetail-limitSpeed').text('-');
    $('#zoneDetail-limitSpeedChaneDate').text('-');

    $('.facility-table span').text('-');
    $.ajax({
        url: "/tv/common/safetyAreaInformation.json",
        type: "POST",
        data: {
            safetyAreaType : $("#safetyAreaType").val()
            , safetyAreaName : $("#safetyAreaName").val()
        },
        dataType: "json",
        beforeSend: function () { $('.progress-body').css('display','block') },
        success: function (res) {
            var listSize = 0;
            var areaList = [];
            var resultHtml = '';
            if(res.result.length > 0) {
                var result = res.result;

                for(var i = 0; i < result.length; i ++) {
                    var location = result[i].location.split(',').map(arg => parseFloat(arg));
                    areaList.push({x: location[0], y: location[1], address: (result[i].roadNmAddr + ', ' + result[i].name), safetyZoneType: result[i].safetyzonetype });
                    resultHtml += '<div class="zoneInfo-zoneList-list-item">';
                    resultHtml += '<input type="hidden" class="location" value="' + result[i].location + '"/>';
                    resultHtml += '<input type="hidden" class="safetyZoneType" value="' + result[i].safetyzonetype + '"/>';

                    var image = '/images/cms/common/disabled.png';

                    if(result[i].safetyzonetype.includes('노인')) image = '/images/cms/common/eld.png';
                    else if(result[i].safetyzonetype.includes('장애인')) image = '/images/cms/common/wheelChair.png';

                    resultHtml += '<img class="zoneInfo-zoneList-list-item-disabled" src="' + image + '">';
                    resultHtml += '<div class="zoneInfo-zoneList-list-item-text">';
                    resultHtml += '<p class="title">' + result[i].name + '</p>';
                    resultHtml += '<p class="address">' + result[i].roadNmAddr + '</p></div></div><div class="zoneInfo-zoneList-list-item-divisionLine"><img src="/images/cms/common/division_line_gray.png"></div>';
                }
                listSize = result.length;

                $('.noSafetyAreaData').hide();
            } else {
                $('.noSafetyAreaData').show();
            }
            $("#zoneList").html(resultHtml);

            listSize = listSize.toString();

            $(".totalZoneCount").text(listSize);
            if(typeof selectSafetyAreaLocation !== "undefined")
                searchSafetyAreaCallback(areaList);
            else {  //생활안전지도
                NamuLayer.map.removeLayer(NamuLayer.getLayer("searchLayer"));
                NamuLayer.deleteOverlay('searchLayerOverlay');
            }
        }, error: function(error) {
            alert('보호구역 조회에 실패하였습니다.\n해당 문제가 지속될 경우 관리자에게 문의하여 주십시오.');
            console.log(error);
        }
    }).done(function () {
        $('.progress-body').css('display','none');
        $("#list-modal").removeClass("modal-none");
        $("#list-modal").addClass("modal-show");
        $(".detailInfo_noData").text('보호구역을 선택해 주십시오.');
        $(".detailInfo_noData").css('display', 'block');
    });
}