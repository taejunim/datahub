<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/view/include/tags.jspf"%>

<script src="/energy/js/validation/common-validation.js"></script>
<script src="/energy/js/user/userService.js"></script>
<script src="/energy/js/user/join.js"></script>

<div class="subWrap">
  <section class="contents clear-fix">
    <article class="contentsBody">
      <div class="contentsBody-inner">
        <div class="joinForm">
          <div class="join-wrap">
            <div class="joinBox">
              <h4 id="viewText">회원가입</h4>
              <form id="joinForm" class="pt-3">
                <strong class="joinBox-tit">기본정보</strong>
                <div class="formRow pw clear-fix">
                  <div class="formTxt">
                    <label for="userLoginId">아이디<b class="point">*</b></label>
                  </div>
                  <div class="formBox">
                    <div>
                      <input type="text" id="userLoginId" name="userLoginId" placeholder="아이디">
                      <button type="button" class="cellFormBtn cellFormBtn1" id="idDuplicateCheckBtn">중복체크</button>
                    </div>
                  </div>
                </div>
                <div class="formRow pw clear-fix">
                  <div class="formTxt">
                    <label for="userPwd">비밀번호<b class="point">*</b></label>
                  </div>
                  <div class="formBox">
                    <div>
                      <input type="password" id="userPwd" name="userPwd" placeholder="비밀번호">
                    </div>
                  </div>
                </div>
                <div class="formRow pw clear-fix">
                  <div class="formTxt">
                    <label for="userPwdConfirm">비밀번호 확인<b class="point">*</b></label>
                  </div>
                  <div class="formBox">
                    <div>
                      <input type="password" id="userPwdConfirm" name="userPwdConfirm" placeholder="비밀번호 확인">
                    </div>
                  </div>
                </div>
                <div class="formRow pw clear-fix">
                  <div class="formTxt">
                    <label for="userNm">사용자 이름<b class="point">*</b></label>
                  </div>
                  <div class="formBox">
                    <div>
                      <input type="text" id="userNm" name="userNm" placeholder="사용자 이름">
                    </div>
                  </div>
                </div>
                <div class="btn-wrap txtCt mt50">
                  <button type="button" class="cmnBtn register" id="joinBtn">등록</button>
                  <button type="button" class="cmnBtn delete" id="cancelBtn">취소</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </article>
  </section>
</div>
