<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<script src="/energy/js/status/stats.js"></script>

<section class="content-header">
    <tg:menuInfoTag />
</section>

<section class="content">
    <div class="row">
        <div class="col-xs-12">
            <div class="box box-success">
                <div class="box-header">
                    <h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;검색조건</h3>
                </div>
                <div class="box-body">
                    <div class="row">
                        <div class="item-group col-sm-12 col-xs-12">
                            <input type="hidden" id="insttCdLike" value="BCNC_DEMAND"/>
                            <input type="hidden" id="btnId"/>
                            <div class="btn-group">
                                <button type="button" id="timeBtn" class="btn btn-outline-primary">시간대별</button>
                                <button type="button" id="dayBtn" class="btn btn-outline-primary">일별</button>
                                <button type="button" id="monthBtn" class="btn btn-outline-primary">월별</button>
                                <button type="button" id="yearBtn" class="btn btn-outline-primary">연도별</button>
                            </div>
                            <div id="yearSelect" class="selectBox">
                                <select id="yearLike" class="form-control searchList selectpicker">
                                </select>
                            </div>
                            <div id="monthSelect" class="selectBox">
                                <select id="monthLike" class="form-control searchList selectpicker">
                                </select>
                            </div>
                            <div id="chartReload">
                                <button type="button" id="chartBtn" class="btn btn-outline-primary">검색</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-xs-12">
            <div class="box box-primary">
                <div class="box-header">
                    <h3 id="box-title" class="box-title"></h3>
                </div>
                <div class="box-body" >
                    <div class="box-body chart-responsive">
                        <div id="line-chart" class="chart" style="width:100%; height:300px;"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
