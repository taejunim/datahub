<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<section class="content-header">
    <tg:menuInfoTag />
</section>

<section class="content">
    namu test
</section>

<script>
    $(document).ready(() => {
        console.dir("ready");
        $.ajax({
            url : "<c:url value='/datahub/pm/accounts.json' />",
            type : "GET",
            data : {},
            dataType : "json",
            success : function(res) {
                console.dir("success");
                console.dir(res);
                $('.content').append(res.data[0].name);
            }
        });
    });
</script>