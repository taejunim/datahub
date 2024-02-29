/**
 * 문자열 관련 클랙스
 */

var strUtil = {
	'isEmpty' : function (str) {
		if(str==null || str==undefined) return true;
		try {
			var len = str.trim().length;
			if(len==0) return true;
		} catch(e) {}

		return false;
	},

	'isNotEmpty' : function (str) {
		if(str==null || str==undefined) return false;
		try {
			var len = str.trim().length;
			if(len==0) return false;
		} catch(e) {}

		return true;
	}

};

var ckboxUtil = {
	'maxChecked' : function (obj, max) {
		if(obj==null || obj==undefined) return;

		var ckbox = document.getElementsByName(obj.name);
		var cnt = 0;
		for(var i=0;i<ckbox.length; i++) if(ckbox[i].checked) cnt++;
		if(cnt>max) {
			obj.checked = false;
			alert("최대 "+max+"개만 선택 가능합니다.");
		}
	},
	'chkCnt' :	function(obj) {
		if(obj==null || obj==undefined) return 0;

		var ckbox = document.getElementsByName(obj.name);
		var cnt = 0;
		if(obj.name==null || obj.name==undefined) {
			for(var i=0; i<obj.length; i++) if(obj[i].checked) cnt++;
		} else {
			for(var i=0;i<ckbox.length; i++) if(ckbox[i].checked) cnt++;
		}
		return cnt;
	}
}

var formUtil = {
	'chkSelect' : function(input, title) {
		if(input==null || input==undefined) {
			frmAlert("시스템오류 : Input 항목이 정의되지 않았습니다.");
			return false;
		}
		try {
			if(input.val()==null || input.val()==undefined || strUtil.isEmpty(input.val().trim())) {
				frmAlert("'" + title + "' 항목을 선택하십시오.");
				input.focus();
				return false;
			}
			return true;
		} catch(err) {
			for(var i=0; i<input.options.length; i++) {
				if(input.options[i].selected && strUtil.isNotEmpty(input.options[i].value)) return true;
			}
			frmAlert("'" + title + "' 항목을 선택하십시오.");
			input.focus();
			return false;
		}
	},
	'chkText' : function(input, title, min, max) {
		if(input==null || input==undefined) {
			frmAlert("시스템오류 : Input 항목이 정의되지 않았습니다.");
			return false;
		}

		try {
			input.val(input.val().trim());
			if(strUtil.isEmpty(input.val())) {
				frmAlert("'" + title + "' 항목을 입력하십시오.");
				input.focus();
				return false;
			}
			if(input.val().length<min || input.val().length>max) {
				frmAlert("'" + title + "' 항목을 " + min+" ~ "+max+"자 길이의 문자열로 입력하십시오.");
				input.focus();
				return false;
			}
			return true;
		} catch(err) {
			if(input.value==null || input.value==undefined) {
				frmAlert("시스템오류 : Input 항목이 정의되지 않았습니다.");
				return false;
			}
			input.value = $.trim(input.value);
			if(strUtil.isEmpty(input.value)) {
				frmAlert("'" + title + "' 항목을 입력하십시오.");
				input.focus();
				return false;
			}
			if(input.value.length<min || input.value.length>max) {
				frmAlert("'" + title + "' 항목을 " + min+" ~ "+max+"자 길이의 문자열로 입력하십시오.");
				input.focus();
				return false;
			}
			return true;
		}
	},
	'chkOnlyText' : function(input, title, min, max) {
		if(input==null || input==undefined) {
			frmAlert("시스템오류 : Input 항목이 정의되지 않았습니다.");
			return false;
		}
		try {
			input.val(input.val().trim());
			if(strUtil.isEmpty(input.val())) return true;
			if(input.val().length<min || input.val().length>max) {
				frmAlert("'" + title + "' 항목을 " + min+" ~ "+max+"자 길이의 문자열로 입력하십시오.");
				input.focus();
				return false;
			}
			return true;
		} catch(err) {
			if(input.value==null || input.value==undefined) {
				frmAlert("시스템오류 : Input 항목이 정의되지 않았습니다.");
				return false;
			}
			input.value = $.trim(input.value);
			if(strUtil.isEmpty(input.value)) return true;
			if(input.value.length<min || input.value.length>max) {
				frmAlert("'" + title + "' 항목을 " + min+" ~ "+max+"자 길이의 문자열로 입력하십시오.");
				input.focus();
				return false;
			}
			return true;
		}
	},

	'chkTel' : function (input, title) {
		if(input==null || input==undefined) {
			frmAlert("시스템오류 : Input 항목이 정의되지 않았습니다.");
			return false;
		}

		try {
			input.val(input.val().trim());
			if(strUtil.isEmpty(input.val())) {
				frmAlert("'" + title + "' 항목을 입력하십시오.");
				input.focus();
				return false;
			}
			if(_ck_telnum(input.val())) {
				frmAlert("'" + title + "' 전화번호를 확인하십시오.");
				input.focus();
				return false;
			}
			return true;
		} catch(err) {
			if(input.value==null || input.value==undefined) {
				frmAlert("시스템오류 : Input 항목이 정의되지 않았습니다.");
				return false;
			}
			input.value = $.trim(input.value);
			if(strUtil.isEmpty(input.value)) {
				frmAlert("'" + title + "' 항목을 입력하십시오.");
				input.focus();
				return false;
			}
			if(_ck_telnum(input.value)) {
				frmAlert("'" + title + "' 전화번호를 확인하십시오.");
				input.focus();
				return false;
			}
			return true;
		}
	}
};

function _ck_telnum(num) {
	var checkReg = /^[-0-9]*$/;
	return checkReg.test(num);
}

function frmAlert(msg) {
	alert(msg);
}

var prev = "";
var inChk = {
	'engNum' : function(obj) {
		if(obj==null || obj==undefined) return "";
		var key = event.KeyCode;
		if(key==8 || key==9 || key==37 || key==39 || key== 46) return;
		try {
			obj.val(obj.val().replace(/[^a-z|A-Z|0-9]/g, ""));
		} catch (err) {
			obj.value = obj.value.replace(/[^a-z|A-Z|0-9]/g, "");
		}
	},
	'num' : function(obj) {
		if(obj==null || obj==undefined) return "";
		var key = event.KeyCode;
		if(key==8 || key==9 || key==37 || key==39 || key== 46) return;
		try {
			obj.val(obj.val().replace(/[^0-9]/g, ""));
		} catch (err) {
			obj.value = obj.value.replace(/[^0-9]/g, "");
		}
	}
	,
	'float' : function(obj, plc) {
		var regexp = new RegExp('^\\d*(\\.\\d{0,'+plc+'})?$');
		if(obj.value.search(regexp) == -1) {
			obj.value = prev;
		} else {
			prev = obj.value;
		}
	}
	,
	'snum' : function(obj) {
		if(obj==null || obj==undefined) return "";
		var key = event.KeyCode;
		if(key==8 || key==9 || key==37 || key==39 || key== 46) return;
		try {
			obj.val(obj.val().replace(/[^0-9|-]/g, ""));
		} catch (err) {
			obj.value = obj.value.replace(/[^0-9|-]/g, "");
		}
	}

};