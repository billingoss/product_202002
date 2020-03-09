/*! jQuery UI - v1.12.1 - 2016-09-14
* http://jqueryui.com
* Includes: widget.js, position.js, data.js, disable-selection.js, effect.js, effects/effect-blind.js, effects/effect-bounce.js, effects/effect-clip.js, effects/effect-drop.js, effects/effect-explode.js, effects/effect-fade.js, effects/effect-fold.js, effects/effect-highlight.js, effects/effect-puff.js, effects/effect-pulsate.js, effects/effect-scale.js, effects/effect-shake.js, effects/effect-size.js, effects/effect-slide.js, effects/effect-transfer.js, focusable.js, form-reset-mixin.js, jquery-1-7.js, keycode.js, labels.js, scroll-parent.js, tabbable.js, unique-id.js, widgets/accordion.js, widgets/autocomplete.js, widgets/button.js, widgets/checkboxradio.js, widgets/controlgroup.js, widgets/datepicker.js, widgets/dialog.js, widgets/draggable.js, widgets/droppable.js, widgets/menu.js, widgets/mouse.js, widgets/progressbar.js, widgets/resizable.js, widgets/selectable.js, widgets/selectmenu.js, widgets/slider.js, widgets/sortable.js, widgets/spinner.js, widgets/tabs.js, widgets/tooltip.js
* Copyright jQuery Foundation and other contributors; Licensed MIT */
/** ==================== 쿠키관련 ==================== **/
/**
	*	trpSetCookie : 쿠키세팅
	*	cName		: 쿠키이름
	*	cValue		: 쿠키값
	*	cDay		: 날짜 1일단위
	*/
function trpSetCookie(e,t,i){var s=new Date;s.setDate(s.getDate()+i),// 현재 날짜+팝업을 안열을 일수
cookies=e+"="+escape(t)+"; path=/ ",// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
void 0!==i&&(cookies+=";expires="+s.toGMTString()+";"),// 쿠키 지속시간 설정( toUTCString )
document.cookie=cookies}/**
	*	trpGetCookie : 쿠키값 가져오기
	*	cName		: 쿠키이름
	*	return		: 쿠키값
	*/
function trpGetCookie(e){e+="=";var t=document.cookie,i=t.indexOf(e),s="";if(-1!=i){i+=e.length;var n=t.indexOf(";",i);-1==n&&(n=t.length),s=t.substring(i,n)}return unescape(s)}/**
 * @example
 * trpNumReturn()
 *
 * 
 * trpNumReturn		                : 숫자 값이 있는지를 판단하여 값이없으면 기본값(0)을 리턴한다.
 * @param {Number}  [$val=0]		: 숫자 값변수	   (필수)
 * @param {Number}$default          : 기본값 세팅	   (선택)
 * @returns {Number}                : 가본값을 던지면 기본값으로, 
 */
function trpNumReturn(e,t){return void 0==e&&(e=0,t&&(e=t)),e}/**
 * trpStrReturn		: 문자 값이 있는지를 판단하여 값이없으면 기본값("")을 리턴한다.
 * @param $val		: 문자 값변수   (필수)
 * @param $default  : 기본값 세팅   (선택)
 */
function trpStrReturn(e,t){return void 0==e&&(e="",t&&(e=t)),e}/**
* trpNumCommas			:  숫사 컴마 숫자를 넣으면 3자리수마다 "," 있는 문자열을 리턴
* @param {String} $x	: 문자 값변수   (필수)
*/
function trpNumCommas(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}/**
* trpNumberFormat		: 숫자를 넣으면 3자리수마다 "," 있는 문자열을 리턴
*  @param {String} $num	: 문자 값변수   (필수)
*/
function trpNumberFormat(e){for(var t=e.replace(/,/g,""),i=t.toString(),s="",n=0;n<i.length;n++){var a=i.length-(n+1);n%3==0&&0!=n&&(s=","+s),s=i.charAt(a)+s}return s}/** 
 * trpRangeRatio			:  참고값을 비레해 타겟값을 추출
 *			$rMin 값과 $rMax 값의 $rTar 위치를 비율을    $tMin 값과 $tMax 값의 에서 같은 비율로 찾아줍니다.
 * 			
 * @param	$rMin			: Refer 참고 최소 값		
 * @param	$rMax			: Refer 참고 최대 값	
 * @param	$rTar			: Refer 참고 변화 값
 * @param	$tMin			: target타겟 최소값
 * @param	$tMax			: target타겟 최대값 
 * @return					: 참고값을 비레해 타겟값을 추출; 
 */
function trpRangeRatio(e,t,i,s,n){var a,o=t-e,r=i-e,l=n-s;// 퍼센테지	== 100% => 1.0
// target타겟 최대값 
//rPer = Math.abs(rTar) / rMax  // 퍼센테지	== 100% => 1.0
return a=r/o,l*a+s}function trpUtilityChangeOnceFN(e,t){
//console.log( trpUtilityChangeOnce_newVal + " :  " + trpUtilityChangeOnce_oldVal)
(trpUtilityChangeOnce_newVal=e)!=trpUtilityChangeOnce_oldVal&&(t(trpUtilityChangeOnce_newVal),trpUtilityChangeOnce_oldVal=trpUtilityChangeOnce_newVal)}// end fn
/**
*  trpClassBubbleCheck : 클릭 이벤트로 타겟 대상의 부모클래스가 있는지를 체크
*  @param	{String}   $classNmae	
*  @param	{function} $activeFn(boolean)
*/
function trpClassBubbleCheck(e,t){$(document).on("click",function(i){var s=!1;s=!!$(i.target).closest(e).length,t(s)})}!function(e){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module.
define(["jquery"],e):
// Browser globals
e(jQuery)}(function(e){
// Support: IE 8 only
// IE 8 doesn't resolve inherit to visible/hidden for computed values
function t(e){for(var t=e.css("visibility");"inherit"===t;)e=e.parent(),t=e.css("visibility");return"hidden"!==t}function i(e){for(var t,i;e.length&&e[0]!==document;){if(("absolute"===(
// Ignore z-index if position is set to a value where z-index is ignored by the browser
// This makes behavior of this function consistent across browsers
// WebKit always returns auto if the element is positioned
t=e.css("position"))||"relative"===t||"fixed"===t)&&(
// IE returns 0 when zIndex is not specified
// other browsers return a string
// we ignore the case of nested elements with an explicit value of 0
// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
i=parseInt(e.css("zIndex"),10),!isNaN(i)&&0!==i))return i;e=e.parent()}return 0}/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */
function s(){this._curInst=null,// The current instance in use
this._keyEvent=!1,// If the last event was a key event
this._disabledInputs=[],// List of date picker inputs that have been disabled
this._datepickerShowing=!1,// True if the popup picker is showing , false if not
this._inDialog=!1,// True if showing within a "dialog", false if not
this._mainDivId="ui-datepicker-div",// The ID of the main datepicker division
this._inlineClass="ui-datepicker-inline",// The name of the inline marker class
this._appendClass="ui-datepicker-append",// The name of the append marker class
this._triggerClass="ui-datepicker-trigger",// The name of the trigger marker class
this._dialogClass="ui-datepicker-dialog",// The name of the dialog marker class
this._disableClass="ui-datepicker-disabled",// The name of the disabled covering marker class
this._unselectableClass="ui-datepicker-unselectable",// The name of the unselectable cell marker class
this._currentClass="ui-datepicker-current-day",// The name of the current day marker class
this._dayOverClass="ui-datepicker-days-cell-over",// The name of the day hover marker class
this.regional=[],// Available regional settings, indexed by language code
this.regional[""]={// Default regional settings
closeText:"Done",// Display text for close link
prevText:"Prev",// Display text for previous month link
nextText:"Next",// Display text for next month link
currentText:"Today",// Display text for current month link
monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],// Names of months for drop-down and formatting
monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],// For formatting
dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],// For formatting
dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],// For formatting
dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],// Column headings for days starting at Sunday
weekHeader:"Wk",// Column header for week of the year
dateFormat:"mm/dd/yy",// See format options on parseDate
firstDay:0,// The first day of the week, Sun = 0, Mon = 1, ...
isRTL:!1,// True if right-to-left language, false if left-to-right
showMonthAfterYear:!1,// True if the year select precedes month, false for month then year
yearSuffix:""},this._defaults={// Global defaults for all the date picker instances
showOn:"focus",// "focus" for popup on focus,
// "button" for trigger button, or "both" for either
showAnim:"fadeIn",// Name of jQuery animation for popup
showOptions:{},// Options for enhanced animations
defaultDate:null,// Used when field is blank: actual date,
// +/-number for offset from today, null for today
appendText:"",// Display text following the input box, e.g. showing the format
buttonText:"...",// Text for trigger button
buttonImage:"",// URL for trigger button image
buttonImageOnly:!1,// True if the image appears alone, false if it appears on a button
hideIfNoPrevNext:!1,// True to hide next/previous month links
// if not applicable, false to just disable them
navigationAsDateFormat:!1,// True if date formatting applied to prev/today/next links
gotoCurrent:!1,// True if today link goes back to current selection instead
changeMonth:!1,// True if month can be selected directly, false if only prev/next
changeYear:!1,// True if year can be selected directly, false if only prev/next
yearRange:"c-10:c+10",// Range of years to display in drop-down,
// either relative to today's year (-nn:+nn), relative to currently displayed year
// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
showOtherMonths:!1,// True to show dates in other months, false to leave blank
selectOtherMonths:!1,// True to allow selection of dates in other months, false for unselectable
showWeek:!1,// True to show week of the year, false to not show it
calculateWeek:this.iso8601Week,// How to calculate the week of the year,
// takes a Date and returns the number of the week for it
shortYearCutoff:"+10",// Short year values < this are in the current century,
// > this are in the previous century,
// string value starting with "+" for current year + value
minDate:null,// The earliest selectable date, or null for no limit
maxDate:null,// The latest selectable date, or null for no limit
duration:"fast",// Duration of display/closure
beforeShowDay:null,// Function that takes a date and returns an array with
// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
// [2] = cell title (optional), e.g. $.datepicker.noWeekends
beforeShow:null,// Function that takes an input field and
// returns a set of custom settings for the date picker
onSelect:null,// Define a callback function when a date is selected
onChangeMonthYear:null,// Define a callback function when the month or year is changed
onClose:null,// Define a callback function when the datepicker is closed
numberOfMonths:1,// Number of months to show at a time
showCurrentAtPos:0,// The position in multipe months at which to show the current month (starting at 0)
stepMonths:1,// Number of months to step back/forward
stepBigMonths:12,// Number of months to step back/forward for the big links
altField:"",// Selector for an alternate field to store selected dates into
altFormat:"",// The date format to use for the alternate field
constrainInput:!0,// The input is constrained by the current date format
showButtonPanel:!1,// True to show button panel, false to not show it
autoSize:!1,// True to size the input for the date format, false to leave as is
disabled:!1},e.extend(this._defaults,this.regional[""]),this.regional.en=e.extend(!0,{},this.regional[""]),this.regional["en-US"]=e.extend(!0,{},this.regional.en),this.dpDiv=n(e("<div id='"+this._mainDivId+"' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))}/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function n(t){var i="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return t.on("mouseout",i,function(){e(this).removeClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).removeClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).removeClass("ui-datepicker-next-hover")}).on("mouseover",i,a)}function a(){e.datepicker._isDisabledDatepicker(p.inline?p.dpDiv.parent()[0]:p.input[0])||(e(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),e(this).addClass("ui-state-hover"),-1!==this.className.indexOf("ui-datepicker-prev")&&e(this).addClass("ui-datepicker-prev-hover"),-1!==this.className.indexOf("ui-datepicker-next")&&e(this).addClass("ui-datepicker-next-hover"))}/* jQuery extend now ignores nulls! */
function o(t,i){e.extend(t,i);for(var s in i)null==i[s]&&(t[s]=i[s]);return t}/*!
 * jQuery UI Spinner 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Spinner
//>>group: Widgets
//>>description: Displays buttons to easily input numbers via the keyboard or mouse.
//>>docs: http://api.jqueryui.com/spinner/
//>>demos: http://jqueryui.com/spinner/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/spinner.css
//>>css.theme: ../../themes/base/theme.css
function r(e){return function(){var t=this.element.val();e.apply(this,arguments),this._refresh(),t!==this.element.val()&&this._trigger("change")}}e.ui=e.ui||{};var l=(e.ui.version="1.12.1",0),h=Array.prototype.slice;e.cleanData=function(t){return function(i){var s,n,a;for(a=0;null!=(n=i[a]);a++)try{
// Only trigger remove when necessary to save time
s=e._data(n,"events"),s&&s.remove&&e(n).triggerHandler("remove")}catch(e){}t(i)}}(e.cleanData),e.widget=function(t,i,s){var n,a,o,r={},l=t.split(".")[0];t=t.split(".")[1];var h=l+"-"+t;
// Create selector for plugin
// Extend with the existing constructor to carry over any static properties
// We need to make the options hash a property directly on the new instance
// otherwise we'll modify the options hash on the prototype that we're
// inheriting from
// If this widget is being redefined then we need to find all widgets that
// are inheriting from it and redefine all of them so that they inherit from
// the new version of this widget. We're essentially trying to replace one
// level in the prototype chain.
// Remove the list of existing child constructors from the old constructor
// so the old child constructors can be garbage collected
return s||(s=i,i=e.Widget),e.isArray(s)&&(s=e.extend.apply(null,[{}].concat(s))),e.expr[":"][h.toLowerCase()]=function(t){return!!e.data(t,h)},e[l]=e[l]||{},n=e[l][t],a=e[l][t]=function(e,t){
// Allow instantiation without "new" keyword
if(!this._createWidget)return new a(e,t);
// Allow instantiation without initializing for simple inheritance
// must use "new" keyword (the code above always passes args)
arguments.length&&this._createWidget(e,t)},e.extend(a,n,{version:s.version,
// Copy the object used to create the prototype in case we need to
// redefine the widget later
_proto:e.extend({},s),
// Track widgets that inherit from this widget in case this widget is
// redefined after a widget inherits from it
_childConstructors:[]}),o=new i,o.options=e.widget.extend({},o.options),e.each(s,function(t,s){if(!e.isFunction(s))return void(r[t]=s);r[t]=function(){function e(){return i.prototype[t].apply(this,arguments)}function n(e){return i.prototype[t].apply(this,e)}return function(){var t,i=this._super,a=this._superApply;return this._super=e,this._superApply=n,t=s.apply(this,arguments),this._super=i,this._superApply=a,t}}()}),a.prototype=e.widget.extend(o,{
// TODO: remove support for widgetEventPrefix
// always use the name + a colon as the prefix, e.g., draggable:start
// don't prefix for widgets that aren't DOM-based
widgetEventPrefix:n?o.widgetEventPrefix||t:t},r,{constructor:a,namespace:l,widgetName:t,widgetFullName:h}),n?(e.each(n._childConstructors,function(t,i){var s=i.prototype;
// Redefine the child widget using the same prototype that was
// originally used, but inherit from the new version of the base
e.widget(s.namespace+"."+s.widgetName,a,i._proto)}),delete n._childConstructors):i._childConstructors.push(a),e.widget.bridge(t,a),a},e.widget.extend=function(t){for(var i,s,n=h.call(arguments,1),a=0,o=n.length;a<o;a++)for(i in n[a])s=n[a][i],n[a].hasOwnProperty(i)&&void 0!==s&&(
// Clone objects
e.isPlainObject(s)?t[i]=e.isPlainObject(t[i])?e.widget.extend({},t[i],s):
// Don't extend strings, arrays, etc. with objects
e.widget.extend({},s):t[i]=s);return t},e.widget.bridge=function(t,i){var s=i.prototype.widgetFullName||t;e.fn[t]=function(n){var a="string"==typeof n,o=h.call(arguments,1),r=this;
// If this is an empty collection, we need to have the instance method
// return undefined instead of the jQuery instance
// Allow multiple hashes to be passed on init
return a?this.length||"instance"!==n?this.each(function(){var i,a=e.data(this,s);return"instance"===n?(r=a,!1):a?e.isFunction(a[n])&&"_"!==n.charAt(0)?(i=a[n].apply(a,o),i!==a&&void 0!==i?(r=i&&i.jquery?r.pushStack(i.get()):i,!1):void 0):e.error("no such method '"+n+"' for "+t+" widget instance"):e.error("cannot call methods on "+t+" prior to initialization; attempted to call method '"+n+"'")}):r=void 0:(o.length&&(n=e.widget.extend.apply(null,[n].concat(o))),this.each(function(){var t=e.data(this,s);t?(t.option(n||{}),t._init&&t._init()):e.data(this,s,new i(n,this))})),r}},e.Widget=function(){},e.Widget._childConstructors=[],e.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{classes:{},disabled:!1,
// Callbacks
create:null},_createWidget:function(t,i){i=e(i||this.defaultElement||this)[0],this.element=e(i),this.uuid=l++,this.eventNamespace="."+this.widgetName+this.uuid,this.bindings=e(),this.hoverable=e(),this.focusable=e(),this.classesElementLookup={},i!==this&&(e.data(i,this.widgetFullName,this),this._on(!0,this.element,{remove:function(e){e.target===i&&this.destroy()}}),this.document=e(i.style?
// Element within the document
i.ownerDocument:
// Element is window or document
i.document||i),this.window=e(this.document[0].defaultView||this.document[0].parentWindow)),this.options=e.widget.extend({},this.options,this._getCreateOptions(),t),this._create(),this.options.disabled&&this._setOptionDisabled(this.options.disabled),this._trigger("create",null,this._getCreateEventData()),this._init()},_getCreateOptions:function(){return{}},_getCreateEventData:e.noop,_create:e.noop,_init:e.noop,destroy:function(){var t=this;this._destroy(),e.each(this.classesElementLookup,function(e,i){t._removeClass(i,e)}),
// We can probably remove the unbind calls in 2.0
// all event bindings should go through this._on()
this.element.off(this.eventNamespace).removeData(this.widgetFullName),this.widget().off(this.eventNamespace).removeAttr("aria-disabled"),
// Clean up events and states
this.bindings.off(this.eventNamespace)},_destroy:e.noop,widget:function(){return this.element},option:function(t,i){var s,n,a,o=t;if(0===arguments.length)
// Don't return a reference to the internal hash
return e.widget.extend({},this.options);if("string"==typeof t)if(
// Handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
o={},s=t.split("."),t=s.shift(),s.length){for(n=o[t]=e.widget.extend({},this.options[t]),a=0;a<s.length-1;a++)n[s[a]]=n[s[a]]||{},n=n[s[a]];if(t=s.pop(),1===arguments.length)return void 0===n[t]?null:n[t];n[t]=i}else{if(1===arguments.length)return void 0===this.options[t]?null:this.options[t];o[t]=i}return this._setOptions(o),this},_setOptions:function(e){var t;for(t in e)this._setOption(t,e[t]);return this},_setOption:function(e,t){return"classes"===e&&this._setOptionClasses(t),this.options[e]=t,"disabled"===e&&this._setOptionDisabled(t),this},_setOptionClasses:function(t){var i,s,n;for(i in t)n=this.classesElementLookup[i],t[i]!==this.options.classes[i]&&n&&n.length&&(
// We are doing this to create a new jQuery object because the _removeClass() call
// on the next line is going to destroy the reference to the current elements being
// tracked. We need to save a copy of this collection so that we can add the new classes
// below.
s=e(n.get()),this._removeClass(n,i),
// We don't use _addClass() here, because that uses this.options.classes
// for generating the string of classes. We want to use the value passed in from
// _setOption(), this is the new value of the classes option which was passed to
// _setOption(). We pass this value directly to _classes().
s.addClass(this._classes({element:s,keys:i,classes:t,add:!0})))},_setOptionDisabled:function(e){this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!!e),
// If the widget is becoming disabled, then nothing is interactive
e&&(this._removeClass(this.hoverable,null,"ui-state-hover"),this._removeClass(this.focusable,null,"ui-state-focus"))},enable:function(){return this._setOptions({disabled:!1})},disable:function(){return this._setOptions({disabled:!0})},_classes:function(t){function i(i,a){var o,r;for(r=0;r<i.length;r++)o=n.classesElementLookup[i[r]]||e(),o=e(t.add?e.unique(o.get().concat(t.element.get())):o.not(t.element).get()),n.classesElementLookup[i[r]]=o,s.push(i[r]),a&&t.classes[i[r]]&&s.push(t.classes[i[r]])}var s=[],n=this;return t=e.extend({element:this.element,classes:this.options.classes||{}},t),this._on(t.element,{remove:"_untrackClassesElement"}),t.keys&&i(t.keys.match(/\S+/g)||[],!0),t.extra&&i(t.extra.match(/\S+/g)||[]),s.join(" ")},_untrackClassesElement:function(t){var i=this;e.each(i.classesElementLookup,function(s,n){-1!==e.inArray(t.target,n)&&(i.classesElementLookup[s]=e(n.not(t.target).get()))})},_removeClass:function(e,t,i){return this._toggleClass(e,t,i,!1)},_addClass:function(e,t,i){return this._toggleClass(e,t,i,!0)},_toggleClass:function(e,t,i,s){s="boolean"==typeof s?s:i;var n="string"==typeof e||null===e,a={extra:n?t:i,keys:n?e:t,element:n?this.element:e,add:s};return a.element.toggleClass(this._classes(a),s),this},_on:function(t,i,s){var n,a=this;
// No suppressDisabledCheck flag, shuffle arguments
"boolean"!=typeof t&&(s=i,i=t,t=!1),
// No element argument, shuffle and use this.element
s?(i=n=e(i),this.bindings=this.bindings.add(i)):(s=i,i=this.element,n=this.widget()),e.each(s,function(s,o){function r(){
// Allow widgets to customize the disabled handling
// - disabled as an array instead of boolean
// - disabled class as method for disabling individual parts
if(t||!0!==a.options.disabled&&!e(this).hasClass("ui-state-disabled"))return("string"==typeof o?a[o]:o).apply(a,arguments)}
// Copy the guid so direct unbinding works
"string"!=typeof o&&(r.guid=o.guid=o.guid||r.guid||e.guid++);var l=s.match(/^([\w:-]*)\s*(.*)$/),h=l[1]+a.eventNamespace,c=l[2];c?n.on(h,c,r):i.on(h,r)})},_off:function(t,i){i=(i||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace,t.off(i).off(i),
// Clear the stack to avoid memory leaks (#10056)
this.bindings=e(this.bindings.not(t).get()),this.focusable=e(this.focusable.not(t).get()),this.hoverable=e(this.hoverable.not(t).get())},_delay:function(e,t){function i(){return("string"==typeof e?s[e]:e).apply(s,arguments)}var s=this;return setTimeout(i,t||0)},_hoverable:function(t){this.hoverable=this.hoverable.add(t),this._on(t,{mouseenter:function(t){this._addClass(e(t.currentTarget),null,"ui-state-hover")},mouseleave:function(t){this._removeClass(e(t.currentTarget),null,"ui-state-hover")}})},_focusable:function(t){this.focusable=this.focusable.add(t),this._on(t,{focusin:function(t){this._addClass(e(t.currentTarget),null,"ui-state-focus")},focusout:function(t){this._removeClass(e(t.currentTarget),null,"ui-state-focus")}})},_trigger:function(t,i,s){var n,a,o=this.options[t];if(s=s||{},i=e.Event(i),i.type=(t===this.widgetEventPrefix?t:this.widgetEventPrefix+t).toLowerCase(),
// The original event may come from any element
// so we need to reset the target on the new event
i.target=this.element[0],
// Copy original event properties over to the new event
a=i.originalEvent)for(n in a)n in i||(i[n]=a[n]);return this.element.trigger(i,s),!(e.isFunction(o)&&!1===o.apply(this.element[0],[i].concat(s))||i.isDefaultPrevented())}},e.each({show:"fadeIn",hide:"fadeOut"},function(t,i){e.Widget.prototype["_"+t]=function(s,n,a){"string"==typeof n&&(n={effect:n});var o,r=n?!0===n||"number"==typeof n?i:n.effect||i:t;n=n||{},"number"==typeof n&&(n={duration:n}),o=!e.isEmptyObject(n),n.complete=a,n.delay&&s.delay(n.delay),o&&e.effects&&e.effects.effect[r]?s[t](n):r!==t&&s[r]?s[r](n.duration,n.easing,a):s.queue(function(i){e(this)[t](),a&&a.call(s[0]),i()})}});e.widget;/*!
 * jQuery UI Position 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */
//>>label: Position
//>>group: Core
//>>description: Positions elements relative to other elements.
//>>docs: http://api.jqueryui.com/position/
//>>demos: http://jqueryui.com/position/
!function(){function t(e,t,i){return[parseFloat(e[0])*(u.test(e[0])?t/100:1),parseFloat(e[1])*(u.test(e[1])?i/100:1)]}function i(t,i){return parseInt(e.css(t,i),10)||0}function s(t){var i=t[0];return 9===i.nodeType?{width:t.width(),height:t.height(),offset:{top:0,left:0}}:e.isWindow(i)?{width:t.width(),height:t.height(),offset:{top:t.scrollTop(),left:t.scrollLeft()}}:i.preventDefault?{width:0,height:0,offset:{top:i.pageY,left:i.pageX}}:{width:t.outerWidth(),height:t.outerHeight(),offset:t.offset()}}var n,a=Math.max,o=Math.abs,r=/left|center|right/,l=/top|center|bottom/,h=/[\+\-]\d+(\.[\d]+)?%?/,c=/^\w+/,u=/%$/,d=e.fn.position;e.position={scrollbarWidth:function(){if(void 0!==n)return n;var t,i,s=e("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),a=s.children()[0];return e("body").append(s),t=a.offsetWidth,s.css("overflow","scroll"),i=a.offsetWidth,t===i&&(i=s[0].clientWidth),s.remove(),n=t-i},getScrollInfo:function(t){var i=t.isWindow||t.isDocument?"":t.element.css("overflow-x"),s=t.isWindow||t.isDocument?"":t.element.css("overflow-y"),n="scroll"===i||"auto"===i&&t.width<t.element[0].scrollWidth;return{width:"scroll"===s||"auto"===s&&t.height<t.element[0].scrollHeight?e.position.scrollbarWidth():0,height:n?e.position.scrollbarWidth():0}},getWithinInfo:function(t){var i=e(t||window),s=e.isWindow(i[0]),n=!!i[0]&&9===i[0].nodeType;return{element:i,isWindow:s,isDocument:n,offset:s||n?{left:0,top:0}:e(t).offset(),scrollLeft:i.scrollLeft(),scrollTop:i.scrollTop(),width:i.outerWidth(),height:i.outerHeight()}}},e.fn.position=function(n){if(!n||!n.of)return d.apply(this,arguments);
// Make a copy, we don't want to modify arguments
n=e.extend({},n);var u,p,f,m,g,v,_=e(n.of),b=e.position.getWithinInfo(n.within),w=e.position.getScrollInfo(b),y=(n.collision||"flip").split(" "),x={};
// Force left top to allow flipping
// Clone to reuse original targetOffset later
// Force my and at to have valid horizontal and vertical positions
// if a value is missing or invalid, it will be converted to center
// Normalize collision option
return v=s(_),_[0].preventDefault&&(n.at="left top"),p=v.width,f=v.height,m=v.offset,g=e.extend({},m),e.each(["my","at"],function(){var e,t,i=(n[this]||"").split(" ");1===i.length&&(i=r.test(i[0])?i.concat(["center"]):l.test(i[0])?["center"].concat(i):["center","center"]),i[0]=r.test(i[0])?i[0]:"center",i[1]=l.test(i[1])?i[1]:"center",
// Calculate offsets
e=h.exec(i[0]),t=h.exec(i[1]),x[this]=[e?e[0]:0,t?t[0]:0],
// Reduce to just the positions without the offsets
n[this]=[c.exec(i[0])[0],c.exec(i[1])[0]]}),1===y.length&&(y[1]=y[0]),"right"===n.at[0]?g.left+=p:"center"===n.at[0]&&(g.left+=p/2),"bottom"===n.at[1]?g.top+=f:"center"===n.at[1]&&(g.top+=f/2),u=t(x.at,p,f),g.left+=u[0],g.top+=u[1],this.each(function(){var s,r,l=e(this),h=l.outerWidth(),c=l.outerHeight(),d=i(this,"marginLeft"),v=i(this,"marginTop"),C=h+d+i(this,"marginRight")+w.width,S=c+v+i(this,"marginBottom")+w.height,k=e.extend({},g),T=t(x.my,l.outerWidth(),l.outerHeight());"right"===n.my[0]?k.left-=h:"center"===n.my[0]&&(k.left-=h/2),"bottom"===n.my[1]?k.top-=c:"center"===n.my[1]&&(k.top-=c/2),k.left+=T[0],k.top+=T[1],s={marginLeft:d,marginTop:v},e.each(["left","top"],function(t,i){e.ui.position[y[t]]&&e.ui.position[y[t]][i](k,{targetWidth:p,targetHeight:f,elemWidth:h,elemHeight:c,collisionPosition:s,collisionWidth:C,collisionHeight:S,offset:[u[0]+T[0],u[1]+T[1]],my:n.my,at:n.at,within:b,elem:l})}),n.using&&(
// Adds feedback as second argument to using callback, if present
r=function(e){var t=m.left-k.left,i=t+p-h,s=m.top-k.top,r=s+f-c,u={target:{element:_,left:m.left,top:m.top,width:p,height:f},element:{element:l,left:k.left,top:k.top,width:h,height:c},horizontal:i<0?"left":t>0?"right":"center",vertical:r<0?"top":s>0?"bottom":"middle"};p<h&&o(t+i)<p&&(u.horizontal="center"),f<c&&o(s+r)<f&&(u.vertical="middle"),a(o(t),o(i))>a(o(s),o(r))?u.important="horizontal":u.important="vertical",n.using.call(this,e,u)}),l.offset(e.extend(k,{using:r}))})},e.ui.position={fit:{left:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollLeft:s.offset.left,o=s.width,r=e.left-t.collisionPosition.marginLeft,l=n-r,h=r+t.collisionWidth-o-n;
// Element is wider than within
t.collisionWidth>o?
// Element is initially over the left side of within
l>0&&h<=0?(i=e.left+l+t.collisionWidth-o-n,e.left+=l-i):e.left=h>0&&l<=0?n:l>h?n+o-t.collisionWidth:n:l>0?e.left+=l:h>0?e.left-=h:e.left=a(e.left-r,e.left)},top:function(e,t){var i,s=t.within,n=s.isWindow?s.scrollTop:s.offset.top,o=t.within.height,r=e.top-t.collisionPosition.marginTop,l=n-r,h=r+t.collisionHeight-o-n;
// Element is taller than within
t.collisionHeight>o?
// Element is initially over the top of within
l>0&&h<=0?(i=e.top+l+t.collisionHeight-o-n,e.top+=l-i):e.top=h>0&&l<=0?n:l>h?n+o-t.collisionHeight:n:l>0?e.top+=l:h>0?e.top-=h:e.top=a(e.top-r,e.top)}},flip:{left:function(e,t){var i,s,n=t.within,a=n.offset.left+n.scrollLeft,r=n.width,l=n.isWindow?n.scrollLeft:n.offset.left,h=e.left-t.collisionPosition.marginLeft,c=h-l,u=h+t.collisionWidth-r-l,d="left"===t.my[0]?-t.elemWidth:"right"===t.my[0]?t.elemWidth:0,p="left"===t.at[0]?t.targetWidth:"right"===t.at[0]?-t.targetWidth:0,f=-2*t.offset[0];c<0?((i=e.left+d+p+f+t.collisionWidth-r-a)<0||i<o(c))&&(e.left+=d+p+f):u>0&&((s=e.left-t.collisionPosition.marginLeft+d+p+f-l)>0||o(s)<u)&&(e.left+=d+p+f)},top:function(e,t){var i,s,n=t.within,a=n.offset.top+n.scrollTop,r=n.height,l=n.isWindow?n.scrollTop:n.offset.top,h=e.top-t.collisionPosition.marginTop,c=h-l,u=h+t.collisionHeight-r-l,d="top"===t.my[1],p=d?-t.elemHeight:"bottom"===t.my[1]?t.elemHeight:0,f="top"===t.at[1]?t.targetHeight:"bottom"===t.at[1]?-t.targetHeight:0,m=-2*t.offset[1];c<0?((s=e.top+p+f+m+t.collisionHeight-r-a)<0||s<o(c))&&(e.top+=p+f+m):u>0&&((i=e.top-t.collisionPosition.marginTop+p+f+m-l)>0||o(i)<u)&&(e.top+=p+f+m)}},flipfit:{left:function(){e.ui.position.flip.left.apply(this,arguments),e.ui.position.fit.left.apply(this,arguments)},top:function(){e.ui.position.flip.top.apply(this,arguments),e.ui.position.fit.top.apply(this,arguments)}}}}();var c=(e.ui.position,e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(i){return!!e.data(i,t)}}):
// Support: jQuery <1.8
function(t,i,s){return!!e.data(t,s[3])}}),e.fn.extend({disableSelection:function(){var e="onselectstart"in document.createElement("div")?"selectstart":"mousedown";return function(){return this.on(e+".ui-disableSelection",function(e){e.preventDefault()})}}(),enableSelection:function(){return this.off(".ui-disableSelection")}}),"ui-effects-animated"),
// Create a local jQuery because jQuery Color relies on it and the
// global may not exist with AMD and a custom build (#10199)
u=e;e.effects={effect:{}},/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
function(e,t){function i(e,t,i){var s=c[t.type]||{};
// ~~ is an short way of doing floor for positive numbers
// IE will pass in empty strings as value for alpha,
// which will hit this case
return null==e?i||!t.def?null:t.def:(e=s.floor?~~e:parseFloat(e),isNaN(e)?t.def:s.mod?(e+s.mod)%s.mod:0>e?0:s.max<e?s.max:e)}function s(t){var i=l(),s=i._rgba=[];
// Found a stringParser that handled it
// Found a stringParser that handled it
// If this came from a parsed string, force "transparent" when alpha is 0
// chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
return t=t.toLowerCase(),p(r,function(e,n){var a,o=n.re.exec(t),r=o&&n.parse(o),l=n.space||"rgba";if(r)
// Exit each( stringParsers ) here because we matched
// If this was an rgba parse the assignment might happen twice
// oh well....
return a=i[l](r),i[h[l].cache]=a[h[l].cache],s=i._rgba=a._rgba,!1}),s.length?("0,0,0,0"===s.join()&&e.extend(s,a.transparent),i):a[t]}
// Hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021
function n(e,t,i){return i=(i+1)%1,6*i<1?e+(t-e)*i*6:2*i<1?t:3*i<2?e+(t-e)*(2/3-i)*6:e}var
// Colors = jQuery.Color.names
a,
// Plusequals test for += 100 -= 100
o=/^([\-+])=\s*(\d+\.?\d*)/,
// A set of RE's that can match strings and generate color tuples.
r=[{re:/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[e[1],e[2],e[3],e[4]]}},{re:/rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,parse:function(e){return[2.55*e[1],2.55*e[2],2.55*e[3],e[4]]}},{
// This regex ignores A-F because it's compared against an already lowercased string
re:/#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,parse:function(e){return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16)]}},{
// This regex ignores A-F because it's compared against an already lowercased string
re:/#([a-f0-9])([a-f0-9])([a-f0-9])/,parse:function(e){return[parseInt(e[1]+e[1],16),parseInt(e[2]+e[2],16),parseInt(e[3]+e[3],16)]}},{re:/hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,space:"hsla",parse:function(e){return[e[1],e[2]/100,e[3]/100,e[4]]}}],
// JQuery.Color( )
l=e.Color=function(t,i,s,n){return new e.Color.fn.parse(t,i,s,n)},h={rgba:{props:{red:{idx:0,type:"byte"},green:{idx:1,type:"byte"},blue:{idx:2,type:"byte"}}},hsla:{props:{hue:{idx:0,type:"degrees"},saturation:{idx:1,type:"percent"},lightness:{idx:2,type:"percent"}}}},c={byte:{floor:!0,max:255},percent:{max:1},degrees:{mod:360,floor:!0}},u=l.support={},
// Element for support tests
d=e("<p>")[0],
// Local aliases of functions called often
p=e.each;
// Determine rgba support immediately
d.style.cssText="background-color:rgba(1,1,1,.5)",u.rgba=d.style.backgroundColor.indexOf("rgba")>-1,
// Define cache name and alpha properties
// for rgba and hsla spaces
p(h,function(e,t){t.cache="_"+e,t.props.alpha={idx:3,type:"percent",def:1}}),l.fn=e.extend(l.prototype,{parse:function(t,n,o,r){if(void 0===t)return this._rgba=[null,null,null,null],this;(t.jquery||t.nodeType)&&(t=e(t).css(n),n=void 0);var c=this,u=e.type(t),d=this._rgba=[];
// More than 1 argument specified - assume ( red, green, blue, alpha )
/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
return void 0!==n&&(t=[t,n,o,r],u="array"),"string"===u?this.parse(s(t)||a._default):"array"===u?(p(h.rgba.props,function(e,s){d[s.idx]=i(t[s.idx],s)}),this):"object"===u?(t instanceof l?p(h,function(e,i){t[i.cache]&&(c[i.cache]=t[i.cache].slice())}):p(h,function(s,n){var a=n.cache;p(n.props,function(e,s){
// If the cache doesn't exist, and we know how to convert
if(!c[a]&&n.to){
// If the value was null, we don't need to copy it
// if the key was alpha, we don't need to copy it either
if("alpha"===e||null==t[e])return;c[a]=n.to(c._rgba)}
// This is the only case where we allow nulls for ALL properties.
// call clamp with alwaysAllowEmpty
c[a][s.idx]=i(t[e],s,!0)}),
// Everything defined but alpha?
c[a]&&e.inArray(null,c[a].slice(0,3))<0&&(
// Use the default of 1
c[a][3]=1,n.from&&(c._rgba=n.from(c[a])))}),this):void 0},is:function(e){var t=l(e),i=!0,s=this;return p(h,function(e,n){var a,o=t[n.cache];return o&&(a=s[n.cache]||n.to&&n.to(s._rgba)||[],p(n.props,function(e,t){if(null!=o[t.idx])return i=o[t.idx]===a[t.idx]})),i}),i},_space:function(){var e=[],t=this;return p(h,function(i,s){t[s.cache]&&e.push(i)}),e.pop()},transition:function(e,t){var s=l(e),n=s._space(),a=h[n],o=0===this.alpha()?l("transparent"):this,r=o[a.cache]||a.to(o._rgba),u=r.slice();return s=s[a.cache],p(a.props,function(e,n){var a=n.idx,o=r[a],l=s[a],h=c[n.type]||{};
// If null, don't override start value
null!==l&&(
// If null - use end
null===o?u[a]=l:(h.mod&&(l-o>h.mod/2?o+=h.mod:o-l>h.mod/2&&(o-=h.mod)),u[a]=i((l-o)*t+o,n)))}),this[n](u)},blend:function(t){
// If we are already opaque - return ourself
if(1===this._rgba[3])return this;var i=this._rgba.slice(),s=i.pop(),n=l(t)._rgba;return l(e.map(i,function(e,t){return(1-s)*n[t]+s*e}))},toRgbaString:function(){var t="rgba(",i=e.map(this._rgba,function(e,t){return null==e?t>2?1:0:e});return 1===i[3]&&(i.pop(),t="rgb("),t+i.join()+")"},toHslaString:function(){var t="hsla(",i=e.map(this.hsla(),function(e,t){
// Catch 1 and 2
return null==e&&(e=t>2?1:0),t&&t<3&&(e=Math.round(100*e)+"%"),e});return 1===i[3]&&(i.pop(),t="hsl("),t+i.join()+")"},toHexString:function(t){var i=this._rgba.slice(),s=i.pop();return t&&i.push(~~(255*s)),"#"+e.map(i,function(e){
// Default to 0 when nulls exist
return e=(e||0).toString(16),1===e.length?"0"+e:e}).join("")},toString:function(){return 0===this._rgba[3]?"transparent":this.toRgbaString()}}),l.fn.parse.prototype=l.fn,h.hsla.to=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t,i,s=e[0]/255,n=e[1]/255,a=e[2]/255,o=e[3],r=Math.max(s,n,a),l=Math.min(s,n,a),h=r-l,c=r+l,u=.5*c;
// Chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
// otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
return t=l===r?0:s===r?60*(n-a)/h+360:n===r?60*(a-s)/h+120:60*(s-n)/h+240,i=0===h?0:u<=.5?h/c:h/(2-c),[Math.round(t)%360,i,u,null==o?1:o]},h.hsla.from=function(e){if(null==e[0]||null==e[1]||null==e[2])return[null,null,null,e[3]];var t=e[0]/360,i=e[1],s=e[2],a=e[3],o=s<=.5?s*(1+i):s+i-s*i,r=2*s-o;return[Math.round(255*n(r,o,t+1/3)),Math.round(255*n(r,o,t)),Math.round(255*n(r,o,t-1/3)),a]},p(h,function(t,s){var n=s.props,a=s.cache,r=s.to,h=s.from;
// Makes rgba() and hsla()
l.fn[t]=function(t){if(
// Generate a cache for this space if it doesn't exist
r&&!this[a]&&(this[a]=r(this._rgba)),void 0===t)return this[a].slice();var s,o=e.type(t),c="array"===o||"object"===o?t:arguments,u=this[a].slice();return p(n,function(e,t){var s=c["object"===o?e:t.idx];null==s&&(s=u[t.idx]),u[t.idx]=i(s,t)}),h?(s=l(h(u)),s[a]=u,s):l(u)},
// Makes red() green() blue() alpha() hue() saturation() lightness()
p(n,function(i,s){
// Alpha is included in more than one space
l.fn[i]||(l.fn[i]=function(n){var a,r=e.type(n),l="alpha"===i?this._hsla?"hsla":"rgba":t,h=this[l](),c=h[s.idx];return"undefined"===r?c:("function"===r&&(n=n.call(this,c),r=e.type(n)),null==n&&s.empty?this:("string"===r&&(a=o.exec(n))&&(n=c+parseFloat(a[2])*("+"===a[1]?1:-1)),h[s.idx]=n,this[l](h)))})})}),
// Add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
l.hook=function(t){var i=t.split(" ");p(i,function(t,i){e.cssHooks[i]={set:function(t,n){var a,o,r="";if("transparent"!==n&&("string"!==e.type(n)||(a=s(n)))){if(n=l(a||n),!u.rgba&&1!==n._rgba[3]){for(o="backgroundColor"===i?t.parentNode:t;(""===r||"transparent"===r)&&o&&o.style;)try{r=e.css(o,"backgroundColor"),o=o.parentNode}catch(e){}n=n.blend(r&&"transparent"!==r?r:"_default")}n=n.toRgbaString()}try{t.style[i]=n}catch(e){}}},e.fx.step[i]=function(t){t.colorInit||(t.start=l(t.elem,i),t.end=l(t.end),t.colorInit=!0),e.cssHooks[i].set(t.elem,t.start.transition(t.end,t.pos))}})},l.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),e.cssHooks.borderColor={expand:function(e){var t={};return p(["Top","Right","Bottom","Left"],function(i,s){t["border"+s+"Color"]=e}),t}},
// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
a=e.Color.names={
// 4.1. Basic color keywords
aqua:"#00ffff",black:"#000000",blue:"#0000ff",fuchsia:"#ff00ff",gray:"#808080",green:"#008000",lime:"#00ff00",maroon:"#800000",navy:"#000080",olive:"#808000",purple:"#800080",red:"#ff0000",silver:"#c0c0c0",teal:"#008080",white:"#ffffff",yellow:"#ffff00",
// 4.2.3. "transparent" color keyword
transparent:[null,null,null,0],_default:"#ffffff"}}(u),/******************************************************************************/
/****************************** CLASS ANIMATIONS ******************************/
/******************************************************************************/
function(){function t(t){var i,s,n=t.ownerDocument.defaultView?t.ownerDocument.defaultView.getComputedStyle(t,null):t.currentStyle,a={};if(n&&n.length&&n[0]&&n[n[0]])for(s=n.length;s--;)i=n[s],"string"==typeof n[i]&&(a[e.camelCase(i)]=n[i]);else for(i in n)"string"==typeof n[i]&&(a[i]=n[i]);return a}function i(t,i){var s,a,o={};for(s in i)a=i[s],t[s]!==a&&(n[s]||!e.fx.step[s]&&isNaN(parseFloat(a))||(o[s]=a));return o}var s=["add","remove","toggle"],n={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};e.each(["borderLeftStyle","borderRightStyle","borderBottomStyle","borderTopStyle"],function(t,i){e.fx.step[i]=function(e){("none"!==e.end&&!e.setAttr||1===e.pos&&!e.setAttr)&&(u.style(e.elem,i,e.end),e.setAttr=!0)}}),
// Support: jQuery <1.8
e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e.effects.animateClass=function(n,a,o,r){var l=e.speed(a,o,r);return this.queue(function(){var a,o=e(this),r=o.attr("class")||"",h=l.children?o.find("*").addBack():o;
// Map the animated objects to store the original styles.
h=h.map(function(){return{el:e(this),start:t(this)}}),
// Apply class change
a=function(){e.each(s,function(e,t){n[t]&&o[t+"Class"](n[t])})},a(),
// Map all animated objects again - calculate new styles and diff
h=h.map(function(){return this.end=t(this.el[0]),this.diff=i(this.start,this.end),this}),
// Apply original class
o.attr("class",r),
// Map all animated objects again - this time collecting a promise
h=h.map(function(){var t=this,i=e.Deferred(),s=e.extend({},l,{queue:!1,complete:function(){i.resolve(t)}});return this.el.animate(this.diff,s),i.promise()}),
// Once all animations have completed:
e.when.apply(e,h.get()).done(function(){
// Set the final class
a(),
// For each animated element,
// clear all css properties that were animated
e.each(arguments,function(){var t=this.el;e.each(this.diff,function(e){t.css(e,"")})}),
// This is guarnteed to be there if you use jQuery.speed()
// it also handles dequeuing the next anim...
l.complete.call(o[0])})})},e.fn.extend({addClass:function(t){return function(i,s,n,a){return s?e.effects.animateClass.call(this,{add:i},s,n,a):t.apply(this,arguments)}}(e.fn.addClass),removeClass:function(t){return function(i,s,n,a){return arguments.length>1?e.effects.animateClass.call(this,{remove:i},s,n,a):t.apply(this,arguments)}}(e.fn.removeClass),toggleClass:function(t){return function(i,s,n,a,o){return"boolean"==typeof s||void 0===s?n?e.effects.animateClass.call(this,s?{add:i}:{remove:i},n,a,o):t.apply(this,arguments):e.effects.animateClass.call(this,{toggle:i},s,n,a)}}(e.fn.toggleClass),switchClass:function(t,i,s,n,a){return e.effects.animateClass.call(this,{add:i,remove:t},s,n,a)}})}(),/******************************************************************************/
/*********************************** EFFECTS **********************************/
/******************************************************************************/
function(){
// Return an effect options object for the given parameters:
function t(t,i,s,n){
// Allow passing all options as the first parameter
// Convert to an object
// Catch (effect, null, ...)
// Catch (effect, callback)
// Catch (effect, speed, ?)
// Catch (effect, options, callback)
// Add options to effect
return e.isPlainObject(t)&&(i=t,t=t.effect),t={effect:t},null==i&&(i={}),e.isFunction(i)&&(n=i,s=null,i={}),("number"==typeof i||e.fx.speeds[i])&&(n=s,s=i,i={}),e.isFunction(s)&&(n=s,s=null),i&&e.extend(t,i),s=s||i.duration,t.duration=e.fx.off?0:"number"==typeof s?s:s in e.fx.speeds?e.fx.speeds[s]:e.fx.speeds._default,t.complete=n||i.complete,t}function i(t){
// Valid standard speeds (nothing, number, named speed)
// Valid standard speeds (nothing, number, named speed)
// Invalid strings - treat as "normal" speed
// Complete callback
return!(t&&"number"!=typeof t&&!e.fx.speeds[t])||("string"==typeof t&&!e.effects.effect[t]||(!!e.isFunction(t)||"object"==typeof t&&!t.effect))}function s(e,t){var i=t.outerWidth(),s=t.outerHeight(),n=/^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/,a=n.exec(e)||["",0,i,s,0];return{top:parseFloat(a[1])||0,right:"auto"===a[2]?i:parseFloat(a[2]),bottom:"auto"===a[3]?s:parseFloat(a[3]),left:parseFloat(a[4])||0}}e.expr&&e.expr.filters&&e.expr.filters.animated&&(e.expr.filters.animated=function(t){return function(i){return!!e(i).data(c)||t(i)}}(e.expr.filters.animated)),!1!==e.uiBackCompat&&e.extend(e.effects,{
// Saves a set of properties in a data storage
save:function(e,t){for(var i=0,s=t.length;i<s;i++)null!==t[i]&&e.data("ui-effects-"+t[i],e[0].style[t[i]])},
// Restores a set of previously saved properties from a data storage
restore:function(e,t){for(var i,s=0,n=t.length;s<n;s++)null!==t[s]&&(i=e.data("ui-effects-"+t[s]),e.css(t[s],i))},setMode:function(e,t){return"toggle"===t&&(t=e.is(":hidden")?"show":"hide"),t},
// Wraps the element around a wrapper that copies position properties
createWrapper:function(t){
// If the element is already wrapped, return it
if(t.parent().is(".ui-effects-wrapper"))return t.parent();
// Wrap the element
var i={width:t.outerWidth(!0),height:t.outerHeight(!0),float:t.css("float")},s=e("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),
// Store the size in case width/height are defined in % - Fixes #5245
n={width:t.width(),height:t.height()},a=document.activeElement;
// Support: Firefox
// Firefox incorrectly exposes anonymous content
// https://bugzilla.mozilla.org/show_bug.cgi?id=561664
try{a.id}catch(e){a=document.body}
// Fixes #7595 - Elements lose focus when wrapped.
// Hotfix for jQuery 1.4 since some change in wrap() seems to actually
// lose the reference to the wrapped element
// Transfer positioning properties to the wrapper
return t.wrap(s),(t[0]===a||e.contains(t[0],a))&&e(a).trigger("focus"),s=t.parent(),"static"===t.css("position")?(s.css({position:"relative"}),t.css({position:"relative"})):(e.extend(i,{position:t.css("position"),zIndex:t.css("z-index")}),e.each(["top","left","bottom","right"],function(e,s){i[s]=t.css(s),isNaN(parseInt(i[s],10))&&(i[s]="auto")}),t.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),t.css(n),s.css(i).show()},removeWrapper:function(t){var i=document.activeElement;
// Fixes #7595 - Elements lose focus when wrapped.
return t.parent().is(".ui-effects-wrapper")&&(t.parent().replaceWith(t),(t[0]===i||e.contains(t[0],i))&&e(i).trigger("focus")),t}}),e.extend(e.effects,{version:"1.12.1",define:function(t,i,s){return s||(s=i,i="effect"),e.effects.effect[t]=s,e.effects.effect[t].mode=i,s},scaledDimensions:function(e,t,i){if(0===t)return{height:0,width:0,outerHeight:0,outerWidth:0};var s="horizontal"!==i?(t||100)/100:1,n="vertical"!==i?(t||100)/100:1;return{height:e.height()*n,width:e.width()*s,outerHeight:e.outerHeight()*n,outerWidth:e.outerWidth()*s}},clipToBox:function(e){return{width:e.clip.right-e.clip.left,height:e.clip.bottom-e.clip.top,left:e.clip.left,top:e.clip.top}},
// Injects recently queued functions to be first in line (after "inprogress")
unshift:function(e,t,i){var s=e.queue();t>1&&s.splice.apply(s,[1,0].concat(s.splice(t,i))),e.dequeue()},saveStyle:function(e){e.data("ui-effects-style",e[0].style.cssText)},restoreStyle:function(e){e[0].style.cssText=e.data("ui-effects-style")||"",e.removeData("ui-effects-style")},mode:function(e,t){var i=e.is(":hidden");return"toggle"===t&&(t=i?"show":"hide"),(i?"hide"===t:"show"===t)&&(t="none"),t},
// Translates a [top,left] array into a baseline value
getBaseline:function(e,t){var i,s;switch(e[0]){case"top":i=0;break;case"middle":i=.5;break;case"bottom":i=1;break;default:i=e[0]/t.height}switch(e[1]){case"left":s=0;break;case"center":s=.5;break;case"right":s=1;break;default:s=e[1]/t.width}return{x:s,y:i}},
// Creates a placeholder element so that the original element can be made absolute
createPlaceholder:function(t){var i,s=t.css("position"),n=t.position();
// Lock in margins first to account for form elements, which
// will change margin if you explicitly set height
// see: http://jsfiddle.net/JZSMt/3/ https://bugs.webkit.org/show_bug.cgi?id=107380
// Support: Safari
return t.css({marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()),/^(static|relative)/.test(s)&&(s="absolute",i=e("<"+t[0].nodeName+">").insertAfter(t).css({
// Convert inline to inline block to account for inline elements
// that turn to inline block based on content (like img)
display:/^(inline|ruby)/.test(t.css("display"))?"inline-block":"block",visibility:"hidden",
// Margins need to be set to account for margin collapse
marginTop:t.css("marginTop"),marginBottom:t.css("marginBottom"),marginLeft:t.css("marginLeft"),marginRight:t.css("marginRight"),float:t.css("float")}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"),t.data("ui-effects-placeholder",i)),t.css({position:s,left:n.left,top:n.top}),i},removePlaceholder:function(e){var t="ui-effects-placeholder",i=e.data(t);i&&(i.remove(),e.removeData(t))},
// Removes a placeholder if it exists and restores
// properties that were modified during placeholder creation
cleanUp:function(t){e.effects.restoreStyle(t),e.effects.removePlaceholder(t)},setTransition:function(t,i,s,n){return n=n||{},e.each(i,function(e,i){var a=t.cssUnit(i);a[0]>0&&(n[i]=a[0]*s+a[1])}),n}}),e.fn.extend({effect:function(){function i(t){function i(){r.removeData(c),e.effects.cleanUp(r),"hide"===s.mode&&r.hide(),o()}function o(){e.isFunction(l)&&l.call(r[0]),e.isFunction(t)&&t()}var r=e(this);
// Override mode option on a per element basis,
// as toggle can be either show or hide depending on element state
s.mode=u.shift(),!1===e.uiBackCompat||a?"none"===s.mode?(
// Call the core method to track "olddisplay" properly
r[h](),o()):n.call(r[0],s,i):(r.is(":hidden")?"hide"===h:"show"===h)?(
// Call the core method to track "olddisplay" properly
r[h](),o()):n.call(r[0],s,o)}var s=t.apply(this,arguments),n=e.effects.effect[s.effect],a=n.mode,o=s.queue,r=o||"fx",l=s.complete,h=s.mode,u=[],d=function(t){var i=e(this),s=e.effects.mode(i,h)||a;
// Sentinel for duck-punching the :animated psuedo-selector
i.data(c,!0),
// Save effect mode for later use,
// we can't just call $.effects.mode again later,
// as the .show() below destroys the initial state
u.push(s),
// See $.uiBackCompat inside of run() for removal of defaultMode in 1.13
a&&("show"===s||s===a&&"hide"===s)&&i.show(),a&&"none"===s||e.effects.saveStyle(i),e.isFunction(t)&&t()};
// Delegate to the original method (e.g., .show()) if possible
return e.fx.off||!n?h?this[h](s.duration,l):this.each(function(){l&&l.call(this)}):!1===o?this.each(d).each(i):this.queue(r,d).queue(r,i)},show:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="show",this.effect.call(this,n)}}(e.fn.show),hide:function(e){return function(s){if(i(s))return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="hide",this.effect.call(this,n)}}(e.fn.hide),toggle:function(e){return function(s){if(i(s)||"boolean"==typeof s)return e.apply(this,arguments);var n=t.apply(this,arguments);return n.mode="toggle",this.effect.call(this,n)}}(e.fn.toggle),cssUnit:function(t){var i=this.css(t),s=[];return e.each(["em","px","%","pt"],function(e,t){i.indexOf(t)>0&&(s=[parseFloat(i),t])}),s},cssClip:function(e){return e?this.css("clip","rect("+e.top+"px "+e.right+"px "+e.bottom+"px "+e.left+"px)"):s(this.css("clip"),this)},transfer:function(t,i){var s=e(this),n=e(t.to),a="fixed"===n.css("position"),o=e("body"),r=a?o.scrollTop():0,l=a?o.scrollLeft():0,h=n.offset(),c={top:h.top-r,left:h.left-l,height:n.innerHeight(),width:n.innerWidth()},u=s.offset(),d=e("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(t.className).css({top:u.top-r,left:u.left-l,height:s.innerHeight(),width:s.innerWidth(),position:a?"fixed":"absolute"}).animate(c,t.duration,t.easing,function(){d.remove(),e.isFunction(i)&&i()})}}),e.fx.step.clip=function(t){t.clipInit||(t.start=e(t.elem).cssClip(),"string"==typeof t.end&&(t.end=s(t.end,t.elem)),t.clipInit=!0),e(t.elem).cssClip({top:t.pos*(t.end.top-t.start.top)+t.start.top,right:t.pos*(t.end.right-t.start.right)+t.start.right,bottom:t.pos*(t.end.bottom-t.start.bottom)+t.start.bottom,left:t.pos*(t.end.left-t.start.left)+t.start.left})}}(),/******************************************************************************/
/*********************************** EASING ***********************************/
/******************************************************************************/
function(){
// Based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
var t={};e.each(["Quad","Cubic","Quart","Quint","Expo"],function(e,i){t[i]=function(t){return Math.pow(t,e+2)}}),e.extend(t,{Sine:function(e){return 1-Math.cos(e*Math.PI/2)},Circ:function(e){return 1-Math.sqrt(1-e*e)},Elastic:function(e){return 0===e||1===e?e:-Math.pow(2,8*(e-1))*Math.sin((80*(e-1)-7.5)*Math.PI/15)},Back:function(e){return e*e*(3*e-2)},Bounce:function(e){for(var t,i=4;e<((t=Math.pow(2,--i))-1)/11;);return 1/Math.pow(4,3-i)-7.5625*Math.pow((3*t-2)/22-e,2)}}),e.each(t,function(t,i){e.easing["easeIn"+t]=i,e.easing["easeOut"+t]=function(e){return 1-i(1-e)},e.easing["easeInOut"+t]=function(e){return e<.5?i(2*e)/2:1-i(-2*e+2)/2}})}();e.effects,e.effects.define("blind","hide",function(t,i){var s={up:["bottom","top"],vertical:["bottom","top"],down:["top","bottom"],left:["right","left"],horizontal:["right","left"],right:["left","right"]},n=e(this),a=t.direction||"up",o=n.cssClip(),r={clip:e.extend({},o)},l=e.effects.createPlaceholder(n);r.clip[s[a][0]]=r.clip[s[a][1]],"show"===t.mode&&(n.cssClip(r.clip),l&&l.css(e.effects.clipToBox(r)),r.clip=o),l&&l.animate(e.effects.clipToBox(r),t.duration,t.easing),n.animate(r,{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("bounce",function(t,i){var s,n,a,o=e(this),
// Defaults:
r=t.mode,l="hide"===r,h="show"===r,c=t.direction||"up",u=t.distance,d=t.times||5,
// Number of internal animations
p=2*d+(h||l?1:0),f=t.duration/p,m=t.easing,
// Utility:
g="up"===c||"down"===c?"top":"left",v="up"===c||"left"===c,_=0,b=o.queue().length;
// Bounces up/down/left/right then back to 0 -- times * 2 animations happen here
for(e.effects.createPlaceholder(o),a=o.css(g),
// Default distance for the BIGGEST bounce is the outer Distance / 3
u||(u=o["top"===g?"outerHeight":"outerWidth"]()/3),h&&(n={opacity:1},n[g]=a,
// If we are showing, force opacity 0 and set the initial position
// then do the "first" animation
o.css("opacity",0).css(g,v?2*-u:2*u).animate(n,f,m)),
// Start at the smallest distance if we are hiding
l&&(u/=Math.pow(2,d-1)),n={},n[g]=a;_<d;_++)s={},s[g]=(v?"-=":"+=")+u,o.animate(s,f,m).animate(n,f,m),u=l?2*u:u/2;
// Last Bounce when Hiding
l&&(s={opacity:0},s[g]=(v?"-=":"+=")+u,o.animate(s,f,m)),o.queue(i),e.effects.unshift(o,b,p+1)}),e.effects.define("clip","hide",function(t,i){var s,n={},a=e(this),o=t.direction||"vertical",r="both"===o,l=r||"horizontal"===o,h=r||"vertical"===o;s=a.cssClip(),n.clip={top:h?(s.bottom-s.top)/2:s.top,right:l?(s.right-s.left)/2:s.right,bottom:h?(s.bottom-s.top)/2:s.bottom,left:l?(s.right-s.left)/2:s.left},e.effects.createPlaceholder(a),"show"===t.mode&&(a.cssClip(n.clip),n.clip=s),a.animate(n,{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("drop","hide",function(t,i){var s,n=e(this),a=t.mode,o="show"===a,r=t.direction||"left",l="up"===r||"down"===r?"top":"left",h="up"===r||"left"===r?"-=":"+=",c="+="===h?"-=":"+=",u={opacity:0};e.effects.createPlaceholder(n),s=t.distance||n["top"===l?"outerHeight":"outerWidth"](!0)/2,u[l]=h+s,o&&(n.css(u),u[l]=c+s,u.opacity=1),
// Animate
n.animate(u,{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("explode","hide",function(t,i){
// Children animate complete:
function s(){b.push(this),b.length===u*d&&n()}function n(){p.css({visibility:"visible"}),e(b).remove(),i()}var a,o,r,l,h,c,u=t.pieces?Math.round(Math.sqrt(t.pieces)):3,d=u,p=e(this),f=t.mode,m="show"===f,
// Show and then visibility:hidden the element before calculating offset
g=p.show().css("visibility","hidden").offset(),
// Width and height of a piece
v=Math.ceil(p.outerWidth()/d),_=Math.ceil(p.outerHeight()/u),b=[];
// Clone the element for each row and cell.
for(a=0;a<u;a++)for(// ===>
l=g.top+a*_,c=a-(u-1)/2,o=0;o<d;o++)// |||
r=g.left+o*v,h=o-(d-1)/2,
// Create a clone of the now hidden main element that will be absolute positioned
// within a wrapper div off the -left and -top equal to size of our pieces
p.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-o*v,top:-a*_}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:v,height:_,left:r+(m?h*v:0),top:l+(m?c*_:0),opacity:m?0:1}).animate({left:r+(m?0:h*v),top:l+(m?0:c*_),opacity:m?1:0},t.duration||500,t.easing,s)}),e.effects.define("fade","toggle",function(t,i){var s="show"===t.mode;e(this).css("opacity",s?0:1).animate({opacity:s?1:0},{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("fold","hide",function(t,i){
// Create element
var s=e(this),n=t.mode,a="show"===n,o="hide"===n,r=t.size||15,l=/([0-9]+)%/.exec(r),h=!!t.horizFirst,c=h?["right","bottom"]:["bottom","right"],u=t.duration/2,d=e.effects.createPlaceholder(s),p=s.cssClip(),f={clip:e.extend({},p)},m={clip:e.extend({},p)},g=[p[c[0]],p[c[1]]],v=s.queue().length;l&&(r=parseInt(l[1],10)/100*g[o?0:1]),f.clip[c[0]]=r,m.clip[c[0]]=r,m.clip[c[1]]=0,a&&(s.cssClip(m.clip),d&&d.css(e.effects.clipToBox(m)),m.clip=p),
// Animate
s.queue(function(i){d&&d.animate(e.effects.clipToBox(f),u,t.easing).animate(e.effects.clipToBox(m),u,t.easing),i()}).animate(f,u,t.easing).animate(m,u,t.easing).queue(i),e.effects.unshift(s,v,4)}),e.effects.define("highlight","show",function(t,i){var s=e(this),n={backgroundColor:s.css("backgroundColor")};"hide"===t.mode&&(n.opacity=0),e.effects.saveStyle(s),s.css({backgroundImage:"none",backgroundColor:t.color||"#ffff99"}).animate(n,{queue:!1,duration:t.duration,easing:t.easing,complete:i})}),e.effects.define("size",function(t,i){
// Create element
var s,n,a,o=e(this),
// Copy for children
r=["fontSize"],l=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],h=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],
// Set options
c=t.mode,u="effect"!==c,d=t.scale||"both",p=t.origin||["middle","center"],f=o.css("position"),m=o.position(),g=e.effects.scaledDimensions(o),v=t.from||g,_=t.to||e.effects.scaledDimensions(o,0);e.effects.createPlaceholder(o),"show"===c&&(a=v,v=_,_=a),
// Set scaling factor
n={from:{y:v.height/g.height,x:v.width/g.width},to:{y:_.height/g.height,x:_.width/g.width}},
// Scale the css box
"box"!==d&&"both"!==d||(
// Vertical props scaling
n.from.y!==n.to.y&&(v=e.effects.setTransition(o,l,n.from.y,v),_=e.effects.setTransition(o,l,n.to.y,_)),
// Horizontal props scaling
n.from.x!==n.to.x&&(v=e.effects.setTransition(o,h,n.from.x,v),_=e.effects.setTransition(o,h,n.to.x,_))),
// Scale the content
"content"!==d&&"both"!==d||
// Vertical props scaling
n.from.y!==n.to.y&&(v=e.effects.setTransition(o,r,n.from.y,v),_=e.effects.setTransition(o,r,n.to.y,_)),
// Adjust the position properties based on the provided origin points
p&&(s=e.effects.getBaseline(p,g),v.top=(g.outerHeight-v.outerHeight)*s.y+m.top,v.left=(g.outerWidth-v.outerWidth)*s.x+m.left,_.top=(g.outerHeight-_.outerHeight)*s.y+m.top,_.left=(g.outerWidth-_.outerWidth)*s.x+m.left),o.css(v),
// Animate the children if desired
"content"!==d&&"both"!==d||(l=l.concat(["marginTop","marginBottom"]).concat(r),h=h.concat(["marginLeft","marginRight"]),
// Only animate children with width attributes specified
// TODO: is this right? should we include anything with css width specified as well
o.find("*[width]").each(function(){var i=e(this),s=e.effects.scaledDimensions(i),a={height:s.height*n.from.y,width:s.width*n.from.x,outerHeight:s.outerHeight*n.from.y,outerWidth:s.outerWidth*n.from.x},o={height:s.height*n.to.y,width:s.width*n.to.x,outerHeight:s.height*n.to.y,outerWidth:s.width*n.to.x};
// Vertical props scaling
n.from.y!==n.to.y&&(a=e.effects.setTransition(i,l,n.from.y,a),o=e.effects.setTransition(i,l,n.to.y,o)),
// Horizontal props scaling
n.from.x!==n.to.x&&(a=e.effects.setTransition(i,h,n.from.x,a),o=e.effects.setTransition(i,h,n.to.x,o)),u&&e.effects.saveStyle(i),
// Animate children
i.css(a),i.animate(o,t.duration,t.easing,function(){
// Restore children
u&&e.effects.restoreStyle(i)})})),
// Animate
o.animate(_,{queue:!1,duration:t.duration,easing:t.easing,complete:function(){var t=o.offset();0===_.opacity&&o.css("opacity",v.opacity),u||(o.css("position","static"===f?"relative":f).offset(t),
// Need to save style here so that automatic style restoration
// doesn't restore to the original styles from before the animation.
e.effects.saveStyle(o)),i()}})}),e.effects.define("scale",function(t,i){
// Create element
var s=e(this),n=t.mode,a=parseInt(t.percent,10)||(0===parseInt(t.percent,10)?0:"effect"!==n?0:100),o=e.extend(!0,{from:e.effects.scaledDimensions(s),to:e.effects.scaledDimensions(s,a,t.direction||"both"),origin:t.origin||["middle","center"]},t);
// Fade option to support puff
t.fade&&(o.from.opacity=1,o.to.opacity=0),e.effects.effect.size.call(this,o,i)}),e.effects.define("puff","hide",function(t,i){var s=e.extend(!0,{},t,{fade:!0,percent:parseInt(t.percent,10)||150});e.effects.effect.scale.call(this,s,i)}),e.effects.define("pulsate","show",function(t,i){var s=e(this),n=t.mode,a="show"===n,o="hide"===n,r=a||o,
// Showing or hiding leaves off the "last" animation
l=2*(t.times||5)+(r?1:0),h=t.duration/l,c=0,u=1,d=s.queue().length;
// Anims - 1 opacity "toggles"
for(!a&&s.is(":visible")||(s.css("opacity",0).show(),c=1);u<l;u++)s.animate({opacity:c},h,t.easing),c=1-c;s.animate({opacity:c},h,t.easing),s.queue(i),e.effects.unshift(s,d,l+1)}),e.effects.define("shake",function(t,i){var s=1,n=e(this),a=t.direction||"left",o=t.distance||20,r=t.times||3,l=2*r+1,h=Math.round(t.duration/l),c="up"===a||"down"===a?"top":"left",u="up"===a||"left"===a,d={},p={},f={},m=n.queue().length;
// Shakes
for(e.effects.createPlaceholder(n),
// Animation
d[c]=(u?"-=":"+=")+o,p[c]=(u?"+=":"-=")+2*o,f[c]=(u?"-=":"+=")+2*o,
// Animate
n.animate(d,h,t.easing);s<r;s++)n.animate(p,h,t.easing).animate(f,h,t.easing);n.animate(p,h,t.easing).animate(d,h/2,t.easing).queue(i),e.effects.unshift(n,m,l+1)}),e.effects.define("slide","show",function(t,i){var s,n,a=e(this),o={up:["bottom","top"],down:["top","bottom"],left:["right","left"],right:["left","right"]},r=t.mode,l=t.direction||"left",h="up"===l||"down"===l?"top":"left",c="up"===l||"left"===l,u=t.distance||a["top"===h?"outerHeight":"outerWidth"](!0),d={};e.effects.createPlaceholder(a),s=a.cssClip(),n=a.position()[h],
// Define hide animation
d[h]=(c?-1:1)*u+n,d.clip=a.cssClip(),d.clip[o[l][1]]=d.clip[o[l][0]],
// Reverse the animation if we're showing
"show"===r&&(a.cssClip(d.clip),a.css(h,d[h]),d.clip=s,d[h]=n),
// Actually animate
a.animate(d,{queue:!1,duration:t.duration,easing:t.easing,complete:i})});!1!==e.uiBackCompat&&e.effects.define("transfer",function(t,i){e(this).transfer(t,i)});/*!
 * jQuery UI Focusable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: :focusable Selector
//>>group: Core
//>>description: Selects elements which can be focused.
//>>docs: http://api.jqueryui.com/focusable-selector/
// Selectors
e.ui.focusable=function(i,s){var n,a,o,r,l,h=i.nodeName.toLowerCase();
// Form controls within a disabled fieldset are disabled.
// However, controls within the fieldset's legend do not get disabled.
// Since controls generally aren't placed inside legends, we skip
// this portion of the check.
return"area"===h?(n=i.parentNode,a=n.name,!(!i.href||!a||"map"!==n.nodeName.toLowerCase())&&(o=e("img[usemap='#"+a+"']"),o.length>0&&o.is(":visible"))):(/^(input|select|textarea|button|object)$/.test(h)?(r=!i.disabled)&&(l=e(i).closest("fieldset")[0])&&(r=!l.disabled):r="a"===h?i.href||s:s,r&&e(i).is(":visible")&&t(e(i)))},e.extend(e.expr[":"],{focusable:function(t){return e.ui.focusable(t,null!=e.attr(t,"tabindex"))}});e.ui.focusable,e.fn.form=function(){return"string"==typeof this[0].form?this.closest("form"):e(this[0].form)},e.ui.formResetMixin={_formResetHandler:function(){var t=e(this);
// Wait for the form reset to actually happen before refreshing
setTimeout(function(){var i=t.data("ui-form-reset-instances");e.each(i,function(){this.refresh()})})},_bindFormResetHandler:function(){if(this.form=this.element.form(),this.form.length){var e=this.form.data("ui-form-reset-instances")||[];e.length||
// We don't use _on() here because we use a single event handler per form
this.form.on("reset.ui-form-reset",this._formResetHandler),e.push(this),this.form.data("ui-form-reset-instances",e)}},_unbindFormResetHandler:function(){if(this.form.length){var t=this.form.data("ui-form-reset-instances");t.splice(e.inArray(this,t),1),t.length?this.form.data("ui-form-reset-instances",t):this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")}}};/*!
 * jQuery UI Support for jQuery core 1.7.x 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 */
//>>label: jQuery 1.7 Support
//>>group: Core
//>>description: Support version 1.7.x of jQuery core
// Support: jQuery 1.7 only
// Not a great way to check versions, but since we only support 1.7+ and only
// need to detect <1.8, this is a simple check that should suffice. Checking
// for "1.7." would be a bit safer, but the version string is 1.7, not 1.7.0
// and we'll never reach 1.70.0 (if we do, we certainly won't be supporting
// 1.7 anymore). See #11197 for why we're not using feature detection.
"1.7"===e.fn.jquery.substring(0,3)&&(
// Setters for .innerWidth(), .innerHeight(), .outerWidth(), .outerHeight()
// Unlike jQuery Core 1.8+, these only support numeric values to set the
// dimensions in pixels
e.each(["Width","Height"],function(t,i){function s(t,i,s,a){return e.each(n,function(){i-=parseFloat(e.css(t,"padding"+this))||0,s&&(i-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(i-=parseFloat(e.css(t,"margin"+this))||0)}),i}var n="Width"===i?["Left","Right"]:["Top","Bottom"],a=i.toLowerCase(),o={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+i]=function(t){return void 0===t?o["inner"+i].call(this):this.each(function(){e(this).css(a,s(this,t)+"px")})},e.fn["outer"+i]=function(t,n){return"number"!=typeof t?o["outer"+i].call(this,t):this.each(function(){e(this).css(a,s(this,t,!0,n)+"px")})}}),e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))});/*!
 * jQuery UI Keycode 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Keycode
//>>group: Core
//>>description: Provide keycodes as keynames
//>>docs: http://api.jqueryui.com/jQuery.ui.keyCode/
e.ui.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38},e.ui.escapeSelector=function(){var e=/([!"#$%&'()*+,.\/:;<=>?@[\]^`{|}~])/g;return function(t){return t.replace(e,"\\$1")}}(),e.fn.labels=function(){var t,i,s,n,a;
// Check control.labels first
// Check control.labels first
// Support: IE <= 11, FF <= 37, Android <= 2.3 only
// Above browsers do not support control.labels. Everything below is to support them
// as well as document fragments. control.labels does not work on document fragments
// Look for the label based on the id
// We don't search against the document in case the element
// is disconnected from the DOM
// Get a full set of top level ancestors
// Create a selector for the label based on the id
return this[0].labels&&this[0].labels.length?this.pushStack(this[0].labels):(n=this.eq(0).parents("label"),s=this.attr("id"),s&&(t=this.eq(0).parents().last(),a=t.add(t.length?t.siblings():this.siblings()),i="label[for='"+e.ui.escapeSelector(s)+"']",n=n.add(a.find(i).addBack(i))),this.pushStack(n))},e.fn.scrollParent=function(t){var i=this.css("position"),s="absolute"===i,n=t?/(auto|scroll|hidden)/:/(auto|scroll)/,a=this.parents().filter(function(){var t=e(this);return(!s||"static"!==t.css("position"))&&n.test(t.css("overflow")+t.css("overflow-y")+t.css("overflow-x"))}).eq(0);return"fixed"!==i&&a.length?a:e(this[0].ownerDocument||document)},e.extend(e.expr[":"],{tabbable:function(t){var i=e.attr(t,"tabindex"),s=null!=i;return(!s||i>=0)&&e.ui.focusable(t,s)}}),e.fn.extend({uniqueId:function(){var e=0;return function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++e)})}}(),removeUniqueId:function(){return this.each(function(){/^ui-id-\d+$/.test(this.id)&&e(this).removeAttr("id")})}}),e.widget("ui.accordion",{version:"1.12.1",options:{active:0,animate:{},classes:{"ui-accordion-header":"ui-corner-top","ui-accordion-header-collapsed":"ui-corner-all","ui-accordion-content":"ui-corner-bottom"},collapsible:!1,event:"click",header:"> li > :first-child, > :not(li):even",heightStyle:"auto",icons:{activeHeader:"ui-icon-triangle-1-s",header:"ui-icon-triangle-1-e"},
// Callbacks
activate:null,beforeActivate:null},hideProps:{borderTopWidth:"hide",borderBottomWidth:"hide",paddingTop:"hide",paddingBottom:"hide",height:"hide"},showProps:{borderTopWidth:"show",borderBottomWidth:"show",paddingTop:"show",paddingBottom:"show",height:"show"},_create:function(){var t=this.options;this.prevShow=this.prevHide=e(),this._addClass("ui-accordion","ui-widget ui-helper-reset"),this.element.attr("role","tablist"),
// Don't allow collapsible: false and active: false / null
t.collapsible||!1!==t.active&&null!=t.active||(t.active=0),this._processPanels(),
// handle negative values
t.active<0&&(t.active+=this.headers.length),this._refresh()},_getCreateEventData:function(){return{header:this.active,panel:this.active.length?this.active.next():e()}},_createIcons:function(){var t,i,s=this.options.icons;s&&(t=e("<span>"),this._addClass(t,"ui-accordion-header-icon","ui-icon "+s.header),t.prependTo(this.headers),i=this.active.children(".ui-accordion-header-icon"),this._removeClass(i,s.header)._addClass(i,null,s.activeHeader)._addClass(this.headers,"ui-accordion-icons"))},_destroyIcons:function(){this._removeClass(this.headers,"ui-accordion-icons"),this.headers.children(".ui-accordion-header-icon").remove()},_destroy:function(){var e;
// Clean up main element
this.element.removeAttr("role"),
// Clean up headers
this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId(),this._destroyIcons(),
// Clean up content panels
e=this.headers.next().css("display","").removeAttr("role aria-hidden aria-labelledby").removeUniqueId(),"content"!==this.options.heightStyle&&e.css("height","")},_setOption:function(e,t){if("active"===e)
// _activate() will handle invalid values and update this.options
return void this._activate(t);"event"===e&&(this.options.event&&this._off(this.headers,this.options.event),this._setupEvents(t)),this._super(e,t),
// Setting collapsible: false while collapsed; open first panel
"collapsible"!==e||t||!1!==this.options.active||this._activate(0),"icons"===e&&(this._destroyIcons(),t&&this._createIcons())},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",e),
// Support: IE8 Only
// #5332 / #6059 - opacity doesn't cascade to positioned elements in IE
// so we need to add the disabled class to the headers and panels
this._toggleClass(null,"ui-state-disabled",!!e),this._toggleClass(this.headers.add(this.headers.next()),null,"ui-state-disabled",!!e)},_keydown:function(t){if(!t.altKey&&!t.ctrlKey){var i=e.ui.keyCode,s=this.headers.length,n=this.headers.index(t.target),a=!1;switch(t.keyCode){case i.RIGHT:case i.DOWN:a=this.headers[(n+1)%s];break;case i.LEFT:case i.UP:a=this.headers[(n-1+s)%s];break;case i.SPACE:case i.ENTER:this._eventHandler(t);break;case i.HOME:a=this.headers[0];break;case i.END:a=this.headers[s-1]}a&&(e(t.target).attr("tabIndex",-1),e(a).attr("tabIndex",0),e(a).trigger("focus"),t.preventDefault())}},_panelKeyDown:function(t){t.keyCode===e.ui.keyCode.UP&&t.ctrlKey&&e(t.currentTarget).prev().trigger("focus")},refresh:function(){var t=this.options;this._processPanels(),
// Was collapsed or no panel
!1===t.active&&!0===t.collapsible||!this.headers.length?(t.active=!1,this.active=e()):!1===t.active?this._activate(0):this.active.length&&!e.contains(this.element[0],this.active[0])?
// all remaining panel are disabled
this.headers.length===this.headers.find(".ui-state-disabled").length?(t.active=!1,this.active=e()):this._activate(Math.max(0,t.active-1)):
// make sure active index is correct
t.active=this.headers.index(this.active),this._destroyIcons(),this._refresh()},_processPanels:function(){var e=this.headers,t=this.panels;this.headers=this.element.find(this.options.header),this._addClass(this.headers,"ui-accordion-header ui-accordion-header-collapsed","ui-state-default"),this.panels=this.headers.next().filter(":not(.ui-accordion-content-active)").hide(),this._addClass(this.panels,"ui-accordion-content","ui-helper-reset ui-widget-content"),
// Avoid memory leaks (#10056)
t&&(this._off(e.not(this.headers)),this._off(t.not(this.panels)))},_refresh:function(){var t,i=this.options,s=i.heightStyle,n=this.element.parent();this.active=this._findActive(i.active),this._addClass(this.active,"ui-accordion-header-active","ui-state-active")._removeClass(this.active,"ui-accordion-header-collapsed"),this._addClass(this.active.next(),"ui-accordion-content-active"),this.active.next().show(),this.headers.attr("role","tab").each(function(){var t=e(this),i=t.uniqueId().attr("id"),s=t.next(),n=s.uniqueId().attr("id");t.attr("aria-controls",n),s.attr("aria-labelledby",i)}).next().attr("role","tabpanel"),this.headers.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}).next().attr({"aria-hidden":"true"}).hide(),
// Make sure at least one header is in the tab order
this.active.length?this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}).next().attr({"aria-hidden":"false"}):this.headers.eq(0).attr("tabIndex",0),this._createIcons(),this._setupEvents(i.event),"fill"===s?(t=n.height(),this.element.siblings(":visible").each(function(){var i=e(this),s=i.css("position");"absolute"!==s&&"fixed"!==s&&(t-=i.outerHeight(!0))}),this.headers.each(function(){t-=e(this).outerHeight(!0)}),this.headers.next().each(function(){e(this).height(Math.max(0,t-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===s&&(t=0,this.headers.next().each(function(){var i=e(this).is(":visible");i||e(this).show(),t=Math.max(t,e(this).css("height","").height()),i||e(this).hide()}).height(t))},_activate:function(t){var i=this._findActive(t)[0];
// Trying to activate the already active panel
i!==this.active[0]&&(
// Trying to collapse, simulate a click on the currently active header
i=i||this.active[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return"number"==typeof t?this.headers.eq(t):e()},_setupEvents:function(t){var i={keydown:"_keydown"};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.headers.add(this.headers.next())),this._on(this.headers,i),this._on(this.headers.next(),{keydown:"_panelKeyDown"}),this._hoverable(this.headers),this._focusable(this.headers)},_eventHandler:function(t){var i,s,n=this.options,a=this.active,o=e(t.currentTarget),r=o[0]===a[0],l=r&&n.collapsible,h=l?e():o.next(),c=a.next(),u={oldHeader:a,oldPanel:c,newHeader:l?e():o,newPanel:h};t.preventDefault(),
// click on active header, but not collapsible
r&&!n.collapsible||
// allow canceling activation
!1===this._trigger("beforeActivate",t,u)||(n.active=!l&&this.headers.index(o),
// When the call to ._toggle() comes after the class changes
// it causes a very odd bug in IE 8 (see #6720)
this.active=r?e():o,this._toggle(u),
// Switch classes
// corner classes on the previously active header stay after the animation
this._removeClass(a,"ui-accordion-header-active","ui-state-active"),n.icons&&(i=a.children(".ui-accordion-header-icon"),this._removeClass(i,null,n.icons.activeHeader)._addClass(i,null,n.icons.header)),r||(this._removeClass(o,"ui-accordion-header-collapsed")._addClass(o,"ui-accordion-header-active","ui-state-active"),n.icons&&(s=o.children(".ui-accordion-header-icon"),this._removeClass(s,null,n.icons.header)._addClass(s,null,n.icons.activeHeader)),this._addClass(o.next(),"ui-accordion-content-active")))},_toggle:function(t){var i=t.newPanel,s=this.prevShow.length?this.prevShow:t.oldPanel;
// Handle activating a panel during the animation for another activation
this.prevShow.add(this.prevHide).stop(!0,!0),this.prevShow=i,this.prevHide=s,this.options.animate?this._animate(i,s,t):(s.hide(),i.show(),this._toggleComplete(t)),s.attr({"aria-hidden":"true"}),s.prev().attr({"aria-selected":"false","aria-expanded":"false"}),
// if we're switching panels, remove the old header from the tab order
// if we're opening from collapsed state, remove the previous header from the tab order
// if we're collapsing, then keep the collapsing header in the tab order
i.length&&s.length?s.prev().attr({tabIndex:-1,"aria-expanded":"false"}):i.length&&this.headers.filter(function(){return 0===parseInt(e(this).attr("tabIndex"),10)}).attr("tabIndex",-1),i.attr("aria-hidden","false").prev().attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_animate:function(e,t,i){var s,n,a,o=this,r=0,l=e.css("box-sizing"),h=e.length&&(!t.length||e.index()<t.index()),c=this.options.animate||{},u=h&&c.down||c,d=function(){o._toggleComplete(i)};
// fall back from options to animation in case of partial down settings
return"number"==typeof u&&(a=u),"string"==typeof u&&(n=u),n=n||u.easing||c.easing,a=a||u.duration||c.duration,t.length?e.length?(s=e.show().outerHeight(),t.animate(this.hideProps,{duration:a,easing:n,step:function(e,t){t.now=Math.round(e)}}),void e.hide().animate(this.showProps,{duration:a,easing:n,complete:d,step:function(e,i){i.now=Math.round(e),"height"!==i.prop?"content-box"===l&&(r+=i.now):"content"!==o.options.heightStyle&&(i.now=Math.round(s-t.outerHeight()-r),r=0)}})):t.animate(this.hideProps,a,n,d):e.animate(this.showProps,a,n,d)},_toggleComplete:function(e){var t=e.oldPanel,i=t.prev();this._removeClass(t,"ui-accordion-content-active"),this._removeClass(i,"ui-accordion-header-active")._addClass(i,"ui-accordion-header-collapsed"),
// Work around for rendering bug in IE (#5421)
t.length&&(t.parent()[0].className=t.parent()[0].className),this._trigger("activate",null,e)}}),e.ui.safeActiveElement=function(e){var t;
// Support: IE 9 only
// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
try{t=e.activeElement}catch(i){t=e.body}
// Support: IE 9 - 11 only
// IE may return null instead of an element
// Interestingly, this only seems to occur when NOT in an iframe
// Support: IE 11 only
// IE11 returns a seemingly empty object in some cases when accessing
// document.activeElement from an <iframe>
return t||(t=e.body),t.nodeName||(t=e.body),t},e.widget("ui.menu",{version:"1.12.1",defaultElement:"<ul>",delay:300,options:{icons:{submenu:"ui-icon-caret-1-e"},items:"> *",menus:"ul",position:{my:"left top",at:"right top"},role:"menu",
// Callbacks
blur:null,focus:null,select:null},_create:function(){this.activeMenu=this.element,
// Flag used to prevent firing of the click handler
// as the event bubbles up through nested menus
this.mouseHandled=!1,this.element.uniqueId().attr({role:this.options.role,tabIndex:0}),this._addClass("ui-menu","ui-widget ui-widget-content"),this._on({
// Prevent focus from sticking to links inside menu after clicking
// them (focus should always stay on UL during navigation).
"mousedown .ui-menu-item":function(e){e.preventDefault()},"click .ui-menu-item":function(t){var i=e(t.target),s=e(e.ui.safeActiveElement(this.document[0]));!this.mouseHandled&&i.not(".ui-state-disabled").length&&(this.select(t),
// Only set the mouseHandled flag if the event will bubble, see #9469.
t.isPropagationStopped()||(this.mouseHandled=!0),
// Open submenu on click
i.has(".ui-menu").length?this.expand(t):!this.element.is(":focus")&&s.closest(".ui-menu").length&&(
// Redirect focus to the menu
this.element.trigger("focus",[!0]),
// If the active item is on the top level, let it stay active.
// Otherwise, blur the active item since it is no longer visible.
this.active&&1===this.active.parents(".ui-menu").length&&clearTimeout(this.timer)))},"mouseenter .ui-menu-item":function(t){
// Ignore mouse events while typeahead is active, see #10458.
// Prevents focusing the wrong item when typeahead causes a scroll while the mouse
// is over an item in the menu
if(!this.previousFilter){var i=e(t.target).closest(".ui-menu-item"),s=e(t.currentTarget);
// Ignore bubbled events on parent items, see #11641
i[0]===s[0]&&(
// Remove ui-state-active class from siblings of the newly focused menu item
// to avoid a jump caused by adjacent elements both having a class with a border
this._removeClass(s.siblings().children(".ui-state-active"),null,"ui-state-active"),this.focus(t,s))}},mouseleave:"collapseAll","mouseleave .ui-menu":"collapseAll",focus:function(e,t){
// If there's already an active item, keep it active
// If not, activate the first item
var i=this.active||this.element.find(this.options.items).eq(0);t||this.focus(e,i)},blur:function(t){this._delay(function(){!e.contains(this.element[0],e.ui.safeActiveElement(this.document[0]))&&this.collapseAll(t)})},keydown:"_keydown"}),this.refresh(),
// Clicks outside of a menu collapse any open menus
this._on(this.document,{click:function(e){this._closeOnDocumentClick(e)&&this.collapseAll(e),
// Reset the mouseHandled flag
this.mouseHandled=!1}})},_destroy:function(){var t=this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),i=t.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
// Destroy (sub)menus
this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show(),i.children().each(function(){var t=e(this);t.data("ui-menu-submenu-caret")&&t.remove()})},_keydown:function(t){var i,s,n,a,o=!0;switch(t.keyCode){case e.ui.keyCode.PAGE_UP:this.previousPage(t);break;case e.ui.keyCode.PAGE_DOWN:this.nextPage(t);break;case e.ui.keyCode.HOME:this._move("first","first",t);break;case e.ui.keyCode.END:this._move("last","last",t);break;case e.ui.keyCode.UP:this.previous(t);break;case e.ui.keyCode.DOWN:this.next(t);break;case e.ui.keyCode.LEFT:this.collapse(t);break;case e.ui.keyCode.RIGHT:this.active&&!this.active.is(".ui-state-disabled")&&this.expand(t);break;case e.ui.keyCode.ENTER:case e.ui.keyCode.SPACE:this._activate(t);break;case e.ui.keyCode.ESCAPE:this.collapse(t);break;default:o=!1,s=this.previousFilter||"",a=!1,
// Support number pad values
n=t.keyCode>=96&&t.keyCode<=105?(t.keyCode-96).toString():String.fromCharCode(t.keyCode),clearTimeout(this.filterTimer),n===s?a=!0:n=s+n,i=this._filterMenuItems(n),i=a&&-1!==i.index(this.active.next())?this.active.nextAll(".ui-menu-item"):i,
// If no matches on the current filter, reset to the last character pressed
// to move down the menu to the first item that starts with that character
i.length||(n=String.fromCharCode(t.keyCode),i=this._filterMenuItems(n)),i.length?(this.focus(t,i),this.previousFilter=n,this.filterTimer=this._delay(function(){delete this.previousFilter},1e3)):delete this.previousFilter}o&&t.preventDefault()},_activate:function(e){this.active&&!this.active.is(".ui-state-disabled")&&(this.active.children("[aria-haspopup='true']").length?this.expand(e):this.select(e))},refresh:function(){var t,i,s,n,a,o=this,r=this.options.icons.submenu,l=this.element.find(this.options.menus);this._toggleClass("ui-menu-icons",null,!!this.element.find(".ui-icon").length),
// Initialize nested menus
s=l.filter(":not(.ui-menu)").hide().attr({role:this.options.role,"aria-hidden":"true","aria-expanded":"false"}).each(function(){var t=e(this),i=t.prev(),s=e("<span>").data("ui-menu-submenu-caret",!0);o._addClass(s,"ui-menu-icon","ui-icon "+r),i.attr("aria-haspopup","true").prepend(s),t.attr("aria-labelledby",i.attr("id"))}),this._addClass(s,"ui-menu","ui-widget ui-widget-content ui-front"),t=l.add(this.element),i=t.find(this.options.items),
// Initialize menu-items containing spaces and/or dashes only as dividers
i.not(".ui-menu-item").each(function(){var t=e(this);o._isDivider(t)&&o._addClass(t,"ui-menu-divider","ui-widget-content")}),
// Don't refresh list items that are already adapted
n=i.not(".ui-menu-item, .ui-menu-divider"),a=n.children().not(".ui-menu").uniqueId().attr({tabIndex:-1,role:this._itemRole()}),this._addClass(n,"ui-menu-item")._addClass(a,"ui-menu-item-wrapper"),
// Add aria-disabled attribute to any disabled menu item
i.filter(".ui-state-disabled").attr("aria-disabled","true"),
// If the active item has been removed, blur the menu
this.active&&!e.contains(this.element[0],this.active[0])&&this.blur()},_itemRole:function(){return{menu:"menuitem",listbox:"option"}[this.options.role]},_setOption:function(e,t){if("icons"===e){var i=this.element.find(".ui-menu-icon");this._removeClass(i,null,this.options.icons.submenu)._addClass(i,null,t.submenu)}this._super(e,t)},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",String(e)),this._toggleClass(null,"ui-state-disabled",!!e)},focus:function(e,t){var i,s,n;this.blur(e,e&&"focus"===e.type),this._scrollIntoView(t),this.active=t.first(),s=this.active.children(".ui-menu-item-wrapper"),this._addClass(s,null,"ui-state-active"),
// Only update aria-activedescendant if there's a role
// otherwise we assume focus is managed elsewhere
this.options.role&&this.element.attr("aria-activedescendant",s.attr("id")),
// Highlight active parent menu item, if any
n=this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper"),this._addClass(n,null,"ui-state-active"),e&&"keydown"===e.type?this._close():this.timer=this._delay(function(){this._close()},this.delay),i=t.children(".ui-menu"),i.length&&e&&/^mouse/.test(e.type)&&this._startOpening(i),this.activeMenu=t.parent(),this._trigger("focus",e,{item:t})},_scrollIntoView:function(t){var i,s,n,a,o,r;this._hasScroll()&&(i=parseFloat(e.css(this.activeMenu[0],"borderTopWidth"))||0,s=parseFloat(e.css(this.activeMenu[0],"paddingTop"))||0,n=t.offset().top-this.activeMenu.offset().top-i-s,a=this.activeMenu.scrollTop(),o=this.activeMenu.height(),r=t.outerHeight(),n<0?this.activeMenu.scrollTop(a+n):n+r>o&&this.activeMenu.scrollTop(a+n-o+r))},blur:function(e,t){t||clearTimeout(this.timer),this.active&&(this._removeClass(this.active.children(".ui-menu-item-wrapper"),null,"ui-state-active"),this._trigger("blur",e,{item:this.active}),this.active=null)},_startOpening:function(e){clearTimeout(this.timer),
// Don't open if already open fixes a Firefox bug that caused a .5 pixel
// shift in the submenu position when mousing over the caret icon
"true"===e.attr("aria-hidden")&&(this.timer=this._delay(function(){this._close(),this._open(e)},this.delay))},_open:function(t){var i=e.extend({of:this.active},this.options.position);clearTimeout(this.timer),this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden","true"),t.show().removeAttr("aria-hidden").attr("aria-expanded","true").position(i)},collapseAll:function(t,i){clearTimeout(this.timer),this.timer=this._delay(function(){
// If we were passed an event, look for the submenu that contains the event
var s=i?this.element:e(t&&t.target).closest(this.element.find(".ui-menu"));
// If we found no valid submenu ancestor, use the main menu to close all
// sub menus anyway
s.length||(s=this.element),this._close(s),this.blur(t),
// Work around active item staying active after menu is blurred
this._removeClass(s.find(".ui-state-active"),null,"ui-state-active"),this.activeMenu=s},this.delay)},
// With no arguments, closes the currently active menu - if nothing is active
// it closes all menus.  If passed an argument, it will search for menus BELOW
_close:function(e){e||(e=this.active?this.active.parent():this.element),e.find(".ui-menu").hide().attr("aria-hidden","true").attr("aria-expanded","false")},_closeOnDocumentClick:function(t){return!e(t.target).closest(".ui-menu").length},_isDivider:function(e){
// Match hyphen, em dash, en dash
return!/[^\-\u2014\u2013\s]/.test(e.text())},collapse:function(e){var t=this.active&&this.active.parent().closest(".ui-menu-item",this.element);t&&t.length&&(this._close(),this.focus(e,t))},expand:function(e){var t=this.active&&this.active.children(".ui-menu ").find(this.options.items).first();t&&t.length&&(this._open(t.parent()),
// Delay so Firefox will not hide activedescendant change in expanding submenu from AT
this._delay(function(){this.focus(e,t)}))},next:function(e){this._move("next","first",e)},previous:function(e){this._move("prev","last",e)},isFirstItem:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},isLastItem:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},_move:function(e,t,i){var s;this.active&&(s="first"===e||"last"===e?this.active["first"===e?"prevAll":"nextAll"](".ui-menu-item").eq(-1):this.active[e+"All"](".ui-menu-item").eq(0)),s&&s.length&&this.active||(s=this.activeMenu.find(this.options.items)[t]()),this.focus(i,s)},nextPage:function(t){var i,s,n;if(!this.active)return void this.next(t);this.isLastItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.nextAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s-n<0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items)[this.active?"last":"first"]()))},previousPage:function(t){var i,s,n;if(!this.active)return void this.next(t);this.isFirstItem()||(this._hasScroll()?(s=this.active.offset().top,n=this.element.height(),this.active.prevAll(".ui-menu-item").each(function(){return i=e(this),i.offset().top-s+n>0}),this.focus(t,i)):this.focus(t,this.activeMenu.find(this.options.items).first()))},_hasScroll:function(){return this.element.outerHeight()<this.element.prop("scrollHeight")},select:function(t){
// TODO: It should never be possible to not have an active item at this
// point, but the tests don't trigger mouseenter before click.
this.active=this.active||e(t.target).closest(".ui-menu-item");var i={item:this.active};this.active.has(".ui-menu").length||this.collapseAll(t,!0),this._trigger("select",t,i)},_filterMenuItems:function(t){var i=t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&"),s=new RegExp("^"+i,"i");return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function(){return s.test(e.trim(e(this).children(".ui-menu-item-wrapper").text()))})}});/*!
 * jQuery UI Autocomplete 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Autocomplete
//>>group: Widgets
//>>description: Lists suggested words as the user is typing.
//>>docs: http://api.jqueryui.com/autocomplete/
//>>demos: http://jqueryui.com/autocomplete/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/autocomplete.css
//>>css.theme: ../../themes/base/theme.css
e.widget("ui.autocomplete",{version:"1.12.1",defaultElement:"<input>",options:{appendTo:null,autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null,
// Callbacks
change:null,close:null,focus:null,open:null,response:null,search:null,select:null},requestIndex:0,pending:0,_create:function(){
// Some browsers only repeat keydown events, not keypress events,
// so we use the suppressKeyPress flag to determine if we've already
// handled the keydown event. #7269
// Unfortunately the code for & in keypress is the same as the up arrow,
// so we use the suppressKeyPressRepeat flag to avoid handling keypress
// events when we know the keydown event was used to modify the
// search term. #7799
var t,i,s,n=this.element[0].nodeName.toLowerCase(),a="textarea"===n,o="input"===n;
// Textareas are always multi-line
// Inputs are always single-line, even if inside a contentEditable element
// IE also treats inputs as contentEditable
// All other element types are determined by whether or not they're contentEditable
this.isMultiLine=a||!o&&this._isContentEditable(this.element),this.valueMethod=this.element[a||o?"val":"text"],this.isNewMenu=!0,this._addClass("ui-autocomplete-input"),this.element.attr("autocomplete","off"),this._on(this.element,{keydown:function(n){if(this.element.prop("readOnly"))return t=!0,s=!0,void(i=!0);t=!1,s=!1,i=!1;var a=e.ui.keyCode;switch(n.keyCode){case a.PAGE_UP:t=!0,this._move("previousPage",n);break;case a.PAGE_DOWN:t=!0,this._move("nextPage",n);break;case a.UP:t=!0,this._keyEvent("previous",n);break;case a.DOWN:t=!0,this._keyEvent("next",n);break;case a.ENTER:
// when menu is open and has focus
this.menu.active&&(
// #6055 - Opera still allows the keypress to occur
// which causes forms to submit
t=!0,n.preventDefault(),this.menu.select(n));break;case a.TAB:this.menu.active&&this.menu.select(n);break;case a.ESCAPE:this.menu.element.is(":visible")&&(this.isMultiLine||this._value(this.term),this.close(n),
// Different browsers have different default behavior for escape
// Single press can mean undo or clear
// Double press in IE means clear the whole form
n.preventDefault());break;default:i=!0,
// search timeout should be triggered before the input value is changed
this._searchTimeout(n)}},keypress:function(s){if(t)return t=!1,void(this.isMultiLine&&!this.menu.element.is(":visible")||s.preventDefault());if(!i){
// Replicate some key handlers to allow them to repeat in Firefox and Opera
var n=e.ui.keyCode;switch(s.keyCode){case n.PAGE_UP:this._move("previousPage",s);break;case n.PAGE_DOWN:this._move("nextPage",s);break;case n.UP:this._keyEvent("previous",s);break;case n.DOWN:this._keyEvent("next",s)}}},input:function(e){if(s)return s=!1,void e.preventDefault();this._searchTimeout(e)},focus:function(){this.selectedItem=null,this.previous=this._value()},blur:function(e){if(this.cancelBlur)return void delete this.cancelBlur;clearTimeout(this.searching),this.close(e),this._change(e)}}),this._initSource(),this.menu=e("<ul>").appendTo(this._appendTo()).menu({
// disable ARIA support, the live region takes care of that
role:null}).hide().menu("instance"),this._addClass(this.menu.element,"ui-autocomplete","ui-front"),this._on(this.menu.element,{mousedown:function(t){
// prevent moving focus out of the text field
t.preventDefault(),
// IE doesn't prevent moving focus even with event.preventDefault()
// so we set a flag to know when we should ignore the blur event
this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,
// Support: IE 8 only
// Right clicking a menu item or selecting text from the menu items will
// result in focus moving out of the input. However, we've already received
// and ignored the blur event because of the cancelBlur flag set above. So
// we restore focus to ensure that the menu closes properly based on the user's
// next actions.
this.element[0]!==e.ui.safeActiveElement(this.document[0])&&this.element.trigger("focus")})},menufocus:function(t,i){var s,n;
// support: Firefox
// Prevent accidental activation of menu items in Firefox (#7024 #9118)
if(this.isNewMenu&&(this.isNewMenu=!1,t.originalEvent&&/^mouse/.test(t.originalEvent.type)))return this.menu.blur(),void this.document.one("mousemove",function(){e(t.target).trigger(t.originalEvent)});n=i.item.data("ui-autocomplete-item"),!1!==this._trigger("focus",t,{item:n})&&t.originalEvent&&/^key/.test(t.originalEvent.type)&&this._value(n.value),(
// Announce the value in the liveRegion
s=i.item.attr("aria-label")||n.value)&&e.trim(s).length&&(this.liveRegion.children().hide(),e("<div>").text(s).appendTo(this.liveRegion))},menuselect:function(t,i){var s=i.item.data("ui-autocomplete-item"),n=this.previous;
// Only trigger when focus was lost (click on menu)
this.element[0]!==e.ui.safeActiveElement(this.document[0])&&(this.element.trigger("focus"),this.previous=n,
// #6109 - IE triggers two focus events and the second
// is asynchronous, so we need to reset the previous
// term synchronously and asynchronously :-(
this._delay(function(){this.previous=n,this.selectedItem=s})),!1!==this._trigger("select",t,{item:s})&&this._value(s.value),
// reset the term after the select event
// this allows custom select handling to work properly
this.term=this._value(),this.close(t),this.selectedItem=s}}),this.liveRegion=e("<div>",{role:"status","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),
// Turning off autocomplete prevents the browser from remembering the
// value when navigating through history, so we re-enable autocomplete
// if the page is unloaded before the widget is destroyed. #7790
this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_destroy:function(){clearTimeout(this.searching),this.element.removeAttr("autocomplete"),this.menu.element.remove(),this.liveRegion.remove()},_setOption:function(e,t){this._super(e,t),"source"===e&&this._initSource(),"appendTo"===e&&this.menu.element.appendTo(this._appendTo()),"disabled"===e&&t&&this.xhr&&this.xhr.abort()},_isEventTargetInWidget:function(t){var i=this.menu.element[0];return t.target===this.element[0]||t.target===i||e.contains(i,t.target)},_closeOnClickOutside:function(e){this._isEventTargetInWidget(e)||this.close()},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front, dialog")),t.length||(t=this.document[0].body),t},_initSource:function(){var t,i,s=this;e.isArray(this.options.source)?(t=this.options.source,this.source=function(i,s){s(e.ui.autocomplete.filter(t,i.term))}):"string"==typeof this.options.source?(i=this.options.source,this.source=function(t,n){s.xhr&&s.xhr.abort(),s.xhr=e.ajax({url:i,data:t,dataType:"json",success:function(e){n(e)},error:function(){n([])}})}):this.source=this.options.source},_searchTimeout:function(e){clearTimeout(this.searching),this.searching=this._delay(function(){
// Search if the value has changed, or if the user retypes the same value (see #7434)
var t=this.term===this._value(),i=this.menu.element.is(":visible"),s=e.altKey||e.ctrlKey||e.metaKey||e.shiftKey;t&&(!t||i||s)||(this.selectedItem=null,this.search(null,e))},this.options.delay)},search:function(e,t){
// Always save the actual value, not the one passed as an argument
return e=null!=e?e:this._value(),this.term=this._value(),e.length<this.options.minLength?this.close(t):!1!==this._trigger("search",t)?this._search(e):void 0},_search:function(e){this.pending++,this._addClass("ui-autocomplete-loading"),this.cancelSearch=!1,this.source({term:e},this._response())},_response:function(){var t=++this.requestIndex;return e.proxy(function(e){t===this.requestIndex&&this.__response(e),--this.pending||this._removeClass("ui-autocomplete-loading")},this)},__response:function(e){e&&(e=this._normalize(e)),this._trigger("response",null,{content:e}),!this.options.disabled&&e&&e.length&&!this.cancelSearch?(this._suggest(e),this._trigger("open")):
// use ._close() instead of .close() so we don't cancel future searches
this._close()},close:function(e){this.cancelSearch=!0,this._close(e)},_close:function(e){
// Remove the handler that closes the menu on outside clicks
this._off(this.document,"mousedown"),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.blur(),this.isNewMenu=!0,this._trigger("close",e))},_change:function(e){this.previous!==this._value()&&this._trigger("change",e,{item:this.selectedItem})},_normalize:function(t){
// assume all items have the right format when the first item is complete
// assume all items have the right format when the first item is complete
return t.length&&t[0].label&&t[0].value?t:e.map(t,function(t){return"string"==typeof t?{label:t,value:t}:e.extend({},t,{label:t.label||t.value,value:t.value||t.label})})},_suggest:function(t){var i=this.menu.element.empty();this._renderMenu(i,t),this.isNewMenu=!0,this.menu.refresh(),
// Size and position menu
i.show(),this._resizeMenu(),i.position(e.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(),
// Listen for interactions outside of the widget (#6642)
this._on(this.document,{mousedown:"_closeOnClickOutside"})},_resizeMenu:function(){var e=this.menu.element;e.outerWidth(Math.max(
// Firefox wraps long text (possibly a rounding bug)
// so we add 1px to avoid the wrapping (#7513)
e.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(t,i){var s=this;e.each(i,function(e,i){s._renderItemData(t,i)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-autocomplete-item",t)},_renderItem:function(t,i){return e("<li>").append(e("<div>").text(i.label)).appendTo(t)},_move:function(e,t){return this.menu.element.is(":visible")?this.menu.isFirstItem()&&/^previous/.test(e)||this.menu.isLastItem()&&/^next/.test(e)?(this.isMultiLine||this._value(this.term),void this.menu.blur()):void this.menu[e](t):void this.search(null,t)},widget:function(){return this.menu.element},_value:function(){return this.valueMethod.apply(this.element,arguments)},_keyEvent:function(e,t){this.isMultiLine&&!this.menu.element.is(":visible")||(this._move(e,t),
// Prevents moving cursor to beginning/end of the text field in some browsers
t.preventDefault())},
// Support: Chrome <=50
// We should be able to just use this.element.prop( "isContentEditable" )
// but hidden elements always report false in Chrome.
// https://code.google.com/p/chromium/issues/detail?id=313082
_isContentEditable:function(e){if(!e.length)return!1;var t=e.prop("contentEditable");return"inherit"===t?this._isContentEditable(e.parent()):"true"===t}}),e.extend(e.ui.autocomplete,{escapeRegex:function(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")},filter:function(t,i){var s=new RegExp(e.ui.autocomplete.escapeRegex(i),"i");return e.grep(t,function(e){return s.test(e.label||e.value||e)})}}),
// Live region extension, adding a `messages` option
// NOTE: This is an experimental API. We are still investigating
// a full solution for string manipulation and internationalization.
e.widget("ui.autocomplete",e.ui.autocomplete,{options:{messages:{noResults:"No search results.",results:function(e){return e+(e>1?" results are":" result is")+" available, use up and down arrow keys to navigate."}}},__response:function(t){var i;this._superApply(arguments),this.options.disabled||this.cancelSearch||(i=t&&t.length?this.options.messages.results(t.length):this.options.messages.noResults,this.liveRegion.children().hide(),e("<div>").text(i).appendTo(this.liveRegion))}});var d=(e.ui.autocomplete,/ui-corner-([a-z]){2,6}/g);e.widget("ui.controlgroup",{version:"1.12.1",defaultElement:"<div>",options:{direction:"horizontal",disabled:null,onlyVisible:!0,items:{button:"input[type=button], input[type=submit], input[type=reset], button, a",controlgroupLabel:".ui-controlgroup-label",checkboxradio:"input[type='checkbox'], input[type='radio']",selectmenu:"select",spinner:".ui-spinner-input"}},_create:function(){this._enhance()},
// To support the enhanced option in jQuery Mobile, we isolate DOM manipulation
_enhance:function(){this.element.attr("role","toolbar"),this.refresh()},_destroy:function(){this._callChildMethod("destroy"),this.childWidgets.removeData("ui-controlgroup-data"),this.element.removeAttr("role"),this.options.items.controlgroupLabel&&this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()},_initWidgets:function(){var t=this,i=[];
// First we iterate over each of the items options
e.each(this.options.items,function(s,n){var a,o={};
// Make sure the widget has a selector set
if(n)
// Make sure the widget actually exists
// We assume everything is in the middle to start because we can't determine
// first / last elements until all enhancments are done.
// Find instances of this widget inside controlgroup and init them
return"controlgroupLabel"===s?(a=t.element.find(n),a.each(function(){var t=e(this);t.children(".ui-controlgroup-label-contents").length||t.contents().wrapAll("<span class='ui-controlgroup-label-contents'></span>")}),t._addClass(a,null,"ui-widget ui-widget-content ui-state-default"),void(i=i.concat(a.get()))):void(e.fn[s]&&(o=t["_"+s+"Options"]?t["_"+s+"Options"]("middle"):{classes:{}},t.element.find(n).each(function(){var n=e(this),a=n[s]("instance"),r=e.widget.extend({},o);
// If the button is the child of a spinner ignore it
// TODO: Find a more generic solution
if("button"!==s||!n.parent(".ui-spinner").length){
// Create the widget if it doesn't exist
a||(a=n[s]()[s]("instance")),a&&(r.classes=t._resolveClassesValues(r.classes,a)),n[s](r);
// Store an instance of the controlgroup to be able to reference
// from the outermost element for changing options and refresh
var l=n[s]("widget");e.data(l[0],"ui-controlgroup-data",a||n[s]("instance")),i.push(l[0])}})))}),this.childWidgets=e(e.unique(i)),this._addClass(this.childWidgets,"ui-controlgroup-item")},_callChildMethod:function(t){this.childWidgets.each(function(){var i=e(this),s=i.data("ui-controlgroup-data");s&&s[t]&&s[t]()})},_updateCornerClass:function(e,t){var i=this._buildSimpleOptions(t,"label").classes.label;this._removeClass(e,null,"ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all"),this._addClass(e,null,i)},_buildSimpleOptions:function(e,t){var i="vertical"===this.options.direction,s={classes:{}};return s.classes[t]={middle:"",first:"ui-corner-"+(i?"top":"left"),last:"ui-corner-"+(i?"bottom":"right"),only:"ui-corner-all"}[e],s},_spinnerOptions:function(e){var t=this._buildSimpleOptions(e,"ui-spinner");return t.classes["ui-spinner-up"]="",t.classes["ui-spinner-down"]="",t},_buttonOptions:function(e){return this._buildSimpleOptions(e,"ui-button")},_checkboxradioOptions:function(e){return this._buildSimpleOptions(e,"ui-checkboxradio-label")},_selectmenuOptions:function(e){var t="vertical"===this.options.direction;return{width:!!t&&"auto",classes:{middle:{"ui-selectmenu-button-open":"","ui-selectmenu-button-closed":""},first:{"ui-selectmenu-button-open":"ui-corner-"+(t?"top":"tl"),"ui-selectmenu-button-closed":"ui-corner-"+(t?"top":"left")},last:{"ui-selectmenu-button-open":t?"":"ui-corner-tr","ui-selectmenu-button-closed":"ui-corner-"+(t?"bottom":"right")},only:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"}}[e]}},_resolveClassesValues:function(t,i){var s={};return e.each(t,function(n){var a=i.options.classes[n]||"";a=e.trim(a.replace(d,"")),s[n]=(a+" "+t[n]).replace(/\s+/g," ")}),s},_setOption:function(e,t){if("direction"===e&&this._removeClass("ui-controlgroup-"+this.options.direction),this._super(e,t),"disabled"===e)return void this._callChildMethod(t?"disable":"enable");this.refresh()},refresh:function(){var t,i=this;this._addClass("ui-controlgroup ui-controlgroup-"+this.options.direction),"horizontal"===this.options.direction&&this._addClass(null,"ui-helper-clearfix"),this._initWidgets(),t=this.childWidgets,
// We filter here because we need to track all childWidgets not just the visible ones
this.options.onlyVisible&&(t=t.filter(":visible")),t.length&&(
// We do this last because we need to make sure all enhancment is done
// before determining first and last
e.each(["first","last"],function(e,s){var n=t[s]().data("ui-controlgroup-data");if(n&&i["_"+n.widgetName+"Options"]){var a=i["_"+n.widgetName+"Options"](1===t.length?"only":s);a.classes=i._resolveClassesValues(a.classes,n),n.element[n.widgetName](a)}else i._updateCornerClass(t[s](),s)}),
// Finally call the refresh method on each of the child widgets.
this._callChildMethod("refresh"))}});/*!
 * jQuery UI Checkboxradio 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Checkboxradio
//>>group: Widgets
//>>description: Enhances a form with multiple themeable checkboxes or radio buttons.
//>>docs: http://api.jqueryui.com/checkboxradio/
//>>demos: http://jqueryui.com/checkboxradio/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.structure: ../../themes/base/checkboxradio.css
//>>css.theme: ../../themes/base/theme.css
e.widget("ui.checkboxradio",[e.ui.formResetMixin,{version:"1.12.1",options:{disabled:null,label:null,icon:!0,classes:{"ui-checkboxradio-label":"ui-corner-all","ui-checkboxradio-icon":"ui-corner-all"}},_getCreateOptions:function(){var t,i,s=this,n=this._super()||{};
// We read the type here, because it makes more sense to throw a element type error first,
// rather then the error for lack of a label. Often if its the wrong type, it
// won't have a label (e.g. calling on a div, btn, etc)
// If there are multiple labels, use the last one
// We need to get the label text but this may also need to make sure it does not contain the
// input itself.
// Set the label option if we found label text
return this._readType(),i=this.element.labels(),this.label=e(i[i.length-1]),this.label.length||e.error("No label found for checkboxradio widget"),this.originalLabel="",this.label.contents().not(this.element[0]).each(function(){
// The label contents could be text, html, or a mix. We concat each element to get a
// string representation of the label, without the input as part of it.
s.originalLabel+=3===this.nodeType?e(this).text():this.outerHTML}),this.originalLabel&&(n.label=this.originalLabel),t=this.element[0].disabled,null!=t&&(n.disabled=t),n},_create:function(){var e=this.element[0].checked;this._bindFormResetHandler(),null==this.options.disabled&&(this.options.disabled=this.element[0].disabled),this._setOption("disabled",this.options.disabled),this._addClass("ui-checkboxradio","ui-helper-hidden-accessible"),this._addClass(this.label,"ui-checkboxradio-label","ui-button ui-widget"),"radio"===this.type&&this._addClass(this.label,"ui-checkboxradio-radio-label"),this.options.label&&this.options.label!==this.originalLabel?this._updateLabel():this.originalLabel&&(this.options.label=this.originalLabel),this._enhance(),e&&(this._addClass(this.label,"ui-checkboxradio-checked","ui-state-active"),this.icon&&this._addClass(this.icon,null,"ui-state-hover")),this._on({change:"_toggleClasses",focus:function(){this._addClass(this.label,null,"ui-state-focus ui-visual-focus")},blur:function(){this._removeClass(this.label,null,"ui-state-focus ui-visual-focus")}})},_readType:function(){var t=this.element[0].nodeName.toLowerCase();this.type=this.element[0].type,"input"===t&&/radio|checkbox/.test(this.type)||e.error("Can't create checkboxradio on element.nodeName="+t+" and element.type="+this.type)},
// Support jQuery Mobile enhanced option
_enhance:function(){this._updateIcon(this.element[0].checked)},widget:function(){return this.label},_getRadioGroup:function(){var t,i=this.element[0].name,s="input[name='"+e.ui.escapeSelector(i)+"']";return i?(t=this.form.length?e(this.form[0].elements).filter(s):e(s).filter(function(){return 0===e(this).form().length}),t.not(this.element)):e([])},_toggleClasses:function(){var t=this.element[0].checked;this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",t),this.options.icon&&"checkbox"===this.type&&this._toggleClass(this.icon,null,"ui-icon-check ui-state-checked",t)._toggleClass(this.icon,null,"ui-icon-blank",!t),"radio"===this.type&&this._getRadioGroup().each(function(){var t=e(this).checkboxradio("instance");t&&t._removeClass(t.label,"ui-checkboxradio-checked","ui-state-active")})},_destroy:function(){this._unbindFormResetHandler(),this.icon&&(this.icon.remove(),this.iconSpace.remove())},_setOption:function(e,t){
// We don't allow the value to be set to nothing
if("label"!==e||t){if(this._super(e,t),"disabled"===e)
// Don't refresh when setting disabled
return this._toggleClass(this.label,null,"ui-state-disabled",t),void(this.element[0].disabled=t);this.refresh()}},_updateIcon:function(t){var i="ui-icon ui-icon-background ";this.options.icon?(this.icon||(this.icon=e("<span>"),this.iconSpace=e("<span> </span>"),this._addClass(this.iconSpace,"ui-checkboxradio-icon-space")),"checkbox"===this.type?(i+=t?"ui-icon-check ui-state-checked":"ui-icon-blank",this._removeClass(this.icon,null,t?"ui-icon-blank":"ui-icon-check")):i+="ui-icon-blank",this._addClass(this.icon,"ui-checkboxradio-icon",i),t||this._removeClass(this.icon,null,"ui-icon-check ui-state-checked"),this.icon.prependTo(this.label).after(this.iconSpace)):void 0!==this.icon&&(this.icon.remove(),this.iconSpace.remove(),delete this.icon)},_updateLabel:function(){
// Remove the contents of the label ( minus the icon, icon space, and input )
var e=this.label.contents().not(this.element[0]);this.icon&&(e=e.not(this.icon[0])),this.iconSpace&&(e=e.not(this.iconSpace[0])),e.remove(),this.label.append(this.options.label)},refresh:function(){var e=this.element[0].checked,t=this.element[0].disabled;this._updateIcon(e),this._toggleClass(this.label,"ui-checkboxradio-checked","ui-state-active",e),null!==this.options.label&&this._updateLabel(),t!==this.options.disabled&&this._setOptions({disabled:t})}}]);e.ui.checkboxradio;/*!
 * jQuery UI Button 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Button
//>>group: Widgets
//>>description: Enhances a form with themeable buttons.
//>>docs: http://api.jqueryui.com/button/
//>>demos: http://jqueryui.com/button/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/button.css
//>>css.theme: ../../themes/base/theme.css
e.widget("ui.button",{version:"1.12.1",defaultElement:"<button>",options:{classes:{"ui-button":"ui-corner-all"},disabled:null,icon:null,iconPosition:"beginning",label:null,showLabel:!0},_getCreateOptions:function(){var e,
// This is to support cases like in jQuery Mobile where the base widget does have
// an implementation of _getCreateOptions
t=this._super()||{};return this.isInput=this.element.is("input"),e=this.element[0].disabled,null!=e&&(t.disabled=e),this.originalLabel=this.isInput?this.element.val():this.element.html(),this.originalLabel&&(t.label=this.originalLabel),t},_create:function(){!this.option.showLabel&!this.options.icon&&(this.options.showLabel=!0),
// We have to check the option again here even though we did in _getCreateOptions,
// because null may have been passed on init which would override what was set in
// _getCreateOptions
null==this.options.disabled&&(this.options.disabled=this.element[0].disabled||!1),this.hasTitle=!!this.element.attr("title"),
// Check to see if the label needs to be set or if its already correct
this.options.label&&this.options.label!==this.originalLabel&&(this.isInput?this.element.val(this.options.label):this.element.html(this.options.label)),this._addClass("ui-button","ui-widget"),this._setOption("disabled",this.options.disabled),this._enhance(),this.element.is("a")&&this._on({keyup:function(t){t.keyCode===e.ui.keyCode.SPACE&&(t.preventDefault(),
// Support: PhantomJS <= 1.9, IE 8 Only
// If a native click is available use it so we actually cause navigation
// otherwise just trigger a click event
this.element[0].click?this.element[0].click():this.element.trigger("click"))}})},_enhance:function(){this.element.is("button")||this.element.attr("role","button"),this.options.icon&&(this._updateIcon("icon",this.options.icon),this._updateTooltip())},_updateTooltip:function(){this.title=this.element.attr("title"),this.options.showLabel||this.title||this.element.attr("title",this.options.label)},_updateIcon:function(t,i){var s="iconPosition"!==t,n=s?this.options.iconPosition:i,a="top"===n||"bottom"===n;
// Create icon
this.icon?s&&
// If we are updating the icon remove the old icon class
this._removeClass(this.icon,null,this.options.icon):(this.icon=e("<span>"),this._addClass(this.icon,"ui-button-icon","ui-icon"),this.options.showLabel||this._addClass("ui-button-icon-only")),
// If we are updating the icon add the new icon class
s&&this._addClass(this.icon,null,i),this._attachIcon(n),
// If the icon is on top or bottom we need to add the ui-widget-icon-block class and remove
// the iconSpace if there is one.
a?(this._addClass(this.icon,null,"ui-widget-icon-block"),this.iconSpace&&this.iconSpace.remove()):(
// Position is beginning or end so remove the ui-widget-icon-block class and add the
// space if it does not exist
this.iconSpace||(this.iconSpace=e("<span> </span>"),this._addClass(this.iconSpace,"ui-button-icon-space")),this._removeClass(this.icon,null,"ui-wiget-icon-block"),this._attachIconSpace(n))},_destroy:function(){this.element.removeAttr("role"),this.icon&&this.icon.remove(),this.iconSpace&&this.iconSpace.remove(),this.hasTitle||this.element.removeAttr("title")},_attachIconSpace:function(e){this.icon[/^(?:end|bottom)/.test(e)?"before":"after"](this.iconSpace)},_attachIcon:function(e){this.element[/^(?:end|bottom)/.test(e)?"append":"prepend"](this.icon)},_setOptions:function(e){var t=void 0===e.showLabel?this.options.showLabel:e.showLabel,i=void 0===e.icon?this.options.icon:e.icon;t||i||(e.showLabel=!0),this._super(e)},_setOption:function(e,t){"icon"===e&&(t?this._updateIcon(e,t):this.icon&&(this.icon.remove(),this.iconSpace&&this.iconSpace.remove())),"iconPosition"===e&&this._updateIcon(e,t),
// Make sure we can't end up with a button that has neither text nor icon
"showLabel"===e&&(this._toggleClass("ui-button-icon-only",null,!t),this._updateTooltip()),"label"===e&&(this.isInput?this.element.val(t):(
// If there is an icon, append it, else nothing then append the value
// this avoids removal of the icon when setting label text
this.element.html(t),this.icon&&(this._attachIcon(this.options.iconPosition),this._attachIconSpace(this.options.iconPosition)))),this._super(e,t),"disabled"===e&&(this._toggleClass(null,"ui-state-disabled",t),this.element[0].disabled=t,t&&this.element.blur())},refresh:function(){
// Make sure to only check disabled if its an element that supports this otherwise
// check for the disabled class to determine state
var e=this.element.is("input, button")?this.element[0].disabled:this.element.hasClass("ui-button-disabled");e!==this.options.disabled&&this._setOptions({disabled:e}),this._updateTooltip()}}),
// DEPRECATED
!1!==e.uiBackCompat&&(
// Text and Icons options
e.widget("ui.button",e.ui.button,{options:{text:!0,icons:{primary:null,secondary:null}},_create:function(){this.options.showLabel&&!this.options.text&&(this.options.showLabel=this.options.text),!this.options.showLabel&&this.options.text&&(this.options.text=this.options.showLabel),this.options.icon||!this.options.icons.primary&&!this.options.icons.secondary?this.options.icon&&(this.options.icons.primary=this.options.icon):this.options.icons.primary?this.options.icon=this.options.icons.primary:(this.options.icon=this.options.icons.secondary,this.options.iconPosition="end"),this._super()},_setOption:function(e,t){if("text"===e)return void this._super("showLabel",t);"showLabel"===e&&(this.options.text=t),"icon"===e&&(this.options.icons.primary=t),"icons"===e&&(t.primary?(this._super("icon",t.primary),this._super("iconPosition","beginning")):t.secondary&&(this._super("icon",t.secondary),this._super("iconPosition","end"))),this._superApply(arguments)}}),e.fn.button=function(t){return function(){return!this.length||this.length&&"INPUT"!==this[0].tagName||this.length&&"INPUT"===this[0].tagName&&"checkbox"!==this.attr("type")&&"radio"!==this.attr("type")?t.apply(this,arguments):(e.ui.checkboxradio||e.error("Checkboxradio widget missing"),0===arguments.length?this.checkboxradio({icon:!1}):this.checkboxradio.apply(this,arguments))}}(e.fn.button),e.fn.buttonset=function(){return e.ui.controlgroup||e.error("Controlgroup widget missing"),"option"===arguments[0]&&"items"===arguments[1]&&arguments[2]?this.controlgroup.apply(this,[arguments[0],"items.button",arguments[2]]):"option"===arguments[0]&&"items"===arguments[1]?this.controlgroup.apply(this,[arguments[0],"items.button"]):("object"==typeof arguments[0]&&arguments[0].items&&(arguments[0].items={button:arguments[0].items}),this.controlgroup.apply(this,arguments))});e.ui.button;
// jscs:disable maximumLineLength
/* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */
/*!
 * jQuery UI Datepicker 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Datepicker
//>>group: Widgets
//>>description: Displays a calendar from an input or inline for selecting dates.
//>>docs: http://api.jqueryui.com/datepicker/
//>>demos: http://jqueryui.com/datepicker/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/datepicker.css
//>>css.theme: ../../themes/base/theme.css
e.extend(e.ui,{datepicker:{version:"1.12.1"}});var p;e.extend(s.prototype,{/* Class name added to elements to indicate already configured with a date picker. */
markerClassName:"hasDatepicker",
//Keep track of the maximum number of rows displayed (see #7043)
maxRows:4,
// TODO rename to "widget" when switching to widget factory
_widgetDatepicker:function(){return this.dpDiv},/* Override the default settings for all instances of the date picker.
	 * @param  settings  object - the new settings to use as defaults (anonymous object)
	 * @return the manager object
	 */
setDefaults:function(e){return o(this._defaults,e||{}),this},/* Attach the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
	 */
_attachDatepicker:function(t,i){var s,n,a;s=t.nodeName.toLowerCase(),n="div"===s||"span"===s,t.id||(this.uuid+=1,t.id="dp"+this.uuid),a=this._newInst(e(t),n),a.settings=e.extend({},i||{}),"input"===s?this._connectDatepicker(t,a):n&&this._inlineDatepicker(t,a)},/* Create a new instance object. */
_newInst:function(t,i){// escape jQuery meta chars
return{id:t[0].id.replace(/([^A-Za-z0-9_\-])/g,"\\\\$1"),input:t,// associated target
selectedDay:0,selectedMonth:0,selectedYear:0,// current selection
drawMonth:0,drawYear:0,// month being drawn
inline:i,// is datepicker inline or not
dpDiv:i?// presentation div
n(e("<div class='"+this._inlineClass+" ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")):this.dpDiv}},/* Attach the date picker to an input field. */
_connectDatepicker:function(t,i){var s=e(t);i.append=e([]),i.trigger=e([]),s.hasClass(this.markerClassName)||(this._attachments(s,i),s.addClass(this.markerClassName).on("keydown",this._doKeyDown).on("keypress",this._doKeyPress).on("keyup",this._doKeyUp),this._autoSize(i),e.data(t,"datepicker",i),
//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
i.settings.disabled&&this._disableDatepicker(t))},/* Make attachments based on settings. */
_attachments:function(t,i){var s,n,a,o=this._get(i,"appendText"),r=this._get(i,"isRTL");i.append&&i.append.remove(),o&&(i.append=e("<span class='"+this._appendClass+"'>"+o+"</span>"),t[r?"before":"after"](i.append)),t.off("focus",this._showDatepicker),i.trigger&&i.trigger.remove(),s=this._get(i,"showOn"),"focus"!==s&&"both"!==s||// pop-up date picker when in the marked field
t.on("focus",this._showDatepicker),"button"!==s&&"both"!==s||(// pop-up date picker when button clicked
n=this._get(i,"buttonText"),a=this._get(i,"buttonImage"),i.trigger=e(this._get(i,"buttonImageOnly")?e("<img/>").addClass(this._triggerClass).attr({src:a,alt:n,title:n}):e("<button type='button'></button>").addClass(this._triggerClass).html(a?e("<img/>").attr({src:a,alt:n,title:n}):n)),t[r?"before":"after"](i.trigger),i.trigger.on("click",function(){return e.datepicker._datepickerShowing&&e.datepicker._lastInput===t[0]?e.datepicker._hideDatepicker():e.datepicker._datepickerShowing&&e.datepicker._lastInput!==t[0]?(e.datepicker._hideDatepicker(),e.datepicker._showDatepicker(t[0])):e.datepicker._showDatepicker(t[0]),!1}))},/* Apply the maximum length for the date format. */
_autoSize:function(e){if(this._get(e,"autoSize")&&!e.inline){var t,i,s,n,a=new Date(2009,11,20),// Ensure double digits
o=this._get(e,"dateFormat");o.match(/[DM]/)&&(t=function(e){for(i=0,s=0,n=0;n<e.length;n++)e[n].length>i&&(i=e[n].length,s=n);return s},a.setMonth(t(this._get(e,o.match(/MM/)?"monthNames":"monthNamesShort"))),a.setDate(t(this._get(e,o.match(/DD/)?"dayNames":"dayNamesShort"))+20-a.getDay())),e.input.attr("size",this._formatDate(e,a).length)}},/* Attach an inline date picker to a div. */
_inlineDatepicker:function(t,i){var s=e(t);s.hasClass(this.markerClassName)||(s.addClass(this.markerClassName).append(i.dpDiv),e.data(t,"datepicker",i),this._setDate(i,this._getDefaultDate(i),!0),this._updateDatepicker(i),this._updateAlternate(i),
//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
i.settings.disabled&&this._disableDatepicker(t),
// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
i.dpDiv.css("display","block"))},/* Pop-up the date picker in a "dialog" box.
	 * @param  input element - ignored
	 * @param  date	string or Date - the initial date to display
	 * @param  onSelect  function - the function to call when a date is selected
	 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	 * @param  pos int[2] - coordinates for the dialog's position within the screen or
	 *					event - with x/y coordinates or
	 *					leave empty for default (screen centre)
	 * @return the manager object
	 */
_dialogDatepicker:function(t,i,s,n,a){var r,l,h,c,u,d=this._dialogInst;// internal instance
// should use actual width/height below
// Move input on screen for focus, but hidden behind dialog
return d||(this.uuid+=1,r="dp"+this.uuid,this._dialogInput=e("<input type='text' id='"+r+"' style='position: absolute; top: -100px; width: 0px;'/>"),this._dialogInput.on("keydown",this._doKeyDown),e("body").append(this._dialogInput),d=this._dialogInst=this._newInst(this._dialogInput,!1),d.settings={},e.data(this._dialogInput[0],"datepicker",d)),o(d.settings,n||{}),i=i&&i.constructor===Date?this._formatDate(d,i):i,this._dialogInput.val(i),this._pos=a?a.length?a:[a.pageX,a.pageY]:null,this._pos||(l=document.documentElement.clientWidth,h=document.documentElement.clientHeight,c=document.documentElement.scrollLeft||document.body.scrollLeft,u=document.documentElement.scrollTop||document.body.scrollTop,this._pos=[l/2-100+c,h/2-150+u]),this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),d.settings.onSelect=s,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),e.blockUI&&e.blockUI(this.dpDiv),e.data(this._dialogInput[0],"datepicker",d),this},/* Detach a datepicker from its control.
	 * @param  target	element - the target input field or division or span
	 */
_destroyDatepicker:function(t){var i,s=e(t),n=e.data(t,"datepicker");s.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),e.removeData(t,"datepicker"),"input"===i?(n.append.remove(),n.trigger.remove(),s.removeClass(this.markerClassName).off("focus",this._showDatepicker).off("keydown",this._doKeyDown).off("keypress",this._doKeyPress).off("keyup",this._doKeyUp)):"div"!==i&&"span"!==i||s.removeClass(this.markerClassName).empty(),p===n&&(p=null))},/* Enable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
_enableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!1,a.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""})):"div"!==i&&"span"!==i||(s=n.children("."+this._inlineClass),s.children().removeClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!1)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}))},/* Disable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
_disableDatepicker:function(t){var i,s,n=e(t),a=e.data(t,"datepicker");n.hasClass(this.markerClassName)&&(i=t.nodeName.toLowerCase(),"input"===i?(t.disabled=!0,a.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"})):"div"!==i&&"span"!==i||(s=n.children("."+this._inlineClass),s.children().addClass("ui-state-disabled"),s.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled",!0)),this._disabledInputs=e.map(this._disabledInputs,function(e){return e===t?null:e}),// delete entry
this._disabledInputs[this._disabledInputs.length]=t)},/* Is the first field in a jQuery collection disabled as a datepicker?
	 * @param  target	element - the target input field or division or span
	 * @return boolean - true if disabled, false if enabled
	 */
_isDisabledDatepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]===e)return!0;return!1},/* Retrieve the instance data for the target control.
	 * @param  target  element - the target input field or division or span
	 * @return  object - the associated instance data
	 * @throws  error if a jQuery problem getting data
	 */
_getInst:function(t){try{return e.data(t,"datepicker")}catch(e){throw"Missing instance data for this datepicker"}},/* Update or retrieve the settings for a date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 * @param  name	object - the new settings to update or
	 *				string - the name of the setting to change or retrieve,
	 *				when retrieving also "all" for all instance settings or
	 *				"defaults" for all global defaults
	 * @param  value   any - the new value for the setting
	 *				(omit if above is an object or to retrieve a value)
	 */
_optionDatepicker:function(t,i,s){var n,a,r,l,h=this._getInst(t);if(2===arguments.length&&"string"==typeof i)return"defaults"===i?e.extend({},e.datepicker._defaults):h?"all"===i?e.extend({},h.settings):this._get(h,i):null;n=i||{},"string"==typeof i&&(n={},n[i]=s),h&&(this._curInst===h&&this._hideDatepicker(),a=this._getDateDatepicker(t,!0),r=this._getMinMaxDate(h,"min"),l=this._getMinMaxDate(h,"max"),o(h.settings,n),
// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
null!==r&&void 0!==n.dateFormat&&void 0===n.minDate&&(h.settings.minDate=this._formatDate(h,r)),null!==l&&void 0!==n.dateFormat&&void 0===n.maxDate&&(h.settings.maxDate=this._formatDate(h,l)),"disabled"in n&&(n.disabled?this._disableDatepicker(t):this._enableDatepicker(t)),this._attachments(e(t),h),this._autoSize(h),this._setDate(h,a),this._updateAlternate(h),this._updateDatepicker(h))},
// Change method deprecated
_changeDatepicker:function(e,t,i){this._optionDatepicker(e,t,i)},/* Redraw the date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 */
_refreshDatepicker:function(e){var t=this._getInst(e);t&&this._updateDatepicker(t)},/* Set the dates for a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  date	Date - the new date
	 */
_setDateDatepicker:function(e,t){var i=this._getInst(e);i&&(this._setDate(i,t),this._updateDatepicker(i),this._updateAlternate(i))},/* Get the date(s) for the first entry in a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  noDefault boolean - true if no default date is to be used
	 * @return Date - the current date
	 */
_getDateDatepicker:function(e,t){var i=this._getInst(e);return i&&!i.inline&&this._setDateFromField(i,t),i?this._getDate(i):null},/* Handle keystrokes. */
_doKeyDown:function(t){var i,s,n,a=e.datepicker._getInst(t.target),o=!0,r=a.dpDiv.is(".ui-datepicker-rtl");if(a._keyEvent=!0,e.datepicker._datepickerShowing)switch(t.keyCode){case 9:e.datepicker._hideDatepicker(),o=!1;break;// hide on tab out
case 13:
// Trigger custom callback
return n=e("td."+e.datepicker._dayOverClass+":not(."+e.datepicker._currentClass+")",a.dpDiv),n[0]&&e.datepicker._selectDay(t.target,a.selectedMonth,a.selectedYear,n[0]),i=e.datepicker._get(a,"onSelect"),i?(s=e.datepicker._formatDate(a),i.apply(a.input?a.input[0]:null,[s,a])):e.datepicker._hideDatepicker(),!1;// don't submit the form
case 27:e.datepicker._hideDatepicker();break;// hide on escape
case 33:e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");break;// previous month/year on page up/+ ctrl
case 34:e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");break;// next month/year on page down/+ ctrl
case 35:(t.ctrlKey||t.metaKey)&&e.datepicker._clearDate(t.target),o=t.ctrlKey||t.metaKey;break;// clear on ctrl or command +end
case 36:(t.ctrlKey||t.metaKey)&&e.datepicker._gotoToday(t.target),o=t.ctrlKey||t.metaKey;break;// current on ctrl or command +home
case 37:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?1:-1,"D"),o=t.ctrlKey||t.metaKey,
// -1 day on ctrl or command +left
t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?-e.datepicker._get(a,"stepBigMonths"):-e.datepicker._get(a,"stepMonths"),"M");
// next month/year on alt +left on Mac
break;case 38:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,-7,"D"),o=t.ctrlKey||t.metaKey;break;// -1 week on ctrl or command +up
case 39:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,r?-1:1,"D"),o=t.ctrlKey||t.metaKey,
// +1 day on ctrl or command +right
t.originalEvent.altKey&&e.datepicker._adjustDate(t.target,t.ctrlKey?+e.datepicker._get(a,"stepBigMonths"):+e.datepicker._get(a,"stepMonths"),"M");
// next month/year on alt +right
break;case 40:(t.ctrlKey||t.metaKey)&&e.datepicker._adjustDate(t.target,7,"D"),o=t.ctrlKey||t.metaKey;break;// +1 week on ctrl or command +down
default:o=!1}else 36===t.keyCode&&t.ctrlKey?// display the date picker on ctrl+home
e.datepicker._showDatepicker(this):o=!1;o&&(t.preventDefault(),t.stopPropagation())},/* Filter entered characters - based on date format. */
_doKeyPress:function(t){var i,s,n=e.datepicker._getInst(t.target);if(e.datepicker._get(n,"constrainInput"))return i=e.datepicker._possibleChars(e.datepicker._get(n,"dateFormat")),s=String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),t.ctrlKey||t.metaKey||s<" "||!i||i.indexOf(s)>-1},/* Synchronise manual entry and field/alternate field. */
_doKeyUp:function(t){var i,s=e.datepicker._getInst(t.target);if(s.input.val()!==s.lastVal)try{i=e.datepicker.parseDate(e.datepicker._get(s,"dateFormat"),s.input?s.input.val():null,e.datepicker._getFormatConfig(s)),i&&(// only if valid
e.datepicker._setDateFromField(s),e.datepicker._updateAlternate(s),e.datepicker._updateDatepicker(s))}catch(e){}return!0},/* Pop-up the date picker for a given input field.
	 * If false returned from beforeShow event handler do not show.
	 * @param  input  element - the input field attached to the date picker or
	 *					event - if triggered by focus
	 */
_showDatepicker:function(t){if(t=t.target||t,"input"!==t.nodeName.toLowerCase()&&(// find from button/image trigger
t=e("input",t.parentNode)[0]),!e.datepicker._isDisabledDatepicker(t)&&e.datepicker._lastInput!==t){var s,n,a,r,l,h,c;s=e.datepicker._getInst(t),e.datepicker._curInst&&e.datepicker._curInst!==s&&(e.datepicker._curInst.dpDiv.stop(!0,!0),s&&e.datepicker._datepickerShowing&&e.datepicker._hideDatepicker(e.datepicker._curInst.input[0])),n=e.datepicker._get(s,"beforeShow"),a=n?n.apply(t,[t,s]):{},!1!==a&&(o(s.settings,a),s.lastVal=null,e.datepicker._lastInput=t,e.datepicker._setDateFromField(s),e.datepicker._inDialog&&(// hide cursor
t.value=""),e.datepicker._pos||(// position below input
e.datepicker._pos=e.datepicker._findPos(t),e.datepicker._pos[1]+=t.offsetHeight),r=!1,e(t).parents().each(function(){return!(r|="fixed"===e(this).css("position"))}),l={left:e.datepicker._pos[0],top:e.datepicker._pos[1]},e.datepicker._pos=null,
//to avoid flashes on Firefox
s.dpDiv.empty(),
// determine sizing offscreen
s.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),e.datepicker._updateDatepicker(s),
// fix width for dynamic number of date pickers
// and adjust position before showing
l=e.datepicker._checkOffset(s,l,r),s.dpDiv.css({position:e.datepicker._inDialog&&e.blockUI?"static":r?"fixed":"absolute",display:"none",left:l.left+"px",top:l.top+"px"}),s.inline||(h=e.datepicker._get(s,"showAnim"),c=e.datepicker._get(s,"duration"),s.dpDiv.css("z-index",i(e(t))+1),e.datepicker._datepickerShowing=!0,e.effects&&e.effects.effect[h]?s.dpDiv.show(h,e.datepicker._get(s,"showOptions"),c):s.dpDiv[h||"show"](h?c:null),e.datepicker._shouldFocusInput(s)&&s.input.trigger("focus"),e.datepicker._curInst=s))}},/* Generate the date picker content. */
_updateDatepicker:function(t){this.maxRows=4,//Reset the max number of rows being displayed (see #7043)
p=t,// for delegate hover events
t.dpDiv.empty().append(this._generateHTML(t)),this._attachHandlers(t);var i,s=this._getNumberOfMonths(t),n=s[1],o=t.dpDiv.find("."+this._dayOverClass+" a");o.length>0&&a.apply(o.get(0)),t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),n>1&&t.dpDiv.addClass("ui-datepicker-multi-"+n).css("width",17*n+"em"),t.dpDiv[(1!==s[0]||1!==s[1]?"add":"remove")+"Class"]("ui-datepicker-multi"),t.dpDiv[(this._get(t,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),t===e.datepicker._curInst&&e.datepicker._datepickerShowing&&e.datepicker._shouldFocusInput(t)&&t.input.trigger("focus"),
// Deffered render of the years select (to avoid flashes on Firefox)
t.yearshtml&&(i=t.yearshtml,setTimeout(function(){
//assure that inst.yearshtml didn't change.
i===t.yearshtml&&t.yearshtml&&t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml),i=t.yearshtml=null},0))},
// #6694 - don't focus the input if it's already focused
// this breaks the change event in IE
// Support: IE and jQuery <1.9
_shouldFocusInput:function(e){return e.input&&e.input.is(":visible")&&!e.input.is(":disabled")&&!e.input.is(":focus")},/* Check positioning to remain on screen. */
_checkOffset:function(t,i,s){var n=t.dpDiv.outerWidth(),a=t.dpDiv.outerHeight(),o=t.input?t.input.outerWidth():0,r=t.input?t.input.outerHeight():0,l=document.documentElement.clientWidth+(s?0:e(document).scrollLeft()),h=document.documentElement.clientHeight+(s?0:e(document).scrollTop());
// Now check if datepicker is showing outside window viewport - move to a better place if so.
return i.left-=this._get(t,"isRTL")?n-o:0,i.left-=s&&i.left===t.input.offset().left?e(document).scrollLeft():0,i.top-=s&&i.top===t.input.offset().top+r?e(document).scrollTop():0,i.left-=Math.min(i.left,i.left+n>l&&l>n?Math.abs(i.left+n-l):0),i.top-=Math.min(i.top,i.top+a>h&&h>a?Math.abs(a+r):0),i},/* Find an object's position on the screen. */
_findPos:function(t){for(var i,s=this._getInst(t),n=this._get(s,"isRTL");t&&("hidden"===t.type||1!==t.nodeType||e.expr.filters.hidden(t));)t=t[n?"previousSibling":"nextSibling"];return i=e(t).offset(),[i.left,i.top]},/* Hide the date picker from view.
	 * @param  input  element - the input field attached to the date picker
	 */
_hideDatepicker:function(t){var i,s,n,a,o=this._curInst;!o||t&&o!==e.data(t,"datepicker")||this._datepickerShowing&&(i=this._get(o,"showAnim"),s=this._get(o,"duration"),n=function(){e.datepicker._tidyDialog(o)},
// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
e.effects&&(e.effects.effect[i]||e.effects[i])?o.dpDiv.hide(i,e.datepicker._get(o,"showOptions"),s,n):o.dpDiv["slideDown"===i?"slideUp":"fadeIn"===i?"fadeOut":"hide"](i?s:null,n),i||n(),this._datepickerShowing=!1,a=this._get(o,"onClose"),a&&a.apply(o.input?o.input[0]:null,[o.input?o.input.val():"",o]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),e.blockUI&&(e.unblockUI(),e("body").append(this.dpDiv))),this._inDialog=!1)},/* Tidy up after a dialog display. */
_tidyDialog:function(e){e.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")},/* Close date picker if clicked elsewhere. */
_checkExternalClick:function(t){if(e.datepicker._curInst){var i=e(t.target),s=e.datepicker._getInst(i[0]);(i[0].id===e.datepicker._mainDivId||0!==i.parents("#"+e.datepicker._mainDivId).length||i.hasClass(e.datepicker.markerClassName)||i.closest("."+e.datepicker._triggerClass).length||!e.datepicker._datepickerShowing||e.datepicker._inDialog&&e.blockUI)&&(!i.hasClass(e.datepicker.markerClassName)||e.datepicker._curInst===s)||e.datepicker._hideDatepicker()}},/* Adjust one of the date sub-fields. */
_adjustDate:function(t,i,s){var n=e(t),a=this._getInst(n[0]);this._isDisabledDatepicker(n[0])||(this._adjustInstDate(a,i+("M"===s?this._get(a,"showCurrentAtPos"):0),// undo positioning
s),this._updateDatepicker(a))},/* Action for current link. */
_gotoToday:function(t){var i,s=e(t),n=this._getInst(s[0]);this._get(n,"gotoCurrent")&&n.currentDay?(n.selectedDay=n.currentDay,n.drawMonth=n.selectedMonth=n.currentMonth,n.drawYear=n.selectedYear=n.currentYear):(i=new Date,n.selectedDay=i.getDate(),n.drawMonth=n.selectedMonth=i.getMonth(),n.drawYear=n.selectedYear=i.getFullYear()),this._notifyChange(n),this._adjustDate(s)},/* Action for selecting a new month/year. */
_selectMonthYear:function(t,i,s){var n=e(t),a=this._getInst(n[0]);a["selected"+("M"===s?"Month":"Year")]=a["draw"+("M"===s?"Month":"Year")]=parseInt(i.options[i.selectedIndex].value,10),this._notifyChange(a),this._adjustDate(n)},/* Action for selecting a day. */
_selectDay:function(t,i,s,n){var a,o=e(t);e(n).hasClass(this._unselectableClass)||this._isDisabledDatepicker(o[0])||(a=this._getInst(o[0]),a.selectedDay=a.currentDay=e("a",n).html(),a.selectedMonth=a.currentMonth=i,a.selectedYear=a.currentYear=s,this._selectDate(t,this._formatDate(a,a.currentDay,a.currentMonth,a.currentYear)))},/* Erase the input field and hide the date picker. */
_clearDate:function(t){var i=e(t);this._selectDate(i,"")},/* Update the input field with the selected date. */
_selectDate:function(t,i){var s,n=e(t),a=this._getInst(n[0]);i=null!=i?i:this._formatDate(a),a.input&&a.input.val(i),this._updateAlternate(a),s=this._get(a,"onSelect"),s?s.apply(a.input?a.input[0]:null,[i,a]):a.input&&a.input.trigger("change"),a.inline?this._updateDatepicker(a):(this._hideDatepicker(),this._lastInput=a.input[0],"object"!=typeof a.input[0]&&a.input.trigger("focus"),this._lastInput=null)},/* Update any alternate field to synchronise with the main field. */
_updateAlternate:function(t){var i,s,n,a=this._get(t,"altField");a&&(// update alternate field too
i=this._get(t,"altFormat")||this._get(t,"dateFormat"),s=this._getDate(t),n=this.formatDate(i,s,this._getFormatConfig(t)),e(a).val(n))},/* Set as beforeShowDay function to prevent selection of weekends.
	 * @param  date  Date - the date to customise
	 * @return [boolean, string] - is this date selectable?, what is its CSS class?
	 */
noWeekends:function(e){var t=e.getDay();return[t>0&&t<6,""]},/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	 * @param  date  Date - the date to get the week for
	 * @return  number - the number of the week within the year that contains this date
	 */
iso8601Week:function(e){var t,i=new Date(e.getTime());
// Find Thursday of this week starting on Monday
// Compare with Jan 1
return i.setDate(i.getDate()+4-(i.getDay()||7)),t=i.getTime(),i.setMonth(0),i.setDate(1),Math.floor(Math.round((t-i)/864e5)/7)+1},/* Parse a string value into a date object.
	 * See formatDate below for the possible formats.
	 *
	 * @param  format string - the expected format of the date
	 * @param  value string - the date in the above format
	 * @param  settings Object - attributes include:
	 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  Date - the extracted date value or null if value is blank
	 */
parseDate:function(t,i,s){if(null==t||null==i)throw"Invalid arguments";if(""===(i="object"==typeof i?i.toString():i+""))return null;var n,a,o,r,l=0,h=(s?s.shortYearCutoff:null)||this._defaults.shortYearCutoff,c="string"!=typeof h?h:(new Date).getFullYear()%100+parseInt(h,10),u=(s?s.dayNamesShort:null)||this._defaults.dayNamesShort,d=(s?s.dayNames:null)||this._defaults.dayNames,p=(s?s.monthNamesShort:null)||this._defaults.monthNamesShort,f=(s?s.monthNames:null)||this._defaults.monthNames,m=-1,g=-1,v=-1,_=-1,b=!1,
// Check whether a format character is doubled
w=function(e){var i=n+1<t.length&&t.charAt(n+1)===e;return i&&n++,i},
// Extract a number from the string value
y=function(e){var t=w(e),s="@"===e?14:"!"===e?20:"y"===e&&t?4:"o"===e?3:2,n="y"===e?s:1,a=new RegExp("^\\d{"+n+","+s+"}"),o=i.substring(l).match(a);if(!o)throw"Missing number at position "+l;return l+=o[0].length,parseInt(o[0],10)},
// Extract a name from the string value and convert to an index
x=function(t,s,n){var a=-1,o=e.map(w(t)?n:s,function(e,t){return[[t,e]]}).sort(function(e,t){return-(e[1].length-t[1].length)});if(e.each(o,function(e,t){var s=t[1];if(i.substr(l,s.length).toLowerCase()===s.toLowerCase())return a=t[0],l+=s.length,!1}),-1!==a)return a+1;throw"Unknown name at position "+l},
// Confirm that a literal character matches the string value
C=function(){if(i.charAt(l)!==t.charAt(n))throw"Unexpected literal at position "+l;l++};for(n=0;n<t.length;n++)if(b)"'"!==t.charAt(n)||w("'")?C():b=!1;else switch(t.charAt(n)){case"d":v=y("d");break;case"D":x("D",u,d);break;case"o":_=y("o");break;case"m":g=y("m");break;case"M":g=x("M",p,f);break;case"y":m=y("y");break;case"@":r=new Date(y("@")),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"!":r=new Date((y("!")-this._ticksTo1970)/1e4),m=r.getFullYear(),g=r.getMonth()+1,v=r.getDate();break;case"'":w("'")?C():b=!0;break;default:C()}if(l<i.length&&(o=i.substr(l),!/^\s+/.test(o)))throw"Extra/unparsed characters found in date: "+o;if(-1===m?m=(new Date).getFullYear():m<100&&(m+=(new Date).getFullYear()-(new Date).getFullYear()%100+(m<=c?0:-100)),_>-1)for(g=1,v=_;;){if(a=this._getDaysInMonth(m,g-1),v<=a)break;g++,v-=a}if(r=this._daylightSavingAdjust(new Date(m,g-1,v)),r.getFullYear()!==m||r.getMonth()+1!==g||r.getDate()!==v)throw"Invalid date";return r},/* Standard date formats. */
ATOM:"yy-mm-dd",// RFC 3339 (ISO 8601)
COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",// RFC 822
TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",// ISO 8601
_ticksTo1970:24*(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*60*60*1e7,/* Format a date object into a string value.
	 * The format can be combinations of the following:
	 * d  - day of month (no leading zero)
	 * dd - day of month (two digit)
	 * o  - day of year (no leading zeros)
	 * oo - day of year (three digit)
	 * D  - day name short
	 * DD - day name long
	 * m  - month of year (no leading zero)
	 * mm - month of year (two digit)
	 * M  - month name short
	 * MM - month name long
	 * y  - year (two digit)
	 * yy - year (four digit)
	 * @ - Unix timestamp (ms since 01/01/1970)
	 * ! - Windows ticks (100ns since 01/01/0001)
	 * "..." - literal text
	 * '' - single quote
	 *
	 * @param  format string - the desired format of the date
	 * @param  date Date - the date value to format
	 * @param  settings Object - attributes include:
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  string - the date in the above format
	 */
formatDate:function(e,t,i){if(!t)return"";var s,n=(i?i.dayNamesShort:null)||this._defaults.dayNamesShort,a=(i?i.dayNames:null)||this._defaults.dayNames,o=(i?i.monthNamesShort:null)||this._defaults.monthNamesShort,r=(i?i.monthNames:null)||this._defaults.monthNames,
// Check whether a format character is doubled
l=function(t){var i=s+1<e.length&&e.charAt(s+1)===t;return i&&s++,i},
// Format a number, with leading zero if necessary
h=function(e,t,i){var s=""+t;if(l(e))for(;s.length<i;)s="0"+s;return s},
// Format a name, short or long as requested
c=function(e,t,i,s){return l(e)?s[t]:i[t]},u="",d=!1;if(t)for(s=0;s<e.length;s++)if(d)"'"!==e.charAt(s)||l("'")?u+=e.charAt(s):d=!1;else switch(e.charAt(s)){case"d":u+=h("d",t.getDate(),2);break;case"D":u+=c("D",t.getDay(),n,a);break;case"o":u+=h("o",Math.round((new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()-new Date(t.getFullYear(),0,0).getTime())/864e5),3);break;case"m":u+=h("m",t.getMonth()+1,2);break;case"M":u+=c("M",t.getMonth(),o,r);break;case"y":u+=l("y")?t.getFullYear():(t.getFullYear()%100<10?"0":"")+t.getFullYear()%100;break;case"@":u+=t.getTime();break;case"!":u+=1e4*t.getTime()+this._ticksTo1970;break;case"'":l("'")?u+="'":d=!0;break;default:u+=e.charAt(s)}return u},/* Extract all possible characters from the date format. */
_possibleChars:function(e){var t,i="",s=!1,
// Check whether a format character is doubled
n=function(i){var s=t+1<e.length&&e.charAt(t+1)===i;return s&&t++,s};for(t=0;t<e.length;t++)if(s)"'"!==e.charAt(t)||n("'")?i+=e.charAt(t):s=!1;else switch(e.charAt(t)){case"d":case"m":case"y":case"@":i+="0123456789";break;case"D":case"M":return null;// Accept anything
case"'":n("'")?i+="'":s=!0;break;default:i+=e.charAt(t)}return i},/* Get a setting value, defaulting if necessary. */
_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},/* Parse existing date and initialise date picker. */
_setDateFromField:function(e,t){if(e.input.val()!==e.lastVal){var i=this._get(e,"dateFormat"),s=e.lastVal=e.input?e.input.val():null,n=this._getDefaultDate(e),a=n,o=this._getFormatConfig(e);try{a=this.parseDate(i,s,o)||n}catch(e){s=t?"":s}e.selectedDay=a.getDate(),e.drawMonth=e.selectedMonth=a.getMonth(),e.drawYear=e.selectedYear=a.getFullYear(),e.currentDay=s?a.getDate():0,e.currentMonth=s?a.getMonth():0,e.currentYear=s?a.getFullYear():0,this._adjustInstDate(e)}},/* Retrieve the default date shown on opening. */
_getDefaultDate:function(e){return this._restrictMinMax(e,this._determineDate(e,this._get(e,"defaultDate"),new Date))},/* A date may be specified as an exact value or a relative one. */
_determineDate:function(t,i,s){var n=null==i||""===i?s:"string"==typeof i?function(i){try{return e.datepicker.parseDate(e.datepicker._get(t,"dateFormat"),i,e.datepicker._getFormatConfig(t))}catch(e){}for(var s=(i.toLowerCase().match(/^c/)?e.datepicker._getDate(t):null)||new Date,n=s.getFullYear(),a=s.getMonth(),o=s.getDate(),r=/([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,l=r.exec(i);l;){switch(l[2]||"d"){case"d":case"D":o+=parseInt(l[1],10);break;case"w":case"W":o+=7*parseInt(l[1],10);break;case"m":case"M":a+=parseInt(l[1],10),o=Math.min(o,e.datepicker._getDaysInMonth(n,a));break;case"y":case"Y":n+=parseInt(l[1],10),o=Math.min(o,e.datepicker._getDaysInMonth(n,a))}l=r.exec(i)}return new Date(n,a,o)}(i):"number"==typeof i?isNaN(i)?s:function(e){var t=new Date;return t.setDate(t.getDate()+e),t}(i):new Date(i.getTime());return n=n&&"Invalid Date"===n.toString()?s:n,n&&(n.setHours(0),n.setMinutes(0),n.setSeconds(0),n.setMilliseconds(0)),this._daylightSavingAdjust(n)},/* Handle switch to/from daylight saving.
	 * Hours may be non-zero on daylight saving cut-over:
	 * > 12 when midnight changeover, but then cannot generate
	 * midnight datetime, so jump to 1AM, otherwise reset.
	 * @param  date  (Date) the date to check
	 * @return  (Date) the corrected date
	 */
_daylightSavingAdjust:function(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null},/* Set the date(s) directly. */
_setDate:function(e,t,i){var s=!t,n=e.selectedMonth,a=e.selectedYear,o=this._restrictMinMax(e,this._determineDate(e,t,new Date));e.selectedDay=e.currentDay=o.getDate(),e.drawMonth=e.selectedMonth=e.currentMonth=o.getMonth(),e.drawYear=e.selectedYear=e.currentYear=o.getFullYear(),n===e.selectedMonth&&a===e.selectedYear||i||this._notifyChange(e),this._adjustInstDate(e),e.input&&e.input.val(s?"":this._formatDate(e))},/* Retrieve the date(s) directly. */
_getDate:function(e){return!e.currentYear||e.input&&""===e.input.val()?null:this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay))},/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
_attachHandlers:function(t){var i=this._get(t,"stepMonths"),s="#"+t.id.replace(/\\\\/g,"\\");t.dpDiv.find("[data-handler]").map(function(){var t={prev:function(){e.datepicker._adjustDate(s,-i,"M")},next:function(){e.datepicker._adjustDate(s,+i,"M")},hide:function(){e.datepicker._hideDatepicker()},today:function(){e.datepicker._gotoToday(s)},selectDay:function(){return e.datepicker._selectDay(s,+this.getAttribute("data-month"),+this.getAttribute("data-year"),this),!1},selectMonth:function(){return e.datepicker._selectMonthYear(s,this,"M"),!1},selectYear:function(){return e.datepicker._selectMonthYear(s,this,"Y"),!1}};e(this).on(this.getAttribute("data-event"),t[this.getAttribute("data-handler")])})},/* Generate the HTML for the current state of the date picker. */
_generateHTML:function(e){var t,i,s,n,a,o,r,l,h,c,u,d,p,f,m,g,v,_,b,w,y,x,C,S,k,T,D,M,I,P,z,E,A,O,H,$,L,B,N,W=new Date,R=this._daylightSavingAdjust(new Date(W.getFullYear(),W.getMonth(),W.getDate())),// clear time
F=this._get(e,"isRTL"),q=this._get(e,"showButtonPanel"),Y=this._get(e,"hideIfNoPrevNext"),j=this._get(e,"navigationAsDateFormat"),X=this._getNumberOfMonths(e),G=this._get(e,"showCurrentAtPos"),U=this._get(e,"stepMonths"),V=1!==X[0]||1!==X[1],K=this._daylightSavingAdjust(e.currentDay?new Date(e.currentYear,e.currentMonth,e.currentDay):new Date(9999,9,9)),Q=this._getMinMaxDate(e,"min"),Z=this._getMinMaxDate(e,"max"),J=e.drawMonth-G,ee=e.drawYear;if(J<0&&(J+=12,ee--),Z)for(t=this._daylightSavingAdjust(new Date(Z.getFullYear(),Z.getMonth()-X[0]*X[1]+1,Z.getDate())),t=Q&&t<Q?Q:t;this._daylightSavingAdjust(new Date(ee,J,1))>t;)--J<0&&(J=11,ee--);for(e.drawMonth=J,e.drawYear=ee,i=this._get(e,"prevText"),i=j?this.formatDate(i,this._daylightSavingAdjust(new Date(ee,J-U,1)),this._getFormatConfig(e)):i,s=this._canAdjustMonth(e,-1,ee,J)?"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(F?"e":"w")+"'>"+i+"</span></a>":Y?"":"<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+i+"'><span class='ui-icon ui-icon-circle-triangle-"+(F?"e":"w")+"'>"+i+"</span></a>",n=this._get(e,"nextText"),n=j?this.formatDate(n,this._daylightSavingAdjust(new Date(ee,J+U,1)),this._getFormatConfig(e)):n,a=this._canAdjustMonth(e,1,ee,J)?"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(F?"w":"e")+"'>"+n+"</span></a>":Y?"":"<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+n+"'><span class='ui-icon ui-icon-circle-triangle-"+(F?"w":"e")+"'>"+n+"</span></a>",o=this._get(e,"currentText"),r=this._get(e,"gotoCurrent")&&e.currentDay?K:R,o=j?this.formatDate(o,r,this._getFormatConfig(e)):o,l=e.inline?"":"<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>"+this._get(e,"closeText")+"</button>",h=q?"<div class='ui-datepicker-buttonpane ui-widget-content'>"+(F?l:"")+(this._isInRange(e,r)?"<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>"+o+"</button>":"")+(F?"":l)+"</div>":"",c=parseInt(this._get(e,"firstDay"),10),c=isNaN(c)?0:c,u=this._get(e,"showWeek"),d=this._get(e,"dayNames"),p=this._get(e,"dayNamesMin"),f=this._get(e,"monthNames"),m=this._get(e,"monthNamesShort"),g=this._get(e,"beforeShowDay"),v=this._get(e,"showOtherMonths"),_=this._get(e,"selectOtherMonths"),b=this._getDefaultDate(e),w="",x=0;x<X[0];x++){for(C="",this.maxRows=4,S=0;S<X[1];S++){if(k=this._daylightSavingAdjust(new Date(ee,J,e.selectedDay)),T=" ui-corner-all",D="",V){if(D+="<div class='ui-datepicker-group",X[1]>1)switch(S){case 0:D+=" ui-datepicker-group-first",T=" ui-corner-"+(F?"right":"left");break;case X[1]-1:D+=" ui-datepicker-group-last",T=" ui-corner-"+(F?"left":"right");break;default:D+=" ui-datepicker-group-middle",T=""}D+="'>"}for(D+="<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix"+T+"'>"+(/all|left/.test(T)&&0===x?F?a:s:"")+(/all|right/.test(T)&&0===x?F?s:a:"")+this._generateMonthYearHeader(e,J,ee,Q,Z,x>0||S>0,f,m)+// draw month headers
"</div><table class='ui-datepicker-calendar'><thead><tr>",M=u?"<th class='ui-datepicker-week-col'>"+this._get(e,"weekHeader")+"</th>":"",y=0;y<7;y++)// days of the week
I=(y+c)%7,M+="<th scope='col'"+((y+c+6)%7>=5?" class='ui-datepicker-week-end'":"")+"><span title='"+d[I]+"'>"+p[I]+"</span></th>";for(D+=M+"</tr></thead><tbody>",P=this._getDaysInMonth(ee,J),ee===e.selectedYear&&J===e.selectedMonth&&(e.selectedDay=Math.min(e.selectedDay,P)),z=(this._getFirstDayOfMonth(ee,J)-c+7)%7,E=Math.ceil((z+P)/7),// calculate the number of rows to generate
A=V&&this.maxRows>E?this.maxRows:E,//If multiple months, use the higher number of rows (see #7043)
this.maxRows=A,O=this._daylightSavingAdjust(new Date(ee,J,1-z)),H=0;H<A;H++){for(// create date picker rows
D+="<tr>",$=u?"<td class='ui-datepicker-week-col'>"+this._get(e,"calculateWeek")(O)+"</td>":"",y=0;y<7;y++)// create date picker days
L=g?g.apply(e.input?e.input[0]:null,[O]):[!0,""],B=O.getMonth()!==J,N=B&&!_||!L[0]||Q&&O<Q||Z&&O>Z,$+="<td class='"+((y+c+6)%7>=5?" ui-datepicker-week-end":"")+(// highlight weekends
B?" ui-datepicker-other-month":"")+(// highlight days from other months
O.getTime()===k.getTime()&&J===e.selectedMonth&&e._keyEvent||// user pressed key
b.getTime()===O.getTime()&&b.getTime()===k.getTime()?
// or defaultDate is current printedDate and defaultDate is selectedDate
" "+this._dayOverClass:"")+(// highlight selected day
N?" "+this._unselectableClass+" ui-state-disabled":"")+(// highlight unselectable days
B&&!v?"":" "+L[1]+(// highlight custom dates
O.getTime()===K.getTime()?" "+this._currentClass:"")+(// highlight selected day
O.getTime()===R.getTime()?" ui-datepicker-today":""))+"'"+(// highlight today (if different)
B&&!v||!L[2]?"":" title='"+L[2].replace(/'/g,"&#39;")+"'")+(// cell title
N?"":" data-handler='selectDay' data-event='click' data-month='"+O.getMonth()+"' data-year='"+O.getFullYear()+"'")+">"+(// actions
B&&!v?"&#xa0;":// display for other months
N?"<span class='ui-state-default'>"+O.getDate()+"</span>":"<a class='ui-state-default"+(O.getTime()===R.getTime()?" ui-state-highlight":"")+(O.getTime()===K.getTime()?" ui-state-active":"")+(// highlight selected day
B?" ui-priority-secondary":"")+// distinguish dates from other months
"' href='#'>"+O.getDate()+"</a>")+"</td>",// display selectable date
O.setDate(O.getDate()+1),O=this._daylightSavingAdjust(O);D+=$+"</tr>"}J++,J>11&&(J=0,ee++),D+="</tbody></table>"+(V?"</div>"+(X[0]>0&&S===X[1]-1?"<div class='ui-datepicker-row-break'></div>":""):""),C+=D}w+=C}return w+=h,e._keyEvent=!1,w},/* Generate the month and year header. */
_generateMonthYearHeader:function(e,t,i,s,n,a,o,r){var l,h,c,u,d,p,f,m,g=this._get(e,"changeMonth"),v=this._get(e,"changeYear"),_=this._get(e,"showMonthAfterYear"),b="<div class='ui-datepicker-title'>",w="";
// Month selection
if(a||!g)w+="<span class='ui-datepicker-month'>"+o[t]+"</span>";else{for(l=s&&s.getFullYear()===i,h=n&&n.getFullYear()===i,w+="<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",c=0;c<12;c++)(!l||c>=s.getMonth())&&(!h||c<=n.getMonth())&&(w+="<option value='"+c+"'"+(c===t?" selected='selected'":"")+">"+r[c]+"</option>");w+="</select>"}
// Year selection
if(_||(b+=w+(!a&&g&&v?"":"&#xa0;")),!e.yearshtml)if(e.yearshtml="",a||!v)b+="<span class='ui-datepicker-year'>"+i+"</span>";else{for(
// determine range of years to display
u=this._get(e,"yearRange").split(":"),d=(new Date).getFullYear(),p=function(e){var t=e.match(/c[+\-].*/)?i+parseInt(e.substring(1),10):e.match(/[+\-].*/)?d+parseInt(e,10):parseInt(e,10);return isNaN(t)?d:t},f=p(u[0]),m=Math.max(f,p(u[1]||"")),f=s?Math.max(f,s.getFullYear()):f,m=n?Math.min(m,n.getFullYear()):m,e.yearshtml+="<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";f<=m;f++)e.yearshtml+="<option value='"+f+"'"+(f===i?" selected='selected'":"")+">"+f+"</option>";e.yearshtml+="</select>",b+=e.yearshtml,e.yearshtml=null}// Close datepicker_header
return b+=this._get(e,"yearSuffix"),_&&(b+=(!a&&g&&v?"":"&#xa0;")+w),b+="</div>"},/* Adjust one of the date sub-fields. */
_adjustInstDate:function(e,t,i){var s=e.selectedYear+("Y"===i?t:0),n=e.selectedMonth+("M"===i?t:0),a=Math.min(e.selectedDay,this._getDaysInMonth(s,n))+("D"===i?t:0),o=this._restrictMinMax(e,this._daylightSavingAdjust(new Date(s,n,a)));e.selectedDay=o.getDate(),e.drawMonth=e.selectedMonth=o.getMonth(),e.drawYear=e.selectedYear=o.getFullYear(),"M"!==i&&"Y"!==i||this._notifyChange(e)},/* Ensure a date is within any min/max bounds. */
_restrictMinMax:function(e,t){var i=this._getMinMaxDate(e,"min"),s=this._getMinMaxDate(e,"max"),n=i&&t<i?i:t;return s&&n>s?s:n},/* Notify change of month/year. */
_notifyChange:function(e){var t=this._get(e,"onChangeMonthYear");t&&t.apply(e.input?e.input[0]:null,[e.selectedYear,e.selectedMonth+1,e])},/* Determine the number of months to show. */
_getNumberOfMonths:function(e){var t=this._get(e,"numberOfMonths");return null==t?[1,1]:"number"==typeof t?[1,t]:t},/* Determine the current maximum date - ensure no time components are set. */
_getMinMaxDate:function(e,t){return this._determineDate(e,this._get(e,t+"Date"),null)},/* Find the number of days in a given month. */
_getDaysInMonth:function(e,t){return 32-this._daylightSavingAdjust(new Date(e,t,32)).getDate()},/* Find the day of the week of the first of a month. */
_getFirstDayOfMonth:function(e,t){return new Date(e,t,1).getDay()},/* Determines if we should allow a "next/prev" month display change. */
_canAdjustMonth:function(e,t,i,s){var n=this._getNumberOfMonths(e),a=this._daylightSavingAdjust(new Date(i,s+(t<0?t:n[0]*n[1]),1));return t<0&&a.setDate(this._getDaysInMonth(a.getFullYear(),a.getMonth())),this._isInRange(e,a)},/* Is the given date in the accepted range? */
_isInRange:function(e,t){var i,s,n=this._getMinMaxDate(e,"min"),a=this._getMinMaxDate(e,"max"),o=null,r=null,l=this._get(e,"yearRange");return l&&(i=l.split(":"),s=(new Date).getFullYear(),o=parseInt(i[0],10),r=parseInt(i[1],10),i[0].match(/[+\-].*/)&&(o+=s),i[1].match(/[+\-].*/)&&(r+=s)),(!n||t.getTime()>=n.getTime())&&(!a||t.getTime()<=a.getTime())&&(!o||t.getFullYear()>=o)&&(!r||t.getFullYear()<=r)},/* Provide the configuration settings for formatting/parsing. */
_getFormatConfig:function(e){var t=this._get(e,"shortYearCutoff");return t="string"!=typeof t?t:(new Date).getFullYear()%100+parseInt(t,10),{shortYearCutoff:t,dayNamesShort:this._get(e,"dayNamesShort"),dayNames:this._get(e,"dayNames"),monthNamesShort:this._get(e,"monthNamesShort"),monthNames:this._get(e,"monthNames")}},/* Format the given date for display. */
_formatDate:function(e,t,i,s){t||(e.currentDay=e.selectedDay,e.currentMonth=e.selectedMonth,e.currentYear=e.selectedYear);var n=t?"object"==typeof t?t:this._daylightSavingAdjust(new Date(s,i,t)):this._daylightSavingAdjust(new Date(e.currentYear,e.currentMonth,e.currentDay));return this.formatDate(this._get(e,"dateFormat"),n,this._getFormatConfig(e))}}),/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */
e.fn.datepicker=function(t){/* Verify an empty collection wasn't passed - Fixes #6976 */
if(!this.length)return this;/* Initialise the date picker. */
e.datepicker.initialized||(e(document).on("mousedown",e.datepicker._checkExternalClick),e.datepicker.initialized=!0),/* Append datepicker main container to body if not exist. */
0===e("#"+e.datepicker._mainDivId).length&&e("body").append(e.datepicker.dpDiv);var i=Array.prototype.slice.call(arguments,1);return"string"!=typeof t||"isDisabled"!==t&&"getDate"!==t&&"widget"!==t?"option"===t&&2===arguments.length&&"string"==typeof arguments[1]?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i)):this.each(function(){"string"==typeof t?e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this].concat(i)):e.datepicker._attachDatepicker(this,t)}):e.datepicker["_"+t+"Datepicker"].apply(e.datepicker,[this[0]].concat(i))},e.datepicker=new s,// singleton instance
e.datepicker.initialized=!1,e.datepicker.uuid=(new Date).getTime(),e.datepicker.version="1.12.1";var f=(e.datepicker,e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),!1);e(document).on("mouseup",function(){f=!1});e.widget("ui.mouse",{version:"1.12.1",options:{cancel:"input, textarea, button, select, option",distance:1,delay:0},_mouseInit:function(){var t=this;this.element.on("mousedown."+this.widgetName,function(e){return t._mouseDown(e)}).on("click."+this.widgetName,function(i){if(!0===e.data(i.target,t.widgetName+".preventClickEvent"))return e.removeData(i.target,t.widgetName+".preventClickEvent"),i.stopImmediatePropagation(),!1}),this.started=!1},
// TODO: make sure destroying one instance of mouse doesn't mess with
// other instances of mouse
_mouseDestroy:function(){this.element.off("."+this.widgetName),this._mouseMoveDelegate&&this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(t){
// don't let more than one widget handle mouseStart
if(!f){this._mouseMoved=!1,
// We may have missed mouseup (out of window)
this._mouseStarted&&this._mouseUp(t),this._mouseDownEvent=t;var i=this,s=1===t.which,
// event.target.nodeName works around a bug in IE 8 with
// disabled inputs (#7620)
n=!("string"!=typeof this.options.cancel||!t.target.nodeName)&&e(t.target).closest(this.options.cancel).length;
// Click event may never have fired (Gecko & Opera)
// These delegates are required to keep context
return!(s&&!n&&this._mouseCapture(t))||(this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){i.mouseDelayMet=!0},this.options.delay)),this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=!1!==this._mouseStart(t),!this._mouseStarted)?(t.preventDefault(),!0):(!0===e.data(t.target,this.widgetName+".preventClickEvent")&&e.removeData(t.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(e){return i._mouseMove(e)},this._mouseUpDelegate=function(e){return i._mouseUp(e)},this.document.on("mousemove."+this.widgetName,this._mouseMoveDelegate).on("mouseup."+this.widgetName,this._mouseUpDelegate),t.preventDefault(),f=!0,!0))}},_mouseMove:function(t){
// Only check for mouseups outside the document if you've moved inside the document
// at least once. This prevents the firing of mouseup in the case of IE<9, which will
// fire a mousemove event if content is placed under the cursor. See #7778
// Support: IE <9
if(this._mouseMoved){
// IE mouseup check - mouseup happened when mouse was out of window
if(e.ui.ie&&(!document.documentMode||document.documentMode<9)&&!t.button)return this._mouseUp(t);if(!t.which)
// Support: Safari <=8 - 9
// Safari sets which to 0 if you press any of the following keys
// during a drag (#14461)
if(t.originalEvent.altKey||t.originalEvent.ctrlKey||t.originalEvent.metaKey||t.originalEvent.shiftKey)this.ignoreMissingWhich=!0;else if(!this.ignoreMissingWhich)return this._mouseUp(t)}return(t.which||t.button)&&(this._mouseMoved=!0),this._mouseStarted?(this._mouseDrag(t),t.preventDefault()):(this._mouseDistanceMet(t)&&this._mouseDelayMet(t)&&(this._mouseStarted=!1!==this._mouseStart(this._mouseDownEvent,t),this._mouseStarted?this._mouseDrag(t):this._mouseUp(t)),!this._mouseStarted)},_mouseUp:function(t){this.document.off("mousemove."+this.widgetName,this._mouseMoveDelegate).off("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,t.target===this._mouseDownEvent.target&&e.data(t.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(t)),this._mouseDelayTimer&&(clearTimeout(this._mouseDelayTimer),delete this._mouseDelayTimer),this.ignoreMissingWhich=!1,f=!1,t.preventDefault()},_mouseDistanceMet:function(e){return Math.max(Math.abs(this._mouseDownEvent.pageX-e.pageX),Math.abs(this._mouseDownEvent.pageY-e.pageY))>=this.options.distance},_mouseDelayMet:function(){return this.mouseDelayMet},
// These are placeholder methods, to be overriden by extending plugin
_mouseStart:function(){},_mouseDrag:function(){},_mouseStop:function(){},_mouseCapture:function(){return!0}}),e.ui.plugin={add:function(t,i,s){var n,a=e.ui[t].prototype;for(n in s)a.plugins[n]=a.plugins[n]||[],a.plugins[n].push([i,s[n]])},call:function(e,t,i,s){var n,a=e.plugins[t];if(a&&(s||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(n=0;n<a.length;n++)e.options[a[n][0]]&&a[n][1].apply(e.element,i)}},e.ui.safeBlur=function(t){
// Support: IE9 - 10 only
// If the <body> is blurred, IE will switch windows, see #9420
t&&"body"!==t.nodeName.toLowerCase()&&e(t).trigger("blur")};/*!
 * jQuery UI Draggable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Draggable
//>>group: Interactions
//>>description: Enables dragging functionality for any element.
//>>docs: http://api.jqueryui.com/draggable/
//>>demos: http://jqueryui.com/draggable/
//>>css.structure: ../../themes/base/draggable.css
e.widget("ui.draggable",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1,
// Callbacks
drag:null,start:null,stop:null},_create:function(){"original"===this.options.helper&&this._setPositionRelative(),this.options.addClasses&&this._addClass("ui-draggable"),this._setHandleClassName(),this._mouseInit()},_setOption:function(e,t){this._super(e,t),"handle"===e&&(this._removeHandleClassName(),this._setHandleClassName())},_destroy:function(){if((this.helper||this.element).is(".ui-draggable-dragging"))return void(this.destroyOnClear=!0);this._removeHandleClassName(),this._mouseDestroy()},_mouseCapture:function(t){var i=this.options;
// Among others, prevent a drag on a resizable-handle
// Among others, prevent a drag on a resizable-handle
//Quit if we're not on a valid handle
return!(this.helper||i.disabled||e(t.target).closest(".ui-resizable-handle").length>0)&&(this.handle=this._getHandle(t),!!this.handle&&(this._blurActiveElement(t),this._blockFrames(!0===i.iframeFix?"iframe":i.iframeFix),!0))},_blockFrames:function(t){this.iframeBlocks=this.document.find(t).map(function(){var t=e(this);return e("<div>").css("position","absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_blurActiveElement:function(t){var i=e.ui.safeActiveElement(this.document[0]);
// Don't blur if the event occurred on an element that is within
// the currently focused element
// See #10527, #12472
e(t.target).closest(i).length||
// Blur any element that currently has focus, see #4261
e.ui.safeBlur(i)},_mouseStart:function(t){var i=this.options;
//Trigger event + callbacks
//Create and append the visible helper
//Cache the helper size
//If ddmanager is used for droppables, set the global draggable
/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */
//Cache the margins of the original element
//Store the helper's css position
//The element's absolute position on the page minus margins
//Generate the original position
//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
//Set a containment if given in the options
//Trigger event + callbacks
//Recache the helper size
//Prepare the droppable offsets
// Execute the drag once - this causes the helper not to be visible before getting its
// correct position
// If the ddmanager is used for droppables, inform the manager that dragging has started
// (see #5003)
return this.helper=this._createHelper(t),this._addClass(this.helper,"ui-draggable-dragging"),this._cacheHelperProportions(),e.ui.ddmanager&&(e.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(!0),this.offsetParent=this.helper.offsetParent(),this.hasFixedAncestor=this.helper.parents().filter(function(){return"fixed"===e(this).css("position")}).length>0,this.positionAbs=this.element.offset(),this._refreshOffsets(t),this.originalPosition=this.position=this._generatePosition(t,!1),this.originalPageX=t.pageX,this.originalPageY=t.pageY,i.cursorAt&&this._adjustOffsetFromHelper(i.cursorAt),this._setContainment(),!1===this._trigger("start",t)?(this._clear(),!1):(this._cacheHelperProportions(),e.ui.ddmanager&&!i.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this._mouseDrag(t,!0),e.ui.ddmanager&&e.ui.ddmanager.dragStart(this,t),!0)},_refreshOffsets:function(e){this.offset={top:this.positionAbs.top-this.margins.top,left:this.positionAbs.left-this.margins.left,scroll:!1,parent:this._getParentOffset(),relative:this._getRelativeOffset()},this.offset.click={left:e.pageX-this.offset.left,top:e.pageY-this.offset.top}},_mouseDrag:function(t,i){
//Call plugins and callbacks and use the resulting position if something is returned
if(
// reset any necessary cached properties (see #5009)
this.hasFixedAncestor&&(this.offset.parent=this._getParentOffset()),
//Compute the helpers position
this.position=this._generatePosition(t,!0),this.positionAbs=this._convertPositionTo("absolute"),!i){var s=this._uiHash();if(!1===this._trigger("drag",t,s))return this._mouseUp(new e.Event("mouseup",t)),!1;this.position=s.position}return this.helper[0].style.left=this.position.left+"px",this.helper[0].style.top=this.position.top+"px",e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),!1},_mouseStop:function(t){
//If we are using droppables, inform the manager about the drop
var i=this,s=!1;
//if a drop comes from outside (a sortable)
return e.ui.ddmanager&&!this.options.dropBehaviour&&(s=e.ui.ddmanager.drop(this,t)),this.dropped&&(s=this.dropped,this.dropped=!1),"invalid"===this.options.revert&&!s||"valid"===this.options.revert&&s||!0===this.options.revert||e.isFunction(this.options.revert)&&this.options.revert.call(this.element,s)?e(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){!1!==i._trigger("stop",t)&&i._clear()}):!1!==this._trigger("stop",t)&&this._clear(),!1},_mouseUp:function(t){
// If the ddmanager is used for droppables, inform the manager that dragging has stopped
// (see #5003)
// Only need to focus if the event occurred on the draggable itself, see #10527
// The interaction is over; whether or not the click resulted in a drag,
// focus the element
return this._unblockFrames(),e.ui.ddmanager&&e.ui.ddmanager.dragStop(this,t),this.handleElement.is(t.target)&&this.element.trigger("focus"),e.ui.mouse.prototype._mouseUp.call(this,t)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp(new e.Event("mouseup",{target:this.element[0]})):this._clear(),this},_getHandle:function(t){return!this.options.handle||!!e(t.target).closest(this.element.find(this.options.handle)).length},_setHandleClassName:function(){this.handleElement=this.options.handle?this.element.find(this.options.handle):this.element,this._addClass(this.handleElement,"ui-draggable-handle")},_removeHandleClassName:function(){this._removeClass(this.handleElement,"ui-draggable-handle")},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper),n=s?e(i.helper.apply(this.element[0],[t])):"clone"===i.helper?this.element.clone().removeAttr("id"):this.element;
// Http://bugs.jqueryui.com/ticket/9446
// a helper function can return the original element
// which wouldn't have been set to relative in _create
return n.parents("body").length||n.appendTo("parent"===i.appendTo?this.element[0].parentNode:i.appendTo),s&&n[0]===this.element[0]&&this._setPositionRelative(),n[0]===this.element[0]||/(fixed|absolute)/.test(n.css("position"))||n.css("position","absolute"),n},_setPositionRelative:function(){/^(?:r|a|f)/.test(this.element.css("position"))||(this.element[0].style.position="relative")},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_isRootNode:function(e){return/(html|body)/i.test(e.tagName)||e===this.document[0]},_getParentOffset:function(){
//Get the offsetParent and cache its position
var t=this.offsetParent.offset(),i=this.document[0];
// This is a special case where we need to modify a offset calculated on start, since the
// following happened:
// 1. The position of the helper is absolute, so it's position is calculated based on the
// next positioned parent
// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
// the document, which means that the scroll is included in the initial calculation of the
// offset of the parent, and never recalculated upon drag
return"absolute"===this.cssPosition&&this.scrollParent[0]!==i&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),this._isRootNode(this.offsetParent[0])&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"!==this.cssPosition)return{top:0,left:0};var e=this.element.position(),t=this._isRootNode(this.scrollParent[0]);return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+(t?0:this.scrollParent.scrollTop()),left:e.left-(parseInt(this.helper.css("left"),10)||0)+(t?0:this.scrollParent.scrollLeft())}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options,a=this.document[0];return this.relativeContainer=null,n.containment?"window"===n.containment?void(this.containment=[e(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,e(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,e(window).scrollLeft()+e(window).width()-this.helperProportions.width-this.margins.left,e(window).scrollTop()+(e(window).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):"document"===n.containment?void(this.containment=[0,0,e(a).width()-this.helperProportions.width-this.margins.left,(e(a).height()||a.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]):n.containment.constructor===Array?void(this.containment=n.containment):("parent"===n.containment&&(n.containment=this.helper[0].parentNode),i=e(n.containment),void((s=i[0])&&(t=/(scroll|auto)/.test(i.css("overflow")),this.containment=[(parseInt(i.css("borderLeftWidth"),10)||0)+(parseInt(i.css("paddingLeft"),10)||0),(parseInt(i.css("borderTopWidth"),10)||0)+(parseInt(i.css("paddingTop"),10)||0),(t?Math.max(s.scrollWidth,s.offsetWidth):s.offsetWidth)-(parseInt(i.css("borderRightWidth"),10)||0)-(parseInt(i.css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(t?Math.max(s.scrollHeight,s.offsetHeight):s.offsetHeight)-(parseInt(i.css("borderBottomWidth"),10)||0)-(parseInt(i.css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relativeContainer=i))):void(this.containment=null)},_convertPositionTo:function(e,t){t||(t=this.position);var i="absolute"===e?1:-1,s=this._isRootNode(this.scrollParent[0]);return{top:
// The absolute mouse position
t.top+
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.top*i+
// The offsetParent's offset without borders (offset + border)
this.offset.parent.top*i-("fixed"===this.cssPosition?-this.offset.scroll.top:s?0:this.offset.scroll.top)*i,left:
// The absolute mouse position
t.left+
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.left*i+
// The offsetParent's offset without borders (offset + border)
this.offset.parent.left*i-("fixed"===this.cssPosition?-this.offset.scroll.left:s?0:this.offset.scroll.left)*i}},_generatePosition:function(e,t){var i,s,n,a,o=this.options,r=this._isRootNode(this.scrollParent[0]),l=e.pageX,h=e.pageY;
// Cache the scroll
/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */
// If we are not dragging yet, we won't check for options
//Check for grid elements set to 0 to prevent divide by 0 error causing invalid
// argument errors in IE (see ticket #6950)
return r&&this.offset.scroll||(this.offset.scroll={top:this.scrollParent.scrollTop(),left:this.scrollParent.scrollLeft()}),t&&(this.containment&&(this.relativeContainer?(s=this.relativeContainer.offset(),i=[this.containment[0]+s.left,this.containment[1]+s.top,this.containment[2]+s.left,this.containment[3]+s.top]):i=this.containment,e.pageX-this.offset.click.left<i[0]&&(l=i[0]+this.offset.click.left),e.pageY-this.offset.click.top<i[1]&&(h=i[1]+this.offset.click.top),e.pageX-this.offset.click.left>i[2]&&(l=i[2]+this.offset.click.left),e.pageY-this.offset.click.top>i[3]&&(h=i[3]+this.offset.click.top)),o.grid&&(n=o.grid[1]?this.originalPageY+Math.round((h-this.originalPageY)/o.grid[1])*o.grid[1]:this.originalPageY,h=i?n-this.offset.click.top>=i[1]||n-this.offset.click.top>i[3]?n:n-this.offset.click.top>=i[1]?n-o.grid[1]:n+o.grid[1]:n,a=o.grid[0]?this.originalPageX+Math.round((l-this.originalPageX)/o.grid[0])*o.grid[0]:this.originalPageX,l=i?a-this.offset.click.left>=i[0]||a-this.offset.click.left>i[2]?a:a-this.offset.click.left>=i[0]?a-o.grid[0]:a+o.grid[0]:a),"y"===o.axis&&(l=this.originalPageX),"x"===o.axis&&(h=this.originalPageY)),{top:
// The absolute mouse position
h-
// Click offset (relative to the element)
this.offset.click.top-
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.top-
// The offsetParent's offset without borders (offset + border)
this.offset.parent.top+("fixed"===this.cssPosition?-this.offset.scroll.top:r?0:this.offset.scroll.top),left:
// The absolute mouse position
l-
// Click offset (relative to the element)
this.offset.click.left-
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.left-
// The offsetParent's offset without borders (offset + border)
this.offset.parent.left+("fixed"===this.cssPosition?-this.offset.scroll.left:r?0:this.offset.scroll.left)}},_clear:function(){this._removeClass(this.helper,"ui-draggable-dragging"),this.helper[0]===this.element[0]||this.cancelHelperRemoval||this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1,this.destroyOnClear&&this.destroy()},
// From now on bulk stuff - mainly helpers
_trigger:function(t,i,s){
// Absolute position and offset (see #6884 ) have to be recalculated after plugins
return s=s||this._uiHash(),e.ui.plugin.call(this,t,[i,s,this],!0),/^(drag|start|stop)/.test(t)&&(this.positionAbs=this._convertPositionTo("absolute"),s.offset=this.positionAbs),e.Widget.prototype._trigger.call(this,t,i,s)},plugins:{},_uiHash:function(){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),e.ui.plugin.add("draggable","connectToSortable",{start:function(t,i,s){var n=e.extend({},i,{item:s.element});s.sortables=[],e(s.options.connectToSortable).each(function(){var i=e(this).sortable("instance");i&&!i.options.disabled&&(s.sortables.push(i),
// RefreshPositions is called at drag start to refresh the containerCache
// which is used in drag. This ensures it's initialized and synchronized
// with any changes that might have happened on the page since initialization.
i.refreshPositions(),i._trigger("activate",t,n))})},stop:function(t,i,s){var n=e.extend({},i,{item:s.element});s.cancelHelperRemoval=!1,e.each(s.sortables,function(){var e=this;e.isOver?(e.isOver=0,
// Allow this sortable to handle removing the helper
s.cancelHelperRemoval=!0,e.cancelHelperRemoval=!1,
// Use _storedCSS To restore properties in the sortable,
// as this also handles revert (#9675) since the draggable
// may have modified them in unexpected ways (#8809)
e._storedCSS={position:e.placeholder.css("position"),top:e.placeholder.css("top"),left:e.placeholder.css("left")},e._mouseStop(t),
// Once drag has ended, the sortable should return to using
// its original helper, not the shared helper from draggable
e.options.helper=e.options._helper):(
// Prevent this Sortable from removing the helper.
// However, don't set the draggable to remove the helper
// either as another connected Sortable may yet handle the removal.
e.cancelHelperRemoval=!0,e._trigger("deactivate",t,n))})},drag:function(t,i,s){e.each(s.sortables,function(){var n=!1,a=this;
// Copy over variables that sortable's _intersectsWith uses
a.positionAbs=s.positionAbs,a.helperProportions=s.helperProportions,a.offset.click=s.offset.click,a._intersectsWith(a.containerCache)&&(n=!0,e.each(s.sortables,function(){
// Copy over variables that sortable's _intersectsWith uses
return this.positionAbs=s.positionAbs,this.helperProportions=s.helperProportions,this.offset.click=s.offset.click,this!==a&&this._intersectsWith(this.containerCache)&&e.contains(a.element[0],this.element[0])&&(n=!1),n})),n?(
// If it intersects, we use a little isOver variable and set it once,
// so that the move-in stuff gets fired only once.
a.isOver||(a.isOver=1,
// Store draggable's parent in case we need to reappend to it later.
s._parent=i.helper.parent(),a.currentItem=i.helper.appendTo(a.element).data("ui-sortable-item",!0),
// Store helper option to later restore it
a.options._helper=a.options.helper,a.options.helper=function(){return i.helper[0]},
// Fire the start events of the sortable with our passed browser event,
// and our own helper (so it doesn't create a new one)
t.target=a.currentItem[0],a._mouseCapture(t,!0),a._mouseStart(t,!0,!0),
// Because the browser event is way off the new appended portlet,
// modify necessary variables to reflect the changes
a.offset.click.top=s.offset.click.top,a.offset.click.left=s.offset.click.left,a.offset.parent.left-=s.offset.parent.left-a.offset.parent.left,a.offset.parent.top-=s.offset.parent.top-a.offset.parent.top,s._trigger("toSortable",t),
// Inform draggable that the helper is in a valid drop zone,
// used solely in the revert option to handle "valid/invalid".
s.dropped=a.element,
// Need to refreshPositions of all sortables in the case that
// adding to one sortable changes the location of the other sortables (#9675)
e.each(s.sortables,function(){this.refreshPositions()}),
// Hack so receive/update callbacks work (mostly)
s.currentItem=s.element,a.fromOutside=s),a.currentItem&&(a._mouseDrag(t),
// Copy the sortable's position because the draggable's can potentially reflect
// a relative position, while sortable is always absolute, which the dragged
// element has now become. (#8809)
i.position=a.position)):
// If it doesn't intersect with the sortable, and it intersected before,
// we fake the drag stop of the sortable, but make sure it doesn't remove
// the helper by using cancelHelperRemoval.
a.isOver&&(a.isOver=0,a.cancelHelperRemoval=!0,
// Calling sortable's mouseStop would trigger a revert,
// so revert must be temporarily false until after mouseStop is called.
a.options._revert=a.options.revert,a.options.revert=!1,a._trigger("out",t,a._uiHash(a)),a._mouseStop(t,!0),
// Restore sortable behaviors that were modfied
// when the draggable entered the sortable area (#9481)
a.options.revert=a.options._revert,a.options.helper=a.options._helper,a.placeholder&&a.placeholder.remove(),
// Restore and recalculate the draggable's offset considering the sortable
// may have modified them in unexpected ways. (#8809, #10669)
i.helper.appendTo(s._parent),s._refreshOffsets(t),i.position=s._generatePosition(t,!0),s._trigger("fromSortable",t),
// Inform draggable that the helper is no longer in a valid drop zone
s.dropped=!1,
// Need to refreshPositions of all sortables just in case removing
// from one sortable changes the location of other sortables (#9675)
e.each(s.sortables,function(){this.refreshPositions()}))})}}),e.ui.plugin.add("draggable","cursor",{start:function(t,i,s){var n=e("body"),a=s.options;n.css("cursor")&&(a._cursor=n.css("cursor")),n.css("cursor",a.cursor)},stop:function(t,i,s){var n=s.options;n._cursor&&e("body").css("cursor",n._cursor)}}),e.ui.plugin.add("draggable","opacity",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("opacity")&&(a._opacity=n.css("opacity")),n.css("opacity",a.opacity)},stop:function(t,i,s){var n=s.options;n._opacity&&e(i.helper).css("opacity",n._opacity)}}),e.ui.plugin.add("draggable","scroll",{start:function(e,t,i){i.scrollParentNotHidden||(i.scrollParentNotHidden=i.helper.scrollParent(!1)),i.scrollParentNotHidden[0]!==i.document[0]&&"HTML"!==i.scrollParentNotHidden[0].tagName&&(i.overflowOffset=i.scrollParentNotHidden.offset())},drag:function(t,i,s){var n=s.options,a=!1,o=s.scrollParentNotHidden[0],r=s.document[0];o!==r&&"HTML"!==o.tagName?(n.axis&&"x"===n.axis||(s.overflowOffset.top+o.offsetHeight-t.pageY<n.scrollSensitivity?o.scrollTop=a=o.scrollTop+n.scrollSpeed:t.pageY-s.overflowOffset.top<n.scrollSensitivity&&(o.scrollTop=a=o.scrollTop-n.scrollSpeed)),n.axis&&"y"===n.axis||(s.overflowOffset.left+o.offsetWidth-t.pageX<n.scrollSensitivity?o.scrollLeft=a=o.scrollLeft+n.scrollSpeed:t.pageX-s.overflowOffset.left<n.scrollSensitivity&&(o.scrollLeft=a=o.scrollLeft-n.scrollSpeed))):(n.axis&&"x"===n.axis||(t.pageY-e(r).scrollTop()<n.scrollSensitivity?a=e(r).scrollTop(e(r).scrollTop()-n.scrollSpeed):e(window).height()-(t.pageY-e(r).scrollTop())<n.scrollSensitivity&&(a=e(r).scrollTop(e(r).scrollTop()+n.scrollSpeed))),n.axis&&"y"===n.axis||(t.pageX-e(r).scrollLeft()<n.scrollSensitivity?a=e(r).scrollLeft(e(r).scrollLeft()-n.scrollSpeed):e(window).width()-(t.pageX-e(r).scrollLeft())<n.scrollSensitivity&&(a=e(r).scrollLeft(e(r).scrollLeft()+n.scrollSpeed)))),!1!==a&&e.ui.ddmanager&&!n.dropBehaviour&&e.ui.ddmanager.prepareOffsets(s,t)}}),e.ui.plugin.add("draggable","snap",{start:function(t,i,s){var n=s.options;s.snapElements=[],e(n.snap.constructor!==String?n.snap.items||":data(ui-draggable)":n.snap).each(function(){var t=e(this),i=t.offset();this!==s.element[0]&&s.snapElements.push({item:this,width:t.outerWidth(),height:t.outerHeight(),top:i.top,left:i.left})})},drag:function(t,i,s){var n,a,o,r,l,h,c,u,d,p,f=s.options,m=f.snapTolerance,g=i.offset.left,v=g+s.helperProportions.width,_=i.offset.top,b=_+s.helperProportions.height;for(d=s.snapElements.length-1;d>=0;d--)l=s.snapElements[d].left-s.margins.left,h=l+s.snapElements[d].width,c=s.snapElements[d].top-s.margins.top,u=c+s.snapElements[d].height,v<l-m||g>h+m||b<c-m||_>u+m||!e.contains(s.snapElements[d].item.ownerDocument,s.snapElements[d].item)?(s.snapElements[d].snapping&&s.options.snap.release&&s.options.snap.release.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=!1):("inner"!==f.snapMode&&(n=Math.abs(c-b)<=m,a=Math.abs(u-_)<=m,o=Math.abs(l-v)<=m,r=Math.abs(h-g)<=m,n&&(i.position.top=s._convertPositionTo("relative",{top:c-s.helperProportions.height,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:u,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l-s.helperProportions.width}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h}).left)),p=n||a||o||r,"outer"!==f.snapMode&&(n=Math.abs(c-_)<=m,a=Math.abs(u-b)<=m,o=Math.abs(l-g)<=m,r=Math.abs(h-v)<=m,n&&(i.position.top=s._convertPositionTo("relative",{top:c,left:0}).top),a&&(i.position.top=s._convertPositionTo("relative",{top:u-s.helperProportions.height,left:0}).top),o&&(i.position.left=s._convertPositionTo("relative",{top:0,left:l}).left),r&&(i.position.left=s._convertPositionTo("relative",{top:0,left:h-s.helperProportions.width}).left)),!s.snapElements[d].snapping&&(n||a||o||r||p)&&s.options.snap.snap&&s.options.snap.snap.call(s.element,t,e.extend(s._uiHash(),{snapItem:s.snapElements[d].item})),s.snapElements[d].snapping=n||a||o||r||p)}}),e.ui.plugin.add("draggable","stack",{start:function(t,i,s){var n,a=s.options,o=e.makeArray(e(a.stack)).sort(function(t,i){return(parseInt(e(t).css("zIndex"),10)||0)-(parseInt(e(i).css("zIndex"),10)||0)});o.length&&(n=parseInt(e(o[0]).css("zIndex"),10)||0,e(o).each(function(t){e(this).css("zIndex",n+t)}),this.css("zIndex",n+o.length))}}),e.ui.plugin.add("draggable","zIndex",{start:function(t,i,s){var n=e(i.helper),a=s.options;n.css("zIndex")&&(a._zIndex=n.css("zIndex")),n.css("zIndex",a.zIndex)},stop:function(t,i,s){var n=s.options;n._zIndex&&e(i.helper).css("zIndex",n._zIndex)}});e.ui.draggable;/*!
 * jQuery UI Resizable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Resizable
//>>group: Interactions
//>>description: Enables resize functionality for any element.
//>>docs: http://api.jqueryui.com/resizable/
//>>demos: http://jqueryui.com/resizable/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/resizable.css
//>>css.theme: ../../themes/base/theme.css
e.widget("ui.resizable",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,classes:{"ui-resizable-se":"ui-icon ui-icon-gripsmall-diagonal-se"},containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,
// See #7960
zIndex:90,
// Callbacks
resize:null,start:null,stop:null},_num:function(e){return parseFloat(e)||0},_isNumber:function(e){return!isNaN(parseFloat(e))},_hasScroll:function(t,i){if("hidden"===e(t).css("overflow"))return!1;var s=i&&"left"===i?"scrollLeft":"scrollTop",n=!1;
// TODO: determine which cases actually cause this to happen
// if the element doesn't have the scroll set, see if it's possible to
// set the scroll
return t[s]>0||(t[s]=1,n=t[s]>0,t[s]=0,n)},_create:function(){var t,i=this.options,s=this;this._addClass("ui-resizable"),e.extend(this,{_aspectRatio:!!i.aspectRatio,aspectRatio:i.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:i.helper||i.ghost||i.animate?i.helper||"ui-resizable-helper":null}),
// Wrap the element if it cannot hold child nodes
this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i)&&(this.element.wrap(e("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("ui-resizable",this.element.resizable("instance")),this.elementIsWrapper=!0,t={marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom"),marginLeft:this.originalElement.css("marginLeft")},this.element.css(t),this.originalElement.css("margin",0),
// support: Safari
// Prevent Safari textarea resize
this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),
// Support: IE9
// avoid IE jump (hard set the margin)
this.originalElement.css(t),this._proportionallyResize()),this._setupHandles(),i.autoHide&&e(this.element).on("mouseenter",function(){i.disabled||(s._removeClass("ui-resizable-autohide"),s._handles.show())}).on("mouseleave",function(){i.disabled||s.resizing||(s._addClass("ui-resizable-autohide"),s._handles.hide())}),this._mouseInit()},_destroy:function(){this._mouseDestroy();var t,i=function(t){e(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()};
// TODO: Unwrap at same DOM position
return this.elementIsWrapper&&(i(this.element),t=this.element,this.originalElement.css({position:t.css("position"),width:t.outerWidth(),height:t.outerHeight(),top:t.css("top"),left:t.css("left")}).insertAfter(t),t.remove()),this.originalElement.css("resize",this.originalResizeStyle),i(this.originalElement),this},_setOption:function(e,t){switch(this._super(e,t),e){case"handles":this._removeHandles(),this._setupHandles()}},_setupHandles:function(){var t,i,s,n,a,o=this.options,r=this;if(this.handles=o.handles||(e(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se"),this._handles=e(),this.handles.constructor===String)for("all"===this.handles&&(this.handles="n,e,s,w,se,sw,ne,nw"),s=this.handles.split(","),this.handles={},i=0;i<s.length;i++)t=e.trim(s[i]),n="ui-resizable-"+t,a=e("<div>"),this._addClass(a,"ui-resizable-handle "+n),a.css({zIndex:o.zIndex}),this.handles[t]=".ui-resizable-"+t,this.element.append(a);this._renderAxis=function(t){var i,s,n,a;t=t||this.element;for(i in this.handles)this.handles[i].constructor===String?this.handles[i]=this.element.children(this.handles[i]).first().show():(this.handles[i].jquery||this.handles[i].nodeType)&&(this.handles[i]=e(this.handles[i]),this._on(this.handles[i],{mousedown:r._mouseDown})),this.elementIsWrapper&&this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i)&&(s=e(this.handles[i],this.element),a=/sw|ne|nw|se|n|s/.test(i)?s.outerHeight():s.outerWidth(),n=["padding",/ne|nw|n/.test(i)?"Top":/se|sw|s/.test(i)?"Bottom":/^e$/.test(i)?"Right":"Left"].join(""),t.css(n,a),this._proportionallyResize()),this._handles=this._handles.add(this.handles[i])},
// TODO: make renderAxis a prototype function
this._renderAxis(this.element),this._handles=this._handles.add(this.element.find(".ui-resizable-handle")),this._handles.disableSelection(),this._handles.on("mouseover",function(){r.resizing||(this.className&&(a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),r.axis=a&&a[1]?a[1]:"se")}),o.autoHide&&(this._handles.hide(),this._addClass("ui-resizable-autohide"))},_removeHandles:function(){this._handles.remove()},_mouseCapture:function(t){var i,s,n=!1;for(i in this.handles)((s=e(this.handles[i])[0])===t.target||e.contains(s,t.target))&&(n=!0);return!this.options.disabled&&n},_mouseStart:function(t){var i,s,n,a=this.options,o=this.element;return this.resizing=!0,this._renderProxy(),i=this._num(this.helper.css("left")),s=this._num(this.helper.css("top")),a.containment&&(i+=e(a.containment).scrollLeft()||0,s+=e(a.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:i,top:s},this.size=this._helper?{width:this.helper.width(),height:this.helper.height()}:{width:o.width(),height:o.height()},this.originalSize=this._helper?{width:o.outerWidth(),height:o.outerHeight()}:{width:o.width(),height:o.height()},this.sizeDiff={width:o.outerWidth()-o.width(),height:o.outerHeight()-o.height()},this.originalPosition={left:i,top:s},this.originalMousePosition={left:t.pageX,top:t.pageY},this.aspectRatio="number"==typeof a.aspectRatio?a.aspectRatio:this.originalSize.width/this.originalSize.height||1,n=e(".ui-resizable-"+this.axis).css("cursor"),e("body").css("cursor","auto"===n?this.axis+"-resize":n),this._addClass("ui-resizable-resizing"),this._propagate("start",t),!0},_mouseDrag:function(t){var i,s,n=this.originalMousePosition,a=this.axis,o=t.pageX-n.left||0,r=t.pageY-n.top||0,l=this._change[a];return this._updatePrevProperties(),!!l&&(i=l.apply(this,[t,o,r]),this._updateVirtualBoundaries(t.shiftKey),(this._aspectRatio||t.shiftKey)&&(i=this._updateRatio(i,t)),i=this._respectSize(i,t),this._updateCache(i),this._propagate("resize",t),s=this._applyChanges(),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),e.isEmptyObject(s)||(this._updatePrevProperties(),this._trigger("resize",t,this.ui()),this._applyChanges()),!1)},_mouseStop:function(t){this.resizing=!1;var i,s,n,a,o,r,l,h=this.options,c=this;return this._helper&&(i=this._proportionallyResizeElements,s=i.length&&/textarea/i.test(i[0].nodeName),n=s&&this._hasScroll(i[0],"left")?0:c.sizeDiff.height,a=s?0:c.sizeDiff.width,o={width:c.helper.width()-a,height:c.helper.height()-n},r=parseFloat(c.element.css("left"))+(c.position.left-c.originalPosition.left)||null,l=parseFloat(c.element.css("top"))+(c.position.top-c.originalPosition.top)||null,h.animate||this.element.css(e.extend(o,{top:l,left:r})),c.helper.height(c.size.height),c.helper.width(c.size.width),this._helper&&!h.animate&&this._proportionallyResize()),e("body").css("cursor","auto"),this._removeClass("ui-resizable-resizing"),this._propagate("stop",t),this._helper&&this.helper.remove(),!1},_updatePrevProperties:function(){this.prevPosition={top:this.position.top,left:this.position.left},this.prevSize={width:this.size.width,height:this.size.height}},_applyChanges:function(){var e={};return this.position.top!==this.prevPosition.top&&(e.top=this.position.top+"px"),this.position.left!==this.prevPosition.left&&(e.left=this.position.left+"px"),this.size.width!==this.prevSize.width&&(e.width=this.size.width+"px"),this.size.height!==this.prevSize.height&&(e.height=this.size.height+"px"),this.helper.css(e),e},_updateVirtualBoundaries:function(e){var t,i,s,n,a,o=this.options;a={minWidth:this._isNumber(o.minWidth)?o.minWidth:0,maxWidth:this._isNumber(o.maxWidth)?o.maxWidth:1/0,minHeight:this._isNumber(o.minHeight)?o.minHeight:0,maxHeight:this._isNumber(o.maxHeight)?o.maxHeight:1/0},(this._aspectRatio||e)&&(t=a.minHeight*this.aspectRatio,s=a.minWidth/this.aspectRatio,i=a.maxHeight*this.aspectRatio,n=a.maxWidth/this.aspectRatio,t>a.minWidth&&(a.minWidth=t),s>a.minHeight&&(a.minHeight=s),i<a.maxWidth&&(a.maxWidth=i),n<a.maxHeight&&(a.maxHeight=n)),this._vBoundaries=a},_updateCache:function(e){this.offset=this.helper.offset(),this._isNumber(e.left)&&(this.position.left=e.left),this._isNumber(e.top)&&(this.position.top=e.top),this._isNumber(e.height)&&(this.size.height=e.height),this._isNumber(e.width)&&(this.size.width=e.width)},_updateRatio:function(e){var t=this.position,i=this.size,s=this.axis;return this._isNumber(e.height)?e.width=e.height*this.aspectRatio:this._isNumber(e.width)&&(e.height=e.width/this.aspectRatio),"sw"===s&&(e.left=t.left+(i.width-e.width),e.top=null),"nw"===s&&(e.top=t.top+(i.height-e.height),e.left=t.left+(i.width-e.width)),e},_respectSize:function(e){var t=this._vBoundaries,i=this.axis,s=this._isNumber(e.width)&&t.maxWidth&&t.maxWidth<e.width,n=this._isNumber(e.height)&&t.maxHeight&&t.maxHeight<e.height,a=this._isNumber(e.width)&&t.minWidth&&t.minWidth>e.width,o=this._isNumber(e.height)&&t.minHeight&&t.minHeight>e.height,r=this.originalPosition.left+this.originalSize.width,l=this.originalPosition.top+this.originalSize.height,h=/sw|nw|w/.test(i),c=/nw|ne|n/.test(i);
// Fixing jump error on top/left - bug #2330
return a&&(e.width=t.minWidth),o&&(e.height=t.minHeight),s&&(e.width=t.maxWidth),n&&(e.height=t.maxHeight),a&&h&&(e.left=r-t.minWidth),s&&h&&(e.left=r-t.maxWidth),o&&c&&(e.top=l-t.minHeight),n&&c&&(e.top=l-t.maxHeight),e.width||e.height||e.left||!e.top?e.width||e.height||e.top||!e.left||(e.left=null):e.top=null,e},_getPaddingPlusBorderDimensions:function(e){for(var t=0,i=[],s=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],n=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];t<4;t++)i[t]=parseFloat(s[t])||0,i[t]+=parseFloat(n[t])||0;return{height:i[0]+i[2],width:i[1]+i[3]}},_proportionallyResize:function(){if(this._proportionallyResizeElements.length)for(var e,t=0,i=this.helper||this.element;t<this._proportionallyResizeElements.length;t++)e=this._proportionallyResizeElements[t],
// TODO: Seems like a bug to cache this.outerDimensions
// considering that we are in a loop.
this.outerDimensions||(this.outerDimensions=this._getPaddingPlusBorderDimensions(e)),e.css({height:i.height()-this.outerDimensions.height||0,width:i.width()-this.outerDimensions.width||0})},_renderProxy:function(){var t=this.element,i=this.options;this.elementOffset=t.offset(),this._helper?(this.helper=this.helper||e("<div style='overflow:hidden;'></div>"),this._addClass(this.helper,this._helper),this.helper.css({width:this.element.outerWidth(),height:this.element.outerHeight(),position:"absolute",left:this.elementOffset.left+"px",top:this.elementOffset.top+"px",zIndex:++i.zIndex}),this.helper.appendTo("body").disableSelection()):this.helper=this.element},_change:{e:function(e,t){return{width:this.originalSize.width+t}},w:function(e,t){var i=this.originalSize;return{left:this.originalPosition.left+t,width:i.width-t}},n:function(e,t,i){var s=this.originalSize;return{top:this.originalPosition.top+i,height:s.height-i}},s:function(e,t,i){return{height:this.originalSize.height+i}},se:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},sw:function(t,i,s){return e.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[t,i,s]))},ne:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[t,i,s]))},nw:function(t,i,s){return e.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[t,i,s]))}},_propagate:function(t,i){e.ui.plugin.call(this,t,[i,this.ui()]),"resize"!==t&&this._trigger(t,i,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),/*
 * Resizable Extensions
 */
e.ui.plugin.add("resizable","animate",{stop:function(t){var i=e(this).resizable("instance"),s=i.options,n=i._proportionallyResizeElements,a=n.length&&/textarea/i.test(n[0].nodeName),o=a&&i._hasScroll(n[0],"left")?0:i.sizeDiff.height,r=a?0:i.sizeDiff.width,l={width:i.size.width-r,height:i.size.height-o},h=parseFloat(i.element.css("left"))+(i.position.left-i.originalPosition.left)||null,c=parseFloat(i.element.css("top"))+(i.position.top-i.originalPosition.top)||null;i.element.animate(e.extend(l,c&&h?{top:c,left:h}:{}),{duration:s.animateDuration,easing:s.animateEasing,step:function(){var s={width:parseFloat(i.element.css("width")),height:parseFloat(i.element.css("height")),top:parseFloat(i.element.css("top")),left:parseFloat(i.element.css("left"))};n&&n.length&&e(n[0]).css({width:s.width,height:s.height}),
// Propagating resize, and updating values for each animation step
i._updateCache(s),i._propagate("resize",t)}})}}),e.ui.plugin.add("resizable","containment",{start:function(){var t,i,s,n,a,o,r,l=e(this).resizable("instance"),h=l.options,c=l.element,u=h.containment,d=u instanceof e?u.get(0):/parent/.test(u)?c.parent().get(0):u;d&&(l.containerElement=e(d),/document/.test(u)||u===document?(l.containerOffset={left:0,top:0},l.containerPosition={left:0,top:0},l.parentData={element:e(document),left:0,top:0,width:e(document).width(),height:e(document).height()||document.body.parentNode.scrollHeight}):(t=e(d),i=[],e(["Top","Right","Left","Bottom"]).each(function(e,s){i[e]=l._num(t.css("padding"+s))}),l.containerOffset=t.offset(),l.containerPosition=t.position(),l.containerSize={height:t.innerHeight()-i[3],width:t.innerWidth()-i[1]},s=l.containerOffset,n=l.containerSize.height,a=l.containerSize.width,o=l._hasScroll(d,"left")?d.scrollWidth:a,r=l._hasScroll(d)?d.scrollHeight:n,l.parentData={element:d,left:s.left,top:s.top,width:o,height:r}))},resize:function(t){var i,s,n,a,o=e(this).resizable("instance"),r=o.options,l=o.containerOffset,h=o.position,c=o._aspectRatio||t.shiftKey,u={top:0,left:0},d=o.containerElement,p=!0;d[0]!==document&&/static/.test(d.css("position"))&&(u=l),h.left<(o._helper?l.left:0)&&(o.size.width=o.size.width+(o._helper?o.position.left-l.left:o.position.left-u.left),c&&(o.size.height=o.size.width/o.aspectRatio,p=!1),o.position.left=r.helper?l.left:0),h.top<(o._helper?l.top:0)&&(o.size.height=o.size.height+(o._helper?o.position.top-l.top:o.position.top),c&&(o.size.width=o.size.height*o.aspectRatio,p=!1),o.position.top=o._helper?l.top:0),n=o.containerElement.get(0)===o.element.parent().get(0),a=/relative|absolute/.test(o.containerElement.css("position")),n&&a?(o.offset.left=o.parentData.left+o.position.left,o.offset.top=o.parentData.top+o.position.top):(o.offset.left=o.element.offset().left,o.offset.top=o.element.offset().top),i=Math.abs(o.sizeDiff.width+(o._helper?o.offset.left-u.left:o.offset.left-l.left)),s=Math.abs(o.sizeDiff.height+(o._helper?o.offset.top-u.top:o.offset.top-l.top)),i+o.size.width>=o.parentData.width&&(o.size.width=o.parentData.width-i,c&&(o.size.height=o.size.width/o.aspectRatio,p=!1)),s+o.size.height>=o.parentData.height&&(o.size.height=o.parentData.height-s,c&&(o.size.width=o.size.height*o.aspectRatio,p=!1)),p||(o.position.left=o.prevPosition.left,o.position.top=o.prevPosition.top,o.size.width=o.prevSize.width,o.size.height=o.prevSize.height)},stop:function(){var t=e(this).resizable("instance"),i=t.options,s=t.containerOffset,n=t.containerPosition,a=t.containerElement,o=e(t.helper),r=o.offset(),l=o.outerWidth()-t.sizeDiff.width,h=o.outerHeight()-t.sizeDiff.height;t._helper&&!i.animate&&/relative/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:l,height:h}),t._helper&&!i.animate&&/static/.test(a.css("position"))&&e(this).css({left:r.left-n.left-s.left,width:l,height:h})}}),e.ui.plugin.add("resizable","alsoResize",{start:function(){var t=e(this).resizable("instance"),i=t.options;e(i.alsoResize).each(function(){var t=e(this);t.data("ui-resizable-alsoresize",{width:parseFloat(t.width()),height:parseFloat(t.height()),left:parseFloat(t.css("left")),top:parseFloat(t.css("top"))})})},resize:function(t,i){var s=e(this).resizable("instance"),n=s.options,a=s.originalSize,o=s.originalPosition,r={height:s.size.height-a.height||0,width:s.size.width-a.width||0,top:s.position.top-o.top||0,left:s.position.left-o.left||0};e(n.alsoResize).each(function(){var t=e(this),s=e(this).data("ui-resizable-alsoresize"),n={},a=t.parents(i.originalElement[0]).length?["width","height"]:["width","height","top","left"];e.each(a,function(e,t){var i=(s[t]||0)+(r[t]||0);i&&i>=0&&(n[t]=i||null)}),t.css(n)})},stop:function(){e(this).removeData("ui-resizable-alsoresize")}}),e.ui.plugin.add("resizable","ghost",{start:function(){var t=e(this).resizable("instance"),i=t.size;t.ghost=t.originalElement.clone(),t.ghost.css({opacity:.25,display:"block",position:"relative",height:i.height,width:i.width,margin:0,left:0,top:0}),t._addClass(t.ghost,"ui-resizable-ghost"),
// DEPRECATED
// TODO: remove after 1.12
!1!==e.uiBackCompat&&"string"==typeof t.options.ghost&&
// Ghost option
t.ghost.addClass(this.options.ghost),t.ghost.appendTo(t.helper)},resize:function(){var t=e(this).resizable("instance");t.ghost&&t.ghost.css({position:"relative",height:t.size.height,width:t.size.width})},stop:function(){var t=e(this).resizable("instance");t.ghost&&t.helper&&t.helper.get(0).removeChild(t.ghost.get(0))}}),e.ui.plugin.add("resizable","grid",{resize:function(){var t,i=e(this).resizable("instance"),s=i.options,n=i.size,a=i.originalSize,o=i.originalPosition,r=i.axis,l="number"==typeof s.grid?[s.grid,s.grid]:s.grid,h=l[0]||1,c=l[1]||1,u=Math.round((n.width-a.width)/h)*h,d=Math.round((n.height-a.height)/c)*c,p=a.width+u,f=a.height+d,m=s.maxWidth&&s.maxWidth<p,g=s.maxHeight&&s.maxHeight<f,v=s.minWidth&&s.minWidth>p,_=s.minHeight&&s.minHeight>f;s.grid=l,v&&(p+=h),_&&(f+=c),m&&(p-=h),g&&(f-=c),/^(se|s|e)$/.test(r)?(i.size.width=p,i.size.height=f):/^(ne)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.top=o.top-d):/^(sw)$/.test(r)?(i.size.width=p,i.size.height=f,i.position.left=o.left-u):((f-c<=0||p-h<=0)&&(t=i._getPaddingPlusBorderDimensions(this)),f-c>0?(i.size.height=f,i.position.top=o.top-d):(f=c-t.height,i.size.height=f,i.position.top=o.top+a.height-f),p-h>0?(i.size.width=p,i.position.left=o.left-u):(p=h-t.width,i.size.width=p,i.position.left=o.left+a.width-p))}});e.ui.resizable;/*!
 * jQuery UI Dialog 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Dialog
//>>group: Widgets
//>>description: Displays customizable dialog windows.
//>>docs: http://api.jqueryui.com/dialog/
//>>demos: http://jqueryui.com/dialog/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/dialog.css
//>>css.theme: ../../themes/base/theme.css
e.widget("ui.dialog",{version:"1.12.1",options:{appendTo:"body",autoOpen:!0,buttons:[],classes:{"ui-dialog":"ui-corner-all","ui-dialog-titlebar":"ui-corner-all"},closeOnEscape:!0,closeText:"Close",draggable:!0,hide:null,height:"auto",maxHeight:null,maxWidth:null,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",of:window,collision:"fit",
// Ensure the titlebar is always visible
using:function(t){var i=e(this).css(t).offset().top;i<0&&e(this).css("top",t.top-i)}},resizable:!0,show:null,title:null,width:300,
// Callbacks
beforeClose:null,close:null,drag:null,dragStart:null,dragStop:null,focus:null,open:null,resize:null,resizeStart:null,resizeStop:null},sizeRelatedOptions:{buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},resizableRelatedOptions:{maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},_create:function(){this.originalCss={display:this.element[0].style.display,width:this.element[0].style.width,minHeight:this.element[0].style.minHeight,maxHeight:this.element[0].style.maxHeight,height:this.element[0].style.height},this.originalPosition={parent:this.element.parent(),index:this.element.parent().children().index(this.element)},this.originalTitle=this.element.attr("title"),null==this.options.title&&null!=this.originalTitle&&(this.options.title=this.originalTitle),
// Dialogs can't be disabled
this.options.disabled&&(this.options.disabled=!1),this._createWrapper(),this.element.show().removeAttr("title").appendTo(this.uiDialog),this._addClass("ui-dialog-content","ui-widget-content"),this._createTitlebar(),this._createButtonPane(),this.options.draggable&&e.fn.draggable&&this._makeDraggable(),this.options.resizable&&e.fn.resizable&&this._makeResizable(),this._isOpen=!1,this._trackFocus()},_init:function(){this.options.autoOpen&&this.open()},_appendTo:function(){var t=this.options.appendTo;return t&&(t.jquery||t.nodeType)?e(t):this.document.find(t||"body").eq(0)},_destroy:function(){var e,t=this.originalPosition;this._untrackInstance(),this._destroyOverlay(),this.element.removeUniqueId().css(this.originalCss).detach(),this.uiDialog.remove(),this.originalTitle&&this.element.attr("title",this.originalTitle),e=t.parent.children().eq(t.index),
// Don't try to place the dialog next to itself (#8613)
e.length&&e[0]!==this.element[0]?e.before(this.element):t.parent.append(this.element)},widget:function(){return this.uiDialog},disable:e.noop,enable:e.noop,close:function(t){var i=this;this._isOpen&&!1!==this._trigger("beforeClose",t)&&(this._isOpen=!1,this._focusedElement=null,this._destroyOverlay(),this._untrackInstance(),this.opener.filter(":focusable").trigger("focus").length||
// Hiding a focused element doesn't trigger blur in WebKit
// so in case we have nothing to focus on, explicitly blur the active element
// https://bugs.webkit.org/show_bug.cgi?id=47182
e.ui.safeBlur(e.ui.safeActiveElement(this.document[0])),this._hide(this.uiDialog,this.options.hide,function(){i._trigger("close",t)}))},isOpen:function(){return this._isOpen},moveToTop:function(){this._moveToTop()},_moveToTop:function(t,i){var s=!1,n=this.uiDialog.siblings(".ui-front:visible").map(function(){return+e(this).css("z-index")}).get(),a=Math.max.apply(null,n);return a>=+this.uiDialog.css("z-index")&&(this.uiDialog.css("z-index",a+1),s=!0),s&&!i&&this._trigger("focus",t),s},open:function(){var t=this;if(this._isOpen)return void(this._moveToTop()&&this._focusTabbable());this._isOpen=!0,this.opener=e(e.ui.safeActiveElement(this.document[0])),this._size(),this._position(),this._createOverlay(),this._moveToTop(null,!0),
// Ensure the overlay is moved to the top with the dialog, but only when
// opening. The overlay shouldn't move after the dialog is open so that
// modeless dialogs opened after the modal dialog stack properly.
this.overlay&&this.overlay.css("z-index",this.uiDialog.css("z-index")-1),this._show(this.uiDialog,this.options.show,function(){t._focusTabbable(),t._trigger("focus")}),
// Track the dialog immediately upon openening in case a focus event
// somehow occurs outside of the dialog before an element inside the
// dialog is focused (#10152)
this._makeFocusTarget(),this._trigger("open")},_focusTabbable:function(){
// Set focus to the first match:
// 1. An element that was focused previously
// 2. First element inside the dialog matching [autofocus]
// 3. Tabbable element inside the content element
// 4. Tabbable element inside the buttonpane
// 5. The close button
// 6. The dialog itself
var e=this._focusedElement;e||(e=this.element.find("[autofocus]")),e.length||(e=this.element.find(":tabbable")),e.length||(e=this.uiDialogButtonPane.find(":tabbable")),e.length||(e=this.uiDialogTitlebarClose.filter(":tabbable")),e.length||(e=this.uiDialog),e.eq(0).trigger("focus")},_keepFocus:function(t){function i(){var t=e.ui.safeActiveElement(this.document[0]);this.uiDialog[0]===t||e.contains(this.uiDialog[0],t)||this._focusTabbable()}t.preventDefault(),i.call(this),
// support: IE
// IE <= 8 doesn't prevent moving focus even with event.preventDefault()
// so we check again later
this._delay(i)},_createWrapper:function(){this.uiDialog=e("<div>").hide().attr({
// Setting tabIndex makes the div focusable
tabIndex:-1,role:"dialog"}).appendTo(this._appendTo()),this._addClass(this.uiDialog,"ui-dialog","ui-widget ui-widget-content ui-front"),this._on(this.uiDialog,{keydown:function(t){if(this.options.closeOnEscape&&!t.isDefaultPrevented()&&t.keyCode&&t.keyCode===e.ui.keyCode.ESCAPE)return t.preventDefault(),void this.close(t);
// Prevent tabbing out of dialogs
if(t.keyCode===e.ui.keyCode.TAB&&!t.isDefaultPrevented()){var i=this.uiDialog.find(":tabbable"),s=i.filter(":first"),n=i.filter(":last");t.target!==n[0]&&t.target!==this.uiDialog[0]||t.shiftKey?t.target!==s[0]&&t.target!==this.uiDialog[0]||!t.shiftKey||(this._delay(function(){n.trigger("focus")}),t.preventDefault()):(this._delay(function(){s.trigger("focus")}),t.preventDefault())}},mousedown:function(e){this._moveToTop(e)&&this._focusTabbable()}}),
// We assume that any existing aria-describedby attribute means
// that the dialog content is marked up properly
// otherwise we brute force the content as the description
this.element.find("[aria-describedby]").length||this.uiDialog.attr({"aria-describedby":this.element.uniqueId().attr("id")})},_createTitlebar:function(){var t;this.uiDialogTitlebar=e("<div>"),this._addClass(this.uiDialogTitlebar,"ui-dialog-titlebar","ui-widget-header ui-helper-clearfix"),this._on(this.uiDialogTitlebar,{mousedown:function(t){
// Don't prevent click on close button (#8838)
// Focusing a dialog that is partially scrolled out of view
// causes the browser to scroll it into view, preventing the click event
e(t.target).closest(".ui-dialog-titlebar-close")||
// Dialog isn't getting focus when dragging (#8063)
this.uiDialog.trigger("focus")}}),
// Support: IE
// Use type="button" to prevent enter keypresses in textboxes from closing the
// dialog in IE (#9312)
this.uiDialogTitlebarClose=e("<button type='button'></button>").button({label:e("<a>").text(this.options.closeText).html(),icon:"ui-icon-closethick",showLabel:!1}).appendTo(this.uiDialogTitlebar),this._addClass(this.uiDialogTitlebarClose,"ui-dialog-titlebar-close"),this._on(this.uiDialogTitlebarClose,{click:function(e){e.preventDefault(),this.close(e)}}),t=e("<span>").uniqueId().prependTo(this.uiDialogTitlebar),this._addClass(t,"ui-dialog-title"),this._title(t),this.uiDialogTitlebar.prependTo(this.uiDialog),this.uiDialog.attr({"aria-labelledby":t.attr("id")})},_title:function(e){this.options.title?e.text(this.options.title):e.html("&#160;")},_createButtonPane:function(){this.uiDialogButtonPane=e("<div>"),this._addClass(this.uiDialogButtonPane,"ui-dialog-buttonpane","ui-widget-content ui-helper-clearfix"),this.uiButtonSet=e("<div>").appendTo(this.uiDialogButtonPane),this._addClass(this.uiButtonSet,"ui-dialog-buttonset"),this._createButtons()},_createButtons:function(){var t=this,i=this.options.buttons;if(
// If we already have a button pane, remove it
this.uiDialogButtonPane.remove(),this.uiButtonSet.empty(),e.isEmptyObject(i)||e.isArray(i)&&!i.length)return void this._removeClass(this.uiDialog,"ui-dialog-buttons");e.each(i,function(i,s){var n,a;s=e.isFunction(s)?{click:s,text:i}:s,
// Default to a non-submitting button
s=e.extend({type:"button"},s),
// Change the context for the click callback to be the main element
n=s.click,a={icon:s.icon,iconPosition:s.iconPosition,showLabel:s.showLabel,
// Deprecated options
icons:s.icons,text:s.text},delete s.click,delete s.icon,delete s.iconPosition,delete s.showLabel,
// Deprecated options
delete s.icons,"boolean"==typeof s.text&&delete s.text,e("<button></button>",s).button(a).appendTo(t.uiButtonSet).on("click",function(){n.apply(t.element[0],arguments)})}),this._addClass(this.uiDialog,"ui-dialog-buttons"),this.uiDialogButtonPane.appendTo(this.uiDialog)},_makeDraggable:function(){function t(e){return{position:e.position,offset:e.offset}}var i=this,s=this.options;this.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(s,n){i._addClass(e(this),"ui-dialog-dragging"),i._blockFrames(),i._trigger("dragStart",s,t(n))},drag:function(e,s){i._trigger("drag",e,t(s))},stop:function(n,a){var o=a.offset.left-i.document.scrollLeft(),r=a.offset.top-i.document.scrollTop();s.position={my:"left top",at:"left"+(o>=0?"+":"")+o+" top"+(r>=0?"+":"")+r,of:i.window},i._removeClass(e(this),"ui-dialog-dragging"),i._unblockFrames(),i._trigger("dragStop",n,t(a))}})},_makeResizable:function(){function t(e){return{originalPosition:e.originalPosition,originalSize:e.originalSize,position:e.position,size:e.size}}var i=this,s=this.options,n=s.resizable,
// .ui-resizable has position: relative defined in the stylesheet
// but dialogs have to use absolute or fixed positioning
a=this.uiDialog.css("position"),o="string"==typeof n?n:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:this.element,maxWidth:s.maxWidth,maxHeight:s.maxHeight,minWidth:s.minWidth,minHeight:this._minHeight(),handles:o,start:function(s,n){i._addClass(e(this),"ui-dialog-resizing"),i._blockFrames(),i._trigger("resizeStart",s,t(n))},resize:function(e,s){i._trigger("resize",e,t(s))},stop:function(n,a){var o=i.uiDialog.offset(),r=o.left-i.document.scrollLeft(),l=o.top-i.document.scrollTop();s.height=i.uiDialog.height(),s.width=i.uiDialog.width(),s.position={my:"left top",at:"left"+(r>=0?"+":"")+r+" top"+(l>=0?"+":"")+l,of:i.window},i._removeClass(e(this),"ui-dialog-resizing"),i._unblockFrames(),i._trigger("resizeStop",n,t(a))}}).css("position",a)},_trackFocus:function(){this._on(this.widget(),{focusin:function(t){this._makeFocusTarget(),this._focusedElement=e(t.target)}})},_makeFocusTarget:function(){this._untrackInstance(),this._trackingInstances().unshift(this)},_untrackInstance:function(){var t=this._trackingInstances(),i=e.inArray(this,t);-1!==i&&t.splice(i,1)},_trackingInstances:function(){var e=this.document.data("ui-dialog-instances");return e||(e=[],this.document.data("ui-dialog-instances",e)),e},_minHeight:function(){var e=this.options;return"auto"===e.height?e.minHeight:Math.min(e.minHeight,e.height)},_position:function(){
// Need to show the dialog to get the actual offset in the position plugin
var e=this.uiDialog.is(":visible");e||this.uiDialog.show(),this.uiDialog.position(this.options.position),e||this.uiDialog.hide()},_setOptions:function(t){var i=this,s=!1,n={};e.each(t,function(e,t){i._setOption(e,t),e in i.sizeRelatedOptions&&(s=!0),e in i.resizableRelatedOptions&&(n[e]=t)}),s&&(this._size(),this._position()),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option",n)},_setOption:function(t,i){var s,n,a=this.uiDialog;"disabled"!==t&&(this._super(t,i),"appendTo"===t&&this.uiDialog.appendTo(this._appendTo()),"buttons"===t&&this._createButtons(),"closeText"===t&&this.uiDialogTitlebarClose.button({
// Ensure that we always pass a string
label:e("<a>").text(""+this.options.closeText).html()}),"draggable"===t&&(s=a.is(":data(ui-draggable)"),s&&!i&&a.draggable("destroy"),!s&&i&&this._makeDraggable()),"position"===t&&this._position(),"resizable"===t&&(
// currently resizable, becoming non-resizable
n=a.is(":data(ui-resizable)"),n&&!i&&a.resizable("destroy"),
// Currently resizable, changing handles
n&&"string"==typeof i&&a.resizable("option","handles",i),
// Currently non-resizable, becoming resizable
n||!1===i||this._makeResizable()),"title"===t&&this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))},_size:function(){
// If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
// divs will both have width and height set, so we need to reset them
var e,t,i,s=this.options;
// Reset content sizing
this.element.show().css({width:"auto",minHeight:0,maxHeight:"none",height:0}),s.minWidth>s.width&&(s.width=s.minWidth),
// Reset wrapper sizing
// determine the height of all the non-content elements
e=this.uiDialog.css({height:"auto",width:s.width}).outerHeight(),t=Math.max(0,s.minHeight-e),i="number"==typeof s.maxHeight?Math.max(0,s.maxHeight-e):"none","auto"===s.height?this.element.css({minHeight:t,maxHeight:i,height:"auto"}):this.element.height(Math.max(0,s.height-e)),this.uiDialog.is(":data(ui-resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())},_blockFrames:function(){this.iframeBlocks=this.document.find("iframe").map(function(){var t=e(this);return e("<div>").css({position:"absolute",width:t.outerWidth(),height:t.outerHeight()}).appendTo(t.parent()).offset(t.offset())[0]})},_unblockFrames:function(){this.iframeBlocks&&(this.iframeBlocks.remove(),delete this.iframeBlocks)},_allowInteraction:function(t){return!!e(t.target).closest(".ui-dialog").length||!!e(t.target).closest(".ui-datepicker").length},_createOverlay:function(){if(this.options.modal){
// We use a delay in case the overlay is created from an
// event that we're going to be cancelling (#2804)
var t=!0;this._delay(function(){t=!1}),this.document.data("ui-dialog-overlays")||
// Prevent use of anchors and inputs
// Using _on() for an event handler shared across many instances is
// safe because the dialogs stack and must be closed in reverse order
this._on(this.document,{focusin:function(e){t||this._allowInteraction(e)||(e.preventDefault(),this._trackingInstances()[0]._focusTabbable())}}),this.overlay=e("<div>").appendTo(this._appendTo()),this._addClass(this.overlay,null,"ui-widget-overlay ui-front"),this._on(this.overlay,{mousedown:"_keepFocus"}),this.document.data("ui-dialog-overlays",(this.document.data("ui-dialog-overlays")||0)+1)}},_destroyOverlay:function(){if(this.options.modal&&this.overlay){var e=this.document.data("ui-dialog-overlays")-1;e?this.document.data("ui-dialog-overlays",e):(this._off(this.document,"focusin"),this.document.removeData("ui-dialog-overlays")),this.overlay.remove(),this.overlay=null}}}),
// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
!1!==e.uiBackCompat&&
// Backcompat for dialogClass option
e.widget("ui.dialog",e.ui.dialog,{options:{dialogClass:""},_createWrapper:function(){this._super(),this.uiDialog.addClass(this.options.dialogClass)},_setOption:function(e,t){"dialogClass"===e&&this.uiDialog.removeClass(this.options.dialogClass).addClass(t),this._superApply(arguments)}});e.ui.dialog;/*!
 * jQuery UI Droppable 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Droppable
//>>group: Interactions
//>>description: Enables drop targets for draggable elements.
//>>docs: http://api.jqueryui.com/droppable/
//>>demos: http://jqueryui.com/droppable/
e.widget("ui.droppable",{version:"1.12.1",widgetEventPrefix:"drop",options:{accept:"*",addClasses:!0,greedy:!1,scope:"default",tolerance:"intersect",
// Callbacks
activate:null,deactivate:null,drop:null,out:null,over:null},_create:function(){var t,i=this.options,s=i.accept;this.isover=!1,this.isout=!0,this.accept=e.isFunction(s)?s:function(e){return e.is(s)},this.proportions=function(){if(!arguments.length)
// Retrieve or derive the droppable's proportions
return t||(t={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight});
// Store the droppable's proportions
t=arguments[0]},this._addToManager(i.scope),i.addClasses&&this._addClass("ui-droppable")},_addToManager:function(t){
// Add the reference and positions to the manager
e.ui.ddmanager.droppables[t]=e.ui.ddmanager.droppables[t]||[],e.ui.ddmanager.droppables[t].push(this)},_splice:function(e){for(var t=0;t<e.length;t++)e[t]===this&&e.splice(t,1)},_destroy:function(){var t=e.ui.ddmanager.droppables[this.options.scope];this._splice(t)},_setOption:function(t,i){if("accept"===t)this.accept=e.isFunction(i)?i:function(e){return e.is(i)};else if("scope"===t){var s=e.ui.ddmanager.droppables[this.options.scope];this._splice(s),this._addToManager(i)}this._super(t,i)},_activate:function(t){var i=e.ui.ddmanager.current;this._addActiveClass(),i&&this._trigger("activate",t,this.ui(i))},_deactivate:function(t){var i=e.ui.ddmanager.current;this._removeActiveClass(),i&&this._trigger("deactivate",t,this.ui(i))},_over:function(t){var i=e.ui.ddmanager.current;
// Bail if draggable and droppable are same element
i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._addHoverClass(),this._trigger("over",t,this.ui(i)))},_out:function(t){var i=e.ui.ddmanager.current;
// Bail if draggable and droppable are same element
i&&(i.currentItem||i.element)[0]!==this.element[0]&&this.accept.call(this.element[0],i.currentItem||i.element)&&(this._removeHoverClass(),this._trigger("out",t,this.ui(i)))},_drop:function(t,i){var s=i||e.ui.ddmanager.current,n=!1;
// Bail if draggable and droppable are same element
// Bail if draggable and droppable are same element
return!(!s||(s.currentItem||s.element)[0]===this.element[0])&&(this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function(){var i=e(this).droppable("instance");if(i.options.greedy&&!i.options.disabled&&i.options.scope===s.options.scope&&i.accept.call(i.element[0],s.currentItem||s.element)&&m(s,e.extend(i,{offset:i.element.offset()}),i.options.tolerance,t))return n=!0,!1}),!n&&(!!this.accept.call(this.element[0],s.currentItem||s.element)&&(this._removeActiveClass(),this._removeHoverClass(),this._trigger("drop",t,this.ui(s)),this.element)))},ui:function(e){return{draggable:e.currentItem||e.element,helper:e.helper,position:e.position,offset:e.positionAbs}},
// Extension points just to make backcompat sane and avoid duplicating logic
// TODO: Remove in 1.13 along with call to it below
_addHoverClass:function(){this._addClass("ui-droppable-hover")},_removeHoverClass:function(){this._removeClass("ui-droppable-hover")},_addActiveClass:function(){this._addClass("ui-droppable-active")},_removeActiveClass:function(){this._removeClass("ui-droppable-active")}});var m=e.ui.intersect=function(){function e(e,t,i){return e>=t&&e<t+i}return function(t,i,s,n){if(!i.offset)return!1;var a=(t.positionAbs||t.position.absolute).left+t.margins.left,o=(t.positionAbs||t.position.absolute).top+t.margins.top,r=a+t.helperProportions.width,l=o+t.helperProportions.height,h=i.offset.left,c=i.offset.top,u=h+i.proportions().width,d=c+i.proportions().height;switch(s){case"fit":return h<=a&&r<=u&&c<=o&&l<=d;case"intersect":// Right Half
// Left Half
// Bottom Half
return h<a+t.helperProportions.width/2&&r-t.helperProportions.width/2<u&&c<o+t.helperProportions.height/2&&l-t.helperProportions.height/2<d;// Top Half
case"pointer":return e(n.pageY,c,i.proportions().height)&&e(n.pageX,h,i.proportions().width);case"touch":// Top edge touching
// Bottom edge touching
// Left edge touching
// Right edge touching
return(o>=c&&o<=d||l>=c&&l<=d||o<c&&l>d)&&(a>=h&&a<=u||r>=h&&r<=u||a<h&&r>u);default:return!1}}}();/*
	This manager tracks offsets of draggables and droppables
*/
e.ui.ddmanager={current:null,droppables:{default:[]},prepareOffsets:function(t,i){var s,n,a=e.ui.ddmanager.droppables[t.options.scope]||[],o=i?i.type:null,// workaround for #2317
r=(t.currentItem||t.element).find(":data(ui-droppable)").addBack();e:for(s=0;s<a.length;s++)
// No disabled and non-accepted
if(!(a[s].options.disabled||t&&!a[s].accept.call(a[s].element[0],t.currentItem||t.element))){
// Filter out elements in the current dragged item
for(n=0;n<r.length;n++)if(r[n]===a[s].element[0]){a[s].proportions().height=0;continue e}a[s].visible="none"!==a[s].element.css("display"),a[s].visible&&(
// Activate the droppable if used directly from draggables
"mousedown"===o&&a[s]._activate.call(a[s],i),a[s].offset=a[s].element.offset(),a[s].proportions({width:a[s].element[0].offsetWidth,height:a[s].element[0].offsetHeight}))}},drop:function(t,i){var s=!1;
// Create a copy of the droppables in case the list changes during the drop (#9116)
return e.each((e.ui.ddmanager.droppables[t.options.scope]||[]).slice(),function(){this.options&&(!this.options.disabled&&this.visible&&m(t,this,this.options.tolerance,i)&&(s=this._drop.call(this,i)||s),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],t.currentItem||t.element)&&(this.isout=!0,this.isover=!1,this._deactivate.call(this,i)))}),s},dragStart:function(t,i){
// Listen for scrolling so that if the dragging causes scrolling the position of the
// droppables can be recalculated (see #5003)
t.element.parentsUntil("body").on("scroll.droppable",function(){t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)})},drag:function(t,i){
// If you have a highly dynamic page, you might try this option. It renders positions
// every time you move the mouse.
t.options.refreshPositions&&e.ui.ddmanager.prepareOffsets(t,i),
// Run through all droppables and check their positions based on specific tolerance options
e.each(e.ui.ddmanager.droppables[t.options.scope]||[],function(){if(!this.options.disabled&&!this.greedyChild&&this.visible){var s,n,a,o=m(t,this,this.options.tolerance,i),r=!o&&this.isover?"isout":o&&!this.isover?"isover":null;r&&(this.options.greedy&&(
// find droppable parents with same scope
n=this.options.scope,a=this.element.parents(":data(ui-droppable)").filter(function(){return e(this).droppable("instance").options.scope===n}),a.length&&(s=e(a[0]).droppable("instance"),s.greedyChild="isover"===r)),
// We just moved into a greedy child
s&&"isover"===r&&(s.isover=!1,s.isout=!0,s._out.call(s,i)),this[r]=!0,this["isout"===r?"isover":"isout"]=!1,this["isover"===r?"_over":"_out"].call(this,i),
// We just moved out of a greedy child
s&&"isout"===r&&(s.isout=!1,s.isover=!0,s._over.call(s,i)))}})},dragStop:function(t,i){t.element.parentsUntil("body").off("scroll.droppable"),
// Call prepareOffsets one final time since IE does not fire return scroll events when
// overflow was caused by drag (see #5003)
t.options.refreshPositions||e.ui.ddmanager.prepareOffsets(t,i)}},
// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
!1!==e.uiBackCompat&&
// Backcompat for activeClass and hoverClass options
e.widget("ui.droppable",e.ui.droppable,{options:{hoverClass:!1,activeClass:!1},_addActiveClass:function(){this._super(),this.options.activeClass&&this.element.addClass(this.options.activeClass)},_removeActiveClass:function(){this._super(),this.options.activeClass&&this.element.removeClass(this.options.activeClass)},_addHoverClass:function(){this._super(),this.options.hoverClass&&this.element.addClass(this.options.hoverClass)},_removeHoverClass:function(){this._super(),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass)}});e.ui.droppable,e.widget("ui.progressbar",{version:"1.12.1",options:{classes:{"ui-progressbar":"ui-corner-all","ui-progressbar-value":"ui-corner-left","ui-progressbar-complete":"ui-corner-right"},max:100,value:0,change:null,complete:null},min:0,_create:function(){
// Constrain initial value
this.oldValue=this.options.value=this._constrainedValue(),this.element.attr({
// Only set static values; aria-valuenow and aria-valuemax are
// set inside _refreshValue()
role:"progressbar","aria-valuemin":this.min}),this._addClass("ui-progressbar","ui-widget ui-widget-content"),this.valueDiv=e("<div>").appendTo(this.element),this._addClass(this.valueDiv,"ui-progressbar-value","ui-widget-header"),this._refreshValue()},_destroy:function(){this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow"),this.valueDiv.remove()},value:function(e){if(void 0===e)return this.options.value;this.options.value=this._constrainedValue(e),this._refreshValue()},_constrainedValue:function(e){
// Sanitize value
return void 0===e&&(e=this.options.value),this.indeterminate=!1===e,"number"!=typeof e&&(e=0),!this.indeterminate&&Math.min(this.options.max,Math.max(this.min,e))},_setOptions:function(e){
// Ensure "value" option is set after other values (like max)
var t=e.value;delete e.value,this._super(e),this.options.value=this._constrainedValue(t),this._refreshValue()},_setOption:function(e,t){"max"===e&&(
// Don't allow a max less than min
t=Math.max(this.min,t)),this._super(e,t)},_setOptionDisabled:function(e){this._super(e),this.element.attr("aria-disabled",e),this._toggleClass(null,"ui-state-disabled",!!e)},_percentage:function(){return this.indeterminate?100:100*(this.options.value-this.min)/(this.options.max-this.min)},_refreshValue:function(){var t=this.options.value,i=this._percentage();this.valueDiv.toggle(this.indeterminate||t>this.min).width(i.toFixed(0)+"%"),this._toggleClass(this.valueDiv,"ui-progressbar-complete",null,t===this.options.max)._toggleClass("ui-progressbar-indeterminate",null,this.indeterminate),this.indeterminate?(this.element.removeAttr("aria-valuenow"),this.overlayDiv||(this.overlayDiv=e("<div>").appendTo(this.valueDiv),this._addClass(this.overlayDiv,"ui-progressbar-overlay"))):(this.element.attr({"aria-valuemax":this.options.max,"aria-valuenow":t}),this.overlayDiv&&(this.overlayDiv.remove(),this.overlayDiv=null)),this.oldValue!==t&&(this.oldValue=t,this._trigger("change")),t===this.options.max&&this._trigger("complete")}}),e.widget("ui.selectable",e.ui.mouse,{version:"1.12.1",options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch",
// Callbacks
selected:null,selecting:null,start:null,stop:null,unselected:null,unselecting:null},_create:function(){var t=this;this._addClass("ui-selectable"),this.dragged=!1,
// Cache selectee children based on filter
this.refresh=function(){t.elementPos=e(t.element[0]).offset(),t.selectees=e(t.options.filter,t.element[0]),t._addClass(t.selectees,"ui-selectee"),t.selectees.each(function(){var i=e(this),s=i.offset(),n={left:s.left-t.elementPos.left,top:s.top-t.elementPos.top};e.data(this,"selectable-item",{element:this,$element:i,left:n.left,top:n.top,right:n.left+i.outerWidth(),bottom:n.top+i.outerHeight(),startselected:!1,selected:i.hasClass("ui-selected"),selecting:i.hasClass("ui-selecting"),unselecting:i.hasClass("ui-unselecting")})})},this.refresh(),this._mouseInit(),this.helper=e("<div>"),this._addClass(this.helper,"ui-selectable-helper")},_destroy:function(){this.selectees.removeData("selectable-item"),this._mouseDestroy()},_mouseStart:function(t){var i=this,s=this.options;this.opos=[t.pageX,t.pageY],this.elementPos=e(this.element[0]).offset(),this.options.disabled||(this.selectees=e(s.filter,this.element[0]),this._trigger("start",t),e(s.appendTo).append(this.helper),
// position helper (lasso)
this.helper.css({left:t.pageX,top:t.pageY,width:0,height:0}),s.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var s=e.data(this,"selectable-item");s.startselected=!0,t.metaKey||t.ctrlKey||(i._removeClass(s.$element,"ui-selected"),s.selected=!1,i._addClass(s.$element,"ui-unselecting"),s.unselecting=!0,
// selectable UNSELECTING callback
i._trigger("unselecting",t,{unselecting:s.element}))}),e(t.target).parents().addBack().each(function(){var s,n=e.data(this,"selectable-item");if(n)
// selectable (UN)SELECTING callback
return s=!t.metaKey&&!t.ctrlKey||!n.$element.hasClass("ui-selected"),i._removeClass(n.$element,s?"ui-unselecting":"ui-selected")._addClass(n.$element,s?"ui-selecting":"ui-unselecting"),n.unselecting=!s,n.selecting=s,n.selected=s,s?i._trigger("selecting",t,{selecting:n.element}):i._trigger("unselecting",t,{unselecting:n.element}),!1}))},_mouseDrag:function(t){if(this.dragged=!0,!this.options.disabled){var i,s=this,n=this.options,a=this.opos[0],o=this.opos[1],r=t.pageX,l=t.pageY;return a>r&&(i=r,r=a,a=i),o>l&&(i=l,l=o,o=i),this.helper.css({left:a,top:o,width:r-a,height:l-o}),this.selectees.each(function(){var i=e.data(this,"selectable-item"),h=!1,c={};
//prevent helper from being selected if appendTo: selectable
i&&i.element!==s.element[0]&&(c.left=i.left+s.elementPos.left,c.right=i.right+s.elementPos.left,c.top=i.top+s.elementPos.top,c.bottom=i.bottom+s.elementPos.top,"touch"===n.tolerance?h=!(c.left>r||c.right<a||c.top>l||c.bottom<o):"fit"===n.tolerance&&(h=c.left>a&&c.right<r&&c.top>o&&c.bottom<l),h?(
// SELECT
i.selected&&(s._removeClass(i.$element,"ui-selected"),i.selected=!1),i.unselecting&&(s._removeClass(i.$element,"ui-unselecting"),i.unselecting=!1),i.selecting||(s._addClass(i.$element,"ui-selecting"),i.selecting=!0,
// selectable SELECTING callback
s._trigger("selecting",t,{selecting:i.element}))):(
// UNSELECT
i.selecting&&((t.metaKey||t.ctrlKey)&&i.startselected?(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,s._addClass(i.$element,"ui-selected"),i.selected=!0):(s._removeClass(i.$element,"ui-selecting"),i.selecting=!1,i.startselected&&(s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0),
// selectable UNSELECTING callback
s._trigger("unselecting",t,{unselecting:i.element}))),i.selected&&(t.metaKey||t.ctrlKey||i.startselected||(s._removeClass(i.$element,"ui-selected"),i.selected=!1,s._addClass(i.$element,"ui-unselecting"),i.unselecting=!0,
// selectable UNSELECTING callback
s._trigger("unselecting",t,{unselecting:i.element})))))}),!1}},_mouseStop:function(t){var i=this;return this.dragged=!1,e(".ui-unselecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");i._removeClass(s.$element,"ui-unselecting"),s.unselecting=!1,s.startselected=!1,i._trigger("unselected",t,{unselected:s.element})}),e(".ui-selecting",this.element[0]).each(function(){var s=e.data(this,"selectable-item");i._removeClass(s.$element,"ui-selecting")._addClass(s.$element,"ui-selected"),s.selecting=!1,s.selected=!0,s.startselected=!0,i._trigger("selected",t,{selected:s.element})}),this._trigger("stop",t),this.helper.remove(),!1}}),e.widget("ui.selectmenu",[e.ui.formResetMixin,{version:"1.12.1",defaultElement:"<select>",options:{appendTo:null,classes:{"ui-selectmenu-button-open":"ui-corner-top","ui-selectmenu-button-closed":"ui-corner-all"},disabled:null,icons:{button:"ui-icon-triangle-1-s"},position:{my:"left top",at:"left bottom",collision:"none"},width:!1,
// Callbacks
change:null,close:null,focus:null,open:null,select:null},_create:function(){var t=this.element.uniqueId().attr("id");this.ids={element:t,button:t+"-button",menu:t+"-menu"},this._drawButton(),this._drawMenu(),this._bindFormResetHandler(),this._rendered=!1,this.menuItems=e()},_drawButton:function(){var t,i=this,s=this._parseOption(this.element.find("option:selected"),this.element[0].selectedIndex);
// Associate existing label with the new button
this.labels=this.element.labels().attr("for",this.ids.button),this._on(this.labels,{click:function(e){this.button.focus(),e.preventDefault()}}),
// Hide original select element
this.element.hide(),
// Create button
this.button=e("<span>",{tabindex:this.options.disabled?-1:0,id:this.ids.button,role:"combobox","aria-expanded":"false","aria-autocomplete":"list","aria-owns":this.ids.menu,"aria-haspopup":"true",title:this.element.attr("title")}).insertAfter(this.element),this._addClass(this.button,"ui-selectmenu-button ui-selectmenu-button-closed","ui-button ui-widget"),t=e("<span>").appendTo(this.button),this._addClass(t,"ui-selectmenu-icon","ui-icon "+this.options.icons.button),this.buttonItem=this._renderButtonItem(s).appendTo(this.button),!1!==this.options.width&&this._resizeButton(),this._on(this.button,this._buttonEvents),this.button.one("focusin",function(){
// Delay rendering the menu items until the button receives focus.
// The menu may have already been rendered via a programmatic open.
i._rendered||i._refreshMenu()})},_drawMenu:function(){var t=this;
// Create menu
this.menu=e("<ul>",{"aria-hidden":"true","aria-labelledby":this.ids.button,id:this.ids.menu}),
// Wrap menu
this.menuWrap=e("<div>").append(this.menu),this._addClass(this.menuWrap,"ui-selectmenu-menu","ui-front"),this.menuWrap.appendTo(this._appendTo()),
// Initialize menu widget
this.menuInstance=this.menu.menu({classes:{"ui-menu":"ui-corner-bottom"},role:"listbox",select:function(e,i){e.preventDefault(),
// Support: IE8
// If the item was selected via a click, the text selection
// will be destroyed in IE
t._setSelection(),t._select(i.item.data("ui-selectmenu-item"),e)},focus:function(e,i){var s=i.item.data("ui-selectmenu-item");
// Prevent inital focus from firing and check if its a newly focused item
null!=t.focusIndex&&s.index!==t.focusIndex&&(t._trigger("focus",e,{item:s}),t.isOpen||t._select(s,e)),t.focusIndex=s.index,t.button.attr("aria-activedescendant",t.menuItems.eq(s.index).attr("id"))}}).menu("instance"),
// Don't close the menu on mouseleave
this.menuInstance._off(this.menu,"mouseleave"),
// Cancel the menu's collapseAll on document click
this.menuInstance._closeOnDocumentClick=function(){return!1},
// Selects often contain empty items, but never contain dividers
this.menuInstance._isDivider=function(){return!1}},refresh:function(){this._refreshMenu(),this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(
// Fall back to an empty object in case there are no options
this._getSelectedItem().data("ui-selectmenu-item")||{})),null===this.options.width&&this._resizeButton()},_refreshMenu:function(){var e,t=this.element.find("option");this.menu.empty(),this._parseOptions(t),this._renderMenu(this.menu,this.items),this.menuInstance.refresh(),this.menuItems=this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper"),this._rendered=!0,t.length&&(e=this._getSelectedItem(),
// Update the menu to have the correct item focused
this.menuInstance.focus(null,e),this._setAria(e.data("ui-selectmenu-item")),
// Set disabled state
this._setOption("disabled",this.element.prop("disabled")))},open:function(e){this.options.disabled||(
// If this is the first time the menu is being opened, render the items
this._rendered?(
// Menu clears focus on close, reset focus to selected item
this._removeClass(this.menu.find(".ui-state-active"),null,"ui-state-active"),this.menuInstance.focus(null,this._getSelectedItem())):this._refreshMenu(),
// If there are no options, don't open the menu
this.menuItems.length&&(this.isOpen=!0,this._toggleAttr(),this._resizeMenu(),this._position(),this._on(this.document,this._documentClick),this._trigger("open",e)))},_position:function(){this.menuWrap.position(e.extend({of:this.button},this.options.position))},close:function(e){this.isOpen&&(this.isOpen=!1,this._toggleAttr(),this.range=null,this._off(this.document),this._trigger("close",e))},widget:function(){return this.button},menuWidget:function(){return this.menu},_renderButtonItem:function(t){var i=e("<span>");return this._setText(i,t.label),this._addClass(i,"ui-selectmenu-text"),i},_renderMenu:function(t,i){var s=this,n="";e.each(i,function(i,a){var o;a.optgroup!==n&&(o=e("<li>",{text:a.optgroup}),s._addClass(o,"ui-selectmenu-optgroup","ui-menu-divider"+(a.element.parent("optgroup").prop("disabled")?" ui-state-disabled":"")),o.appendTo(t),n=a.optgroup),s._renderItemData(t,a)})},_renderItemData:function(e,t){return this._renderItem(e,t).data("ui-selectmenu-item",t)},_renderItem:function(t,i){var s=e("<li>"),n=e("<div>",{title:i.element.attr("title")});return i.disabled&&this._addClass(s,null,"ui-state-disabled"),this._setText(n,i.label),s.append(n).appendTo(t)},_setText:function(e,t){t?e.text(t):e.html("&#160;")},_move:function(e,t){var i,s,n=".ui-menu-item";this.isOpen?i=this.menuItems.eq(this.focusIndex).parent("li"):(i=this.menuItems.eq(this.element[0].selectedIndex).parent("li"),n+=":not(.ui-state-disabled)"),s="first"===e||"last"===e?i["first"===e?"prevAll":"nextAll"](n).eq(-1):i[e+"All"](n).eq(0),s.length&&this.menuInstance.focus(t,s)},_getSelectedItem:function(){return this.menuItems.eq(this.element[0].selectedIndex).parent("li")},_toggle:function(e){this[this.isOpen?"close":"open"](e)},_setSelection:function(){var e;this.range&&(window.getSelection?(e=window.getSelection(),e.removeAllRanges(),e.addRange(this.range)):this.range.select(),
// Support: IE
// Setting the text selection kills the button focus in IE, but
// restoring the focus doesn't kill the selection.
this.button.focus())},_documentClick:{mousedown:function(t){this.isOpen&&(e(t.target).closest(".ui-selectmenu-menu, #"+e.ui.escapeSelector(this.ids.button)).length||this.close(t))}},_buttonEvents:{
// Prevent text selection from being reset when interacting with the selectmenu (#10144)
mousedown:function(){var e;window.getSelection?(e=window.getSelection(),e.rangeCount&&(this.range=e.getRangeAt(0))):this.range=document.selection.createRange()},click:function(e){this._setSelection(),this._toggle(e)},keydown:function(t){var i=!0;switch(t.keyCode){case e.ui.keyCode.TAB:case e.ui.keyCode.ESCAPE:this.close(t),i=!1;break;case e.ui.keyCode.ENTER:this.isOpen&&this._selectFocusedItem(t);break;case e.ui.keyCode.UP:t.altKey?this._toggle(t):this._move("prev",t);break;case e.ui.keyCode.DOWN:t.altKey?this._toggle(t):this._move("next",t);break;case e.ui.keyCode.SPACE:this.isOpen?this._selectFocusedItem(t):this._toggle(t);break;case e.ui.keyCode.LEFT:this._move("prev",t);break;case e.ui.keyCode.RIGHT:this._move("next",t);break;case e.ui.keyCode.HOME:case e.ui.keyCode.PAGE_UP:this._move("first",t);break;case e.ui.keyCode.END:case e.ui.keyCode.PAGE_DOWN:this._move("last",t);break;default:this.menu.trigger(t),i=!1}i&&t.preventDefault()}},_selectFocusedItem:function(e){var t=this.menuItems.eq(this.focusIndex).parent("li");t.hasClass("ui-state-disabled")||this._select(t.data("ui-selectmenu-item"),e)},_select:function(e,t){var i=this.element[0].selectedIndex;
// Change native select element
this.element[0].selectedIndex=e.index,this.buttonItem.replaceWith(this.buttonItem=this._renderButtonItem(e)),this._setAria(e),this._trigger("select",t,{item:e}),e.index!==i&&this._trigger("change",t,{item:e}),this.close(t)},_setAria:function(e){var t=this.menuItems.eq(e.index).attr("id");this.button.attr({"aria-labelledby":t,"aria-activedescendant":t}),this.menu.attr("aria-activedescendant",t)},_setOption:function(e,t){if("icons"===e){var i=this.button.find("span.ui-icon");this._removeClass(i,null,this.options.icons.button)._addClass(i,null,t.button)}this._super(e,t),"appendTo"===e&&this.menuWrap.appendTo(this._appendTo()),"width"===e&&this._resizeButton()},_setOptionDisabled:function(e){this._super(e),this.menuInstance.option("disabled",e),this.button.attr("aria-disabled",e),this._toggleClass(this.button,null,"ui-state-disabled",e),this.element.prop("disabled",e),e?(this.button.attr("tabindex",-1),this.close()):this.button.attr("tabindex",0)},_appendTo:function(){var t=this.options.appendTo;return t&&(t=t.jquery||t.nodeType?e(t):this.document.find(t).eq(0)),t&&t[0]||(t=this.element.closest(".ui-front, dialog")),t.length||(t=this.document[0].body),t},_toggleAttr:function(){this.button.attr("aria-expanded",this.isOpen),
// We can't use two _toggleClass() calls here, because we need to make sure
// we always remove classes first and add them second, otherwise if both classes have the
// same theme class, it will be removed after we add it.
this._removeClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"closed":"open"))._addClass(this.button,"ui-selectmenu-button-"+(this.isOpen?"open":"closed"))._toggleClass(this.menuWrap,"ui-selectmenu-open",null,this.isOpen),this.menu.attr("aria-hidden",!this.isOpen)},_resizeButton:function(){var e=this.options.width;
// For `width: false`, just remove inline style and stop
if(!1===e)return void this.button.css("width","");
// For `width: null`, match the width of the original element
null===e&&(e=this.element.show().outerWidth(),this.element.hide()),this.button.outerWidth(e)},_resizeMenu:function(){this.menu.outerWidth(Math.max(this.button.outerWidth(),
// Support: IE10
// IE10 wraps long text (possibly a rounding bug)
// so we add 1px to avoid the wrapping
this.menu.width("").outerWidth()+1))},_getCreateOptions:function(){var e=this._super();return e.disabled=this.element.prop("disabled"),e},_parseOptions:function(t){var i=this,s=[];t.each(function(t,n){s.push(i._parseOption(e(n),t))}),this.items=s},_parseOption:function(e,t){var i=e.parent("optgroup");return{element:e,index:t,value:e.val(),label:e.text(),optgroup:i.attr("label")||"",disabled:i.prop("disabled")||e.prop("disabled")}},_destroy:function(){this._unbindFormResetHandler(),this.menuWrap.remove(),this.button.remove(),this.element.show(),this.element.removeUniqueId(),this.labels.attr("for",this.ids.element)}}]),e.widget("ui.slider",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"slide",options:{animate:!1,classes:{"ui-slider":"ui-corner-all","ui-slider-handle":"ui-corner-all",
// Note: ui-widget-header isn't the most fittingly semantic framework class for this
// element, but worked best visually with a variety of themes
"ui-slider-range":"ui-corner-all ui-widget-header"},distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null,
// Callbacks
change:null,slide:null,start:null,stop:null},
// Number of pages in a slider
// (how many times can you page up/down to go through the whole range)
numPages:5,_create:function(){this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this._calculateNewMax(),this._addClass("ui-slider ui-slider-"+this.orientation,"ui-widget ui-widget-content"),this._refresh(),this._animateOff=!1},_refresh:function(){this._createRange(),this._createHandles(),this._setupEvents(),this._refreshValue()},_createHandles:function(){var t,i,s=this.options,n=this.element.find(".ui-slider-handle"),a=[];for(i=s.values&&s.values.length||1,n.length>i&&(n.slice(i).remove(),n=n.slice(0,i)),t=n.length;t<i;t++)a.push("<span tabindex='0'></span>");this.handles=n.add(e(a.join("")).appendTo(this.element)),this._addClass(this.handles,"ui-slider-handle","ui-state-default"),this.handle=this.handles.eq(0),this.handles.each(function(t){e(this).data("ui-slider-handle-index",t).attr("tabIndex",0)})},_createRange:function(){var t=this.options;t.range?(!0===t.range&&(t.values?t.values.length&&2!==t.values.length?t.values=[t.values[0],t.values[0]]:e.isArray(t.values)&&(t.values=t.values.slice(0)):t.values=[this._valueMin(),this._valueMin()]),this.range&&this.range.length?(this._removeClass(this.range,"ui-slider-range-min ui-slider-range-max"),
// Handle range switching from true to min/max
this.range.css({left:"",bottom:""})):(this.range=e("<div>").appendTo(this.element),this._addClass(this.range,"ui-slider-range")),"min"!==t.range&&"max"!==t.range||this._addClass(this.range,"ui-slider-range-"+t.range)):(this.range&&this.range.remove(),this.range=null)},_setupEvents:function(){this._off(this.handles),this._on(this.handles,this._handleEvents),this._hoverable(this.handles),this._focusable(this.handles)},_destroy:function(){this.handles.remove(),this.range&&this.range.remove(),this._mouseDestroy()},_mouseCapture:function(t){var i,s,n,a,o,r,l,h=this,c=this.options;return!c.disabled&&(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),i={x:t.pageX,y:t.pageY},s=this._normValueFromMouse(i),n=this._valueMax()-this._valueMin()+1,this.handles.each(function(t){var i=Math.abs(s-h.values(t));(n>i||n===i&&(t===h._lastChangedValue||h.values(t)===c.min))&&(n=i,a=e(this),o=t)}),!1!==this._start(t,o)&&(this._mouseSliding=!0,this._handleIndex=o,this._addClass(a,null,"ui-state-active"),a.trigger("focus"),r=a.offset(),l=!e(t.target).parents().addBack().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:t.pageX-r.left-a.width()/2,top:t.pageY-r.top-a.height()/2-(parseInt(a.css("borderTopWidth"),10)||0)-(parseInt(a.css("borderBottomWidth"),10)||0)+(parseInt(a.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(t,o,s),this._animateOff=!0,!0))},_mouseStart:function(){return!0},_mouseDrag:function(e){var t={x:e.pageX,y:e.pageY},i=this._normValueFromMouse(t);return this._slide(e,this._handleIndex,i),!1},_mouseStop:function(e){return this._removeClass(this.handles,null,"ui-state-active"),this._mouseSliding=!1,this._stop(e,this._handleIndex),this._change(e,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation="vertical"===this.options.orientation?"vertical":"horizontal"},_normValueFromMouse:function(e){var t,i,s,n,a;return"horizontal"===this.orientation?(t=this.elementSize.width,i=e.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(t=this.elementSize.height,i=e.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),s=i/t,s>1&&(s=1),s<0&&(s=0),"vertical"===this.orientation&&(s=1-s),n=this._valueMax()-this._valueMin(),a=this._valueMin()+s*n,this._trimAlignValue(a)},_uiHash:function(e,t,i){var s={handle:this.handles[e],handleIndex:e,value:void 0!==t?t:this.value()};return this._hasMultipleValues()&&(s.value=void 0!==t?t:this.values(e),s.values=i||this.values()),s},_hasMultipleValues:function(){return this.options.values&&this.options.values.length},_start:function(e,t){return this._trigger("start",e,this._uiHash(t))},_slide:function(e,t,i){var s,n=this.value(),a=this.values();this._hasMultipleValues()&&(s=this.values(t?0:1),n=this.values(t),2===this.options.values.length&&!0===this.options.range&&(i=0===t?Math.min(s,i):Math.max(s,i)),a[t]=i),i!==n&&!1!==this._trigger("slide",e,this._uiHash(t,i,a))&&(this._hasMultipleValues()?this.values(t,i):this.value(i))},_stop:function(e,t){this._trigger("stop",e,this._uiHash(t))},_change:function(e,t){this._keySliding||this._mouseSliding||(
//store the last changed value index for reference when handles overlap
this._lastChangedValue=t,this._trigger("change",e,this._uiHash(t)))},value:function(e){return arguments.length?(this.options.value=this._trimAlignValue(e),this._refreshValue(),void this._change(null,0)):this._value()},values:function(t,i){var s,n,a;if(arguments.length>1)return this.options.values[t]=this._trimAlignValue(i),this._refreshValue(),void this._change(null,t);if(!arguments.length)return this._values();if(!e.isArray(arguments[0]))return this._hasMultipleValues()?this._values(t):this.value();for(s=this.options.values,n=arguments[0],a=0;a<s.length;a+=1)s[a]=this._trimAlignValue(n[a]),this._change(null,a);this._refreshValue()},_setOption:function(t,i){var s,n=0;switch("range"===t&&!0===this.options.range&&("min"===i?(this.options.value=this._values(0),this.options.values=null):"max"===i&&(this.options.value=this._values(this.options.values.length-1),this.options.values=null)),e.isArray(this.options.values)&&(n=this.options.values.length),this._super(t,i),t){case"orientation":this._detectOrientation(),this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-"+this.orientation),this._refreshValue(),this.options.range&&this._refreshRange(i),
// Reset positioning from previous orientation
this.handles.css("horizontal"===i?"bottom":"left","");break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":
// Start from the last handle to prevent unreachable handles (#9046)
for(this._animateOff=!0,this._refreshValue(),s=n-1;s>=0;s--)this._change(null,s);this._animateOff=!1;break;case"step":case"min":case"max":this._animateOff=!0,this._calculateNewMax(),this._refreshValue(),this._animateOff=!1;break;case"range":this._animateOff=!0,this._refresh(),this._animateOff=!1}},_setOptionDisabled:function(e){this._super(e),this._toggleClass(null,"ui-state-disabled",!!e)},
//internal value getter
// _value() returns value trimmed by min and max, aligned by step
_value:function(){var e=this.options.value;return e=this._trimAlignValue(e)},
//internal values getter
// _values() returns array of values trimmed by min and max, aligned by step
// _values( index ) returns single value trimmed by min and max, aligned by step
_values:function(e){var t,i,s;if(arguments.length)return t=this.options.values[e],t=this._trimAlignValue(t);if(this._hasMultipleValues()){for(
// .slice() creates a copy of the array
// this copy gets trimmed by min and max and then returned
i=this.options.values.slice(),s=0;s<i.length;s+=1)i[s]=this._trimAlignValue(i[s]);return i}return[]},
// Returns the step-aligned value that val is closest to, between (inclusive) min and max
_trimAlignValue:function(e){if(e<=this._valueMin())return this._valueMin();if(e>=this._valueMax())return this._valueMax();var t=this.options.step>0?this.options.step:1,i=(e-this._valueMin())%t,s=e-i;
// Since JavaScript has problems with large floats, round
// the final value to 5 digits after the decimal point (see #4124)
return 2*Math.abs(i)>=t&&(s+=i>0?t:-t),parseFloat(s.toFixed(5))},_calculateNewMax:function(){var e=this.options.max,t=this._valueMin(),i=this.options.step;e=Math.round((e-t)/i)*i+t,e>this.options.max&&(
//If max is not divisible by step, rounding off may increase its value
e-=i),this.max=parseFloat(e.toFixed(this._precision()))},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=e.toString(),i=t.indexOf(".");return-1===i?0:t.length-i-1},_valueMin:function(){return this.options.min},_valueMax:function(){return this.max},_refreshRange:function(e){"vertical"===e&&this.range.css({width:"",left:""}),"horizontal"===e&&this.range.css({height:"",bottom:""})},_refreshValue:function(){var t,i,s,n,a,o=this.options.range,r=this.options,l=this,h=!this._animateOff&&r.animate,c={};this._hasMultipleValues()?this.handles.each(function(s){i=(l.values(s)-l._valueMin())/(l._valueMax()-l._valueMin())*100,c["horizontal"===l.orientation?"left":"bottom"]=i+"%",e(this).stop(1,1)[h?"animate":"css"](c,r.animate),!0===l.options.range&&("horizontal"===l.orientation?(0===s&&l.range.stop(1,1)[h?"animate":"css"]({left:i+"%"},r.animate),1===s&&l.range[h?"animate":"css"]({width:i-t+"%"},{queue:!1,duration:r.animate})):(0===s&&l.range.stop(1,1)[h?"animate":"css"]({bottom:i+"%"},r.animate),1===s&&l.range[h?"animate":"css"]({height:i-t+"%"},{queue:!1,duration:r.animate}))),t=i}):(s=this.value(),n=this._valueMin(),a=this._valueMax(),i=a!==n?(s-n)/(a-n)*100:0,c["horizontal"===this.orientation?"left":"bottom"]=i+"%",this.handle.stop(1,1)[h?"animate":"css"](c,r.animate),"min"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({width:i+"%"},r.animate),"max"===o&&"horizontal"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({width:100-i+"%"},r.animate),"min"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({height:i+"%"},r.animate),"max"===o&&"vertical"===this.orientation&&this.range.stop(1,1)[h?"animate":"css"]({height:100-i+"%"},r.animate))},_handleEvents:{keydown:function(t){var i,s,n,a=e(t.target).data("ui-slider-handle-index");switch(t.keyCode){case e.ui.keyCode.HOME:case e.ui.keyCode.END:case e.ui.keyCode.PAGE_UP:case e.ui.keyCode.PAGE_DOWN:case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(t.preventDefault(),!this._keySliding&&(this._keySliding=!0,this._addClass(e(t.target),null,"ui-state-active"),!1===this._start(t,a)))return}switch(n=this.options.step,i=s=this._hasMultipleValues()?this.values(a):this.value(),t.keyCode){case e.ui.keyCode.HOME:s=this._valueMin();break;case e.ui.keyCode.END:s=this._valueMax();break;case e.ui.keyCode.PAGE_UP:s=this._trimAlignValue(i+(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.PAGE_DOWN:s=this._trimAlignValue(i-(this._valueMax()-this._valueMin())/this.numPages);break;case e.ui.keyCode.UP:case e.ui.keyCode.RIGHT:if(i===this._valueMax())return;s=this._trimAlignValue(i+n);break;case e.ui.keyCode.DOWN:case e.ui.keyCode.LEFT:if(i===this._valueMin())return;s=this._trimAlignValue(i-n)}this._slide(t,a,s)},keyup:function(t){var i=e(t.target).data("ui-slider-handle-index");this._keySliding&&(this._keySliding=!1,this._stop(t,i),this._change(t,i),this._removeClass(e(t.target),null,"ui-state-active"))}}}),e.widget("ui.sortable",e.ui.mouse,{version:"1.12.1",widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3,
// Callbacks
activate:null,beforeStop:null,change:null,deactivate:null,out:null,over:null,receive:null,remove:null,sort:null,start:null,stop:null,update:null},_isOverAxis:function(e,t,i){return e>=t&&e<t+i},_isFloating:function(e){return/left|right/.test(e.css("float"))||/inline|table-cell/.test(e.css("display"))},_create:function(){this.containerCache={},this._addClass("ui-sortable"),
//Get the items
this.refresh(),
//Let's determine the parent's offset
this.offset=this.element.offset(),
//Initialize mouse events for interaction
this._mouseInit(),this._setHandleClassName(),
//We're ready to go
this.ready=!0},_setOption:function(e,t){this._super(e,t),"handle"===e&&this._setHandleClassName()},_setHandleClassName:function(){var t=this;this._removeClass(this.element.find(".ui-sortable-handle"),"ui-sortable-handle"),e.each(this.items,function(){t._addClass(this.instance.options.handle?this.item.find(this.instance.options.handle):this.item,"ui-sortable-handle")})},_destroy:function(){this._mouseDestroy();for(var e=this.items.length-1;e>=0;e--)this.items[e].item.removeData(this.widgetName+"-item");return this},_mouseCapture:function(t,i){var s=null,n=!1,a=this;
//We have to refresh the items data once first
//Find out if the clicked node (or one of its parents) is a actual item in this.items
return!this.reverting&&(!this.options.disabled&&"static"!==this.options.type&&(this._refreshItems(t),e(t.target).parents().each(function(){if(e.data(this,a.widgetName+"-item")===a)return s=e(this),!1}),e.data(t.target,a.widgetName+"-item")===a&&(s=e(t.target)),!!s&&(!(this.options.handle&&!i&&(e(this.options.handle,s).find("*").addBack().each(function(){this===t.target&&(n=!0)}),!n))&&(this.currentItem=s,this._removeCurrentsFromItems(),!0))))},_mouseStart:function(t,i,s){var n,a,o=this.options;
//Post "activate" events to possible containers
if(this.currentContainer=this,
//We only need to call refreshPositions, because the refreshItems call has been moved to
// mouseCapture
this.refreshPositions(),
//Create and append the visible helper
this.helper=this._createHelper(t),
//Cache the helper size
this._cacheHelperProportions(),/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */
//Cache the margins of the original element
this._cacheMargins(),
//Get the next scrolling parent
this.scrollParent=this.helper.scrollParent(),
//The element's absolute position on the page minus margins
this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},e.extend(this.offset,{click:{//Where the click happened, relative to the element
left:t.pageX-this.offset.left,top:t.pageY-this.offset.top},parent:this._getParentOffset(),
// This is a relative to absolute position minus the actual position calculation -
// only used for relative positioned helper
relative:this._getRelativeOffset()}),
// Only after we got the offset, we can change the helper's position to absolute
// TODO: Still need to figure out a way to make relative sorting possible
this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),
//Generate the original position
this.originalPosition=this._generatePosition(t),this.originalPageX=t.pageX,this.originalPageY=t.pageY,
//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
o.cursorAt&&this._adjustOffsetFromHelper(o.cursorAt),
//Cache the former DOM position
this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},
// If the helper is not the original, hide the original so it's not playing any role during
// the drag, won't cause anything bad this way
this.helper[0]!==this.currentItem[0]&&this.currentItem.hide(),
//Create the placeholder
this._createPlaceholder(),
//Set a containment if given in the options
o.containment&&this._setContainment(),o.cursor&&"auto"!==o.cursor&&(// cursor option
a=this.document.find("body"),
// Support: IE
this.storedCursor=a.css("cursor"),a.css("cursor",o.cursor),this.storedStylesheet=e("<style>*{ cursor: "+o.cursor+" !important; }</style>").appendTo(a)),o.opacity&&(// opacity option
this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",o.opacity)),o.zIndex&&(// zIndex option
this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",o.zIndex)),
//Prepare scrolling
this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName&&(this.overflowOffset=this.scrollParent.offset()),
//Call callbacks
this._trigger("start",t,this._uiHash()),
//Recache the helper size
this._preserveHelperProportions||this._cacheHelperProportions(),!s)for(n=this.containers.length-1;n>=0;n--)this.containers[n]._trigger("activate",t,this._uiHash(this));
//Prepare possible droppables
// Execute the drag once - this causes the helper not to be visiblebefore getting its
// correct position
return e.ui.ddmanager&&(e.ui.ddmanager.current=this),e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t),this.dragging=!0,this._addClass(this.helper,"ui-sortable-helper"),this._mouseDrag(t),!0},_mouseDrag:function(t){var i,s,n,a,o=this.options,r=!1;
//Rearrange
for(
//Compute the helpers position
this.position=this._generatePosition(t),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs),
//Do scrolling
this.options.scroll&&(this.scrollParent[0]!==this.document[0]&&"HTML"!==this.scrollParent[0].tagName?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-t.pageY<o.scrollSensitivity?this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop+o.scrollSpeed:t.pageY-this.overflowOffset.top<o.scrollSensitivity&&(this.scrollParent[0].scrollTop=r=this.scrollParent[0].scrollTop-o.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-t.pageX<o.scrollSensitivity?this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft+o.scrollSpeed:t.pageX-this.overflowOffset.left<o.scrollSensitivity&&(this.scrollParent[0].scrollLeft=r=this.scrollParent[0].scrollLeft-o.scrollSpeed)):(t.pageY-this.document.scrollTop()<o.scrollSensitivity?r=this.document.scrollTop(this.document.scrollTop()-o.scrollSpeed):this.window.height()-(t.pageY-this.document.scrollTop())<o.scrollSensitivity&&(r=this.document.scrollTop(this.document.scrollTop()+o.scrollSpeed)),t.pageX-this.document.scrollLeft()<o.scrollSensitivity?r=this.document.scrollLeft(this.document.scrollLeft()-o.scrollSpeed):this.window.width()-(t.pageX-this.document.scrollLeft())<o.scrollSensitivity&&(r=this.document.scrollLeft(this.document.scrollLeft()+o.scrollSpeed))),!1!==r&&e.ui.ddmanager&&!o.dropBehaviour&&e.ui.ddmanager.prepareOffsets(this,t)),
//Regenerate the absolute position used for position checks
this.positionAbs=this._convertPositionTo("absolute"),
//Set the helper position
this.options.axis&&"y"===this.options.axis||(this.helper[0].style.left=this.position.left+"px"),this.options.axis&&"x"===this.options.axis||(this.helper[0].style.top=this.position.top+"px"),i=this.items.length-1;i>=0;i--)if(
//Cache variables and intersection, continue if no intersection
s=this.items[i],n=s.item[0],(a=this._intersectsWithPointer(s))&&s.instance===this.currentContainer&&!(n===this.currentItem[0]||this.placeholder[1===a?"next":"prev"]()[0]===n||e.contains(this.placeholder[0],n)||"semi-dynamic"===this.options.type&&e.contains(this.element[0],n))){if(this.direction=1===a?"down":"up","pointer"!==this.options.tolerance&&!this._intersectsWithSides(s))break;this._rearrange(t,s),this._trigger("change",t,this._uiHash());break}
//Post events to containers
//Interconnect with droppables
//Call callbacks
return this._contactContainers(t),e.ui.ddmanager&&e.ui.ddmanager.drag(this,t),this._trigger("sort",t,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(t,i){if(t){if(
//If we are using droppables, inform the manager about the drop
e.ui.ddmanager&&!this.options.dropBehaviour&&e.ui.ddmanager.drop(this,t),this.options.revert){var s=this,n=this.placeholder.offset(),a=this.options.axis,o={};a&&"x"!==a||(o.left=n.left-this.offset.parent.left-this.margins.left+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollLeft)),a&&"y"!==a||(o.top=n.top-this.offset.parent.top-this.margins.top+(this.offsetParent[0]===this.document[0].body?0:this.offsetParent[0].scrollTop)),this.reverting=!0,e(this.helper).animate(o,parseInt(this.options.revert,10)||500,function(){s._clear(t)})}else this._clear(t,i);return!1}},cancel:function(){if(this.dragging){this._mouseUp(new e.Event("mouseup",{target:null})),"original"===this.options.helper?(this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")):this.currentItem.show();
//Post deactivating events to containers
for(var t=this.containers.length-1;t>=0;t--)this.containers[t]._trigger("deactivate",null,this._uiHash(this)),this.containers[t].containerCache.over&&(this.containers[t]._trigger("out",null,this._uiHash(this)),this.containers[t].containerCache.over=0)}
//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
// it unbinds ALL events from the original node!
return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),"original"!==this.options.helper&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),e.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?e(this.domPosition.prev).after(this.currentItem):e(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},e(i).each(function(){var i=(e(t.item||this).attr(t.attribute||"id")||"").match(t.expression||/(.+)[\-=_](.+)/);i&&s.push((t.key||i[1]+"[]")+"="+(t.key&&t.expression?i[1]:i[2]))}),!s.length&&t.key&&s.push(t.key+"="),s.join("&")},toArray:function(t){var i=this._getItemsAsjQuery(t&&t.connected),s=[];return t=t||{},i.each(function(){s.push(e(t.item||this).attr(t.attribute||"id")||"")}),s},/* Be careful with the following core functions */
_intersectsWith:function(e){var t=this.positionAbs.left,i=t+this.helperProportions.width,s=this.positionAbs.top,n=s+this.helperProportions.height,a=e.left,o=a+e.width,r=e.top,l=r+e.height,h=this.offset.click.top,c=this.offset.click.left,u="x"===this.options.axis||s+h>r&&s+h<l,d="y"===this.options.axis||t+c>a&&t+c<o,p=u&&d;// Right Half
// Left Half
// Bottom Half
return"pointer"===this.options.tolerance||this.options.forcePointerForContainers||"pointer"!==this.options.tolerance&&this.helperProportions[this.floating?"width":"height"]>e[this.floating?"width":"height"]?p:a<t+this.helperProportions.width/2&&i-this.helperProportions.width/2<o&&r<s+this.helperProportions.height/2&&n-this.helperProportions.height/2<l},_intersectsWithPointer:function(e){var t,i,s="x"===this.options.axis||this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top,e.height),n="y"===this.options.axis||this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left,e.width);return!(!s||!n)&&(t=this._getDragVerticalDirection(),i=this._getDragHorizontalDirection(),this.floating?"right"===i||"down"===t?2:1:t&&("down"===t?2:1))},_intersectsWithSides:function(e){var t=this._isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+e.height/2,e.height),i=this._isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+e.width/2,e.width),s=this._getDragVerticalDirection(),n=this._getDragHorizontalDirection();return this.floating&&n?"right"===n&&i||"left"===n&&!i:s&&("down"===s&&t||"up"===s&&!t)},_getDragVerticalDirection:function(){var e=this.positionAbs.top-this.lastPositionAbs.top;return 0!==e&&(e>0?"down":"up")},_getDragHorizontalDirection:function(){var e=this.positionAbs.left-this.lastPositionAbs.left;return 0!==e&&(e>0?"right":"left")},refresh:function(e){return this._refreshItems(e),this._setHandleClassName(),this.refreshPositions(),this},_connectWith:function(){var e=this.options;return e.connectWith.constructor===String?[e.connectWith]:e.connectWith},_getItemsAsjQuery:function(t){function i(){r.push(this)}var s,n,a,o,r=[],l=[],h=this._connectWith();if(h&&t)for(s=h.length-1;s>=0;s--)for(a=e(h[s],this.document[0]),n=a.length-1;n>=0;n--)(o=e.data(a[n],this.widgetFullName))&&o!==this&&!o.options.disabled&&l.push([e.isFunction(o.options.items)?o.options.items.call(o.element):e(o.options.items,o.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),o]);for(l.push([e.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):e(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]),s=l.length-1;s>=0;s--)l[s][0].each(i);return e(r)},_removeCurrentsFromItems:function(){var t=this.currentItem.find(":data("+this.widgetName+"-item)");this.items=e.grep(this.items,function(e){for(var i=0;i<t.length;i++)if(t[i]===e.item[0])return!1;return!0})},_refreshItems:function(t){this.items=[],this.containers=[this];var i,s,n,a,o,r,l,h,c=this.items,u=[[e.isFunction(this.options.items)?this.options.items.call(this.element[0],t,{item:this.currentItem}):e(this.options.items,this.element),this]],d=this._connectWith();
//Shouldn't be run the first time through due to massive slow-down
if(d&&this.ready)for(i=d.length-1;i>=0;i--)for(n=e(d[i],this.document[0]),s=n.length-1;s>=0;s--)(a=e.data(n[s],this.widgetFullName))&&a!==this&&!a.options.disabled&&(u.push([e.isFunction(a.options.items)?a.options.items.call(a.element[0],t,{item:this.currentItem}):e(a.options.items,a.element),a]),this.containers.push(a));for(i=u.length-1;i>=0;i--)for(o=u[i][1],r=u[i][0],s=0,h=r.length;s<h;s++)l=e(r[s]),
// Data for target checking (mouse manager)
l.data(this.widgetName+"-item",o),c.push({item:l,instance:o,width:0,height:0,left:0,top:0})},refreshPositions:function(t){
// Determine whether items are being displayed horizontally
this.floating=!!this.items.length&&("x"===this.options.axis||this._isFloating(this.items[0].item)),
//This has to be redone because due to the item being moved out/into the offsetParent,
// the offsetParent's position will change
this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());var i,s,n,a;for(i=this.items.length-1;i>=0;i--)s=this.items[i],
//We ignore calculating positions of all connected containers when we're not over them
s.instance!==this.currentContainer&&this.currentContainer&&s.item[0]!==this.currentItem[0]||(n=this.options.toleranceElement?e(this.options.toleranceElement,s.item):s.item,t||(s.width=n.outerWidth(),s.height=n.outerHeight()),a=n.offset(),s.left=a.left,s.top=a.top);if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(i=this.containers.length-1;i>=0;i--)a=this.containers[i].element.offset(),this.containers[i].containerCache.left=a.left,this.containers[i].containerCache.top=a.top,this.containers[i].containerCache.width=this.containers[i].element.outerWidth(),this.containers[i].containerCache.height=this.containers[i].element.outerHeight();return this},_createPlaceholder:function(t){t=t||this;var i,s=t.options;s.placeholder&&s.placeholder.constructor!==String||(i=s.placeholder,s.placeholder={element:function(){var s=t.currentItem[0].nodeName.toLowerCase(),n=e("<"+s+">",t.document[0]);return t._addClass(n,"ui-sortable-placeholder",i||t.currentItem[0].className)._removeClass(n,"ui-sortable-helper"),"tbody"===s?t._createTrPlaceholder(t.currentItem.find("tr").eq(0),e("<tr>",t.document[0]).appendTo(n)):"tr"===s?t._createTrPlaceholder(t.currentItem,n):"img"===s&&n.attr("src",t.currentItem.attr("src")),i||n.css("visibility","hidden"),n},update:function(e,n){
// 1. If a className is set as 'placeholder option, we don't force sizes -
// the class is responsible for that
// 2. The option 'forcePlaceholderSize can be enabled to force it even if a
// class name is specified
i&&!s.forcePlaceholderSize||(
//If the element doesn't have a actual height by itself (without styles coming
// from a stylesheet), it receives the inline height from the dragged item
n.height()||n.height(t.currentItem.innerHeight()-parseInt(t.currentItem.css("paddingTop")||0,10)-parseInt(t.currentItem.css("paddingBottom")||0,10)),n.width()||n.width(t.currentItem.innerWidth()-parseInt(t.currentItem.css("paddingLeft")||0,10)-parseInt(t.currentItem.css("paddingRight")||0,10)))}}),
//Create the placeholder
t.placeholder=e(s.placeholder.element.call(t.element,t.currentItem)),
//Append it after the actual current item
t.currentItem.after(t.placeholder),
//Update the size of the placeholder (TODO: Logic to fuzzy, see line 316/317)
s.placeholder.update(t,t.placeholder)},_createTrPlaceholder:function(t,i){var s=this;t.children().each(function(){e("<td>&#160;</td>",s.document[0]).attr("colspan",e(this).attr("colspan")||1).appendTo(i)})},_contactContainers:function(t){var i,s,n,a,o,r,l,h,c,u,d=null,p=null;
// Get innermost container that intersects with item
for(i=this.containers.length-1;i>=0;i--)
// Never consider a container that's located within the item itself
if(!e.contains(this.currentItem[0],this.containers[i].element[0]))if(this._intersectsWith(this.containers[i].containerCache)){
// If we've already found a container and it's more "inner" than this, then continue
if(d&&e.contains(this.containers[i].element[0],d.element[0]))continue;d=this.containers[i],p=i}else
// container doesn't intersect. trigger "out" event if necessary
this.containers[i].containerCache.over&&(this.containers[i]._trigger("out",t,this._uiHash(this)),this.containers[i].containerCache.over=0);
// If no intersecting containers found, return
if(d)
// Move the item into the container if it's not there already
if(1===this.containers.length)this.containers[p].containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1);else{for(
// When entering a new container, we will find the item with the least distance and
// append our item near it
n=1e4,a=null,c=d.floating||this._isFloating(this.currentItem),o=c?"left":"top",r=c?"width":"height",u=c?"pageX":"pageY",s=this.items.length-1;s>=0;s--)e.contains(this.containers[p].element[0],this.items[s].item[0])&&this.items[s].item[0]!==this.currentItem[0]&&(l=this.items[s].item.offset()[o],h=!1,t[u]-l>this.items[s][r]/2&&(h=!0),Math.abs(t[u]-l)<n&&(n=Math.abs(t[u]-l),a=this.items[s],this.direction=h?"up":"down"));
//Check if dropOnEmpty is enabled
if(!a&&!this.options.dropOnEmpty)return;if(this.currentContainer===this.containers[p])return void(this.currentContainer.containerCache.over||(this.containers[p]._trigger("over",t,this._uiHash()),this.currentContainer.containerCache.over=1));a?this._rearrange(t,a,null,!0):this._rearrange(t,null,this.containers[p].element,!0),this._trigger("change",t,this._uiHash()),this.containers[p]._trigger("change",t,this._uiHash(this)),this.currentContainer=this.containers[p],
//Update the placeholder
this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[p]._trigger("over",t,this._uiHash(this)),this.containers[p].containerCache.over=1}},_createHelper:function(t){var i=this.options,s=e.isFunction(i.helper)?e(i.helper.apply(this.element[0],[t,this.currentItem])):"clone"===i.helper?this.currentItem.clone():this.currentItem;
//Add the helper to the DOM if that didn't happen already
return s.parents("body").length||e("parent"!==i.appendTo?i.appendTo:this.currentItem[0].parentNode)[0].appendChild(s[0]),s[0]===this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),s[0].style.width&&!i.forceHelperSize||s.width(this.currentItem.width()),s[0].style.height&&!i.forceHelperSize||s.height(this.currentItem.height()),s},_adjustOffsetFromHelper:function(t){"string"==typeof t&&(t=t.split(" ")),e.isArray(t)&&(t={left:+t[0],top:+t[1]||0}),"left"in t&&(this.offset.click.left=t.left+this.margins.left),"right"in t&&(this.offset.click.left=this.helperProportions.width-t.right+this.margins.left),"top"in t&&(this.offset.click.top=t.top+this.margins.top),"bottom"in t&&(this.offset.click.top=this.helperProportions.height-t.bottom+this.margins.top)},_getParentOffset:function(){
//Get the offsetParent and cache its position
this.offsetParent=this.helper.offsetParent();var t=this.offsetParent.offset();
// This is a special case where we need to modify a offset calculated on start, since the
// following happened:
// 1. The position of the helper is absolute, so it's position is calculated based on the
// next positioned parent
// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't
// the document, which means that the scroll is included in the initial calculation of the
// offset of the parent, and never recalculated upon drag
// This needs to be actually done for all browsers, since pageX/pageY includes this
// information with an ugly IE fix
return"absolute"===this.cssPosition&&this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])&&(t.left+=this.scrollParent.scrollLeft(),t.top+=this.scrollParent.scrollTop()),(this.offsetParent[0]===this.document[0].body||this.offsetParent[0].tagName&&"html"===this.offsetParent[0].tagName.toLowerCase()&&e.ui.ie)&&(t={top:0,left:0}),{top:t.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:t.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if("relative"===this.cssPosition){var e=this.currentItem.position();return{top:e.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:e.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var t,i,s,n=this.options;"parent"===n.containment&&(n.containment=this.helper[0].parentNode),"document"!==n.containment&&"window"!==n.containment||(this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,"document"===n.containment?this.document.width():this.window.width()-this.helperProportions.width-this.margins.left,("document"===n.containment?this.document.height()||document.body.parentNode.scrollHeight:this.window.height()||this.document[0].body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]),/^(document|window|parent)$/.test(n.containment)||(t=e(n.containment)[0],i=e(n.containment).offset(),s="hidden"!==e(t).css("overflow"),this.containment=[i.left+(parseInt(e(t).css("borderLeftWidth"),10)||0)+(parseInt(e(t).css("paddingLeft"),10)||0)-this.margins.left,i.top+(parseInt(e(t).css("borderTopWidth"),10)||0)+(parseInt(e(t).css("paddingTop"),10)||0)-this.margins.top,i.left+(s?Math.max(t.scrollWidth,t.offsetWidth):t.offsetWidth)-(parseInt(e(t).css("borderLeftWidth"),10)||0)-(parseInt(e(t).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,i.top+(s?Math.max(t.scrollHeight,t.offsetHeight):t.offsetHeight)-(parseInt(e(t).css("borderTopWidth"),10)||0)-(parseInt(e(t).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top])},_convertPositionTo:function(t,i){i||(i=this.position);var s="absolute"===t?1:-1,n="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,a=/(html|body)/i.test(n[0].tagName);return{top:
// The absolute mouse position
i.top+
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.top*s+
// The offsetParent's offset without borders (offset + border)
this.offset.parent.top*s-("fixed"===this.cssPosition?-this.scrollParent.scrollTop():a?0:n.scrollTop())*s,left:
// The absolute mouse position
i.left+
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.left*s+
// The offsetParent's offset without borders (offset + border)
this.offset.parent.left*s-("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():a?0:n.scrollLeft())*s}},_generatePosition:function(t){var i,s,n=this.options,a=t.pageX,o=t.pageY,r="absolute"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&e.contains(this.scrollParent[0],this.offsetParent[0])?this.scrollParent:this.offsetParent,l=/(html|body)/i.test(r[0].tagName);
// This is another very weird special case that only happens for relative elements:
// 1. If the css position is relative
// 2. and the scroll parent is the document or similar to the offset parent
// we have to refresh the relative offset during the scroll so there are no jumps
/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */
//If we are not dragging yet, we won't check for options
return"relative"!==this.cssPosition||this.scrollParent[0]!==this.document[0]&&this.scrollParent[0]!==this.offsetParent[0]||(this.offset.relative=this._getRelativeOffset()),this.originalPosition&&(this.containment&&(t.pageX-this.offset.click.left<this.containment[0]&&(a=this.containment[0]+this.offset.click.left),t.pageY-this.offset.click.top<this.containment[1]&&(o=this.containment[1]+this.offset.click.top),t.pageX-this.offset.click.left>this.containment[2]&&(a=this.containment[2]+this.offset.click.left),t.pageY-this.offset.click.top>this.containment[3]&&(o=this.containment[3]+this.offset.click.top)),n.grid&&(i=this.originalPageY+Math.round((o-this.originalPageY)/n.grid[1])*n.grid[1],o=this.containment?i-this.offset.click.top>=this.containment[1]&&i-this.offset.click.top<=this.containment[3]?i:i-this.offset.click.top>=this.containment[1]?i-n.grid[1]:i+n.grid[1]:i,s=this.originalPageX+Math.round((a-this.originalPageX)/n.grid[0])*n.grid[0],a=this.containment?s-this.offset.click.left>=this.containment[0]&&s-this.offset.click.left<=this.containment[2]?s:s-this.offset.click.left>=this.containment[0]?s-n.grid[0]:s+n.grid[0]:s)),{top:
// The absolute mouse position
o-
// Click offset (relative to the element)
this.offset.click.top-
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.top-
// The offsetParent's offset without borders (offset + border)
this.offset.parent.top+("fixed"===this.cssPosition?-this.scrollParent.scrollTop():l?0:r.scrollTop()),left:
// The absolute mouse position
a-
// Click offset (relative to the element)
this.offset.click.left-
// Only for relative positioned nodes: Relative offset from element to offset parent
this.offset.relative.left-
// The offsetParent's offset without borders (offset + border)
this.offset.parent.left+("fixed"===this.cssPosition?-this.scrollParent.scrollLeft():l?0:r.scrollLeft())}},_rearrange:function(e,t,i,s){i?i[0].appendChild(this.placeholder[0]):t.item[0].parentNode.insertBefore(this.placeholder[0],"down"===this.direction?t.item[0]:t.item[0].nextSibling),
//Various things done here to improve the performance:
// 1. we create a setTimeout, that calls refreshPositions
// 2. on the instance, we have a counter variable, that get's higher after every append
// 3. on the local scope, we copy the counter variable, and check in the timeout,
// if it's still the same
// 4. this lets only the last addition to the timeout stack through
this.counter=this.counter?++this.counter:1;var n=this.counter;this._delay(function(){n===this.counter&&
//Precompute after each DOM insertion, NOT on mousemove
this.refreshPositions(!s)})},_clear:function(e,t){
//Post events to containers
function i(e,t,i){return function(s){i._trigger(e,s,t._uiHash(t))}}this.reverting=!1;
// We delay all events that have to be triggered to after the point where the placeholder
// has been removed and everything else normalized again
var s,n=[];if(
// We first have to update the dom position of the actual currentItem
// Note: don't do it if the current item is already removed (by a user), or it gets
// reappended (see #4088)
!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null,this.helper[0]===this.currentItem[0]){for(s in this._storedCSS)"auto"!==this._storedCSS[s]&&"static"!==this._storedCSS[s]||(this._storedCSS[s]="");this.currentItem.css(this._storedCSS),this._removeClass(this.currentItem,"ui-sortable-helper")}else this.currentItem.show();for(this.fromOutside&&!t&&n.push(function(e){this._trigger("receive",e,this._uiHash(this.fromOutside))}),!this.fromOutside&&this.domPosition.prev===this.currentItem.prev().not(".ui-sortable-helper")[0]&&this.domPosition.parent===this.currentItem.parent()[0]||t||
// Trigger update callback if the DOM position has changed
n.push(function(e){this._trigger("update",e,this._uiHash())}),
// Check if the items Container has Changed and trigger appropriate
// events.
this!==this.currentContainer&&(t||(n.push(function(e){this._trigger("remove",e,this._uiHash())}),n.push(function(e){return function(t){e._trigger("receive",t,this._uiHash(this))}}.call(this,this.currentContainer)),n.push(function(e){return function(t){e._trigger("update",t,this._uiHash(this))}}.call(this,this.currentContainer)))),s=this.containers.length-1;s>=0;s--)t||n.push(i("deactivate",this,this.containers[s])),this.containers[s].containerCache.over&&(n.push(i("out",this,this.containers[s])),this.containers[s].containerCache.over=0);if(
//Do what was originally in plugins
this.storedCursor&&(this.document.find("body").css("cursor",this.storedCursor),this.storedStylesheet.remove()),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex","auto"===this._storedZIndex?"":this._storedZIndex),this.dragging=!1,t||this._trigger("beforeStop",e,this._uiHash()),
//$(this.placeholder[0]).remove(); would have been the jQuery way - unfortunately,
// it unbinds ALL events from the original node!
this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.cancelHelperRemoval||(this.helper[0]!==this.currentItem[0]&&this.helper.remove(),this.helper=null),!t){for(s=0;s<n.length;s++)
// Trigger all delayed events
n[s].call(this,e);this._trigger("stop",e,this._uiHash())}return this.fromOutside=!1,!this.cancelHelperRemoval},_trigger:function(){!1===e.Widget.prototype._trigger.apply(this,arguments)&&this.cancel()},_uiHash:function(t){var i=t||this;return{helper:i.helper,placeholder:i.placeholder||e([]),position:i.position,originalPosition:i.originalPosition,offset:i.positionAbs,item:i.currentItem,sender:t?t.element:null}}});e.widget("ui.spinner",{version:"1.12.1",defaultElement:"<input>",widgetEventPrefix:"spin",options:{classes:{"ui-spinner":"ui-corner-all","ui-spinner-down":"ui-corner-br","ui-spinner-up":"ui-corner-tr"},culture:null,icons:{down:"ui-icon-triangle-1-s",up:"ui-icon-triangle-1-n"},incremental:!0,max:null,min:null,numberFormat:null,page:10,step:1,change:null,spin:null,start:null,stop:null},_create:function(){
// handle string values that need to be parsed
this._setOption("max",this.options.max),this._setOption("min",this.options.min),this._setOption("step",this.options.step),
// Only format if there is a value, prevents the field from being marked
// as invalid in Firefox, see #9573.
""!==this.value()&&
// Format the value, but don't constrain.
this._value(this.element.val(),!0),this._draw(),this._on(this._events),this._refresh(),
// Turning off autocomplete prevents the browser from remembering the
// value when navigating through history, so we re-enable autocomplete
// if the page is unloaded before the widget is destroyed. #7790
this._on(this.window,{beforeunload:function(){this.element.removeAttr("autocomplete")}})},_getCreateOptions:function(){var t=this._super(),i=this.element;return e.each(["min","max","step"],function(e,s){var n=i.attr(s);null!=n&&n.length&&(t[s]=n)}),t},_events:{keydown:function(e){this._start(e)&&this._keydown(e)&&e.preventDefault()},keyup:"_stop",focus:function(){this.previous=this.element.val()},blur:function(e){if(this.cancelBlur)return void delete this.cancelBlur;this._stop(),this._refresh(),this.previous!==this.element.val()&&this._trigger("change",e)},mousewheel:function(e,t){if(t){if(!this.spinning&&!this._start(e))return!1;this._spin((t>0?1:-1)*this.options.step,e),clearTimeout(this.mousewheelTimer),this.mousewheelTimer=this._delay(function(){this.spinning&&this._stop(e)},100),e.preventDefault()}},"mousedown .ui-spinner-button":function(t){function i(){this.element[0]===e.ui.safeActiveElement(this.document[0])||(this.element.trigger("focus"),this.previous=s,
// support: IE
// IE sets focus asynchronously, so we need to check if focus
// moved off of the input because the user clicked on the button.
this._delay(function(){this.previous=s}))}var s;
// We never want the buttons to have focus; whenever the user is
// interacting with the spinner, the focus should be on the input.
// If the input is focused then this.previous is properly set from
// when the input first received focus. If the input is not focused
// then we need to set this.previous based on the value before spinning.
s=this.element[0]===e.ui.safeActiveElement(this.document[0])?this.previous:this.element.val(),
// Ensure focus is on (or stays on) the text field
t.preventDefault(),i.call(this),
// Support: IE
// IE doesn't prevent moving focus even with event.preventDefault()
// so we set a flag to know when we should ignore the blur event
// and check (again) if focus moved off of the input.
this.cancelBlur=!0,this._delay(function(){delete this.cancelBlur,i.call(this)}),!1!==this._start(t)&&this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},"mouseup .ui-spinner-button":"_stop","mouseenter .ui-spinner-button":function(t){
// button will add ui-state-active if mouse was down while mouseleave and kept down
if(e(t.currentTarget).hasClass("ui-state-active"))return!1!==this._start(t)&&void this._repeat(null,e(t.currentTarget).hasClass("ui-spinner-up")?1:-1,t)},
// TODO: do we really want to consider this a stop?
// shouldn't we just stop the repeater and wait until mouseup before
// we trigger the stop event?
"mouseleave .ui-spinner-button":"_stop"},
// Support mobile enhanced option and make backcompat more sane
_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap("<span>").parent().append("<a></a><a></a>")},_draw:function(){this._enhance(),this._addClass(this.uiSpinner,"ui-spinner","ui-widget ui-widget-content"),this._addClass("ui-spinner-input"),this.element.attr("role","spinbutton"),
// Button bindings
this.buttons=this.uiSpinner.children("a").attr("tabIndex",-1).attr("aria-hidden",!0).button({classes:{"ui-button":""}}),
// TODO: Right now button does not support classes this is already updated in button PR
this._removeClass(this.buttons,"ui-corner-all"),this._addClass(this.buttons.first(),"ui-spinner-button ui-spinner-up"),this._addClass(this.buttons.last(),"ui-spinner-button ui-spinner-down"),this.buttons.first().button({icon:this.options.icons.up,showLabel:!1}),this.buttons.last().button({icon:this.options.icons.down,showLabel:!1}),
// IE 6 doesn't understand height: 50% for the buttons
// unless the wrapper has an explicit height
this.buttons.height()>Math.ceil(.5*this.uiSpinner.height())&&this.uiSpinner.height()>0&&this.uiSpinner.height(this.uiSpinner.height())},_keydown:function(t){var i=this.options,s=e.ui.keyCode;switch(t.keyCode){case s.UP:return this._repeat(null,1,t),!0;case s.DOWN:return this._repeat(null,-1,t),!0;case s.PAGE_UP:return this._repeat(null,i.page,t),!0;case s.PAGE_DOWN:return this._repeat(null,-i.page,t),!0}return!1},_start:function(e){return!(!this.spinning&&!1===this._trigger("start",e))&&(this.counter||(this.counter=1),this.spinning=!0,!0)},_repeat:function(e,t,i){e=e||500,clearTimeout(this.timer),this.timer=this._delay(function(){this._repeat(40,t,i)},e),this._spin(t*this.options.step,i)},_spin:function(e,t){var i=this.value()||0;this.counter||(this.counter=1),i=this._adjustValue(i+e*this._increment(this.counter)),this.spinning&&!1===this._trigger("spin",t,{value:i})||(this._value(i),this.counter++)},_increment:function(t){var i=this.options.incremental;return i?e.isFunction(i)?i(t):Math.floor(t*t*t/5e4-t*t/500+17*t/200+1):1},_precision:function(){var e=this._precisionOf(this.options.step);return null!==this.options.min&&(e=Math.max(e,this._precisionOf(this.options.min))),e},_precisionOf:function(e){var t=e.toString(),i=t.indexOf(".");return-1===i?0:t.length-i-1},_adjustValue:function(e){var t,i,s=this.options;
// Clamp the value
// Make sure we're at a valid step
// - find out where we are relative to the base (min or 0)
// - round to the nearest step
// - rounding is based on 0, so adjust back to our base
// Fix precision from bad JS floating point math
// Clamp the value
return t=null!==s.min?s.min:0,i=e-t,i=Math.round(i/s.step)*s.step,e=t+i,e=parseFloat(e.toFixed(this._precision())),null!==s.max&&e>s.max?s.max:null!==s.min&&e<s.min?s.min:e},_stop:function(e){this.spinning&&(clearTimeout(this.timer),clearTimeout(this.mousewheelTimer),this.counter=0,this.spinning=!1,this._trigger("stop",e))},_setOption:function(e,t){var i,s,n;if("culture"===e||"numberFormat"===e)return i=this._parse(this.element.val()),this.options[e]=t,void this.element.val(this._format(i));"max"!==e&&"min"!==e&&"step"!==e||"string"==typeof t&&(t=this._parse(t)),"icons"===e&&(s=this.buttons.first().find(".ui-icon"),this._removeClass(s,null,this.options.icons.up),this._addClass(s,null,t.up),n=this.buttons.last().find(".ui-icon"),this._removeClass(n,null,this.options.icons.down),this._addClass(n,null,t.down)),this._super(e,t)},_setOptionDisabled:function(e){this._super(e),this._toggleClass(this.uiSpinner,null,"ui-state-disabled",!!e),this.element.prop("disabled",!!e),this.buttons.button(e?"disable":"enable")},_setOptions:r(function(e){this._super(e)}),_parse:function(e){return"string"==typeof e&&""!==e&&(e=window.Globalize&&this.options.numberFormat?Globalize.parseFloat(e,10,this.options.culture):+e),""===e||isNaN(e)?null:e},_format:function(e){return""===e?"":window.Globalize&&this.options.numberFormat?Globalize.format(e,this.options.numberFormat,this.options.culture):e},_refresh:function(){this.element.attr({"aria-valuemin":this.options.min,"aria-valuemax":this.options.max,
// TODO: what should we do with values that can't be parsed?
"aria-valuenow":this._parse(this.element.val())})},isValid:function(){var e=this.value();
// Null is invalid
// Null is invalid
return null!==e&&e===this._adjustValue(e)},
// Update the value without triggering change
_value:function(e,t){var i;""!==e&&null!==(i=this._parse(e))&&(t||(i=this._adjustValue(i)),e=this._format(i)),this.element.val(e),this._refresh()},_destroy:function(){this.element.prop("disabled",!1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow"),this.uiSpinner.replaceWith(this.element)},stepUp:r(function(e){this._stepUp(e)}),_stepUp:function(e){this._start()&&(this._spin((e||1)*this.options.step),this._stop())},stepDown:r(function(e){this._stepDown(e)}),_stepDown:function(e){this._start()&&(this._spin((e||1)*-this.options.step),this._stop())},pageUp:r(function(e){this._stepUp((e||1)*this.options.page)}),pageDown:r(function(e){this._stepDown((e||1)*this.options.page)}),value:function(e){if(!arguments.length)return this._parse(this.element.val());r(this._value).call(this,e)},widget:function(){return this.uiSpinner}}),
// DEPRECATED
// TODO: switch return back to widget declaration at top of file when this is removed
!1!==e.uiBackCompat&&
// Backcompat for spinner html extension points
e.widget("ui.spinner",e.ui.spinner,{_enhance:function(){this.uiSpinner=this.element.attr("autocomplete","off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())},_uiSpinnerHtml:function(){return"<span>"},_buttonHtml:function(){return"<a></a><a></a>"}});e.ui.spinner;/*!
 * jQuery UI Tabs 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Tabs
//>>group: Widgets
//>>description: Transforms a set of container elements into a tab structure.
//>>docs: http://api.jqueryui.com/tabs/
//>>demos: http://jqueryui.com/tabs/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/tabs.css
//>>css.theme: ../../themes/base/theme.css
e.widget("ui.tabs",{version:"1.12.1",delay:300,options:{active:null,classes:{"ui-tabs":"ui-corner-all","ui-tabs-nav":"ui-corner-all","ui-tabs-panel":"ui-corner-bottom","ui-tabs-tab":"ui-corner-top"},collapsible:!1,event:"click",heightStyle:"content",hide:null,show:null,
// Callbacks
activate:null,beforeActivate:null,beforeLoad:null,load:null},_isLocal:function(){var e=/#.*$/;return function(t){var i,s;i=t.href.replace(e,""),s=location.href.replace(e,"");
// Decoding may throw an error if the URL isn't UTF-8 (#9518)
try{i=decodeURIComponent(i)}catch(e){}try{s=decodeURIComponent(s)}catch(e){}return t.hash.length>1&&i===s}}(),_create:function(){var t=this,i=this.options;this.running=!1,this._addClass("ui-tabs","ui-widget ui-widget-content"),this._toggleClass("ui-tabs-collapsible",null,i.collapsible),this._processTabs(),i.active=this._initialActive(),
// Take disabling tabs via class attribute from HTML
// into account and update option properly.
e.isArray(i.disabled)&&(i.disabled=e.unique(i.disabled.concat(e.map(this.tabs.filter(".ui-state-disabled"),function(e){return t.tabs.index(e)}))).sort()),
// Check for length avoids error when initializing empty list
!1!==this.options.active&&this.anchors.length?this.active=this._findActive(i.active):this.active=e(),this._refresh(),this.active.length&&this.load(i.active)},_initialActive:function(){var t=this.options.active,i=this.options.collapsible,s=location.hash.substring(1);
// check the fragment identifier in the URL
// Check for a tab marked active via a class
// No active tab, set to false
// Handle numbers: negative, out of range
// Don't allow collapsible: false and active: false
return null===t&&(s&&this.tabs.each(function(i,n){if(e(n).attr("aria-controls")===s)return t=i,!1}),null===t&&(t=this.tabs.index(this.tabs.filter(".ui-tabs-active"))),null!==t&&-1!==t||(t=!!this.tabs.length&&0)),!1!==t&&-1===(t=this.tabs.index(this.tabs.eq(t)))&&(t=!i&&0),!i&&!1===t&&this.anchors.length&&(t=0),t},_getCreateEventData:function(){return{tab:this.active,panel:this.active.length?this._getPanelForTab(this.active):e()}},_tabKeydown:function(t){var i=e(e.ui.safeActiveElement(this.document[0])).closest("li"),s=this.tabs.index(i),n=!0;if(!this._handlePageNav(t)){switch(t.keyCode){case e.ui.keyCode.RIGHT:case e.ui.keyCode.DOWN:s++;break;case e.ui.keyCode.UP:case e.ui.keyCode.LEFT:n=!1,s--;break;case e.ui.keyCode.END:s=this.anchors.length-1;break;case e.ui.keyCode.HOME:s=0;break;case e.ui.keyCode.SPACE:
// Activate only, no collapsing
return t.preventDefault(),clearTimeout(this.activating),void this._activate(s);case e.ui.keyCode.ENTER:
// Toggle (cancel delayed activation, allow collapsing)
// Determine if we should collapse or activate
return t.preventDefault(),clearTimeout(this.activating),void this._activate(s!==this.options.active&&s);default:return}
// Focus the appropriate tab, based on which key was pressed
t.preventDefault(),clearTimeout(this.activating),s=this._focusNextTab(s,n),
// Navigating with control/command key will prevent automatic activation
t.ctrlKey||t.metaKey||(
// Update aria-selected immediately so that AT think the tab is already selected.
// Otherwise AT may confuse the user by stating that they need to activate the tab,
// but the tab will already be activated by the time the announcement finishes.
i.attr("aria-selected","false"),this.tabs.eq(s).attr("aria-selected","true"),this.activating=this._delay(function(){this.option("active",s)},this.delay))}},_panelKeydown:function(t){this._handlePageNav(t)||
// Ctrl+up moves focus to the current tab
t.ctrlKey&&t.keyCode===e.ui.keyCode.UP&&(t.preventDefault(),this.active.trigger("focus"))},
// Alt+page up/down moves focus to the previous/next tab (and activates)
_handlePageNav:function(t){return t.altKey&&t.keyCode===e.ui.keyCode.PAGE_UP?(this._activate(this._focusNextTab(this.options.active-1,!1)),!0):t.altKey&&t.keyCode===e.ui.keyCode.PAGE_DOWN?(this._activate(this._focusNextTab(this.options.active+1,!0)),!0):void 0},_findNextTab:function(t,i){for(var s=this.tabs.length-1;-1!==e.inArray(function(){return t>s&&(t=0),t<0&&(t=s),t}(),this.options.disabled);)t=i?t+1:t-1;return t},_focusNextTab:function(e,t){return e=this._findNextTab(e,t),this.tabs.eq(e).trigger("focus"),e},_setOption:function(e,t){if("active"===e)
// _activate() will handle invalid values and update this.options
return void this._activate(t);this._super(e,t),"collapsible"===e&&(this._toggleClass("ui-tabs-collapsible",null,t),
// Setting collapsible: false while collapsed; open first panel
t||!1!==this.options.active||this._activate(0)),"event"===e&&this._setupEvents(t),"heightStyle"===e&&this._setupHeightStyle(t)},_sanitizeSelector:function(e){return e?e.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g,"\\$&"):""},refresh:function(){var t=this.options,i=this.tablist.children(":has(a[href])");
// Get disabled tabs from class attribute from HTML
// this will get converted to a boolean if needed in _refresh()
t.disabled=e.map(i.filter(".ui-state-disabled"),function(e){return i.index(e)}),this._processTabs(),
// Was collapsed or no tabs
!1!==t.active&&this.anchors.length?this.active.length&&!e.contains(this.tablist[0],this.active[0])?
// all remaining tabs are disabled
this.tabs.length===t.disabled.length?(t.active=!1,this.active=e()):this._activate(this._findNextTab(Math.max(0,t.active-1),!1)):
// make sure active index is correct
t.active=this.tabs.index(this.active):(t.active=!1,this.active=e()),this._refresh()},_refresh:function(){this._setOptionDisabled(this.options.disabled),this._setupEvents(this.options.event),this._setupHeightStyle(this.options.heightStyle),this.tabs.not(this.active).attr({"aria-selected":"false","aria-expanded":"false",tabIndex:-1}),this.panels.not(this._getPanelForTab(this.active)).hide().attr({"aria-hidden":"true"}),
// Make sure one tab is in the tab order
this.active.length?(this.active.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0}),this._addClass(this.active,"ui-tabs-active","ui-state-active"),this._getPanelForTab(this.active).show().attr({"aria-hidden":"false"})):this.tabs.eq(0).attr("tabIndex",0)},_processTabs:function(){var t=this,i=this.tabs,s=this.anchors,n=this.panels;this.tablist=this._getList().attr("role","tablist"),this._addClass(this.tablist,"ui-tabs-nav","ui-helper-reset ui-helper-clearfix ui-widget-header"),
// Prevent users from focusing disabled tabs via click
this.tablist.on("mousedown"+this.eventNamespace,"> li",function(t){e(this).is(".ui-state-disabled")&&t.preventDefault()}).on("focus"+this.eventNamespace,".ui-tabs-anchor",function(){e(this).closest("li").is(".ui-state-disabled")&&this.blur()}),this.tabs=this.tablist.find("> li:has(a[href])").attr({role:"tab",tabIndex:-1}),this._addClass(this.tabs,"ui-tabs-tab","ui-state-default"),this.anchors=this.tabs.map(function(){return e("a",this)[0]}).attr({role:"presentation",tabIndex:-1}),this._addClass(this.anchors,"ui-tabs-anchor"),this.panels=e(),this.anchors.each(function(i,s){var n,a,o,r=e(s).uniqueId().attr("id"),l=e(s).closest("li"),h=l.attr("aria-controls");
// Inline tab
t._isLocal(s)?(n=s.hash,o=n.substring(1),a=t.element.find(t._sanitizeSelector(n))):(
// If the tab doesn't already have aria-controls,
// generate an id by using a throw-away element
o=l.attr("aria-controls")||e({}).uniqueId()[0].id,n="#"+o,a=t.element.find(n),a.length||(a=t._createPanel(o),a.insertAfter(t.panels[i-1]||t.tablist)),a.attr("aria-live","polite")),a.length&&(t.panels=t.panels.add(a)),h&&l.data("ui-tabs-aria-controls",h),l.attr({"aria-controls":o,"aria-labelledby":r}),a.attr("aria-labelledby",r)}),this.panels.attr("role","tabpanel"),this._addClass(this.panels,"ui-tabs-panel","ui-widget-content"),
// Avoid memory leaks (#10056)
i&&(this._off(i.not(this.tabs)),this._off(s.not(this.anchors)),this._off(n.not(this.panels)))},
// Allow overriding how to find the list for rare usage scenarios (#7715)
_getList:function(){return this.tablist||this.element.find("ol, ul").eq(0)},_createPanel:function(t){return e("<div>").attr("id",t).data("ui-tabs-destroy",!0)},_setOptionDisabled:function(t){var i,s,n;
// Disable tabs
for(e.isArray(t)&&(t.length?t.length===this.anchors.length&&(t=!0):t=!1),n=0;s=this.tabs[n];n++)i=e(s),!0===t||-1!==e.inArray(n,t)?(i.attr("aria-disabled","true"),this._addClass(i,null,"ui-state-disabled")):(i.removeAttr("aria-disabled"),this._removeClass(i,null,"ui-state-disabled"));this.options.disabled=t,this._toggleClass(this.widget(),this.widgetFullName+"-disabled",null,!0===t)},_setupEvents:function(t){var i={};t&&e.each(t.split(" "),function(e,t){i[t]="_eventHandler"}),this._off(this.anchors.add(this.tabs).add(this.panels)),
// Always prevent the default action, even when disabled
this._on(!0,this.anchors,{click:function(e){e.preventDefault()}}),this._on(this.anchors,i),this._on(this.tabs,{keydown:"_tabKeydown"}),this._on(this.panels,{keydown:"_panelKeydown"}),this._focusable(this.tabs),this._hoverable(this.tabs)},_setupHeightStyle:function(t){var i,s=this.element.parent();"fill"===t?(i=s.height(),i-=this.element.outerHeight()-this.element.height(),this.element.siblings(":visible").each(function(){var t=e(this),s=t.css("position");"absolute"!==s&&"fixed"!==s&&(i-=t.outerHeight(!0))}),this.element.children().not(this.panels).each(function(){i-=e(this).outerHeight(!0)}),this.panels.each(function(){e(this).height(Math.max(0,i-e(this).innerHeight()+e(this).height()))}).css("overflow","auto")):"auto"===t&&(i=0,this.panels.each(function(){i=Math.max(i,e(this).height("").height())}).height(i))},_eventHandler:function(t){var i=this.options,s=this.active,n=e(t.currentTarget),a=n.closest("li"),o=a[0]===s[0],r=o&&i.collapsible,l=r?e():this._getPanelForTab(a),h=s.length?this._getPanelForTab(s):e(),c={oldTab:s,oldPanel:h,newTab:r?e():a,newPanel:l};t.preventDefault(),a.hasClass("ui-state-disabled")||
// tab is already loading
a.hasClass("ui-tabs-loading")||
// can't switch durning an animation
this.running||
// click on active header, but not collapsible
o&&!i.collapsible||
// allow canceling activation
!1===this._trigger("beforeActivate",t,c)||(i.active=!r&&this.tabs.index(a),this.active=o?e():a,this.xhr&&this.xhr.abort(),h.length||l.length||e.error("jQuery UI Tabs: Mismatching fragment identifier."),l.length&&this.load(this.tabs.index(a),t),this._toggle(t,c))},
// Handles show/hide for selecting tabs
_toggle:function(t,i){function s(){a.running=!1,a._trigger("activate",t,i)}function n(){a._addClass(i.newTab.closest("li"),"ui-tabs-active","ui-state-active"),o.length&&a.options.show?a._show(o,a.options.show,s):(o.show(),s())}var a=this,o=i.newPanel,r=i.oldPanel;this.running=!0,
// Start out by hiding, then showing, then completing
r.length&&this.options.hide?this._hide(r,this.options.hide,function(){a._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),n()}):(this._removeClass(i.oldTab.closest("li"),"ui-tabs-active","ui-state-active"),r.hide(),n()),r.attr("aria-hidden","true"),i.oldTab.attr({"aria-selected":"false","aria-expanded":"false"}),
// If we're switching tabs, remove the old tab from the tab order.
// If we're opening from collapsed state, remove the previous tab from the tab order.
// If we're collapsing, then keep the collapsing tab in the tab order.
o.length&&r.length?i.oldTab.attr("tabIndex",-1):o.length&&this.tabs.filter(function(){return 0===e(this).attr("tabIndex")}).attr("tabIndex",-1),o.attr("aria-hidden","false"),i.newTab.attr({"aria-selected":"true","aria-expanded":"true",tabIndex:0})},_activate:function(t){var i,s=this._findActive(t);
// Trying to activate the already active panel
s[0]!==this.active[0]&&(
// Trying to collapse, simulate a click on the current active header
s.length||(s=this.active),i=s.find(".ui-tabs-anchor")[0],this._eventHandler({target:i,currentTarget:i,preventDefault:e.noop}))},_findActive:function(t){return!1===t?e():this.tabs.eq(t)},_getIndex:function(t){
// meta-function to give users option to provide a href string instead of a numerical index.
return"string"==typeof t&&(t=this.anchors.index(this.anchors.filter("[href$='"+e.ui.escapeSelector(t)+"']"))),t},_destroy:function(){this.xhr&&this.xhr.abort(),this.tablist.removeAttr("role").off(this.eventNamespace),this.anchors.removeAttr("role tabIndex").removeUniqueId(),this.tabs.add(this.panels).each(function(){e.data(this,"ui-tabs-destroy")?e(this).remove():e(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")}),this.tabs.each(function(){var t=e(this),i=t.data("ui-tabs-aria-controls");i?t.attr("aria-controls",i).removeData("ui-tabs-aria-controls"):t.removeAttr("aria-controls")}),this.panels.show(),"content"!==this.options.heightStyle&&this.panels.css("height","")},enable:function(t){var i=this.options.disabled;!1!==i&&(void 0===t?i=!1:(t=this._getIndex(t),i=e.isArray(i)?e.map(i,function(e){return e!==t?e:null}):e.map(this.tabs,function(e,i){return i!==t?i:null})),this._setOptionDisabled(i))},disable:function(t){var i=this.options.disabled;if(!0!==i){if(void 0===t)i=!0;else{if(t=this._getIndex(t),-1!==e.inArray(t,i))return;i=e.isArray(i)?e.merge([t],i).sort():[t]}this._setOptionDisabled(i)}},load:function(t,i){t=this._getIndex(t);var s=this,n=this.tabs.eq(t),a=n.find(".ui-tabs-anchor"),o=this._getPanelForTab(n),r={tab:n,panel:o},l=function(e,t){"abort"===t&&s.panels.stop(!1,!0),s._removeClass(n,"ui-tabs-loading"),o.removeAttr("aria-busy"),e===s.xhr&&delete s.xhr};
// Not remote
this._isLocal(a[0])||(this.xhr=e.ajax(this._ajaxSettings(a,i,r)),
// Support: jQuery <1.8
// jQuery <1.8 returns false if the request is canceled in beforeSend,
// but as of 1.8, $.ajax() always returns a jqXHR object.
this.xhr&&"canceled"!==this.xhr.statusText&&(this._addClass(n,"ui-tabs-loading"),o.attr("aria-busy","true"),this.xhr.done(function(e,t,n){
// support: jQuery <1.8
// http://bugs.jquery.com/ticket/11778
setTimeout(function(){o.html(e),s._trigger("load",i,r),l(n,t)},1)}).fail(function(e,t){
// support: jQuery <1.8
// http://bugs.jquery.com/ticket/11778
setTimeout(function(){l(e,t)},1)})))},_ajaxSettings:function(t,i,s){var n=this;return{
// Support: IE <11 only
// Strip any hash that exists to prevent errors with the Ajax request
url:t.attr("href").replace(/#.*$/,""),beforeSend:function(t,a){return n._trigger("beforeLoad",i,e.extend({jqXHR:t,ajaxSettings:a},s))}}},_getPanelForTab:function(t){var i=e(t).attr("aria-controls");return this.element.find(this._sanitizeSelector("#"+i))}}),
// DEPRECATED
// TODO: Switch return back to widget declaration at top of file when this is removed
!1!==e.uiBackCompat&&
// Backcompat for ui-tab class (now ui-tabs-tab)
e.widget("ui.tabs",e.ui.tabs,{_processTabs:function(){this._superApply(arguments),this._addClass(this.tabs,"ui-tab")}});e.ui.tabs;/*!
 * jQuery UI Tooltip 1.12.1
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */
//>>label: Tooltip
//>>group: Widgets
//>>description: Shows additional information for any element on hover or focus.
//>>docs: http://api.jqueryui.com/tooltip/
//>>demos: http://jqueryui.com/tooltip/
//>>css.structure: ../../themes/base/core.css
//>>css.structure: ../../themes/base/tooltip.css
//>>css.theme: ../../themes/base/theme.css
e.widget("ui.tooltip",{version:"1.12.1",options:{classes:{"ui-tooltip":"ui-corner-all ui-widget-shadow"},content:function(){
// support: IE<9, Opera in jQuery <1.7
// .text() can't accept undefined, so coerce to a string
var t=e(this).attr("title")||"";
// Escape title, since we're going from an attribute to raw HTML
return e("<a>").text(t).html()},hide:!0,
// Disabled elements have inconsistent behavior across browsers (#8661)
items:"[title]:not([disabled])",position:{my:"left top+15",at:"left bottom",collision:"flipfit flip"},show:!0,track:!1,
// Callbacks
close:null,open:null},_addDescribedBy:function(t,i){var s=(t.attr("aria-describedby")||"").split(/\s+/);s.push(i),t.data("ui-tooltip-id",i).attr("aria-describedby",e.trim(s.join(" ")))},_removeDescribedBy:function(t){var i=t.data("ui-tooltip-id"),s=(t.attr("aria-describedby")||"").split(/\s+/),n=e.inArray(i,s);-1!==n&&s.splice(n,1),t.removeData("ui-tooltip-id"),s=e.trim(s.join(" ")),s?t.attr("aria-describedby",s):t.removeAttr("aria-describedby")},_create:function(){this._on({mouseover:"open",focusin:"open"}),
// IDs of generated tooltips, needed for destroy
this.tooltips={},
// IDs of parent tooltips where we removed the title attribute
this.parents={},
// Append the aria-live region so tooltips announce correctly
this.liveRegion=e("<div>").attr({role:"log","aria-live":"assertive","aria-relevant":"additions"}).appendTo(this.document[0].body),this._addClass(this.liveRegion,null,"ui-helper-hidden-accessible"),this.disabledTitles=e([])},_setOption:function(t,i){var s=this;this._super(t,i),"content"===t&&e.each(this.tooltips,function(e,t){s._updateContent(t.element)})},_setOptionDisabled:function(e){this[e?"_disable":"_enable"]()},_disable:function(){var t=this;
// Close open tooltips
e.each(this.tooltips,function(i,s){var n=e.Event("blur");n.target=n.currentTarget=s.element[0],t.close(n,!0)}),
// Remove title attributes to prevent native tooltips
this.disabledTitles=this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function(){var t=e(this);if(t.is("[title]"))return t.data("ui-tooltip-title",t.attr("title")).removeAttr("title")}))},_enable:function(){
// restore title attributes
this.disabledTitles.each(function(){var t=e(this);t.data("ui-tooltip-title")&&t.attr("title",t.data("ui-tooltip-title"))}),this.disabledTitles=e([])},open:function(t){var i=this,s=e(t?t.target:this.element).closest(this.options.items);
// No element to show a tooltip for or the tooltip is already open
s.length&&!s.data("ui-tooltip-id")&&(s.attr("title")&&s.data("ui-tooltip-title",s.attr("title")),s.data("ui-tooltip-open",!0),
// Kill parent tooltips, custom or native, for hover
t&&"mouseover"===t.type&&s.parents().each(function(){var t,s=e(this);s.data("ui-tooltip-open")&&(t=e.Event("blur"),t.target=t.currentTarget=this,i.close(t,!0)),s.attr("title")&&(s.uniqueId(),i.parents[this.id]={element:this,title:s.attr("title")},s.attr("title",""))}),this._registerCloseHandlers(t,s),this._updateContent(s,t))},_updateContent:function(e,t){var i,s=this.options.content,n=this,a=t?t.type:null;if("string"==typeof s||s.nodeType||s.jquery)return this._open(t,e,s);(i=s.call(e[0],function(i){
// IE may instantly serve a cached response for ajax requests
// delay this call to _open so the other call to _open runs first
n._delay(function(){
// Ignore async response if tooltip was closed already
e.data("ui-tooltip-open")&&(
// JQuery creates a special event for focusin when it doesn't
// exist natively. To improve performance, the native event
// object is reused and the type is changed. Therefore, we can't
// rely on the type being correct after the event finished
// bubbling, so we set it back to the previous value. (#8740)
t&&(t.type=a),this._open(t,e,i))})}))&&this._open(t,e,i)},_open:function(t,i,s){function n(e){h.of=e,o.is(":hidden")||o.position(h)}var a,o,r,l,h=e.extend({},this.options.position);if(s){if(
// Content can be updated multiple times. If the tooltip already
// exists, then just update the content and bail.
a=this._find(i))return void a.tooltip.find(".ui-tooltip-content").html(s);
// If we have a title, clear it to prevent the native tooltip
// we have to check first to avoid defining a title if none exists
// (we don't want to cause an element to start matching [title])
//
// We use removeAttr only for key events, to allow IE to export the correct
// accessible attributes. For mouse events, set to empty string to avoid
// native tooltip showing up (happens only when removing inside mouseover).
i.is("[title]")&&(t&&"mouseover"===t.type?i.attr("title",""):i.removeAttr("title")),a=this._tooltip(i),o=a.tooltip,this._addDescribedBy(i,o.attr("id")),o.find(".ui-tooltip-content").html(s),
// Support: Voiceover on OS X, JAWS on IE <= 9
// JAWS announces deletions even when aria-relevant="additions"
// Voiceover will sometimes re-read the entire log region's contents from the beginning
this.liveRegion.children().hide(),l=e("<div>").html(o.find(".ui-tooltip-content").html()),l.removeAttr("name").find("[name]").removeAttr("name"),l.removeAttr("id").find("[id]").removeAttr("id"),l.appendTo(this.liveRegion),this.options.track&&t&&/^mouse/.test(t.type)?(this._on(this.document,{mousemove:n}),
// trigger once to override element-relative positioning
n(t)):o.position(e.extend({of:i},this.options.position)),o.hide(),this._show(o,this.options.show),
// Handle tracking tooltips that are shown with a delay (#8644). As soon
// as the tooltip is visible, position the tooltip using the most recent
// event.
// Adds the check to add the timers only when both delay and track options are set (#14682)
this.options.track&&this.options.show&&this.options.show.delay&&(r=this.delayedShow=setInterval(function(){o.is(":visible")&&(n(h.of),clearInterval(r))},e.fx.interval)),this._trigger("open",t,{tooltip:o})}},_registerCloseHandlers:function(t,i){var s={keyup:function(t){if(t.keyCode===e.ui.keyCode.ESCAPE){var s=e.Event(t);s.currentTarget=i[0],this.close(s,!0)}}};
// Only bind remove handler for delegated targets. Non-delegated
// tooltips will handle this in destroy.
i[0]!==this.element[0]&&(s.remove=function(){this._removeTooltip(this._find(i).tooltip)}),t&&"mouseover"!==t.type||(s.mouseleave="close"),t&&"focusin"!==t.type||(s.focusout="close"),this._on(!0,i,s)},close:function(t){var i,s=this,n=e(t?t.currentTarget:this.element),a=this._find(n);
// The tooltip may already be closed
if(!a)
// We set ui-tooltip-open immediately upon open (in open()), but only set the
// additional data once there's actually content to show (in _open()). So even if the
// tooltip doesn't have full data, we always remove ui-tooltip-open in case we're in
// the period between open() and _open().
return void n.removeData("ui-tooltip-open");i=a.tooltip,
// Disabling closes the tooltip, so we need to track when we're closing
// to avoid an infinite loop in case the tooltip becomes disabled on close
a.closing||(
// Clear the interval for delayed tracking tooltips
clearInterval(this.delayedShow),
// Only set title if we had one before (see comment in _open())
// If the title attribute has changed since open(), don't restore
n.data("ui-tooltip-title")&&!n.attr("title")&&n.attr("title",n.data("ui-tooltip-title")),this._removeDescribedBy(n),a.hiding=!0,i.stop(!0),this._hide(i,this.options.hide,function(){s._removeTooltip(e(this))}),n.removeData("ui-tooltip-open"),this._off(n,"mouseleave focusout keyup"),
// Remove 'remove' binding only on delegated targets
n[0]!==this.element[0]&&this._off(n,"remove"),this._off(this.document,"mousemove"),t&&"mouseleave"===t.type&&e.each(this.parents,function(t,i){e(i.element).attr("title",i.title),delete s.parents[t]}),a.closing=!0,this._trigger("close",t,{tooltip:i}),a.hiding||(a.closing=!1))},_tooltip:function(t){var i=e("<div>").attr("role","tooltip"),s=e("<div>").appendTo(i),n=i.uniqueId().attr("id");return this._addClass(s,"ui-tooltip-content"),this._addClass(i,"ui-tooltip","ui-widget ui-widget-content"),i.appendTo(this._appendTo(t)),this.tooltips[n]={element:t,tooltip:i}},_find:function(e){var t=e.data("ui-tooltip-id");return t?this.tooltips[t]:null},_removeTooltip:function(e){e.remove(),delete this.tooltips[e.attr("id")]},_appendTo:function(e){var t=e.closest(".ui-front, dialog");return t.length||(t=this.document[0].body),t},_destroy:function(){var t=this;
// Close open tooltips
e.each(this.tooltips,function(i,s){
// Delegate to close method to handle common cleanup
var n=e.Event("blur"),a=s.element;n.target=n.currentTarget=a[0],t.close(n,!0),
// Remove immediately; destroying an open tooltip doesn't use the
// hide animation
e("#"+i).remove(),
// Restore the title
a.data("ui-tooltip-title")&&(
// If the title attribute has changed since open(), don't restore
a.attr("title")||a.attr("title",a.data("ui-tooltip-title")),a.removeData("ui-tooltip-title"))}),this.liveRegion.remove()}}),
// DEPRECATED
// TODO: Switch return back to widget declaration at top of file when this is removed
!1!==e.uiBackCompat&&
// Backcompat for tooltipClass option
e.widget("ui.tooltip",e.ui.tooltip,{options:{tooltipClass:null},_tooltip:function(){var e=this._superApply(arguments);return this.options.tooltipClass&&e.tooltip.addClass(this.options.tooltipClass),e}});e.ui.tooltip}),function(e){var t={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};e.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){e(this).bxSlider(n)}),this;var a={},o=this;t.el=this;var r=e(window).width(),l=e(window).height(),h=function(){a.settings=e.extend({},s,n),a.settings.slideWidth=parseInt(a.settings.slideWidth),a.children=o.children(a.settings.slideSelector),a.children.length<a.settings.minSlides&&(a.settings.minSlides=a.children.length),a.children.length<a.settings.maxSlides&&(a.settings.maxSlides=a.children.length),a.settings.randomStart&&(a.settings.startSlide=Math.floor(Math.random()*a.children.length)),a.active={index:a.settings.startSlide},a.carousel=a.settings.minSlides>1||a.settings.maxSlides>1,a.carousel&&(a.settings.preloadImages="all"),a.minThreshold=a.settings.minSlides*a.settings.slideWidth+(a.settings.minSlides-1)*a.settings.slideMargin,a.maxThreshold=a.settings.maxSlides*a.settings.slideWidth+(a.settings.maxSlides-1)*a.settings.slideMargin,a.working=!1,a.controls={},a.interval=null,a.animProp="vertical"==a.settings.mode?"top":"left",a.usingCSS=a.settings.useCSS&&"fade"!=a.settings.mode&&function(){var e=document.createElement("div"),t=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in t)if(void 0!==e.style[t[i]])return a.cssPrefix=t[i].replace("Perspective","").toLowerCase(),a.animProp="-"+a.cssPrefix+"-transform",!0;return!1}(),"vertical"==a.settings.mode&&(a.settings.maxSlides=a.settings.minSlides),o.data("origStyle",o.attr("style")),o.children(a.settings.slideSelector).each(function(){e(this).data("origStyle",e(this).attr("style"))}),c()},c=function(){o.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),a.viewport=o.parent(),a.loader=e('<div class="bx-loading" />'),a.viewport.prepend(a.loader),o.css({width:"horizontal"==a.settings.mode?100*a.children.length+215+"%":"auto",position:"relative"}),a.usingCSS&&a.settings.easing?o.css("-"+a.cssPrefix+"-transition-timing-function",a.settings.easing):a.settings.easing||(a.settings.easing="swing"),g(),a.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),a.viewport.parent().css({maxWidth:f()}),a.settings.pager||a.viewport.parent().css({margin:"0 auto 0px"}),a.children.css({float:"horizontal"==a.settings.mode?"left":"none",listStyle:"none",position:"relative"}),a.children.css("width",m()),"horizontal"==a.settings.mode&&a.settings.slideMargin>0&&a.children.css("marginRight",a.settings.slideMargin),"vertical"==a.settings.mode&&a.settings.slideMargin>0&&a.children.css("marginBottom",a.settings.slideMargin),"fade"==a.settings.mode&&(a.children.css({position:"absolute",zIndex:0,display:"none"}),a.children.eq(a.settings.startSlide).css({zIndex:a.settings.slideZIndex,display:"block"})),a.controls.el=e('<div class="bx-controls" />'),a.settings.captions&&k(),a.active.last=a.settings.startSlide==v()-1,a.settings.video&&o.fitVids();var t=a.children.eq(a.settings.startSlide);"all"==a.settings.preloadImages&&(t=a.children),a.settings.ticker?a.settings.pager=!1:(a.settings.pager&&x(),a.settings.controls&&C(),a.settings.auto&&a.settings.autoControls&&S(),(a.settings.controls||a.settings.autoControls||a.settings.pager)&&a.viewport.after(a.controls.el)),u(t,d)},u=function(t,i){var s=t.find("img, iframe").length;if(0==s)return void i();var n=0;t.find("img, iframe").each(function(){e(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&e(this).load()})})},d=function(){if(a.settings.infiniteLoop&&"fade"!=a.settings.mode&&!a.settings.ticker){var t="vertical"==a.settings.mode?a.settings.minSlides:a.settings.maxSlides,i=a.children.slice(0,t).clone().addClass("bx-clone"),s=a.children.slice(-t).clone().addClass("bx-clone");o.append(i).prepend(s)}a.loader.remove(),b(),"vertical"==a.settings.mode&&(a.settings.adaptiveHeight=!0),a.viewport.height(p()),o.redrawSlider(),a.settings.onSliderLoad(a.active.index),a.initialized=!0,a.settings.responsive&&e(window).bind("resize",F),a.settings.auto&&a.settings.autoStart&&H(),a.settings.ticker&&$(),a.settings.pager&&z(a.settings.startSlide),a.settings.controls&&O(),a.settings.touchEnabled&&!a.settings.ticker&&B()},p=function(){var t=0,s=e();if("vertical"==a.settings.mode||a.settings.adaptiveHeight)if(a.carousel){var n=1==a.settings.moveSlides?a.active.index:a.active.index*_();for(s=a.children.eq(n),i=1;i<=a.settings.maxSlides-1;i++)s=n+i>=a.children.length?s.add(a.children.eq(i-1)):s.add(a.children.eq(n+i))}else s=a.children.eq(a.active.index);else s=a.children;return"vertical"==a.settings.mode?(s.each(function(){t+=e(this).outerHeight()}),a.settings.slideMargin>0&&(t+=a.settings.slideMargin*(a.settings.minSlides-1))):t=Math.max.apply(Math,s.map(function(){return e(this).outerHeight(!1)}).get()),t},f=function(){var e="100%";return a.settings.slideWidth>0&&(e="horizontal"==a.settings.mode?a.settings.maxSlides*a.settings.slideWidth+(a.settings.maxSlides-1)*a.settings.slideMargin:a.settings.slideWidth),e},m=function(){var e=a.settings.slideWidth,t=a.viewport.width();return 0==a.settings.slideWidth||a.settings.slideWidth>t&&!a.carousel||"vertical"==a.settings.mode?e=t:a.settings.maxSlides>1&&"horizontal"==a.settings.mode&&(t>a.maxThreshold||t<a.minThreshold&&(e=(t-a.settings.slideMargin*(a.settings.minSlides-1))/a.settings.minSlides)),e},g=function(){var e=1;if("horizontal"==a.settings.mode&&a.settings.slideWidth>0)if(a.viewport.width()<a.minThreshold)e=a.settings.minSlides;else if(a.viewport.width()>a.maxThreshold)e=a.settings.maxSlides;else{var t=a.children.first().width();e=Math.floor(a.viewport.width()/t)}else"vertical"==a.settings.mode&&(e=a.settings.minSlides);return e},v=function(){var e=0;if(a.settings.moveSlides>0)if(a.settings.infiniteLoop)e=a.children.length/_();else for(var t=0,i=0;t<a.children.length;)++e,t=i+g(),i+=a.settings.moveSlides<=g()?a.settings.moveSlides:g();else e=Math.ceil(a.children.length/g());return e},_=function(){return a.settings.moveSlides>0&&a.settings.moveSlides<=g()?a.settings.moveSlides:g()},b=function(){if(a.children.length>a.settings.maxSlides&&a.active.last&&!a.settings.infiniteLoop){if("horizontal"==a.settings.mode){var e=a.children.last(),t=e.position();w(-(t.left-(a.viewport.width()-e.width())),"reset",0)}else if("vertical"==a.settings.mode){var i=a.children.length-a.settings.minSlides,t=a.children.eq(i).position();w(-t.top,"reset",0)}}else{var t=a.children.eq(a.active.index*_()).position();a.active.index==v()-1&&(a.active.last=!0),void 0!=t&&("horizontal"==a.settings.mode?w(-t.left,"reset",0):"vertical"==a.settings.mode&&w(-t.top,"reset",0))}},w=function(e,t,i,s){if(a.usingCSS){var n="vertical"==a.settings.mode?"translate3d(0, "+e+"px, 0)":"translate3d("+e+"px, 0, 0)";o.css("-"+a.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==t?(o.css(a.animProp,n),o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),E()})):"reset"==t?o.css(a.animProp,n):"ticker"==t&&(o.css("-"+a.cssPrefix+"-transition-timing-function","linear"),o.css(a.animProp,n),o.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){o.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),w(s.resetValue,"reset",0),L()}))}else{var r={};r[a.animProp]=e,"slide"==t?o.animate(r,i,a.settings.easing,function(){E()}):"reset"==t?o.css(a.animProp,e):"ticker"==t&&o.animate(r,speed,"linear",function(){w(s.resetValue,"reset",0),L()})}},y=function(){for(var t="",i=v(),s=0;i>s;s++){var n="";a.settings.buildPager&&e.isFunction(a.settings.buildPager)?(n=a.settings.buildPager(s),a.pagerEl.addClass("bx-custom-pager")):(n=s+1,a.pagerEl.addClass("bx-default-pager")),t+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}a.pagerEl.html(t)},x=function(){a.settings.pagerCustom?a.pagerEl=e(a.settings.pagerCustom):(a.pagerEl=e('<div class="bx-pager" />'),a.settings.pagerSelector?e(a.settings.pagerSelector).html(a.pagerEl):a.controls.el.addClass("bx-has-pager").append(a.pagerEl),y()),a.pagerEl.on("click","a",P)},C=function(){a.controls.next=e('<a class="bx-next" href="">'+a.settings.nextText+"</a>"),a.controls.prev=e('<a class="bx-prev" href="">'+a.settings.prevText+"</a>"),a.controls.next.bind("click",T),a.controls.prev.bind("click",D),a.settings.nextSelector&&e(a.settings.nextSelector).append(a.controls.next),a.settings.prevSelector&&e(a.settings.prevSelector).append(a.controls.prev),a.settings.nextSelector||a.settings.prevSelector||(a.controls.directionEl=e('<div class="bx-controls-direction" />'),a.controls.directionEl.append(a.controls.prev).append(a.controls.next),a.controls.el.addClass("bx-has-controls-direction").append(a.controls.directionEl))},S=function(){a.controls.start=e('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+a.settings.startText+"</a></div>"),a.controls.stop=e('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+a.settings.stopText+"</a></div>"),a.controls.autoEl=e('<div class="bx-controls-auto" />'),a.controls.autoEl.on("click",".bx-start",M),a.controls.autoEl.on("click",".bx-stop",I),a.settings.autoControlsCombine?a.controls.autoEl.append(a.controls.start):a.controls.autoEl.append(a.controls.start).append(a.controls.stop),a.settings.autoControlsSelector?e(a.settings.autoControlsSelector).html(a.controls.autoEl):a.controls.el.addClass("bx-has-controls-auto").append(a.controls.autoEl),A(a.settings.autoStart?"stop":"start")},k=function(){a.children.each(function(){var t=e(this).find("img:first").attr("title");void 0!=t&&(""+t).length&&e(this).append('<div class="bx-caption"><span>'+t+"</span></div>")})},T=function(e){a.settings.auto&&o.stopAuto(),o.goToNextSlide(),e.preventDefault()},D=function(e){a.settings.auto&&o.stopAuto(),o.goToPrevSlide(),e.preventDefault()},M=function(e){o.startAuto(),e.preventDefault()},I=function(e){o.stopAuto(),e.preventDefault()},P=function(t){a.settings.auto&&o.stopAuto();var i=e(t.currentTarget),s=parseInt(i.attr("data-slide-index"));s!=a.active.index&&o.goToSlide(s),t.preventDefault()},z=function(t){var i=a.children.length;return"short"==a.settings.pagerType?(a.settings.maxSlides>1&&(i=Math.ceil(a.children.length/a.settings.maxSlides)),void a.pagerEl.html(t+1+a.settings.pagerShortSeparator+i)):(a.pagerEl.find("a").removeClass("active"),void a.pagerEl.each(function(i,s){e(s).find("a").eq(t).addClass("active")}))},E=function(){if(a.settings.infiniteLoop){var e="";0==a.active.index?e=a.children.eq(0).position():a.active.index==v()-1&&a.carousel?e=a.children.eq((v()-1)*_()).position():a.active.index==a.children.length-1&&(e=a.children.eq(a.children.length-1).position()),e&&("horizontal"==a.settings.mode?w(-e.left,"reset",0):"vertical"==a.settings.mode&&w(-e.top,"reset",0))}a.working=!1,a.settings.onSlideAfter(a.children.eq(a.active.index),a.oldIndex,a.active.index)},A=function(e){a.settings.autoControlsCombine?a.controls.autoEl.html(a.controls[e]):(a.controls.autoEl.find("a").removeClass("active"),a.controls.autoEl.find("a:not(.bx-"+e+")").addClass("active"))},O=function(){1==v()?(a.controls.prev.addClass("disabled"),a.controls.next.addClass("disabled")):!a.settings.infiniteLoop&&a.settings.hideControlOnEnd&&(0==a.active.index?(a.controls.prev.addClass("disabled"),a.controls.next.removeClass("disabled")):a.active.index==v()-1?(a.controls.next.addClass("disabled"),a.controls.prev.removeClass("disabled")):(a.controls.prev.removeClass("disabled"),a.controls.next.removeClass("disabled")))},H=function(){a.settings.autoDelay>0?setTimeout(o.startAuto,a.settings.autoDelay):o.startAuto(),a.settings.autoHover&&o.hover(function(){a.interval&&(o.stopAuto(!0),a.autoPaused=!0)},function(){a.autoPaused&&(o.startAuto(!0),a.autoPaused=null)})},$=function(){var t=0;if("next"==a.settings.autoDirection)o.append(a.children.clone().addClass("bx-clone"));else{o.prepend(a.children.clone().addClass("bx-clone"));var i=a.children.first().position();t="horizontal"==a.settings.mode?-i.left:-i.top}w(t,"reset",0),a.settings.pager=!1,a.settings.controls=!1,a.settings.autoControls=!1,a.settings.tickerHover&&!a.usingCSS&&a.viewport.hover(function(){o.stop()},function(){var t=0;a.children.each(function(){t+="horizontal"==a.settings.mode?e(this).outerWidth(!0):e(this).outerHeight(!0)});var i=a.settings.speed/t,s="horizontal"==a.settings.mode?"left":"top",n=i*(t-Math.abs(parseInt(o.css(s))));L(n)}),L()},L=function(e){speed=e||a.settings.speed;var t={left:0,top:0},i={left:0,top:0};"next"==a.settings.autoDirection?t=o.find(".bx-clone").first().position():i=a.children.first().position();var s="horizontal"==a.settings.mode?-t.left:-t.top,n="horizontal"==a.settings.mode?-i.left:-i.top,r={resetValue:n};w(s,"ticker",speed,r)},B=function(){a.touch={start:{x:0,y:0},end:{x:0,y:0}},a.viewport.bind("touchstart",N)},N=function(e){if(a.working)e.preventDefault();else{a.touch.originalPos=o.position();var t=e.originalEvent;a.touch.start.x=t.changedTouches[0].pageX,a.touch.start.y=t.changedTouches[0].pageY,a.viewport.bind("touchmove",W),a.viewport.bind("touchend",R)}},W=function(e){var t=e.originalEvent,i=Math.abs(t.changedTouches[0].pageX-a.touch.start.x),s=Math.abs(t.changedTouches[0].pageY-a.touch.start.y);if(3*i>s&&a.settings.preventDefaultSwipeX?e.preventDefault():3*s>i&&a.settings.preventDefaultSwipeY&&e.preventDefault(),"fade"!=a.settings.mode&&a.settings.oneToOneTouch){var n=0;if("horizontal"==a.settings.mode){var o=t.changedTouches[0].pageX-a.touch.start.x;n=a.touch.originalPos.left+o}else{var o=t.changedTouches[0].pageY-a.touch.start.y;n=a.touch.originalPos.top+o}w(n,"reset",0)}},R=function(e){a.viewport.unbind("touchmove",W);var t=e.originalEvent,i=0;if(a.touch.end.x=t.changedTouches[0].pageX,a.touch.end.y=t.changedTouches[0].pageY,"fade"==a.settings.mode){var s=Math.abs(a.touch.start.x-a.touch.end.x);s>=a.settings.swipeThreshold&&(a.touch.start.x>a.touch.end.x?o.goToNextSlide():o.goToPrevSlide(),o.stopAuto())}else{var s=0;"horizontal"==a.settings.mode?(s=a.touch.end.x-a.touch.start.x,i=a.touch.originalPos.left):(s=a.touch.end.y-a.touch.start.y,i=a.touch.originalPos.top),!a.settings.infiniteLoop&&(0==a.active.index&&s>0||a.active.last&&0>s)?w(i,"reset",200):Math.abs(s)>=a.settings.swipeThreshold?(0>s?o.goToNextSlide():o.goToPrevSlide(),o.stopAuto()):w(i,"reset",200)}a.viewport.unbind("touchend",R)},F=function(){var t=e(window).width(),i=e(window).height();(r!=t||l!=i)&&(r=t,l=i,o.redrawSlider(),a.settings.onSliderResize.call(o,a.active.index))};return o.goToSlide=function(t,i){if(!a.working&&a.active.index!=t)if(a.working=!0,a.oldIndex=a.active.index,a.active.index=0>t?v()-1:t>=v()?0:t,a.settings.onSlideBefore(a.children.eq(a.active.index),a.oldIndex,a.active.index),"next"==i?a.settings.onSlideNext(a.children.eq(a.active.index),a.oldIndex,a.active.index):"prev"==i&&a.settings.onSlidePrev(a.children.eq(a.active.index),a.oldIndex,a.active.index),a.active.last=a.active.index>=v()-1,a.settings.pager&&z(a.active.index),a.settings.controls&&O(),"fade"==a.settings.mode)a.settings.adaptiveHeight&&a.viewport.height()!=p()&&a.viewport.animate({height:p()},a.settings.adaptiveHeightSpeed),a.children.filter(":visible").fadeOut(a.settings.speed).css({zIndex:0}),a.children.eq(a.active.index).css("zIndex",a.settings.slideZIndex+1).fadeIn(a.settings.speed,function(){e(this).css("zIndex",a.settings.slideZIndex),E()});else{a.settings.adaptiveHeight&&a.viewport.height()!=p()&&a.viewport.animate({height:p()},a.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!a.settings.infiniteLoop&&a.carousel&&a.active.last)if("horizontal"==a.settings.mode){var r=a.children.eq(a.children.length-1);n=r.position(),s=a.viewport.width()-r.outerWidth()}else{var l=a.children.length-a.settings.minSlides;n=a.children.eq(l).position()}else if(a.carousel&&a.active.last&&"prev"==i){var h=1==a.settings.moveSlides?a.settings.maxSlides-_():(v()-1)*_()-(a.children.length-a.settings.maxSlides),r=o.children(".bx-clone").eq(h);n=r.position()}else if("next"==i&&0==a.active.index)n=o.find("> .bx-clone").eq(a.settings.maxSlides).position(),a.active.last=!1;else if(t>=0){var c=t*_();n=a.children.eq(c).position()}if(void 0!==n){var u="horizontal"==a.settings.mode?-(n.left-s):-n.top;w(u,"slide",a.settings.speed)}}},o.goToNextSlide=function(){if(a.settings.infiniteLoop||!a.active.last){var e=parseInt(a.active.index)+1;o.goToSlide(e,"next")}},o.goToPrevSlide=function(){if(a.settings.infiniteLoop||0!=a.active.index){var e=parseInt(a.active.index)-1;o.goToSlide(e,"prev")}},o.startAuto=function(e){a.interval||(a.interval=setInterval(function(){"next"==a.settings.autoDirection?o.goToNextSlide():o.goToPrevSlide()},a.settings.pause),a.settings.autoControls&&1!=e&&A("stop"))},o.stopAuto=function(e){a.interval&&(clearInterval(a.interval),a.interval=null,a.settings.autoControls&&1!=e&&A("start"))},o.getCurrentSlide=function(){return a.active.index},o.getCurrentSlideElement=function(){return a.children.eq(a.active.index)},o.getSlideCount=function(){return a.children.length},o.redrawSlider=function(){a.children.add(o.find(".bx-clone")).outerWidth(m()),a.viewport.css("height",p()),a.settings.ticker||b(),a.active.last&&(a.active.index=v()-1),a.active.index>=v()&&(a.active.last=!0),a.settings.pager&&!a.settings.pagerCustom&&(y(),z(a.active.index))},o.destroySlider=function(){a.initialized&&(a.initialized=!1,e(".bx-clone",this).remove(),a.children.each(function(){void 0!=e(this).data("origStyle")?e(this).attr("style",e(this).data("origStyle")):e(this).removeAttr("style")}),void 0!=e(this).data("origStyle")?this.attr("style",e(this).data("origStyle")):e(this).removeAttr("style"),e(this).unwrap().unwrap(),a.controls.el&&a.controls.el.remove(),a.controls.next&&a.controls.next.remove(),a.controls.prev&&a.controls.prev.remove(),a.pagerEl&&a.settings.controls&&a.pagerEl.remove(),e(".bx-caption",this).remove(),a.controls.autoEl&&a.controls.autoEl.remove(),clearInterval(a.interval),a.settings.responsive&&e(window).unbind("resize",F))},o.reloadSlider=function(e){void 0!=e&&(n=e),o.destroySlider(),h()},h(),this}}(jQuery),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var o=t||window.event,r=l.call(arguments,1),h=0,u=0,d=0,p=0,f=0,m=0;if(t=e.event.fix(o),t.type="mousewheel","detail"in o&&(d=-1*o.detail),"wheelDelta"in o&&(d=o.wheelDelta),"wheelDeltaY"in o&&(d=o.wheelDeltaY),"wheelDeltaX"in o&&(u=-1*o.wheelDeltaX),"axis"in o&&o.axis===o.HORIZONTAL_AXIS&&(u=-1*d,d=0),h=0===d?u:d,"deltaY"in o&&(d=-1*o.deltaY,h=d),"deltaX"in o&&(u=o.deltaX,0===d&&(h=-1*u)),0!==d||0!==u){if(1===o.deltaMode){var g=e.data(this,"mousewheel-line-height");h*=g,d*=g,u*=g}else if(2===o.deltaMode){var v=e.data(this,"mousewheel-page-height");h*=v,d*=v,u*=v}if(p=Math.max(Math.abs(d),Math.abs(u)),(!a||a>p)&&(a=p,s(o,p)&&(a/=40)),s(o,p)&&(h/=40,u/=40,d/=40),h=Math[h>=1?"floor":"ceil"](h/a),u=Math[u>=1?"floor":"ceil"](u/a),d=Math[d>=1?"floor":"ceil"](d/a),c.settings.normalizeOffset&&this.getBoundingClientRect){var _=this.getBoundingClientRect();f=t.clientX-_.left,m=t.clientY-_.top}return t.deltaX=u,t.deltaY=d,t.deltaFactor=a,t.offsetX=f,t.offsetY=m,t.deltaMode=0,r.unshift(t,h,u,d),n&&clearTimeout(n),n=setTimeout(i,200),(e.event.dispatch||e.event.handle).apply(this,r)}}function i(){a=null}function s(e,t){return c.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}var n,a,o=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],r="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l=Array.prototype.slice;if(e.event.fixHooks)for(var h=o.length;h;)e.event.fixHooks[o[--h]]=e.event.mouseHooks;var c=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var i=r.length;i;)this.addEventListener(r[--i],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",c.getLineHeight(this)),e.data(this,"mousewheel-page-height",c.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var i=r.length;i;)this.removeEventListener(r[--i],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var i=e(t),s=i["offsetParent"in e.fn?"offsetParent":"parent"]();return s.length||(s=e("body")),parseInt(s.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(e){function t(t){var o=t||window.event,r=l.call(arguments,1),h=0,u=0,d=0,p=0,f=0,m=0;if(t=e.event.fix(o),t.type="mousewheel","detail"in o&&(d=-1*o.detail),"wheelDelta"in o&&(d=o.wheelDelta),"wheelDeltaY"in o&&(d=o.wheelDeltaY),"wheelDeltaX"in o&&(u=-1*o.wheelDeltaX),"axis"in o&&o.axis===o.HORIZONTAL_AXIS&&(u=-1*d,d=0),h=0===d?u:d,"deltaY"in o&&(d=-1*o.deltaY,h=d),"deltaX"in o&&(u=o.deltaX,0===d&&(h=-1*u)),0!==d||0!==u){if(1===o.deltaMode){var g=e.data(this,"mousewheel-line-height");h*=g,d*=g,u*=g}else if(2===o.deltaMode){var v=e.data(this,"mousewheel-page-height");h*=v,d*=v,u*=v}if(p=Math.max(Math.abs(d),Math.abs(u)),(!a||a>p)&&(a=p,s(o,p)&&(a/=40)),s(o,p)&&(h/=40,u/=40,d/=40),h=Math[h>=1?"floor":"ceil"](h/a),u=Math[u>=1?"floor":"ceil"](u/a),d=Math[d>=1?"floor":"ceil"](d/a),c.settings.normalizeOffset&&this.getBoundingClientRect){var _=this.getBoundingClientRect();f=t.clientX-_.left,m=t.clientY-_.top}return t.deltaX=u,t.deltaY=d,t.deltaFactor=a,t.offsetX=f,t.offsetY=m,t.deltaMode=0,r.unshift(t,h,u,d),n&&clearTimeout(n),n=setTimeout(i,200),(e.event.dispatch||e.event.handle).apply(this,r)}}function i(){a=null}function s(e,t){return c.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}var n,a,o=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],r="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l=Array.prototype.slice;if(e.event.fixHooks)for(var h=o.length;h;)e.event.fixHooks[o[--h]]=e.event.mouseHooks;var c=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var i=r.length;i;)this.addEventListener(r[--i],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",c.getLineHeight(this)),e.data(this,"mousewheel-page-height",c.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var i=r.length;i;)this.removeEventListener(r[--i],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var i=e(t),s=i["offsetParent"in e.fn?"offsetParent":"parent"]();return s.length||(s=e("body")),parseInt(s.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var i="function"==typeof define&&define.amd,s="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:";i||(s?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js%3E%3C/script%3E"))),function(){var t,i="mCustomScrollbar",s="mCS",n=".mCustomScrollbar",a={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},o=0,r={},l=window.attachEvent&&!window.addEventListener?1:0,h=!1,c=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},a,t),i=d.call(this);if(t.live){var l=t.liveSelector||this.selector||n,h=e(l);if("off"===t.live)return void f(l);r[l]=setTimeout(function(){h.mCustomScrollbar(t),"once"===t.live&&h.length&&f(l)},500)}else f(l);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":m(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),p(t),e(i).each(function(){var i=e(this);if(!i.data(s)){i.data(s,{idx:++o,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:i.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=i.data(s),a=n.opt,r=i.data("mcs-axis"),l=i.data("mcs-scrollbar-position"),h=i.data("mcs-theme");r&&(a.axis=r),l&&(a.scrollbarPosition=l),h&&(a.theme=h,p(a)),v.call(this),n&&a.callbacks.onCreate&&"function"==typeof a.callbacks.onCreate&&a.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+c[2]+")").addClass(c[2]),u.update.call(null,i)}})},update:function(t,i){var n=t||d.call(this);return e(n).each(function(){var t=e(this);if(t.data(s)){var n=t.data(s),a=n.opt,o=e("#mCSB_"+n.idx+"_container"),r=e("#mCSB_"+n.idx),l=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!o.length)return;n.tweenRunning&&X(t),i&&n&&a.callbacks.onBeforeUpdate&&"function"==typeof a.callbacks.onBeforeUpdate&&a.callbacks.onBeforeUpdate.call(this),t.hasClass(c[3])&&t.removeClass(c[3]),t.hasClass(c[4])&&t.removeClass(c[4]),r.css("max-height","none"),r.height()!==t.height()&&r.css("max-height",t.height()),b.call(this),"y"===a.axis||a.advanced.autoExpandHorizontalScroll||o.css("width",_(o)),n.overflowed=S.call(this),M.call(this),a.autoDraggerLength&&y.call(this),x.call(this),T.call(this);var h=[Math.abs(o[0].offsetTop),Math.abs(o[0].offsetLeft)];"x"!==a.axis&&(n.overflowed[0]?l[0].height()>l[0].parent().height()?k.call(this):(G(t,h[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(k.call(this),"y"===a.axis?D.call(this):"yx"===a.axis&&n.overflowed[1]&&G(t,h[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==a.axis&&(n.overflowed[1]?l[1].width()>l[1].parent().width()?k.call(this):(G(t,h[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(k.call(this),"x"===a.axis?D.call(this):"yx"===a.axis&&n.overflowed[0]&&G(t,h[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),i&&n&&(2===i&&a.callbacks.onImageLoad&&"function"==typeof a.callbacks.onImageLoad?a.callbacks.onImageLoad.call(this):3===i&&a.callbacks.onSelectorChange&&"function"==typeof a.callbacks.onSelectorChange?a.callbacks.onSelectorChange.call(this):a.callbacks.onUpdate&&"function"==typeof a.callbacks.onUpdate&&a.callbacks.onUpdate.call(this)),Y.call(this)}})},scrollTo:function(t,i){if(void 0!==t&&null!=t){var n=d.call(this);return e(n).each(function(){var n=e(this);if(n.data(s)){var a=n.data(s),o=a.opt,r={trigger:"external",scrollInertia:o.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},l=e.extend(!0,{},r,i),h=F.call(this,t),c=l.scrollInertia>0&&l.scrollInertia<17?17:l.scrollInertia;h[0]=q.call(this,h[0],"y"),h[1]=q.call(this,h[1],"x"),l.moveDragger&&(h[0]*=a.scrollRatio.y,h[1]*=a.scrollRatio.x),l.dur=c,setTimeout(function(){null!==h[0]&&void 0!==h[0]&&"x"!==o.axis&&a.overflowed[0]&&(l.dir="y",l.overwrite="all",G(n,h[0].toString(),l)),null!==h[1]&&void 0!==h[1]&&"y"!==o.axis&&a.overflowed[1]&&(l.dir="x",l.overwrite="none",G(n,h[1].toString(),l))},l.timeout)}})}},stop:function(){var t=d.call(this);return e(t).each(function(){var t=e(this);t.data(s)&&X(t)})},disable:function(t){var i=d.call(this);return e(i).each(function(){var i=e(this);i.data(s)&&(i.data(s),Y.call(this,"remove"),D.call(this),t&&k.call(this),M.call(this,!0),i.addClass(c[3]))})},destroy:function(){var t=d.call(this);return e(t).each(function(){var n=e(this);if(n.data(s)){var a=n.data(s),o=a.opt,r=e("#mCSB_"+a.idx),l=e("#mCSB_"+a.idx+"_container"),h=e(".mCSB_"+a.idx+"_scrollbar");o.live&&f(o.liveSelector||e(t).selector),Y.call(this,"remove"),D.call(this),k.call(this),n.removeData(s),Q(this,"mcs"),h.remove(),l.find("img."+c[2]).removeClass(c[2]),r.replaceWith(l.contents()),n.removeClass(i+" _"+s+"_"+a.idx+" "+c[6]+" "+c[7]+" "+c[5]+" "+c[3]).addClass(c[4])}})}},d=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},p=function(t){var i=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],s=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],a=["minimal","minimal-dark"],o=["minimal","minimal-dark"];t.autoDraggerLength=!(e.inArray(t.theme,i)>-1)&&t.autoDraggerLength,t.autoExpandScrollbar=!(e.inArray(t.theme,s)>-1)&&t.autoExpandScrollbar,t.scrollButtons.enable=!(e.inArray(t.theme,n)>-1)&&t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,a)>-1||t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,o)>-1?"outside":t.scrollbarPosition},f=function(e){r[e]&&(clearTimeout(r[e]),Q(r,e))},m=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){
var t=e(this),n=t.data(s),a=n.opt,o=a.autoExpandScrollbar?" "+c[1]+"_expand":"",r=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+a.theme+" mCSB_scrollTools_vertical"+o+"'><div class='"+c[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+a.theme+" mCSB_scrollTools_horizontal"+o+"'><div class='"+c[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],l="yx"===a.axis?"mCSB_vertical_horizontal":"x"===a.axis?"mCSB_horizontal":"mCSB_vertical",h="yx"===a.axis?r[0]+r[1]:"x"===a.axis?r[1]:r[0],u="yx"===a.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",d=a.autoHideScrollbar?" "+c[6]:"",p="x"!==a.axis&&"rtl"===n.langDir?" "+c[7]:"";a.setWidth&&t.css("width",a.setWidth),a.setHeight&&t.css("height",a.setHeight),a.setLeft="y"!==a.axis&&"rtl"===n.langDir?"989999px":a.setLeft,t.addClass(i+" _"+s+"_"+n.idx+d+p).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+a.theme+" "+l+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+a.setTop+"; left:"+a.setLeft+";' dir="+n.langDir+" /></div>");var f=e("#mCSB_"+n.idx),m=e("#mCSB_"+n.idx+"_container");"y"===a.axis||a.advanced.autoExpandHorizontalScroll||m.css("width",_(m)),"outside"===a.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),f.addClass("mCSB_outside").after(h)):(f.addClass("mCSB_inside").append(h),m.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},_=function(t){var i=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],s=t.parent().width();return i[0]>s?i[0]:i[1]>s?i[1]:"100%"},b=function(){var t=e(this),i=t.data(s),n=i.opt,a=e("#mCSB_"+i.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){a.css({width:"auto","min-width":0,"overflow-x":"scroll"});var o=Math.ceil(a[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&o>a.parent().width()?a.css({width:o,"min-width":"100%","overflow-x":"inherit"}):a.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(a[0].getBoundingClientRect().right+.4)-Math.floor(a[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),i=t.data(s),n=i.opt,a=e(".mCSB_"+i.idx+"_scrollbar:first"),o=ee(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",r=["<a href='#' class='"+c[13]+"' oncontextmenu='return false;' "+o+" />","<a href='#' class='"+c[14]+"' oncontextmenu='return false;' "+o+" />","<a href='#' class='"+c[15]+"' oncontextmenu='return false;' "+o+" />","<a href='#' class='"+c[16]+"' oncontextmenu='return false;' "+o+" />"],l=["x"===n.axis?r[2]:r[0],"x"===n.axis?r[3]:r[1],r[2],r[3]];n.scrollButtons.enable&&a.prepend(l[0]).append(l[1]).next(".mCSB_scrollTools").prepend(l[2]).append(l[3])},y=function(){var t=e(this),i=t.data(s),n=e("#mCSB_"+i.idx),a=e("#mCSB_"+i.idx+"_container"),o=[e("#mCSB_"+i.idx+"_dragger_vertical"),e("#mCSB_"+i.idx+"_dragger_horizontal")],r=[n.height()/a.outerHeight(!1),n.width()/a.outerWidth(!1)],h=[parseInt(o[0].css("min-height")),Math.round(r[0]*o[0].parent().height()),parseInt(o[1].css("min-width")),Math.round(r[1]*o[1].parent().width())],c=l&&h[1]<h[0]?h[0]:h[1],u=l&&h[3]<h[2]?h[2]:h[3];o[0].css({height:c,"max-height":o[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":h[0]+"px"}),o[1].css({width:u,"max-width":o[1].parent().width()-10})},x=function(){var t=e(this),i=t.data(s),n=e("#mCSB_"+i.idx),a=e("#mCSB_"+i.idx+"_container"),o=[e("#mCSB_"+i.idx+"_dragger_vertical"),e("#mCSB_"+i.idx+"_dragger_horizontal")],r=[a.outerHeight(!1)-n.height(),a.outerWidth(!1)-n.width()],l=[r[0]/(o[0].parent().height()-o[0].height()),r[1]/(o[1].parent().width()-o[1].width())];i.scrollRatio={y:l[0],x:l[1]}},C=function(e,t,i){var s=i?c[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(c[0]+" "+s),n.toggleClass(c[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(c[0]),n.removeClass(c[1])):(e.addClass(c[0]),n.addClass(c[1])))},S=function(){var t=e(this),i=t.data(s),n=e("#mCSB_"+i.idx),a=e("#mCSB_"+i.idx+"_container"),o=null==i.overflowed?a.height():a.outerHeight(!1),r=null==i.overflowed?a.width():a.outerWidth(!1),l=a[0].scrollHeight,h=a[0].scrollWidth;return l>o&&(o=l),h>r&&(r=h),[o>n.height(),r>n.width()]},k=function(){var t=e(this),i=t.data(s),n=i.opt,a=e("#mCSB_"+i.idx),o=e("#mCSB_"+i.idx+"_container"),r=[e("#mCSB_"+i.idx+"_dragger_vertical"),e("#mCSB_"+i.idx+"_dragger_horizontal")];if(X(t),("x"!==n.axis&&!i.overflowed[0]||"y"===n.axis&&i.overflowed[0])&&(r[0].add(o).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!i.overflowed[1]||"x"===n.axis&&i.overflowed[1]){var l=dx=0;"rtl"===i.langDir&&(l=a.width()-o.outerWidth(!1),dx=Math.abs(l/i.scrollRatio.x)),o.css("left",l),r[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){o=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(o),A.call(i[0])):t()},100)}var i=e(this),n=i.data(s),a=n.opt;if(!n.bindEvents){if(P.call(this),a.contentTouchScroll&&z.call(this),E.call(this),a.mouseWheel.enable){var o;t()}$.call(this),B.call(this),a.advanced.autoScrollOnFocus&&L.call(this),a.scrollButtons.enable&&N.call(this),a.keyboard.enable&&W.call(this),n.bindEvents=!0}},D=function(){var t=e(this),i=t.data(s),n=i.opt,a=s+"_"+i.idx,o=".mCSB_"+i.idx+"_scrollbar",r=e("#mCSB_"+i.idx+",#mCSB_"+i.idx+"_container,#mCSB_"+i.idx+"_container_wrapper,"+o+" ."+c[12]+",#mCSB_"+i.idx+"_dragger_vertical,#mCSB_"+i.idx+"_dragger_horizontal,"+o+">a"),l=e("#mCSB_"+i.idx+"_container");n.advanced.releaseDraggableSelectors&&r.add(e(n.advanced.releaseDraggableSelectors)),i.bindEvents&&(e(document).unbind("."+a),r.each(function(){e(this).unbind("."+a)}),clearTimeout(t[0]._focusTimeout),Q(t[0],"_focusTimeout"),clearTimeout(i.sequential.step),Q(i.sequential,"step"),clearTimeout(l[0].onCompleteTimeout),Q(l[0],"onCompleteTimeout"),i.bindEvents=!1)},M=function(t){var i=e(this),n=i.data(s),a=n.opt,o=e("#mCSB_"+n.idx+"_container_wrapper"),r=o.length?o:e("#mCSB_"+n.idx+"_container"),l=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],h=[l[0].find(".mCSB_dragger"),l[1].find(".mCSB_dragger")];"x"!==a.axis&&(n.overflowed[0]&&!t?(l[0].add(h[0]).add(l[0].children("a")).css("display","block"),r.removeClass(c[8]+" "+c[10])):(a.alwaysShowScrollbar?(2!==a.alwaysShowScrollbar&&h[0].css("display","none"),r.removeClass(c[10])):(l[0].css("display","none"),r.addClass(c[10])),r.addClass(c[8]))),"y"!==a.axis&&(n.overflowed[1]&&!t?(l[1].add(h[1]).add(l[1].children("a")).css("display","block"),r.removeClass(c[9]+" "+c[11])):(a.alwaysShowScrollbar?(2!==a.alwaysShowScrollbar&&h[1].css("display","none"),r.removeClass(c[11])):(l[1].css("display","none"),r.addClass(c[11])),r.addClass(c[9]))),n.overflowed[0]||n.overflowed[1]?i.removeClass(c[5]):i.addClass(c[5])},I=function(e){switch(e.type){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return e.target.ownerDocument!==document?[e.originalEvent.screenY,e.originalEvent.screenX,!1]:[e.originalEvent.pageY,e.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var t=e.originalEvent.touches[0]||e.originalEvent.changedTouches[0],i=e.originalEvent.touches.length||e.originalEvent.changedTouches.length;return e.target.ownerDocument!==document?[t.screenY,t.screenX,i>1]:[t.pageY,t.pageX,i>1];default:return[e.pageY,e.pageX,!1]}},P=function(){function t(e){var t=f.find("iframe");if(t.length){var i=e?"auto":"none";t.css("pointer-events",i)}}function i(e,t,i,s){if(f[0].idleTimer=u.scrollInertia<233?250:0,n.attr("id")===p[1])var a="x",o=(n[0].offsetLeft-t+s)*c.scrollRatio.x;else var a="y",o=(n[0].offsetTop-e+i)*c.scrollRatio.y;G(r,o.toString(),{dir:a,drag:!0})}var n,a,o,r=e(this),c=r.data(s),u=c.opt,d=s+"_"+c.idx,p=["mCSB_"+c.idx+"_dragger_vertical","mCSB_"+c.idx+"_dragger_horizontal"],f=e("#mCSB_"+c.idx+"_container"),m=e("#"+p[0]+",#"+p[1]),g=u.advanced.releaseDraggableSelectors?m.add(e(u.advanced.releaseDraggableSelectors)):m;m.bind("mousedown."+d+" touchstart."+d+" pointerdown."+d+" MSPointerDown."+d,function(i){if(i.stopImmediatePropagation(),i.preventDefault(),Z(i)){h=!0,l&&(document.onselectstart=function(){return!1}),t(!1),X(r),n=e(this);var s=n.offset(),c=I(i)[0]-s.top,d=I(i)[1]-s.left,p=n.height()+s.top,f=n.width()+s.left;p>c&&c>0&&f>d&&d>0&&(a=c,o=d),C(n,"active",u.autoExpandScrollbar)}}).bind("touchmove."+d,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),s=I(e)[0]-t.top,r=I(e)[1]-t.left;i(a,o,s,r)}),e(document).bind("mousemove."+d+" pointermove."+d+" MSPointerMove."+d,function(e){if(n){var t=n.offset(),s=I(e)[0]-t.top,r=I(e)[1]-t.left;if(a===s&&o===r)return;i(a,o,s,r)}}).add(g).bind("mouseup."+d+" touchend."+d+" pointerup."+d+" MSPointerUp."+d,function(e){n&&(C(n,"active",u.autoExpandScrollbar),n=null),h=!1,l&&(document.onselectstart=null),t(!0)})},z=function(){function i(e){if(!J(e)||h||I(e)[2])return void(t=0);t=1,x=0,C=0,c=1,S.removeClass("mCS_touch_action");var i=P.offset();u=I(e)[0]-i.top,d=I(e)[1]-i.left,L=[I(e)[0],I(e)[1]]}function n(e){if(J(e)&&!h&&!I(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||x)&&c)){g=V();var t=M.offset(),i=I(e)[0]-t.top,s=I(e)[1]-t.left,n="mcsLinearOut";if(E.push(i),A.push(s),L[2]=Math.abs(I(e)[0]-L[0]),L[3]=Math.abs(I(e)[1]-L[1]),k.overflowed[0])var a=z[0].parent().height()-z[0].height(),o=u-i>0&&i-u>-a*k.scrollRatio.y&&(2*L[3]<L[2]||"yx"===T.axis);if(k.overflowed[1])var r=z[1].parent().width()-z[1].width(),p=d-s>0&&s-d>-r*k.scrollRatio.x&&(2*L[2]<L[3]||"yx"===T.axis);o||p?(W||e.preventDefault(),x=1):(C=1,S.addClass("mCS_touch_action")),W&&e.preventDefault(),w="yx"===T.axis?[u-i,d-s]:"x"===T.axis?[null,d-s]:[u-i,null],P[0].idleTimer=250,k.overflowed[0]&&l(w[0],H,n,"y","all",!0),k.overflowed[1]&&l(w[1],H,n,"x",$,!0)}}function a(e){if(!J(e)||h||I(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),X(S),m=V();var i=M.offset();p=I(e)[0]-i.top,f=I(e)[1]-i.left,E=[],A=[]}function o(e){if(J(e)&&!h&&!I(e)[2]){c=0,e.stopImmediatePropagation(),x=0,C=0,v=V();var t=M.offset(),i=I(e)[0]-t.top,s=I(e)[1]-t.left;if(!(v-g>30)){b=1e3/(v-m);var n="mcsEaseOut",a=2.5>b,o=a?[E[E.length-2],A[A.length-2]]:[0,0];_=a?[i-o[0],s-o[1]]:[i-p,s-f];var u=[Math.abs(_[0]),Math.abs(_[1])];b=a?[Math.abs(_[0]/4),Math.abs(_[1]/4)]:[b,b];var d=[Math.abs(P[0].offsetTop)-_[0]*r(u[0]/b[0],b[0]),Math.abs(P[0].offsetLeft)-_[1]*r(u[1]/b[1],b[1])];w="yx"===T.axis?[d[0],d[1]]:"x"===T.axis?[null,d[1]]:[d[0],null],y=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var S=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>S?w[0]:0,w[1]=u[1]>S?w[1]:0,k.overflowed[0]&&l(w[0],y[0],n,"y",$,!1),k.overflowed[1]&&l(w[1],y[1],n,"x",$,!1)}}}function r(e,t){var i=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?i[0]:i[3]:e>60?t>3?i[3]:i[2]:e>30?t>8?i[1]:t>6?i[0]:t>4?t:i[2]:t>8?t:i[3]}function l(e,t,i,s,n,a){e&&G(S,e.toString(),{dur:t,scrollEasing:i,dir:s,overwrite:n,drag:a})}var c,u,d,p,f,m,g,v,_,b,w,y,x,C,S=e(this),k=S.data(s),T=k.opt,D=s+"_"+k.idx,M=e("#mCSB_"+k.idx),P=e("#mCSB_"+k.idx+"_container"),z=[e("#mCSB_"+k.idx+"_dragger_vertical"),e("#mCSB_"+k.idx+"_dragger_horizontal")],E=[],A=[],H=0,$="yx"===T.axis?"none":"all",L=[],B=P.find("iframe"),N=["touchstart."+D+" pointerdown."+D+" MSPointerDown."+D,"touchmove."+D+" pointermove."+D+" MSPointerMove."+D,"touchend."+D+" pointerup."+D+" MSPointerUp."+D],W=void 0!==document.body.style.touchAction;P.bind(N[0],function(e){i(e)}).bind(N[1],function(e){n(e)}),M.bind(N[0],function(e){a(e)}).bind(N[2],function(e){o(e)}),B.length&&B.each(function(){e(this).load(function(){O(this)&&e(this.contentDocument||this.contentWindow.document).bind(N[0],function(e){i(e),a(e)}).bind(N[1],function(e){n(e)}).bind(N[2],function(e){o(e)})})})},E=function(){function i(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,i){c.type=i&&a?"stepped":"stepless",c.scrollAmount=10,R(o,e,t,"mcsLinearOut",i?60:null)}var a,o=e(this),r=o.data(s),l=r.opt,c=r.sequential,u=s+"_"+r.idx,d=e("#mCSB_"+r.idx+"_container"),p=d.parent();d.bind("mousedown."+u,function(e){t||a||(a=1,h=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&a&&i()){var s=d.offset(),o=I(e)[0]-s.top+d[0].offsetTop,h=I(e)[1]-s.left+d[0].offsetLeft;o>0&&o<p.height()&&h>0&&h<p.width()?c.step&&n("off",null,"stepped"):("x"!==l.axis&&r.overflowed[0]&&(0>o?n("on",38):o>p.height()&&n("on",40)),"y"!==l.axis&&r.overflowed[1]&&(0>h?n("on",37):h>p.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(e){t||(a&&(a=0,n("off",null)),h=!1)})},A=function(){function t(t,s){if(X(i),!H(i,t.target)){var o="auto"!==a.mouseWheel.deltaFactor?parseInt(a.mouseWheel.deltaFactor):l&&t.deltaFactor<100?100:t.deltaFactor||100,c=a.scrollInertia;if("x"===a.axis||"x"===a.mouseWheel.axis)var u="x",d=[Math.round(o*n.scrollRatio.x),parseInt(a.mouseWheel.scrollAmount)],p="auto"!==a.mouseWheel.scrollAmount?d[1]:d[0]>=r.width()?.9*r.width():d[0],f=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),m=h[1][0].offsetLeft,g=h[1].parent().width()-h[1].width(),v=t.deltaX||t.deltaY||s;else var u="y",d=[Math.round(o*n.scrollRatio.y),parseInt(a.mouseWheel.scrollAmount)],p="auto"!==a.mouseWheel.scrollAmount?d[1]:d[0]>=r.height()?.9*r.height():d[0],f=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),m=h[0][0].offsetTop,g=h[0].parent().height()-h[0].height(),v=t.deltaY||s;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((a.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),a.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==m||0>v&&m!==g||a.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<2&&!a.mouseWheel.normalizeDelta&&(p=t.deltaFactor,c=17),G(i,(f-v*p).toString(),{dir:u,dur:c}))}}if(e(this).data(s)){var i=e(this),n=i.data(s),a=n.opt,o=s+"_"+n.idx,r=e("#mCSB_"+n.idx),h=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],c=e("#mCSB_"+n.idx+"_container").find("iframe");c.length&&c.each(function(){e(this).load(function(){O(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+o,function(e,i){t(e,i)})})}),r.bind("mousewheel."+o,function(e,i){t(e,i)})}},O=function(e){var t=null;try{t=(e.contentDocument||e.contentWindow.document).body.innerHTML}catch(e){}return null!==t},H=function(t,i){var n=i.nodeName.toLowerCase(),a=t.data(s).opt.mouseWheel.disableOver,o=["select","textarea"];return e.inArray(n,a)>-1&&!(e.inArray(n,o)>-1&&!e(i).is(":focus"))},$=function(){var t,i=e(this),n=i.data(s),a=s+"_"+n.idx,o=e("#mCSB_"+n.idx+"_container"),r=o.parent();e(".mCSB_"+n.idx+"_scrollbar ."+c[12]).bind("mousedown."+a+" touchstart."+a+" pointerdown."+a+" MSPointerDown."+a,function(i){h=!0,e(i.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+a+" pointerup."+a+" MSPointerUp."+a,function(e){h=!1}).bind("click."+a,function(s){if(t&&(t=0,e(s.target).hasClass(c[12])||e(s.target).hasClass("mCSB_draggerRail"))){X(i);var a=e(this),l=a.find(".mCSB_dragger");if(a.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var h="x",u=s.pageX>l.offset().left?-1:1,d=Math.abs(o[0].offsetLeft)-.9*u*r.width()}else{if(!n.overflowed[0])return;var h="y",u=s.pageY>l.offset().top?-1:1,d=Math.abs(o[0].offsetTop)-.9*u*r.height()}G(i,d.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}})},L=function(){var t=e(this),i=t.data(s),n=i.opt,a=s+"_"+i.idx,o=e("#mCSB_"+i.idx+"_container"),r=o.parent();o.bind("focusin."+a,function(i){var s=e(document.activeElement),a=o.find(".mCustomScrollBox").length;s.is(n.advanced.autoScrollOnFocus)&&(X(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?17*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[te(s)[0],te(s)[1]],i=[o[0].offsetTop,o[0].offsetLeft],a=[i[0]+e[0]>=0&&i[0]+e[0]<r.height()-s.outerHeight(!1),i[1]+e[1]>=0&&i[0]+e[1]<r.width()-s.outerWidth(!1)],l="yx"!==n.axis||a[0]||a[1]?"all":"none";"x"===n.axis||a[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:l,dur:0}),"y"===n.axis||a[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:l,dur:0})},t[0]._focusTimer))})},B=function(){var t=e(this),i=t.data(s),n=s+"_"+i.idx,a=e("#mCSB_"+i.idx+"_container").parent();a.bind("scroll."+n,function(t){(0!==a.scrollTop()||0!==a.scrollLeft())&&e(".mCSB_"+i.idx+"_scrollbar").css("visibility","hidden")})},N=function(){var t=e(this),i=t.data(s),n=i.opt,a=i.sequential,o=s+"_"+i.idx,r=".mCSB_"+i.idx+"_scrollbar";e(r+">a").bind("mousedown."+o+" touchstart."+o+" pointerdown."+o+" MSPointerDown."+o+" mouseup."+o+" touchend."+o+" pointerup."+o+" MSPointerUp."+o+" mouseout."+o+" pointerout."+o+" MSPointerOut."+o+" click."+o,function(s){function o(e,i){a.scrollAmount=n.snapAmount||n.scrollButtons.scrollAmount,R(t,e,i)}if(s.preventDefault(),Z(s)){var r=e(this).attr("class");switch(a.type=n.scrollButtons.scrollType,s.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===a.type)return;h=!0,i.tweenRunning=!1,o("on",r);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===a.type)return;h=!1,a.dir&&o("off",r);break;case"click":if("stepped"!==a.type||i.tweenRunning)return;o("on",r)}}})},W=function(){function t(t){function s(e,t){o.type=a.keyboard.scrollType,o.scrollAmount=a.snapAmount||a.keyboard.scrollAmount,"stepped"===o.type&&n.tweenRunning||R(i,e,t)}switch(t.type){case"blur":n.tweenRunning&&o.dir&&s("off",null);break;case"keydown":case"keyup":var r=t.keyCode?t.keyCode:t.which,l="on";if("x"!==a.axis&&(38===r||40===r)||"y"!==a.axis&&(37===r||39===r)){if((38===r||40===r)&&!n.overflowed[0]||(37===r||39===r)&&!n.overflowed[1])return;"keyup"===t.type&&(l="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),s(l,r))}else if(33===r||34===r){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){X(i);var d=34===r?-1:1;if("x"===a.axis||"yx"===a.axis&&n.overflowed[1]&&!n.overflowed[0])var p="x",f=Math.abs(h[0].offsetLeft)-.9*d*c.width();else var p="y",f=Math.abs(h[0].offsetTop)-.9*d*c.height();G(i,f.toString(),{dir:p,scrollEasing:"mcsEaseInOut"})}}else if((35===r||36===r)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===a.axis||"yx"===a.axis&&n.overflowed[1]&&!n.overflowed[0])var p="x",f=35===r?Math.abs(c.width()-h.outerWidth(!1)):0;else var p="y",f=35===r?Math.abs(c.height()-h.outerHeight(!1)):0;G(i,f.toString(),{dir:p,scrollEasing:"mcsEaseInOut"})}}}var i=e(this),n=i.data(s),a=n.opt,o=n.sequential,r=s+"_"+n.idx,l=e("#mCSB_"+n.idx),h=e("#mCSB_"+n.idx+"_container"),c=h.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",d=h.find("iframe"),p=["blur."+r+" keydown."+r+" keyup."+r];d.length&&d.each(function(){e(this).load(function(){O(this)&&e(this.contentDocument||this.contentWindow.document).bind(p[0],function(e){t(e)})})}),l.attr("tabindex","0").bind(p[0],function(e){t(e)})},R=function(t,i,n,a,o){function r(e){var i="stepped"!==u.type,s=o||(e?i?f/1.5:m:1e3/60),n=e?i?7.5:40:2.5,h=[Math.abs(d[0].offsetTop),Math.abs(d[0].offsetLeft)],c=[l.scrollRatio.y>10?10:l.scrollRatio.y,l.scrollRatio.x>10?10:l.scrollRatio.x],p="x"===u.dir[0]?h[1]+u.dir[1]*c[1]*n:h[0]+u.dir[1]*c[0]*n,g="x"===u.dir[0]?h[1]+u.dir[1]*parseInt(u.scrollAmount):h[0]+u.dir[1]*parseInt(u.scrollAmount),v="auto"!==u.scrollAmount?g:p,_=a||(e?i?"mcsLinearOut":"mcsEaseInOut":"mcsLinear"),b=!!e;return e&&17>s&&(v="x"===u.dir[0]?h[1]:h[0]),G(t,v.toString(),{dir:u.dir[0],scrollEasing:_,dur:s,onComplete:b}),e?void(u.dir=!1):(clearTimeout(u.step),void(u.step=setTimeout(function(){r()},s)))}var l=t.data(s),h=l.opt,u=l.sequential,d=e("#mCSB_"+l.idx+"_container"),p="stepped"===u.type,f=h.scrollInertia<26?26:h.scrollInertia,m=h.scrollInertia<1?17:h.scrollInertia;switch(i){case"on":if(u.dir=[n===c[16]||n===c[15]||39===n||37===n?"x":"y",n===c[13]||n===c[15]||38===n||37===n?-1:1],X(t),ee(n)&&"stepped"===u.type)return;r(p);break;case"off":(function(){clearTimeout(u.step),Q(u,"step"),X(t)})(),(p||l.tweenRunning&&u.dir)&&r(!0)}},F=function(t){var i=e(this).data(s).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===i.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===i.axis?null:t,n[1]=t.x?t.x:t.y||"y"===i.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},q=function(t,i){if(null!=t&&void 0!==t){var n=e(this),a=n.data(s),o=a.opt,r=e("#mCSB_"+a.idx+"_container"),l=r.parent(),h=typeof t;i||(i="x"===o.axis?"x":"y");var c="x"===i?r.outerWidth(!1):r.outerHeight(!1),d="x"===i?r[0].offsetLeft:r[0].offsetTop,p="x"===i?"left":"top";switch(h){case"function":return t();case"object":var f=t.jquery?t:e(t);if(!f.length)return;return"x"===i?te(f)[1]:te(f)[0];case"string":case"number":if(ee(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(c*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(d-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var m=d+parseInt(t.split("+=")[1]);return m>=0?0:Math.abs(m)}if(-1!==t.indexOf("px")&&ee(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(l.height()-r.outerHeight(!1));if("right"===t)return Math.abs(l.width()-r.outerWidth(!1));if("first"===t||"last"===t){var f=r.find(":"+t);return"x"===i?te(f)[1]:te(f)[0]}return e(t).length?"x"===i?te(e(t))[1]:te(e(t))[0]:(r.css(p,t),void u.update.call(null,n[0]))}}},Y=function(t){function i(){return clearTimeout(d[0].autoUpdate),0===r.parents("html").length?void(r=null):void(d[0].autoUpdate=setTimeout(function(){return h.advanced.updateOnSelectorChange&&(l.poll.change.n=a(),l.poll.change.n!==l.poll.change.o)?(l.poll.change.o=l.poll.change.n,void o(3)):h.advanced.updateOnContentResize&&(l.poll.size.n=r[0].scrollHeight+r[0].scrollWidth+d[0].offsetHeight+r[0].offsetHeight,l.poll.size.n!==l.poll.size.o)?(l.poll.size.o=l.poll.size.n,void o(1)):!h.advanced.updateOnImageLoad||"auto"===h.advanced.updateOnImageLoad&&"y"===h.axis||(l.poll.img.n=d.find("img").length,l.poll.img.n===l.poll.img.o)?void((h.advanced.updateOnSelectorChange||h.advanced.updateOnContentResize||h.advanced.updateOnImageLoad)&&i()):(l.poll.img.o=l.poll.img.n,void d.find("img").each(function(){n(this)}))},h.advanced.autoUpdateTimeout))}function n(t){function i(){this.onload=null,e(t).addClass(c[2]),o(2)}if(e(t).hasClass(c[2]))return void o();var s=new Image;s.onload=function(e,t){return function(){return t.apply(e,arguments)}}(s,i),s.src=t.src}function a(){!0===h.advanced.updateOnSelectorChange&&(h.advanced.updateOnSelectorChange="*");var e=0,t=d.find(h.advanced.updateOnSelectorChange);return h.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function o(e){clearTimeout(d[0].autoUpdate),u.update.call(null,r[0],e)}var r=e(this),l=r.data(s),h=l.opt,d=e("#mCSB_"+l.idx+"_container");return t?(clearTimeout(d[0].autoUpdate),void Q(d[0],"autoUpdate")):void i()},j=function(e,t,i){return Math.round(e/t)*t-i},X=function(t){var i=t.data(s);e("#mCSB_"+i.idx+"_container,#mCSB_"+i.idx+"_container_wrapper,#mCSB_"+i.idx+"_dragger_vertical,#mCSB_"+i.idx+"_dragger_horizontal").each(function(){K.call(this)})},G=function(t,i,n){function a(e){return l&&h.callbacks[e]&&"function"==typeof h.callbacks[e]}function o(){return[h.callbacks.alwaysTriggerOffsets||b>=w[0]+x,h.callbacks.alwaysTriggerOffsets||-S>=b]}function r(){var e=[p[0].offsetTop,p[0].offsetLeft],i=[v[0].offsetTop,v[0].offsetLeft],s=[p.outerHeight(!1),p.outerWidth(!1)],a=[d.height(),d.width()];t[0].mcs={content:p,top:e[0],left:e[1],draggerTop:i[0],draggerLeft:i[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(s[0])-a[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(s[1])-a[1])),direction:n.dir}}var l=t.data(s),h=l.opt,c={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:h.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(c,n),u=[n.dur,n.drag?0:n.dur],d=e("#mCSB_"+l.idx),p=e("#mCSB_"+l.idx+"_container"),f=p.parent(),m=h.callbacks.onTotalScrollOffset?F.call(t,h.callbacks.onTotalScrollOffset):[0,0],g=h.callbacks.onTotalScrollBackOffset?F.call(t,h.callbacks.onTotalScrollBackOffset):[0,0];if(l.trigger=n.trigger,(0!==f.scrollTop()||0!==f.scrollLeft())&&(e(".mCSB_"+l.idx+"_scrollbar").css("visibility","visible"),f.scrollTop(0).scrollLeft(0)),"_resetY"!==i||l.contentReset.y||(a("onOverflowYNone")&&h.callbacks.onOverflowYNone.call(t[0]),l.contentReset.y=1),"_resetX"!==i||l.contentReset.x||(a("onOverflowXNone")&&h.callbacks.onOverflowXNone.call(t[0]),l.contentReset.x=1),"_resetY"!==i&&"_resetX"!==i){switch(!l.contentReset.y&&t[0].mcs||!l.overflowed[0]||(a("onOverflowY")&&h.callbacks.onOverflowY.call(t[0]),l.contentReset.x=null),!l.contentReset.x&&t[0].mcs||!l.overflowed[1]||(a("onOverflowX")&&h.callbacks.onOverflowX.call(t[0]),l.contentReset.x=null),h.snapAmount&&(i=j(i,h.snapAmount,h.snapOffset)),n.dir){case"x":var v=e("#mCSB_"+l.idx+"_dragger_horizontal"),_="left",b=p[0].offsetLeft,w=[d.width()-p.outerWidth(!1),v.parent().width()-v.width()],y=[i,0===i?0:i/l.scrollRatio.x],x=m[1],S=g[1],k=x>0?x/l.scrollRatio.x:0,T=S>0?S/l.scrollRatio.x:0;break;case"y":var v=e("#mCSB_"+l.idx+"_dragger_vertical"),_="top",b=p[0].offsetTop,w=[d.height()-p.outerHeight(!1),v.parent().height()-v.height()],y=[i,0===i?0:i/l.scrollRatio.y],x=m[0],S=g[0],k=x>0?x/l.scrollRatio.y:0,T=S>0?S/l.scrollRatio.y:0}y[1]<0||0===y[0]&&0===y[1]?y=[0,0]:y[1]>=w[1]?y=[w[0],w[1]]:y[0]=-y[0],t[0].mcs||(r(),a("onInit")&&h.callbacks.onInit.call(t[0])),clearTimeout(p[0].onCompleteTimeout),(l.tweenRunning||!(0===b&&y[0]>=0||b===w[0]&&y[0]<=w[0]))&&(U(v[0],_,Math.round(y[1]),u[1],n.scrollEasing),U(p[0],_,Math.round(y[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!l.tweenRunning&&(a("onScrollStart")&&(r(),h.callbacks.onScrollStart.call(t[0])),l.tweenRunning=!0,C(v),l.cbOffsets=o())},onUpdate:function(){n.callbacks&&n.onUpdate&&a("whileScrolling")&&(r(),h.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===h.axis&&clearTimeout(p[0].onCompleteTimeout);var e=p[0].idleTimer||0;p[0].onCompleteTimeout=setTimeout(function(){a("onScroll")&&(r(),h.callbacks.onScroll.call(t[0])),a("onTotalScroll")&&y[1]>=w[1]-k&&l.cbOffsets[0]&&(r(),h.callbacks.onTotalScroll.call(t[0])),a("onTotalScrollBack")&&y[1]<=T&&l.cbOffsets[1]&&(r(),h.callbacks.onTotalScrollBack.call(t[0])),l.tweenRunning=!1,p[0].idleTimer=0,C(v,"hide")},e)}}}))}},U=function(e,t,i,s,n,a,o){function r(){b.stop||(g||d.call(),g=V()-m,l(),g>=b.time&&(b.time=g>b.time?g+c-(g-b.time):g+c-1,b.time<g+1&&(b.time=g+1)),b.time<s?b.id=u(r):f.call())}function l(){s>0?(b.currVal=h(b.time,v,w,s,n),_[t]=Math.round(b.currVal)+"px"):_[t]=i+"px",p.call()}function h(e,t,i,s,n){switch(n){case"linear":case"mcsLinear":return i*e/s+t;case"mcsLinearOut":return e/=s,e--,i*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=s/2,1>e?i/2*e*e+t:(e--,-i/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=s/2,1>e?i/2*Math.pow(2,10*(e-1))+t:(e--,i/2*(2-Math.pow(2,-10*e))+t);case"easeInOut":case"mcsEaseInOut":return e/=s/2,1>e?i/2*e*e*e+t:(e-=2,i/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=s,e--,-i*(e*e*e*e-1)+t;case"easeOutStrong":return i*(1-Math.pow(2,-10*e/s))+t;case"easeOut":case"mcsEaseOut":default:var a=(e/=s)*e,o=a*e;return t+i*(.499999999999997*o*a+-2.5*a*a+5.5*o+-6.5*a+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var c,u,o=o||{},d=o.onStart||function(){},p=o.onUpdate||function(){},f=o.onComplete||function(){},m=V(),g=0,v=e.offsetTop,_=e.style,b=e._mTween[t];"left"===t&&(v=e.offsetLeft);var w=i-v;b.stop=0,"none"!==a&&function(){null!=b.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(b.id):clearTimeout(b.id),b.id=null)}(),function(){c=1e3/60,b.time=g+c,u=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return l(),setTimeout(e,.01)},b.id=u(r)}()},V=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},K=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],i=0;i<t.length;i++){var s=t[i];e._mTween[s].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[s].id):clearTimeout(e._mTween[s].id),e._mTween[s].id=null,e._mTween[s].stop=1)}},Q=function(e,t){try{delete e[t]}catch(i){e[t]=null}},Z=function(e){return!(e.which&&1!==e.which)},J=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},ee=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},te=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]};e.fn[i]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[i]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[i].defaults=a,window[i]=!0,e(window).load(function(){e(n)[i](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var i,s,n=e(t),a=n.parents(".mCSB_container");if(a.length)return i=a.parent(),s=[a[0].offsetTop,a[0].offsetLeft],s[0]+te(n)[0]>=0&&s[0]+te(n)[0]<i.height()-n.outerHeight(!1)&&s[1]+te(n)[1]>=0&&s[1]+te(n)[1]<i.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var i=e(t).data(s);if(i)return i.overflowed[0]||i.overflowed[1]}})})}()}()}),/*!
 * jQuery Placeholder Plugin v2.3.1
 * https://github.com/mathiasbynens/jquery-placeholder
 *
 * Copyright 2011, 2015 Mathias Bynens
 * Released under the MIT license
 */
function(e){"function"==typeof define&&define.amd?
// AMD
define(["jquery"],e):e("object"==typeof module&&module.exports?require("jquery"):jQuery)}(function(e){function t(t){
// Return an object of element attributes
var i={},s=/^jQuery\d+$/;return e.each(t.attributes,function(e,t){t.specified&&!s.test(t.name)&&(i[t.name]=t.value)}),i}function i(t,i){var s=this,a=e(this);if(s.value===a.attr(r?"placeholder-x":"placeholder")&&a.hasClass(p.customClass))if(s.value="",a.removeClass(p.customClass),a.data("placeholder-password")){
// If `clearPlaceholder` was called from `$.valHooks.input.set`
if(a=a.hide().nextAll('input[type="password"]:first').show().attr("id",a.removeAttr("id").data("placeholder-id")),!0===t)return a[0].value=i,i;a.focus()}else s==n()&&s.select()}function s(s){var n,a=this,o=e(this),l=a.id;
// If the placeholder is activated, triggering blur event (`$input.trigger('blur')`) should do nothing.
if(!s||"blur"!==s.type||!o.hasClass(p.customClass))if(""===a.value){if("password"===a.type){if(!o.data("placeholder-textinput")){try{n=o.clone().prop({type:"text"})}catch(i){n=e("<input>").attr(e.extend(t(this),{type:"text"}))}n.removeAttr("name").data({"placeholder-enabled":!0,"placeholder-password":o,"placeholder-id":l}).bind("focus.placeholder",i),o.data({"placeholder-textinput":n,"placeholder-id":l}).before(n)}a.value="",o=o.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id",o.data("placeholder-id")).show()}else{var h=o.data("placeholder-password");h&&(h[0].value="",o.attr("id",o.data("placeholder-id")).show().nextAll('input[type="password"]:last').hide().removeAttr("id"))}o.addClass(p.customClass),o[0].value=o.attr(r?"placeholder-x":"placeholder")}else o.removeClass(p.customClass)}function n(){
// Avoid IE9 `document.activeElement` of death
try{return document.activeElement}catch(e){}}/****
     * Allows plugin behavior simulation in modern browsers for easier debugging. 
     * When setting to true, use attribute "placeholder-x" rather than the usual "placeholder" in your inputs/textareas 
     * i.e. <input type="text" placeholder-x="my placeholder text" />
     */
var a,o,r=!1,l="[object OperaMini]"===Object.prototype.toString.call(window.operamini),h="placeholder"in document.createElement("input")&&!l&&!r,c="placeholder"in document.createElement("textarea")&&!l&&!r,u=e.valHooks,d=e.propHooks,p={};h&&c?(o=e.fn.placeholder=function(){return this},o.input=!0,o.textarea=!0):(o=e.fn.placeholder=function(t){var n={customClass:"placeholder"};return p=e.extend({},n,t),this.filter((h?"textarea":":input")+"["+(r?"placeholder-x":"placeholder")+"]").not("."+p.customClass).not(":radio, :checkbox, [type=hidden]").bind({"focus.placeholder":i,"blur.placeholder":s}).data("placeholder-enabled",!0).trigger("blur.placeholder")},o.input=h,o.textarea=c,a={get:function(t){var i=e(t),s=i.data("placeholder-password");return s?s[0].value:i.data("placeholder-enabled")&&i.hasClass(p.customClass)?"":t.value},set:function(t,a){var o,r,l=e(t);
// Setting the placeholder causes problems if the element continues to have focus.
// We can't use `triggerHandler` here because of dummy text/password inputs :(
return""!==a&&(o=l.data("placeholder-textinput"),r=l.data("placeholder-password"),o?(i.call(o[0],!0,a)||(t.value=a),o[0].value=a):r&&(i.call(t,!0,a)||(r[0].value=a),t.value=a)),l.data("placeholder-enabled")?(""===a?(t.value=a,t!=n()&&s.call(t)):(l.hasClass(p.customClass)&&i.call(t),t.value=a),l):(t.value=a,l)}},h||(u.input=a,d.value=a),c||(u.textarea=a,d.value=a),e(function(){
// Look for forms
e(document).delegate("form","submit.placeholder",function(){
// Clear the placeholder values so they don't get submitted
var t=e("."+p.customClass,this).each(function(){i.call(this,!0,"")});setTimeout(function(){t.each(s)},10)})}),
// Clear placeholder values upon page reload
e(window).bind("beforeunload.placeholder",function(){var t=!0;try{
// Prevent IE javascript:void(0) anchors from causing cleared values
"javascript:void(0)"===document.activeElement.toString()&&(t=!1)}catch(e){}t&&e("."+p.customClass).each(function(){this.value=""})}))}),/*
 * jQuery UI Touch Punch 0.2.2
 * https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.2/jquery.ui.touch-punch.min.js
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
/*
*/
function(e){function t(e,t){if(!(e.originalEvent.touches.length>1)){e.preventDefault();var i=e.originalEvent.changedTouches[0],s=document.createEvent("MouseEvents");s.initMouseEvent(t,!0,!0,window,1,i.screenX,i.screenY,i.clientX,i.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(s)}}if(e.support.touch="ontouchend"in document,e.support.touch){var i,s=e.ui.mouse.prototype,n=s._mouseInit;s._touchStart=function(e){var s=this;!i&&s._mouseCapture(e.originalEvent.changedTouches[0])&&(i=!0,s._touchMoved=!1,t(e,"mouseover"),t(e,"mousemove"),t(e,"mousedown"))},s._touchMove=function(e){i&&(this._touchMoved=!0,t(e,"mousemove"))},s._touchEnd=function(e){i&&(t(e,"mouseup"),t(e,"mouseout"),this._touchMoved||t(e,"click"),i=!1)},s._mouseInit=function(){var t=this;t.element.bind("touchstart",e.proxy(t,"_touchStart")).bind("touchmove",e.proxy(t,"_touchMove")).bind("touchend",e.proxy(t,"_touchEnd")),n.call(t)}}}(jQuery),function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,i){return void 0===i&&(i="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(i),i}:e(jQuery)}(function(e){var t=function(){if(e&&e.fn&&e.fn.select2&&e.fn.select2.amd)var t=e.fn.select2.amd;var t;return function(){if(!t||!t.requirejs){t?i=t:t={};var e,i,s;!function(t){function n(e,t){return y.call(e,t)}function a(e,t){var i,s,n,a,o,r,l,h,c,u,d,p,f=t&&t.split("/"),m=b.map,g=m&&m["*"]||{};if(e){for(e=e.split("/"),o=e.length-1,b.nodeIdCompat&&C.test(e[o])&&(e[o]=e[o].replace(C,"")),"."===e[0].charAt(0)&&f&&(p=f.slice(0,f.length-1),e=p.concat(e)),c=0;c<e.length;c++)if("."===(d=e[c]))e.splice(c,1),c-=1;else if(".."===d){if(0===c||1===c&&".."===e[2]||".."===e[c-1])continue;c>0&&(e.splice(c-1,2),c-=2)}e=e.join("/")}if((f||g)&&m){for(i=e.split("/"),c=i.length;c>0;c-=1){if(s=i.slice(0,c).join("/"),f)for(u=f.length;u>0;u-=1)if((n=m[f.slice(0,u).join("/")])&&(n=n[s])){a=n,r=c;break}if(a)break;!l&&g&&g[s]&&(l=g[s],h=c)}!a&&l&&(a=l,r=h),a&&(i.splice(0,r,a),e=i.join("/"))}return e}function o(e,i){return function(){var s=x.call(arguments,0);return"string"!=typeof s[0]&&1===s.length&&s.push(null),f.apply(t,s.concat([e,i]))}}function r(e){return function(t){return a(t,e)}}function l(e){return function(t){v[e]=t}}function h(e){if(n(_,e)){var i=_[e];delete _[e],w[e]=!0,p.apply(t,i)}if(!n(v,e)&&!n(w,e))throw new Error("No "+e);return v[e]}function c(e){var t,i=e?e.indexOf("!"):-1;return i>-1&&(t=e.substring(0,i),e=e.substring(i+1,e.length)),[t,e]}function u(e){return e?c(e):[]}function d(e){return function(){return b&&b.config&&b.config[e]||{}}}var p,f,m,g,v={},_={},b={},w={},y=Object.prototype.hasOwnProperty,x=[].slice,C=/\.js$/;m=function(e,t){var i,s=c(e),n=s[0],o=t[1];return e=s[1],n&&(n=a(n,o),i=h(n)),n?e=i&&i.normalize?i.normalize(e,r(o)):a(e,o):(e=a(e,o),s=c(e),n=s[0],e=s[1],n&&(i=h(n))),{f:n?n+"!"+e:e,n:e,pr:n,p:i}},g={require:function(e){return o(e)},exports:function(e){var t=v[e];return void 0!==t?t:v[e]={}},module:function(e){return{id:e,uri:"",exports:v[e],config:d(e)}}},p=function(e,i,s,a){var r,c,d,p,f,b,y,x=[],C=typeof s;if(a=a||e,b=u(a),"undefined"===C||"function"===C){for(i=!i.length&&s.length?["require","exports","module"]:i,f=0;f<i.length;f+=1)if(p=m(i[f],b),"require"===(c=p.f))x[f]=g.require(e);else if("exports"===c)x[f]=g.exports(e),y=!0;else if("module"===c)r=x[f]=g.module(e);else if(n(v,c)||n(_,c)||n(w,c))x[f]=h(c);else{if(!p.p)throw new Error(e+" missing "+c);p.p.load(p.n,o(a,!0),l(c),{}),x[f]=v[c]}d=s?s.apply(v[e],x):void 0,e&&(r&&r.exports!==t&&r.exports!==v[e]?v[e]=r.exports:d===t&&y||(v[e]=d))}else e&&(v[e]=s)},e=i=f=function(e,i,s,n,a){if("string"==typeof e)return g[e]?g[e](i):h(m(e,u(i)).f);if(!e.splice){if(b=e,b.deps&&f(b.deps,b.callback),!i)return;i.splice?(e=i,i=s,s=null):e=t}return i=i||function(){},"function"==typeof s&&(s=n,n=a),n?p(t,e,i,s):setTimeout(function(){p(t,e,i,s)},4),f},f.config=function(e){return f(e)},e._defined=v,s=function(e,t,i){if("string"!=typeof e)throw new Error("See almond README: incorrect module build, no module name");t.splice||(i=t,t=[]),n(v,e)||n(_,e)||(_[e]=[e,t,i])},s.amd={jQuery:!0}}(),t.requirejs=e,t.require=i,t.define=s}}(),t.define("almond",function(){}),t.define("jquery",[],function(){var t=e||$;return null==t&&console&&console.error,t}),t.define("select2/utils",["jquery"],function(e){function t(e){var t=e.prototype,i=[];for(var s in t)"function"==typeof t[s]&&"constructor"!==s&&i.push(s);return i}var i={};i.Extend=function(e,t){function i(){this.constructor=e}var s={}.hasOwnProperty;for(var n in t)s.call(t,n)&&(e[n]=t[n]);return i.prototype=t.prototype,e.prototype=new i,e.__super__=t.prototype,e},i.Decorate=function(e,i){function s(){var t=Array.prototype.unshift,s=i.prototype.constructor.length,n=e.prototype.constructor;s>0&&(t.call(arguments,e.prototype.constructor),n=i.prototype.constructor),n.apply(this,arguments)}function n(){this.constructor=s}var a=t(i),o=t(e);i.displayName=e.displayName,s.prototype=new n;for(var r=0;r<o.length;r++){var l=o[r];s.prototype[l]=e.prototype[l]}for(var h=0;h<a.length;h++){var c=a[h];s.prototype[c]=function(e){var t=function(){};e in s.prototype&&(t=s.prototype[e]);var n=i.prototype[e];return function(){return Array.prototype.unshift.call(arguments,t),n.apply(this,arguments)}}(c)}return s};var s=function(){this.listeners={}};s.prototype.on=function(e,t){this.listeners=this.listeners||{},e in this.listeners?this.listeners[e].push(t):this.listeners[e]=[t]},s.prototype.trigger=function(e){var t=Array.prototype.slice,i=t.call(arguments,1);this.listeners=this.listeners||{},null==i&&(i=[]),0===i.length&&i.push({}),i[0]._type=e,e in this.listeners&&this.invoke(this.listeners[e],t.call(arguments,1)),"*"in this.listeners&&this.invoke(this.listeners["*"],arguments)},s.prototype.invoke=function(e,t){for(var i=0,s=e.length;i<s;i++)e[i].apply(this,t)},i.Observable=s,i.generateChars=function(e){for(var t="",i=0;i<e;i++)t+=Math.floor(36*Math.random()).toString(36);return t},i.bind=function(e,t){return function(){e.apply(t,arguments)}},i._convertData=function(e){for(var t in e){var i=t.split("-"),s=e;if(1!==i.length){for(var n=0;n<i.length;n++){var a=i[n];a=a.substring(0,1).toLowerCase()+a.substring(1),a in s||(s[a]={}),n==i.length-1&&(s[a]=e[t]),s=s[a]}delete e[t]}}return e},i.hasScroll=function(t,i){var s=e(i),n=i.style.overflowX,a=i.style.overflowY;return(n!==a||"hidden"!==a&&"visible"!==a)&&("scroll"===n||"scroll"===a||s.innerHeight()<i.scrollHeight||s.innerWidth()<i.scrollWidth)},i.escapeMarkup=function(e){var t={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return"string"!=typeof e?e:String(e).replace(/[&<>"'\/\\]/g,function(e){return t[e]})},i.appendMany=function(t,i){if("1.7"===e.fn.jquery.substr(0,3)){var s=e();e.map(i,function(e){s=s.add(e)}),i=s}t.append(i)},i.__cache={};var n=0;return i.GetUniqueElementId=function(e){var t=e.getAttribute("data-select2-id");return null==t&&(e.id?(t=e.id,e.setAttribute("data-select2-id",t)):(e.setAttribute("data-select2-id",++n),t=n.toString())),t},i.StoreData=function(e,t,s){var n=i.GetUniqueElementId(e);i.__cache[n]||(i.__cache[n]={}),i.__cache[n][t]=s},i.GetData=function(t,s){var n=i.GetUniqueElementId(t);return s?i.__cache[n]&&null!=i.__cache[n][s]?i.__cache[n][s]:e(t).data(s):i.__cache[n]},i.RemoveData=function(e){var t=i.GetUniqueElementId(e);null!=i.__cache[t]&&delete i.__cache[t]},i}),t.define("select2/results",["jquery","./utils"],function(e,t){function i(e,t,s){this.$element=e,this.data=s,this.options=t,i.__super__.constructor.call(this)}return t.Extend(i,t.Observable),i.prototype.render=function(){var t=e('<ul class="select2-results__options" role="tree"></ul>');return this.options.get("multiple")&&t.attr("aria-multiselectable","true"),this.$results=t,t},i.prototype.clear=function(){this.$results.empty()},i.prototype.displayMessage=function(t){var i=this.options.get("escapeMarkup");this.clear(),this.hideLoading();var s=e('<li role="treeitem" aria-live="assertive" class="select2-results__option"></li>'),n=this.options.get("translations").get(t.message);s.append(i(n(t.args))),s[0].className+=" select2-results__message",this.$results.append(s)},i.prototype.hideMessages=function(){this.$results.find(".select2-results__message").remove()},i.prototype.append=function(e){this.hideLoading();var t=[];if(null==e.results||0===e.results.length)return void(0===this.$results.children().length&&this.trigger("results:message",{message:"noResults"}));e.results=this.sort(e.results);for(var i=0;i<e.results.length;i++){var s=e.results[i],n=this.option(s);t.push(n)}this.$results.append(t)},i.prototype.position=function(e,t){t.find(".select2-results").append(e)},i.prototype.sort=function(e){return this.options.get("sorter")(e)},i.prototype.highlightFirstItem=function(){var e=this.$results.find(".select2-results__option[aria-selected]"),t=e.filter("[aria-selected=true]");t.length>0?t.first().trigger("mouseenter"):e.first().trigger("mouseenter"),this.ensureHighlightVisible()},i.prototype.setClasses=function(){var i=this;this.data.current(function(s){var n=e.map(s,function(e){return e.id.toString()});i.$results.find(".select2-results__option[aria-selected]").each(function(){var i=e(this),s=t.GetData(this,"data"),a=""+s.id;null!=s.element&&s.element.selected||null==s.element&&e.inArray(a,n)>-1?i.attr("aria-selected","true"):i.attr("aria-selected","false")})})},i.prototype.showLoading=function(e){this.hideLoading();var t=this.options.get("translations").get("searching"),i={disabled:!0,loading:!0,text:t(e)},s=this.option(i);s.className+=" loading-results",this.$results.prepend(s)},i.prototype.hideLoading=function(){this.$results.find(".loading-results").remove()},i.prototype.option=function(i){var s=document.createElement("li");s.className="select2-results__option";var n={role:"treeitem","aria-selected":"false"};i.disabled&&(delete n["aria-selected"],n["aria-disabled"]="true"),null==i.id&&delete n["aria-selected"],null!=i._resultId&&(s.id=i._resultId),i.title&&(s.title=i.title),i.children&&(n.role="group",n["aria-label"]=i.text,delete n["aria-selected"]);for(var a in n){var o=n[a];s.setAttribute(a,o)}if(i.children){var r=e(s),l=document.createElement("strong");l.className="select2-results__group",e(l),this.template(i,l);for(var h=[],c=0;c<i.children.length;c++){var u=i.children[c],d=this.option(u);h.push(d)}var p=e("<ul></ul>",{class:"select2-results__options select2-results__options--nested"});p.append(h),r.append(l),r.append(p)}else this.template(i,s);return t.StoreData(s,"data",i),s},i.prototype.bind=function(i,s){var n=this,a=i.id+"-results";this.$results.attr("id",a),i.on("results:all",function(e){n.clear(),n.append(e.data),i.isOpen()&&(n.setClasses(),n.highlightFirstItem())}),i.on("results:append",function(e){n.append(e.data),i.isOpen()&&n.setClasses()}),i.on("query",function(e){n.hideMessages(),n.showLoading(e)}),i.on("select",function(){i.isOpen()&&(n.setClasses(),n.highlightFirstItem())}),i.on("unselect",function(){i.isOpen()&&(n.setClasses(),n.highlightFirstItem())}),i.on("open",function(){n.$results.attr("aria-expanded","true"),n.$results.attr("aria-hidden","false"),n.setClasses(),n.ensureHighlightVisible()}),i.on("close",function(){n.$results.attr("aria-expanded","false"),n.$results.attr("aria-hidden","true"),n.$results.removeAttr("aria-activedescendant")}),i.on("results:toggle",function(){var e=n.getHighlightedResults();0!==e.length&&e.trigger("mouseup")}),i.on("results:select",function(){var e=n.getHighlightedResults();if(0!==e.length){var i=t.GetData(e[0],"data");"true"==e.attr("aria-selected")?n.trigger("close",{}):n.trigger("select",{data:i})}}),i.on("results:previous",function(){var e=n.getHighlightedResults(),t=n.$results.find("[aria-selected]"),i=t.index(e);if(!(i<=0)){var s=i-1;0===e.length&&(s=0);var a=t.eq(s);a.trigger("mouseenter");var o=n.$results.offset().top,r=a.offset().top,l=n.$results.scrollTop()+(r-o);0===s?n.$results.scrollTop(0):r-o<0&&n.$results.scrollTop(l)}}),i.on("results:next",function(){var e=n.getHighlightedResults(),t=n.$results.find("[aria-selected]"),i=t.index(e),s=i+1;if(!(s>=t.length)){var a=t.eq(s);a.trigger("mouseenter");var o=n.$results.offset().top+n.$results.outerHeight(!1),r=a.offset().top+a.outerHeight(!1),l=n.$results.scrollTop()+r-o;0===s?n.$results.scrollTop(0):r>o&&n.$results.scrollTop(l)}}),i.on("results:focus",function(e){e.element.addClass("select2-results__option--highlighted")}),i.on("results:message",function(e){n.displayMessage(e)}),e.fn.mousewheel&&this.$results.on("mousewheel",function(e){var t=n.$results.scrollTop(),i=n.$results.get(0).scrollHeight-t+e.deltaY,s=e.deltaY>0&&t-e.deltaY<=0,a=e.deltaY<0&&i<=n.$results.height();s?(n.$results.scrollTop(0),e.preventDefault(),e.stopPropagation()):a&&(n.$results.scrollTop(n.$results.get(0).scrollHeight-n.$results.height()),e.preventDefault(),e.stopPropagation())}),this.$results.on("mouseup",".select2-results__option[aria-selected]",function(i){var s=e(this),a=t.GetData(this,"data");if("true"===s.attr("aria-selected"))return void(n.options.get("multiple")?n.trigger("unselect",{originalEvent:i,data:a}):n.trigger("close",{}));n.trigger("select",{originalEvent:i,data:a})}),this.$results.on("mouseenter",".select2-results__option[aria-selected]",function(i){var s=t.GetData(this,"data");n.getHighlightedResults().removeClass("select2-results__option--highlighted"),n.trigger("results:focus",{data:s,element:e(this)})})},i.prototype.getHighlightedResults=function(){return this.$results.find(".select2-results__option--highlighted")},i.prototype.destroy=function(){this.$results.remove()},i.prototype.ensureHighlightVisible=function(){var e=this.getHighlightedResults();if(0!==e.length){var t=this.$results.find("[aria-selected]"),i=t.index(e),s=this.$results.offset().top,n=e.offset().top,a=this.$results.scrollTop()+(n-s),o=n-s;a-=2*e.outerHeight(!1),i<=2?this.$results.scrollTop(0):(o>this.$results.outerHeight()||o<0)&&this.$results.scrollTop(a)}},i.prototype.template=function(t,i){var s=this.options.get("templateResult"),n=this.options.get("escapeMarkup"),a=s(t,i);null==a?i.style.display="none":"string"==typeof a?i.innerHTML=n(a):e(i).append(a)},i}),t.define("select2/keys",[],function(){return{BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46}}),t.define("select2/selection/base",["jquery","../utils","../keys"],function(e,t,i){function s(e,t){this.$element=e,this.options=t,s.__super__.constructor.call(this)}return t.Extend(s,t.Observable),s.prototype.render=function(){var i=e('<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>');return this._tabindex=0,null!=t.GetData(this.$element[0],"old-tabindex")?this._tabindex=t.GetData(this.$element[0],"old-tabindex"):null!=this.$element.attr("tabindex")&&(this._tabindex=this.$element.attr("tabindex")),i.attr("title",this.$element.attr("title")),i.attr("tabindex",this._tabindex),this.$selection=i,i},s.prototype.bind=function(e,t){var s=this,n=(e.id,e.id+"-results");this.container=e,this.$selection.on("focus",function(e){s.trigger("focus",e)}),this.$selection.on("blur",function(e){s._handleBlur(e)}),this.$selection.on("keydown",function(e){s.trigger("keypress",e),e.which===i.SPACE&&e.preventDefault()}),e.on("results:focus",function(e){s.$selection.attr("aria-activedescendant",e.data._resultId)}),e.on("selection:update",function(e){s.update(e.data)}),e.on("open",function(){s.$selection.attr("aria-expanded","true"),s.$selection.attr("aria-owns",n),s._attachCloseHandler(e)}),e.on("close",function(){s.$selection.attr("aria-expanded","false"),s.$selection.removeAttr("aria-activedescendant"),s.$selection.removeAttr("aria-owns"),s.$selection.focus(),window.setTimeout(function(){s.$selection.focus()},0),s._detachCloseHandler(e)}),e.on("enable",function(){s.$selection.attr("tabindex",s._tabindex)}),e.on("disable",function(){s.$selection.attr("tabindex","-1")})},s.prototype._handleBlur=function(t){var i=this;window.setTimeout(function(){document.activeElement==i.$selection[0]||e.contains(i.$selection[0],document.activeElement)||i.trigger("blur",t)},1)},s.prototype._attachCloseHandler=function(i){e(document.body).on("mousedown.select2."+i.id,function(i){var s=e(i.target),n=s.closest(".select2");e(".select2.select2-container--open").each(function(){e(this),this!=n[0]&&t.GetData(this,"element").select2("close")})})},s.prototype._detachCloseHandler=function(t){e(document.body).off("mousedown.select2."+t.id)},s.prototype.position=function(e,t){t.find(".selection").append(e)},s.prototype.destroy=function(){this._detachCloseHandler(this.container)},s.prototype.update=function(e){throw new Error("The `update` method must be defined in child classes.")},s}),t.define("select2/selection/single",["jquery","./base","../utils","../keys"],function(e,t,i,s){function n(){n.__super__.constructor.apply(this,arguments)}return i.Extend(n,t),n.prototype.render=function(){var e=n.__super__.render.call(this);return e.addClass("select2-selection--single"),e.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'),e},n.prototype.bind=function(e,t){var i=this;n.__super__.bind.apply(this,arguments);var s=e.id+"-container";this.$selection.find(".select2-selection__rendered").attr("id",s).attr("role","textbox").attr("aria-readonly","true"),this.$selection.attr("aria-labelledby",s),this.$selection.on("mousedown",function(e){1===e.which&&i.trigger("toggle",{originalEvent:e})}),this.$selection.on("focus",function(e){}),this.$selection.on("blur",function(e){}),e.on("focus",function(t){e.isOpen()||i.$selection.focus()})},n.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},n.prototype.display=function(e,t){var i=this.options.get("templateSelection");return this.options.get("escapeMarkup")(i(e,t))},n.prototype.selectionContainer=function(){return e("<span></span>")},n.prototype.update=function(e){if(0===e.length)return void this.clear();var t=e[0],i=this.$selection.find(".select2-selection__rendered"),s=this.display(t,i);i.empty().append(s),i.attr("title",t.title||t.text)},n}),t.define("select2/selection/multiple",["jquery","./base","../utils"],function(e,t,i){function s(e,t){s.__super__.constructor.apply(this,arguments)}return i.Extend(s,t),s.prototype.render=function(){var e=s.__super__.render.call(this);return e.addClass("select2-selection--multiple"),e.html('<ul class="select2-selection__rendered"></ul>'),e},s.prototype.bind=function(t,n){var a=this;s.__super__.bind.apply(this,arguments),this.$selection.on("click",function(e){a.trigger("toggle",{originalEvent:e})}),this.$selection.on("click",".select2-selection__choice__remove",function(t){if(!a.options.get("disabled")){var s=e(this),n=s.parent(),o=i.GetData(n[0],"data");a.trigger("unselect",{originalEvent:t,data:o})}})},s.prototype.clear=function(){var e=this.$selection.find(".select2-selection__rendered");e.empty(),e.removeAttr("title")},s.prototype.display=function(e,t){var i=this.options.get("templateSelection");return this.options.get("escapeMarkup")(i(e,t))},s.prototype.selectionContainer=function(){return e('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>')},s.prototype.update=function(e){if(this.clear(),0!==e.length){for(var t=[],s=0;s<e.length;s++){var n=e[s],a=this.selectionContainer(),o=this.display(n,a);a.append(o),a.attr("title",n.title||n.text),i.StoreData(a[0],"data",n),t.push(a)}var r=this.$selection.find(".select2-selection__rendered");i.appendMany(r,t)}},s}),t.define("select2/selection/placeholder",["../utils"],function(e){function t(e,t,i){this.placeholder=this.normalizePlaceholder(i.get("placeholder")),e.call(this,t,i)}return t.prototype.normalizePlaceholder=function(e,t){return"string"==typeof t&&(t={id:"",text:t}),t},t.prototype.createPlaceholder=function(e,t){var i=this.selectionContainer();return i.html(this.display(t)),i.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"),i},t.prototype.update=function(e,t){var i=1==t.length&&t[0].id!=this.placeholder.id;if(t.length>1||i)return e.call(this,t);this.clear();var s=this.createPlaceholder(this.placeholder);this.$selection.find(".select2-selection__rendered").append(s)},t}),t.define("select2/selection/allowClear",["jquery","../keys","../utils"],function(e,t,i){function s(){}return s.prototype.bind=function(e,t,i){var s=this;e.call(this,t,i),null==this.placeholder&&this.options.get("debug")&&window.console&&console.error,this.$selection.on("mousedown",".select2-selection__clear",function(e){s._handleClear(e)}),t.on("keypress",function(e){s._handleKeyboardClear(e,t)})},s.prototype._handleClear=function(e,t){if(!this.options.get("disabled")){var s=this.$selection.find(".select2-selection__clear");if(0!==s.length){t.stopPropagation();var n=i.GetData(s[0],"data"),a=this.$element.val();this.$element.val(this.placeholder.id);var o={data:n};if(this.trigger("clear",o),o.prevented)return void this.$element.val(a);for(var r=0;r<n.length;r++)if(o={data:n[r]},this.trigger("unselect",o),o.prevented)return void this.$element.val(a);this.$element.trigger("change"),this.trigger("toggle",{})}}},s.prototype._handleKeyboardClear=function(e,i,s){s.isOpen()||i.which!=t.DELETE&&i.which!=t.BACKSPACE||this._handleClear(i)},s.prototype.update=function(t,s){if(t.call(this,s),!(this.$selection.find(".select2-selection__placeholder").length>0||0===s.length)){var n=e('<span class="select2-selection__clear">&times;</span>');i.StoreData(n[0],"data",s),this.$selection.find(".select2-selection__rendered").prepend(n)}},s}),t.define("select2/selection/search",["jquery","../utils","../keys"],function(e,t,i){function s(e,t,i){e.call(this,t,i)}return s.prototype.render=function(t){var i=e('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" aria-autocomplete="list" /></li>');this.$searchContainer=i,this.$search=i.find("input");var s=t.call(this);return this._transferTabIndex(),s},s.prototype.bind=function(e,s,n){var a=this;e.call(this,s,n),s.on("open",function(){a.$search.trigger("focus")}),s.on("close",function(){a.$search.val(""),a.$search.removeAttr("aria-activedescendant"),a.$search.trigger("focus")}),s.on("enable",function(){a.$search.prop("disabled",!1),a._transferTabIndex()}),s.on("disable",function(){a.$search.prop("disabled",!0)}),s.on("focus",function(e){a.$search.trigger("focus")}),s.on("results:focus",function(e){a.$search.attr("aria-activedescendant",e.id)}),this.$selection.on("focusin",".select2-search--inline",function(e){a.trigger("focus",e)}),this.$selection.on("focusout",".select2-search--inline",function(e){a._handleBlur(e)}),this.$selection.on("keydown",".select2-search--inline",function(e){if(e.stopPropagation(),a.trigger("keypress",e),a._keyUpPrevented=e.isDefaultPrevented(),e.which===i.BACKSPACE&&""===a.$search.val()){var s=a.$searchContainer.prev(".select2-selection__choice");if(s.length>0){var n=t.GetData(s[0],"data");a.searchRemoveChoice(n),e.preventDefault()}}});var o=document.documentMode,r=o&&o<=11;this.$selection.on("input.searchcheck",".select2-search--inline",function(e){if(r)return void a.$selection.off("input.search input.searchcheck");a.$selection.off("keyup.search")}),this.$selection.on("keyup.search input.search",".select2-search--inline",function(e){if(r&&"input"===e.type)return void a.$selection.off("input.search input.searchcheck");var t=e.which;t!=i.SHIFT&&t!=i.CTRL&&t!=i.ALT&&t!=i.TAB&&a.handleSearch(e)})},s.prototype._transferTabIndex=function(e){this.$search.attr("tabindex",this.$selection.attr("tabindex")),this.$selection.attr("tabindex","-1")},s.prototype.createPlaceholder=function(e,t){this.$search.attr("placeholder",t.text)},s.prototype.update=function(e,t){var i=this.$search[0]==document.activeElement;this.$search.attr("placeholder",""),e.call(this,t),this.$selection.find(".select2-selection__rendered").append(this.$searchContainer),this.resizeSearch(),i&&(this.$element.find("[data-select2-tag]").length?this.$element.focus():this.$search.focus())},s.prototype.handleSearch=function(){if(this.resizeSearch(),!this._keyUpPrevented){var e=this.$search.val();this.trigger("query",{term:e})}this._keyUpPrevented=!1},s.prototype.searchRemoveChoice=function(e,t){this.trigger("unselect",{data:t}),this.$search.val(t.text),this.handleSearch()},s.prototype.resizeSearch=function(){this.$search.css("width","25px");var e="";e=""!==this.$search.attr("placeholder")?this.$selection.find(".select2-selection__rendered").innerWidth():.75*(this.$search.val().length+1)+"em",this.$search.css("width",e)},s}),t.define("select2/selection/eventRelay",["jquery"],function(e){function t(){}return t.prototype.bind=function(t,i,s){var n=this,a=["open","opening","close","closing","select","selecting","unselect","unselecting","clear","clearing"],o=["opening","closing","selecting","unselecting","clearing"];t.call(this,i,s),i.on("*",function(t,i){if(-1!==e.inArray(t,a)){i=i||{};var s=e.Event("select2:"+t,{params:i});n.$element.trigger(s),-1!==e.inArray(t,o)&&(i.prevented=s.isDefaultPrevented())}})},t}),t.define("select2/translation",["jquery","require"],function(e,t){function i(e){this.dict=e||{}}return i.prototype.all=function(){return this.dict},i.prototype.get=function(e){return this.dict[e]},i.prototype.extend=function(t){this.dict=e.extend({},t.all(),this.dict)},i._cache={},i.loadPath=function(e){if(!(e in i._cache)){var s=t(e);i._cache[e]=s}return new i(i._cache[e])},i}),t.define("select2/diacritics",[],function(){return{"Ⓐ":"A","Ａ":"A","À":"A","Á":"A","Â":"A","Ầ":"A","Ấ":"A","Ẫ":"A","Ẩ":"A","Ã":"A","Ā":"A","Ă":"A","Ằ":"A","Ắ":"A","Ẵ":"A","Ẳ":"A","Ȧ":"A","Ǡ":"A","Ä":"A","Ǟ":"A","Ả":"A","Å":"A","Ǻ":"A","Ǎ":"A","Ȁ":"A","Ȃ":"A","Ạ":"A","Ậ":"A","Ặ":"A","Ḁ":"A","Ą":"A","Ⱥ":"A","Ɐ":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ⓑ":"B","Ｂ":"B","Ḃ":"B","Ḅ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ɓ":"B","Ⓒ":"C","Ｃ":"C","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","Ç":"C","Ḉ":"C","Ƈ":"C","Ȼ":"C","Ꜿ":"C","Ⓓ":"D","Ｄ":"D","Ḋ":"D","Ď":"D","Ḍ":"D","Ḑ":"D","Ḓ":"D","Ḏ":"D","Đ":"D","Ƌ":"D","Ɗ":"D","Ɖ":"D","Ꝺ":"D","Ǳ":"DZ","Ǆ":"DZ","ǲ":"Dz","ǅ":"Dz","Ⓔ":"E","Ｅ":"E","È":"E","É":"E","Ê":"E","Ề":"E","Ế":"E","Ễ":"E","Ể":"E","Ẽ":"E","Ē":"E","Ḕ":"E","Ḗ":"E","Ĕ":"E","Ė":"E","Ë":"E","Ẻ":"E","Ě":"E","Ȅ":"E","Ȇ":"E","Ẹ":"E","Ệ":"E","Ȩ":"E","Ḝ":"E","Ę":"E","Ḙ":"E","Ḛ":"E","Ɛ":"E","Ǝ":"E","Ⓕ":"F","Ｆ":"F","Ḟ":"F","Ƒ":"F","Ꝼ":"F","Ⓖ":"G","Ｇ":"G","Ǵ":"G","Ĝ":"G","Ḡ":"G","Ğ":"G","Ġ":"G","Ǧ":"G","Ģ":"G","Ǥ":"G","Ɠ":"G","Ꞡ":"G","Ᵹ":"G","Ꝿ":"G","Ⓗ":"H","Ｈ":"H","Ĥ":"H","Ḣ":"H","Ḧ":"H","Ȟ":"H","Ḥ":"H","Ḩ":"H","Ḫ":"H","Ħ":"H","Ⱨ":"H","Ⱶ":"H","Ɥ":"H","Ⓘ":"I","Ｉ":"I","Ì":"I","Í":"I","Î":"I","Ĩ":"I","Ī":"I","Ĭ":"I","İ":"I","Ï":"I","Ḯ":"I","Ỉ":"I","Ǐ":"I","Ȉ":"I","Ȋ":"I","Ị":"I","Į":"I","Ḭ":"I","Ɨ":"I","Ⓙ":"J","Ｊ":"J","Ĵ":"J","Ɉ":"J","Ⓚ":"K","Ｋ":"K","Ḱ":"K","Ǩ":"K","Ḳ":"K","Ķ":"K","Ḵ":"K","Ƙ":"K","Ⱪ":"K","Ꝁ":"K","Ꝃ":"K","Ꝅ":"K","Ꞣ":"K","Ⓛ":"L","Ｌ":"L","Ŀ":"L","Ĺ":"L","Ľ":"L","Ḷ":"L","Ḹ":"L","Ļ":"L","Ḽ":"L","Ḻ":"L","Ł":"L","Ƚ":"L","Ɫ":"L","Ⱡ":"L","Ꝉ":"L","Ꝇ":"L","Ꞁ":"L","Ǉ":"LJ","ǈ":"Lj","Ⓜ":"M","Ｍ":"M","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ɯ":"M","Ⓝ":"N","Ｎ":"N","Ǹ":"N","Ń":"N","Ñ":"N","Ṅ":"N","Ň":"N","Ṇ":"N","Ņ":"N","Ṋ":"N","Ṉ":"N","Ƞ":"N","Ɲ":"N","Ꞑ":"N","Ꞥ":"N","Ǌ":"NJ","ǋ":"Nj","Ⓞ":"O","Ｏ":"O","Ò":"O","Ó":"O","Ô":"O","Ồ":"O","Ố":"O","Ỗ":"O","Ổ":"O","Õ":"O","Ṍ":"O","Ȭ":"O","Ṏ":"O","Ō":"O","Ṑ":"O","Ṓ":"O","Ŏ":"O","Ȯ":"O","Ȱ":"O","Ö":"O","Ȫ":"O","Ỏ":"O","Ő":"O","Ǒ":"O","Ȍ":"O","Ȏ":"O","Ơ":"O","Ờ":"O","Ớ":"O","Ỡ":"O","Ở":"O","Ợ":"O","Ọ":"O","Ộ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Ɔ":"O","Ɵ":"O","Ꝋ":"O","Ꝍ":"O","Ƣ":"OI","Ꝏ":"OO","Ȣ":"OU","Ⓟ":"P","Ｐ":"P","Ṕ":"P","Ṗ":"P","Ƥ":"P","Ᵽ":"P","Ꝑ":"P","Ꝓ":"P","Ꝕ":"P","Ⓠ":"Q","Ｑ":"Q","Ꝗ":"Q","Ꝙ":"Q","Ɋ":"Q","Ⓡ":"R","Ｒ":"R","Ŕ":"R","Ṙ":"R","Ř":"R","Ȑ":"R","Ȓ":"R","Ṛ":"R","Ṝ":"R","Ŗ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꝛ":"R","Ꞧ":"R","Ꞃ":"R","Ⓢ":"S","Ｓ":"S","ẞ":"S","Ś":"S","Ṥ":"S","Ŝ":"S","Ṡ":"S","Š":"S","Ṧ":"S","Ṣ":"S","Ṩ":"S","Ș":"S","Ş":"S","Ȿ":"S","Ꞩ":"S","Ꞅ":"S","Ⓣ":"T","Ｔ":"T","Ṫ":"T","Ť":"T","Ṭ":"T","Ț":"T","Ţ":"T","Ṱ":"T","Ṯ":"T","Ŧ":"T","Ƭ":"T","Ʈ":"T","Ⱦ":"T","Ꞇ":"T","Ꜩ":"TZ","Ⓤ":"U","Ｕ":"U","Ù":"U","Ú":"U","Û":"U","Ũ":"U","Ṹ":"U","Ū":"U","Ṻ":"U","Ŭ":"U","Ü":"U","Ǜ":"U","Ǘ":"U","Ǖ":"U","Ǚ":"U","Ủ":"U","Ů":"U","Ű":"U","Ǔ":"U","Ȕ":"U","Ȗ":"U","Ư":"U","Ừ":"U","Ứ":"U","Ữ":"U","Ử":"U","Ự":"U","Ụ":"U","Ṳ":"U","Ų":"U","Ṷ":"U","Ṵ":"U","Ʉ":"U","Ⓥ":"V","Ｖ":"V","Ṽ":"V","Ṿ":"V","Ʋ":"V","Ꝟ":"V","Ʌ":"V","Ꝡ":"VY","Ⓦ":"W","Ｗ":"W","Ẁ":"W","Ẃ":"W","Ŵ":"W","Ẇ":"W","Ẅ":"W","Ẉ":"W","Ⱳ":"W","Ⓧ":"X","Ｘ":"X","Ẋ":"X","Ẍ":"X","Ⓨ":"Y","Ｙ":"Y","Ỳ":"Y","Ý":"Y","Ŷ":"Y","Ỹ":"Y","Ȳ":"Y","Ẏ":"Y","Ÿ":"Y","Ỷ":"Y","Ỵ":"Y","Ƴ":"Y","Ɏ":"Y","Ỿ":"Y","Ⓩ":"Z","Ｚ":"Z","Ź":"Z","Ẑ":"Z","Ż":"Z","Ž":"Z","Ẓ":"Z","Ẕ":"Z","Ƶ":"Z","Ȥ":"Z","Ɀ":"Z","Ⱬ":"Z","Ꝣ":"Z","ⓐ":"a","ａ":"a","ẚ":"a","à":"a","á":"a","â":"a","ầ":"a","ấ":"a","ẫ":"a","ẩ":"a","ã":"a","ā":"a","ă":"a","ằ":"a","ắ":"a","ẵ":"a","ẳ":"a","ȧ":"a","ǡ":"a","ä":"a","ǟ":"a","ả":"a","å":"a","ǻ":"a","ǎ":"a","ȁ":"a","ȃ":"a","ạ":"a","ậ":"a","ặ":"a","ḁ":"a","ą":"a","ⱥ":"a","ɐ":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ⓑ":"b","ｂ":"b","ḃ":"b","ḅ":"b","ḇ":"b","ƀ":"b","ƃ":"b","ɓ":"b","ⓒ":"c","ｃ":"c","ć":"c","ĉ":"c","ċ":"c","č":"c","ç":"c","ḉ":"c","ƈ":"c","ȼ":"c","ꜿ":"c","ↄ":"c","ⓓ":"d","ｄ":"d","ḋ":"d","ď":"d","ḍ":"d","ḑ":"d","ḓ":"d","ḏ":"d","đ":"d","ƌ":"d","ɖ":"d","ɗ":"d","ꝺ":"d","ǳ":"dz","ǆ":"dz","ⓔ":"e","ｅ":"e","è":"e","é":"e","ê":"e","ề":"e","ế":"e","ễ":"e","ể":"e","ẽ":"e","ē":"e","ḕ":"e","ḗ":"e","ĕ":"e","ė":"e","ë":"e","ẻ":"e","ě":"e","ȅ":"e","ȇ":"e","ẹ":"e","ệ":"e","ȩ":"e","ḝ":"e","ę":"e","ḙ":"e","ḛ":"e","ɇ":"e","ɛ":"e","ǝ":"e","ⓕ":"f","ｆ":"f","ḟ":"f","ƒ":"f","ꝼ":"f","ⓖ":"g","ｇ":"g","ǵ":"g","ĝ":"g","ḡ":"g","ğ":"g","ġ":"g","ǧ":"g","ģ":"g","ǥ":"g","ɠ":"g","ꞡ":"g","ᵹ":"g","ꝿ":"g","ⓗ":"h","ｈ":"h","ĥ":"h","ḣ":"h","ḧ":"h","ȟ":"h","ḥ":"h","ḩ":"h","ḫ":"h","ẖ":"h","ħ":"h","ⱨ":"h","ⱶ":"h","ɥ":"h","ƕ":"hv","ⓘ":"i","ｉ":"i","ì":"i","í":"i","î":"i","ĩ":"i","ī":"i","ĭ":"i","ï":"i","ḯ":"i","ỉ":"i","ǐ":"i","ȉ":"i","ȋ":"i","ị":"i","į":"i","ḭ":"i","ɨ":"i","ı":"i","ⓙ":"j","ｊ":"j","ĵ":"j","ǰ":"j","ɉ":"j","ⓚ":"k","ｋ":"k","ḱ":"k","ǩ":"k","ḳ":"k","ķ":"k","ḵ":"k","ƙ":"k","ⱪ":"k","ꝁ":"k","ꝃ":"k","ꝅ":"k","ꞣ":"k","ⓛ":"l","ｌ":"l","ŀ":"l","ĺ":"l","ľ":"l","ḷ":"l","ḹ":"l","ļ":"l","ḽ":"l","ḻ":"l","ſ":"l","ł":"l","ƚ":"l","ɫ":"l","ⱡ":"l","ꝉ":"l","ꞁ":"l","ꝇ":"l","ǉ":"lj","ⓜ":"m","ｍ":"m","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ɯ":"m","ⓝ":"n","ｎ":"n","ǹ":"n","ń":"n","ñ":"n","ṅ":"n","ň":"n","ṇ":"n","ņ":"n","ṋ":"n","ṉ":"n","ƞ":"n","ɲ":"n","ŉ":"n","ꞑ":"n","ꞥ":"n","ǌ":"nj","ⓞ":"o","ｏ":"o","ò":"o","ó":"o","ô":"o","ồ":"o","ố":"o","ỗ":"o","ổ":"o","õ":"o","ṍ":"o","ȭ":"o","ṏ":"o","ō":"o","ṑ":"o","ṓ":"o","ŏ":"o","ȯ":"o","ȱ":"o","ö":"o","ȫ":"o","ỏ":"o","ő":"o","ǒ":"o","ȍ":"o","ȏ":"o","ơ":"o","ờ":"o","ớ":"o","ỡ":"o","ở":"o","ợ":"o","ọ":"o","ộ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","ɔ":"o","ꝋ":"o","ꝍ":"o","ɵ":"o","ƣ":"oi","ȣ":"ou","ꝏ":"oo","ⓟ":"p","ｐ":"p","ṕ":"p","ṗ":"p","ƥ":"p","ᵽ":"p","ꝑ":"p","ꝓ":"p","ꝕ":"p","ⓠ":"q","ｑ":"q","ɋ":"q","ꝗ":"q","ꝙ":"q","ⓡ":"r","ｒ":"r","ŕ":"r","ṙ":"r","ř":"r","ȑ":"r","ȓ":"r","ṛ":"r","ṝ":"r","ŗ":"r","ṟ":"r","ɍ":"r","ɽ":"r","ꝛ":"r","ꞧ":"r","ꞃ":"r","ⓢ":"s","ｓ":"s","ß":"s","ś":"s","ṥ":"s","ŝ":"s","ṡ":"s","š":"s","ṧ":"s","ṣ":"s","ṩ":"s","ș":"s","ş":"s","ȿ":"s","ꞩ":"s","ꞅ":"s","ẛ":"s","ⓣ":"t","ｔ":"t","ṫ":"t","ẗ":"t","ť":"t","ṭ":"t","ț":"t","ţ":"t","ṱ":"t","ṯ":"t","ŧ":"t","ƭ":"t","ʈ":"t","ⱦ":"t","ꞇ":"t","ꜩ":"tz","ⓤ":"u","ｕ":"u","ù":"u","ú":"u","û":"u","ũ":"u","ṹ":"u","ū":"u","ṻ":"u","ŭ":"u","ü":"u","ǜ":"u","ǘ":"u","ǖ":"u","ǚ":"u","ủ":"u","ů":"u","ű":"u","ǔ":"u","ȕ":"u","ȗ":"u","ư":"u","ừ":"u","ứ":"u","ữ":"u","ử":"u","ự":"u","ụ":"u","ṳ":"u",
"ų":"u","ṷ":"u","ṵ":"u","ʉ":"u","ⓥ":"v","ｖ":"v","ṽ":"v","ṿ":"v","ʋ":"v","ꝟ":"v","ʌ":"v","ꝡ":"vy","ⓦ":"w","ｗ":"w","ẁ":"w","ẃ":"w","ŵ":"w","ẇ":"w","ẅ":"w","ẘ":"w","ẉ":"w","ⱳ":"w","ⓧ":"x","ｘ":"x","ẋ":"x","ẍ":"x","ⓨ":"y","ｙ":"y","ỳ":"y","ý":"y","ŷ":"y","ỹ":"y","ȳ":"y","ẏ":"y","ÿ":"y","ỷ":"y","ẙ":"y","ỵ":"y","ƴ":"y","ɏ":"y","ỿ":"y","ⓩ":"z","ｚ":"z","ź":"z","ẑ":"z","ż":"z","ž":"z","ẓ":"z","ẕ":"z","ƶ":"z","ȥ":"z","ɀ":"z","ⱬ":"z","ꝣ":"z","Ά":"Α","Έ":"Ε","Ή":"Η","Ί":"Ι","Ϊ":"Ι","Ό":"Ο","Ύ":"Υ","Ϋ":"Υ","Ώ":"Ω","ά":"α","έ":"ε","ή":"η","ί":"ι","ϊ":"ι","ΐ":"ι","ό":"ο","ύ":"υ","ϋ":"υ","ΰ":"υ","ω":"ω","ς":"σ"}}),t.define("select2/data/base",["../utils"],function(e){function t(e,i){t.__super__.constructor.call(this)}return e.Extend(t,e.Observable),t.prototype.current=function(e){throw new Error("The `current` method must be defined in child classes.")},t.prototype.query=function(e,t){throw new Error("The `query` method must be defined in child classes.")},t.prototype.bind=function(e,t){},t.prototype.destroy=function(){},t.prototype.generateResultId=function(t,i){var s=t.id+"-result-";return s+=e.generateChars(4),null!=i.id?s+="-"+i.id.toString():s+="-"+e.generateChars(4),s},t}),t.define("select2/data/select",["./base","../utils","jquery"],function(e,t,i){function s(e,t){this.$element=e,this.options=t,s.__super__.constructor.call(this)}return t.Extend(s,e),s.prototype.current=function(e){var t=[],s=this;this.$element.find(":selected").each(function(){var e=i(this),n=s.item(e);t.push(n)}),e(t)},s.prototype.select=function(e){var t=this;if(e.selected=!0,i(e.element).is("option"))return e.element.selected=!0,void this.$element.trigger("change");if(this.$element.prop("multiple"))this.current(function(s){var n=[];e=[e],e.push.apply(e,s);for(var a=0;a<e.length;a++){var o=e[a].id;-1===i.inArray(o,n)&&n.push(o)}t.$element.val(n),t.$element.trigger("change")});else{var s=e.id;this.$element.val(s),this.$element.trigger("change")}},s.prototype.unselect=function(e){var t=this;if(this.$element.prop("multiple")){if(e.selected=!1,i(e.element).is("option"))return e.element.selected=!1,void this.$element.trigger("change");this.current(function(s){for(var n=[],a=0;a<s.length;a++){var o=s[a].id;o!==e.id&&-1===i.inArray(o,n)&&n.push(o)}t.$element.val(n),t.$element.trigger("change")})}},s.prototype.bind=function(e,t){var i=this;this.container=e,e.on("select",function(e){i.select(e.data)}),e.on("unselect",function(e){i.unselect(e.data)})},s.prototype.destroy=function(){this.$element.find("*").each(function(){t.RemoveData(this)})},s.prototype.query=function(e,t){var s=[],n=this;this.$element.children().each(function(){var t=i(this);if(t.is("option")||t.is("optgroup")){var a=n.item(t),o=n.matches(e,a);null!==o&&s.push(o)}}),t({results:s})},s.prototype.addOptions=function(e){t.appendMany(this.$element,e)},s.prototype.option=function(e){var s;e.children?(s=document.createElement("optgroup"),s.label=e.text):(s=document.createElement("option"),void 0!==s.textContent?s.textContent=e.text:s.innerText=e.text),void 0!==e.id&&(s.value=e.id),e.disabled&&(s.disabled=!0),e.selected&&(s.selected=!0),e.title&&(s.title=e.title);var n=i(s),a=this._normalizeItem(e);return a.element=s,t.StoreData(s,"data",a),n},s.prototype.item=function(e){var s={};if(null!=(s=t.GetData(e[0],"data")))return s;if(e.is("option"))s={id:e.val(),text:e.text(),disabled:e.prop("disabled"),selected:e.prop("selected"),title:e.prop("title")};else if(e.is("optgroup")){s={text:e.prop("label"),children:[],title:e.prop("title")};for(var n=e.children("option"),a=[],o=0;o<n.length;o++){var r=i(n[o]),l=this.item(r);a.push(l)}s.children=a}return s=this._normalizeItem(s),s.element=e[0],t.StoreData(e[0],"data",s),s},s.prototype._normalizeItem=function(e){e!==Object(e)&&(e={id:e,text:e}),e=i.extend({},{text:""},e);var t={selected:!1,disabled:!1};return null!=e.id&&(e.id=e.id.toString()),null!=e.text&&(e.text=e.text.toString()),null==e._resultId&&e.id&&null!=this.container&&(e._resultId=this.generateResultId(this.container,e)),i.extend({},t,e)},s.prototype.matches=function(e,t){return this.options.get("matcher")(e,t)},s}),t.define("select2/data/array",["./select","../utils","jquery"],function(e,t,i){function s(e,t){var i=t.get("data")||[];s.__super__.constructor.call(this,e,t),this.addOptions(this.convertToOptions(i))}return t.Extend(s,e),s.prototype.select=function(e){var t=this.$element.find("option").filter(function(t,i){return i.value==e.id.toString()});0===t.length&&(t=this.option(e),this.addOptions(t)),s.__super__.select.call(this,e)},s.prototype.convertToOptions=function(e){for(var s=this,n=this.$element.find("option"),a=n.map(function(){return s.item(i(this)).id}).get(),o=[],r=0;r<e.length;r++){var l=this._normalizeItem(e[r]);if(i.inArray(l.id,a)>=0){var h=n.filter(function(e){return function(){return i(this).val()==e.id}}(l)),c=this.item(h),u=i.extend(!0,{},l,c),d=this.option(u);h.replaceWith(d)}else{var p=this.option(l);if(l.children){var f=this.convertToOptions(l.children);t.appendMany(p,f)}o.push(p)}}return o},s}),t.define("select2/data/ajax",["./array","../utils","jquery"],function(e,t,i){function s(e,t){this.ajaxOptions=this._applyDefaults(t.get("ajax")),null!=this.ajaxOptions.processResults&&(this.processResults=this.ajaxOptions.processResults),s.__super__.constructor.call(this,e,t)}return t.Extend(s,e),s.prototype._applyDefaults=function(e){var t={data:function(e){return i.extend({},e,{q:e.term})},transport:function(e,t,s){var n=i.ajax(e);return n.then(t),n.fail(s),n}};return i.extend({},t,e,!0)},s.prototype.processResults=function(e){return e},s.prototype.query=function(e,t){function s(){var s=a.transport(a,function(s){var a=n.processResults(s,e);n.options.get("debug")&&window.console&&console.error&&a&&a.results&&i.isArray(a.results),t(a)},function(){"status"in s&&(0===s.status||"0"===s.status)||n.trigger("results:message",{message:"errorLoading"})});n._request=s}var n=this;null!=this._request&&(i.isFunction(this._request.abort)&&this._request.abort(),this._request=null);var a=i.extend({type:"GET"},this.ajaxOptions);"function"==typeof a.url&&(a.url=a.url.call(this.$element,e)),"function"==typeof a.data&&(a.data=a.data.call(this.$element,e)),this.ajaxOptions.delay&&null!=e.term?(this._queryTimeout&&window.clearTimeout(this._queryTimeout),this._queryTimeout=window.setTimeout(s,this.ajaxOptions.delay)):s()},s}),t.define("select2/data/tags",["jquery"],function(e){function t(t,i,s){var n=s.get("tags"),a=s.get("createTag");void 0!==a&&(this.createTag=a);var o=s.get("insertTag");if(void 0!==o&&(this.insertTag=o),t.call(this,i,s),e.isArray(n))for(var r=0;r<n.length;r++){var l=n[r],h=this._normalizeItem(l),c=this.option(h);this.$element.append(c)}}return t.prototype.query=function(e,t,i){function s(e,a){for(var o=e.results,r=0;r<o.length;r++){var l=o[r],h=null!=l.children&&!s({results:l.children},!0);if((l.text||"").toUpperCase()===(t.term||"").toUpperCase()||h)return!a&&(e.data=o,void i(e))}if(a)return!0;var c=n.createTag(t);if(null!=c){var u=n.option(c);u.attr("data-select2-tag",!0),n.addOptions([u]),n.insertTag(o,c)}e.results=o,i(e)}var n=this;if(this._removeOldTags(),null==t.term||null!=t.page)return void e.call(this,t,i);e.call(this,t,s)},t.prototype.createTag=function(t,i){var s=e.trim(i.term);return""===s?null:{id:s,text:s}},t.prototype.insertTag=function(e,t,i){t.unshift(i)},t.prototype._removeOldTags=function(t){this._lastTag,this.$element.find("option[data-select2-tag]").each(function(){this.selected||e(this).remove()})},t}),t.define("select2/data/tokenizer",["jquery"],function(e){function t(e,t,i){var s=i.get("tokenizer");void 0!==s&&(this.tokenizer=s),e.call(this,t,i)}return t.prototype.bind=function(e,t,i){e.call(this,t,i),this.$search=t.dropdown.$search||t.selection.$search||i.find(".select2-search__field")},t.prototype.query=function(t,i,s){function n(t){var i=o._normalizeItem(t);if(!o.$element.find("option").filter(function(){return e(this).val()===i.id}).length){var s=o.option(i);s.attr("data-select2-tag",!0),o._removeOldTags(),o.addOptions([s])}a(i)}function a(e){o.trigger("select",{data:e})}var o=this;i.term=i.term||"";var r=this.tokenizer(i,this.options,n);r.term!==i.term&&(this.$search.length&&(this.$search.val(r.term),this.$search.focus()),i.term=r.term),t.call(this,i,s)},t.prototype.tokenizer=function(t,i,s,n){for(var a=s.get("tokenSeparators")||[],o=i.term,r=0,l=this.createTag||function(e){return{id:e.term,text:e.term}};r<o.length;){var h=o[r];if(-1!==e.inArray(h,a)){var c=o.substr(0,r),u=e.extend({},i,{term:c}),d=l(u);null!=d?(n(d),o=o.substr(r+1)||"",r=0):r++}else r++}return{term:o}},t}),t.define("select2/data/minimumInputLength",[],function(){function e(e,t,i){this.minimumInputLength=i.get("minimumInputLength"),e.call(this,t,i)}return e.prototype.query=function(e,t,i){if(t.term=t.term||"",t.term.length<this.minimumInputLength)return void this.trigger("results:message",{message:"inputTooShort",args:{minimum:this.minimumInputLength,input:t.term,params:t}});e.call(this,t,i)},e}),t.define("select2/data/maximumInputLength",[],function(){function e(e,t,i){this.maximumInputLength=i.get("maximumInputLength"),e.call(this,t,i)}return e.prototype.query=function(e,t,i){if(t.term=t.term||"",this.maximumInputLength>0&&t.term.length>this.maximumInputLength)return void this.trigger("results:message",{message:"inputTooLong",args:{maximum:this.maximumInputLength,input:t.term,params:t}});e.call(this,t,i)},e}),t.define("select2/data/maximumSelectionLength",[],function(){function e(e,t,i){this.maximumSelectionLength=i.get("maximumSelectionLength"),e.call(this,t,i)}return e.prototype.query=function(e,t,i){var s=this;this.current(function(n){var a=null!=n?n.length:0;if(s.maximumSelectionLength>0&&a>=s.maximumSelectionLength)return void s.trigger("results:message",{message:"maximumSelected",args:{maximum:s.maximumSelectionLength}});e.call(s,t,i)})},e}),t.define("select2/dropdown",["jquery","./utils"],function(e,t){function i(e,t){this.$element=e,this.options=t,i.__super__.constructor.call(this)}return t.Extend(i,t.Observable),i.prototype.render=function(){var t=e('<span class="select2-dropdown"><span class="select2-results"></span></span>');return t.attr("dir",this.options.get("dir")),this.$dropdown=t,t},i.prototype.bind=function(){},i.prototype.position=function(e,t){},i.prototype.destroy=function(){this.$dropdown.remove()},i}),t.define("select2/dropdown/search",["jquery","../utils"],function(e,t){function i(){}return i.prototype.render=function(t){var i=t.call(this),s=e('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox" /></span>');return this.$searchContainer=s,this.$search=s.find("input"),i.prepend(s),i},i.prototype.bind=function(t,i,s){var n=this;t.call(this,i,s),this.$search.on("keydown",function(e){n.trigger("keypress",e),n._keyUpPrevented=e.isDefaultPrevented()}),this.$search.on("input",function(t){e(this).off("keyup")}),this.$search.on("keyup input",function(e){n.handleSearch(e)}),i.on("open",function(){n.$search.attr("tabindex",0),n.$search.focus(),window.setTimeout(function(){n.$search.focus()},0)}),i.on("close",function(){n.$search.attr("tabindex",-1),n.$search.val(""),n.$search.blur()}),i.on("focus",function(){i.isOpen()||n.$search.focus()}),i.on("results:all",function(e){null!=e.query.term&&""!==e.query.term||(n.showSearch(e)?n.$searchContainer.removeClass("select2-search--hide"):n.$searchContainer.addClass("select2-search--hide"))})},i.prototype.handleSearch=function(e){if(!this._keyUpPrevented){var t=this.$search.val();this.trigger("query",{term:t})}this._keyUpPrevented=!1},i.prototype.showSearch=function(e,t){return!0},i}),t.define("select2/dropdown/hidePlaceholder",[],function(){function e(e,t,i,s){this.placeholder=this.normalizePlaceholder(i.get("placeholder")),e.call(this,t,i,s)}return e.prototype.append=function(e,t){t.results=this.removePlaceholder(t.results),e.call(this,t)},e.prototype.normalizePlaceholder=function(e,t){return"string"==typeof t&&(t={id:"",text:t}),t},e.prototype.removePlaceholder=function(e,t){for(var i=t.slice(0),s=t.length-1;s>=0;s--){var n=t[s];this.placeholder.id===n.id&&i.splice(s,1)}return i},e}),t.define("select2/dropdown/infiniteScroll",["jquery"],function(e){function t(e,t,i,s){this.lastParams={},e.call(this,t,i,s),this.$loadingMore=this.createLoadingMore(),this.loading=!1}return t.prototype.append=function(e,t){this.$loadingMore.remove(),this.loading=!1,e.call(this,t),this.showLoadingMore(t)&&this.$results.append(this.$loadingMore)},t.prototype.bind=function(t,i,s){var n=this;t.call(this,i,s),i.on("query",function(e){n.lastParams=e,n.loading=!0}),i.on("query:append",function(e){n.lastParams=e,n.loading=!0}),this.$results.on("scroll",function(){var t=e.contains(document.documentElement,n.$loadingMore[0]);!n.loading&&t&&n.$results.offset().top+n.$results.outerHeight(!1)+50>=n.$loadingMore.offset().top+n.$loadingMore.outerHeight(!1)&&n.loadMore()})},t.prototype.loadMore=function(){this.loading=!0;var t=e.extend({},{page:1},this.lastParams);t.page++,this.trigger("query:append",t)},t.prototype.showLoadingMore=function(e,t){return t.pagination&&t.pagination.more},t.prototype.createLoadingMore=function(){var t=e('<li class="select2-results__option select2-results__option--load-more"role="treeitem" aria-disabled="true"></li>'),i=this.options.get("translations").get("loadingMore");return t.html(i(this.lastParams)),t},t}),t.define("select2/dropdown/attachBody",["jquery","../utils"],function(e,t){function i(t,i,s){this.$dropdownParent=s.get("dropdownParent")||e(document.body),t.call(this,i,s)}return i.prototype.bind=function(e,t,i){var s=this,n=!1;e.call(this,t,i),t.on("open",function(){s._showDropdown(),s._attachPositioningHandler(t),n||(n=!0,t.on("results:all",function(){s._positionDropdown(),s._resizeDropdown()}),t.on("results:append",function(){s._positionDropdown(),s._resizeDropdown()}))}),t.on("close",function(){s._hideDropdown(),s._detachPositioningHandler(t)}),this.$dropdownContainer.on("mousedown",function(e){e.stopPropagation()})},i.prototype.destroy=function(e){e.call(this),this.$dropdownContainer.remove()},i.prototype.position=function(e,t,i){t.attr("class",i.attr("class")),t.removeClass("select2"),t.addClass("select2-container--open"),t.css({position:"absolute",top:-999999}),this.$container=i},i.prototype.render=function(t){var i=e("<span></span>"),s=t.call(this);return i.append(s),this.$dropdownContainer=i,i},i.prototype._hideDropdown=function(e){this.$dropdownContainer.detach()},i.prototype._attachPositioningHandler=function(i,s){var n=this,a="scroll.select2."+s.id,o="resize.select2."+s.id,r="orientationchange.select2."+s.id,l=this.$container.parents().filter(t.hasScroll);l.each(function(){t.StoreData(this,"select2-scroll-position",{x:e(this).scrollLeft(),y:e(this).scrollTop()})}),l.on(a,function(i){var s=t.GetData(this,"select2-scroll-position");e(this).scrollTop(s.y)}),e(window).on(a+" "+o+" "+r,function(e){n._positionDropdown(),n._resizeDropdown()})},i.prototype._detachPositioningHandler=function(i,s){var n="scroll.select2."+s.id,a="resize.select2."+s.id,o="orientationchange.select2."+s.id;this.$container.parents().filter(t.hasScroll).off(n),e(window).off(n+" "+a+" "+o)},i.prototype._positionDropdown=function(){var t=e(window),i=this.$dropdown.hasClass("select2-dropdown--above"),s=this.$dropdown.hasClass("select2-dropdown--below"),n=null,a=this.$container.offset();a.bottom=a.top+this.$container.outerHeight(!1);var o={height:this.$container.outerHeight(!1)};o.top=a.top,o.bottom=a.top+o.height;var r={height:this.$dropdown.outerHeight(!1)},l={top:t.scrollTop(),bottom:t.scrollTop()+t.height()},h=l.top<a.top-r.height,c=l.bottom>a.bottom+r.height,u={left:a.left,top:o.bottom},d=this.$dropdownParent;"static"===d.css("position")&&(d=d.offsetParent());var p=d.offset();u.top-=p.top,u.left-=p.left,i||s||(n="below"),c||!h||i?!h&&c&&i&&(n="below"):n="above",("above"==n||i&&"below"!==n)&&(u.top=o.top-p.top-r.height),null!=n&&(this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--"+n),this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--"+n)),this.$dropdownContainer.css(u)},i.prototype._resizeDropdown=function(){var e={width:this.$container.outerWidth(!1)+"px"};this.options.get("dropdownAutoWidth")&&(e.minWidth=e.width,e.position="relative",e.width="auto"),this.$dropdown.css(e)},i.prototype._showDropdown=function(e){this.$dropdownContainer.appendTo(this.$dropdownParent),this._positionDropdown(),this._resizeDropdown()},i}),t.define("select2/dropdown/minimumResultsForSearch",[],function(){function e(t){for(var i=0,s=0;s<t.length;s++){var n=t[s];n.children?i+=e(n.children):i++}return i}function t(e,t,i,s){this.minimumResultsForSearch=i.get("minimumResultsForSearch"),this.minimumResultsForSearch<0&&(this.minimumResultsForSearch=1/0),e.call(this,t,i,s)}return t.prototype.showSearch=function(t,i){return!(e(i.data.results)<this.minimumResultsForSearch)&&t.call(this,i)},t}),t.define("select2/dropdown/selectOnClose",["../utils"],function(e){function t(){}return t.prototype.bind=function(e,t,i){var s=this;e.call(this,t,i),t.on("close",function(e){s._handleSelectOnClose(e)})},t.prototype._handleSelectOnClose=function(t,i){if(i&&null!=i.originalSelect2Event){var s=i.originalSelect2Event;if("select"===s._type||"unselect"===s._type)return}var n=this.getHighlightedResults();if(!(n.length<1)){var a=e.GetData(n[0],"data");null!=a.element&&a.element.selected||null==a.element&&a.selected||this.trigger("select",{data:a})}},t}),t.define("select2/dropdown/closeOnSelect",[],function(){function e(){}return e.prototype.bind=function(e,t,i){var s=this;e.call(this,t,i),t.on("select",function(e){s._selectTriggered(e)}),t.on("unselect",function(e){s._selectTriggered(e)})},e.prototype._selectTriggered=function(e,t){var i=t.originalEvent;i&&i.ctrlKey||this.trigger("close",{originalEvent:i,originalSelect2Event:t})},e}),t.define("select2/i18n/en",[],function(){return{errorLoading:function(){return"The results could not be loaded."},inputTooLong:function(e){var t=e.input.length-e.maximum,i="Please delete "+t+" character";return 1!=t&&(i+="s"),i},inputTooShort:function(e){return"Please enter "+(e.minimum-e.input.length)+" or more characters"},loadingMore:function(){return"Loading more results…"},maximumSelected:function(e){var t="You can only select "+e.maximum+" item";return 1!=e.maximum&&(t+="s"),t},noResults:function(){return"No results found"},searching:function(){return"Searching…"}}}),t.define("select2/defaults",["jquery","require","./results","./selection/single","./selection/multiple","./selection/placeholder","./selection/allowClear","./selection/search","./selection/eventRelay","./utils","./translation","./diacritics","./data/select","./data/array","./data/ajax","./data/tags","./data/tokenizer","./data/minimumInputLength","./data/maximumInputLength","./data/maximumSelectionLength","./dropdown","./dropdown/search","./dropdown/hidePlaceholder","./dropdown/infiniteScroll","./dropdown/attachBody","./dropdown/minimumResultsForSearch","./dropdown/selectOnClose","./dropdown/closeOnSelect","./i18n/en"],function(e,t,i,s,n,a,o,r,l,h,c,u,d,p,f,m,g,v,_,b,w,y,x,C,S,k,T,D,M){function I(){this.reset()}return I.prototype.apply=function(u){if(u=e.extend(!0,{},this.defaults,u),null==u.dataAdapter){if(null!=u.ajax?u.dataAdapter=f:null!=u.data?u.dataAdapter=p:u.dataAdapter=d,u.minimumInputLength>0&&(u.dataAdapter=h.Decorate(u.dataAdapter,v)),u.maximumInputLength>0&&(u.dataAdapter=h.Decorate(u.dataAdapter,_)),u.maximumSelectionLength>0&&(u.dataAdapter=h.Decorate(u.dataAdapter,b)),u.tags&&(u.dataAdapter=h.Decorate(u.dataAdapter,m)),null==u.tokenSeparators&&null==u.tokenizer||(u.dataAdapter=h.Decorate(u.dataAdapter,g)),null!=u.query){var M=t(u.amdBase+"compat/query");u.dataAdapter=h.Decorate(u.dataAdapter,M)}if(null!=u.initSelection){var I=t(u.amdBase+"compat/initSelection");u.dataAdapter=h.Decorate(u.dataAdapter,I)}}if(null==u.resultsAdapter&&(u.resultsAdapter=i,null!=u.ajax&&(u.resultsAdapter=h.Decorate(u.resultsAdapter,C)),null!=u.placeholder&&(u.resultsAdapter=h.Decorate(u.resultsAdapter,x)),u.selectOnClose&&(u.resultsAdapter=h.Decorate(u.resultsAdapter,T))),null==u.dropdownAdapter){if(u.multiple)u.dropdownAdapter=w;else{var P=h.Decorate(w,y);u.dropdownAdapter=P}if(0!==u.minimumResultsForSearch&&(u.dropdownAdapter=h.Decorate(u.dropdownAdapter,k)),u.closeOnSelect&&(u.dropdownAdapter=h.Decorate(u.dropdownAdapter,D)),null!=u.dropdownCssClass||null!=u.dropdownCss||null!=u.adaptDropdownCssClass){var z=t(u.amdBase+"compat/dropdownCss");u.dropdownAdapter=h.Decorate(u.dropdownAdapter,z)}u.dropdownAdapter=h.Decorate(u.dropdownAdapter,S)}if(null==u.selectionAdapter){if(u.multiple?u.selectionAdapter=n:u.selectionAdapter=s,null!=u.placeholder&&(u.selectionAdapter=h.Decorate(u.selectionAdapter,a)),u.allowClear&&(u.selectionAdapter=h.Decorate(u.selectionAdapter,o)),u.multiple&&(u.selectionAdapter=h.Decorate(u.selectionAdapter,r)),null!=u.containerCssClass||null!=u.containerCss||null!=u.adaptContainerCssClass){var E=t(u.amdBase+"compat/containerCss");u.selectionAdapter=h.Decorate(u.selectionAdapter,E)}u.selectionAdapter=h.Decorate(u.selectionAdapter,l)}if("string"==typeof u.language)if(u.language.indexOf("-")>0){var A=u.language.split("-"),O=A[0];u.language=[u.language,O]}else u.language=[u.language];if(e.isArray(u.language)){var H=new c;u.language.push("en");for(var $=u.language,L=0;L<$.length;L++){var B=$[L],N={};try{N=c.loadPath(B)}catch(e){try{B=this.defaults.amdLanguageBase+B,N=c.loadPath(B)}catch(e){u.debug&&window.console&&console.warn;continue}}H.extend(N)}u.translations=H}else{var W=c.loadPath(this.defaults.amdLanguageBase+"en"),R=new c(u.language);R.extend(W),u.translations=R}return u},I.prototype.reset=function(){function t(e){function t(e){return u[e]||e}return e.replace(/[^\u0000-\u007E]/g,t)}function i(s,n){if(""===e.trim(s.term))return n;if(n.children&&n.children.length>0){for(var a=e.extend(!0,{},n),o=n.children.length-1;o>=0;o--)null==i(s,n.children[o])&&a.children.splice(o,1);return a.children.length>0?a:i(s,a)}var r=t(n.text).toUpperCase(),l=t(s.term).toUpperCase();return r.indexOf(l)>-1?n:null}this.defaults={amdBase:"./",amdLanguageBase:"./i18n/",closeOnSelect:!0,debug:!1,dropdownAutoWidth:!1,escapeMarkup:h.escapeMarkup,language:M,matcher:i,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:!1,sorter:function(e){return e},templateResult:function(e){return e.text},templateSelection:function(e){return e.text},theme:"default",width:"resolve"}},I.prototype.set=function(t,i){var s=e.camelCase(t),n={};n[s]=i;var a=h._convertData(n);e.extend(!0,this.defaults,a)},new I}),t.define("select2/options",["require","jquery","./defaults","./utils"],function(e,t,i,s){function n(t,n){if(this.options=t,null!=n&&this.fromElement(n),this.options=i.apply(this.options),n&&n.is("input")){var a=e(this.get("amdBase")+"compat/inputData");this.options.dataAdapter=s.Decorate(this.options.dataAdapter,a)}}return n.prototype.fromElement=function(e){var i=["select2"];null==this.options.multiple&&(this.options.multiple=e.prop("multiple")),null==this.options.disabled&&(this.options.disabled=e.prop("disabled")),null==this.options.language&&(e.prop("lang")?this.options.language=e.prop("lang").toLowerCase():e.closest("[lang]").prop("lang")&&(this.options.language=e.closest("[lang]").prop("lang"))),null==this.options.dir&&(e.prop("dir")?this.options.dir=e.prop("dir"):e.closest("[dir]").prop("dir")?this.options.dir=e.closest("[dir]").prop("dir"):this.options.dir="ltr"),e.prop("disabled",this.options.disabled),e.prop("multiple",this.options.multiple),s.GetData(e[0],"select2Tags")&&(this.options.debug&&window.console&&console.warn,s.StoreData(e[0],"data",s.GetData(e[0],"select2Tags")),s.StoreData(e[0],"tags",!0)),s.GetData(e[0],"ajaxUrl")&&(this.options.debug&&window.console&&console.warn,e.attr("ajax--url",s.GetData(e[0],"ajaxUrl")),s.StoreData(e[0],"ajax-Url",s.GetData(e[0],"ajaxUrl")));var n={};n=t.fn.jquery&&"1."==t.fn.jquery.substr(0,2)&&e[0].dataset?t.extend(!0,{},e[0].dataset,s.GetData(e[0])):s.GetData(e[0]);var a=t.extend(!0,{},n);a=s._convertData(a);for(var o in a)t.inArray(o,i)>-1||(t.isPlainObject(this.options[o])?t.extend(this.options[o],a[o]):this.options[o]=a[o]);return this},n.prototype.get=function(e){return this.options[e]},n.prototype.set=function(e,t){this.options[e]=t},n}),t.define("select2/core",["jquery","./options","./utils","./keys"],function(e,t,i,s){var n=function(e,s){null!=i.GetData(e[0],"select2")&&i.GetData(e[0],"select2").destroy(),this.$element=e,this.id=this._generateId(e),s=s||{},this.options=new t(s,e),n.__super__.constructor.call(this);var a=e.attr("tabindex")||0;i.StoreData(e[0],"old-tabindex",a),e.attr("tabindex","-1");var o=this.options.get("dataAdapter");this.dataAdapter=new o(e,this.options);var r=this.render();this._placeContainer(r);var l=this.options.get("selectionAdapter");this.selection=new l(e,this.options),this.$selection=this.selection.render(),this.selection.position(this.$selection,r);var h=this.options.get("dropdownAdapter");this.dropdown=new h(e,this.options),this.$dropdown=this.dropdown.render(),this.dropdown.position(this.$dropdown,r);var c=this.options.get("resultsAdapter");this.results=new c(e,this.options,this.dataAdapter),this.$results=this.results.render(),this.results.position(this.$results,this.$dropdown);var u=this;this._bindAdapters(),this._registerDomEvents(),this._registerDataEvents(),this._registerSelectionEvents(),this._registerDropdownEvents(),this._registerResultsEvents(),this._registerEvents(),this.dataAdapter.current(function(e){u.trigger("selection:update",{data:e})}),e.addClass("select2-hidden-accessible"),e.attr("aria-hidden","true"),this._syncAttributes(),i.StoreData(e[0],"select2",this),e.data("select2",this)};return i.Extend(n,i.Observable),n.prototype._generateId=function(e){var t="";return t=null!=e.attr("id")?e.attr("id"):null!=e.attr("name")?e.attr("name")+"-"+i.generateChars(2):i.generateChars(4),t=t.replace(/(:|\.|\[|\]|,)/g,""),t="select2-"+t},n.prototype._placeContainer=function(e){e.insertAfter(this.$element);var t=this._resolveWidth(this.$element,this.options.get("width"));null!=t&&e.css("width",t)},n.prototype._resolveWidth=function(e,t){var i=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if("resolve"==t){var s=this._resolveWidth(e,"style");return null!=s?s:this._resolveWidth(e,"element")}if("element"==t){var n=e.outerWidth(!1);return n<=0?"auto":n+"px"}if("style"==t){var a=e.attr("style");if("string"!=typeof a)return null;for(var o=a.split(";"),r=0,l=o.length;r<l;r+=1){var h=o[r].replace(/\s/g,""),c=h.match(i);if(null!==c&&c.length>=1)return c[1]}return null}return t},n.prototype._bindAdapters=function(){this.dataAdapter.bind(this,this.$container),this.selection.bind(this,this.$container),this.dropdown.bind(this,this.$container),this.results.bind(this,this.$container)},n.prototype._registerDomEvents=function(){var t=this;this.$element.on("change.select2",function(){t.dataAdapter.current(function(e){t.trigger("selection:update",{data:e})})}),this.$element.on("focus.select2",function(e){t.trigger("focus",e)}),this._syncA=i.bind(this._syncAttributes,this),this._syncS=i.bind(this._syncSubtree,this),this.$element[0].attachEvent&&this.$element[0].attachEvent("onpropertychange",this._syncA);var s=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver;null!=s?(this._observer=new s(function(i){e.each(i,t._syncA),e.each(i,t._syncS)}),this._observer.observe(this.$element[0],{attributes:!0,childList:!0,subtree:!1})):this.$element[0].addEventListener&&(this.$element[0].addEventListener("DOMAttrModified",t._syncA,!1),this.$element[0].addEventListener("DOMNodeInserted",t._syncS,!1),this.$element[0].addEventListener("DOMNodeRemoved",t._syncS,!1))},n.prototype._registerDataEvents=function(){var e=this;this.dataAdapter.on("*",function(t,i){e.trigger(t,i)})},n.prototype._registerSelectionEvents=function(){var t=this,i=["toggle","focus"];this.selection.on("toggle",function(){t.toggleDropdown()}),this.selection.on("focus",function(e){t.focus(e)}),this.selection.on("*",function(s,n){-1===e.inArray(s,i)&&t.trigger(s,n)})},n.prototype._registerDropdownEvents=function(){var e=this;this.dropdown.on("*",function(t,i){e.trigger(t,i)})},n.prototype._registerResultsEvents=function(){var e=this;this.results.on("*",function(t,i){e.trigger(t,i)})},n.prototype._registerEvents=function(){var e=this;this.on("open",function(){e.$container.addClass("select2-container--open")}),this.on("close",function(){e.$container.removeClass("select2-container--open")}),this.on("enable",function(){e.$container.removeClass("select2-container--disabled")}),this.on("disable",function(){e.$container.addClass("select2-container--disabled")}),this.on("blur",function(){e.$container.removeClass("select2-container--focus")}),this.on("query",function(t){e.isOpen()||e.trigger("open",{}),this.dataAdapter.query(t,function(i){e.trigger("results:all",{data:i,query:t})})}),this.on("query:append",function(t){this.dataAdapter.query(t,function(i){e.trigger("results:append",{data:i,query:t})})}),this.on("keypress",function(t){var i=t.which;e.isOpen()?i===s.ESC||i===s.TAB||i===s.UP&&t.altKey?(e.close(),t.preventDefault()):i===s.ENTER?(e.trigger("results:select",{}),t.preventDefault()):i===s.SPACE&&t.ctrlKey?(e.trigger("results:toggle",{}),t.preventDefault()):i===s.UP?(e.trigger("results:previous",{}),t.preventDefault()):i===s.DOWN&&(e.trigger("results:next",{}),t.preventDefault()):(i===s.ENTER||i===s.SPACE||i===s.DOWN&&t.altKey)&&(e.open(),t.preventDefault())})},n.prototype._syncAttributes=function(){this.options.set("disabled",this.$element.prop("disabled")),this.options.get("disabled")?(this.isOpen()&&this.close(),this.trigger("disable",{})):this.trigger("enable",{})},n.prototype._syncSubtree=function(e,t){var i=!1,s=this;if(!e||!e.target||"OPTION"===e.target.nodeName||"OPTGROUP"===e.target.nodeName){if(t)if(t.addedNodes&&t.addedNodes.length>0)for(var n=0;n<t.addedNodes.length;n++){var a=t.addedNodes[n];a.selected&&(i=!0)}else t.removedNodes&&t.removedNodes.length>0&&(i=!0);else i=!0;i&&this.dataAdapter.current(function(e){s.trigger("selection:update",{data:e})})}},n.prototype.trigger=function(e,t){var i=n.__super__.trigger,s={open:"opening",close:"closing",select:"selecting",unselect:"unselecting",clear:"clearing"};if(void 0===t&&(t={}),e in s){var a=s[e],o={prevented:!1,name:e,args:t};if(i.call(this,a,o),o.prevented)return void(t.prevented=!0)}i.call(this,e,t)},n.prototype.toggleDropdown=function(){this.options.get("disabled")||(this.isOpen()?this.close():this.open())},n.prototype.open=function(){this.isOpen()||this.trigger("query",{})},n.prototype.close=function(){this.isOpen()&&this.trigger("close",{})},n.prototype.isOpen=function(){return this.$container.hasClass("select2-container--open")},n.prototype.hasFocus=function(){return this.$container.hasClass("select2-container--focus")},n.prototype.focus=function(e){this.hasFocus()||(this.$container.addClass("select2-container--focus"),this.trigger("focus",{}))},n.prototype.enable=function(e){this.options.get("debug")&&window.console&&console.warn,null!=e&&0!==e.length||(e=[!0]);var t=!e[0];this.$element.prop("disabled",t)},n.prototype.data=function(){this.options.get("debug")&&arguments.length>0&&window.console&&console.warn;var e=[];return this.dataAdapter.current(function(t){e=t}),e},n.prototype.val=function(t){if(this.options.get("debug")&&window.console&&console.warn,null==t||0===t.length)return this.$element.val();var i=t[0];e.isArray(i)&&(i=e.map(i,function(e){return e.toString()})),this.$element.val(i).trigger("change")},n.prototype.destroy=function(){this.$container.remove(),
this.$element[0].detachEvent&&this.$element[0].detachEvent("onpropertychange",this._syncA),null!=this._observer?(this._observer.disconnect(),this._observer=null):this.$element[0].removeEventListener&&(this.$element[0].removeEventListener("DOMAttrModified",this._syncA,!1),this.$element[0].removeEventListener("DOMNodeInserted",this._syncS,!1),this.$element[0].removeEventListener("DOMNodeRemoved",this._syncS,!1)),this._syncA=null,this._syncS=null,this.$element.off(".select2"),this.$element.attr("tabindex",i.GetData(this.$element[0],"old-tabindex")),this.$element.removeClass("select2-hidden-accessible"),this.$element.attr("aria-hidden","false"),i.RemoveData(this.$element[0]),this.$element.removeData("select2"),this.dataAdapter.destroy(),this.selection.destroy(),this.dropdown.destroy(),this.results.destroy(),this.dataAdapter=null,this.selection=null,this.dropdown=null,this.results=null},n.prototype.render=function(){var t=e('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');return t.attr("dir",this.options.get("dir")),this.$container=t,this.$container.addClass("select2-container--"+this.options.get("theme")),i.StoreData(t[0],"element",this.$element),t},n}),t.define("select2/compat/utils",["jquery"],function(e){function t(t,i,s){var n,a,o=[];n=e.trim(t.attr("class")),n&&(n=""+n,e(n.split(/\s+/)).each(function(){0===this.indexOf("select2-")&&o.push(this)})),n=e.trim(i.attr("class")),n&&(n=""+n,e(n.split(/\s+/)).each(function(){0!==this.indexOf("select2-")&&null!=(a=s(this))&&o.push(a)})),t.attr("class",o.join(" "))}return{syncCssClasses:t}}),t.define("select2/compat/containerCss",["jquery","./utils"],function(e,t){function i(e){return null}function s(){}return s.prototype.render=function(s){var n=s.call(this),a=this.options.get("containerCssClass")||"";e.isFunction(a)&&(a=a(this.$element));var o=this.options.get("adaptContainerCssClass");if(o=o||i,-1!==a.indexOf(":all:")){a=a.replace(":all:","");var r=o;o=function(e){var t=r(e);return null!=t?t+" "+e:e}}var l=this.options.get("containerCss")||{};return e.isFunction(l)&&(l=l(this.$element)),t.syncCssClasses(n,this.$element,o),n.css(l),n.addClass(a),n},s}),t.define("select2/compat/dropdownCss",["jquery","./utils"],function(e,t){function i(e){return null}function s(){}return s.prototype.render=function(s){var n=s.call(this),a=this.options.get("dropdownCssClass")||"";e.isFunction(a)&&(a=a(this.$element));var o=this.options.get("adaptDropdownCssClass");if(o=o||i,-1!==a.indexOf(":all:")){a=a.replace(":all:","");var r=o;o=function(e){var t=r(e);return null!=t?t+" "+e:e}}var l=this.options.get("dropdownCss")||{};return e.isFunction(l)&&(l=l(this.$element)),t.syncCssClasses(n,this.$element,o),n.css(l),n.addClass(a),n},s}),t.define("select2/compat/initSelection",["jquery"],function(e){function t(e,t,i){i.get("debug")&&window.console&&console.warn,this.initSelection=i.get("initSelection"),this._isInitialized=!1,e.call(this,t,i)}return t.prototype.current=function(t,i){var s=this;if(this._isInitialized)return void t.call(this,i);this.initSelection.call(null,this.$element,function(t){s._isInitialized=!0,e.isArray(t)||(t=[t]),i(t)})},t}),t.define("select2/compat/inputData",["jquery","../utils"],function(e,t){function i(e,t,i){this._currentData=[],this._valueSeparator=i.get("valueSeparator")||",","hidden"===t.prop("type")&&i.get("debug")&&console&&console.warn,e.call(this,t,i)}return i.prototype.current=function(t,i){function s(t,i){var n=[];return t.selected||-1!==e.inArray(t.id,i)?(t.selected=!0,n.push(t)):t.selected=!1,t.children&&n.push.apply(n,s(t.children,i)),n}for(var n=[],a=0;a<this._currentData.length;a++){var o=this._currentData[a];n.push.apply(n,s(o,this.$element.val().split(this._valueSeparator)))}i(n)},i.prototype.select=function(t,i){if(this.options.get("multiple")){var s=this.$element.val();s+=this._valueSeparator+i.id,this.$element.val(s),this.$element.trigger("change")}else this.current(function(t){e.map(t,function(e){e.selected=!1})}),this.$element.val(i.id),this.$element.trigger("change")},i.prototype.unselect=function(e,t){var i=this;t.selected=!1,this.current(function(e){for(var s=[],n=0;n<e.length;n++){var a=e[n];t.id!=a.id&&s.push(a.id)}i.$element.val(s.join(i._valueSeparator)),i.$element.trigger("change")})},i.prototype.query=function(e,t,i){for(var s=[],n=0;n<this._currentData.length;n++){var a=this._currentData[n],o=this.matches(t,a);null!==o&&s.push(o)}i({results:s})},i.prototype.addOptions=function(i,s){var n=e.map(s,function(e){return t.GetData(e[0],"data")});this._currentData.push.apply(this._currentData,n)},i}),t.define("select2/compat/matcher",["jquery"],function(e){function t(t){function i(i,s){var n=e.extend(!0,{},s);if(null==i.term||""===e.trim(i.term))return n;if(s.children){for(var a=s.children.length-1;a>=0;a--){var o=s.children[a];t(i.term,o.text,o)||n.children.splice(a,1)}if(n.children.length>0)return n}return t(i.term,s.text,s)?n:null}return i}return t}),t.define("select2/compat/query",[],function(){function e(e,t,i){i.get("debug")&&window.console&&console.warn,e.call(this,t,i)}return e.prototype.query=function(e,t,i){t.callback=i,this.options.get("query").call(null,t)},e}),t.define("select2/dropdown/attachContainer",[],function(){function e(e,t,i){e.call(this,t,i)}return e.prototype.position=function(e,t,i){i.find(".dropdown-wrapper").append(t),t.addClass("select2-dropdown--below"),i.addClass("select2-container--below")},e}),t.define("select2/dropdown/stopPropagation",[],function(){function e(){}return e.prototype.bind=function(e,t,i){e.call(this,t,i);var s=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];this.$dropdown.on(s.join(" "),function(e){e.stopPropagation()})},e}),t.define("select2/selection/stopPropagation",[],function(){function e(){}return e.prototype.bind=function(e,t,i){e.call(this,t,i);var s=["blur","change","click","dblclick","focus","focusin","focusout","input","keydown","keyup","keypress","mousedown","mouseenter","mouseleave","mousemove","mouseover","mouseup","search","touchend","touchstart"];this.$selection.on(s.join(" "),function(e){e.stopPropagation()})},e}),function(i){"function"==typeof t.define&&t.define.amd?t.define("jquery-mousewheel",["jquery"],i):"object"==typeof exports?module.exports=i:i(e)}(function(e){function t(t){var o=t||window.event,r=l.call(arguments,1),h=0,u=0,d=0,p=0,f=0,m=0;if(t=e.event.fix(o),t.type="mousewheel","detail"in o&&(d=-1*o.detail),"wheelDelta"in o&&(d=o.wheelDelta),"wheelDeltaY"in o&&(d=o.wheelDeltaY),"wheelDeltaX"in o&&(u=-1*o.wheelDeltaX),"axis"in o&&o.axis===o.HORIZONTAL_AXIS&&(u=-1*d,d=0),h=0===d?u:d,"deltaY"in o&&(d=-1*o.deltaY,h=d),"deltaX"in o&&(u=o.deltaX,0===d&&(h=-1*u)),0!==d||0!==u){if(1===o.deltaMode){var g=e.data(this,"mousewheel-line-height");h*=g,d*=g,u*=g}else if(2===o.deltaMode){var v=e.data(this,"mousewheel-page-height");h*=v,d*=v,u*=v}if(p=Math.max(Math.abs(d),Math.abs(u)),(!a||p<a)&&(a=p,s(o,p)&&(a/=40)),s(o,p)&&(h/=40,u/=40,d/=40),h=Math[h>=1?"floor":"ceil"](h/a),u=Math[u>=1?"floor":"ceil"](u/a),d=Math[d>=1?"floor":"ceil"](d/a),c.settings.normalizeOffset&&this.getBoundingClientRect){var _=this.getBoundingClientRect();f=t.clientX-_.left,m=t.clientY-_.top}return t.deltaX=u,t.deltaY=d,t.deltaFactor=a,t.offsetX=f,t.offsetY=m,t.deltaMode=0,r.unshift(t,h,u,d),n&&clearTimeout(n),n=setTimeout(i,200),(e.event.dispatch||e.event.handle).apply(this,r)}}function i(){a=null}function s(e,t){return c.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}var n,a,o=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],r="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],l=Array.prototype.slice;if(e.event.fixHooks)for(var h=o.length;h;)e.event.fixHooks[o[--h]]=e.event.mouseHooks;var c=e.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var i=r.length;i;)this.addEventListener(r[--i],t,!1);else this.onmousewheel=t;e.data(this,"mousewheel-line-height",c.getLineHeight(this)),e.data(this,"mousewheel-page-height",c.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var i=r.length;i;)this.removeEventListener(r[--i],t,!1);else this.onmousewheel=null;e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")},getLineHeight:function(t){var i=e(t),s=i["offsetParent"in e.fn?"offsetParent":"parent"]();return s.length||(s=e("body")),parseInt(s.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16},getPageHeight:function(t){return e(t).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})}),t.define("jquery.select2",["jquery","jquery-mousewheel","./select2/core","./select2/defaults","./select2/utils"],function(e,t,i,s,n){if(null==e.fn.select2){var a=["open","close","destroy"];e.fn.select2=function(t){if("object"==typeof(t=t||{}))return this.each(function(){var s=e.extend(!0,{},t);new i(e(this),s)}),this;if("string"==typeof t){var s,o=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=n.GetData(this,"select2");null==e&&window.console&&console.error,s=e[t].apply(e,o)}),e.inArray(t,a)>-1?this:s}throw new Error("Invalid arguments for Select2: "+t)}}return null==e.fn.select2.defaults&&(e.fn.select2.defaults=s),i}),{define:t.define,require:t.require}}(),i=t.require("jquery.select2");return e.fn.select2.amd=t,i}),/**
 * Swiper 3.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 13, 2016
 */
function(){"use strict";var e,t=function(s,n){/*=========================
          Round helper
          ===========================*/
function a(e){return Math.floor(e)}function o(){var e=y.params.autoplay,t=y.slides.eq(y.activeIndex);t.attr("data-swiper-autoplay")&&(e=t.attr("data-swiper-autoplay")||y.params.autoplay),y.autoplayTimeoutId=setTimeout(function(){y.params.loop?(y.fixLoop(),y._slideNext(),y.emit("onAutoplay",y)):y.isEnd?n.autoplayStopOnLast?y.stopAutoplay():(y._slideTo(0),y.emit("onAutoplay",y)):(y._slideNext(),y.emit("onAutoplay",y))},e)}/*=========================
          Handle Touches
          ===========================*/
function r(t,i){var s=e(t.target);if(!s.is(i))if("string"==typeof i)s=s.parents(i);else if(i.nodeType){var n;return s.parents().each(function(e,t){t===i&&(n=i)}),n?i:void 0}if(0!==s.length)return s[0]}function l(e,t){t=t||{};
// create an observer instance
var i=window.MutationObserver||window.WebkitMutationObserver,s=new i(function(e){e.forEach(function(e){y.onResize(!0),y.emit("onObserverUpdate",y,e)})});s.observe(e,{attributes:void 0===t.attributes||t.attributes,childList:void 0===t.childList||t.childList,characterData:void 0===t.characterData||t.characterData}),y.observers.push(s)}/*=========================
          Keyboard Control
          ===========================*/
function h(e){e.originalEvent&&(e=e.originalEvent);//jquery fix
var t=e.keyCode||e.charCode;
// Directions locks
if(!y.params.allowSwipeToNext&&(y.isHorizontal()&&39===t||!y.isHorizontal()&&40===t))return!1;if(!y.params.allowSwipeToPrev&&(y.isHorizontal()&&37===t||!y.isHorizontal()&&38===t))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===t||39===t||38===t||40===t){var i=!1;
//Check that swiper should be inside of visible area of window
if(y.container.parents("."+y.params.slideClass).length>0&&0===y.container.parents("."+y.params.slideActiveClass).length)return;var s={left:window.pageXOffset,top:window.pageYOffset},n=window.innerWidth,a=window.innerHeight,o=y.container.offset();y.rtl&&(o.left=o.left-y.container[0].scrollLeft);for(var r=[[o.left,o.top],[o.left+y.width,o.top],[o.left,o.top+y.height],[o.left+y.width,o.top+y.height]],l=0;l<r.length;l++){var h=r[l];h[0]>=s.left&&h[0]<=s.left+n&&h[1]>=s.top&&h[1]<=s.top+a&&(i=!0)}if(!i)return}y.isHorizontal()?(37!==t&&39!==t||(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===t&&!y.rtl||37===t&&y.rtl)&&y.slideNext(),(37===t&&!y.rtl||39===t&&y.rtl)&&y.slidePrev()):(38!==t&&40!==t||(e.preventDefault?e.preventDefault():e.returnValue=!1),40===t&&y.slideNext(),38===t&&y.slidePrev())}}function c(e){e.originalEvent&&(e=e.originalEvent);//jquery fix
var t=0,i=y.rtl?-1:1,s=u(e);if(y.params.mousewheelForceToAxis)if(y.isHorizontal()){if(!(Math.abs(s.pixelX)>Math.abs(s.pixelY)))return;t=s.pixelX*i}else{if(!(Math.abs(s.pixelY)>Math.abs(s.pixelX)))return;t=s.pixelY}else t=Math.abs(s.pixelX)>Math.abs(s.pixelY)?-s.pixelX*i:-s.pixelY;if(0!==t){if(y.params.mousewheelInvert&&(t=-t),y.params.freeMode){
//Freemode or scrollContainer:
var n=y.getWrapperTranslate()+t*y.params.mousewheelSensitivity,a=y.isBeginning,o=y.isEnd;
// Return page scroll on edge positions
if(n>=y.minTranslate()&&(n=y.minTranslate()),n<=y.maxTranslate()&&(n=y.maxTranslate()),y.setWrapperTransition(0),y.setWrapperTranslate(n),y.updateProgress(),y.updateActiveIndex(),(!a&&y.isBeginning||!o&&y.isEnd)&&y.updateClasses(),y.params.freeModeSticky?(clearTimeout(y.mousewheel.timeout),y.mousewheel.timeout=setTimeout(function(){y.slideReset()},300)):y.params.lazyLoading&&y.lazy&&y.lazy.load(),
// Emit event
y.emit("onScroll",y,e),
// Stop autoplay
y.params.autoplay&&y.params.autoplayDisableOnInteraction&&y.stopAutoplay(),0===n||n===y.maxTranslate())return}else{if((new window.Date).getTime()-y.mousewheel.lastScrollTime>60)if(t<0)if(y.isEnd&&!y.params.loop||y.animating){if(y.params.mousewheelReleaseOnEdges)return!0}else y.slideNext(),y.emit("onScroll",y,e);else if(y.isBeginning&&!y.params.loop||y.animating){if(y.params.mousewheelReleaseOnEdges)return!0}else y.slidePrev(),y.emit("onScroll",y,e);y.mousewheel.lastScrollTime=(new window.Date).getTime()}return e.preventDefault?e.preventDefault():e.returnValue=!1,!1}}/**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
function u(/*object*/e){
// Reasonable defaults
var t=0,i=0,// spinX, spinY
s=0,n=0;// pixelX, pixelY
// Legacy
// side scrolling on FF with DOMMouseScroll
// delta in LINE units
// delta in PAGE units
// Fall-back if spin cannot be determined
return"detail"in e&&(i=e.detail),"wheelDelta"in e&&(i=-e.wheelDelta/120),"wheelDeltaY"in e&&(i=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=i,i=0),s=10*t,n=10*i,"deltaY"in e&&(n=e.deltaY),"deltaX"in e&&(s=e.deltaX),(s||n)&&e.deltaMode&&(1===e.deltaMode?(s*=40,n*=40):(s*=800,n*=800)),s&&!t&&(t=s<1?-1:1),n&&!i&&(i=n<1?-1:1),{spinX:t,spinY:i,pixelX:s,pixelY:n}}/*=========================
          Parallax
          ===========================*/
function d(t,i){t=e(t);var s,n,a,o=y.rtl?-1:1;s=t.attr("data-swiper-parallax")||"0",n=t.attr("data-swiper-parallax-x"),a=t.attr("data-swiper-parallax-y"),n||a?(n=n||"0",a=a||"0"):y.isHorizontal()?(n=s,a="0"):(a=s,n="0"),n=n.indexOf("%")>=0?parseInt(n,10)*i*o+"%":n*i*o+"px",a=a.indexOf("%")>=0?parseInt(a,10)*i+"%":a*i+"px",t.transform("translate3d("+n+", "+a+",0px)")}/*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
function p(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof t))return new t(s,n);var f={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,
// autoplay
autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,
// To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
iOSEdgeSwipeDetection:!1,iOSEdgeSwipeThreshold:20,
// Free mode
freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeMomentumVelocityRatio:1,freeModeSticky:!1,freeModeMinimumVelocity:.02,
// Autoheight
autoHeight:!1,
// Set wrapper width
setWrapperSize:!1,
// Virtual Translate
virtualTranslate:!1,
// Effects
effect:"slide",// 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},flip:{slideShadows:!0,limitRotation:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},
// Parallax
parallax:!1,
// Zoom
zoom:!1,zoomMax:3,zoomMin:1,zoomToggle:!0,
// Scrollbar
scrollbar:null,scrollbarHide:!0,scrollbarDraggable:!1,scrollbarSnapOnRelease:!1,
// Keyboard Mousewheel
keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,mousewheelSensitivity:1,mousewheelEventsTarged:"container",
// Hash Navigation
hashnav:!1,hashnavWatchState:!1,
// History
history:!1,
// Commong Nav State
replaceState:!1,
// Breakpoints
breakpoints:void 0,
// Slides grid
spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,slidesOffsetBefore:0,// in px
slidesOffsetAfter:0,// in px
// Round length
roundLengths:!1,
// Touches
touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,touchReleaseOnEdges:!1,
// Unique Navigation Elements
uniqueNavElements:!0,
// Pagination
pagination:null,paginationElement:"span",paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,paginationProgressRender:null,paginationFractionRender:null,paginationCustomRender:null,paginationType:"bullets",// 'bullets' or 'progress' or 'fraction' or 'custom'
// Resistance
resistance:!0,resistanceRatio:.85,
// Next/prev buttons
nextButton:null,prevButton:null,
// Progress
watchSlidesProgress:!1,watchSlidesVisibility:!1,
// Cursor
grabCursor:!1,
// Clicks
preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,
// Lazy Loading
lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingInPrevNextAmount:1,lazyLoadingOnTransitionStart:!1,
// Images
preloadImages:!0,updateOnImagesReady:!0,
// loop
loop:!1,loopAdditionalSlides:0,loopedSlides:null,
// Control
control:void 0,controlInverse:!1,controlBy:"slide",//or 'container'
normalizeSlideIndex:!0,
// Swiping/no swiping
allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,//'.swipe-handler',
noSwiping:!0,noSwipingClass:"swiper-no-swiping",
// Passive Listeners
passiveListeners:!0,
// NS
containerModifierClass:"swiper-container-",// NEW
slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideDuplicateActiveClass:"swiper-slide-duplicate-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slideDuplicateNextClass:"swiper-slide-duplicate-next",slidePrevClass:"swiper-slide-prev",slideDuplicatePrevClass:"swiper-slide-duplicate-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationCurrentClass:"swiper-pagination-current",paginationTotalClass:"swiper-pagination-total",paginationHiddenClass:"swiper-pagination-hidden",paginationProgressbarClass:"swiper-pagination-progressbar",paginationClickableClass:"swiper-pagination-clickable",// NEW
paginationModifierClass:"swiper-pagination-",// NEW
lazyLoadingClass:"swiper-lazy",lazyStatusLoadingClass:"swiper-lazy-loading",lazyStatusLoadedClass:"swiper-lazy-loaded",lazyPreloaderClass:"swiper-lazy-preloader",notificationClass:"swiper-notification",preloaderClass:"preloader",zoomContainerClass:"swiper-zoom-container",
// Observer
observer:!1,observeParents:!1,
// Accessibility
a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",
// Callbacks
runCallbacksOnInit:!0},m=n&&n.virtualTranslate;n=n||{};var g={};for(var v in n)if("object"!=typeof n[v]||null===n[v]||(n[v].nodeType||n[v]===window||n[v]===document||void 0!==i&&n[v]instanceof i||"undefined"!=typeof jQuery&&n[v]instanceof jQuery))g[v]=n[v];else{g[v]={};for(var _ in n[v])g[v][_]=n[v][_]}for(var b in f)if(void 0===n[b])n[b]=f[b];else if("object"==typeof n[b])for(var w in f[b])void 0===n[b][w]&&(n[b][w]=f[b][w]);
// Swiper
var y=this;if(
// Params
y.params=n,y.originalParams=g,
// Classname
y.classNames=[],/*=========================
          Dom Library and plugins
          ===========================*/
void 0!==e&&void 0!==i&&(e=i),(void 0!==e||(e=void 0===i?window.Dom7||window.Zepto||window.jQuery:i))&&(
// Export it to Swiper instance
y.$=e,/*=========================
          Breakpoints
          ===========================*/
y.currentBreakpoint=void 0,y.getActiveBreakpoint=function(){
//Get breakpoint for window width
if(!y.params.breakpoints)return!1;var e,t=!1,i=[];for(e in y.params.breakpoints)y.params.breakpoints.hasOwnProperty(e)&&i.push(e);i.sort(function(e,t){return parseInt(e,10)>parseInt(t,10)});for(var s=0;s<i.length;s++)(e=i[s])>=window.innerWidth&&!t&&(t=e);return t||"max"},y.setBreakpoint=function(){
//Set breakpoint for window width and update parameters
var e=y.getActiveBreakpoint();if(e&&y.currentBreakpoint!==e){var t=e in y.params.breakpoints?y.params.breakpoints[e]:y.originalParams,i=y.params.loop&&t.slidesPerView!==y.params.slidesPerView;for(var s in t)y.params[s]=t[s];y.currentBreakpoint=e,i&&y.destroyLoop&&y.reLoop(!0)}},
// Set breakpoint on load
y.params.breakpoints&&y.setBreakpoint(),/*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
y.container=e(s),0!==y.container.length)){if(y.container.length>1){var x=[];return y.container.each(function(){x.push(new t(this,n))}),x}
// Save instance in container HTML Element and in data
y.container[0].swiper=y,y.container.data("swiper",y),y.classNames.push(y.params.containerModifierClass+y.params.direction),y.params.freeMode&&y.classNames.push(y.params.containerModifierClass+"free-mode"),y.support.flexbox||(y.classNames.push(y.params.containerModifierClass+"no-flexbox"),y.params.slidesPerColumn=1),y.params.autoHeight&&y.classNames.push(y.params.containerModifierClass+"autoheight"),
// Enable slides progress when required
(y.params.parallax||y.params.watchSlidesVisibility)&&(y.params.watchSlidesProgress=!0),
// Max resistance when touchReleaseOnEdges
y.params.touchReleaseOnEdges&&(y.params.resistanceRatio=0),
// Coverflow / 3D
["cube","coverflow","flip"].indexOf(y.params.effect)>=0&&(y.support.transforms3d?(y.params.watchSlidesProgress=!0,y.classNames.push(y.params.containerModifierClass+"3d")):y.params.effect="slide"),"slide"!==y.params.effect&&y.classNames.push(y.params.containerModifierClass+y.params.effect),"cube"===y.params.effect&&(y.params.resistanceRatio=0,y.params.slidesPerView=1,y.params.slidesPerColumn=1,y.params.slidesPerGroup=1,y.params.centeredSlides=!1,y.params.spaceBetween=0,y.params.virtualTranslate=!0,y.params.setWrapperSize=!1),"fade"!==y.params.effect&&"flip"!==y.params.effect||(y.params.slidesPerView=1,y.params.slidesPerColumn=1,y.params.slidesPerGroup=1,y.params.watchSlidesProgress=!0,y.params.spaceBetween=0,y.params.setWrapperSize=!1,void 0===m&&(y.params.virtualTranslate=!0)),
// Grab Cursor
y.params.grabCursor&&y.support.touch&&(y.params.grabCursor=!1),
// Wrapper
y.wrapper=y.container.children("."+y.params.wrapperClass),
// Pagination
y.params.pagination&&(y.paginationContainer=e(y.params.pagination),y.params.uniqueNavElements&&"string"==typeof y.params.pagination&&y.paginationContainer.length>1&&1===y.container.find(y.params.pagination).length&&(y.paginationContainer=y.container.find(y.params.pagination)),"bullets"===y.params.paginationType&&y.params.paginationClickable?y.paginationContainer.addClass(y.params.paginationModifierClass+"clickable"):y.params.paginationClickable=!1,y.paginationContainer.addClass(y.params.paginationModifierClass+y.params.paginationType)),
// Next/Prev Buttons
(y.params.nextButton||y.params.prevButton)&&(y.params.nextButton&&(y.nextButton=e(y.params.nextButton),y.params.uniqueNavElements&&"string"==typeof y.params.nextButton&&y.nextButton.length>1&&1===y.container.find(y.params.nextButton).length&&(y.nextButton=y.container.find(y.params.nextButton))),y.params.prevButton&&(y.prevButton=e(y.params.prevButton),y.params.uniqueNavElements&&"string"==typeof y.params.prevButton&&y.prevButton.length>1&&1===y.container.find(y.params.prevButton).length&&(y.prevButton=y.container.find(y.params.prevButton)))),
// Is Horizontal
y.isHorizontal=function(){return"horizontal"===y.params.direction},
// s.isH = isH;
// RTL
y.rtl=y.isHorizontal()&&("rtl"===y.container[0].dir.toLowerCase()||"rtl"===y.container.css("direction")),y.rtl&&y.classNames.push(y.params.containerModifierClass+"rtl"),
// Wrong RTL support
y.rtl&&(y.wrongRTL="-webkit-box"===y.wrapper.css("display")),
// Columns
y.params.slidesPerColumn>1&&y.classNames.push(y.params.containerModifierClass+"multirow"),
// Check for Android
y.device.android&&y.classNames.push(y.params.containerModifierClass+"android"),
// Add classes
y.container.addClass(y.classNames.join(" ")),
// Translate
y.translate=0,
// Progress
y.progress=0,
// Velocity
y.velocity=0,/*=========================
          Locks, unlocks
          ===========================*/
y.lockSwipeToNext=function(){y.params.allowSwipeToNext=!1,!1===y.params.allowSwipeToPrev&&y.params.grabCursor&&y.unsetGrabCursor()},y.lockSwipeToPrev=function(){y.params.allowSwipeToPrev=!1,!1===y.params.allowSwipeToNext&&y.params.grabCursor&&y.unsetGrabCursor()},y.lockSwipes=function(){y.params.allowSwipeToNext=y.params.allowSwipeToPrev=!1,y.params.grabCursor&&y.unsetGrabCursor()},y.unlockSwipeToNext=function(){y.params.allowSwipeToNext=!0,!0===y.params.allowSwipeToPrev&&y.params.grabCursor&&y.setGrabCursor()},y.unlockSwipeToPrev=function(){y.params.allowSwipeToPrev=!0,!0===y.params.allowSwipeToNext&&y.params.grabCursor&&y.setGrabCursor()},y.unlockSwipes=function(){y.params.allowSwipeToNext=y.params.allowSwipeToPrev=!0,y.params.grabCursor&&y.setGrabCursor()},/*=========================
          Set grab cursor
          ===========================*/
y.setGrabCursor=function(e){y.container[0].style.cursor="move",y.container[0].style.cursor=e?"-webkit-grabbing":"-webkit-grab",y.container[0].style.cursor=e?"-moz-grabbin":"-moz-grab",y.container[0].style.cursor=e?"grabbing":"grab"},y.unsetGrabCursor=function(){y.container[0].style.cursor=""},y.params.grabCursor&&y.setGrabCursor(),/*=========================
          Update on Images Ready
          ===========================*/
y.imagesToLoad=[],y.imagesLoaded=0,y.loadImage=function(e,t,i,s,n,a){function o(){a&&a()}var r;e.complete&&n?//image already loaded...
o():t?(r=new window.Image,r.onload=o,r.onerror=o,s&&(r.sizes=s),i&&(r.srcset=i),t&&(r.src=t)):o()},y.preloadImages=function(){function e(){void 0!==y&&null!==y&&y&&(void 0!==y.imagesLoaded&&y.imagesLoaded++,y.imagesLoaded===y.imagesToLoad.length&&(y.params.updateOnImagesReady&&y.update(),y.emit("onImagesReady",y)))}y.imagesToLoad=y.container.find("img");for(var t=0;t<y.imagesToLoad.length;t++)y.loadImage(y.imagesToLoad[t],y.imagesToLoad[t].currentSrc||y.imagesToLoad[t].getAttribute("src"),y.imagesToLoad[t].srcset||y.imagesToLoad[t].getAttribute("srcset"),y.imagesToLoad[t].sizes||y.imagesToLoad[t].getAttribute("sizes"),!0,e)},/*=========================
          Autoplay
          ===========================*/
y.autoplayTimeoutId=void 0,y.autoplaying=!1,y.autoplayPaused=!1,y.startAutoplay=function(){return void 0===y.autoplayTimeoutId&&(!!y.params.autoplay&&(!y.autoplaying&&(y.autoplaying=!0,y.emit("onAutoplayStart",y),void o())))},y.stopAutoplay=function(e){y.autoplayTimeoutId&&(y.autoplayTimeoutId&&clearTimeout(y.autoplayTimeoutId),y.autoplaying=!1,y.autoplayTimeoutId=void 0,y.emit("onAutoplayStop",y))},y.pauseAutoplay=function(e){y.autoplayPaused||(y.autoplayTimeoutId&&clearTimeout(y.autoplayTimeoutId),y.autoplayPaused=!0,0===e?(y.autoplayPaused=!1,o()):y.wrapper.transitionEnd(function(){y&&(y.autoplayPaused=!1,y.autoplaying?o():y.stopAutoplay())}))},/*=========================
          Min/Max Translate
          ===========================*/
y.minTranslate=function(){return-y.snapGrid[0]},y.maxTranslate=function(){return-y.snapGrid[y.snapGrid.length-1]},/*=========================
          Slider/slides sizes
          ===========================*/
y.updateAutoHeight=function(){var e,t=[],i=0;
// Find slides currently in view
if("auto"!==y.params.slidesPerView&&y.params.slidesPerView>1)for(e=0;e<Math.ceil(y.params.slidesPerView);e++){var s=y.activeIndex+e;if(s>y.slides.length)break;t.push(y.slides.eq(s)[0])}else t.push(y.slides.eq(y.activeIndex)[0]);
// Find new height from heighest slide in view
for(e=0;e<t.length;e++)if(void 0!==t[e]){var n=t[e].offsetHeight;i=n>i?n:i}
// Update Height
i&&y.wrapper.css("height",i+"px")},y.updateContainerSize=function(){var e,t;e=void 0!==y.params.width?y.params.width:y.container[0].clientWidth,t=void 0!==y.params.height?y.params.height:y.container[0].clientHeight,0===e&&y.isHorizontal()||0===t&&!y.isHorizontal()||(
//Subtract paddings
e=e-parseInt(y.container.css("padding-left"),10)-parseInt(y.container.css("padding-right"),10),t=t-parseInt(y.container.css("padding-top"),10)-parseInt(y.container.css("padding-bottom"),10),
// Store values
y.width=e,y.height=t,y.size=y.isHorizontal()?y.width:y.height)},y.updateSlidesSize=function(){y.slides=y.wrapper.children("."+y.params.slideClass),y.snapGrid=[],y.slidesGrid=[],y.slidesSizesGrid=[];var e,t=y.params.spaceBetween,i=-y.params.slidesOffsetBefore,s=0,n=0;if(void 0!==y.size){"string"==typeof t&&t.indexOf("%")>=0&&(t=parseFloat(t.replace("%",""))/100*y.size),y.virtualSize=-t,
// reset margins
y.rtl?y.slides.css({marginLeft:"",marginTop:""}):y.slides.css({marginRight:"",marginBottom:""});var o;y.params.slidesPerColumn>1&&(o=Math.floor(y.slides.length/y.params.slidesPerColumn)===y.slides.length/y.params.slidesPerColumn?y.slides.length:Math.ceil(y.slides.length/y.params.slidesPerColumn)*y.params.slidesPerColumn,"auto"!==y.params.slidesPerView&&"row"===y.params.slidesPerColumnFill&&(o=Math.max(o,y.params.slidesPerView*y.params.slidesPerColumn)));
// Calc slides
var r,l=y.params.slidesPerColumn,h=o/l,c=h-(y.params.slidesPerColumn*h-y.slides.length);for(e=0;e<y.slides.length;e++){r=0;var u=y.slides.eq(e);if(y.params.slidesPerColumn>1){
// Set slides order
var d,p,f;"column"===y.params.slidesPerColumnFill?(p=Math.floor(e/l),f=e-p*l,(p>c||p===c&&f===l-1)&&++f>=l&&(f=0,p++),d=p+f*o/l,u.css({"-webkit-box-ordinal-group":d,"-moz-box-ordinal-group":d,"-ms-flex-order":d,"-webkit-order":d,order:d})):(f=Math.floor(e/h),p=e-f*h),u.css("margin-"+(y.isHorizontal()?"top":"left"),0!==f&&y.params.spaceBetween&&y.params.spaceBetween+"px").attr("data-swiper-column",p).attr("data-swiper-row",f)}"none"!==u.css("display")&&("auto"===y.params.slidesPerView?(r=y.isHorizontal()?u.outerWidth(!0):u.outerHeight(!0),y.params.roundLengths&&(r=a(r))):(r=(y.size-(y.params.slidesPerView-1)*t)/y.params.slidesPerView,y.params.roundLengths&&(r=a(r)),y.isHorizontal()?y.slides[e].style.width=r+"px":y.slides[e].style.height=r+"px"),y.slides[e].swiperSlideSize=r,y.slidesSizesGrid.push(r),y.params.centeredSlides?(i=i+r/2+s/2+t,0===e&&(i=i-y.size/2-t),Math.abs(i)<.001&&(i=0),n%y.params.slidesPerGroup==0&&y.snapGrid.push(i),y.slidesGrid.push(i)):(n%y.params.slidesPerGroup==0&&y.snapGrid.push(i),y.slidesGrid.push(i),i=i+r+t),y.virtualSize+=r+t,s=r,n++)}y.virtualSize=Math.max(y.virtualSize,y.size)+y.params.slidesOffsetAfter;var m;if(y.rtl&&y.wrongRTL&&("slide"===y.params.effect||"coverflow"===y.params.effect)&&y.wrapper.css({width:y.virtualSize+y.params.spaceBetween+"px"}),y.support.flexbox&&!y.params.setWrapperSize||(y.isHorizontal()?y.wrapper.css({width:y.virtualSize+y.params.spaceBetween+"px"}):y.wrapper.css({height:y.virtualSize+y.params.spaceBetween+"px"})),y.params.slidesPerColumn>1&&(y.virtualSize=(r+y.params.spaceBetween)*o,y.virtualSize=Math.ceil(y.virtualSize/y.params.slidesPerColumn)-y.params.spaceBetween,y.isHorizontal()?y.wrapper.css({width:y.virtualSize+y.params.spaceBetween+"px"}):y.wrapper.css({height:y.virtualSize+y.params.spaceBetween+"px"}),y.params.centeredSlides)){for(m=[],e=0;e<y.snapGrid.length;e++)y.snapGrid[e]<y.virtualSize+y.snapGrid[0]&&m.push(y.snapGrid[e]);y.snapGrid=m}
// Remove last grid elements depending on width
if(!y.params.centeredSlides){for(m=[],e=0;e<y.snapGrid.length;e++)y.snapGrid[e]<=y.virtualSize-y.size&&m.push(y.snapGrid[e]);y.snapGrid=m,Math.floor(y.virtualSize-y.size)-Math.floor(y.snapGrid[y.snapGrid.length-1])>1&&y.snapGrid.push(y.virtualSize-y.size)}0===y.snapGrid.length&&(y.snapGrid=[0]),0!==y.params.spaceBetween&&(y.isHorizontal()?y.rtl?y.slides.css({marginLeft:t+"px"}):y.slides.css({marginRight:t+"px"}):y.slides.css({marginBottom:t+"px"})),y.params.watchSlidesProgress&&y.updateSlidesOffset()}},y.updateSlidesOffset=function(){for(var e=0;e<y.slides.length;e++)y.slides[e].swiperSlideOffset=y.isHorizontal()?y.slides[e].offsetLeft:y.slides[e].offsetTop},/*=========================
          Dynamic Slides Per View
          ===========================*/
y.currentSlidesPerView=function(){var e,t,i=1;if(y.params.centeredSlides){var s,n=y.slides[y.activeIndex].swiperSlideSize;for(e=y.activeIndex+1;e<y.slides.length;e++)y.slides[e]&&!s&&(n+=y.slides[e].swiperSlideSize,i++,n>y.size&&(s=!0));for(t=y.activeIndex-1;t>=0;t--)y.slides[t]&&!s&&(n+=y.slides[t].swiperSlideSize,i++,n>y.size&&(s=!0))}else for(e=y.activeIndex+1;e<y.slides.length;e++)y.slidesGrid[e]-y.slidesGrid[y.activeIndex]<y.size&&i++;return i},/*=========================
          Slider/slides progress
          ===========================*/
y.updateSlidesProgress=function(e){if(void 0===e&&(e=y.translate||0),0!==y.slides.length){void 0===y.slides[0].swiperSlideOffset&&y.updateSlidesOffset();var t=-e;y.rtl&&(t=e),
// Visible Slides
y.slides.removeClass(y.params.slideVisibleClass);for(var i=0;i<y.slides.length;i++){var s=y.slides[i],n=(t+(y.params.centeredSlides?y.minTranslate():0)-s.swiperSlideOffset)/(s.swiperSlideSize+y.params.spaceBetween);if(y.params.watchSlidesVisibility){var a=-(t-s.swiperSlideOffset),o=a+y.slidesSizesGrid[i];(a>=0&&a<y.size||o>0&&o<=y.size||a<=0&&o>=y.size)&&y.slides.eq(i).addClass(y.params.slideVisibleClass)}s.progress=y.rtl?-n:n}}},y.updateProgress=function(e){void 0===e&&(e=y.translate||0);var t=y.maxTranslate()-y.minTranslate(),i=y.isBeginning,s=y.isEnd;0===t?(y.progress=0,y.isBeginning=y.isEnd=!0):(y.progress=(e-y.minTranslate())/t,y.isBeginning=y.progress<=0,y.isEnd=y.progress>=1),y.isBeginning&&!i&&y.emit("onReachBeginning",y),y.isEnd&&!s&&y.emit("onReachEnd",y),y.params.watchSlidesProgress&&y.updateSlidesProgress(e),y.emit("onProgress",y,y.progress)},y.updateActiveIndex=function(){var e,t,i,s=y.rtl?y.translate:-y.translate;for(t=0;t<y.slidesGrid.length;t++)void 0!==y.slidesGrid[t+1]?s>=y.slidesGrid[t]&&s<y.slidesGrid[t+1]-(y.slidesGrid[t+1]-y.slidesGrid[t])/2?e=t:s>=y.slidesGrid[t]&&s<y.slidesGrid[t+1]&&(e=t+1):s>=y.slidesGrid[t]&&(e=t);
// Normalize slideIndex
y.params.normalizeSlideIndex&&(e<0||void 0===e)&&(e=0),
// for (i = 0; i < s.slidesGrid.length; i++) {
// if (- translate >= s.slidesGrid[i]) {
// newActiveIndex = i;
// }
// }
i=Math.floor(e/y.params.slidesPerGroup),i>=y.snapGrid.length&&(i=y.snapGrid.length-1),e!==y.activeIndex&&(y.snapIndex=i,y.previousIndex=y.activeIndex,y.activeIndex=e,y.updateClasses(),y.updateRealIndex())},y.updateRealIndex=function(){y.realIndex=parseInt(y.slides.eq(y.activeIndex).attr("data-swiper-slide-index")||y.activeIndex,10)},/*=========================
          Classes
          ===========================*/
y.updateClasses=function(){y.slides.removeClass(y.params.slideActiveClass+" "+y.params.slideNextClass+" "+y.params.slidePrevClass+" "+y.params.slideDuplicateActiveClass+" "+y.params.slideDuplicateNextClass+" "+y.params.slideDuplicatePrevClass);var t=y.slides.eq(y.activeIndex);
// Active classes
t.addClass(y.params.slideActiveClass),n.loop&&(
// Duplicate to all looped slides
t.hasClass(y.params.slideDuplicateClass)?y.wrapper.children("."+y.params.slideClass+":not(."+y.params.slideDuplicateClass+')[data-swiper-slide-index="'+y.realIndex+'"]').addClass(y.params.slideDuplicateActiveClass):y.wrapper.children("."+y.params.slideClass+"."+y.params.slideDuplicateClass+'[data-swiper-slide-index="'+y.realIndex+'"]').addClass(y.params.slideDuplicateActiveClass));
// Next Slide
var i=t.next("."+y.params.slideClass).addClass(y.params.slideNextClass);y.params.loop&&0===i.length&&(i=y.slides.eq(0),i.addClass(y.params.slideNextClass));
// Prev Slide
var s=t.prev("."+y.params.slideClass).addClass(y.params.slidePrevClass);
// Pagination
if(y.params.loop&&0===s.length&&(s=y.slides.eq(-1),s.addClass(y.params.slidePrevClass)),n.loop&&(
// Duplicate to all looped slides
i.hasClass(y.params.slideDuplicateClass)?y.wrapper.children("."+y.params.slideClass+":not(."+y.params.slideDuplicateClass+')[data-swiper-slide-index="'+i.attr("data-swiper-slide-index")+'"]').addClass(y.params.slideDuplicateNextClass):y.wrapper.children("."+y.params.slideClass+"."+y.params.slideDuplicateClass+'[data-swiper-slide-index="'+i.attr("data-swiper-slide-index")+'"]').addClass(y.params.slideDuplicateNextClass),s.hasClass(y.params.slideDuplicateClass)?y.wrapper.children("."+y.params.slideClass+":not(."+y.params.slideDuplicateClass+')[data-swiper-slide-index="'+s.attr("data-swiper-slide-index")+'"]').addClass(y.params.slideDuplicatePrevClass):y.wrapper.children("."+y.params.slideClass+"."+y.params.slideDuplicateClass+'[data-swiper-slide-index="'+s.attr("data-swiper-slide-index")+'"]').addClass(y.params.slideDuplicatePrevClass)),y.paginationContainer&&y.paginationContainer.length>0){
// Current/Total
var a,o=y.params.loop?Math.ceil((y.slides.length-2*y.loopedSlides)/y.params.slidesPerGroup):y.snapGrid.length;if(y.params.loop?(a=Math.ceil((y.activeIndex-y.loopedSlides)/y.params.slidesPerGroup),a>y.slides.length-1-2*y.loopedSlides&&(a-=y.slides.length-2*y.loopedSlides),a>o-1&&(a-=o),a<0&&"bullets"!==y.params.paginationType&&(a=o+a)):a=void 0!==y.snapIndex?y.snapIndex:y.activeIndex||0,
// Types
"bullets"===y.params.paginationType&&y.bullets&&y.bullets.length>0&&(y.bullets.removeClass(y.params.bulletActiveClass),y.paginationContainer.length>1?y.bullets.each(function(){e(this).index()===a&&e(this).addClass(y.params.bulletActiveClass)}):y.bullets.eq(a).addClass(y.params.bulletActiveClass)),"fraction"===y.params.paginationType&&(y.paginationContainer.find("."+y.params.paginationCurrentClass).text(a+1),y.paginationContainer.find("."+y.params.paginationTotalClass).text(o)),"progress"===y.params.paginationType){var r=(a+1)/o,l=r,h=1;y.isHorizontal()||(h=r,l=1),y.paginationContainer.find("."+y.params.paginationProgressbarClass).transform("translate3d(0,0,0) scaleX("+l+") scaleY("+h+")").transition(y.params.speed)}"custom"===y.params.paginationType&&y.params.paginationCustomRender&&(y.paginationContainer.html(y.params.paginationCustomRender(y,a+1,o)),y.emit("onPaginationRendered",y,y.paginationContainer[0]))}
// Next/active buttons
y.params.loop||(y.params.prevButton&&y.prevButton&&y.prevButton.length>0&&(y.isBeginning?(y.prevButton.addClass(y.params.buttonDisabledClass),y.params.a11y&&y.a11y&&y.a11y.disable(y.prevButton)):(y.prevButton.removeClass(y.params.buttonDisabledClass),y.params.a11y&&y.a11y&&y.a11y.enable(y.prevButton))),y.params.nextButton&&y.nextButton&&y.nextButton.length>0&&(y.isEnd?(y.nextButton.addClass(y.params.buttonDisabledClass),y.params.a11y&&y.a11y&&y.a11y.disable(y.nextButton)):(y.nextButton.removeClass(y.params.buttonDisabledClass),y.params.a11y&&y.a11y&&y.a11y.enable(y.nextButton))))},/*=========================
          Pagination
          ===========================*/
y.updatePagination=function(){if(y.params.pagination&&y.paginationContainer&&y.paginationContainer.length>0){var e="";if("bullets"===y.params.paginationType){for(var t=y.params.loop?Math.ceil((y.slides.length-2*y.loopedSlides)/y.params.slidesPerGroup):y.snapGrid.length,i=0;i<t;i++)y.params.paginationBulletRender?e+=y.params.paginationBulletRender(y,i,y.params.bulletClass):e+="<"+y.params.paginationElement+' class="'+y.params.bulletClass+'"></'+y.params.paginationElement+">";y.paginationContainer.html(e),y.bullets=y.paginationContainer.find("."+y.params.bulletClass),y.params.paginationClickable&&y.params.a11y&&y.a11y&&y.a11y.initPagination()}"fraction"===y.params.paginationType&&(e=y.params.paginationFractionRender?y.params.paginationFractionRender(y,y.params.paginationCurrentClass,y.params.paginationTotalClass):'<span class="'+y.params.paginationCurrentClass+'"></span> / <span class="'+y.params.paginationTotalClass+'"></span>',y.paginationContainer.html(e)),"progress"===y.params.paginationType&&(e=y.params.paginationProgressRender?y.params.paginationProgressRender(y,y.params.paginationProgressbarClass):'<span class="'+y.params.paginationProgressbarClass+'"></span>',y.paginationContainer.html(e)),"custom"!==y.params.paginationType&&y.emit("onPaginationRendered",y,y.paginationContainer[0])}},/*=========================
          Common update method
          ===========================*/
y.update=function(e){function t(){y.rtl,y.translate;i=Math.min(Math.max(y.translate,y.maxTranslate()),y.minTranslate()),y.setWrapperTranslate(i),y.updateActiveIndex(),y.updateClasses()}if(y)if(y.updateContainerSize(),y.updateSlidesSize(),y.updateProgress(),y.updatePagination(),y.updateClasses(),y.params.scrollbar&&y.scrollbar&&y.scrollbar.set(),e){var i;y.controller&&y.controller.spline&&(y.controller.spline=void 0),y.params.freeMode?(t(),y.params.autoHeight&&y.updateAutoHeight()):(("auto"===y.params.slidesPerView||y.params.slidesPerView>1)&&y.isEnd&&!y.params.centeredSlides?y.slideTo(y.slides.length-1,0,!1,!0):y.slideTo(y.activeIndex,0,!1,!0))||t()}else y.params.autoHeight&&y.updateAutoHeight()},/*=========================
          Resize Handler
          ===========================*/
y.onResize=function(e){
//Breakpoints
y.params.breakpoints&&y.setBreakpoint();
// Disable locks on resize
var t=y.params.allowSwipeToPrev,i=y.params.allowSwipeToNext;y.params.allowSwipeToPrev=y.params.allowSwipeToNext=!0,y.updateContainerSize(),y.updateSlidesSize(),("auto"===y.params.slidesPerView||y.params.freeMode||e)&&y.updatePagination(),y.params.scrollbar&&y.scrollbar&&y.scrollbar.set(),y.controller&&y.controller.spline&&(y.controller.spline=void 0);var s=!1;if(y.params.freeMode){var n=Math.min(Math.max(y.translate,y.maxTranslate()),y.minTranslate());y.setWrapperTranslate(n),y.updateActiveIndex(),y.updateClasses(),y.params.autoHeight&&y.updateAutoHeight()}else y.updateClasses(),s=("auto"===y.params.slidesPerView||y.params.slidesPerView>1)&&y.isEnd&&!y.params.centeredSlides?y.slideTo(y.slides.length-1,0,!1,!0):y.slideTo(y.activeIndex,0,!1,!0);y.params.lazyLoading&&!s&&y.lazy&&y.lazy.load(),
// Return locks after resize
y.params.allowSwipeToPrev=t,y.params.allowSwipeToNext=i},/*=========================
          Events
          ===========================*/
//Define Touch Events
y.touchEventsDesktop={start:"mousedown",move:"mousemove",end:"mouseup"},window.navigator.pointerEnabled?y.touchEventsDesktop={start:"pointerdown",move:"pointermove",end:"pointerup"}:window.navigator.msPointerEnabled&&(y.touchEventsDesktop={start:"MSPointerDown",move:"MSPointerMove",end:"MSPointerUp"}),y.touchEvents={start:y.support.touch||!y.params.simulateTouch?"touchstart":y.touchEventsDesktop.start,move:y.support.touch||!y.params.simulateTouch?"touchmove":y.touchEventsDesktop.move,end:y.support.touch||!y.params.simulateTouch?"touchend":y.touchEventsDesktop.end},
// WP8 Touch Events Fix
(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===y.params.touchEventsTarget?y.container:y.wrapper).addClass("swiper-wp8-"+y.params.direction),
// Attach/detach events
y.initEvents=function(e){var t=e?"off":"on",i=e?"removeEventListener":"addEventListener",s="container"===y.params.touchEventsTarget?y.container[0]:y.wrapper[0],a=y.support.touch?s:document,o=!!y.params.nested;
//Touch Events
if(y.browser.ie)s[i](y.touchEvents.start,y.onTouchStart,!1),a[i](y.touchEvents.move,y.onTouchMove,o),a[i](y.touchEvents.end,y.onTouchEnd,!1);else{if(y.support.touch){var r=!("touchstart"!==y.touchEvents.start||!y.support.passiveListener||!y.params.passiveListeners)&&{passive:!0,capture:!1};s[i](y.touchEvents.start,y.onTouchStart,r),s[i](y.touchEvents.move,y.onTouchMove,o),s[i](y.touchEvents.end,y.onTouchEnd,r)}(n.simulateTouch&&!y.device.ios&&!y.device.android||n.simulateTouch&&!y.support.touch&&y.device.ios)&&(s[i]("mousedown",y.onTouchStart,!1),document[i]("mousemove",y.onTouchMove,o),document[i]("mouseup",y.onTouchEnd,!1))}window[i]("resize",y.onResize),
// Next, Prev, Index
y.params.nextButton&&y.nextButton&&y.nextButton.length>0&&(y.nextButton[t]("click",y.onClickNext),y.params.a11y&&y.a11y&&y.nextButton[t]("keydown",y.a11y.onEnterKey)),y.params.prevButton&&y.prevButton&&y.prevButton.length>0&&(y.prevButton[t]("click",y.onClickPrev),y.params.a11y&&y.a11y&&y.prevButton[t]("keydown",y.a11y.onEnterKey)),y.params.pagination&&y.params.paginationClickable&&(y.paginationContainer[t]("click","."+y.params.bulletClass,y.onClickIndex),y.params.a11y&&y.a11y&&y.paginationContainer[t]("keydown","."+y.params.bulletClass,y.a11y.onEnterKey)),
// Prevent Links Clicks
(y.params.preventClicks||y.params.preventClicksPropagation)&&s[i]("click",y.preventClicks,!0)},y.attachEvents=function(){y.initEvents()},y.detachEvents=function(){y.initEvents(!0)},/*=========================
          Handle Clicks
          ===========================*/
// Prevent Clicks
y.allowClick=!0,y.preventClicks=function(e){y.allowClick||(y.params.preventClicks&&e.preventDefault(),y.params.preventClicksPropagation&&y.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},
// Clicks
y.onClickNext=function(e){e.preventDefault(),y.isEnd&&!y.params.loop||y.slideNext()},y.onClickPrev=function(e){e.preventDefault(),y.isBeginning&&!y.params.loop||y.slidePrev()},y.onClickIndex=function(t){t.preventDefault();var i=e(this).index()*y.params.slidesPerGroup;y.params.loop&&(i+=y.loopedSlides),y.slideTo(i)},y.updateClickedSlide=function(t){var i=r(t,"."+y.params.slideClass),s=!1;if(i)for(var n=0;n<y.slides.length;n++)y.slides[n]===i&&(s=!0);if(!i||!s)return y.clickedSlide=void 0,void(y.clickedIndex=void 0);if(y.clickedSlide=i,y.clickedIndex=e(i).index(),y.params.slideToClickedSlide&&void 0!==y.clickedIndex&&y.clickedIndex!==y.activeIndex){var a,o=y.clickedIndex,l="auto"===y.params.slidesPerView?y.currentSlidesPerView():y.params.slidesPerView;if(y.params.loop){if(y.animating)return;a=parseInt(e(y.clickedSlide).attr("data-swiper-slide-index"),10),y.params.centeredSlides?o<y.loopedSlides-l/2||o>y.slides.length-y.loopedSlides+l/2?(y.fixLoop(),o=y.wrapper.children("."+y.params.slideClass+'[data-swiper-slide-index="'+a+'"]:not(.'+y.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){y.slideTo(o)},0)):y.slideTo(o):o>y.slides.length-l?(y.fixLoop(),o=y.wrapper.children("."+y.params.slideClass+'[data-swiper-slide-index="'+a+'"]:not(.'+y.params.slideDuplicateClass+")").eq(0).index(),setTimeout(function(){y.slideTo(o)},0)):y.slideTo(o)}else y.slideTo(o)}};var C,S,k,T,D,M,I,P,z,E,
// Form elements to match
A="input, select, textarea, button, video",
// Last click time
O=Date.now(),
//Velocities
H=[];
// Animating Flag
y.animating=!1,
// Touches information
y.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};
// Touch handlers
var $,L;y.onTouchStart=function(t){if(t.originalEvent&&(t=t.originalEvent),($="touchstart"===t.type)||!("which"in t)||3!==t.which){if(y.params.noSwiping&&r(t,"."+y.params.noSwipingClass))return void(y.allowClick=!0);if(!y.params.swipeHandler||r(t,y.params.swipeHandler)){var i=y.touches.currentX="touchstart"===t.type?t.targetTouches[0].pageX:t.pageX,s=y.touches.currentY="touchstart"===t.type?t.targetTouches[0].pageY:t.pageY;
// Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
if(!(y.device.ios&&y.params.iOSEdgeSwipeDetection&&i<=y.params.iOSEdgeSwipeThreshold)){if(C=!0,S=!1,k=!0,D=void 0,L=void 0,y.touches.startX=i,y.touches.startY=s,T=Date.now(),y.allowClick=!0,y.updateContainerSize(),y.swipeDirection=void 0,y.params.threshold>0&&(P=!1),"touchstart"!==t.type){var n=!0;e(t.target).is(A)&&(n=!1),document.activeElement&&e(document.activeElement).is(A)&&document.activeElement.blur(),n&&t.preventDefault()}y.emit("onTouchStart",y,t)}}}},y.onTouchMove=function(t){if(t.originalEvent&&(t=t.originalEvent),!$||"mousemove"!==t.type){if(t.preventedByNestedSwiper)return y.touches.startX="touchmove"===t.type?t.targetTouches[0].pageX:t.pageX,void(y.touches.startY="touchmove"===t.type?t.targetTouches[0].pageY:t.pageY);if(y.params.onlyExternal)
// isMoved = true;
return y.allowClick=!1,void(C&&(y.touches.startX=y.touches.currentX="touchmove"===t.type?t.targetTouches[0].pageX:t.pageX,y.touches.startY=y.touches.currentY="touchmove"===t.type?t.targetTouches[0].pageY:t.pageY,T=Date.now()));if($&&y.params.touchReleaseOnEdges&&!y.params.loop)if(y.isHorizontal()){if(y.touches.currentX<y.touches.startX&&y.translate<=y.maxTranslate()||y.touches.currentX>y.touches.startX&&y.translate>=y.minTranslate())return}else
// Vertical
if(y.touches.currentY<y.touches.startY&&y.translate<=y.maxTranslate()||y.touches.currentY>y.touches.startY&&y.translate>=y.minTranslate())return;if($&&document.activeElement&&t.target===document.activeElement&&e(t.target).is(A))return S=!0,void(y.allowClick=!1);if(k&&y.emit("onTouchMove",y,t),!(t.targetTouches&&t.targetTouches.length>1)){if(y.touches.currentX="touchmove"===t.type?t.targetTouches[0].pageX:t.pageX,y.touches.currentY="touchmove"===t.type?t.targetTouches[0].pageY:t.pageY,void 0===D){var i;y.isHorizontal()&&y.touches.currentY===y.touches.startY||!y.isHorizontal()&&y.touches.currentX===y.touches.startX?D=!1:(i=180*Math.atan2(Math.abs(y.touches.currentY-y.touches.startY),Math.abs(y.touches.currentX-y.touches.startX))/Math.PI,D=y.isHorizontal()?i>y.params.touchAngle:90-i>y.params.touchAngle)}if(D&&y.emit("onTouchMoveOpposite",y,t),void 0===L&&y.browser.ieTouch&&(y.touches.currentX===y.touches.startX&&y.touches.currentY===y.touches.startY||(L=!0)),C){if(D)return void(C=!1);if(L||!y.browser.ieTouch){y.allowClick=!1,y.emit("onSliderMove",y,t),t.preventDefault(),y.params.touchMoveStopPropagation&&!y.params.nested&&t.stopPropagation(),S||(n.loop&&y.fixLoop(),I=y.getWrapperTranslate(),y.setWrapperTransition(0),y.animating&&y.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),y.params.autoplay&&y.autoplaying&&(y.params.autoplayDisableOnInteraction?y.stopAutoplay():y.pauseAutoplay()),E=!1,
//Grab Cursor
!y.params.grabCursor||!0!==y.params.allowSwipeToNext&&!0!==y.params.allowSwipeToPrev||y.setGrabCursor(!0)),S=!0;var s=y.touches.diff=y.isHorizontal()?y.touches.currentX-y.touches.startX:y.touches.currentY-y.touches.startY;s*=y.params.touchRatio,y.rtl&&(s=-s),y.swipeDirection=s>0?"prev":"next",M=s+I;var a=!0;
// Threshold
if(s>0&&M>y.minTranslate()?(a=!1,y.params.resistance&&(M=y.minTranslate()-1+Math.pow(-y.minTranslate()+I+s,y.params.resistanceRatio))):s<0&&M<y.maxTranslate()&&(a=!1,y.params.resistance&&(M=y.maxTranslate()+1-Math.pow(y.maxTranslate()-I-s,y.params.resistanceRatio))),a&&(t.preventedByNestedSwiper=!0),
// Directions locks
!y.params.allowSwipeToNext&&"next"===y.swipeDirection&&M<I&&(M=I),!y.params.allowSwipeToPrev&&"prev"===y.swipeDirection&&M>I&&(M=I),y.params.threshold>0){if(!(Math.abs(s)>y.params.threshold||P))return void(M=I);if(!P)return P=!0,y.touches.startX=y.touches.currentX,y.touches.startY=y.touches.currentY,M=I,void(y.touches.diff=y.isHorizontal()?y.touches.currentX-y.touches.startX:y.touches.currentY-y.touches.startY)}y.params.followFinger&&(
// Update active index in free mode
(y.params.freeMode||y.params.watchSlidesProgress)&&y.updateActiveIndex(),y.params.freeMode&&(
//Velocity
0===H.length&&H.push({position:y.touches[y.isHorizontal()?"startX":"startY"],time:T}),H.push({position:y.touches[y.isHorizontal()?"currentX":"currentY"],time:(new window.Date).getTime()})),
// Update progress
y.updateProgress(M),
// Update translate
y.setWrapperTranslate(M))}}}}},y.onTouchEnd=function(t){if(t.originalEvent&&(t=t.originalEvent),k&&y.emit("onTouchEnd",y,t),k=!1,C){
//Return Grab Cursor
y.params.grabCursor&&S&&C&&(!0===y.params.allowSwipeToNext||!0===y.params.allowSwipeToPrev)&&y.setGrabCursor(!1);
// Time diff
var i=Date.now(),s=i-T;if(
// Tap, doubleTap, Click
y.allowClick&&(y.updateClickedSlide(t),y.emit("onTap",y,t),s<300&&i-O>300&&(z&&clearTimeout(z),z=setTimeout(function(){y&&(y.params.paginationHide&&y.paginationContainer.length>0&&!e(t.target).hasClass(y.params.bulletClass)&&y.paginationContainer.toggleClass(y.params.paginationHiddenClass),y.emit("onClick",y,t))},300)),s<300&&i-O<300&&(z&&clearTimeout(z),y.emit("onDoubleTap",y,t))),O=Date.now(),setTimeout(function(){y&&(y.allowClick=!0)},0),!C||!S||!y.swipeDirection||0===y.touches.diff||M===I)return void(C=S=!1);C=S=!1;var n;if(n=y.params.followFinger?y.rtl?y.translate:-y.translate:-M,y.params.freeMode){if(n<-y.minTranslate())return void y.slideTo(y.activeIndex);if(n>-y.maxTranslate())return void(y.slides.length<y.snapGrid.length?y.slideTo(y.snapGrid.length-1):y.slideTo(y.slides.length-1));if(y.params.freeModeMomentum){if(H.length>1){var a=H.pop(),o=H.pop(),r=a.position-o.position,l=a.time-o.time;y.velocity=r/l,y.velocity=y.velocity/2,Math.abs(y.velocity)<y.params.freeModeMinimumVelocity&&(y.velocity=0),
// this implies that the user stopped moving a finger then released.
// There would be no events with distance zero, so the last event is stale.
(l>150||(new window.Date).getTime()-a.time>300)&&(y.velocity=0)}else y.velocity=0;y.velocity=y.velocity*y.params.freeModeMomentumVelocityRatio,H.length=0;var h=1e3*y.params.freeModeMomentumRatio,c=y.velocity*h,u=y.translate+c;y.rtl&&(u=-u);var d,p=!1,f=20*Math.abs(y.velocity)*y.params.freeModeMomentumBounceRatio;if(u<y.maxTranslate())y.params.freeModeMomentumBounce?(u+y.maxTranslate()<-f&&(u=y.maxTranslate()-f),d=y.maxTranslate(),p=!0,E=!0):u=y.maxTranslate();else if(u>y.minTranslate())y.params.freeModeMomentumBounce?(u-y.minTranslate()>f&&(u=y.minTranslate()+f),d=y.minTranslate(),p=!0,E=!0):u=y.minTranslate();else if(y.params.freeModeSticky){var m,g=0;for(g=0;g<y.snapGrid.length;g+=1)if(y.snapGrid[g]>-u){m=g;break}u=Math.abs(y.snapGrid[m]-u)<Math.abs(y.snapGrid[m-1]-u)||"next"===y.swipeDirection?y.snapGrid[m]:y.snapGrid[m-1],y.rtl||(u=-u)}
//Fix duration
if(0!==y.velocity)h=y.rtl?Math.abs((-u-y.translate)/y.velocity):Math.abs((u-y.translate)/y.velocity);else if(y.params.freeModeSticky)return void y.slideReset();y.params.freeModeMomentumBounce&&p?(y.updateProgress(d),y.setWrapperTransition(h),y.setWrapperTranslate(u),y.onTransitionStart(),y.animating=!0,y.wrapper.transitionEnd(function(){y&&E&&(y.emit("onMomentumBounce",y),y.setWrapperTransition(y.params.speed),y.setWrapperTranslate(d),y.wrapper.transitionEnd(function(){y&&y.onTransitionEnd()}))})):y.velocity?(y.updateProgress(u),y.setWrapperTransition(h),y.setWrapperTranslate(u),y.onTransitionStart(),y.animating||(y.animating=!0,y.wrapper.transitionEnd(function(){y&&y.onTransitionEnd()}))):y.updateProgress(u),y.updateActiveIndex()}return void((!y.params.freeModeMomentum||s>=y.params.longSwipesMs)&&(y.updateProgress(),y.updateActiveIndex()))}
// Find current slide
var v,_=0,b=y.slidesSizesGrid[0];for(v=0;v<y.slidesGrid.length;v+=y.params.slidesPerGroup)void 0!==y.slidesGrid[v+y.params.slidesPerGroup]?n>=y.slidesGrid[v]&&n<y.slidesGrid[v+y.params.slidesPerGroup]&&(_=v,b=y.slidesGrid[v+y.params.slidesPerGroup]-y.slidesGrid[v]):n>=y.slidesGrid[v]&&(_=v,b=y.slidesGrid[y.slidesGrid.length-1]-y.slidesGrid[y.slidesGrid.length-2]);
// Find current slide size
var w=(n-y.slidesGrid[_])/b;if(s>y.params.longSwipesMs){
// Long touches
if(!y.params.longSwipes)return void y.slideTo(y.activeIndex);"next"===y.swipeDirection&&(w>=y.params.longSwipesRatio?y.slideTo(_+y.params.slidesPerGroup):y.slideTo(_)),"prev"===y.swipeDirection&&(w>1-y.params.longSwipesRatio?y.slideTo(_+y.params.slidesPerGroup):y.slideTo(_))}else{
// Short swipes
if(!y.params.shortSwipes)return void y.slideTo(y.activeIndex);"next"===y.swipeDirection&&y.slideTo(_+y.params.slidesPerGroup),"prev"===y.swipeDirection&&y.slideTo(_)}}},/*=========================
          Transitions
          ===========================*/
y._slideTo=function(e,t){return y.slideTo(e,t,!0,!0)},y.slideTo=function(e,t,i,s){void 0===i&&(i=!0),void 0===e&&(e=0),e<0&&(e=0),y.snapIndex=Math.floor(e/y.params.slidesPerGroup),y.snapIndex>=y.snapGrid.length&&(y.snapIndex=y.snapGrid.length-1);var n=-y.snapGrid[y.snapIndex];
// Normalize slideIndex
if(
// Stop autoplay
y.params.autoplay&&y.autoplaying&&(s||!y.params.autoplayDisableOnInteraction?y.pauseAutoplay(t):y.stopAutoplay()),
// Update progress
y.updateProgress(n),y.params.normalizeSlideIndex)for(var a=0;a<y.slidesGrid.length;a++)-Math.floor(100*n)>=Math.floor(100*y.slidesGrid[a])&&(e=a);
// Directions locks
// Directions locks
// Update Index
// Update Height
return!(!y.params.allowSwipeToNext&&n<y.translate&&n<y.minTranslate())&&(!(!y.params.allowSwipeToPrev&&n>y.translate&&n>y.maxTranslate()&&(y.activeIndex||0)!==e)&&(void 0===t&&(t=y.params.speed),y.previousIndex=y.activeIndex||0,y.activeIndex=e,y.updateRealIndex(),y.rtl&&-n===y.translate||!y.rtl&&n===y.translate?(y.params.autoHeight&&y.updateAutoHeight(),y.updateClasses(),"slide"!==y.params.effect&&y.setWrapperTranslate(n),!1):(y.updateClasses(),y.onTransitionStart(i),0===t||y.browser.lteIE9?(y.setWrapperTranslate(n),y.setWrapperTransition(0),y.onTransitionEnd(i)):(y.setWrapperTranslate(n),y.setWrapperTransition(t),y.animating||(y.animating=!0,y.wrapper.transitionEnd(function(){y&&y.onTransitionEnd(i)}))),!0)))},y.onTransitionStart=function(e){void 0===e&&(e=!0),y.params.autoHeight&&y.updateAutoHeight(),y.lazy&&y.lazy.onTransitionStart(),e&&(y.emit("onTransitionStart",y),y.activeIndex!==y.previousIndex&&(y.emit("onSlideChangeStart",y),y.activeIndex>y.previousIndex?y.emit("onSlideNextStart",y):y.emit("onSlidePrevStart",y)))},y.onTransitionEnd=function(e){y.animating=!1,y.setWrapperTransition(0),void 0===e&&(e=!0),y.lazy&&y.lazy.onTransitionEnd(),e&&(y.emit("onTransitionEnd",y),y.activeIndex!==y.previousIndex&&(y.emit("onSlideChangeEnd",y),y.activeIndex>y.previousIndex?y.emit("onSlideNextEnd",y):y.emit("onSlidePrevEnd",y))),y.params.history&&y.history&&y.history.setHistory(y.params.history,y.activeIndex),y.params.hashnav&&y.hashnav&&y.hashnav.setHash()},y.slideNext=function(e,t,i){if(y.params.loop){if(y.animating)return!1;y.fixLoop();y.container[0].clientLeft;return y.slideTo(y.activeIndex+y.params.slidesPerGroup,t,e,i)}return y.slideTo(y.activeIndex+y.params.slidesPerGroup,t,e,i)},y._slideNext=function(e){return y.slideNext(!0,e,!0)},y.slidePrev=function(e,t,i){if(y.params.loop){if(y.animating)return!1;y.fixLoop();y.container[0].clientLeft;return y.slideTo(y.activeIndex-1,t,e,i)}return y.slideTo(y.activeIndex-1,t,e,i)},y._slidePrev=function(e){return y.slidePrev(!0,e,!0)},y.slideReset=function(e,t,i){return y.slideTo(y.activeIndex,t,e)},y.disableTouchControl=function(){return y.params.onlyExternal=!0,!0},y.enableTouchControl=function(){return y.params.onlyExternal=!1,!0},/*=========================
          Translate/transition helpers
          ===========================*/
y.setWrapperTransition=function(e,t){y.wrapper.transition(e),"slide"!==y.params.effect&&y.effects[y.params.effect]&&y.effects[y.params.effect].setTransition(e),y.params.parallax&&y.parallax&&y.parallax.setTransition(e),y.params.scrollbar&&y.scrollbar&&y.scrollbar.setTransition(e),y.params.control&&y.controller&&y.controller.setTransition(e,t),y.emit("onSetTransition",y,e)},y.setWrapperTranslate=function(e,t,i){var s=0,n=0;y.isHorizontal()?s=y.rtl?-e:e:n=e,y.params.roundLengths&&(s=a(s),n=a(n)),y.params.virtualTranslate||(y.support.transforms3d?y.wrapper.transform("translate3d("+s+"px, "+n+"px, 0px)"):y.wrapper.transform("translate("+s+"px, "+n+"px)")),y.translate=y.isHorizontal()?s:n;
// Check if we need to update progress
var o,r=y.maxTranslate()-y.minTranslate();o=0===r?0:(e-y.minTranslate())/r,o!==y.progress&&y.updateProgress(e),t&&y.updateActiveIndex(),"slide"!==y.params.effect&&y.effects[y.params.effect]&&y.effects[y.params.effect].setTranslate(y.translate),y.params.parallax&&y.parallax&&y.parallax.setTranslate(y.translate),y.params.scrollbar&&y.scrollbar&&y.scrollbar.setTranslate(y.translate),y.params.control&&y.controller&&y.controller.setTranslate(y.translate,i),y.emit("onSetTranslate",y,y.translate)},y.getTranslate=function(e,t){var i,s,n,a;
// automatic axis detection
// Some old versions of Webkit choke when 'none' is passed; pass
// empty string instead in this case
//Latest Chrome and webkits Fix
//Latest Chrome and webkits Fix
return void 0===t&&(t="x"),y.params.virtualTranslate?y.rtl?-y.translate:y.translate:(n=window.getComputedStyle(e,null),window.WebKitCSSMatrix?(s=n.transform||n.webkitTransform,s.split(",").length>6&&(s=s.split(", ").map(function(e){return e.replace(",",".")}).join(", ")),a=new window.WebKitCSSMatrix("none"===s?"":s)):(a=n.MozTransform||n.OTransform||n.MsTransform||n.msTransform||n.transform||n.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),i=a.toString().split(",")),"x"===t&&(s=window.WebKitCSSMatrix?a.m41:16===i.length?parseFloat(i[12]):parseFloat(i[4])),"y"===t&&(s=window.WebKitCSSMatrix?a.m42:16===i.length?parseFloat(i[13]):parseFloat(i[5])),y.rtl&&s&&(s=-s),s||0)},y.getWrapperTranslate=function(e){return void 0===e&&(e=y.isHorizontal()?"x":"y"),y.getTranslate(y.wrapper[0],e)},/*=========================
          Observer
          ===========================*/
y.observers=[],y.initObservers=function(){if(y.params.observeParents)for(var e=y.container.parents(),t=0;t<e.length;t++)l(e[t]);
// Observe container
l(y.container[0],{childList:!1}),
// Observe wrapper
l(y.wrapper[0],{attributes:!1})},y.disconnectObservers=function(){for(var e=0;e<y.observers.length;e++)y.observers[e].disconnect();y.observers=[]},/*=========================
          Loop
          ===========================*/
// Create looped slides
y.createLoop=function(){
// Remove duplicated slides
y.wrapper.children("."+y.params.slideClass+"."+y.params.slideDuplicateClass).remove();var t=y.wrapper.children("."+y.params.slideClass);"auto"!==y.params.slidesPerView||y.params.loopedSlides||(y.params.loopedSlides=t.length),y.loopedSlides=parseInt(y.params.loopedSlides||y.params.slidesPerView,10),y.loopedSlides=y.loopedSlides+y.params.loopAdditionalSlides,y.loopedSlides>t.length&&(y.loopedSlides=t.length);var i,s=[],n=[];for(t.each(function(i,a){var o=e(this);i<y.loopedSlides&&n.push(a),i<t.length&&i>=t.length-y.loopedSlides&&s.push(a),o.attr("data-swiper-slide-index",i)}),i=0;i<n.length;i++)y.wrapper.append(e(n[i].cloneNode(!0)).addClass(y.params.slideDuplicateClass));for(i=s.length-1;i>=0;i--)y.wrapper.prepend(e(s[i].cloneNode(!0)).addClass(y.params.slideDuplicateClass))},y.destroyLoop=function(){y.wrapper.children("."+y.params.slideClass+"."+y.params.slideDuplicateClass).remove(),y.slides.removeAttr("data-swiper-slide-index")},y.reLoop=function(e){var t=y.activeIndex-y.loopedSlides;y.destroyLoop(),y.createLoop(),y.updateSlidesSize(),e&&y.slideTo(t+y.loopedSlides,0,!1)},y.fixLoop=function(){var e;
//Fix For Negative Oversliding
y.activeIndex<y.loopedSlides?(e=y.slides.length-3*y.loopedSlides+y.activeIndex,e+=y.loopedSlides,y.slideTo(e,0,!1,!0)):("auto"===y.params.slidesPerView&&y.activeIndex>=2*y.loopedSlides||y.activeIndex>y.slides.length-2*y.params.slidesPerView)&&(e=-y.slides.length+y.activeIndex+y.loopedSlides,e+=y.loopedSlides,y.slideTo(e,0,!1,!0))},/*=========================
          Append/Prepend/Remove Slides
          ===========================*/
y.appendSlide=function(e){if(y.params.loop&&y.destroyLoop(),"object"==typeof e&&e.length)for(var t=0;t<e.length;t++)e[t]&&y.wrapper.append(e[t]);else y.wrapper.append(e);y.params.loop&&y.createLoop(),y.params.observer&&y.support.observer||y.update(!0)},y.prependSlide=function(e){y.params.loop&&y.destroyLoop();var t=y.activeIndex+1;if("object"==typeof e&&e.length){for(var i=0;i<e.length;i++)e[i]&&y.wrapper.prepend(e[i]);t=y.activeIndex+e.length}else y.wrapper.prepend(e);y.params.loop&&y.createLoop(),y.params.observer&&y.support.observer||y.update(!0),y.slideTo(t,0,!1)},y.removeSlide=function(e){y.params.loop&&(y.destroyLoop(),y.slides=y.wrapper.children("."+y.params.slideClass));var t,i=y.activeIndex;if("object"==typeof e&&e.length){for(var s=0;s<e.length;s++)t=e[s],y.slides[t]&&y.slides.eq(t).remove(),t<i&&i--;i=Math.max(i,0)}else t=e,y.slides[t]&&y.slides.eq(t).remove(),t<i&&i--,i=Math.max(i,0);y.params.loop&&y.createLoop(),y.params.observer&&y.support.observer||y.update(!0),y.params.loop?y.slideTo(i+y.loopedSlides,0,!1):y.slideTo(i,0,!1)},y.removeAllSlides=function(){for(var e=[],t=0;t<y.slides.length;t++)e.push(t);y.removeSlide(e)},/*=========================
          Effects
          ===========================*/
y.effects={fade:{setTranslate:function(){for(var e=0;e<y.slides.length;e++){var t=y.slides.eq(e),i=t[0].swiperSlideOffset,s=-i;y.params.virtualTranslate||(s-=y.translate);var n=0;y.isHorizontal()||(n=s,s=0);var a=y.params.fade.crossFade?Math.max(1-Math.abs(t[0].progress),0):1+Math.min(Math.max(t[0].progress,-1),0);t.css({opacity:a}).transform("translate3d("+s+"px, "+n+"px, 0px)")}},setTransition:function(e){if(y.slides.transition(e),y.params.virtualTranslate&&0!==e){var t=!1;y.slides.transitionEnd(function(){if(!t&&y){t=!0,y.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],i=0;i<e.length;i++)y.wrapper.trigger(e[i])}})}}},flip:{setTranslate:function(){for(var t=0;t<y.slides.length;t++){var i=y.slides.eq(t),s=i[0].progress;y.params.flip.limitRotation&&(s=Math.max(Math.min(i[0].progress,1),-1));var n=i[0].swiperSlideOffset,a=-180*s,o=a,r=0,l=-n,h=0;if(y.isHorizontal()?y.rtl&&(o=-o):(h=l,l=0,r=-o,o=0),i[0].style.zIndex=-Math.abs(Math.round(s))+y.slides.length,y.params.flip.slideShadows){
//Set shadows
var c=y.isHorizontal()?i.find(".swiper-slide-shadow-left"):i.find(".swiper-slide-shadow-top"),u=y.isHorizontal()?i.find(".swiper-slide-shadow-right"):i.find(".swiper-slide-shadow-bottom");0===c.length&&(c=e('<div class="swiper-slide-shadow-'+(y.isHorizontal()?"left":"top")+'"></div>'),i.append(c)),0===u.length&&(u=e('<div class="swiper-slide-shadow-'+(y.isHorizontal()?"right":"bottom")+'"></div>'),i.append(u)),c.length&&(c[0].style.opacity=Math.max(-s,0)),u.length&&(u[0].style.opacity=Math.max(s,0))}i.transform("translate3d("+l+"px, "+h+"px, 0px) rotateX("+r+"deg) rotateY("+o+"deg)")}},setTransition:function(t){if(y.slides.transition(t).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(t),y.params.virtualTranslate&&0!==t){var i=!1;y.slides.eq(y.activeIndex).transitionEnd(function(){if(!i&&y&&e(this).hasClass(y.params.slideActiveClass)){i=!0,y.animating=!1;for(var t=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=0;s<t.length;s++)y.wrapper.trigger(t[s])}})}}},cube:{setTranslate:function(){var t,i=0;y.params.cube.shadow&&(y.isHorizontal()?(t=y.wrapper.find(".swiper-cube-shadow"),0===t.length&&(t=e('<div class="swiper-cube-shadow"></div>'),y.wrapper.append(t)),t.css({height:y.width+"px"})):(t=y.container.find(".swiper-cube-shadow"),0===t.length&&(t=e('<div class="swiper-cube-shadow"></div>'),y.container.append(t))));for(var s=0;s<y.slides.length;s++){var n=y.slides.eq(s),a=90*s,o=Math.floor(a/360);y.rtl&&(a=-a,o=Math.floor(-a/360));var r=Math.max(Math.min(n[0].progress,1),-1),l=0,h=0,c=0;s%4==0?(l=4*-o*y.size,c=0):(s-1)%4==0?(l=0,c=4*-o*y.size):(s-2)%4==0?(l=y.size+4*o*y.size,c=y.size):(s-3)%4==0&&(l=-y.size,c=3*y.size+4*y.size*o),y.rtl&&(l=-l),y.isHorizontal()||(h=l,l=0);var u="rotateX("+(y.isHorizontal()?0:-a)+"deg) rotateY("+(y.isHorizontal()?a:0)+"deg) translate3d("+l+"px, "+h+"px, "+c+"px)";if(r<=1&&r>-1&&(i=90*s+90*r,y.rtl&&(i=90*-s-90*r)),n.transform(u),y.params.cube.slideShadows){
//Set shadows
var d=y.isHorizontal()?n.find(".swiper-slide-shadow-left"):n.find(".swiper-slide-shadow-top"),p=y.isHorizontal()?n.find(".swiper-slide-shadow-right"):n.find(".swiper-slide-shadow-bottom");0===d.length&&(d=e('<div class="swiper-slide-shadow-'+(y.isHorizontal()?"left":"top")+'"></div>'),n.append(d)),0===p.length&&(p=e('<div class="swiper-slide-shadow-'+(y.isHorizontal()?"right":"bottom")+'"></div>'),n.append(p)),d.length&&(d[0].style.opacity=Math.max(-r,0)),p.length&&(p[0].style.opacity=Math.max(r,0))}}if(y.wrapper.css({"-webkit-transform-origin":"50% 50% -"+y.size/2+"px","-moz-transform-origin":"50% 50% -"+y.size/2+"px","-ms-transform-origin":"50% 50% -"+y.size/2+"px","transform-origin":"50% 50% -"+y.size/2+"px"}),y.params.cube.shadow)if(y.isHorizontal())t.transform("translate3d(0px, "+(y.width/2+y.params.cube.shadowOffset)+"px, "+-y.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+y.params.cube.shadowScale+")");else{var f=Math.abs(i)-90*Math.floor(Math.abs(i)/90),m=1.5-(Math.sin(2*f*Math.PI/360)/2+Math.cos(2*f*Math.PI/360)/2),g=y.params.cube.shadowScale,v=y.params.cube.shadowScale/m,_=y.params.cube.shadowOffset;t.transform("scale3d("+g+", 1, "+v+") translate3d(0px, "+(y.height/2+_)+"px, "+-y.height/2/v+"px) rotateX(-90deg)")}var b=y.isSafari||y.isUiWebView?-y.size/2:0;y.wrapper.transform("translate3d(0px,0,"+b+"px) rotateX("+(y.isHorizontal()?0:i)+"deg) rotateY("+(y.isHorizontal()?-i:0)+"deg)")},setTransition:function(e){y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),y.params.cube.shadow&&!y.isHorizontal()&&y.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){
//Each slide offset from center
for(var t=y.translate,i=y.isHorizontal()?-t+y.width/2:-t+y.height/2,s=y.isHorizontal()?y.params.coverflow.rotate:-y.params.coverflow.rotate,n=y.params.coverflow.depth,a=0,o=y.slides.length;a<o;a++){var r=y.slides.eq(a),l=y.slidesSizesGrid[a],h=r[0].swiperSlideOffset,c=(i-h-l/2)/l*y.params.coverflow.modifier,u=y.isHorizontal()?s*c:0,d=y.isHorizontal()?0:s*c,p=-n*Math.abs(c),f=y.isHorizontal()?0:y.params.coverflow.stretch*c,m=y.isHorizontal()?y.params.coverflow.stretch*c:0;
//Fix for ultra small values
Math.abs(m)<.001&&(m=0),Math.abs(f)<.001&&(f=0),Math.abs(p)<.001&&(p=0),Math.abs(u)<.001&&(u=0),Math.abs(d)<.001&&(d=0);var g="translate3d("+m+"px,"+f+"px,"+p+"px)  rotateX("+d+"deg) rotateY("+u+"deg)";if(r.transform(g),r[0].style.zIndex=1-Math.abs(Math.round(c)),y.params.coverflow.slideShadows){
//Set shadows
var v=y.isHorizontal()?r.find(".swiper-slide-shadow-left"):r.find(".swiper-slide-shadow-top"),_=y.isHorizontal()?r.find(".swiper-slide-shadow-right"):r.find(".swiper-slide-shadow-bottom");0===v.length&&(v=e('<div class="swiper-slide-shadow-'+(y.isHorizontal()?"left":"top")+'"></div>'),r.append(v)),0===_.length&&(_=e('<div class="swiper-slide-shadow-'+(y.isHorizontal()?"right":"bottom")+'"></div>'),r.append(_)),v.length&&(v[0].style.opacity=c>0?c:0),_.length&&(_[0].style.opacity=-c>0?-c:0)}}
//Set correct perspective for IE10
if(y.browser.ie){y.wrapper[0].style.perspectiveOrigin=i+"px 50%"}},setTransition:function(e){y.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},/*=========================
          Images Lazy Loading
          ===========================*/
y.lazy={initialImageLoaded:!1,loadImageInSlide:function(t,i){if(void 0!==t&&(void 0===i&&(i=!0),0!==y.slides.length)){var s=y.slides.eq(t),n=s.find("."+y.params.lazyLoadingClass+":not(."+y.params.lazyStatusLoadedClass+"):not(."+y.params.lazyStatusLoadingClass+")");!s.hasClass(y.params.lazyLoadingClass)||s.hasClass(y.params.lazyStatusLoadedClass)||s.hasClass(y.params.lazyStatusLoadingClass)||(n=n.add(s[0])),0!==n.length&&n.each(function(){var t=e(this);t.addClass(y.params.lazyStatusLoadingClass);var n=t.attr("data-background"),a=t.attr("data-src"),o=t.attr("data-srcset"),r=t.attr("data-sizes");y.loadImage(t[0],a||n,o,r,!1,function(){if(n?(t.css("background-image",'url("'+n+'")'),t.removeAttr("data-background")):(o&&(t.attr("srcset",o),t.removeAttr("data-srcset")),r&&(t.attr("sizes",r),t.removeAttr("data-sizes")),a&&(t.attr("src",a),t.removeAttr("data-src"))),t.addClass(y.params.lazyStatusLoadedClass).removeClass(y.params.lazyStatusLoadingClass),s.find("."+y.params.lazyPreloaderClass+", ."+y.params.preloaderClass).remove(),y.params.loop&&i){var e=s.attr("data-swiper-slide-index");if(s.hasClass(y.params.slideDuplicateClass)){var l=y.wrapper.children('[data-swiper-slide-index="'+e+'"]:not(.'+y.params.slideDuplicateClass+")");y.lazy.loadImageInSlide(l.index(),!1)}else{var h=y.wrapper.children("."+y.params.slideDuplicateClass+'[data-swiper-slide-index="'+e+'"]');y.lazy.loadImageInSlide(h.index(),!1)}}y.emit("onLazyImageReady",y,s[0],t[0])}),y.emit("onLazyImageLoad",y,s[0],t[0])})}},load:function(){var t,i=y.params.slidesPerView;if("auto"===i&&(i=0),y.lazy.initialImageLoaded||(y.lazy.initialImageLoaded=!0),y.params.watchSlidesVisibility)y.wrapper.children("."+y.params.slideVisibleClass).each(function(){y.lazy.loadImageInSlide(e(this).index())});else if(i>1)for(t=y.activeIndex;t<y.activeIndex+i;t++)y.slides[t]&&y.lazy.loadImageInSlide(t);else y.lazy.loadImageInSlide(y.activeIndex);if(y.params.lazyLoadingInPrevNext)if(i>1||y.params.lazyLoadingInPrevNextAmount&&y.params.lazyLoadingInPrevNextAmount>1){var s=y.params.lazyLoadingInPrevNextAmount,n=i,a=Math.min(y.activeIndex+n+Math.max(s,n),y.slides.length),o=Math.max(y.activeIndex-Math.max(n,s),0);
// Next Slides
for(t=y.activeIndex+i;t<a;t++)y.slides[t]&&y.lazy.loadImageInSlide(t);
// Prev Slides
for(t=o;t<y.activeIndex;t++)y.slides[t]&&y.lazy.loadImageInSlide(t)}else{var r=y.wrapper.children("."+y.params.slideNextClass);r.length>0&&y.lazy.loadImageInSlide(r.index());var l=y.wrapper.children("."+y.params.slidePrevClass);l.length>0&&y.lazy.loadImageInSlide(l.index())}},onTransitionStart:function(){y.params.lazyLoading&&(y.params.lazyLoadingOnTransitionStart||!y.params.lazyLoadingOnTransitionStart&&!y.lazy.initialImageLoaded)&&y.lazy.load()},onTransitionEnd:function(){y.params.lazyLoading&&!y.params.lazyLoadingOnTransitionStart&&y.lazy.load()}},/*=========================
          Scrollbar
          ===========================*/
y.scrollbar={isTouched:!1,setDragPosition:function(e){var t=y.scrollbar,i=y.isHorizontal()?"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageX:e.pageX||e.clientX:"touchstart"===e.type||"touchmove"===e.type?e.targetTouches[0].pageY:e.pageY||e.clientY,s=i-t.track.offset()[y.isHorizontal()?"left":"top"]-t.dragSize/2,n=-y.minTranslate()*t.moveDivider,a=-y.maxTranslate()*t.moveDivider;s<n?s=n:s>a&&(s=a),s=-s/t.moveDivider,y.updateProgress(s),y.setWrapperTranslate(s,!0)},dragStart:function(e){var t=y.scrollbar;t.isTouched=!0,e.preventDefault(),e.stopPropagation(),t.setDragPosition(e),clearTimeout(t.dragTimeout),t.track.transition(0),y.params.scrollbarHide&&t.track.css("opacity",1),y.wrapper.transition(100),t.drag.transition(100),y.emit("onScrollbarDragStart",y)},dragMove:function(e){var t=y.scrollbar;t.isTouched&&(e.preventDefault?e.preventDefault():e.returnValue=!1,t.setDragPosition(e),y.wrapper.transition(0),t.track.transition(0),t.drag.transition(0),y.emit("onScrollbarDragMove",y))},dragEnd:function(e){var t=y.scrollbar;t.isTouched&&(t.isTouched=!1,y.params.scrollbarHide&&(clearTimeout(t.dragTimeout),t.dragTimeout=setTimeout(function(){t.track.css("opacity",0),t.track.transition(400)},1e3)),y.emit("onScrollbarDragEnd",y),y.params.scrollbarSnapOnRelease&&y.slideReset())},draggableEvents:function(){return!1!==y.params.simulateTouch||y.support.touch?y.touchEvents:y.touchEventsDesktop}(),enableDraggable:function(){var t=y.scrollbar,i=y.support.touch?t.track:document;e(t.track).on(t.draggableEvents.start,t.dragStart),e(i).on(t.draggableEvents.move,t.dragMove),e(i).on(t.draggableEvents.end,t.dragEnd)},disableDraggable:function(){var t=y.scrollbar,i=y.support.touch?t.track:document;e(t.track).off(t.draggableEvents.start,t.dragStart),e(i).off(t.draggableEvents.move,t.dragMove),e(i).off(t.draggableEvents.end,t.dragEnd)},set:function(){if(y.params.scrollbar){var t=y.scrollbar;t.track=e(y.params.scrollbar),y.params.uniqueNavElements&&"string"==typeof y.params.scrollbar&&t.track.length>1&&1===y.container.find(y.params.scrollbar).length&&(t.track=y.container.find(y.params.scrollbar)),t.drag=t.track.find(".swiper-scrollbar-drag"),0===t.drag.length&&(t.drag=e('<div class="swiper-scrollbar-drag"></div>'),t.track.append(t.drag)),t.drag[0].style.width="",t.drag[0].style.height="",t.trackSize=y.isHorizontal()?t.track[0].offsetWidth:t.track[0].offsetHeight,t.divider=y.size/y.virtualSize,t.moveDivider=t.divider*(t.trackSize/y.size),t.dragSize=t.trackSize*t.divider,y.isHorizontal()?t.drag[0].style.width=t.dragSize+"px":t.drag[0].style.height=t.dragSize+"px",t.divider>=1?t.track[0].style.display="none":t.track[0].style.display="",y.params.scrollbarHide&&(t.track[0].style.opacity=0)}},setTranslate:function(){if(y.params.scrollbar){var e,t=y.scrollbar,i=(y.translate,t.dragSize);e=(t.trackSize-t.dragSize)*y.progress,y.rtl&&y.isHorizontal()?(e=-e,e>0?(i=t.dragSize-e,e=0):-e+t.dragSize>t.trackSize&&(i=t.trackSize+e)):e<0?(i=t.dragSize+e,e=0):e+t.dragSize>t.trackSize&&(i=t.trackSize-e),y.isHorizontal()?(y.support.transforms3d?t.drag.transform("translate3d("+e+"px, 0, 0)"):t.drag.transform("translateX("+e+"px)"),t.drag[0].style.width=i+"px"):(y.support.transforms3d?t.drag.transform("translate3d(0px, "+e+"px, 0)"):t.drag.transform("translateY("+e+"px)"),t.drag[0].style.height=i+"px"),y.params.scrollbarHide&&(clearTimeout(t.timeout),t.track[0].style.opacity=1,t.timeout=setTimeout(function(){t.track[0].style.opacity=0,t.track.transition(400)},1e3))}},setTransition:function(e){y.params.scrollbar&&y.scrollbar.drag.transition(e)}},/*=========================
          Controller
          ===========================*/
y.controller={LinearSpline:function(e,t){this.x=e,this.y=t,this.lastIndex=e.length-1;
// Given an x value (x2), return the expected y2 value:
// (x1,y1) is the known point before given value,
// (x3,y3) is the known point after given value.
var i,s;this.x.length;this.interpolate=function(e){
// Get the indexes of x1 and x3 (the array indexes before and after given x2):
return e?(s=n(this.x,e),i=s-1,(e-this.x[i])*(this.y[s]-this.y[i])/(this.x[s]-this.x[i])+this.y[i]):0};var n=function(){var e,t,i;return function(s,n){for(t=-1,e=s.length;e-t>1;)s[i=e+t>>1]<=n?t=i:e=i;return e}}()},
//xxx: for now i will just save one spline function to to
getInterpolateFunction:function(e){y.controller.spline||(y.controller.spline=y.params.loop?new y.controller.LinearSpline(y.slidesGrid,e.slidesGrid):new y.controller.LinearSpline(y.snapGrid,e.snapGrid))},setTranslate:function(e,i){function s(t){
// this will create an Interpolate function based on the snapGrids
// x is the Grid of the scrolled scroller and y will be the controlled scroller
// it makes sense to create this only once and recall it for the interpolation
// the function does a lot of value caching for performance
e=t.rtl&&"horizontal"===t.params.direction?-y.translate:y.translate,"slide"===y.params.controlBy&&(y.controller.getInterpolateFunction(t),
// i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
// but it did not work out
a=-y.controller.spline.interpolate(-e)),a&&"container"!==y.params.controlBy||(n=(t.maxTranslate()-t.minTranslate())/(y.maxTranslate()-y.minTranslate()),a=(e-y.minTranslate())*n+t.minTranslate()),y.params.controlInverse&&(a=t.maxTranslate()-a),t.updateProgress(a),t.setWrapperTranslate(a,!1,y),t.updateActiveIndex()}var n,a,o=y.params.control;if(y.isArray(o))for(var r=0;r<o.length;r++)o[r]!==i&&o[r]instanceof t&&s(o[r]);else o instanceof t&&i!==o&&s(o)},setTransition:function(e,i){function s(t){t.setWrapperTransition(e,y),0!==e&&(t.onTransitionStart(),t.wrapper.transitionEnd(function(){a&&(t.params.loop&&"slide"===y.params.controlBy&&t.fixLoop(),t.onTransitionEnd())}))}var n,a=y.params.control;if(y.isArray(a))for(n=0;n<a.length;n++)a[n]!==i&&a[n]instanceof t&&s(a[n]);else a instanceof t&&i!==a&&s(a)}},/*=========================
          Hash Navigation
          ===========================*/
y.hashnav={onHashCange:function(e,t){var i=document.location.hash.replace("#","");i!==y.slides.eq(y.activeIndex).attr("data-hash")&&y.slideTo(y.wrapper.children("."+y.params.slideClass+'[data-hash="'+i+'"]').index())},attachEvents:function(t){var i=t?"off":"on";e(window)[i]("hashchange",y.hashnav.onHashCange)},setHash:function(){if(y.hashnav.initialized&&y.params.hashnav)if(y.params.replaceState&&window.history&&window.history.replaceState)window.history.replaceState(null,null,"#"+y.slides.eq(y.activeIndex).attr("data-hash")||"");else{var e=y.slides.eq(y.activeIndex),t=e.attr("data-hash")||e.attr("data-history");document.location.hash=t||""}},init:function(){if(y.params.hashnav&&!y.params.history){y.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var t=0,i=y.slides.length;t<i;t++){var s=y.slides.eq(t),n=s.attr("data-hash")||s.attr("data-history");if(n===e&&!s.hasClass(y.params.slideDuplicateClass)){var a=s.index();y.slideTo(a,0,y.params.runCallbacksOnInit,!0)}}y.params.hashnavWatchState&&y.hashnav.attachEvents()}},destroy:function(){y.params.hashnavWatchState&&y.hashnav.attachEvents(!0)}},/*=========================
          History Api with fallback to Hashnav
          ===========================*/
y.history={init:function(){if(y.params.history){if(!window.history||!window.history.pushState)return y.params.history=!1,void(y.params.hashnav=!0);y.history.initialized=!0,this.paths=this.getPathValues(),(this.paths.key||this.paths.value)&&(this.scrollToSlide(0,this.paths.value,y.params.runCallbacksOnInit),y.params.replaceState||window.addEventListener("popstate",this.setHistoryPopState))}},setHistoryPopState:function(){y.history.paths=y.history.getPathValues(),y.history.scrollToSlide(y.params.speed,y.history.paths.value,!1)},getPathValues:function(){var e=window.location.pathname.slice(1).split("/"),t=e.length;return{key:e[t-2],value:e[t-1]}},setHistory:function(e,t){if(y.history.initialized&&y.params.history){var i=y.slides.eq(t),s=this.slugify(i.attr("data-history"));window.location.pathname.includes(e)||(s=e+"/"+s),y.params.replaceState?window.history.replaceState(null,null,s):window.history.pushState(null,null,s)}},slugify:function(e){return e.toString().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"").replace(/-+$/,"")},scrollToSlide:function(e,t,i){if(t)for(var s=0,n=y.slides.length;s<n;s++){var a=y.slides.eq(s),o=this.slugify(a.attr("data-history"));if(o===t&&!a.hasClass(y.params.slideDuplicateClass)){var r=a.index();y.slideTo(r,e,i)}}else y.slideTo(0,e,i)}},y.disableKeyboardControl=function(){y.params.keyboardControl=!1,e(document).off("keydown",h)},y.enableKeyboardControl=function(){y.params.keyboardControl=!0,e(document).on("keydown",h)},/*=========================
          Mousewheel Control
          ===========================*/
y.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},y.params.mousewheelControl&&(/**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
y.mousewheel.event=navigator.userAgent.indexOf("firefox")>-1?"DOMMouseScroll":function(){var e="onwheel"in document;if(!e){var t=document.createElement("div");t.setAttribute("onwheel","return;"),e="function"==typeof t.onwheel}
// always returns true in newer browsers as per the standard.
// @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
// This is the only way to test support for the `wheel` event in IE9+.
return!e&&document.implementation&&document.implementation.hasFeature&&!0!==document.implementation.hasFeature("","")&&(e=document.implementation.hasFeature("Events.wheel","3.0")),e}()?"wheel":"mousewheel"),y.disableMousewheelControl=function(){if(!y.mousewheel.event)return!1;var t=y.container;return"container"!==y.params.mousewheelEventsTarged&&(t=e(y.params.mousewheelEventsTarged)),t.off(y.mousewheel.event,c),!0},y.enableMousewheelControl=function(){if(!y.mousewheel.event)return!1;var t=y.container;return"container"!==y.params.mousewheelEventsTarged&&(t=e(y.params.mousewheelEventsTarged)),t.on(y.mousewheel.event,c),!0},y.parallax={setTranslate:function(){y.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){d(this,y.progress)}),y.slides.each(function(){var t=e(this);t.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){d(this,Math.min(Math.max(t[0].progress,-1),1))})})},setTransition:function(t){void 0===t&&(t=y.params.speed),y.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var i=e(this),s=parseInt(i.attr("data-swiper-parallax-duration"),10)||t;0===t&&(s=0),i.transition(s)})}},/*=========================
          Zoom
          ===========================*/
y.zoom={
// "Global" Props
scale:1,currentScale:1,isScaling:!1,gesture:{slide:void 0,slideWidth:void 0,slideHeight:void 0,image:void 0,imageWrap:void 0,zoomMax:y.params.zoomMax},image:{isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},velocity:{x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0},
// Calc Scale From Multi-touches
getDistanceBetweenTouches:function(e){if(e.targetTouches.length<2)return 1;var t=e.targetTouches[0].pageX,i=e.targetTouches[0].pageY,s=e.targetTouches[1].pageX,n=e.targetTouches[1].pageY;return Math.sqrt(Math.pow(s-t,2)+Math.pow(n-i,2))},
// Events
onGestureStart:function(t){var i=y.zoom;if(!y.support.gestures){if("touchstart"!==t.type||"touchstart"===t.type&&t.targetTouches.length<2)return;i.gesture.scaleStart=i.getDistanceBetweenTouches(t)}if(!(i.gesture.slide&&i.gesture.slide.length||(i.gesture.slide=e(this),0===i.gesture.slide.length&&(i.gesture.slide=y.slides.eq(y.activeIndex)),i.gesture.image=i.gesture.slide.find("img, svg, canvas"),i.gesture.imageWrap=i.gesture.image.parent("."+y.params.zoomContainerClass),i.gesture.zoomMax=i.gesture.imageWrap.attr("data-swiper-zoom")||y.params.zoomMax,0!==i.gesture.imageWrap.length)))return void(i.gesture.image=void 0);i.gesture.image.transition(0),i.isScaling=!0},onGestureChange:function(e){var t=y.zoom;if(!y.support.gestures){if("touchmove"!==e.type||"touchmove"===e.type&&e.targetTouches.length<2)return;t.gesture.scaleMove=t.getDistanceBetweenTouches(e)}t.gesture.image&&0!==t.gesture.image.length&&(y.support.gestures?t.scale=e.scale*t.currentScale:t.scale=t.gesture.scaleMove/t.gesture.scaleStart*t.currentScale,t.scale>t.gesture.zoomMax&&(t.scale=t.gesture.zoomMax-1+Math.pow(t.scale-t.gesture.zoomMax+1,.5)),t.scale<y.params.zoomMin&&(t.scale=y.params.zoomMin+1-Math.pow(y.params.zoomMin-t.scale+1,.5)),t.gesture.image.transform("translate3d(0,0,0) scale("+t.scale+")"))},onGestureEnd:function(e){var t=y.zoom;!y.support.gestures&&("touchend"!==e.type||"touchend"===e.type&&e.changedTouches.length<2)||t.gesture.image&&0!==t.gesture.image.length&&(t.scale=Math.max(Math.min(t.scale,t.gesture.zoomMax),y.params.zoomMin),t.gesture.image.transition(y.params.speed).transform("translate3d(0,0,0) scale("+t.scale+")"),t.currentScale=t.scale,t.isScaling=!1,1===t.scale&&(t.gesture.slide=void 0))},onTouchStart:function(e,t){var i=e.zoom;i.gesture.image&&0!==i.gesture.image.length&&(i.image.isTouched||("android"===e.device.os&&t.preventDefault(),i.image.isTouched=!0,i.image.touchesStart.x="touchstart"===t.type?t.targetTouches[0].pageX:t.pageX,i.image.touchesStart.y="touchstart"===t.type?t.targetTouches[0].pageY:t.pageY))},onTouchMove:function(e){var t=y.zoom;if(t.gesture.image&&0!==t.gesture.image.length&&(y.allowClick=!1,t.image.isTouched&&t.gesture.slide)){t.image.isMoved||(t.image.width=t.gesture.image[0].offsetWidth,t.image.height=t.gesture.image[0].offsetHeight,t.image.startX=y.getTranslate(t.gesture.imageWrap[0],"x")||0,t.image.startY=y.getTranslate(t.gesture.imageWrap[0],"y")||0,t.gesture.slideWidth=t.gesture.slide[0].offsetWidth,t.gesture.slideHeight=t.gesture.slide[0].offsetHeight,t.gesture.imageWrap.transition(0),y.rtl&&(t.image.startX=-t.image.startX),y.rtl&&(t.image.startY=-t.image.startY));
// Define if we need image drag
var i=t.image.width*t.scale,s=t.image.height*t.scale;if(!(i<t.gesture.slideWidth&&s<t.gesture.slideHeight)){if(t.image.minX=Math.min(t.gesture.slideWidth/2-i/2,0),t.image.maxX=-t.image.minX,t.image.minY=Math.min(t.gesture.slideHeight/2-s/2,0),t.image.maxY=-t.image.minY,t.image.touchesCurrent.x="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,t.image.touchesCurrent.y="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,!t.image.isMoved&&!t.isScaling){if(y.isHorizontal()&&Math.floor(t.image.minX)===Math.floor(t.image.startX)&&t.image.touchesCurrent.x<t.image.touchesStart.x||Math.floor(t.image.maxX)===Math.floor(t.image.startX)&&t.image.touchesCurrent.x>t.image.touchesStart.x)return void(t.image.isTouched=!1);if(!y.isHorizontal()&&Math.floor(t.image.minY)===Math.floor(t.image.startY)&&t.image.touchesCurrent.y<t.image.touchesStart.y||Math.floor(t.image.maxY)===Math.floor(t.image.startY)&&t.image.touchesCurrent.y>t.image.touchesStart.y)return void(t.image.isTouched=!1)}e.preventDefault(),e.stopPropagation(),t.image.isMoved=!0,t.image.currentX=t.image.touchesCurrent.x-t.image.touchesStart.x+t.image.startX,t.image.currentY=t.image.touchesCurrent.y-t.image.touchesStart.y+t.image.startY,t.image.currentX<t.image.minX&&(t.image.currentX=t.image.minX+1-Math.pow(t.image.minX-t.image.currentX+1,.8)),t.image.currentX>t.image.maxX&&(t.image.currentX=t.image.maxX-1+Math.pow(t.image.currentX-t.image.maxX+1,.8)),t.image.currentY<t.image.minY&&(t.image.currentY=t.image.minY+1-Math.pow(t.image.minY-t.image.currentY+1,.8)),t.image.currentY>t.image.maxY&&(t.image.currentY=t.image.maxY-1+Math.pow(t.image.currentY-t.image.maxY+1,.8)),
//Velocity
t.velocity.prevPositionX||(t.velocity.prevPositionX=t.image.touchesCurrent.x),t.velocity.prevPositionY||(t.velocity.prevPositionY=t.image.touchesCurrent.y),t.velocity.prevTime||(t.velocity.prevTime=Date.now()),t.velocity.x=(t.image.touchesCurrent.x-t.velocity.prevPositionX)/(Date.now()-t.velocity.prevTime)/2,t.velocity.y=(t.image.touchesCurrent.y-t.velocity.prevPositionY)/(Date.now()-t.velocity.prevTime)/2,Math.abs(t.image.touchesCurrent.x-t.velocity.prevPositionX)<2&&(t.velocity.x=0),Math.abs(t.image.touchesCurrent.y-t.velocity.prevPositionY)<2&&(t.velocity.y=0),t.velocity.prevPositionX=t.image.touchesCurrent.x,t.velocity.prevPositionY=t.image.touchesCurrent.y,t.velocity.prevTime=Date.now(),t.gesture.imageWrap.transform("translate3d("+t.image.currentX+"px, "+t.image.currentY+"px,0)")}}},onTouchEnd:function(e,t){var i=e.zoom;if(i.gesture.image&&0!==i.gesture.image.length){if(!i.image.isTouched||!i.image.isMoved)return i.image.isTouched=!1,void(i.image.isMoved=!1);i.image.isTouched=!1,i.image.isMoved=!1;var s=300,n=300,a=i.velocity.x*s,o=i.image.currentX+a,r=i.velocity.y*n,l=i.image.currentY+r;
//Fix duration
0!==i.velocity.x&&(s=Math.abs((o-i.image.currentX)/i.velocity.x)),0!==i.velocity.y&&(n=Math.abs((l-i.image.currentY)/i.velocity.y));var h=Math.max(s,n);i.image.currentX=o,i.image.currentY=l;
// Define if we need image drag
var c=i.image.width*i.scale,u=i.image.height*i.scale;i.image.minX=Math.min(i.gesture.slideWidth/2-c/2,0),i.image.maxX=-i.image.minX,i.image.minY=Math.min(i.gesture.slideHeight/2-u/2,0),i.image.maxY=-i.image.minY,i.image.currentX=Math.max(Math.min(i.image.currentX,i.image.maxX),i.image.minX),i.image.currentY=Math.max(Math.min(i.image.currentY,i.image.maxY),i.image.minY),i.gesture.imageWrap.transition(h).transform("translate3d("+i.image.currentX+"px, "+i.image.currentY+"px,0)")}},onTransitionEnd:function(e){var t=e.zoom;t.gesture.slide&&e.previousIndex!==e.activeIndex&&(t.gesture.image.transform("translate3d(0,0,0) scale(1)"),t.gesture.imageWrap.transform("translate3d(0,0,0)"),t.gesture.slide=t.gesture.image=t.gesture.imageWrap=void 0,t.scale=t.currentScale=1)},
// Toggle Zoom
toggleZoom:function(t,i){var s=t.zoom;if(s.gesture.slide||(s.gesture.slide=t.clickedSlide?e(t.clickedSlide):t.slides.eq(t.activeIndex),s.gesture.image=s.gesture.slide.find("img, svg, canvas"),s.gesture.imageWrap=s.gesture.image.parent("."+t.params.zoomContainerClass)),s.gesture.image&&0!==s.gesture.image.length){var n,a,o,r,l,h,c,u,d,p,f,m,g,v,_,b,w,y;void 0===s.image.touchesStart.x&&i?(n="touchend"===i.type?i.changedTouches[0].pageX:i.pageX,a="touchend"===i.type?i.changedTouches[0].pageY:i.pageY):(n=s.image.touchesStart.x,a=s.image.touchesStart.y),s.scale&&1!==s.scale?(
// Zoom Out
s.scale=s.currentScale=1,s.gesture.imageWrap.transition(300).transform("translate3d(0,0,0)"),s.gesture.image.transition(300).transform("translate3d(0,0,0) scale(1)"),s.gesture.slide=void 0):(
// Zoom In
s.scale=s.currentScale=s.gesture.imageWrap.attr("data-swiper-zoom")||t.params.zoomMax,i?(w=s.gesture.slide[0].offsetWidth,y=s.gesture.slide[0].offsetHeight,o=s.gesture.slide.offset().left,r=s.gesture.slide.offset().top,l=o+w/2-n,h=r+y/2-a,d=s.gesture.image[0].offsetWidth,p=s.gesture.image[0].offsetHeight,f=d*s.scale,m=p*s.scale,g=Math.min(w/2-f/2,0),v=Math.min(y/2-m/2,0),_=-g,b=-v,c=l*s.scale,u=h*s.scale,c<g&&(c=g),c>_&&(c=_),u<v&&(u=v),u>b&&(u=b)):(c=0,u=0),s.gesture.imageWrap.transition(300).transform("translate3d("+c+"px, "+u+"px,0)"),s.gesture.image.transition(300).transform("translate3d(0,0,0) scale("+s.scale+")"))}},
// Attach/Detach Events
attachEvents:function(t){var i=t?"off":"on";if(y.params.zoom){var s=(y.slides,!("touchstart"!==y.touchEvents.start||!y.support.passiveListener||!y.params.passiveListeners)&&{passive:!0,capture:!1});
// Scale image
y.support.gestures?(y.slides[i]("gesturestart",y.zoom.onGestureStart,s),y.slides[i]("gesturechange",y.zoom.onGestureChange,s),y.slides[i]("gestureend",y.zoom.onGestureEnd,s)):"touchstart"===y.touchEvents.start&&(y.slides[i](y.touchEvents.start,y.zoom.onGestureStart,s),y.slides[i](y.touchEvents.move,y.zoom.onGestureChange,s),y.slides[i](y.touchEvents.end,y.zoom.onGestureEnd,s)),
// Move image
y[i]("touchStart",y.zoom.onTouchStart),y.slides.each(function(t,s){e(s).find("."+y.params.zoomContainerClass).length>0&&e(s)[i](y.touchEvents.move,y.zoom.onTouchMove)}),y[i]("touchEnd",y.zoom.onTouchEnd),
// Scale Out
y[i]("transitionEnd",y.zoom.onTransitionEnd),y.params.zoomToggle&&y.on("doubleTap",y.zoom.toggleZoom)}},init:function(){y.zoom.attachEvents()},destroy:function(){y.zoom.attachEvents(!0)}},/*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
y._plugins=[];for(var B in y.plugins){var N=y.plugins[B](y,y.params[B]);N&&y._plugins.push(N)}
// Return swiper instance
// Method to call all plugins event/method
// Accessibility tools
/*=========================
          Init/Destroy
          ===========================*/
// Cleanup dynamic styles
// Destroy
return y.callPlugins=function(e){for(var t=0;t<y._plugins.length;t++)e in y._plugins[t]&&y._plugins[t][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},y.emitterEventListeners={},y.emit=function(e){
// Trigger callbacks
y.params[e]&&y.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var t;
// Trigger events
if(y.emitterEventListeners[e])for(t=0;t<y.emitterEventListeners[e].length;t++)y.emitterEventListeners[e][t](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);
// Trigger plugins
y.callPlugins&&y.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},y.on=function(e,t){return e=p(e),y.emitterEventListeners[e]||(y.emitterEventListeners[e]=[]),y.emitterEventListeners[e].push(t),y},y.off=function(e,t){var i;if(e=p(e),void 0===t)
// Remove all handlers for such event
return y.emitterEventListeners[e]=[],y;if(y.emitterEventListeners[e]&&0!==y.emitterEventListeners[e].length){for(i=0;i<y.emitterEventListeners[e].length;i++)y.emitterEventListeners[e][i]===t&&y.emitterEventListeners[e].splice(i,1);return y}},y.once=function(e,t){e=p(e);var i=function(){t(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),y.off(e,i)};return y.on(e,i),y},y.a11y={makeFocusable:function(e){return e.attr("tabIndex","0"),e},addRole:function(e,t){return e.attr("role",t),e},addLabel:function(e,t){return e.attr("aria-label",t),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(t){13===t.keyCode&&(e(t.target).is(y.params.nextButton)?(y.onClickNext(t),y.isEnd?y.a11y.notify(y.params.lastSlideMessage):y.a11y.notify(y.params.nextSlideMessage)):e(t.target).is(y.params.prevButton)&&(y.onClickPrev(t),y.isBeginning?y.a11y.notify(y.params.firstSlideMessage):y.a11y.notify(y.params.prevSlideMessage)),e(t.target).is("."+y.params.bulletClass)&&e(t.target)[0].click())},liveRegion:e('<span class="'+y.params.notificationClass+'" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var t=y.a11y.liveRegion;0!==t.length&&(t.html(""),t.html(e))},init:function(){
// Setup accessibility
y.params.nextButton&&y.nextButton&&y.nextButton.length>0&&(y.a11y.makeFocusable(y.nextButton),y.a11y.addRole(y.nextButton,"button"),y.a11y.addLabel(y.nextButton,y.params.nextSlideMessage)),y.params.prevButton&&y.prevButton&&y.prevButton.length>0&&(y.a11y.makeFocusable(y.prevButton),y.a11y.addRole(y.prevButton,"button"),y.a11y.addLabel(y.prevButton,y.params.prevSlideMessage)),e(y.container).append(y.a11y.liveRegion)},initPagination:function(){y.params.pagination&&y.params.paginationClickable&&y.bullets&&y.bullets.length&&y.bullets.each(function(){var t=e(this);y.a11y.makeFocusable(t),y.a11y.addRole(t,"button"),y.a11y.addLabel(t,y.params.paginationBulletMessage.replace(/{{index}}/,t.index()+1))})},destroy:function(){y.a11y.liveRegion&&y.a11y.liveRegion.length>0&&y.a11y.liveRegion.remove()}},y.init=function(){y.params.loop&&y.createLoop(),y.updateContainerSize(),y.updateSlidesSize(),y.updatePagination(),y.params.scrollbar&&y.scrollbar&&(y.scrollbar.set(),y.params.scrollbarDraggable&&y.scrollbar.enableDraggable()),"slide"!==y.params.effect&&y.effects[y.params.effect]&&(y.params.loop||y.updateProgress(),y.effects[y.params.effect].setTranslate()),y.params.loop?y.slideTo(y.params.initialSlide+y.loopedSlides,0,y.params.runCallbacksOnInit):(y.slideTo(y.params.initialSlide,0,y.params.runCallbacksOnInit),0===y.params.initialSlide&&(y.parallax&&y.params.parallax&&y.parallax.setTranslate(),y.lazy&&y.params.lazyLoading&&(y.lazy.load(),y.lazy.initialImageLoaded=!0))),y.attachEvents(),y.params.observer&&y.support.observer&&y.initObservers(),y.params.preloadImages&&!y.params.lazyLoading&&y.preloadImages(),y.params.zoom&&y.zoom&&y.zoom.init(),y.params.autoplay&&y.startAutoplay(),y.params.keyboardControl&&y.enableKeyboardControl&&y.enableKeyboardControl(),y.params.mousewheelControl&&y.enableMousewheelControl&&y.enableMousewheelControl(),
// Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
y.params.hashnavReplaceState&&(y.params.replaceState=y.params.hashnavReplaceState),y.params.history&&y.history&&y.history.init(),y.params.hashnav&&y.hashnav&&y.hashnav.init(),y.params.a11y&&y.a11y&&y.a11y.init(),y.emit("onInit",y)},y.cleanupStyles=function(){
// Container
y.container.removeClass(y.classNames.join(" ")).removeAttr("style"),
// Wrapper
y.wrapper.removeAttr("style"),
// Slides
y.slides&&y.slides.length&&y.slides.removeClass([y.params.slideVisibleClass,y.params.slideActiveClass,y.params.slideNextClass,y.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),
// Pagination/Bullets
y.paginationContainer&&y.paginationContainer.length&&y.paginationContainer.removeClass(y.params.paginationHiddenClass),y.bullets&&y.bullets.length&&y.bullets.removeClass(y.params.bulletActiveClass),
// Buttons
y.params.prevButton&&e(y.params.prevButton).removeClass(y.params.buttonDisabledClass),y.params.nextButton&&e(y.params.nextButton).removeClass(y.params.buttonDisabledClass),
// Scrollbar
y.params.scrollbar&&y.scrollbar&&(y.scrollbar.track&&y.scrollbar.track.length&&y.scrollbar.track.removeAttr("style"),y.scrollbar.drag&&y.scrollbar.drag.length&&y.scrollbar.drag.removeAttr("style"))},y.destroy=function(e,t){
// Detach evebts
y.detachEvents(),
// Stop autoplay
y.stopAutoplay(),
// Disable draggable
y.params.scrollbar&&y.scrollbar&&y.params.scrollbarDraggable&&y.scrollbar.disableDraggable(),
// Destroy loop
y.params.loop&&y.destroyLoop(),
// Cleanup styles
t&&y.cleanupStyles(),
// Disconnect observer
y.disconnectObservers(),
// Destroy zoom
y.params.zoom&&y.zoom&&y.zoom.destroy(),
// Disable keyboard/mousewheel
y.params.keyboardControl&&y.disableKeyboardControl&&y.disableKeyboardControl(),y.params.mousewheelControl&&y.disableMousewheelControl&&y.disableMousewheelControl(),
// Disable a11y
y.params.a11y&&y.a11y&&y.a11y.destroy(),
// Delete history popstate
y.params.history&&!y.params.replaceState&&window.removeEventListener("popstate",y.history.setHistoryPopState),y.params.hashnav&&y.hashnav&&y.hashnav.destroy(),
// Destroy callback
y.emit("onDestroy"),
// Delete instance
!1!==e&&(y=null)},y.init(),y}};/*==================================================
        Prototype
    ====================================================*/
t.prototype={isSafari:function(){var e=window.navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},/*==================================================
        Browser
        ====================================================*/
browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1,lteIE9:function(){
// create temporary DIV
var e=document.createElement("div");
// return true / false value based on what will browser render
// add content to tmp DIV which is wrapped into the IE HTML conditional statement
return e.innerHTML="\x3c!--[if lte IE 9]><i></i><![endif]--\x3e",1===e.getElementsByTagName("i").length}()},/*==================================================
        Devices
        ====================================================*/
device:function(){var e=window.navigator.userAgent,t=e.match(/(Android);?[\s\/]+([\d.]+)?/),i=e.match(/(iPad).*OS\s([\d_]+)/),s=e.match(/(iPod)(.*OS\s([\d_]+))?/),n=!i&&e.match(/(iPhone\sOS|iOS)\s([\d_]+)/);return{ios:i||n||s,android:t}}(),/*==================================================
        Feature Detection
        ====================================================*/
support:{touch:window.Modernizr&&!0===Modernizr.touch||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&!0===Modernizr.csstransforms3d||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,t="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),i=0;i<t.length;i++)if(t[i]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}(),passiveListener:function(){var e=!1;try{var t=Object.defineProperty({},"passive",{get:function(){e=!0}});window.addEventListener("testPassiveListener",null,t)}catch(e){}return e}(),gestures:function(){return"ongesturestart"in window}()},/*==================================================
        Plugins
        ====================================================*/
plugins:{}};for(var i=(function(){var e=function(e){var t=this,i=0;
// Create array-like object
for(i=0;i<e.length;i++)t[i]=e[i];
// Return collection with methods
return t.length=e.length,this},t=function(t,i){var s=[],n=0;if(t&&!i&&t instanceof e)return t;if(t)
// String
if("string"==typeof t){var a,o,r=t.trim();if(r.indexOf("<")>=0&&r.indexOf(">")>=0){var l="div";for(0===r.indexOf("<li")&&(l="ul"),0===r.indexOf("<tr")&&(l="tbody"),0!==r.indexOf("<td")&&0!==r.indexOf("<th")||(l="tr"),0===r.indexOf("<tbody")&&(l="table"),0===r.indexOf("<option")&&(l="select"),o=document.createElement(l),o.innerHTML=t,n=0;n<o.childNodes.length;n++)s.push(o.childNodes[n])}else for(
// Other selectors
a=i||"#"!==t[0]||t.match(/[ .<>:~]/)?(i||document).querySelectorAll(t):[document.getElementById(t.split("#")[1])],n=0;n<a.length;n++)a[n]&&s.push(a[n])}else if(t.nodeType||t===window||t===document)s.push(t);else if(t.length>0&&t[0].nodeType)for(n=0;n<t.length;n++)s.push(t[n]);return new e(s)};return e.prototype={
// Classes and attriutes
addClass:function(e){if(void 0===e)return this;for(var t=e.split(" "),i=0;i<t.length;i++)for(var s=0;s<this.length;s++)this[s].classList.add(t[i]);return this},removeClass:function(e){for(var t=e.split(" "),i=0;i<t.length;i++)for(var s=0;s<this.length;s++)this[s].classList.remove(t[i]);return this},hasClass:function(e){return!!this[0]&&this[0].classList.contains(e)},toggleClass:function(e){for(var t=e.split(" "),i=0;i<t.length;i++)for(var s=0;s<this.length;s++)this[s].classList.toggle(t[i]);return this},attr:function(e,t){if(1===arguments.length&&"string"==typeof e)
// Get attr
// Get attr
return this[0]?this[0].getAttribute(e):void 0;
// Set attrs
for(var i=0;i<this.length;i++)if(2===arguments.length)
// String
this[i].setAttribute(e,t);else
// Object
for(var s in e)this[i][s]=e[s],this[i].setAttribute(s,e[s]);return this},removeAttr:function(e){for(var t=0;t<this.length;t++)this[t].removeAttribute(e);return this},data:function(e,t){if(void 0!==t){
// Set value
for(var i=0;i<this.length;i++){var s=this[i];s.dom7ElementDataStorage||(s.dom7ElementDataStorage={}),s.dom7ElementDataStorage[e]=t}return this}
// Get value
if(this[0]){var n=this[0].getAttribute("data-"+e);return n||(this[0].dom7ElementDataStorage&&e in this[0].dom7ElementDataStorage?this[0].dom7ElementDataStorage[e]:void 0)}},
// Transforms
transform:function(e){for(var t=0;t<this.length;t++){var i=this[t].style;i.webkitTransform=i.MsTransform=i.msTransform=i.MozTransform=i.OTransform=i.transform=e}return this},transition:function(e){"string"!=typeof e&&(e+="ms");for(var t=0;t<this.length;t++){var i=this[t].style;i.webkitTransitionDuration=i.MsTransitionDuration=i.msTransitionDuration=i.MozTransitionDuration=i.OTransitionDuration=i.transitionDuration=e}return this},
//Events
on:function(e,i,s,n){function a(e){var n=e.target;if(t(n).is(i))s.call(n,e);else for(var a=t(n).parents(),o=0;o<a.length;o++)t(a[o]).is(i)&&s.call(a[o],e)}var o,r,l=e.split(" ");for(o=0;o<this.length;o++)if("function"==typeof i||!1===i)for(
// Usual events
"function"==typeof i&&(s=arguments[1],n=arguments[2]||!1),r=0;r<l.length;r++)this[o].addEventListener(l[r],s,n);else
//Live events
for(r=0;r<l.length;r++)this[o].dom7LiveListeners||(this[o].dom7LiveListeners=[]),this[o].dom7LiveListeners.push({listener:s,liveListener:a}),this[o].addEventListener(l[r],a,n);return this},off:function(e,t,i,s){for(var n=e.split(" "),a=0;a<n.length;a++)for(var o=0;o<this.length;o++)if("function"==typeof t||!1===t)
// Usual events
"function"==typeof t&&(i=arguments[1],s=arguments[2]||!1),this[o].removeEventListener(n[a],i,s);else
// Live event
if(this[o].dom7LiveListeners)for(var r=0;r<this[o].dom7LiveListeners.length;r++)this[o].dom7LiveListeners[r].listener===i&&this[o].removeEventListener(n[a],this[o].dom7LiveListeners[r].liveListener,s);return this},once:function(e,t,i,s){function n(o){i(o),a.off(e,t,n,s)}var a=this;"function"==typeof t&&(t=!1,i=arguments[1],s=arguments[2]),a.on(e,t,n,s)},trigger:function(e,t){for(var i=0;i<this.length;i++){var s;try{s=new window.CustomEvent(e,{detail:t,bubbles:!0,cancelable:!0})}catch(i){s=document.createEvent("Event"),s.initEvent(e,!0,!0),s.detail=t}this[i].dispatchEvent(s)}return this},transitionEnd:function(e){function t(a){/*jshint validthis:true */
if(a.target===this)for(e.call(this,a),i=0;i<s.length;i++)n.off(s[i],t)}var i,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],n=this;if(e)for(i=0;i<s.length;i++)n.on(s[i],t);return this},
// Sizing/Styles
width:function(){return this[0]===window?window.innerWidth:this.length>0?parseFloat(this.css("width")):null},outerWidth:function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null},height:function(){return this[0]===window?window.innerHeight:this.length>0?parseFloat(this.css("height")):null},outerHeight:function(e){return this.length>0?e?this[0].offsetHeight+parseFloat(this.css("margin-top"))+parseFloat(this.css("margin-bottom")):this[0].offsetHeight:null},offset:function(){if(this.length>0){var e=this[0],t=e.getBoundingClientRect(),i=document.body,s=e.clientTop||i.clientTop||0,n=e.clientLeft||i.clientLeft||0,a=window.pageYOffset||e.scrollTop,o=window.pageXOffset||e.scrollLeft;return{top:t.top+a-s,left:t.left+o-n}}return null},css:function(e,t){var i;if(1===arguments.length){if("string"!=typeof e){for(i=0;i<this.length;i++)for(var s in e)this[i].style[s]=e[s];return this}if(this[0])return window.getComputedStyle(this[0],null).getPropertyValue(e)}if(2===arguments.length&&"string"==typeof e){for(i=0;i<this.length;i++)this[i].style[e]=t;return this}return this},
//Dom manipulation
each:function(e){for(var t=0;t<this.length;t++)e.call(this[t],t,this[t]);return this},html:function(e){if(void 0===e)return this[0]?this[0].innerHTML:void 0;for(var t=0;t<this.length;t++)this[t].innerHTML=e;return this},text:function(e){if(void 0===e)return this[0]?this[0].textContent.trim():null;for(var t=0;t<this.length;t++)this[t].textContent=e;return this},is:function(i){if(!this[0])return!1;var s,n;if("string"==typeof i){var a=this[0];if(a===document)return i===document;if(a===window)return i===window;if(a.matches)return a.matches(i);if(a.webkitMatchesSelector)return a.webkitMatchesSelector(i);if(a.mozMatchesSelector)return a.mozMatchesSelector(i);if(a.msMatchesSelector)return a.msMatchesSelector(i);for(s=t(i),n=0;n<s.length;n++)if(s[n]===this[0])return!0;return!1}if(i===document)return this[0]===document;if(i===window)return this[0]===window;if(i.nodeType||i instanceof e){for(s=i.nodeType?[i]:i,n=0;n<s.length;n++)if(s[n]===this[0])return!0;return!1}return!1},index:function(){if(this[0]){for(var e=this[0],t=0;null!==(e=e.previousSibling);)1===e.nodeType&&t++;return t}},eq:function(t){if(void 0===t)return this;var i,s=this.length;return t>s-1?new e([]):t<0?(i=s+t,new e(i<0?[]:[this[i]])):new e([this[t]])},append:function(t){var i,s;for(i=0;i<this.length;i++)if("string"==typeof t){var n=document.createElement("div");for(n.innerHTML=t;n.firstChild;)this[i].appendChild(n.firstChild)}else if(t instanceof e)for(s=0;s<t.length;s++)this[i].appendChild(t[s]);else this[i].appendChild(t);return this},prepend:function(t){var i,s;for(i=0;i<this.length;i++)if("string"==typeof t){var n=document.createElement("div");for(n.innerHTML=t,s=n.childNodes.length-1;s>=0;s--)this[i].insertBefore(n.childNodes[s],this[i].childNodes[0])}else if(t instanceof e)for(s=0;s<t.length;s++)this[i].insertBefore(t[s],this[i].childNodes[0]);else this[i].insertBefore(t,this[i].childNodes[0]);return this},insertBefore:function(e){for(var i=t(e),s=0;s<this.length;s++)if(1===i.length)i[0].parentNode.insertBefore(this[s],i[0]);else if(i.length>1)for(var n=0;n<i.length;n++)i[n].parentNode.insertBefore(this[s].cloneNode(!0),i[n])},insertAfter:function(e){for(var i=t(e),s=0;s<this.length;s++)if(1===i.length)i[0].parentNode.insertBefore(this[s],i[0].nextSibling);else if(i.length>1)for(var n=0;n<i.length;n++)i[n].parentNode.insertBefore(this[s].cloneNode(!0),i[n].nextSibling)},next:function(i){return new e(this.length>0?i?this[0].nextElementSibling&&t(this[0].nextElementSibling).is(i)?[this[0].nextElementSibling]:[]:this[0].nextElementSibling?[this[0].nextElementSibling]:[]:[])},nextAll:function(i){var s=[],n=this[0];if(!n)return new e([]);for(;n.nextElementSibling;){var a=n.nextElementSibling;i?t(a).is(i)&&s.push(a):s.push(a),n=a}return new e(s)},prev:function(i){return new e(this.length>0?i?this[0].previousElementSibling&&t(this[0].previousElementSibling).is(i)?[this[0].previousElementSibling]:[]:this[0].previousElementSibling?[this[0].previousElementSibling]:[]:[])},prevAll:function(i){var s=[],n=this[0];if(!n)return new e([]);for(;n.previousElementSibling;){var a=n.previousElementSibling;i?t(a).is(i)&&s.push(a):s.push(a),n=a}return new e(s)},parent:function(e){for(var i=[],s=0;s<this.length;s++)e?t(this[s].parentNode).is(e)&&i.push(this[s].parentNode):i.push(this[s].parentNode);return t(t.unique(i))},parents:function(e){for(var i=[],s=0;s<this.length;s++)for(var n=this[s].parentNode;n;)e?t(n).is(e)&&i.push(n):i.push(n),n=n.parentNode;return t(t.unique(i))},find:function(t){for(var i=[],s=0;s<this.length;s++)for(var n=this[s].querySelectorAll(t),a=0;a<n.length;a++)i.push(n[a]);return new e(i)},children:function(i){for(var s=[],n=0;n<this.length;n++)for(var a=this[n].childNodes,o=0;o<a.length;o++)i?1===a[o].nodeType&&t(a[o]).is(i)&&s.push(a[o]):1===a[o].nodeType&&s.push(a[o]);return new e(t.unique(s))},remove:function(){for(var e=0;e<this.length;e++)this[e].parentNode&&this[e].parentNode.removeChild(this[e]);return this},add:function(){var e,i,s=this;for(e=0;e<arguments.length;e++){var n=t(arguments[e]);for(i=0;i<n.length;i++)s[s.length]=n[i],s.length++}return s}},t.fn=e.prototype,t.unique=function(e){for(var t=[],i=0;i<e.length;i++)-1===t.indexOf(e[i])&&t.push(e[i]);return t},t}()),s=["jQuery","Zepto","Dom7"],n=0;n<s.length;n++)window[s[n]]&&/*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
function(e){e.fn.swiper=function(i){var s;return e(this).each(function(){var e=new t(this,i);s||(s=e)}),s}}(window[s[n]]);
// Required DOM Plugins
var a;a=void 0===i?window.Dom7||window.Zepto||window.jQuery:i,a&&("transitionEnd"in a.fn||(a.fn.transitionEnd=function(e){function t(a){/*jshint validthis:true */
if(a.target===this)for(e.call(this,a),i=0;i<s.length;i++)n.off(s[i],t)}var i,s=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],n=this;if(e)for(i=0;i<s.length;i++)n.on(s[i],t);return this}),"transform"in a.fn||(a.fn.transform=function(e){for(var t=0;t<this.length;t++){var i=this[t].style;i.webkitTransform=i.MsTransform=i.msTransform=i.MozTransform=i.OTransform=i.transform=e}return this}),"transition"in a.fn||(a.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var t=0;t<this.length;t++){var i=this[t].style;i.webkitTransitionDuration=i.MsTransitionDuration=i.msTransitionDuration=i.MozTransitionDuration=i.OTransitionDuration=i.transitionDuration=e}return this}),"outerWidth"in a.fn||(a.fn.outerWidth=function(e){return this.length>0?e?this[0].offsetWidth+parseFloat(this.css("margin-right"))+parseFloat(this.css("margin-left")):this[0].offsetWidth:null})),window.Swiper=t}(),/*===========================
Swiper AMD Export
===========================*/
"undefined"!=typeof module?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper}),/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.7
 * release date : 2017.02.17
 * author		: http://turfrain.tistory.com/
 * Copyright 2018. turfrain all rights reserved.
 *
 */
/* input type="file" 이미지로 변경 */
function(e){e.fn.trpFilestyle=function(t){var i={textClass:"trp_fileName",textWidth:"auto",textHeight:"auto",buttonClass:"trp_fileButton",buttonText:"파일선택",buttonImage:"",buttonWidth:"auto",buttonHeight:"auto"};
// 옵녓값 합침        
return t&&e.extend(i,t),this.each(function(){var t=this,s=navigator.userAgent,n=e("<input type='text' title='file name' readonly='readonly' />").addClass(i.textClass);n.css({width:i.textWidth,height:i.textHeight,margin:"2px",display:"inline"});
// 생성되는 div 버튼 wrap
var a=e("<div>").addClass(i.buttonClass);a.css({position:"absolute",display:"inline",width:i.buttonWidth,height:i.buttonHeight,background:""!=i.buttonImage?"url("+i.buttonImage+") 0 0 no-repeat":"none",overflow:"hidden"}),
// 이미지가 없을때 글자로 변경	 "buttonText"속성 사용
""==i.buttonImage&&a.prepend(i.buttonText),
// 속성 적용
e(t).before(n),e(t).wrap(a),e(t).css({position:"absolute",top:"0",left:"0",opacity:0,height:i.buttonHeight,"margin-left":/chrome/i.test(s)?"-75px":"-160px",// 크롬일때 / 크롬이 아닐때
overflow:"hidden",cursor:"pointer"}),
// 파일 경로 값넣기
e(t).on("change",function(){var i=e(t).val();e(t).parent().siblings(".trp_fileName").attr("value",i)}),
// 접근성 아웃라인 넣기				
e(t).on("focus",function(){/chrome/i.test(s)?// 크롬
e(t).parent(".trp_fileButton").css({outline:" 2px auto #4d90fe"}):e(t).parent(".trp_fileButton").css({outline:"1px dotted #000"})}),e(t).on("blur",function(){e(t).parent(".trp_fileButton").css({outline:"none"})})})}}(jQuery),/*  trpCheckBoxAllsImg             : 전체 선택 체크 박스
    @param	$checkAll			: 전체 체크박스 선택자
    @param	$checkItem			: 개별 체크박스 선택자
*/
jQuery.fn.trpCheckBoxAllsImg=function(e,t){var i=this;// 컨테이너
/* 전체 선택 */
$(i).on("change",e,function(){$(i).find(e).prop("checked")?($(i).find(t).prop("checked",!0),$(i).find(e).parent().addClass("on"),$(i).find(t).parent().addClass("on")):($(i).find(t).prop("checked",!1),$(i).find(e).parent().removeClass("on"),$(i).find(t).parent().removeClass("on"))}),/* 개별 선택 */
$(i).on("change",t,function(){
// all
$(i).find(t+":checked").length>=$(i).find(t).length?($(i).find(e).prop("checked",!0),$(i).find(e).parent().addClass("on")):($(i).find(e).prop("checked",!1),$(i).find(e).parent().removeClass("on")),
// item
//if ( !$(this).parent().hasClass("on") ){
$(this).prop("checked")?$(this).parent().addClass("on"):$(this).parent().removeClass("on")})},/* //전체 선택 체크 박스 */
/*  trpCheckBoxAlls             : 전체 선택 체크 박스
    @param	$checkAll			: 전체 체크박스 선택자
    @param	$checkItem			: 개별 체크박스 선택자
*/
jQuery.fn.trpCheckBoxAlls=function(e,t){var i=this;// 컨테이너
/* 전체 선택 */
$(i).on("click",e,function(){$(i).find(e).prop("checked")?$(i).find(t).prop("checked",!0):$(i).find(t).prop("checked",!1)}),/* 개별 선택 */
$(i).on("click",t,function(){$(i).find(t+":checked").length>=$(i).find(t).length?$(i).find(e).prop("checked",!0):$(i).find(e).prop("checked",!1)})},/* //전체 선택 체크 박스 */
/* 카운트 UI  
<span class="ui-count">
	<input type="text" class="ui-countTxt" value="1" min="1" max="5">
</span>
$('.ui-count').uiCount();
*/
$.fn.uiCount=function(e){function t(e,t){return e+="",e.length>=t?e:new Array(t-e.length+1).join("0")+e}var i={initCount:0,onComplete:function(){return!0}};return i=jQuery.extend(i,e||{}),this.each(function(){function e(){h.append("<a href='#' class='arrow_up'><span class='blind'>up</span></a>"),h.append("<a href='#' class='arrow_down'><span class='blind'>down</span></a>"),i()}function i(){l=u.val().length?parseInt(u.val()):0,l=isNaN(l)?0:l,0==o?u.val(t(l,2)):u.val(l)}function s(){l=parseInt(u.val())+1,l=l>r?r:l,0==o?u.val(t(l,2)):u.val(l)}function n(){l=parseInt(u.val())-1,l=l>o?l:o,0==o?u.val(t(l,2)):u.val(l)}function a(){$(c).on("click",".arrow_up",function(){//countTxt.focus();
return s(),!1}),$(c).on("click",".arrow_down",function(){//countTxt.focus();
return n(),!1}),$(c).on("mousewheel",function(e){e.preventDefault();var t=e.originalEvent;delta=0,t.detail?delta=-40*t.detail:delta=t.wheelDelta,delta>0?s():n()}),u.off().on("change",i)}var o,r,l,h=$(this),c=$(this).closest(".ui-count"),u=$("input.ui-countTxt",h);o=void 0!=$(h).find("input.ui-countTxt").attr("min")?parseInt($(h).find("input.ui-countTxt").attr("min")):0,r=void 0!=$(h).find("input.ui-countTxt").attr("max")?parseInt($(h).find("input.ui-countTxt").attr("max")):9999;!function(){
// 테그가생성되었으면 다시 실행하지 않는다.  
//$(_wrap).find(".arrow_down).click(function(){ alert("click");});
if($(h).find("a").hasClass("arrow_down"))return!1;e(),a()}()})},/* //카운트 UI  */
/* trpTimepicker */
$.fn.trpTimepicker=function(e){function t(){i=$(".trp-timepicker .hours",a).val(),s=$(".trp-timepicker .minute",a).val(),n=$(".trp-timepicker .ui-ampm",a).attr("data-ampm"),$(".timepicker-box input",a).val(i+" : "+s+" : "+n)}var i,s,n,a=this,o=o='<div class="trp-timepicker am" >';o+='<span class="ui-count">',o+='<input type="text" class="ui-countTxt hours" readonly value="1" min="1" max="12" title="mouse wheel">',o+="</span>",o+='<span class="ui-count" minute>',o+='<input type="text" class="ui-countTxt minute" readonly value="00" min="00" max="59" title="mouse wheel">',o+="</span>",o+='<button class="btn ui-ampm" data-ampm="AM" >AM</button>',o+="</div>",$(a).append(o),$(".timepicker-box",a).on("click",function(e){$(".trp-timepicker",a).addClass("on").show()}),$(document).on("click",function(e){if($(".trp-timepicker",a).hasClass("on")){var i=$(e.target);t(),i.parents().hasClass("timepicker-area")||$(".trp-timepicker",a).removeClass("on").hide()}}),$(".ui-count").uiCount(),$(".trp-timepicker",a).on("click",".ui-ampm",function(){$(".trp-timepicker").toggleClass("am"),$(".trp-timepicker").hasClass("am")?$(this).attr("data-ampm","AM").text("AM"):$(this).attr("data-ampm","PM").text("PM")}),$(".trp-timepicker .ui-count a",a).on("click",function(){setTimeout(t,10)}),$(".trp-timepicker .ui-count",a).on("mousewheel",t)},/*
trpScrollPositionReturn         : 스크롤 움직임에 따라 타겟 높이 값을 변경하여 따라다니게 한다.
* @option	positionTar		    : 적용할 타겟 선택자            (기본값 : this)
* @option	heightTar			: 적용할 타켓 높이값            (기본값 : this.height)
* @option	showHeight			: 적용할 타겟 보여질 위치        (기본값 : window.height)
* @option	bottonTar		    : 적용할 타겟 하단 여백          (기본값 : 50)
* @option	bottomStop		    : 적용할 타겟 하단 멈추어야할 위치 (기본값 : 100)
*/
jQuery.fn.trpScrollSync=function(e){function t(){
// scroll top botton hold
if(s=$(window).height(),n=$(window).scrollTop(),a=$(document).height(),
// scroll_top view
n<o.showHeight?// winST < wH
$(".scroll_top").fadeOut():$(".scroll_top").fadeIn(),n+s>a-l){var e=a-l-r;$(".scroll_top").css({top:e})}else{var t=s-r+n;$(".scroll_top").css({top:t,bottom:"auto"})}$(".wrapper").attr("data-pop")}var i=this,s=$(window).height(),n=$(window).scrollTop(),a=$(document).height(),o={postionTar:i,// 스크롤 타겟 선택자
heightTar:i.height,// 스크롤 타켓 높이값
showHeight:s,// 스크롤 보여질 위치
bottonTar:50,// 타겟 하단 여백
bottomStop:100};o=jQuery.extend(o,e||{});var r=o.bottonTar+o.heightTar,l=o.bottomStop-o.bottonTar;// 멈출 위치 
$(window).on("scroll resize",function(e){t()}),t()},/*
trpScrollPositionClass          : 스크롤타겟위치에서 타겟클래스변경
* @param	$scrollTar			: 기준 타겟 위치 선택자
* @param	$scrollTarModi		: 기준 타겟 위치 가감 수치
* @param	$addTar				: 적용 타겟 선택자
* @param	$addTarClass		: 적용 타겟 class 이름
*/
jQuery.fn.trpScrollPositionClass=function(e,t,i,s){function n(){a=$(window).scrollTop(),a>=o?("over"!=r&&$(i).addClass(s),r="over"):("under"!=r&&$(i).removeClass(s),r="under")}var a=$(window).scrollTop(),o=0,r="defaul";// over, under
// 선텍자 체크
""!=e&&$(e).length>0&&(o=$(e).offset().top),
// 숫자 체크
0==isNaN(t)&&(o+=t),$(window).on("scroll resize",function(e){n()}),n()},/*
trpScrollPositionWindowClass    : 스크롤타겟위치에서 윈도우높이 절반 타겟클래스변경
* @param	$scrollTar			: 기준 타겟 위치 선택자
* @param	$scrollTarModi		: 기준 타겟 위치 가감 수치
* @param	$addTar				: 적용 타겟 선택자
* @param	$addTarClass		: 적용 타겟 class 이름
*/
jQuery.fn.trpScrollPositionWindowClass=function(e,t,i,s){function n(){a=$(window).scrollTop(),a>=o?("over"!=r&&$(i).addClass(s),r="over"):("under"!=r&&$(i).removeClass(s),r="under")}var a=$(window).scrollTop(),o=0,r="defaul";// over, under
// 선텍자 체크
""!=e&&$(e).length>0&&(o=$(e).offset().top),
// 숫자 체크
0==isNaN(t)&&(o=o+$(window).height()/2+t),$(window).on("scroll resize",function(e){n()}),n()},/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.85
 * release date : 2019.03.21
 * author		: http://turfrain.tistory.com/
 * Copyright 2018. turfrain all rights reserved.
 *
 */
/**
 * trpQuickMenu : 스크롤 딸아 다니는 컨테이너
 * @param $top : 컨테이너 높이값
 */
jQuery.fn.trpQuickMenu=function(e){function t(e){s.stop().animate({top:e+"px"},500)}var i,s=this;// 상단에서 떨어져야하는위치
i=e||0,$(window).scroll(function(){t($(document).scrollTop()+i)})},/**
 * trpTabSimple				  : 텝메뉴
 * @param	$btn		    	: 버튼선택자
 * @param	$activeClass	: 활성화 class 이름
 * @param	$activeFN			: (index) 선택된 인덱스 넘기기
 * @method  setBtn(index)	: 인덱스값을 넘기현 해당컨텐츠 활성화
 */
jQuery.fn.trpTabSimple=function(e,t,i){function s(e){$(n).find(">li").removeClass("on_prev"),0<e&&$(n).find(">li").eq(e-1).addClass("on_prev"),$(n).find(">li").removeClass(t),$(n).find(">li").eq(e).addClass(t),i&&i(e)}var n=this;// 텝 컨테이너
// activeClass 없으면 on으로 체크
// 텝 버튼 초기화
return t=t||"on",$(n).find("li:first").addClass(t),$(n).find(e).on("click",function(){var e=$(this).closest("li");return s(e.index()),!1}),s(0),{setBtn:function(e){s(e)}}},/**
 * trpTabMenu				: 텝메뉴
 * @param	$btn			: 링크버튼
 * @param	$cont			: 컨텐츠
 * @param	$activeClass	: 활성화 class 이름
 * @method  setBtn(index)	: 인덱스값을 넘기현 해당컨텐츠 활성화
 */
jQuery.fn.trpTabMenu=function(e,t,i){function s(e,s){if(s)// 클릭시
s.siblings().removeClass(i),// 버튼 초기화
s.addClass(i),// 버트 활성화
s.siblings().find(t).hide(),// 컨텐츠 초기화
s.find(t).show(),// 컨텐츠 활성화
s.find("ul li").siblings().removeClass(i),// 버튼 초기화
s.find("ul li").eq(0).addClass(i),// 버트 활성화
s.find("ul li").siblings().find(t).hide(),// 컨텐츠 초기화
s.find("ul li.on").find(t).show();else{// 호출시
var a=e.length;if(a){// 배열
$(n).find(">li").siblings().removeClass(i),// 버튼 초기화
$(n).find(">li").eq(e[0]).addClass(i),// 버트 활성화
$(n).find(">li").find(t).hide(),// 컨텐츠 초기화
$(n).find(">li.on").find(t).show();// 컨텐츠 활성화
var o="",r="";for($i=1;$i<a;$i++)o+="ul li ",r+="ul li.on ",$(n).find("li.on").find(o).siblings().removeClass(i),// 버튼 초기화
$(n).find("li.on").find(o).eq(e[$i]).addClass(i),// 버트 활성화
$(n).find("li.on").find(o).siblings().find(t).hide(),// 컨텐츠 초기화
$(n).find("li.on").find(r).find(t).show()}else// 넘버
//console.log("$index:: " + $index);
$(n).find(">li").siblings().removeClass(i),// 버튼 초기화
$(n).find(">li").eq(e).addClass(i),// 버트 활성화
$(n).find(">li").find(t).hide(),// 컨텐츠 초기화
$(n).find(">li.on").find(t).show(),// 컨텐츠 활성화
$(n).find("li.on").find("ul li").siblings().removeClass(i),// 버튼 초기화
$(n).find("li.on").find("ul li").eq(0).addClass(i),// 버트 활성화
$(n).find("li.on").find("ul li").siblings().find(t).hide(),// 컨텐츠 초기화
$(n).find("li.on").find("ul li.on").find(t).show()}}var n=this;// 텝 컨테이너
// activeClass 없으면 on으로 체크
// 텝 버튼 초기화
return i=i||"on",$(n).find("li:first").addClass(i),$(n).find(e).off("click").on("click",function(e){e.preventDefault();var t=$(this).parent();
//_this.addClass($activeClass);
return s(t.index(),t),!1}),s(0),{setBtn:function(e){s(e)}}},/**
 * trpGNB					: GNB 메뉴
 * @param $activeClass		: 활성화 class 이름
 * @param $activeFN($index)	: 인덱스리턴함수
 */
jQuery.fn.trpGNB=function(e,t){function i(i){$(s).find("li").removeClass(e),$(s).find(">ul>li").eq(n).addClass(e),t(n,i)}var s=this,n=-1;// activeClass 없으면 on으로 체크
return e=e||"on",$(this).find(">ul >li").on("mouseenter focusin",function(i){var n=$(this);
//clearTimeout(this_li.data('trpGNBMenu'));										// 깜빡임 제거
$(s).find("li").removeClass(e),n.addClass(e);var a=">ul>li."+e;t($(s).find(a).index(),i)}),$(s).on("mouseleave focusout",function(e){i(e)}),{setBtn:function(e){n=e,i({type:"default"})}}},/**
	 * trpGNBactive							: 2뎁스 활성화 gnb
	 * @param		$activeClass			: 활성화 class 이름
	 * @param		$activeFN([,])			: 콜백함수로 인덱스를 배열형태로 리턴
	 * @method		setBtn($index)		: 활성화 인덱스를 넣으면 해당컨텐츠 활성화
*/
jQuery.fn.trpGNBactive=function(e,t){
//  실행
function i(i,s){// 인텍스리턴
if(t(i,s)){// false 값이 넘어오면 아래를 실행하지 않음
if(-1==i)// 1뎁스가 없으면 초기화
return o.find(" li > a").removeClass(e),r.css({display:"none"}),void r.eq(i).find(" li a").removeClass(e);o.find(" li > a").removeClass(e),o.find(" > li").eq(i).find(" > a").addClass(e),r.each(function(e){e==i?r.eq(e).css({display:"block"}):r.eq(e).css({display:"none"})}),-1!=s&&(// 2뎁이 -1이면 없는 걸로
r.eq(i).find(" li a").removeClass(e),r.eq(i).find(" li:eq("+s+") a").addClass(e))}}var s=-1,n=-1,a=this,o=$(a).find(" > ul "),r=$(a).find(" > ul ul");// active/
//   뎁스 2 ul
// activeClass 없으면 on으로 체크
//초기화
// // 이벤트
// over 뎁스1  이벤트
// over 뎁스2  이벤트
// out 뎁스1,2 이벤트
return e=e||"on",r.css({display:"none"}),i(s,n),o.find(" > li > a").on("mouseenter focusin",function(){var e=o.find(" > li > a").index(this);-1!=e&&i(e,-1)}),r.find("a").on("mouseenter focusin",function(){i(r.index($(this).parent().parent()),$(this).parent().parent().find("li a").index(this))}),$(a).on("mouseleave ",function(){i(s,n)}),{setBtn:function(e){// 배열인지를 판단하기위해
e.length?(// 배열
s=e[0],n=e[1]):(// 숫자
s=e,n=-1),i(s,n)}}},//  trpGNBactive
/**
 * trpAccordionMenu				: 아코디언메뉴
 * @param	$btn				    : 버튼 클래스 선택자 이름
 * @param	$cont				    : 컨텐츠 클래스 선택자 이름
 * @param	$activeClass		: 활성화 class 이름
 * @method	setBtn($index): 활성화 인덱스를 넣으면 해당컨텐츠 활성화
 */
jQuery.fn.trpAccordionMenu=function(e,t,i,s){function n(e){if(!(e<0)){// 0 보다 작으면 아무것도 하지 않는다.
if(s){// 인텍스리턴
if(!s(e))return}
//if( $(_this).find(">li").eq($index).hasClass($activeClass) ){ 
if($(r).find(">li[data-index = "+e+"]").hasClass(i))return $(r).find(">li").removeClass(i),$(r).find(t).slideUp(),!1;// 활성화되어있으면 전부 닫침.
$(r).find(">li").removeClass(i),
//$(_this).find(">li").eq($index).addClass($activeClass);
$(r).find(">li[data-index = "+e+"]").addClass(i),$(r).find(t).slideUp(),
//$(_this).find($cont).eq($index).slideDown();
$(r).find(">li[data-index = "+e+"]").find(t).slideDown()}}var a,o=0,r=this;// activeClass 없으면 on으로 체크
return i=i||"on",$(r).find(e).each(function(e){$(this).closest("li").attr("data-index",e)}),$(this).on("click",e,function(e){e.preventDefault(),o=$(this).closest("li").attr("data-index"),n(o),a=o}),{setBtn:function(e){ctive(e)}}},/**
 * trpAccordionOverMenu			: 아코디언 오버형태 메뉴
 * @param	$overAarea			: 오버영역 클래스 선택자 이름
 * @param	$cont				: 컨텐츠 클래스 선택자 이름
 * @param	$activeClass		: 활성화 class 이름
 * @method	setBtn($index)		: 활성화 인덱스를 넣으면 해당컨텐츠 활성화
 */
jQuery.fn.trpAccordionOverMenu=function(e,t,i){function s(s){$(o).find(e).eq(s).hasClass(i)||(// 활성화되어있으면 그냥 넘어간다.
$(o).find(e).removeClass(i),$(o).find(e).eq(s).addClass(i),$(o).find(t).stop().slideUp(),$(o).find(t).eq(s).stop().slideDown())}var n,a=0,o=this;// activeClass 없으면 on으로 체크
return i=i||"on",$(o).find(e).each(function(e){$(this).attr("data-index",e)}),$(this).find(e).on("mouseenter",function(e){clearTimeout(n),s($(this).index())}),$(this).find(e).on("mouseleave",function(e){n=setTimeout(function(){s(a)},500)}),{setBtn:function(e){a=e,s(e)}}},/**
	trpToggleBtn : 토글버튼함수 		//  $(버튼 선택자).trpToggleBtn($trueFn,$falseFn)
	@param	$trueFn			: true  일때 호출되는 함수
	@param	$falseFn		: false 일때 호출되는 함수
	@method toggleAllSet("true"/"false")	: 동일한 형태의 버튼을 "true" 이면 "true" 상태로 "false" 이면 "false" 상태로 만듬
	@method setBtn(index)					: 활성화 인덱스를 넣으면 해당 버튼만 "true" 상태로 바꿈
*/
jQuery.fn.trpToggleBtn=function(e,t){
// 상태에 따른 실행문
function i(i){"true"==i.attr("data-active")?e(i):t(i)}var s,n,a;// 전체 버튼
// 전체 버튼 닫친상태 로
return n=this,$(n).attr("data-active","false"),$(this).on("click",function(e){// 선택 버튼
// 이벤트
// 클랙된것만 열린상태
return s=$(this),a=e,"true"==s.attr("data-active")?s.attr("data-active","false"):s.attr("data-active","true"),i(s),!1}),{toggleAllSet:function(i){n._tb=i,n._tb?e(n):t(n),$(n).attr("data-active",i)},setOneBtn:function(e){$(n).attr("data-active","false"),$(n).eq(e).attr("data-active","true"),$(n).each(function(e){i($(n).eq(e))})},setBtn:function(e){$(n).eq(e).attr("data-active","true"),$(n).each(function(e){i($(n).eq(e))})},reSetBtn:function(e){$(n).eq(e).attr("data-active","false"),$(n).each(function(e){i($(n).eq(e))})}}},/** 
 * trpToggleOverflow                : 토글버튼, 보여질 컨테이너 외부 클릭시 해제
 * @param	$containerSelerter		: 보여질 컨테이너
 * @param   $delay                  : 체크 딜레이 
 * @method  $firstFn                : 처음 실행함수   (실행)
 * @method  $secondFn               : 두번째 싦행함수  (취소) 
 *
 *  var fn_trpToggleOverflow = $(".__gnb_overview_menu").trpToggleOverflow(".__gnb_overview_menu")
 *  $(".btn_overflow_menu").on("click", function () {
 *      fn_trpToggleOverflow.toggle();
 *  });
 * 
 */
jQuery.fn.trpToggleOverflow=function(e,t){
// 닫을때 체크
function i(e){$(document.body).off("click",s),e=e||0;var t=function(){//console.log("닫기")
var e=$(o),t=$(r);e.removeClass("on"),
///wel.siblings("button").attr("aria-expanded", "false");
t.attr("aria-expanded","false"),
///wel.hasClass("on") ? wel.show() : wel.hide();
a()};/Android 4\.0\./g.test(window.navigator.userAgent)?t():setTimeout(t,e)}
//window.__closeOverflowMenu = __closeOverflowMenu;
function s(e){$(e.target).parents(o).length>0||
//console.log("닫침");
i()}var n,a,o=e,r=this;return{toggle:function(e,t){n=e,a=t;var l=l||0,h=function(){var e=$(o),t=$(r);e.toggleClass("on"),e.hasClass("on")?(
///wel.siblings("button").attr("aria-expanded", "true");
t.attr("aria-expanded","true"),
///wel.show();
n(),setTimeout(function(){$(document.body).on("click",s)},0)):i()};/Android 4\.0\./g.test(window.navigator.userAgent)?h():setTimeout(h,l)}}};/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.82 _ ones
 * release date : 2018.09.07
 * author		: http://turfrain.tistory.com/
 * Copyright 2018. turfrain all rights reserved.
 *
 */
/*
 * trpLayerFixedPopup		: 레이어 팝업띄움
 * @param  $tarPopup		: $tarPopup(팝업타겟)
 * @method  open		    : 팝업 띄우기
 * @method  close		    : 팝업 닫기
 * @method  getBtn		    : 팝업 버튼
 */
var trpLayerFixedPopupScroll_top=0;jQuery.fn.trpLayerFixedPopup=function(e){
// 팝업 열기
function t(e){//console.log(">>>  : " + $this);
// 타겟값이 없다면 a태그로 인식해서 href적용
return e?s=e:n=!1,""==o&&(o=$(s).attr("href")),l=o.replace(/\#/g,""),r.addClass(l).css({display:"none"}),$(o).before(r),r.fadeIn(300),$(o).fadeIn(300),1==$(".popupfixed-wrap").filter(":visible").length&&(trpLayerFixedPopupScroll_top=$(window).scrollTop(),$("html, body").scrollTop(0),$(".wrapper").css({position:"fixed",top:-1*trpLayerFixedPopupScroll_top}),$(".wrapper").attr("data-pop","on")),!1}
// 팝업 닫기
function i(e){return 0!=$(".popupfixed-wrap").filter(":visible").length&&($(r).fadeOut(300,function(){r.remove()}),$(o).fadeOut(300,function(){0==$(".popupfixed-wrap").filter(":visible").length&&($(".wrapper").css({position:"relative",top:"0"}),$("html, body").scrollTop(trpLayerFixedPopupScroll_top),$(".wrapper").attr("data-pop","off")),n&&$(s).focus(),void 0!=e&&"function"==typeof e&&// 함수인지 체크해서 호출
e()}),$(o))}var s=this,n=!0,a=!1,o=o=e||"",r=$('<div class="popup-dim"></div>'),l="";return{open:function(e){// 팝업 열기
a||(// false 값일때 열림
a=!0,t(e))},close:function(e){// 팝업 닫기
return a=!1,i(e)},getBtn:s}},// trpLayerFixedPopup
/**
 * trpBgDim			: 딤드 전체 영역, 투명도, 색상
 * @param $opacity  : 투명도(0.3)
 * @param $bgColor  : 배경색(#000)
 * #opacity  : #popup_dim {position: fixed; top: 0; left: 0; width:100%; height:100%; background: #000; opacity: .7; filter: alpha(opacity=70);  z-index:9990;}
 */
jQuery.fn.trpBgDim=function(e,t){
//console.log($(this))
var i,s,n,a,o;
//_docW=$(document).width(); 		// dim 크기
//_docH=$(document).height();		// dim 크기
i="100%",s="100%",n=e||.7,// 투명도
a=100*n,// ie 투명도
o=t||"#000",// 색상
$(this).css({position:"fixed",top:0,left:0,width:i,height:s,opacity:n,"background-color":o,"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity="+a+") !important",filter:"alpha(opacity="+a+") !important"})},/* ie브라우저 검사 */
jQuery.browser={},function(){jQuery.browser.msie=!1,jQuery.browser.version=0,navigator.userAgent.match(/MSIE ([0-9]+)\./)&&(jQuery.browser.msie=!0,jQuery.browser.version=RegExp.$1)}();/* 
 * date : 20141105
 * trpBrowser		: 브라우저 정보를 리턴함.
 * @method name		: 브라우저 이름
 * @method version	: 브라우저 버젼
*/
var trpBrowser=function(){var e,t=navigator.userAgent.toLowerCase();// 오페라
// 크롬
// 사파리					
// ie  
// 웹킷
// 모질라(파이어폭스)
// *ie11버젼 	"msie" 없어짐.
// *사파리
return e=/(opr)[ \/]([\w.]+)/.exec(t)||/(chrome)[ \/]([\w.]+)/.exec(t)||/(version)[ \/]([\w.]+)/.exec(t)||/(msie) ([\w.]+)/.exec(t)||/(appleWebKit)[ \/](\w.]+)/.exec(t)||/(mozilla)(?:.*? rv:([\w.]+))?/.exec(t)||[],navigator.msManipulationViewsEnabled&&(e[1]="msie"),"version"==e[1]&&(e[1]="safari"),{name:e[1]||"",version:e[2]||"0"}}(),trpUtilityChangeOnce_newVal,trpUtilityChangeOnce_oldVal="";/*
  trpUtilityChangeOnceFnFn	    : 함수 한번만 실행
* @param	$functionTrue	    : true 일때 실행되는 함수
* @param	$functionFalse	    : false 일대 실행되는 함수
* @method   setBoolean(boolean)	: true, false 값넘기기
* var onceFn = $("body").trpUtilityChangeOnceFn(function(){console.log("aaa")}, function(){ console.log("bbb")})
* onceFn.change(true);
*/
jQuery.fn.trpUtilityChangeOnceFnFn=function(e,t){function i(i){i?// true 실행;
s&&(// 1번실행;
e(),// console.log("true" , _onlyFnB);
s=!1):// flase 실핼;
s||(// 1번실행;
t(),// console.log("false" , _onlyFnB);
s=!0)}var s=void 0,n=!0;return{setBoolean:function(e){n&&(s=e,n=!1),i(e)}}},/*
* trpRemoveClassPrefix          : 특정문자열로 시작되는 클래스 삭제
* @param	$prefix			    : 특정문자열
*/
jQuery.fn.trpRemoveClassPrefix=function(e){return this.each(function(t,i){var s=i.className.split(" ").filter(function(t){return 0!==t.lastIndexOf(e,0)});i.className=$.trim(s.join(" "))}),this};