/****************************
 * 화면 준비 
 * ************************/
$(document).ready(function() {
	
	//메뉴 날짜
	printClock();
	//상태 진행 
	$("#divloading").load("/loadinggif");

	//$(location).attr('port')
	$(document).ajaxSend(function(){
		$("#view_loading").css("display", "block");
		
    });
    $(document).ajaxComplete(function(){
        $("#view_loading").css("display", "none");  	
        
    });
    $(document).ajaxError(function(event,xhr,options,exc){
    	$("#view_loading").css("display", "none");
    	if (xhr.status == "403"){    		
    		 location.href = "/error";
    	}else {
    		var portNum = $(location).attr('port');
    		if (isEmpty(xhr.responseText)){
    			alert("서버 접속이 원활하지 않습니다.");
    			return false;
    		}
    		var result = JSON.parse(xhr.responseText);
    		if (portNum =='7777'){
    			showAlert(result.message);		    			
    		}else {
    			alert(result.message);
    		}
    	}
	});
    
    //Left Top Menu state
	var mainIndex = getQuerystring('mainIndex');
	var subIndex = getQuerystring('subIndex');
		
	if (mainIndex == null || mainIndex == undefined){
		mainIndex = 0;	
	}
	if (subIndex == null || subIndex == undefined){
		subIndex = 0;	
	}
	
	//class 삭제
	$("#gnb > ul > li ").removeClass('active');
	$("#lnb > ul > li ").removeClass('on');
	
	//탭 메뉴 모두 숨김
	//$(".js-tabmenu1").css("display", "none");
	
	$(".js-tabmenu1").each(function(){
		var subId = "sbn"+mainIndex;		
		if($(this).attr('id') == subId){			
			$(this).css("display", "block");			
		}else {
			$(this).remove();
		}
	});
	
	//선택된 메뉴 class 설정
	$("#gnb > ul > li ").eq(mainIndex).addClass('active');
	$("#lnb > ul > li ").eq(subIndex).addClass('on');	
	
	$("#gnb > ul > li ").eq(mainIndex)
	
	//<title>결제관리 | Billing OSS</title>
	if (!isEmpty($("#gnb > ul > li ").eq(mainIndex).text())){		
		document.title = $("#gnb > ul > li ").eq(mainIndex).text() + " | Billing OSS";
	}
	
});

/*function change view*/
/*function changeView(page){
	//document.getElementById("page-content").innerHTML = page;
	$('#body-content').load(page);
}
*/
//yjh추가 input phone formatting
function inputFormatPhone(){
	$('.phone').val(function(i, text) {
		if(text.length == 11){
			return text.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		}else if(text.length == 10){
			if (text.substr(0,2) == '02'){
				return text.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
			} else {
				return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			}
		}else {
			//return text.replace(text);
			return text;
		}
	});
}

function formatPhone(){
	$('.phone').text(function(i, text) {
		if(text.length == 11){
			return text.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		}else if(text.length == 10){
			if (text.substr(0,2) == '02'){
				return text.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
			} else {
				return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
			}
		}else {
			//return text.replace(text.val());
		}
	});
}
	//$('.phone').val($(this).val().substring( 0, 2 ) + '-' + $(this).val().substring( 3, 6 ) + '-' + $(this).val().substring( 7, 10 ));


/********************************
 * function : getToday yyyy-mm-dd
 ********************************/
function getToday(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	/*<![CDATA[*/
	if(dd<10) {
	    dd = '0'+dd
	} 

	if(mm<10) {
	    mm = '0'+mm
	} 
	/*]]>*/
	return yyyy + "-" + mm + "-" + dd;
}

/********************************
 * function : getToday yyyy-mm-dd
 ********************************/
function getTodayType(delim){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	/*<![CDATA[*/
	if(dd<10) {
		dd = '0'+dd
	} 
	
	if(mm<10) {
		mm = '0'+mm
	} 
	/*]]>*/
	return yyyy + delim + mm + delim + dd;
}

/********************************
 * function : transform yyyy-mm-dd
 * input : inputid :   file path name element id , elementid : show table id
 ********************************/
function yyyymmdd(dateIn) {
	   var yyyy = dateIn.getFullYear();
	   var mm = dateIn.getMonth()+1; // getMonth() is zero-based
	   var dd  = dateIn.getDate();
	   if(mm.toString().length == 1) mm='0'+mm;
	   if(dd.toString().length == 1) dd='0'+dd;
	   
	   return String(yyyy + "-" + mm + "-" + dd); // Leading zeros for mm and dd
}

/********************************
 * function : excel-upload
 * input : inputid :   file path name element id , elementid : show table id
 ********************************/
function ExportToTable(inputid,elementid) {  
    var regex = /^([a-zA-Z0-9ㄱ-힣\s_\\.\-:])+(.xlsx|.xls)$/;  
    inputid = '#'+inputid;
    elementid = '#'+elementid;
    $(elementid).empty();
    
    if ($(inputid).val().toLowerCase().indexOf(".xlsx") > 0 || $(inputid).val().toLowerCase().indexOf("xls") > 0 ) {  
        var xlsxflag = false; 
        if ($(inputid).val().toLowerCase().indexOf(".xlsx") > 0) {  
            xlsxflag = true;  
        }  
        if (typeof (FileReader) != "undefined") {  
            var reader = new FileReader();  
            reader.onload = function (e) {  
                var data = e.target.result;  
                if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
	                if (xlsxflag) {  
	                    var workbook = XLSX.read(data, { type: 'buffer' });  
	                }  
	                else {  
	                    var workbook = XLS.read(data, { type: 'buffer' });  
	                } 
                } else {
	                if (xlsxflag) {  
	                    var workbook = XLSX.read(data, { type: 'binary' });  
	                }  
	                else {  
	                    var workbook = XLS.read(data, { type: 'binary' });  
	                } 
                }
                var sheet_name_list = workbook.SheetNames;  

                var cnt = 0;
                sheet_name_list.forEach(function (y) { 
                    if (xlsxflag) {  
                        var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                    }  
                    else {  
                        var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                    }  
                    if (exceljson.length > 0 && cnt == 0) {  
                        BindTable(exceljson,elementid);  
                        cnt++;  
                    }  
                });  
                $(elementid).show();  
            }  
            
            if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                reader.readAsArrayBuffer($(inputid)[0].files[0]);  
            } else {
                reader.readAsBinaryString($(inputid)[0].files[0]);  
            }
            /*
            if (xlsxflag) {
                reader.readAsArrayBuffer($(inputid)[0].files[0]);  
            }  
            else {  
                reader.readAsBinaryString($(inputid)[0].files[0]);  
            }
            */  
        }  
        else {  
            showAlert("Your browser does not support HTML5!");  
        }  
    }  
    else {  
        showAlert("엑셀파일 업로드하세요.");  
    }  
}

function BindTable(jsondata, tableid) {
    var columns = BindTableHeader(jsondata, tableid);
    
    for (var i = 0; i < jsondata.length; i++) {  
        var row$ = $('<tr/>');  
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
            var cellValue = jsondata[i][columns[colIndex]];  
            if (cellValue == null)  
                cellValue = "";  
            row$.append($('<td/>').html(cellValue));  
        }  
        $(tableid).append(row$);  
    } 
} 

function BindTableHeader(jsondata, tableid) {
    var columnSet = [];  
    var headerTr$ = $('<tr/>');  
    for (var i = 0; i < jsondata.length; i++) {  
        var rowHash = jsondata[i];  
        for (var key in rowHash) {  
            if (rowHash.hasOwnProperty(key)) {  
                if ($.inArray(key, columnSet) == -1) {
                    columnSet.push(key);  
                    headerTr$.append($('<th/>').html(key));  
                }  
            }  
        }  
    }  
    $(tableid).append(headerTr$);  
    return columnSet;  
}  

/********************************
 * function : excel-upload
 * input : inputid :   file path name element id , elementid : show table id, columns : header name 
 ********************************/
function ExportToTableWithHeader(inputid,elementid,columns) {  
    var regex = /^([a-zA-Z0-9ㄱ-힣\s_\\.\-:])+(.xlsx|.xls)$/;  
    inputid = '#'+inputid;
    elementid = '#'+elementid;
    //$(elementid+' tbody').empty();
    
    if ($(inputid).val().toLowerCase().indexOf(".xlsx") > 0 || $(inputid).val().toLowerCase().indexOf("xls") > 0 ) {  
        var xlsxflag = false; 
        if ($(inputid).val().toLowerCase().indexOf(".xlsx") > 0) {  
            xlsxflag = true;  
        }  
        if (typeof (FileReader) != "undefined") {  
            var reader = new FileReader();  
            reader.onload = function (e) {  
                var data = e.target.result;  
                if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
	                if (xlsxflag) {  
	                    var workbook = XLSX.read(data, { type: 'buffer' });  
	                }  
	                else {  
	                	var workbook = XLS.read(data, { type: 'buffer' });  
	                } 
                } else {
	                if (xlsxflag) {  
	                    var workbook = XLSX.read(data, { type: 'binary' });  
	                }  
	                else {  
	                    var workbook = XLS.read(data, { type: 'binary' });  
	                } 
                }
                var sheet_name_list = workbook.SheetNames;  

                var cnt = 0;
                sheet_name_list.forEach(function (y) { 
                    if (xlsxflag) {  
                        var exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);  
                    }  
                    else {  
                        var exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);  
                    }  
                    if (exceljson.length > 0 && cnt == 0) {  
                    	BindTableWithHeader(exceljson,elementid,columns);  
                        cnt++;  
                    }  
                });  
                $(elementid).show();  
            }  
            
            if (window.navigator.userAgent.indexOf("MSIE ") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
                reader.readAsArrayBuffer($(inputid)[0].files[0]);
            } else {
                reader.readAsBinaryString($(inputid)[0].files[0]);  
            }
            /*
            if (xlsxflag) {
                reader.readAsArrayBuffer($(inputid)[0].files[0]);  
            }  
            else {  
                reader.readAsBinaryString($(inputid)[0].files[0]);  
            }
            */  
        }  
        else {  
            showAlert("Your browser does not support HTML5!");  
        }  
    }  
    else {  
        showAlert("엑셀파일 업로드하세요.");  
    }  
}

function BindTableWithHeader(jsondata, tableid, columns) {
    for (var i = 0; i < jsondata.length; i++) {
        var row$ = $('<tr/>');  
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {  
            var cellValue = jsondata[i][columns[colIndex]];  
            if (cellValue == null)  
                cellValue = "";  
            row$.append($('<td/>').html(cellValue));  
        }  
        $(tableid).append(row$);  
    }  
}  

/********************************
 * function : fnExcelReport -> excel-download
 * input : tableid : table id
 ********************************/

function fnExcelReport(tableid, filename)
{
    var tab_text = '<table border="1px" style="font-size:14px" ">';
    var textRange; 
    var j = 0;
    var tab = document.getElementById(tableid); // id of table
    var lines = tab.rows.length;

    // the first headline of the table
    if (lines > 0) {
        tab_text = tab_text + '<tr bgcolor="#DFDFDF">' + tab.rows[0].innerHTML + '</tr>';
    }

    // table data lines, loop starting from 1
    for (j = 1 ; j < lines; j++) {     
        tab_text = tab_text + "<tr>" + tab.rows[j].innerHTML + "</tr>";
    }

    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");             //remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi,"");                 // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, "");    // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    var agent = navigator.userAgent.toLowerCase();


    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
		if (!$("#excelDownCommFrame").length){
			$("body").append('<iframe id="excelDownCommFrame" style="display:none"></iframe>');
		}
		excelDownCommFrame.document.open("txt/html","replace");
		excelDownCommFrame.document.write(tab_text);
		excelDownCommFrame.document.close();
        excelDownCommFrame.focus(); 
        if (filename == null){
        	sa = excelDownCommFrame.document.execCommand("SaveAs", true, "DataTableExport.xls");
        } else {
        	sa = excelDownCommFrame.document.execCommand("SaveAs", true, filename);
        }
    }
    else // other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

    return (sa);
} 



/********************************
 * function : sendFormController
 * input : formname : fromname
 *         method : method
 *         sendurl : url
 ********************************/

function sendFormController(formname ,method , sendurl ){
	
	var queryString = $("form[name=" + formname + "]").serialize() ;
	$.ajax({
        type : method,
        url : sendurl,
        data : queryString,
        dataType : 'json',
        error: function(xhr, status, error){
            showAlert(error);
        },
        success : function(json){
            showAlert("정상처리 되었습니다.");
        }
    });
}

/********************************
 * function : sendController
 * input : formname : fromname
 *         method : method
 *         sendurl : url
 *         param : param
 ********************************/

function sendController(formname ,method , sendurl , param ){
	
	$.ajax({
        type : method,
        url : sendurl,
        data : param,
        dataType : 'json',
        error: function(xhr, status, error){
            showAlert(error);
        },
        success : function(json){
            showAlert("정상처리 되었습니다.");
        }
    });
}


/********************************
 * 객체 생성
 ********************************/

var createElement= function(elementTag, attributeData, appendElement){	
    // Element 생성
    var elementObj = document.createElement(elementTag);
    // Attrbute 추가
    for(var key in attributeData){
        //console.log(key, attrbutes[key]);
        elementObj.setAttribute(key, attributeData[key]);
    };
    // Element Append        
    if(appendElement){
        appendElement.appendChild(elementObj);
    }
    
    return elementObj;
}

/********************************************************************************************************************************
 * 사용자 alert
 * message : alert 내용
 * focusObj : 창을 닫을때 focus 객체
 * 예: showAlert("이름은 필수 입력입니다.", $('#custName'));
 ********************************************************************************************************************************/
var showAlert = function(message, focusObj){       
		
		//기존 적용 생성된 객체가 있을 경우 삭제
		$("body").off("click", "#popup_alert .btn_close, #popup_alert .btn_cancel");
		$('#alertBtn').remove();
	    $('#popup_alert').remove();
	    $('.popup_alert').remove();	   
	    
	    
		var modalBody = createElement('button' , {'id': 'alertBtn'}, document.body);
		var popAlert = createElement('div' , {'id': 'popup_alert','class': 'trp popupfixed-wrap'}, document.body);
		createElement('div' , {'class': 'popup-dim'}, popAlert);
		var popAlign = createElement('div' , {'class': 'popup-align'},popAlert);
		var popVertical = createElement('div' , {'class': 'popup-vertical'}, popAlign);
		var popWxs = createElement('div' , {'class': 'popup-layer option wxs'}, popVertical);
		createElement('a' , {'class': 'btn_close', 'href':'#','text':'X'}, popWxs);
		var popTitle = createElement('div' , {'class': 'pop_tit'}, popWxs);
		popTitle.innerHTML = "알림";
		var popSection = createElement('section' , {'class': 'section'}, popWxs);
		var popMessage = createElement('div' , {'class': 'arlt_txt'}, popSection);
		popMessage.innerHTML = message;
		var alertBtnDiv = createElement('div' , {'class': 'btn_set-center mt30'}, popSection);
		var alertOkBtn = createElement('div' , {'class': 'btn btn_green radius btn_wm radius btn_cancel','role':'button','href':'#none'}, alertBtnDiv);		
		alertOkBtn.innerHTML = "확인"; 
		
		//얼럿팝업
	    var popup_alert = $("#alertBtn").trpLayerFixedPopup("#popup_alert");
	    //$(popup_alert.getBtn).on("click", function($e) {
	        //$e.preventDefault();
	        popup_alert.open(this);
	    //});
	    $("body").on("click", "#popup_alert .btn_close, #popup_alert .btn_cancel", function($e) {
	        $e.preventDefault();	        
	        popup_alert.close();
	        
	        if(typeof(focusObj) == 'object' && focusObj.length == 1){
	        	focusObj.focus();	        	
	        }
	    });  	   
}

/********************************************************************************************************************************
 * 사용자 confirm
 * message : alert 내용
 * focusObj : 창을 닫을때 focus 객체
 * 예: showAlert("이름은 필수 입력입니다.", $('#custName'));
 ********************************************************************************************************************************/
var showConfirm = function(message, callBackFunc){   

	//기존 적용 생성된 객체가 있을 경우 삭제	
	$("body").off("click", "#popup_confirm .btn_confirmOk");
	$("body").off("click", "#popup_confirm .btn_close, #popup_confirm .btn_cancel");	
	$('#confirmBtn').remove();
	$('#popup_confirm').remove();
	$('.popup_confirm').remove();
	
	var modalBody = createElement('button' , {'id': 'confirmBtn'}, document.body);
	var popConfirm = createElement('div' , {'id': 'popup_confirm','class': 'trp popupfixed-wrap'}, document.body);
	createElement('div' , {'class': 'popup-dim'}, popConfirm);
	var popAlign = createElement('div' , {'class': 'popup-align'},popConfirm);
	var popVertical = createElement('div' , {'class': 'popup-vertical'}, popAlign);
	var popWxs = createElement('div' , {'class': 'popup-layer option wxs'}, popVertical);
	createElement('a' , {'class': 'btn_close', 'href':'#','text':'X'}, popWxs);
	var popTitle = createElement('div' , {'class': 'pop_tit'}, popWxs);
	popTitle.innerHTML = "알림";
	var popSection = createElement('section' , {'class': 'section'}, popWxs);
	var popMessage = createElement('div' , {'class': 'arlt_txt'}, popSection);
	popMessage.innerHTML = message;
	var alertBtnDiv = createElement('div' , {'class': 'btn_set-center mt30'}, popSection);
	var conOkBtn = createElement('div' , {'class': 'btn btn_green btn_w radius mr5 btn_confirmOk','role':'button','href':'#none'}, alertBtnDiv);		
	conOkBtn.innerHTML = "확인"; 
	var conCancleBtn = createElement('div' , {'class': 'btn btn_default btn_w radius btn_cancel','role':'button','href':'#none'}, alertBtnDiv);		
	conCancleBtn.innerHTML = "취소"; 
	
	//컨펌팝업
	var popup_confirm = $("#confirmBtn").trpLayerFixedPopup("#popup_confirm");
	//$(popup_confirm.getBtn).on("click", function($e) {
	//$e.preventDefault();
	popup_confirm.open(this);
	//});
	$("body").on("click", "#popup_confirm .btn_confirmOk", function($e) {
		$e.preventDefault();	        
		popup_confirm.close();
		callBackFunc();
	});  	   
	
	$("body").on("click", "#popup_confirm .btn_close, #popup_confirm .btn_cancel", function($e) {
		$e.preventDefault();	        
		popup_confirm.close();

	});  	   
}
/*window.confirm = function (message, callback, caption) {
    caption = caption || 'Confirmation'

    $(document.createElement('div')).attr({
        title: caption,
            'class': 'dialog'
    }).html(message).dialog({
        position: ['center', 100],
        dialogClass: 'fixed',
        buttons: {
            "OK": function () {
                $(this).dialog('close');
                callback()
                return true;
            },
                "Cancel": function () {
                $(this).dialog('close');
                return false;
            }
        },
        close: function () {
            $(this).remove();
        },
        draggable: false,
        modal: true,
        resizable: false,
        width: 'auto'
    });
};*/

/***********************
 * numberComma(num)
 * number->comma-String
 * 1000000->1,000,000
 * **********************/
function numberComma(num){
	if(num == null) return;
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}

/********************************************
 * 사업자 등록 번호 유효성 체크
 * *******************************************/
function checkBizID(bizID) {
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var tmpBizID, i, chkSum=0, c2, remander;
    var result;
     
    bizID = bizID.replace(/-/gi,'');
 
    for (i=0; i<=7; i++) {
        chkSum += checkID[i] * bizID.charAt(i);
    }
 
    c2 = "0" + (checkID[8] * bizID.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10 ;
 
    if (Math.floor(bizID.charAt(9)) == remander) {
        result = true ; // OK!
         
    } else {
        result = false;
         
    }
   
    return result;
}

/********************************************
 * 사업자 등록 번호 formatting
 * *******************************************/
var bizNoFormatter = function (num, type) {
    var formatNum = '';
    try{
         if (num.length == 10) {
              if (type == 0) {
                   formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-*****');
              } else {
                    formatNum = num.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3');
              }
         }
    } catch(e) {
         formatNum = num;
         console.log(e);
    }
    return formatNum;
}

/********************************************
 * 날짜 formatting
 * formatDate('99991231')
 * *******************************************/
var formatDate = function formatDate(dateStr) {

	if (isEmpty(dateStr)){
		return '';
	}
	var year = dateStr.substring(0,4);
	var month = dateStr.substring(4,6);
	var day = dateStr.substring(6,8);

	if (month.length < 2) month = '0' + month; 

	if (day.length < 2) day = '0' + day; 

	return [year, month, day].join('-'); 
}

/********************************************
 * 문자열을 날짜로
 * maketDate('99991231')
 * *******************************************/
var maketDate = function (dateStr) {	
	if (dateStr == ''){
		return new Date();
	}
	var year = dateStr.substring(0,4);
	var month = dateStr.substring(4,6)-1;
	var day = dateStr.substring(6,8);
	
	return new Date(year, month, day);
}

/********************************************
 * 날짜 더하기
 * dateAddDel('2017-09-25', -7, 'd');
 * *******************************************/
var dateAddDel = function (sDate, nNum, type) {
	sDate = sDate.replace(/-/gi,'');
	var yy = parseInt(sDate.substr(0, 4), 10);
	var mm = parseInt(sDate.substr(4, 2), 10);
	var dd = parseInt(sDate.substr(6), 10);
    nNum = parseInt(nNum);
    
	if (type == "d") {
		d = new Date(yy, mm - 1, dd + nNum);
	}else if (type == "m") {
		d = new Date(yy, mm - 1, dd + (nNum * 31));
	}else if (type == "y") {
		
		d = new Date(yy + nNum, mm - 1, dd);
	}
	 
	yy = d.getFullYear();
	mm = d.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
	dd = d.getDate(); dd = (dd < 10) ? '0' + dd : dd;
	 
	return '' + yy + '-' +  mm  + '-' + dd;
}

	/*****************************************************************************
	email 유효성 체크	
	 ******************************************************************************/	
	var validateEmail = function (email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}
	
	/*****************************************************************************
	주소 검색 창을 보여 준다.
	ex ) execDaumPostcode('wrap', 'zipcode', 'baseAddress')
	- addDivName : 우편번호 검색 layer 
	- zipObj : 우편번호 input
	- addObj : 기본 주소 input
	******************************************************************************/	
	var execDaumPostcode = function (addDivName, zipObj, baseObj){		 
		// 현재 scroll 위치를 저장해놓는다.
		var currentScroll = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
		var element_wrap = document.getElementById(addDivName);
		new daum.Postcode({
		    oncomplete: function(data) {
		        // 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
		        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
		        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
		        var fullAddr = data.address; // 최종 주소 변수
		        var extraAddr = ''; // 조합형 주소 변수
		        // 기본 주소가 도로명 타입일때 조합한다.
		        if(data.addressType === 'R')
		        {
		            //법정동명이 있을 경우 추가한다.
		            if(data.bname !== ''){
		                extraAddr += data.bname;
		            }
		            // 건물명이 있을 경우 추가한다.
		            if(data.buildingName !== ''){
		                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
		            }
		            // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
		            fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
		        }		
		        // 우편번호와 주소 정보를 해당 필드에 넣는다.
		        document.getElementById(zipObj).value = data.zonecode; //5자리 새우편번호 사용
		        document.getElementById(baseObj).value = fullAddr;
		        // iframe을 넣은 element를 안보이게 한다.
		        // (autoClose:false 기능을 이용한다면, 아래 코드를 제거해야 화면에서 사라지지 않는다.)
		        element_wrap.style.display = 'none';
		        // 우편번호 찾기 화면이 보이기 이전으로 scroll 위치를 되돌린다.
		        document.body.scrollTop = currentScroll;
		    },
		    // 우편번호 찾기 화면 크기가 조정되었을때 실행할 코드를 작성하는 부분. iframe을 넣은 element의 높이값을 조정한다.
		    onresize : function(size) {
		        element_wrap.style.height = size.height+'px';
		    },
		    width : '100%',
		    height : '100%'
		}).embed(element_wrap);
		// iframe을 넣은 element를 보이게 한다.
		element_wrap.style.display = 'block';
	}	
	
	/*****************************************************************************
	주소 검색 창 닫기.
	ex ) foldDaumPostcode('wrap')
	- addDivName : 우편번호 검색 layer 
	******************************************************************************/	
	function foldDaumPostcode(addDivName) {
		//우편번호 찾기 찾기 화면을 넣을 element
		var element_wrap = document.getElementById(addDivName);
		// iframe을 넣은 element를 안보이게 한다.
		element_wrap.style.display = 'none';
	}
	
	/*****************************************************************************
	객체의 style의 display 상태를 변경 한다.
	******************************************************************************/	
	var layerDisplay = function (objName, state){
		var elementObj = document.getElementById(objName);
		if (state = 'undefined' || state == '' ){
			state = 'none'
		}
		elementObj.style.display = state;		
	} 	
	
	/*****************************************************************************
	문자열 Byte  관련 함수
	- getByteLength(s) : 문자열 Byte 수 반환
	- cutByteLength(s, len) : 문자열을 Byte 수 만큼 잘라서 반환
	- charByteSize(s) : 문자 바이트 수
	******************************************************************************/
	var calByte = {
		getByteLength : function(s) {		
			if (s == null || s.length == 0) {
				return 0;
			}
			var size = 0;		
			for ( var i = 0; i < s.length; i++) {
				size += this.charByteSize(s.charAt(i));
			}
			return size;
		},			
		cutByteLength : function(s, len) {		
			if (s == null || s.length == 0) {
				return 0;
			}
			var size = 0;
			var rIndex = s.length;		
			for ( var i = 0; i < s.length; i++) {
				size += this.charByteSize(s.charAt(i));
				if( size == len ) {
					rIndex = i + 1;
					break;
				} else if( size > len ) {
					rIndex = i;
					break;
				}
			}		
			return s.substring(0, rIndex);
		},		
		charByteSize : function(ch) {		
			if (ch == null || ch.length == 0) {
				return 0;
			}		
			var charCode = ch.charCodeAt(0);		
			if (charCode <= 0x00007F) {
				return 1;
			} else if (charCode <= 0x0007FF) {
				return 2;
			} else if (charCode <= 0x00FFFF) {
				return 3;
			} else {
				return 4;
			}
		}
	};

	/*****************************************************************************
	이니시스 billkey 생성과 1회납부 처리	
	* channelgubun : [MOBILE]
	* jobGubun: [MAKEBILLKEY]
	******************************************************************************/	
	var setPaymentReqInfo = function(connumber, billType, channelgubun, jobGubun){
		//var queryString = $("form[name=iniPayForm").serialize();
		//test value
		//connumber = "51004434";
		//billType = "CARD"; //HPP, CARD			
		/*alert('connumber=='+connumber)
		alert('billType=='+billType)
		alert('channelgubun=='+channelgubun)*/
		var param = new Object();
		param.conNumber = connumber;
		param.billType = billType;
		param.channelGubun = channelgubun;
		param.jobGubun = jobGubun;
					
		$.ajax({
			method:'post',
			url: '/payment/setPaymentReqInfo',
			//url: '/payment/setPaymentReqInfo/'+connumber+"/"+billType+"/"+channelgubun,
			data : param,					
			error: function(xhr, status, error){
				debugger;			
				var result = JSON.parse(xhr.responseText);
				if (channelgubun =="MOBILE"){					
					alert(result.message);						
				}else {
					showAlert(result.message);											
				}
			},
			success : function(json){						
				if(json.resultCode == "00" || json.resultCode == "0000"){
					if (channelgubun =="MOBILE"){		
						alert(json.resultCode)							
					}else {						
						showAlert(json.resultCode)	
					}
				}else{
					$("#iniPayDiv").remove();

					if (channelgubun =="MOBILE"){						
						$("#saleBody").append($('<div/>', {
							id: 'iniPayDiv'
						}));
						$("#iniPayDiv").append(json.iniPayForm);
						$("#iniPayForm").submit();
					}else {	
						$("#iniPayDiv").append(json.iniPayForm);			
/*						$("#body-content").append($('<div/>', {
					        id: 'iniPayDiv'
					    }));
*/						$("#container").append($('<div/>', {
							id: 'iniPayDiv'
						}));
						$("#iniPayDiv").append(json.iniPayForm);			
						INIStdPay.pay('iniPayForm');
					}					
				}
			}					
		})
	};
	
	/*****************************************************************************
	이니시스 납부 처리	
	 ******************************************************************************/	
/*	var iniPayment = function(connumber, providernumber, invoicenumber, channelgubun, memo){		
		var param = new Object();
		param.conNumber = connumber;
		param.providerNumber = providernumber;
		param.invoiceNumber = invoicenumber;
		param.channelGubun = channelgubun;
		param.memo = memo;

		$.ajax({
			method:'post',
			data : param,
			url: '/payment/payProc',
			error: function(xhr, status, error){
				debugger;			
				var result = JSON.parse(xhr.responseText);
				showAlert(result.message);						
			},
			success : function(json){						
				showAlert(json.resultMsg);
				
				if(json.resultCode == "00" || json.resultCode == "0000"){
					return true;
				}else {
					return false;
				}
			}					
		})
	};*/

	/*****************************************************************************
	메뉴 이동	
	******************************************************************************/		
	var movePage = function (url, mainIndex, subIndex){
		$('#mainIndex').val(mainIndex);
		$('#subIndex').val(subIndex);
		$('#movePageFrm').attr('action', url);
		$('#movePageFrm').submit();
	}
	
	/*****************************************************************************
	location parameter 가져 오기	
	******************************************************************************/	
	var getQuerystring = function (paramName){ 
		//var _tempUrl = window.location.search.substring(1); //url에서 처음부터 '?'까지 삭제 
		var _tempUrl = $(location).attr('search').substring(1); //url에서 처음부터 '?'까지 삭제		
		var _tempArray = _tempUrl.split('&'); // '&'을 기준으로 분리하기
		for(var i = 0; _tempArray.length; i++) { 
			if (_tempArray[i] != undefined){				
				var _keyValuePair = _tempArray[i].split('='); // '=' 을 기준으로 분리하기 
				if(_keyValuePair[0] == paramName){ // _keyValuePair[0] : 파라미터 명 
					// _keyValuePair[1] : 파라미터 값 
					return _keyValuePair[1]; 
				} 
			}else {
				 return "";
			}
		}
	}	
	

/********************************************
 * 페이징 네비게이션
 * *******************************************/
function pagingProc(pageMaker) {
	$("#pagination").empty();
	if (pageMaker.totalCount != 0) {
		$("#pagination").empty();
		if (pageMaker.prev == true) {
			$("#pagination").append('<a href="javascript:goPagingFirst();" class="prev_end">FIRST</a><a href="javascript:goPagingPrev();" class="prev">PREV</a>'); //다음페이지로 가기 버튼 활성화
		}

		for (var i = pageMaker.startPage; i <= pageMaker.endPage; i++) {
			if (pageMaker.cri.page == i) { 
				$("#pagination").append('<strong class="on">' + i + '</strong>'); //버튼 비활성화
			} else {
				$("#pagination").append('<a href="javascript:goPagingPage('+i+');"><em>' + i + '</em></a>'); //버튼 활성화
			}
		}

		if (pageMaker.next == true) {
			$("#pagination").append('<a href="javascript:goPagingNext();" class="next"><em>NEXT</em></a><a href="javascript:goPagingLast();" class="next_end">END</a>'); //다음페이지로 가기 버튼 활성화
		}
	}
}

/********************************************
 * 페이지 네비게이션 첫페이지 이동
 * *******************************************/
function goPagingFirst(){
	getPagingData(1);
}

/********************************************
 * 페이지 네비게이션 이전페이지 이동
 * *******************************************/
function goPagingPrev(){
	page = Number(pageMaker.startPage) - 1;
	getPagingData(page);
}

/********************************************
 * 페이지 네비게이션 선택한 페이지 이동
 * *******************************************/
function goPagingPage(page){
	getPagingData(page);
}

/********************************************
 * 페이지 네비게이션 다음페이지 이동
 * *******************************************/
function goPagingNext(){
	page = Number(pageMaker.endPage) + 1;
	getPagingData(page);
}

/********************************************
 * 페이지 네비게이션 마지막페이지 이동
 * *******************************************/
function goPagingLast(){
	page = Number(pageMaker.lastPage);
	getData(page);
}

/********************************************
 * 페이징 네비게이션 팝업용
 * *******************************************/
function pagingProcPopup(pageMaker, pagination, searchFunction) {
	
	var prevPage = Number(pageMaker.startPage) - 1;
	var nextPage = Number(pageMaker.endPage) + 1;
	var lastPage = Number(pageMaker.lastPage);
	
	$("#"+pagination).empty();
	if (pageMaker.totalCount != 0) {
		$("#"+pagination).empty();
		if (pageMaker.prev == true) {
			$("#"+pagination).append('<a href="javascript:'+searchFunction+'(1);" class="prev_end">FIRST</a><a href="javascript:'+searchFunction+'('+prevPage+');" class="prev">PREV</a>'); //다음페이지로 가기 버튼 활성화
		}

		for (var i = pageMaker.startPage; i <= pageMaker.endPage; i++) {
			if (pageMaker.cri.page == i) { 
				$("#"+pagination).append('<strong class="on">' + i + '</strong>'); //버튼 비활성화
			} else {
				$("#"+pagination).append('<a href="javascript:'+searchFunction+'('+i+');"><em>' + i + '</em></a>'); //버튼 활성화
			}
		}

		if (pageMaker.next == true) {
			$("#"+pagination).append('<a href="javascript:'+searchFunction+'('+nextPage+');" class="next"><em>NEXT</em></a><a href="javascript:'+searchFunction+'('+lastPage+');" class="next_end">END</a>'); //다음페이지로 가기 버튼 활성화
		}
	}
}

/********************************************
 * 공통코드 콤보 생성
 * *******************************************/
var makeSelectCode =  function (codegroupid, objectId, allYn, selectCode){
	makeCodeList(codegroupid, objectId, selectCode, allYn, 'SELECT');
}

/********************************************
 * 공통코드 라디오 생성
 * *******************************************/
var makeRadioCode =  function (codegroupid, objectId, allYn, selectCode){	
	makeCodeList(codegroupid, objectId, selectCode, allYn, 'RADIO');
}

var makeRadioCode =  function (codegroupid, objectId, allYn, selectCode, disabledFlag){	
	makeCodeList(codegroupid, objectId, selectCode, allYn, 'RADIO', disabledFlag);
}

/********************************************
 * 공통 코드 객체 생성
 * ex) 	RADIO :	 makeCodeList('paymentTypeCode', 'contractState', 'RADIO', 'REFUND');
		SELECTBOX : makeCodeList('paymentstatecode', 'paymentStateCode', 'SELECT');
* codegroupid : 코드 그룹 아이디
* objectId : 생성 대상 객체
* type	: 객체 유형 [RADIO, SELECT]
* selectCode :선택된 코드
 * *******************************************/
var makeCodeList = function (codegroupid, objectId, selectCode, allYn, type, disabledFlag){
	//객세 비활성화 속성
	if (isEmpty(disabledFlag)){
		disabledFlag = false;
	}
	$.ajax({
		method:'get',
		url: '/code/findcode/'+codegroupid,
		//data : param,					
		error: function(xhr, status, error){
			debugger;			
			var result = JSON.parse(xhr.responseText);
			showAlert(result.message);						
		},
		success : function(json){
			var selectState = false;
			$("#"+objectId).empty();
			$("#"+objectId+"Div").empty();
			$.each(json, function(i, item) {
				if (item.code == selectCode){
					selectState = true;
				}else {					
					selectState = false;
				}
				
				if (type =="SELECT"){	
					if (allYn =='Y' && i==0){
						$("#"+objectId).append($('<option/>', {
							value: ''
							, text: '전체'
							, selected : true
						}));						
					}
					$("#"+objectId).append($('<option/>', {
						value: item.code
						, text: item.codeName		
						, selected : selectState
					}));
				}else if (type == "RADIO"){
					$("#"+objectId+"Div").append($('<span>', {
						id: objectId+"Span"+i
						, class : "trp radio-box"
					}));	
					$("#"+objectId+"Span"+i).append($('<input/>', {
						id: objectId+i
						, name:objectId
						, type: "radio"
						, checked:selectState
						, value : item.code
						, disabled : disabledFlag
					}));		
					$("#"+objectId+"Span"+i).append($('<i/>', {
					}));		
					$("#"+objectId+"Span"+i).append($('<label/>', {
						for:objectId+i
						, text:item.codeName
					}));		
				}
			});
		}					
	})	
}


/********************************************
 * 왼쪽 메뉴에 현재 시간 설정
 * *******************************************/
var printClock = function () {    

    var currentDate = new Date();                                     // 현재시간
    var calendar = currentDate.getFullYear() + "년 " + (currentDate.getMonth()+1) + "월 " + currentDate.getDate()+"일"; // 현재 날짜
    var amPm = 'AM'; // 초기값 AM
    var currentHours = addZeros(currentDate.getHours(),2); 
    var currentMinute = addZeros(currentDate.getMinutes() ,2);
    var currentSeconds =  addZeros(currentDate.getSeconds(),2);
    
    if(currentHours >= 12){ // 시간이 12보다 클 때 PM으로 세팅, 12를 빼줌
    	amPm = 'PM';
    	currentHours = addZeros(currentHours - 12,2);
    }

    if ($('#nowDay') != undefined){    	
    	$('#nowDay').text(calendar);
    }
    if ($('#nowClock') != undefined){    	
    	var nowTime = currentHours+":"+currentMinute;//+":"+currentSeconds +" <span style='font-size:50px;'>"+ amPm+"</span>"; //날짜를 출력해 줌    	
    	$('#nowClock').html(nowTime);
    }
    
    setTimeout("printClock()",1000);         // 1초마다 printClock() 함수 호출
}

var addZeros = function (num, digit) { // 자릿수 맞춰주기
	  var zero = '';
	  num = num.toString();
	  if (num.length < digit) {
	    for (i = 0; i < digit - num.length; i++) {
	      zero += '0';
	    }
	  }
	  return zero + num;
}

/**********************************************************************************************
 * 기간 검색 event 설정
 * ex) 	$("input[name=termSet]").click(function (){			
				setSearchTerm('invoiceDateFrom', 'invoiceDateTo', $(this).val());
			})
 **********************************************************************************************/
var setSearchTerm = function (fromId, toId, term){
	var fromDate = getToday();
	var toDate;	
	
	if (isNumber(term)){
		//숫자만일 경우
		term = parseInt(term);
		toDate = dateAddDel(fromDate, term, 'd');
	}else if (term.indexOf('Y') != -1){
		term = term.replace('Y', '');
		toDate = dateAddDel(fromDate, term, 'y')
	}else if (term.indexOf('M') != -1){
		term = term.replace('M', '');
		toDate = dateAddDel(fromDate, term, 'm')		
	}else {
		toDate = fromDate;
	}
	if (term == 0){
		$("#"+fromId).val(getToday());
		$("#"+toId).val(getToday());
	}else 	if (term < 0){
		$("#"+fromId).val(toDate);
		$("#"+toId).val(fromDate);
	}else{
		$("#"+fromId).val(fromDate);
		$("#"+toId).val(toDate);		
	}
}

/********************************************
 * 숫자 여부 확인
 * *******************************************/
var isNumber = function (s) {
	  s += ''; // 문자열로 변환
	  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
	  if (s == '' || isNaN(s)) return false;
	  return true;
	}


/******************************************************************************************
 * 문자열이 빈 문자열인지 체크하여 결과값을 리턴한다.
 * @param str       : 체크할 문자열
 *****************************************************************************************/
var isEmpty = function(str){
     
    if(typeof str == "undefined" || str == null || str == "")
        return true;
    else
        return false ;
}
 
/******************************************************************************************
 * 문자열이 빈 문자열인지 체크하여 기본 문자열로 리턴한다.
 * @param str           : 체크할 문자열
 * @param defaultStr    : 문자열이 비어있을경우 리턴할 기본 문자열
 *****************************************************************************************/
var nvl = function (str, defaultStr){
     
    if(typeof str == "undefined" || str == null || str == "")
        str = defaultStr ;
     
    return str ;
}

/******************************************************************************************
 * 최대 byte 초과 여부 확인
 *****************************************************************************************/
var isOverByte = function(str, length){
	if (calByte.getByteLength( str ) > length)
		return true;
	else 
		return false;
}

/******************************************************************************************
 * 문자열 Byte 함수
 *****************************************************************************************/
var calByte = {
		getByteLength : function(s) {

			if (s == null || s.length == 0) {
				return 0;
			}
			var size = 0;

			for ( var i = 0; i < s.length; i++) {
				size += this.charByteSize(s.charAt(i));
			}

			return size;
		},
			
		cutByteLength : function(s, len) {

			if (s == null || s.length == 0) {
				return 0;
			}
			var size = 0;
			var rIndex = s.length;

			for ( var i = 0; i < s.length; i++) {
				size += this.charByteSize(s.charAt(i));
				if( size == len ) {
					rIndex = i + 1;
					break;
				} else if( size > len ) {
					rIndex = i;
					break;
				}
			}

			return s.substring(0, rIndex);
		},

		charByteSize : function(ch) {

			if (ch == null || ch.length == 0) {
				return 0;
			}

			var charCode = ch.charCodeAt(0);

			if (charCode <= 0x00007F) {
				return 1;
			} else if (charCode <= 0x0007FF) {
				return 2;
			} else if (charCode <= 0x00FFFF) {
				return 3;
			} else {
				return 4;
			}
		}
	};

/******************************************************************************************
 * 문자열 Byte 함수
 *****************************************************************************************/
var checkDateTerm = function (srtDt, endDt){
    var arySrtDt = srtDt.split("-"); // ex) 시작일자(2007-10-09)
    var aryEndDt = endDt.split("-"); // ex) 종료일자(2007-12-05)

    if( arySrtDt.length != 3 || aryEndDt.length != 3){ 
        showAlert("날짜 형식이 잘못되었습니다."); 
        return false;
    }

    var startDt = new Date(Number(arySrtDt[0]),Number(arySrtDt[1])-1,Number(arySrtDt[2]));
    var endDt	= new Date(Number(aryEndDt[0]),Number(aryEndDt[1])-1,Number(aryEndDt[2]));
    resultDt	= Math.floor(endDt.valueOf()/(24*60*60*1000)- startDt.valueOf()/(24*60*60*1000));

    if(resultDt < 0 ){    	
    	showAlert('조회시작일자가 종료일자보다 큽니다.');		
    	return false; 
    }
    return true;
}


/******************************************************************************************
 * 콤마 제거 * 
 *****************************************************************************************/
var removeComma = function (str){
	if(isEmpty(str)){
		return "";
	}else {		
		return str.replace(/,/g, '');
	}
}

/******************************************************************************************
 * 숫자만 추출하여 숫자로 반환
 *****************************************************************************************/
var getNumber = function (str) {
    var len      = str.length;
    var sReturn  = "";
    
    for (var i=0; i<len; i++){
        if ( (str.charAt(i) >= "0") && (str.charAt(i) <= "9") ){
            sReturn += str.charAt(i);
        }
    }      
    return sReturn;
}

/******************************************************************************************
 * password 유효성 체크
 *****************************************************************************************/
var checkPassword = function (passwordObj,id){    
	var password = passwordObj.val();
    if(!/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/.test(password)){            
        showAlert('숫자+영문자+특수문자 조합으로 8자리 이상 사용해야 합니다.', passwordObj);        
        return false;
    }    
    var checkNumber = password.search(/[0-9]/g);
    var checkEnglish = password.search(/[a-z]/ig);
    if(checkNumber <0 || checkEnglish <0){
        showAlert("숫자와 영문자를 혼용하여야 합니다.",passwordObj);        
        return false;
    }
    if(/(\w)\1\1\1/.test(password)){
        showAlert('같은 문자를 4번 이상 사용하실 수 없습니다.',passwordObj);        
        return false;
    }
        
    if(password.search(id) > -1){
        showAlert("비밀번호에 아이디가 포함되었습니다.",passwordObj);        
        return false;
    }
    return true;
}


/******************************************************************************************
 * 한글/영문/스페이스만 입력가능 체크
 *****************************************************************************************/
var isKorean = function (str){    
	var regex = /^[a-zA-Z가-힣\s]+$/;
	if( !regex.test(str) ) {
		return false;
	} else {
		return true;
	}
}

/******************************************************************************************
 * 한글/영문/숫자/스페이스/-/.만 입력가능 체크
 *****************************************************************************************/
var isKoreanNumber = function (str){    
	var regex = /^[0-9a-zA-Z가-힣-.?!+\s]+$/;
	if( !regex.test(str) ) {
		return false;
	} else {
		return true;
	}
}


/******************************************************************************************
 * Html Tag 포합 여부
 *****************************************************************************************/
var isHtmlTag = function (str){    
	var regex = /<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig;
	if( !regex.test(str) ) {
		return false;
	} else {
		return true;
	}	
}

/******************************************************************************************
 * Html Tag 삭제
 *****************************************************************************************/
var removeHtmlTag = function(str){
	return str.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig,"");
}

/********************************************
 * 시간 formatting
 * formatTime('235959')
 * *******************************************/
var formatTime = function (timeStr) {
	var formatStr = '';
	if (timeStr.length == 4){
		formatStr = timeStr.substring(0,2) + ':' + timeStr.substring(2,4);
	} else if (timeStr.length == 6){
		formatStr = timeStr.substring(0,2) + ':' + timeStr.substring(2,4) + ':' + timeStr.substring(4,6);
	} 
	return formatStr;
}

/********************************************
 * 시간 formatDateTime
 * formatDateTime('201707251110') ==> 2019-07-25 11:10
 * formatDateTime('20170725111012') ==> 2019-07-25 11:10
 * *******************************************/
var formatDateTime = function (dateStr) {
	var formatStr = '';	
	if (dateStr.length= 12 && isNumber(dateStr)){		
		formatStr = formatDate(dateStr.substring(0,8))+" "+ formatTime(dateStr.substring(8,12));
	}
	return formatStr;
}

/***************************************************
팝업 선택박스 index 높이기
***************************************************/
var setSelect2BasicPopClass = function (){
	 $(".select2Basic_pop").select2({   
	        dropdownCssClass : 'increasedzindexclass_pop',
	        minimumResultsForSearch: Infinity,
	        width:"100%"
	    }); 		
}
/***************************************************
선택박스 index 높이기
 ***************************************************/
var setSelect2BasicClass = function (){
	$(".select2Basic").select2({            
	    minimumResultsForSearch: Infinity
	});
}