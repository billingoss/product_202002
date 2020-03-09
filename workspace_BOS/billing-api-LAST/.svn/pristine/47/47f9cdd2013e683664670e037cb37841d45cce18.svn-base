
/*function change view*/
function changeView(page){
	//document.getElementById("page-content").innerHTML = page;
	$('#body-content').load(page);
}

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
            alert("Your browser does not support HTML5!");  
        }  
    }  
    else {  
        alert("엑셀파일 업로드하세요.");  
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
            alert("Your browser does not support HTML5!");  
        }  
    }  
    else {  
        alert("엑셀파일 업로드하세요.");  
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
            alert(error);
        },
        success : function(json){
            alert("정상처리 되었습니다.");
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
            alert(error);
        },
        success : function(json){
            alert("정상처리 되었습니다.");
        }
    });
}


/********************************
 * function : Common.Dialog
 * example
 * Common.Dialog.alert("해지처리가 오류발생했습니다..");
 * Common.Dialog.confirm({
        content: '계약 해지 하시겠습니다?'
        ,ok: function(){
            //function~~
        }
    });   
 ********************************/
var Common = {};
Common.Dialog = {
    /**
    * Dialog Id
    */
    DialogInfo: {
        titleId: 'common-modal-title',
        okBtnId: 'common-modal-ok-btn',
    },
    
    /**
    * Default Item Message
    */
    /*<![CDATA[*/
    Message: {
        title: '&nbsp',
        ok: '확인',
        cancel: '취소'
    },
    /*]]>*/
    /**
    * Element 생성
    *
    * @param elementTag Element Tag
    * @param attributeData Set Attribute Object
    * @param appendElement AppendChild Element Object
    * @return Element Object    
    */
    createElement: function(elementTag, attributeData, appendElement){
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
    },
    
    /**
    * Modal Dialog Make
    */
    makeModalDialog: function(data){
        // UUID 생성
        var uuid;
        if(typeof(Util) === 'object' && typeof(Util.uuid) === 'function'){
            uuid = Util.uuid();
        }else{
            uuid = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            });
        }
        
        // Dialog Id
        data.dialogId = 'common-modal-dialog-' + data.dialogType + '-' + uuid;
        
        /***************************************************************************/
        // ---------------- Modal Main Div ----------------
        var modalDiv = this.createElement('div'
            , {'id': data.dialogId,'class': 'modal fase','tabindex': '-1','role': 'dialog','aria-labelledby': this.DialogInfo.titleId,'aria-hidden': 'true'}
            , document.body);
        var modalDialogDiv = this.createElement('div', {'class': 'modal-dialog modal-dialog-center'}, modalDiv);
        var modalContentDiv = this.createElement('div', {'class': 'modal-content'}, modalDialogDiv);
        
        // ---------------- Modal Header ----------------
        var modalHeaderDiv = this.createElement('div', {'class': 'modal-header modal-popup-header'}, modalContentDiv);
        
        // Close Header
        if(data.closeBtn){
            var modalHeaderCloseBtn = this.createElement('button', {'type': 'button', 'class': 'close', 'data-dismiss': 'modal', 'aria-hidden': 'true'}, modalHeaderDiv);
            modalHeaderCloseBtn.innerHTML ='x';
        }
        
        // title
        var modalHeaderTitle = this.createElement('h4', {'class': 'modal-title', 'id': this.DialogInfo.titleId}, modalHeaderDiv);
        modalHeaderTitle.innerHTML = data.title ? data.title : this.Message.title;
        
        // ---------------- Modal Body ----------------
        var modalBodyDiv = this.createElement('div', {'class': 'modal-body', 'style': 'word-break: break-all'}, modalContentDiv);;
        modalBodyDiv.innerHTML = data.content ? data.content : '';
        
        // ---------------- Modal Footer ----------------
        var modalFooterDiv = this.createElement('div', {'class': 'modal-footer'}, modalContentDiv);
        // Cancle Button
        if(data.dialogType == 'confirm'){
            var modalFooterCancleBtn = this.createElement('button', {'type': 'button', 'class': 'btn btn-default', 'data-dismiss': 'modal'}, modalFooterDiv);
            modalFooterCancleBtn.innerHTML = this.Message.cancel;            
        }
        // Ok Button
        var modalFooterOkAttr = {'type': 'button', 'class': 'btn btn-primary', 'id': this.DialogInfo.okBtnId , 'style':'margin-bottom: 0px;'};
        if(data.dialogType == 'alert'){
            modalFooterOkAttr['data-dismiss'] = 'modal';
        }
        var modalFooterOkBtn = this.createElement('button', modalFooterOkAttr, modalFooterDiv);
        modalFooterOkBtn.innerHTML = this.Message.ok;
        /***************************************************************************/
        // Modal Default option Setting        
        var modalOption = {
            keyboard: false // ESC 키 눌렀을때 모달을 닫음
            ,backdrop: 'static' // 모달의 배경을 포함. 클릭 시 모달을 닫지 않을 시 'static'
            ,show: false // 초기화 시 모달을 보여줍니다.
        }
        // 사용자 지정 정보 설정
        $.extend(modalOption, data);
        
        // Jquery Dialog 변수 선언
        var dialog = $('#' + data.dialogId);
        
        // Bootstrap Modal Setting
        dialog.modal(modalOption)        
        
        // Modal의 hide가 완료된 이후 Event 실행
        dialog.on('hidden.bs.modal', function(e){
            // Modal Element 제거
            dialog.remove();
            if (data.focusObj != undefined){            	
            	data.focusObj.focus();
            }
            
        });
        
        // Confirm 일 경우 확인 버튼 클릭 이벤트 지정
        if(data.dialogType == 'confirm'){
            dialog.find(" #" + this.DialogInfo.okBtnId).on('click', function(){
                // ok button event function 실행
                if(data.ok && typeof(data.ok) === 'function'){
                    data.ok();
                }else{
                    console.warn('not function ok event. dialogId: ' + data.dialogId);
                }
                
                // Modal 창 닫기
                dialog.modal('hide');
                // click enevt 제거
                $(this).off('click');
            });    
        }
        
        // Modal Dialog Show
        dialog.modal('show');
    },        
    
    /**
    * Modal Dialog Show
    */
    show: function(type, data){
        if(!data){data = {};}
        data.dialogType = type ? type : 'alert';
        this.makeModalDialog(data);
    },
    
    /**
    * Alert Modal Dialog
    *
    * data: 
    *  title: Dialog Title Message
    *  content: Dialog Content Message
    *  closeBtn: Header Close Btn(x)
    *  
    */    
    alert: function(data){
        // data가 Object 가 아닌 경우 content 로 설정한다.
        if(typeof(data) != 'object'){
            var content = data;
            data = {content: content};
        }
        this.show('alert', data);
    },
    
    /**
    * Confirm Modal Dialog
    *
    * data: 
    *  title: Dialog Title Message
    *  content: Dialog Content Message
    *  ok: Ok Button Click Event function
    *  closeBtn: Header Close Btn(x)
    *  
    */
    confirm: function(data){
        this.show('confirm', data);
    }
};

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
	if (dateStr == ''){
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

/********************************************
 * Date Picker event 설정 From ~ To
 * *******************************************/
	var setDatePicker = function (fromNm, toNm){
		fromNm = "#"+fromNm;
		toNm = "#"+toNm;		
		if ($(fromNm).val() == null || $(fromNm).val() == ''){
			$(fromNm).val(getToday());
		}
		if ($(toNm).val() == null || $(toNm).val() == ''){
			$(fromNm).val("9999-12-31");
		}
		
		$(fromNm).datepicker().on('click', function(ev){
		    $(fromNm).datepicker('show');
		});
		$(fromNm).datepicker().on('changeDate', function(ev){                 
		    $(fromNm).datepicker('hide');
		});
		$(toNm).datepicker().on('click', function(ev){                 
			$(toNm).datepicker('show');		    
		});
		$(toNm).datepicker().on('changeDate', function(ev){                
		    $(toNm).datepicker('hide');
		});
		$(toNm).change(function() { 
			if($(fromNm).val().replace(/-/g, '') > $(toNm).val().replace(/-/g, '')){
		    	if($(fromNm).val().replace(/-/g, '') != ""){
		    		$(toNm).val("");
			    	Common.Dialog.alert({
			    		title:''
			            , content: '시작일자 클 수 없습니다.'
			        });
			    	
		    	}
		    }
		});
		
		$(fromNm).change(function() { 
			if($(fromNm).val().replace(/-/g, '') > $(toNm).val().replace(/-/g, '')){
		    	if($(toNm).val().replace(/-/g, '') != ""){
		    		$(fromNm).val("");
			    	Common.Dialog.alert({
			    		title:''
			            , content: '시작일자 클 수 없습니다.'
			        });
		    	}
		    }
		});
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
	******************************************************************************/	
	var setPaymentReqInfo = function(connumber, billType, channelgubun){
		//var queryString = $("form[name=iniPayForm").serialize();
		//test value
		//connumber = "51004434";
		//billType = "CARD"; //HPP, CARD			
		/*alert('connumber=='+connumber)
		alert('billType=='+billType)
		alert('channelgubun=='+channelgubun)*/
		var param = new Object();
		param.connumber = connumber;
		param.billType = billType;
		param.channelgubun = channelgubun;
		
		
					
		$.ajax({
			method:'post',
			url: '/payment/setPaymentReqInfo',
			//url: '/payment/setPaymentReqInfo/'+connumber+"/"+billType+"/"+channelgubun,
			data : param,					
			error: function(xhr, status, error){
				debugger;			
				var result = JSON.parse(xhr.responseText);
				alert(result.message);						
			},
			success : function(json){						
				if(json.resultCode == "00" || json.resultCode == "0000"){
					alert(json.resultCode)	
				}else{
					$("#iniPayDiv").remove();

					if (channelgubun =="MOBILE"){						
						$("#saleBody").append($('<div/>', {
							id: 'iniPayDiv'
						}));
						$("#iniPayDiv").append(json.iniPayForm);			
						$("#iniPayForm").submit();
					}else {
						
						$("#body-content").append($('<div/>', {
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
	var iniPayment = function(connumber, providernumber, invoicenumber, channelgubun){		
		var param = new Object();
		param.connumber = connumber;
		param.providernumber = providernumber;
		param.invoicenumber = invoicenumber;
		param.channelgubun = channelgubun;
		
		$("#channelgubun").remove();								
		 $("#body-content").append($('<input/>', {
		        id: 'channelgubun'
		        , value:channelgubun
		    }));
		 
		$.ajax({
			method:'post',
			data : param,
			url: '/payment/payProc',
			error: function(xhr, status, error){
				debugger;			
				var result = JSON.parse(xhr.responseText);
				alert(result.message);						
			},
			success : function(json){						
				alert(json.resultMsg);
				
				if(json.resultCode == "00" || json.resultCode == "0000"){
					if( channelgubun =="A"){ 
						//결제관리 > 결제대상조회 > 결제
						var currPage = $("#pagination>li.disabled").find('a').html();
						if (currPage == '' || currPage == '0'){
							currPage = 1;
						}							
						getData(currPage);
					}else if( channelgubun =="C"){ 
						//결제관리 > 고객결제내역 > 결제						
						var currPage = $("#paginationcustomer>li.disabled").find('a').html();	
						if (currPage == '' || currPage == '0'){
							currPage = 1;
						}		
						getCustomerData(currPage);
					}					
				}else{
				}
			}					
		})
	};
	
/****************************
 * commaNummer class
 * 
 * ************************/
$(document).ready(function() {
	$(document).ajaxStart(function(){
		$("#wait").css("display", "block");

    });
    $(document).ajaxComplete(function(){
        $("#wait").css("display", "none");
    });
    
});