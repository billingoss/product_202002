$(function(){//msgFn - close
$("body").addClass(/* test 함수 */
function(n,i){return n+i}("msg_","hi"))}),$(document).ready(function(){function n(n){
///console.log('$this.val()', $this.val());
var i=!n.prop("disabled");""!=n.val()&&i?(n.siblings("button").css({display:"block"}),n.siblings("button").one("click",function(){n.val(""),n.siblings("button").css({display:"none"})})):n.siblings("button").css({display:"none"})}/* ie9 placeholder */
$("input, textarea").placeholder({customClass:"my-placeholder"}),$("body").on("keydown",".input_del input",function(){n($(this))}),$("body .input_del input").each(function(i){n($(this))})});
//# sourceMappingURL=maps/screen.min.js.map
