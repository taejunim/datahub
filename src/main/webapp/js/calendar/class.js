/**
 *	calendar v2.1
 *
 *	@author		HanSeungho landboy@gmail.com
 *	@copyright	Copyright (c) HanSeungho
 *
 *	작성일 :			2008-08-01
 *	최종수정일 :	2014-11-28
 **/

var calendar = {
	isMSIE: (navigator.userAgent.toLowerCase().indexOf("msie") != -1),
	isGECKO: (navigator.userAgent.toLowerCase().indexOf("gecko") != -1 && navigator.userAgent.toLowerCase().indexOf("webkit") == -1),
	isWEBKIT: (navigator.userAgent.toLowerCase().indexOf("webkit") != -1),
	isOPERA: (navigator.userAgent.toLowerCase().indexOf("opera") != -1),

	objCalendar: null,

	path: '.',

	width: 154,
	height: 156,

	mode: '',
	target: null,
	targetYear: null,
	targetMonth: null,
	targetDay: null,

	now: { year: 0, month: 0, day: 0 },

	dayNums: new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31),
	weekNames: new Array('일', '월', '화', '수', '목', '금', '토'),

	dateType: 'YYYY-MM-DD',

	posX: 0,
	posY: 0,

	registEvent: function(type, listener) {
		if (window.addEventListener)
			document.addEventListener(type, listener, false);
		else
			document.attachEvent('on'+type, listener);
	},

	unregistEvent: function(type, listener) {
		if (window.removeEventListener)
			document.removeEventListener(type, listener, false);
		else
			document.detachEvent('on'+type, listener);
	},

	getOffset: function(obj) {
		var _x = 0, _y = 0;

		while (obj && obj.tagName.toLowerCase() != 'body' && !isNaN(obj.offsetLeft) && !isNaN(obj.offsetTop)) {
			_x += obj.offsetLeft - obj.scrollLeft;
			_y += obj.offsetTop - obj.scrollTop;
			obj = obj.offsetParent;
		}

		return { left: _x, top: _y };
	},

	setZero: function(value) {
		value = "" + value;
		if (value.length == 1) value = "0"+value;
		return value;
	},

	replaceAll: function(value, oldChar, newChar) {
		if (value == null || value.replace(/ /g, "") == "") return;
		else
		{
			if (this.isMSIE)
				return value.replace(new RegExp(oldChar, 'gi'), newChar);
			else
				return value.split(oldChar).join(newChar);
		}
	},

	isDate: function(select, value) {
		var result = false;
		for (var i=0; i<select.length; i++) {
			if (select.options[i].value == value) {
				result = true;
				break;
			}
		}
		return result;
	},

	hover: function(e, on) {
		var e = window.event || e;
		var element = (e.srcElement ? e.srcElement : e.target);

		if (element && element.nodeName.toLowerCase() == "td") {
			if (element.id == '') return;
			element.style.background = (on ? '#E7E7E7' : '#FFF');
		}
	},


	pickDate: function(e, year, month) {
		var e = window.event || e;
		var element = (e.srcElement ? e.srcElement : e.target);

		if (element && element.nodeName.toUpperCase() == "TD") {
			if (element.id == "") return;

			this.inputDate(year, this.setZero(month), this.setZero(element.id));
		}
	},

	inputDate: function(year, month, day) {
		var realYear, realMonth, realDay;

		if (year < 1900) year = 1900 + year;

		var realDate = this.dateType.toUpperCase();

		if (realDate.indexOf('YYYY') != -1) {
			realYear = year;
			realDate = this.replaceAll(realDate, 'YYYY', realYear);
		}
		else if (realDate.indexOf('YY') != -1) {
			realYear = year.toString().substr(2,2);
			realDate = this.replaceAll(realDate, 'YY', realYear);
		}

		if (realDate.indexOf('MM') != -1) {
			realMonth = this.setZero(month);
			realDate = this.replaceAll(realDate, 'MM', realMonth);
		}
		else if (realDate.indexOf('M') != -1) {
			realMonth = month;
			realDate = this.replaceAll(realDate, 'M', realMonth);
		}

		if (realDate.indexOf('DD') != -1) {
			realDay = this.setZero(day);
			realDate = this.replaceAll(realDate, 'DD', realDay);
		}
		else if (realDate.indexOf('D') != -1) {
			realDay = day;
			realDate = this.replaceAll(realDate, 'D', realDay);
		}

		if (this.mode == 'SEL') {
			if (!this.isDate(this.targetYear, realYear) || !this.isDate(this.targetMonth, realMonth) || !this.isDate(this.targetDay, realDay)) {
				alert('선택 할 수 없는 일자입니다.');
			}
			else {
				this.targetYear.value = realYear;
				this.targetMonth.value = realMonth;
				this.targetDay.value = realDay;
			}
		}
		else {
			this.target.value = realDate;
		}

		this.hide();
	},

	makeContent: function(year, month, day) {
		var i, len;

		year = parseInt(year, 10);
		month = parseInt(month, 10);
		day = parseInt(day, 10);

		if (month == 0) { year = year - 1; month = 12; }
		else if (month == 13) { year = year + 1; month = 1; }

		// 윤년 확인
		if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
			this.dayNums[1] = 29;
		} else {
			this.dayNums[1] = 28;
		}

		var first = new Date(year, month-1, 1);
		var firstDay = first.getDay() + 1;
		var daysOfMonth = this.dayNums[month-1];

		if (day > daysOfMonth) day = daysOfMonth;

		var tag = ''+
'<div class="wrap">'+
	'<div class="canvas">'+
		'<div class="head">'+
			'<div class="d">'+
				'<img src="'+this.path+'/images/btn_left.gif" onClick="parent.calendar.show('+(year-1)+','+month+','+day+')" />'+
				'<div>'+year+'</div>'+
				'<img src="'+this.path+'/images/btn_right.gif" onClick="parent.calendar.show('+(year+1)+','+month+','+day+')" />'+
				'<div class="blank">&nbsp;</div>'+
				'<img src="'+this.path+'/images/btn_left.gif" onClick="parent.calendar.show('+year+','+(month-1)+','+day+')" />'+
				'<div>'+this.setZero(month)+'</div>'+
				'<img src="'+this.path+'/images/btn_right.gif" onClick="parent.calendar.show('+year+','+(month+1)+','+day+')" />'+
			'</div>'+
			'<div class="b"><span onClick="parent.calendar.show('+this.now.year+','+this.now.month+','+this.now.day+')">Today</span></div>'+
		'</div>'+
		'<table class="frame" onMouseOver="parent.calendar.hover(event, true)" onMouseOut="parent.calendar.hover(event, false)" onClick="parent.calendar.pickDate(event,'+year+','+month+')">'+
		'<colgroup><col width="20"><col width="20"><col width="20"><col width="20"><col width="20"><col width="20"><col width="20"></colgroup>'+
		'<tr>'+
			'<th class="red">'+this.weekNames[0]+'</th>'+
			'<th>'+this.weekNames[1]+'</th>'+
			'<th>'+this.weekNames[2]+'</th>'+
			'<th>'+this.weekNames[3]+'</th>'+
			'<th>'+this.weekNames[4]+'</th>'+
			'<th>'+this.weekNames[5]+'</th>'+
			'<th class="blue">'+this.weekNames[6]+'</th>'+
		'</tr>'+
		'<tr>';

		var column = 0;
		for (i=1; i<firstDay; i++) {
			tag += '<td></td>';
			++column;
		}

		for (i=1; i<=daysOfMonth; i++) {
			tag += '<td ';

			if (year == this.now.year && month == this.now.month && i == this.now.day) {
				tag += 'class="today"';
			}
			else if (column == 0) {
				tag += 'class="red"';
			}
			else if (column ==6) {
				tag += 'class="blue"';
			}

			tag += ' id="'+i+'" style="cursor:pointer">'+i+'</td>';

			++column;

			if (column == 7 && i < daysOfMonth) {
				tag += "</tr><tr>";
				column = 0;
			}
		}

		if (column > 0 && column < 7) {
			for (i=1, len=7-column; i<=len ; i++)
				tag += '<td></td>';
		}

		tag += '</tr></table>';
		tag += "</div></div>";

		return tag;
	},

	setDate: function() {
		var nowDate = new Date();
		this.now.year = nowDate.getYear();
		if (this.now.year < 1900) this.now.year = this.now.year + 1900;
		this.now.month = this.setZero(nowDate.getMonth()+1);
		this.now.day = this.setZero(nowDate.getDate());

		var year = this.now.year;
		var month = this.now.month;
		var day = this.now.day;

		var aDate = (this.mode == 'SEL' ? this.targetYear.value+'-'+this.targetMonth.value+'-'+this.targetDay.value : this.target.value);
		var aDateType = this.dateType.toUpperCase();

		if (aDate.length == aDateType.length) {
			if (aDateType.indexOf('YYYY') != -1) {
				year = aDate.substr(aDateType.indexOf('YYYY'), 4);
			}
			else if (aDateType.indexOf('YY') != -1) {
				year = aDate.substr(aDateType.indexOf('YY'), 2);
			}

			if (aDateType.indexOf('MM') != -1) {
				month = aDate.substr(aDateType.indexOf('MM'), 2);
			}
			else if (aDateType.indexOf('M') != -1) {
				month = aDate.substr(aDateType.indexOf('M'), 1);
			}

			if (aDateType.indexOf('DD') != -1) {
				day = aDate.substr(aDateType.indexOf('DD'), 2);
			}
			else if (aDateType.indexOf('D') != -1) {
				day = aDate.substr(aDateType.indexOf('D'), 1);
			}
		}

		setTimeout(function () { calendar.registEvent('click', calendar.hide) }, 100);

		this.show(year, month, day);
	},

	checkLayer: function() {
		if (!this.objCalendar) {
			var objDiv = document.createElement('DIV');
			objDiv.style.position = "absolute";
			objDiv.style.left = "0px";
			objDiv.style.top = "0px";
			objDiv.style.zIndex = 9000;
			objDiv.style.display = "none";

				var objIfrm = document.createElement("iframe");
				objIfrm.setAttribute("scrolling", "no");
				objIfrm.setAttribute("frameBorder", "0");
				objIfrm.setAttribute("marginWidth", "0");
				objIfrm.setAttribute("marginHeight", "0");
				objIfrm.style.width = (this.width+6)+'px';
				objIfrm.style.height = (this.height+6)+'px';

			objDiv.appendChild(objIfrm);

			document.body.appendChild(objDiv);

			this.objCalendar = objDiv;
		}
	},

	show: function(year, month, day) {
		this.checkLayer();

		setTimeout(function () {
			var objIfrm = calendar.objCalendar.firstChild;
			var objDoc = objIfrm.contentWindow.document;
			objDoc.open();
			objDoc.write('<html><head>');
			objDoc.write('<style type="text/css">');
			objDoc.write('html { overflow:hidden; }');
			objDoc.write('body { width:100%; height:100%; background-color:#FFF; margin:0; overflow:hidden; }');
			objDoc.write('div { font-family:tahoma; font-size:12px; }');
			objDoc.write('table { border-collapse:collapse; table-layout:fixed; }');
			objDoc.write('th, td { padding:0; font-family:tahoma; font-size:12px; text-align:center; }');
			objDoc.write('.wrap { background-color:#EFE7E7; padding:2px; border:solid 1px #CCCCCC; overflow:hidden; }');
			objDoc.write('	.canvas { height:'+calendar.height+'px; background-color:#FFF; overflow:hidden; }');
			objDoc.write('		.head { height:23px; overflow:hidden; }');
			objDoc.write('		.head .d { float:left; margin:4px 0 0 5px; }');
			objDoc.write('		.head .d div { float:left; font-weight:bold; }');
			objDoc.write('		.head .d div.blank { width:3px; font-size:1px; line-height:1px; }');
			objDoc.write('		.head .d img { display:block; float:left; cursor:pointer; margin-top:2px; }');
			objDoc.write('		.head .b { float:right; margin:5px 5px 0 0; }');
			objDoc.write('		.head .b span { font-size:10px; font-weight:bold; color:#CC0000; cursor:pointer }');
			objDoc.write('		.frame { border-collapse:collapse; width:'+calendar.width+'px; table-layout:fixed; }');
			objDoc.write('		.frame th { height:20px; color:#000; background-color:#F4F4F4; }');
			objDoc.write('		.frame th.red { color:#FF0000; }');
			objDoc.write('		.frame th.blue { color:#0000FF; }');
			objDoc.write('		.frame td { height:18px; }');
			objDoc.write('		.frame td.today { color:#CE0000; font-weight:bold; border:1px solid #FFCACA; }');
			objDoc.write('		.frame td.red { color:#FF0000; }');
			objDoc.write('		.frame td.blue { color:#0000FF; }');
			objDoc.write("</style>");
			objDoc.write("</head>");
			objDoc.write("<body>"+calendar.makeContent(year, month, day)+"</body>");
			objDoc.write("</html>");
			objDoc.close();

			calendar.objCalendar.style.left = calendar.posX+"px";
			calendar.objCalendar.style.top = calendar.posY+"px";
			calendar.objCalendar.style.display = "";
		}, 50);
	},

	hide: function() {
		calendar.unregistEvent('click', calendar.hide);
		calendar.objCalendar.style.display = "none";
	},

	init: function () {
		var path = null;

		var scripts = document.getElementsByTagName('script');
		for (var i=0; i<scripts.length; i++) {
			if (typeof (scripts[i].src) == 'string') {
				if (scripts[i].src.indexOf('calendar/class.js') != -1) {
					path = scripts[i].src;
					break;
				}
			}
		}

		if (path) this.path = path.substring(0, path.lastIndexOf('/'));
	},

	open: function(e, element, dateType) {
		var e = window.event || e;

		var clientWidth = parseInt(document.body.clientWidth, 10);
		if (document.compatMode == 'CSS1Compat' && !this.isOPERA && document.documentElement && document.documentElement.clientWidth)
			clientWidth = parseInt(document.documentElement.clientWidth, 10);

		this.mode = '';
		this.target = (element.nodeType==1) ? element : document.getElementById(element);
		this.dateType = dateType;

		if (element.nodeType == 1) {
			var offset = getOffset(element);
			this.posX = offset.left;
			this.posY = offset.top + element.offsetHeight;
		}
		else {
			this.posX = (this.isMSIE ? parseInt(document.body.scrollLeft, 10) + parseInt(e.clientX, 10) : parseInt(e.pageX, 10));
			this.posY = (this.isMSIE ? parseInt(e.clientY, 10) + parseInt(document.body.scrollTop, 10) : parseInt(e.pageY, 10));
			if ((this.posX+this.width) > clientWidth) this.posX -= this.width;
		}
		if (this.isMSIE && parseInt(document.body.scrollTop, 10) == 0) {
			this.posY += parseInt(document.documentElement.scrollTop, 10);
		}

		if (this.target.disabled) return false;

		this.setDate();
	},

	openSelect: function(e, elementYear, elementMonth, elementDay, dateType) {
		var e = window.event || e;

		var clientWidth = parseInt(document.body.clientWidth, 10);
		if (document.compatMode == 'CSS1Compat' && !this.isOPERA && document.documentElement && document.documentElement.clientWidth)
			clientWidth = parseInt(document.documentElement.clientWidth, 10);

		this.mode = 'SEL';
		this.targetYear = (elementYear.nodeType==1) ? elementYear : document.getElementById(elementYear);
		this.targetMonth = (elementMonth.nodeType==1) ? elementMonth : document.getElementById(elementMonth);
		this.targetDay = (elementDay.nodeType==1) ? elementDay : document.getElementById(elementDay);
		this.dateType = dateType;

		this.posX = (this.isMSIE ? parseInt(document.body.scrollLeft, 10) + parseInt(e.clientX, 10) : parseInt(e.pageX, 10));
		this.posY = (this.isMSIE ? parseInt(e.clientY, 10) + parseInt(document.body.scrollTop, 10) : parseInt(e.pageY, 10));
		if ((this.posX+this.width) > clientWidth) this.posX -= this.width;
		if (this.isMSIE && parseInt(document.body.scrollTop, 10) == 0) this.posY += parseInt(document.documentElement.scrollTop, 10);

		this.setDate();
	}
}

calendar.init();