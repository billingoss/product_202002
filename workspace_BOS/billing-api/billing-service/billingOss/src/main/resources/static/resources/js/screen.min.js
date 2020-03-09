$(function(){//msgFn - close
$("body").addClass(/* test 함수 */
function(t,s){return t+s}("msg_","hi")),
// 금액플로팅
$(window).scroll(function(){var t=$(document).scrollTop();t<143&&(t=143),$(".scroll_fixed").stop(),$(".scroll_fixed").addClass("fixed"),$(".scroll_fixed").animate({top:t})}),$(document).scroll(function(){}).on("click","#quickMenu .winTop",function(){$("html, body").animate({scrollTop:0},"slow")})}),$(document).ready(function(){function t(t){
///console.log('$this.val()', $this.val());
var s=!t.prop("disabled");""!=t.val()&&s?(t.siblings("button").css({display:"block"}),t.siblings("button").one("click",function(){t.val(""),t.siblings("button").css({display:"none"})})):t.siblings("button").css({display:"none"})}/* ie9 placeholder */
$("input, textarea").placeholder({customClass:"my-placeholder"}),$("body").on("keydown",".input_del input",function(){t($(this))}),$("body .input_del input").each(function(s){t($(this))}),/* 선택박스 */
$(".select2Basic").select2({minimumResultsForSearch:1/0}),
// 팝업 선택박스 index 높이기
$(".select2Basic_pop").select2({dropdownCssClass:"increasedzindexclass_pop",minimumResultsForSearch:1/0,width:"100%"}),/* datepicker(.datepicker-box) */
$(".js-datepicker").datepicker({dateFormat:"yy-mm-dd",dayNames:["S","M","T","W","T","F","S"]}),/* 일반 툴팁 */
$(".js-tooltip").tooltip({position:{my:"center bottom-15",at:"center top",using:function(t,s){$(this).css(t),$("<div>").addClass("arrow").addClass(s.vertical).addClass(s.horizontal).appendTo(this)}}}),//.tooltip( "open" );
/* 길설명 툴팁 */
$(".js-tooltip_sendstate").tooltip({position:{my:"center bottom-10",at:"center top",using:function(t,s){$(this).css(t),$("<div>").addClass("arrow").addClass(s.vertical).addClass(s.horizontal).appendTo(this)}},tooltipClass:"tooltip_big",items:"img, [data-geo], [title]",content:function(){var t=$(this),s=$(this).attr("data-geo");return t.is("[data-geo]")?($(".ui-tooltip").css({"max-width":"500px;"}),$(s).html()):t.is("[title]")?t.attr("title"):t.is("img")?t.attr("alt"):void 0}}),//.tooltip( "open" );       
//리스트테이블 input 선택시
$(".table_list td .trp.radio-box").click(function(){$(".table_list tr").each(function(){$(this).removeClass("selected")}),$(this).parents("tr").toggleClass("selected")}),
// $('.table_list td .trp.checkbox-box').click(function(){
//     $(this).parents('tr').toggleClass('selected');
// });
//정렬화살표
$(".align_icon").click(function(){$(this).toggleClass("on")})});
//# sourceMappingURL=maps/screen.min.js.map
