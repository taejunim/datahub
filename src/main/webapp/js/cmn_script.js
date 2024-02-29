$(function () {
    //탭
    $('.tab li').click(function () {
        var activeTab = $(this).attr('data-tab');
        $(this).siblings().removeClass('current');
        $('#' + activeTab).siblings().removeClass('current');
        $(this).addClass('current');
        $('#' + activeTab).addClass('current');
    });
    $('.tab li a').click(function (e) {
        e.preventDefault();
    });
    //달력
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    });

    $(function () {
        $(".date-picker").datepicker().datepicker("setDate", new Date());
        $('.calendar-btn').click(function () {
            $(this).prev().focus();
        });
    });
    //파일첨부
    $('.formFile-realBtn').change(function () {
        var i = $(this).val();
        $('.upload').val(i);
    });
    $(function () {
        //팝업
        function popup() {
            $('[data-pop-btn]').click(function (e) {
                e.preventDefault();
                $('[data-pop-window="' + $(this).data('pop-btn') + '"]').fadeIn(200);
            });
        }

        function closePopup() {
            $('.pop-close').click(function () {
                $('.pop-bg').hide();
            });
        }

        $(function () {
            closePopup();
            popup();
        });

    });

});

// 모바일 메뉴
function mobileMenu() {

    var bg = $('.m-menu-bg');
    var closeBtn = $('.sub-open-close');
    var openBtn = $('.sub-open-btn');
    var wrap = $('.m-menu-con');
    var menu = $('.has-sub-off');

    var duration = 200;



    closeBtn.click(close);

    openBtn.click(open);

    menu.click(function (e) {
        e.preventDefault();
        $(this).next().slideToggle();
        $(this).toggleClass('has-sub-on');
        $(this).toggleClass('has-sub-off');
    });

    function close() {
        bg.fadeOut(duration);
        openEndClose('-100%');

    }

    function open() {
        bg.fadeIn(duration);
        openEndClose(0);
    }

    function openEndClose(right) {
        wrap.animate({ right: right }, duration);
    }
}

$(function () {
    mobileMenu();
})
$('body').on('scroll touchmove mousewheel', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
});

// 모바일 메뉴 클릭시 서브메뉴 보이게 하기
$(function(){
    $('.menuLeft').click(function(e){
        if($($(this).siblings().children()[0]).children().length > 0)
            e.preventDefault();
        $(".menuRight").removeClass("on");
        $(".menuLeft").removeClass("on");
        $(this).siblings(".menuRight").addClass("on");
        $(this).addClass("on");
    });
});

//팝업 닫기
$(function(){
    $('.layerPop-close, .cancel').click(function(){
        $(".modal").removeClass("modal-show");
        $(".modal").addClass("modal-none");
        $(".reset-on-close").val("");
    });
});