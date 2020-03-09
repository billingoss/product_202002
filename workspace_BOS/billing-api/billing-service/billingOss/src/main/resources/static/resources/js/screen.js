$(function(){
    console.log("common.js"); 

    /* test 함수 */
    function msgFn(msg1, msg2){
        var _msg = msg1 + msg2; 
        return _msg; 
    }//msgFn - close
    $("body").addClass( msgFn("msg_","hi") );
    

    // 금액플로팅
	$(window).scroll(function(){
		var scrollTop = $(document).scrollTop();
		var tTop = 143;
		if (scrollTop < tTop) {
				scrollTop = tTop;
		}
		$(".scroll_fixed").stop();
		$(".scroll_fixed").addClass('fixed');
		$(".scroll_fixed").animate( { "top" : scrollTop });
	});
	$(document).scroll(function() {
			//btn_mv_up('#rightQuick .winTop');
		}).on('click', '#quickMenu .winTop', function() {
			$("html, body").animate({scrollTop:0}, 'slow');
	});
    
});

;$(document).ready(function () {  
    console.log("form2.js"); 
     
    /* ie9 placeholder */
    $('input, textarea').placeholder({customClass:'my-placeholder'});
    
    
    function inputdel_fn($this) {
        ///console.log('$this.val()', $this.val());
        var _noneDisable = !$this.prop("disabled");
        if( $this.val() != "" && _noneDisable){
            $this.siblings("button").css({display:"block"});
            $this.siblings("button").one("click", function(){
                $this.val("");
                $this.siblings("button").css({display:"none"});
            });
        }else{
            $this.siblings("button").css({display:"none"});
        }
    }
    $("body").on("keydown", ".input_del input", function(){
        inputdel_fn( $(this) );
    });
    $("body .input_del input").each(function($i){
        inputdel_fn( $(this) );
    });


    /* 선택박스 */
    $(".select2Basic").select2({
        minimumResultsForSearch: Infinity,
        /*theme: "basic"*/
    });
    // 팝업 선택박스 index 높이기
    $(".select2Basic_pop").select2({   
        dropdownCssClass : 'increasedzindexclass_pop',
        minimumResultsForSearch: Infinity,
        width:"100%"
    });
    
    /* datepicker(.datepicker-box) */
    $(".js-datepicker").datepicker({ 
        dateFormat: "yy-mm-dd", 
        dayNames: ["S","M","T","W","T","F","S"]
    });
            
    /* 일반 툴팁 */
    $(".js-tooltip").tooltip({ 
        position: { 
            my: "center bottom-15",
            at: "center top",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" ).addClass( "arrow" ).addClass( feedback.vertical ).addClass( feedback.horizontal ).appendTo( this );
            }
        }
    });//.tooltip( "open" );

    
    /* 길설명 툴팁 */
    $(".js-tooltip_sendstate").tooltip({ 
        position: { 
            my: "center bottom-10",
            at: "center top",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" ).addClass( "arrow" ).addClass( feedback.vertical ).addClass( feedback.horizontal ).appendTo( this );
            }
        },
        tooltipClass:"tooltip_big",
        items: "img, [data-geo], [title]",
        content: function() {
            var element = $( this );
            var selcet = $( this ).attr("data-geo");
            if ( element.is( "[data-geo]" ) ) {
                $(".ui-tooltip").css({"max-width":"500px;" });
                return $(selcet).html();
            }
            if ( element.is( "[title]" ) ) {
                return element.attr( "title" );
            }
            if ( element.is( "img" ) ) {
                return element.attr( "alt" );
            }
        }   
    });//.tooltip( "open" );       

    //리스트테이블 input 선택시
    $('.table_list td .trp.radio-box').click(function(){
        $(".table_list tr").each(function(){
            $(this).removeClass("selected");
        });
        $(this).parents('tr').toggleClass('selected');
    });

    // $('.table_list td .trp.checkbox-box').click(function(){
    //     $(this).parents('tr').toggleClass('selected');
    // });

    //정렬화살표
    $('.align_icon'). click(function(){
        $(this).toggleClass('on');
    });

    
    // $("body").on("change", ".table_list input", function () {
    //     var _true2 =  $(this).closest("dd").find(".js-counselling2 input").prop("checked");
    //     $(this).closest("dd").find(".counselling_msg").hide();
    //     if ( _true2 ){
    //         $(this).closest("dd").find(".counselling_msg").show();
    //     }
        

});


//# sourceMappingURL=maps/screen.js.map
