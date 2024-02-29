<%--
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<script src="/energy/js/user/userRole.js"></script>

<section class="content-header">
    <tg:menuInfoTag />
</section>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-success">
                <div class="box-header">
                    <h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;검색조건</h3>
                </div>
                <div class="box-body">
                    <form name="searchForm">
                        <div class="row">
                            <div class="col-sm-6 col-xs-12" style="margin-bottom: 10px;">
                                <div class="input-group">
                                    <span class="input-group-addon">사용자 ID</span>
                                    <input type="text" id="userLoginIdLike" class="form-control searchWord" placeholder="사용자ID 입력" maxlength="30">
                                </div>
                            </div>
                            <div class="col-sm-6 col-xs-12">
                                <div class="input-group">
                                    <span class="input-group-addon">사용자명</span>
                                    <input type="text" id="userNmLike" class="form-control searchWord" placeholder="사용자명 입력" maxlength="30">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="box-footer">
                    <div class="btn-group pull-right">
                        <button type="button" class="btn btn-outline-primary" id="searchBtn">검색</button>
                        <button type="button" class="btn btn-outline-primary" id="resetBtn">리셋</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-body">
                    <table id="datatable" class="table table-bordered table-striped" style="width:100%; table-layout:fixed;"></table>
                </div>
                <div class="box-footer">
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade role-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>기업 권한 부여</h2>
                </div>
                <div class="modal-body">
                    <form id="roleForm" name="roleForm" class="form-horizontal form-label-left">
                        <input type="hidden" id="userId" name="userId" />
                        <input type="hidden" id="insttId" name="insttId" value="${insttUser.insttId}"/>
                        <input type="hidden" id="userSt" name="userSt" />
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">사용자 ID *</label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <input type="text" id="userLoginId" name="userLoginId" class="form-control col-md-7 col-xs-12" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">사용자명 *</label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <input type="text" id="userNm" name="userNm" class="form-control col-md-7 col-xs-12" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-3 col-sm-3 col-xs-12">기업 권한 *</label>
                            <div class="col-md-8 col-sm-8 col-xs-12">
                                <select id="roleAuth" name="roleAuth" class="form-control selectpicker">
                                    <option value="">권한 선택</option>
                                    <c:forEach var="role" items="${roleList}">
                                        <option value="${role.roleAuth}">${role.roleNm}</option>
                                    </c:forEach>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-primary" onclick="save()">저장</button>
                    <button type="button" class="btn btn-outline-primary" data-dismiss="modal">닫기</button>
                </div>
            </div>
        </div>
    </div>
</section>
--%>