<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<article class="contentsBody">
	<div class="contentsBody-inner">
		<div class="contentsHd clear-fix">
			<tg:menuInfoTag />
		</div>
		<div class="search-box searchCondition loginData clear-fix">
			<div class="formItem">
				<label class="form-tit">코드분류</label>
				<select class="select-sm mr5" id="cdSelect" name="cdSelect">
					<c:forEach var="cd" items="${cdList}">
						<option value="${cd.cdId}">${cd.cdNm} [${cd.cdId}]</option>
					</c:forEach>
				</select>
			</div>
			<div class="btn-group onlySearch">
				<button class="cmnBtn register" id="registerBtn">등록</button>
				<button class="cmnBtn list" id="modifyBtn">수정</button>
			</div>
		</div>
		<div class="clear-fix">
			<div class="floatLt">
				<p class="listTotal">총<span id="codeList-total">0</span>개</p>
			</div>
			<div class="floatRt">
				<select name="codeList-dropdown" id="codeList-dropdown" class="select-xs">
					<option value="10">10</option>
					<option value="20">20</option>
					<option value="30">30</option>
				</select>
				<span class="form-name">개씩 보기</span>
			</div>
		</div>
		<div class="tableWrap">
			<table class="listTable" id="datatableDetail"></table>
			<button class="cmnBtn register" style="float: right; margin:8px 3px;" onclick="cdDtlModal(0)">등록</button>
		</div>
	</div>

	<%--<section class="content">
		<div class="row">
			<div class="col-xs-12">
				<div class="box box-success">
					<div class="box-header">
						<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;코드 분류</h3>
					</div>
					<div class="box-body">
						<div class="row">
							<div class="col-xs-12">
								<div class="form-group">
									<div class="col-sm-6 col-xs-7" style="margin-bottom: 10px;">
									<select class="form-control selectpicker" id="cdSelect" name="cdSelect">
										<c:forEach var="cd" items="${cdList}">
											<option value="${cd.cdId}">${cd.cdNm} [${cd.cdId}]</option>
										</c:forEach>
									</select>
								</div>
									<div class="col-sm-6 col-xs-5">
										<button type="button" class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="등록" onclick="cdModal(0)" ><i class="material-icons">playlist_add</i></button>
										<button type="button" class="btn btn-sm btn-outline-primary" data-toggle="tooltip" title="수정" onclick="cdModal(1)" ><i class="material-icons">create</i></button>
									</div>
								</div>
							</div>
						</div>
						<div class="row">
							<div class="col-xs-12">
								<input type="hidden" id="cdClsSelect" name="cdClsSelect" value="cms">
								<input type="hidden" id="cdClsSelectId" name="cdClsSelectId" value="cms">
								<input type="hidden" id="cdClsSelectNm" name="cdClsSelectNm"  value="cms">
								<input type="hidden" id="cdClsSelectUseSt" name="cdClsSelectUseSt">
								<textarea id="cdClsSelectDesc" class="form-control" readonly>
							</textarea>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="col-xs-6">
				<div class="box box-primary">
					<div class="box-header">
						<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;코드</h3>
					</div>
					<div class="box-body">
						<table id="datatable" class="table table-bordered table-striped" style="width:98%; table-layout:fixed;"></table>
					</div>
					<div class="box-footer">
						<div class="box-tools pull-right">
							<button type="button" class="btn btn-outline-primary pull-right" onclick="cdModal(0)">등록</button>
						</div>
					</div>
				</div>
			</div>

			<div class="col-xs-12">
				<div class="box box-primary">
					<div class="box-header">
						<h3 class="box-title"><i class='material-icons' style='font-size:16px;'>play_arrow</i>&nbsp;&nbsp;상세 코드</h3>
					</div>
					<div class="box-body">
						<table id="datatableDetail" class="table table-bordered table-striped" style="width:98%; table-layout:fixed;"></table>
					</div>
					<div class="box-footer">
						<div class="box-tools pull-right">
							<button type="button" class="btn btn-outline-primary pull-right" onclick="cdDtlModal(0)">등록</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>--%>
</article>

<div class="custom-modal reg-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop3 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>코드등록</strong>
			<button class="layerPop-close reg-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="clear-fix">
				<form id="cdForm" name="cdForm">
					<input type="hidden" name="saveUrl" id="saveUrl" value="" />
					<input type="hidden" name="cdClsId" id="cdClsId1" value="cms" />
					<input type="hidden" name="cdClsNm" id="cdClsNm1" value="cms" />
					<table class="pop-table mb20">
						<tbody>
							<tr>
								<th>코드 ID*</th>
								<td colspan="2"><input type="text" class="inputTxt-full mr5" name="cdId" id="cdId" data-name="코드ID를" placeholder="코드 ID 입력"></td>
							</tr>
							<tr>
								<th>코드명 *</th>
								<td colspan="2"><input type="text" class="inputTxt-full mr5" name="cdNm" id="cdNm" data-name="코드명을" placeholder="코드명을 입력"></td>
							</tr>
							<tr>
								<th>코드설명 *</th>
								<td colspan="2"><input type="text" class="inputTxt-full mr5" id="cdDesc" name="cdDesc" placeholder="코드설명을 입력"></td>
							</tr>
							<tr>
								<th>사용여부 *</th>
								<td colspan="2">
									<select name="recSt" id="cdUseSt" class="select-full mr5">
										<option value="Y" selected>사용</option>
										<option value="N">미사용</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn register mr5" onclick="cdInsert()">저장</button>
			<button class="cmnBtn cancel mr5 reg-modal-close">닫기</button>
		</div>
	</div>
</div>

<div class="custom-modal mod-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop7 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>코드 수정</strong>
			<button class="layerPop-close mod-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="clear-fix">
				<form id="cdMForm" name="cdMForm">
					<input type="hidden" name="saveUrl2" id="saveUrl2" value="" />
					<input type="hidden" name="cdClsId2" id="cdClsId2" value="cms" />
					<input type="hidden" name="cdClsNm2" id="cdClsNm2" value="cms" />
					<table class="pop-table mb20">
						<tbody>
						<tr>
							<th>코드 ID*</th>
							<td colspan="2"><input type="text" class="inputTxt-full mr5" name="cdId2" id="cdId2"></td>
						</tr>
						<tr>
							<th>코드명 *</th>
							<td colspan="2"><input type="text" class="inputTxt-full mr5" name="cdNm2" id="cdNm2"></td>
						</tr>
						<tr>
							<th>코드설명 *</th>
							<td colspan="2"><input type="text" class="inputTxt-full mr5" id="cdDesc2" name="cdDesc2"></td>
						</tr>
						<tr>
							<th>사용여부 *</th>
							<td colspan="2">
								<select name="cdUseSt2" id="cdUseSt2" class="select-full mr5">
									<option value="Y">사용</option>
									<option value="N">미사용</option>
								</select>
							</td>
						</tr>
						</tbody>
					</table>
				</form>
			</div>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn register mr5" onclick="cdInsert2()">저장</button>
			<button class="cmnBtn cancel mr5 mod-modal-close">닫기</button>
		</div>
	</div>
</div>

<div class="custom-modal cdDtl-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop5 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>상세코드 등록</strong>
			<button class="layerPop-close cdDtl-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="clear-fix">
				<table class="pop-table mb20">
					<tbody>
					<tr>
						<th>코드명</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5"></td>
					</tr>
					<tr>
						<th>상세코드ID *</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5"></td>
					</tr>
					<tr>
						<th>상세코드명 *</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5"></td>
					</tr>
					<tr>
						<th>라벨 *</th>
						<td colspan="2"><div class="label-box">
							<label>
								<input type="radio" class="label-rdo" name="rdo1" checked="">
								<span class="label-name1"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name2"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name3"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name4"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name5"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name6"></span>
							</label>
						</div>
						</td>
					</tr>
					<tr>
						<th>상세코드 설명</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5" placeholder="상세코드 설명 입력"></td>
					</tr>
					<tr>
						<th>상세코드 순서</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5" placeholder="상세코드 순서 입력"></td>
					</tr>
					<tr>
						<th>사용여부 *</th>
						<td colspan="2">
							<select name="" class="select-full mr5">
								<option value="사용">사용</option>
								<option value="미사용">미사용</option>
							</select>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn register mr5">저장</button>
			<button class="cmnBtn cancel mr5 cdDtl-modal-close">닫기</button>
		</div>
	</div>
</div>

<div class="custom-modal cdDtl-mod-modal" tabindex="-1" aria-hidden="true">
	<div class="layerPop5 permission" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>상세코드 수정</strong>
			<button class="layerPop-close cdDtl-mod-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<div class="clear-fix">
				<table class="pop-table mb20">
					<tbody>
					<tr>
						<th>코드명</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5"></td>
					</tr>
					<tr>
						<th>상세코드ID *</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5"></td>
					</tr>
					<tr>
						<th>상세코드명 *</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5"></td>
					</tr>
					<tr>
						<th>라벨 *</th>
						<td colspan="2"><div class="label-box">
							<label>
								<input type="radio" class="label-rdo" name="rdo1" checked="">
								<span class="label-name1"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name2"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name3"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name4"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name5"></span>
							</label>
							<label>
								<input type="radio" class="label-rdo" name="rdo1">
								<span class="label-name6"></span>
							</label>
						</div>
						</td>
					</tr>
					<tr>
						<th>상세코드 설명</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5" placeholder="상세코드 설명 입력"></td>
					</tr>
					<tr>
						<th>상세코드 순서</th>
						<td colspan="2"><input type="text" class="inputTxt-full mr5" placeholder="상세코드 순서 입력"></td>
					</tr>
					<tr>
						<th>사용여부 *</th>
						<td colspan="2">
							<select name="" id="labelForSelect1" class="select-full mr5">
								<option value="사용">사용</option>
								<option value="미사용">미사용</option>
							</select>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn register mr5">저장</button>
			<button class="cmnBtn cancel mr5 cdDtl-mod-modal-close">닫기</button>
		</div>
	</div>
</div>

<!-- 코드분류 모달 -->
<%--<div class="modal fade cdCls-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h2>코드 분류</h2>
			</div>
			<div class="modal-body">
				<form id="cdClsForm" name="cdClsForm" class="form-horizontal form-label-left">
					<input type="hidden" name="saveUrl" id="saveUrlClass" value="" />
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">코드분류ID <span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<input type="text" name="cdClsId" id="cdClsId" data-name="코드분류ID를" class="form-control col-md-7 col-xs-12 req" placeholder="코드분류ID를 입력">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">코드분류명 <span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<input type="text" name="cdClsNm" id="cdClsNm" data-name="코드분류 명이" class="form-control col-md-7 col-xs-12 req" placeholder="코드분류명을 입력">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">코드분류 설명 </label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<textarea name="cdClsDesc" id="cdClsDesc" data-name="코드분류 설명이" class="form-control col-md-7 col-xs-12" placeholder="코드분류 설명을 입력"></textarea>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">사용여부 <span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<select id="cdClsUseSt" name="recSt" class="form-control selectpicker">
								<option value="Y">사용</option>
								<option value="N">사용안함</option>
							</select>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-primary" onclick="cdClsInsert ()">저장</button>
				<button type="button" class="btn btn-outline-primary" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>--%>

<!-- 코드 모달 -->
<%--<div class="modal fade cd-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h2>코드</h2>
			</div>
			<div class="modal-body">
				<form id="cdForm" name="cdForm" class="form-horizontal form-label-left">
					<input type="hidden" name="saveUrl" id="saveUrl" value="" />
					<input type="hidden" name="cdClsId" id="cdClsId1" value="cms" />
					<input type="hidden" name="cdClsNm" id="cdClsNm1" value="cms" />
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">코드ID <span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<input type="text" name="cdId" id="cdId" data-name="코드ID를" class="form-control col-md-7 col-xs-12 req" placeholder="코드ID를 입력">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">코드명 <span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<input type="text" name="cdNm" id="cdNm" data-name="코드명을" class="form-control col-md-7 col-xs-12 req" placeholder="코드명를 입력">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">코드설명 </label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<textarea name="cdDesc" id="cdDesc" class="form-control col-md-7 col-xs-12" placeholder="코드설명을 입력"></textarea>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">사용여부 <span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<select id="cdUseSt" name="recSt" class="form-control selectpicker">
								<option value="Y" selected>사용</option>
								<option value="N">사용안함</option>
							</select>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-primary" onclick="cdInsert()">저장</button>
				<button type="button" id="deleteBtn" class="btn btn-outline-primary" onclick="cdDelete()">삭제</button>
				<button type="button" class="btn btn-outline-primary" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>--%>

<!-- 상세코드 모달 -->
<%--<div class="modal fade cdDtl-modal" data-keyboard="false" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<h2>상세코드</h2>
			</div>
			<div class="modal-body">
				<form id="cdDtlForm" name="cdDtlForm" class="form-horizontal form-label-left">
					<input type="hidden" name="saveUrl" id="saveUrlDetail" value="" />
					<input type="hidden" name="cdId" id="cdId1">
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">코드명 </label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<input type="text" name="cdNm" id="cdNm1" data-name="코드명이" class="form-control col-md-7 col-xs-12 req" readOnly disabled>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">상세코드ID<span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<input type="text" name="cdDtlId" id="cdDtlId" data-name="상세코드ID를" class="form-control col-md-7 col-xs-12 req" placeholder="상세코드명ID를 입력">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">상세코드명 <span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<input type="text" name="cdDtlNm" id="cdDtlNm" data-name="상세코드명을" class="form-control col-md-7 col-xs-12 req" placeholder="상세코드명을 입력">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">라벨<span class="required">*</span></label>
							<div class="col-md-7 col-sm-7 col-xs-12">
								<label>
	                 				<input type="radio" name="cdDtlLabel" value="default" checked >
	                 				<span class="label label-default">&nbsp; &nbsp; &nbsp; &nbsp;</span>
	               				</label>
	               				<label>
	               					<input type="radio" name="cdDtlLabel" value="primary">
	               					<span class="label label-primary">&nbsp; &nbsp; &nbsp; &nbsp;</span>
	               				</label>
	               				<label>
	               					<input type="radio" name="cdDtlLabel" value="success">
	               					<span class="label label-success">&nbsp; &nbsp; &nbsp; &nbsp;</span>
	               				</label>
	               				<label>
	               					<input type="radio" name="cdDtlLabel" value="info" >
	               					<span class="label label-info">&nbsp; &nbsp; &nbsp; &nbsp;</span>
	               				</label>
	               				<label>
	               					<input type="radio" name="cdDtlLabel" value="warning">
	               					<span class="label label-warning">&nbsp; &nbsp; &nbsp; &nbsp;</span>
	               				</label>
	               				<label>
	               					<input type="radio" name="cdDtlLabel" value="danger" >
	               					<span class="label label-danger">&nbsp; &nbsp; &nbsp; &nbsp;</span>
	               				</label>
							</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">상세코드 설명 </label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<textarea name="cdDtlDesc" id="cdDtlDesc" class="form-control col-md-7 col-xs-12" placeholder="상세코드 설명을 입력"></textarea>
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">상세코드 순서</label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<input type="text" name="cdDtlOrd" id="cdDtlOrd" class="form-control col-md-7 col-xs-12" placeholder="상세코드 순서를 입력">
						</div>
					</div>
					<div class="form-group">
						<label class="control-label col-md-3 col-sm-3 col-xs-12">사용여부 <span class="required">*</span></label>
						<div class="col-md-7 col-sm-7 col-xs-12">
							<select id="cdDtlUseSt" name="recSt" class="form-control selectpicker">
								<option value="Y" selected>사용</option>
								<option value="N">사용안함</option>
							</select>
						</div>
					</div>
				</form>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-primary" onclick="cdDtlInsert ()">저장</button>
				<button type="button" class="btn btn-outline-primary" data-dismiss="modal">닫기</button>
			</div>
		</div>
	</div>
</div>--%>

<script>

	var datatableDetail;
	
	$(document).ready(function(){
		
		$("#cdDtlOrd").numeric ({
			allowSpace: false
		});
		
		//모달창이동
		$('.modal-content').draggable({
			handle: ".modal-header"
		});
		
		$('#all').attr("checked", true);
		$("#cdClsSelectDesc").hide();
		
		datatableDetail = $("#datatableDetail").DataTable({
			"searching" : false
			,"paging": true
			,"bPaginate": true
			,"responsive": true
			,"language": {
				lengthMenu: "_MENU_",
				info: ''
			}
			,"ajax" : {
				"url" : "<c:url value='/system/cdDtl/list.json' />"
				,"method" : "post"
				,"data" : function(d) {
					d.cdId = $("#cdSelect").val();;
				}
				,"dataSrc": function (data) {
					$("#codeList-total").text(data.recordsTotal);
					return data.data;
				}
				,"error" : function(xhr, status, err) {
					dataTablesError(xhr);
				}
			}
			,"processing": true
			,"serverSide": true
			,"order" : [[0, 'desc']]
			,"columns": [
				{ "name" : "CD_DTL_ID", "title" : "상세 코드", "data" : "cdDtlId", "className" : "dt-head-center dt-body-left"},
				{ "name" : "CD_DTL_NM", "title" : "상세 코드명",
					"render" : function (data, type, row) {
						return "<span class='label label-"+row["cdDtlLabel"]+"'>"+row["cdDtlNm"]+"</span>";
					}, "className" : "dt-head-center dt-body-center", "orderable" : false},
				{ "name" : "CD_DTL_DESC", "title" : "상세 코드 설명", "data" : "cdDtlDesc", "className" : "dt-head-center dt-body-left", "orderable": false },
				{ "name" : "CD_DTL_ORD", "title" : "순서", "data" : "cdDtlOrd", "className" : "dt-head-center dt-body-left", "orderable" : false},
				{ "name" : "REC_ST", "title" : "사용여부", "data" : "recSt", "className" : "dt-head-center dt-body-left",
					"render" : function (data, type, row) {
						if(data=="Y"){
							return "사용"
						} else if(data=="N"){
							return "사용안함"
						}
					}, "searchable": true, "orderable": false },
				{ "render" :
					function (data, type, row) {
						var html = "";
						html += "<button type='button' class='cellFormBtn cellFormBtn5' data-toggle='tooltip' title='수정' onclick='cdDtlModal(\""+row["cdDtlId"]+"\", \""+row["cdDtlNm"]+"\", \""+(row["cdDtlDesc"] == null ? '' : row["cdDtlDesc"])+"\", \""+row["cdDtlOrd"]+"\" ,\""+row["recSt"]+"\")'>수정</button>&nbsp;";
						html += "<button type='button' class='cellFormBtn cellFormBtn4' data-toggle='tooltip' title='삭제' onclick='cdDtlDelte(\""+row["cdDtlId"]+"\", \""+row["cdId"]+"\")'>삭제</button>&nbsp;";
						return html;
					}, "title":"기능", "className": "dt-head-center dt-body-center", "orderable" : false
				}
			]
			,"scrollX": "100%"
			,"columnDefs": [
				{"targets": [0], width: "100px"}
				,{"targets": [1], width: "100px"}
				,{"targets": [2], width: "150px"}
				,{"targets": [3], width: "50px"}
				,{"targets": [4], width: "100px"}
				,{"targets": [5], width: "100px"}
			]
			,"lengthMenu": [[10, 20, 30], [10, 20, 30]]
			,"initComplete": function(settings, json) {
				this.api().page('last').draw('page');
				$("#datatableDetail_length").css("display", "none");
			}
			,"drawCallback": function (settings) {
				$("#datatableDetail_paginate").addClass("pagination");
				$("#datatableDetail_paginate .active").addClass("on");
			}
		});

		$("#cdSelect").change(function() {//코드 분류 값이 바뀔 때
			// datatable.ajax.reload(); //데이터 테이블 리로드
			datatableDetail.ajax.reload(); //데이터 테이블 리로드
		});

		$("#registerBtn").click(function() {
			$('.reg-modal').removeClass("custom-modal-none");
			$('.reg-modal').addClass("custom-modal-show");
			$("#saveUrl").val("<c:url value='/system/cd/insert.json' />");
		});

		$("#modifyBtn").click(function() {
			$.ajax({
				url : "/system/cd/select.json",
				type : "POST",
				data : { "cdClsId" : $("#cdClsSelectId").val(), "cdId" : $("#cdSelect").val() },
				dataType : "json" ,
				success : function(res) {
					if ("success" == res.result) {
						console.log(res.data);
						$("#cdMForm #saveUrl2").val("<c:url value='/system/cd/update.json' />");
						$("#cdMForm #cdId2").attr('readOnly', true);
						$("#cdMForm #cdId2").val(res.data.cdId);
						$("#cdMForm #cdNm2").val(res.data.cdNm);
						$("#cdMForm #cdDesc2").val(res.data.cdDesc);
						$("#cdMForm #cdUseSt2").val(res.data.recSt);
						$('.mod-modal').removeClass("custom-modal-none");
						$('.mod-modal').addClass("custom-modal-show");
					}else if("duplicate" == res.result){
						alert(res.message);
					}else {
						alert(res.message);
					}
				}
			});
		});

		$("#codeList-dropdown").on("change", function() {
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

		$(".reg-modal-close").click(function (e) {
			$(".reg-modal").removeClass("custom-modal-show");
			$(".reg-modal").addClass("custom-modal-none");
		})

		$(".mod-modal-close").click(function (e) {
			$(".mod-modal").removeClass("custom-modal-show");
			$(".mod-modal").addClass("custom-modal-none");
		})

		$(".cdDtl-modal-close").click(function (e) {
			$(".cdDtl-modal").removeClass("custom-modal-show");
			$(".cdDtl-modal").addClass("custom-modal-none");
		})

		$(".cdDtl-mod-modal-close").click(function (e) {
			$(".cdDtl-mod-modal").removeClass("custom-modal-show");
			$(".cdDtl-mod-modal").addClass("custom-modal-none");
		})

		$('input:radio[name="checkUseSt"]').click(function(){
			cdClsList($(this).val());
		});
		
	});
	
	function cdClsModal(id){//코드 분류 모달 오픈
		
		if (id == 0){
			$("#saveUrlClass").val("<c:url value='/system/cdCls/insert.json' />");
			$('#cdClsId').val(""); $("#cdClsId").removeAttr('readOnly');
			$('#cdClsNm').val("");
			$('#cdClsDesc').val("");
		} else {
			
			if(isEmptyString ($("#cdClsSelect").val())){
				alert("코드 분류를 선택하여 주십시오.");
				return;
			}
			
			$("#saveUrlClass").val("<c:url value='/system/cdCls/update.json' />");
			$('#cdClsId').val($("#cdClsSelectId").val()); $("#cdClsId").attr('readOnly', true); $("#cdClsId").attr('disabled', true);
			$('#cdClsNm').val($("#cdClsSelectNm").val());
			//$('#cdClsDesc').val($("#cdClsSelectDesc").text());
			$('#cdClsDesc').val($("#cdClsSelectDesc").val());
			if($("#cdClsSelectUseSt").val() == "Y"){
				$("#cdClsUseSt").val("Y");
			}else{
				$("#cdClsUseSt").val("N");
			}
		}
		$('.cdCls-modal').modal("show");
	}	
	
	function cdModal(id, name, desc, recSt){ //코드 모달 오픈
		if(isEmptyString ($("#cdClsSelect").val())){
			alert("코드 분류를 선택하여 주십시오.");
			return;
		}
		$("#cdClsId1").val($("#cdClsSelectId").val());
		$("#cdClsNm1").val($("#cdClsSelectNm").val());

		if (id == 0) {
			$("#saveUrl").val("<c:url value='/system/cd/insert.json' />");
			$('#cdId').val("");
			$("#cdId").removeAttr('readOnly'); 
			$('#cdNm').val("");
			$('#cdDesc').val("");
			$('#cdUseSt').val("");
			$('#cdUseSt').selectpicker("refresh");
			$("#deleteBtn").hide();
			$('.cd-modal').modal("show");
		} else {
			$.ajax({
				url : "/system/cd/select.json",
				type : "POST",
				data : { "cdClsId" : $("#cdClsSelectId").val(), "cdId" : $("#cdSelect").val() },
				dataType : "json" ,
				success : function(res) {
					if ("success" == res.result) {
						$("#cdForm #saveUrl").val("<c:url value='/system/cd/update.json' />");						
						$("#cdForm #cdId").attr('readOnly', true);
						$("#cdForm #cdId").val(res.data.cdId);
						$("#cdForm #cdNm").val(res.data.cdNm);
						$("#cdForm #cdDesc").val(res.data.cdDesc);
						$("#cdForm #cdUseSt").val(res.data.recSt);
						$("#cdForm #cdUseSt").selectpicker("refresh");
						$("#deleteBtn").show();
						$('.cd-modal').modal("show");
					}else if("duplicate" == res.result){
						alert(res.message);
					}else {
						alert(res.message);
					}
				}
			});
		}		
	}

	function cdDtlModal(id, name, desc, order, recSt) { //코드 상세 모달 오픈
		if (isEmptyString ($("#cdSelect").val())) {
			alert("코드를 선택하여 주십시오");
			return
		}
		
		if (id == 0) {
			$("#saveUrlDetail").val("<c:url value='/system/cdDtl/insert.json' />");
			$("#mode").val("cdDtlInsert");
			$("#cdId1").val($("#cdSelect").val());
			$("#cdNm1").val($("#cdSelect option:selected").text());
			$("#cdDtlId").removeAttr('readOnly');
			$('#cdDtlId').val("");
			$('#cdDtlNm').val("");
			$('#cdDtlDesc').val("");
			$('#cdDtlOrd').val("");
			$("#cdDtlUseSt").val("Y");
			$("#cdDtlUseSt").selectpicker("refresh");
		} else {
			$("#saveUrlDetail").val("<c:url value='/system/cdDtl/update.json' />");
			$("#cdId1").val($("#cdSelect").val());
			$("#cdNm1").val($("#cdSelect option:selected").text());
			$("#cdDtlId").attr('readOnly', true);
			$("#cdDtlId").val(id); 
			$("#cdDtlNm").val(name);
			$("#cdDtlDesc").val(desc);
			$("#cdDtlOrd").val(order);
			$("#cdDtlUseSt").val(recSt);
			$("#cdDtlUseSt").selectpicker("refresh");
		}
		$('.cdDtl-modal').removeClass("custom-modal-none");
		$('.cdDtl-modal').addClass("custom-modal-show");
	}
	
	function cdClsInsert(){//코드 분류 등록 및 수정
		if (checkForm ("cdClsForm") && confirm ("저장하시겠습니까?")) {
			$.ajax({
				url : $("#saveUrlClass").val() ,
				type : "POST" ,
				data : $("#cdClsForm").serialize(),
				dataType : "json" ,
				success : function(res) {
					if ("success" == res.result) {
						alert("저장되었습니다.");
						$('.cdCls-modal').modal("hide");
						cdClsList();
					}else if("duplicate" == res.result){
						alert(res.message);
					}else {
						alert(res.message);
					}
				}
			});
		}
	}
	
	function cdInsert(){//코드 등록
		if (checkForm ("cdForm") && confirm ("저장하시겠습니까?")) {
			console.log($("#cdForm").serialize());
			$.ajax({
				url : $("#saveUrl").val(),
				type : "POST" ,
				data : $("#cdForm").serialize(),
				dataType : "json" ,
				success : function(res) {
					if ("success" == res.result) {						
						var option = $("<option value='"+$('#cdId').val()+"'>" +$('#cdNm').val()+" ["+ $('#cdId').val() +"]"+ "</option>");
		                $('#cdSelect').append(option);
		                $('#cdSelect').val($('#cdId').val());
		                $('#cdSelect').change();
		                
						alert("저장되었습니다.");
						$(".reg-modal").removeClass("custom-modal-show");
						$(".reg-modal").addClass("custom-modal-none");
						
						//datatable.ajax.reload(); // 데이터 테이블 리로드
					}else if("duplicate" == res.result){
						alert(res.message);
					}else {
						alert(res.message);
					}
				},
				error: function (xhr, status, error) {
					console.error(xhr.responseText);
					console.error(error);
				}
			});
		}
	}

	function cdInsert2(){//코드 등록
		if (checkForm ("cdMForm") && confirm ("저장하시겠습니까?")) {
			console.log($("#saveUrl2").val());
			console.log($("#cdMForm").serialize())
			$.ajax({
				url : $("#saveUrl2").val(),
				type : "POST" ,
				data : $("#cdMForm").serialize(),
				dataType : "json" ,
				success : function(res) {
					if ("success" == res.result) {
						var option = $("<option value='"+$('#cdId2').val()+"'>" +$('#cdNm2').val()+" ["+ $('#cdId2').val() +"]"+ "</option>");
						$('#cdSelect').append(option);
						$('#cdSelect').val($('#cdId2').val());
						$('#cdSelect').change();

						alert("저장되었습니다.");
						$(".mod-modal").removeClass("custom-modal-show");
						$(".mod-modal").addClass("custom-modal-none");

						//datatable.ajax.reload(); // 데이터 테이블 리로드
					}else if("duplicate" == res.result){
						alert(res.message);
					}else {
						alert(res.message);
					}
				},
				error: function (xhr, status, error) {
					console.error(xhr.responseText);
					console.error(error);
				}
			});
		}
	}
	
	function cdDtlInsert(){//코드상세 등록
		if (checkForm ("cdDtlForm") && confirm ("저장하시겠습니까?")) {	
			$.ajax({
				url : $("#saveUrlDetail").val(),
				type : "POST" ,
				data : $("#cdDtlForm").serialize(),
				dataType : "json" ,
				success : function(res) {
					if ("success" == res.result) {
						alert("저장되었습니다.");
						$('.cdDtl-modal').modal("hide");
						datatableDetail.ajax.reload(); // 데이터 테이블 리로드
					}else if("duplicate" == res.result){
						alert(res.message);
					}else {
						alert(res.message);
					}
				}
			});
		}
	}
	
	function cdClsList(recSt){//코드 분류 리스트 전송
		$.ajax({
			url : "<c:url value='/system/cdCls/list.json' />",
			type : "POST" ,
			data : {"recSt" : recSt} ,
			dataType : "json" ,
			success : function(res) {
				var list = res.result;
				$("#cdClsSelect").find('option').each(function(){
					$(this).remove();	
				});
				$("#cdClsSelect").append("<option value=''>코드 분류를 선택하십시오</option>");
				for(var i=0; i<list.length; i++){
					$("#cdClsSelect").append("<option value="+list[i].cdClsId+">"+list[i].cdClsNm+"</option>");
				}
				datatable.ajax.reload();
				$("#cdSelectId").val('');
				datatableDetail.ajax.reload();
			}
		});
	}
	
	function cdDelete(){
		if (confirm ("삭제 하시겠습니까?")) {
			$.ajax({
				url : "<c:url value='/system/cd/delete.json' />",
				type : "POST" ,
				data : {"cdId" : $("#cdId").val(), "cdClsId":$("#cdClsId1").val()} ,
				dataType : "json" ,
				success : function(res) {
					if(res.result == "cntFail"){
						alert("하위코드가 있습니다. 하위코드를 먼저 삭제해주세요.");
						$('.cd-modal').modal("hide");
					}else if(res.result = "success"){
						alert("삭제 되었습니다.");
						$('.cd-modal').modal("hide");
						window.location.reload();
					}
				}
			});
		}
	}
	
	function cdClsDelte(cdClsId){
		if (confirm ("삭제 하시겠습니까?")) {
			$.ajax({
				url : "<c:url value='/system/cdCls/delete.json' />",
				type : "POST" ,
				data : {"cdClsId" : cdClsId} ,
				dataType : "json" ,
				success : function(res) {
					if(res.result == "cntFail"){
						alert("하위코드가 있습니다.");
					}else if(res.result = "success"){
						alert("삭제 되었습니다.");
						datatableDetail.ajax.reload();	
					}
				}
			});
		}
	}
	
	function cdDtlDelte(cdDtlId , cdId){
		if (confirm ("삭제 하시겠습니까?")) {
			$.ajax({
				url : "<c:url value='/system/cdDtl/delete.json' />",
				type : "POST" ,
				data : {"cdDtlId" : cdDtlId,"cdId" : cdId} ,
				dataType : "json" ,
				success : function(res) {
					alert("삭제 되었습니다.");
					datatableDetail.ajax.reload();
				}
			});
		}
	}
</script>