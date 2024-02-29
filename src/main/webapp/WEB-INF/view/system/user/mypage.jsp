<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<script src="/energy/js/user/mypage.js?ver=0.1"></script>

<article class="contentsBody">
	<div class="contentsBody-inner">
		<div class="joinForm">
			<div class="join-wrap">
				<div class="joinBox">
					<h4>마이페이지</h4>
					<strong class="joinBox-tit">기본정보</strong>
					<c:set value="${userSelect}" var="user"/>
					<c:set value="${userRoleSelect}" var="userRole"/>
					<input type="hidden" id="userId" name="userId" value="${user.userId}" />
					<div class="formRow pw clear-fix">
						<div class="formTxt">
							<label>사용자 권한</label>
						</div>
						<div class="formBox">
							<div>
								<input type="text" id="userRoleId" name="userRoleId" value="${userRole.roleNm}" readonly>
							</div>
						</div>
					</div>
					<div class="formRow pw clear-fix">
						<div class="formTxt">
							<label>사용자 ID</label>
						</div>
						<div class="formBox">
							<div>
								<input type="text" id="userLoginId" name="userLoginId" value="${user.userLoginId}" readonly>
								<button id="userOutBtn" class="cellFormBtn cellFormBtn1">회원탈퇴</button>
							</div>
						</div>
					</div>
					<div class="formRow pw clear-fix">
						<div class="formTxt">
							<label>사용자명<b class="point">*</b></label>
						</div>
						<div class="formBox">
							<div>
								<input type="text" id="userNm" name="userNm" value="${user.userNm}">
								<button class="cellFormBtn cellFormBtn1" id="passwordChangeBtn">비밀번호 변경</button>
							</div>
						</div>
					</div>
					<div class="btn-wrap txtCt mt50">
						<button class="cmnBtn register" id="saveBtn">수정</button>
						<button class="cmnBtn delete" onclick="history.back()">취소</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</article>

<div class="custom-modal pwd-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop find pwFind" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>비밀번호 변경</strong>
			<button class="layerPop-close pwd-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<form id="funcForm" name="funcForm">
				<input type="password" id="nowUserPwd" name="nowUserPwd" class="inputTxt-full mb5" placeholder="현재 비밀번호 *">
				<input type="password" id="chgUserPwd" name="chgUserPwd" class="inputTxt-full mb5" placeholder="변경 비밀번호 *">
				<span>* 숫자, 영문자, 특수문자 포함 8~20자 이내로 입력</span>
				<input type="password" id="userPwdConfirm" name="userPwdConfirm" class="inputTxt-full mt10" placeholder="변경 비밀번호 확인 *">
			</form>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn register" id="passwordChange">비밀번호 변경</button>
			<button class="cmnBtn cancel pwd-modal-close">닫기</button>
		</div>
	</div>
</div>

<div class="custom-modal leave-modal custom-modal-none" tabindex="-1" aria-hidden="true">
	<div class="layerPop find pwFind" tabindex="-1" aria-hidden="true" style="left: 50% !important; right: 0% !important; transform: translate(-50%, -50%) !important; top: 50% !important;">
		<div class="layerPop-header clear-fix">
			<strong>회원탈퇴</strong>
			<button class="layerPop-close leave-modal-close">닫기</button>
		</div>
		<div class="layerPop-con">
			<form id="outForm" name="outForm">
				<input type="password" id="userPwd" name="userPwd" class="inputTxt-full mb5" placeholder="현재 비밀번호 *">
				<input type="text" id="userOutRsn" name="userOutRsn" class="inputTxt-full mb5" placeholder="탈퇴 사유를 입력해주세요.">
			</form>
		</div>
		<div class="btn-wrap txtCt">
			<button class="cmnBtn register" id="userOut">탈퇴</button>
			<button class="cmnBtn cancel leave-modal-close">닫기</button>
		</div>
	</div>
</div>