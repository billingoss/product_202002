
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
			return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
		}else {
			//return text.replace(text);
		}
	});
}

function formatPhone(){
	$('.phone').text(function(i, text) {
		if(text.length == 11){
			return text.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
		}else if(text.length == 10){
			return text.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
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
                if (xlsxflag) {  
                    var workbook = XLSX.read(data, { type: 'binary' });  
                }  
                else {  
                    var workbook = XLS.read(data, { type: 'binary' });  
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
            if (xlsxflag) {
                reader.readAsArrayBuffer($(inputid)[0].files[0]);  
            }  
            else {  
                reader.readAsBinaryString($(inputid)[0].files[0]);  
            }  
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
 * function : fnExcelReport -> excel-download
 * input : tableid : table id
 ********************************/

function fnExcelReport(tableid)
{
    var tab_text = '<table border="1px" style="font-size:20px" ">';
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
        sa = excelDownCommFrame.document.execCommand("SaveAs", true, "DataTableExport.xls");
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