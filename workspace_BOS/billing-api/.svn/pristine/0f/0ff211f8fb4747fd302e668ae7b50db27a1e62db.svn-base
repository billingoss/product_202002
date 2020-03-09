package com.api.util;

import java.text.SimpleDateFormat;

/*========================================================
*Copyright(c) 2010 JuWan
*@FileName     : StringUtil.java
*@FileTitle    : 문자관련 유틸
*
*Change history
*@LastModifyDate    :
*@LastModifier      :
*@LastVersion       :
*=========================================================*/

import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class DateUtil {

	/***************************************************************
	* 날짜를 다양한 형태로 리턴한다.
	* @param : String type (Input Value)
	* @return : String type(Output Value) //yyyyMMdd,yyyyMMddHHmmss,yyyy/MM/dd HH:mm:ss,HHmmss
	***************************************************************/
	public static String getDate(String type) throws Exception{
		if (type == null || type.equals("")){
			return "";
		}

		try{
			type = new SimpleDateFormat(type).format(new Date());
		}catch (Exception ex){
			throw new Exception("JspCybus.getDate(\""+type+"\")\r\n"+ex.getMessage());
		}
		return type;
	}

	/***************************************************************
	 * 현재년월을 리턴한다.
	 * @param :
	 * @return : String buf(Output Value) //yyyyMM
	 ***************************************************************/
	public static String getToday(){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        Calendar c1 = Calendar.getInstance();
        String strToday = sdf.format(c1.getTime());		
        return strToday;
	}
	
	/***************************************************************
	* 현재년월을 리턴한다.
	* @param :
	* @return : String buf(Output Value) //yyyyMM
	***************************************************************/
	public static String getYearMonth(){
		String month = "";

		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
        Calendar c1 = Calendar.getInstance();
        month = sdf.format(c1.getTime());		
        
/*		Calendar cal = Calendar.getInstance(Locale.getDefault());

		StringBuffer buf = new StringBuffer();

		buf.append(Integer.toString(cal.get(Calendar.YEAR)));
		month = Integer.toString(cal.get(Calendar.MONTH)+1);
		if(month.length() == 1) month = "0" + month;

		buf.append(month);*/

		return month;
	}

	/***************************************************************
	* 현재연도를 리턴한다.
	* @param :
	* @return : String yyyy(Output Value) //yyyy
	***************************************************************/
	public static String getYear(){
	    String yyyy = getYearMonth();
	    return yyyy.substring(0,4);
	}

	/***************************************************************
	* 현재월을 리턴한다.
	* @param :
	* @return : String mm(Output Value) //mm
	***************************************************************/
	public static String getMonth(){
	    String mm = getYearMonth();
	    return mm.substring(4,6);
	}

	/***************************************************************
	* 해당날짜의 요일을 계산한다.
	* @param : String dateValue(Input Value) //20000225
	* @return : String mm(Output Value) //금 (2000/2/25)
	***************************************************************/
	public static String getDayOfWeek(String dateValue){

		if (dateValue == null || dateValue.equals("")){
			return "";
		}

		dateValue = deleteChar(dateValue);

		int yyyy=0,MM=1,dd=1,day_of_week; // default

		String days[]={"일","월","화","수","목","금","토"};

		try{
			yyyy=Integer.parseInt(dateValue.substring(0,4));
			MM=Integer.parseInt(dateValue.substring(4,6));
			dd=Integer.parseInt(dateValue.substring(6,8));
		}catch (Exception ex){
			// do nothing
		}

		Calendar cal=Calendar.getInstance();
		cal.set(yyyy,MM-1,dd);
		day_of_week=cal.get(Calendar.DAY_OF_WEEK); //1(일),2(월),3(화),4(수),5(목),6(금),7(토)

		return days[day_of_week-1];
	}

	/**********************************************************
	* 입력된 문자열에서 숫자만을 리턴한다.
	* @param : String str(Input Value)
	* @return : int reLength(Output Value)
	**********************************************************/
	public static String deleteChar(String str){
		String strNumber = "0123456789";
		String addString = "";
		if (str.length() > 0 ) {
			for(int i=0; i<str.length();i++){
				if( strNumber.indexOf(str.charAt(i))>= 0){
					addString = addString + str.charAt(i);
				}
			}
		}
		return addString;
	}

	/**********************************************************
	* 두 시간의 차이를 분으로 계산한다.
	* @param : String s_start(Input Value)
	* @param : String s_end(Input Value)
	* @return : int l_gap(Output Value)
	**********************************************************/
	public static int getMinuteDiff(String s_start,String s_end) throws Exception{
		long l_start,l_end,l_gap;
		int i_start_year=0,i_start_month=1,i_start_day=1,i_start_hour=0,i_start_min=0,i_start_sec=0;
		int i_end_year=0,i_end_month=1,i_end_day=1,i_end_hour=0,i_end_min=0,i_end_sec=0;

		try{
			try{
				s_start = deleteChar(s_start);
				i_start_year = Integer.parseInt(s_start.substring(0,4));
				// month 는 Calendar에서 0 base 으로 작동하므로 1 을 빼준다.
				i_start_month= Integer.parseInt(s_start.substring(4,6));
				i_start_day  = Integer.parseInt(s_start.substring(6,8));
				i_start_hour = Integer.parseInt(s_start.substring(8,10));
				i_start_min  = Integer.parseInt(s_start.substring(10,12));
				i_start_sec  = Integer.parseInt(s_start.substring(12,14));
			}catch (IndexOutOfBoundsException ex){
				// ignore
			}
			try{
				s_end = deleteChar(s_end);
				i_end_year = Integer.parseInt(s_end.substring(0,4));
				 // month 는 Calendar 에서0 base 으로 작동하므로 1 을 빼준다.
				i_end_month= Integer.parseInt(s_end.substring(4,6));
				i_end_day  = Integer.parseInt(s_end.substring(6,8));
				i_end_hour = Integer.parseInt(s_end.substring(8,10));
				i_end_min  = Integer.parseInt(s_end.substring(10,12));
				i_end_sec  = Integer.parseInt(s_end.substring(12,14));
			}catch (IndexOutOfBoundsException ex){
				// ignore
			}
		}catch (Exception ex){
			throw new Exception("JspCybus.getMinuteDiff("+s_start+","+s_end+")\r\n"+ex.getMessage());
		}

		Calendar cal=Calendar.getInstance();

		cal.set(i_start_year,i_start_month-1,i_start_day,i_start_hour,i_start_min,i_start_sec);
		l_start=cal.getTime().getTime();

		cal.set(i_end_year,i_end_month-1,i_end_day,i_end_hour,i_end_min,i_end_sec);
		l_end=cal.getTime().getTime();

		l_gap=l_end-l_start;

		return (int)(l_gap/(1000*60));
	}

	/**********************************************************
	* 두 시간의 차이를 초로 계산한다.
	* @param : String s_start(Input Value)
	* @param : String s_end(Input Value)
	* @return : int l_gap(Output Value)
	**********************************************************/
	public static int getSecondDiff(String s_start,String s_end) throws Exception{
		long l_start,l_end,l_gap;

		int i_start_year=0,i_start_month=1,i_start_day=1,i_start_hour=0,i_start_min=0,i_start_sec=0;
		int i_end_year=0,i_end_month=1,i_end_day=1,i_end_hour=0,i_end_min=0,i_end_sec=0;

		try
		{
			try
			{
				s_start = deleteChar(s_start);
				i_start_year = Integer.parseInt(s_start.substring(0,4));
				i_start_month= Integer.parseInt(s_start.substring(4,6)); // month 는 Calendar에서 0 base 으로 작동하므로 1 을 빼준다.
				i_start_day  = Integer.parseInt(s_start.substring(6,8));
				i_start_hour = Integer.parseInt(s_start.substring(8,10));
				i_start_min  = Integer.parseInt(s_start.substring(10,12));
				i_start_sec  = Integer.parseInt(s_start.substring(12,14));
			}
			catch (IndexOutOfBoundsException ex)
			{
				// ignore
			}

			try
			{
				s_end = deleteChar(s_end);
				i_end_year = Integer.parseInt(s_end.substring(0,4));
				i_end_month= Integer.parseInt(s_end.substring(4,6)); // month 는 Calendar 에서0 base 으로 작동하므로 1 을 빼준다.
				i_end_day  = Integer.parseInt(s_end.substring(6,8));
				i_end_hour = Integer.parseInt(s_end.substring(8,10));
				i_end_min  = Integer.parseInt(s_end.substring(10,12));
				i_end_sec  = Integer.parseInt(s_end.substring(12,14));
			}
			catch (IndexOutOfBoundsException ex)
			{
				// ignore
			}
		}
		catch (Exception ex)
		{
			throw new Exception("JspCybus.getSecondDiff("+s_start+","+s_end+")\r\n"+ex.getMessage());
		}

		Calendar cal=Calendar.getInstance();

		cal.set(i_start_year,i_start_month-1,i_start_day,i_start_hour,i_start_min,i_start_sec);
		l_start=cal.getTime().getTime();

		cal.set(i_end_year,i_end_month-1,i_end_day,i_end_hour,i_end_min,i_end_sec);
		l_end=cal.getTime().getTime();

		l_gap=l_end-l_start;

		return (int)(l_gap/1000);
	}
	
	/**********************************************************
	* 일짜 차이의 일수 flag : d , 월 차이의 달수 구함 flag : m
	* @param : String firstdate(Input Value) //20010101
	* @param : String lastdate(Input Value) //20010101
	* @return : int returnValue(Output Value)
	**********************************************************/
	public static int dateDiff(String flag, String firstdate, String lastdate) throws Exception{
		int returnValue = 0;
		long temp = 0;
		int year=0,month=0,day=0,year1=0,month1=0,day1=0;
		int year2 = 0, month2 = 0;

		try{
			
			firstdate = deleteChar(firstdate);
			
			year  = Integer.parseInt(firstdate.substring(0,4));
			month = Integer.parseInt(firstdate.substring(4,6));
			day   = Integer.parseInt(firstdate.substring(6,8));
			
			lastdate = deleteChar(lastdate);
			
			year1  = Integer.parseInt(lastdate.substring(0,4));
			month1 = Integer.parseInt(lastdate.substring(4,6));
			day1   = Integer.parseInt(lastdate.substring(6,8));

			if (flag.equals("d")) {		// 일자의 차이
				TimeZone tz = TimeZone.getTimeZone("Asia/Seoul");
				Calendar cal=Calendar.getInstance(tz);

				cal.set((year-1900),(month-1),day);

				Calendar cal2=Calendar.getInstance(tz);
				cal2.set((year1-1900),(month1-1),day1);

				java.util.Date temp1 = cal.getTime();
				java.util.Date temp2 = cal2.getTime();

				temp = temp2.getTime() - temp1.getTime();

				if ( ( temp % 10 ) < 5 ){				//  1의 자리에서 반올림하는 로직
					temp = temp - ( temp % 10 );
				}else{
					temp = temp + ( 10 - ( temp % 10 ) );
				}

				returnValue = (int)( temp / ( 1000 * 60 * 60 * 24 ) );	//  millisecond를... "일" ( Day )로.. 변환
			}else{			// 월의 차이
				year2  = (year - year1) * 12;
				month2 = month - month1;
				returnValue = year2 + month2;
			}
		}catch (Exception ex){
			ex.printStackTrace();
		}

		return returnValue;
	}

	/**********************************************************
	* 예정일자 다음달 + @ 일 구함
	* @param : String firstdate(Input Value) //20010101
	* @param : int day(Input Value) //day
	* @return : int returnValue(Output Value)
	**********************************************************/
	public static String reserveDate(String rday,int day){
		String sReturn = "";
		int returnValue = 0;
		long temp = 0;
		int year=0,month=0;
		
		try {
			year  = Integer.parseInt(rday.substring(0,4));
			month = Integer.parseInt(rday.substring(4,6));
			
			if(month == 12){
				year = year +1;
				month = 1;
				sReturn = ""+year+"0"+month+""+day;
			}else{
				month = month +1;
				if(month <10){
					sReturn = ""+year+"0"+month+""+day;
				}else{
					sReturn = ""+year+""+month+""+day;
				}
			}
		}
		catch (Exception ex)
		{
			ex.printStackTrace();
		}

		return sReturn;
	}
	
	/**********************************************************
	* 현재일자에서 + 일자 구하기
	* @param : int day(Input Value) //day
	* @return : String buf(Output Value)
	**********************************************************/
	public static String getAddDate(String flag, String c_Date, int amount )
	{
	    Calendar cal = Calendar.getInstance(Locale.getDefault());	    
	    if (c_Date != null && !"".equals(c_Date)) {
	    	cal.set(Integer.parseInt(c_Date.substring(0,4)),Integer.parseInt(c_Date.substring(4,6))-1,Integer.parseInt(c_Date.substring(6,8)));
	    }
	    
	    switch (flag) {
		case "D":	//일자 add
			cal.add(Calendar.DATE, amount);			
			break;
		case "M":	//일자 add
			cal.add(Calendar.MONTH, amount);			
			break;
		case "Y":	//일자 add
			cal.add(Calendar.YEAR, amount);			
			break;
		default:
			cal.add(Calendar.DATE, amount);			
			break;
		}
	    StringBuffer buf = new StringBuffer();
	    buf.append(Integer.toString(cal.get(1)));
	    String month = Integer.toString(cal.get(2) + 1);
	    if(month.length() == 1)
	        month = "0" + month;
	    String day = Integer.toString(cal.get(5));
	    if(day.length() == 1)
	        day = "0" + day;
	    buf.append(month);
	    buf.append(day);
	    return buf.toString();
	}
	
	/**********************************************************
	* 날짜 add
	* @param : int day(Input Value) //day
	* @return : String buf(Output Value)
	**********************************************************/
	public static String getAddDay(String c_Date, int amount) {
		return getAddDate("D", c_Date, amount);
				
	}
	
	/**********************************************************
	* 원하는 날짜의 월 구하기. 한달 뒤 날짜 구하기
	* @param : String c_Date(Input Value) //yyyymmdd
	* @param : int w(Input Value) //+1,-1 ..
	* @return : String buf(Output Value)
	**********************************************************/
	public static String wDate(String c_Date, int w)
	{
		String wdate="";
		c_Date = deleteChar(c_Date);
		java.util.Calendar calen = java.util.Calendar.getInstance();

		try{
			calen.set(Integer.parseInt(c_Date.substring(0,4)),Integer.parseInt(c_Date.substring(4,6))-1,Integer.parseInt(c_Date.substring(6,8)));
			//calen.set(Integer.parseInt(c_Date.substring(0,4)),Integer.parseInt(c_Date.substring(5,7))-1,Integer.parseInt(c_Date.substring(8,10)));

			calen.add(Calendar.MONTH,w );

			String year = String.valueOf(calen.get(java.util.Calendar.YEAR));
			String month = String.valueOf(calen.get(java.util.Calendar.MONTH) + 1);
			String day = String.valueOf(calen.get(java.util.Calendar.DATE));

			if(Integer.parseInt(month)<10){
				month="0"+month;
			}
			if(Integer.parseInt(day)<10){
				day="0"+day;
			}

			//wdate=year+"-"+month+"-"+day;
			wdate=year+month+day;

		}catch(Exception ex){
			System.out.println(ex.getMessage());
		}
		 return wdate;
	}
	
	/**********************************************************
	* (0 = Sunday, 1 = Monday, 2 =  Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday)
	* 특정일(yyyyMMdd) 에서 주어진 일자만큼 더한 날짜를 계산한다.
	* @param : String s_start(Input Value) //yyyy-mm-dd
	* @param : String s_end(Input Value) //yyyy-mm-dd
	* @return : String time(Output Value)
	**********************************************************/
	public static String getRelativeDate(String date, int rday) throws Exception{
		if (date == null){
			return null;
		}

		if (date.length() < 8 ){
			return ""; // 최소 8 자리
		}

		String time = "";

		try{
			TimeZone kst = TimeZone.getTimeZone("JST");
			TimeZone.setDefault(kst);
			Calendar cal = Calendar.getInstance(kst); // 현재

			int yyyy = Integer.parseInt(date.substring(0,4));
			int mm = Integer.parseInt(date.substring(4,6));
			int dd = Integer.parseInt(date.substring(6,8));

			cal.set(yyyy,mm-1,dd);   // 카렌더를 주어진 date 로 세팅하고
			cal.add (cal.DATE, rday); // 그 날자에서 주어진 rday 만큼 더한다.

			time = new SimpleDateFormat("yyyyMMdd").format(cal.getTime());
		}catch (Exception ex){
			throw new Exception("JspCybus.getRelativeDate(\""+date+"\","+rday+")\r\n"+ex.getMessage());
		}
		return time;
	}
	
	/**********************************************************
	* 입력받은 일자의 차이를 시분초로 계산한다.
	* 예) getSecondDiff("20000302102000","20000302102130") --> 60
	* @param : String s_start(Input Value) //yyyy-mm-dd
	* @param : String s_end(Input Value) //yyyy-mm-dd
	* @return : String time(Output Value)
	**********************************************************/
	public static String getTimeDiff(String s_start,String s_end) throws Exception{

		long l_start,l_end,l_gap;
		String time = "";

		int i_start_year=0,i_start_month=1,i_start_day=1,i_start_hour=0,i_start_min=0,i_start_sec=0;
		int i_end_year=0,i_end_month=1,i_end_day=1,i_end_hour=0,i_end_min=0,i_end_sec=0;

		try
		{
			try
			{
				s_start = deleteChar(s_start);
				i_start_year = Integer.parseInt(s_start.substring(0,4));
				i_start_month= Integer.parseInt(s_start.substring(4,6)); // month 는 Calendar에서 0 base 으로 작동하므로 1 을 빼준다.
				i_start_day  = Integer.parseInt(s_start.substring(6,8));
				i_start_hour = Integer.parseInt(s_start.substring(8,10));
				i_start_min  = Integer.parseInt(s_start.substring(10,12));
				i_start_sec  = Integer.parseInt(s_start.substring(12,14));
			}
			catch (IndexOutOfBoundsException ex)
			{
				// ignore
			}

			try
			{
				s_end = deleteChar(s_end);
				i_end_year = Integer.parseInt(s_end.substring(0,4));
				i_end_month= Integer.parseInt(s_end.substring(4,6)); // month 는 Calendar 에서0 base 으로 작동하므로 1 을 빼준다.
				i_end_day  = Integer.parseInt(s_end.substring(6,8));
				i_end_hour = Integer.parseInt(s_end.substring(8,10));
				i_end_min  = Integer.parseInt(s_end.substring(10,12));
				i_end_sec  = Integer.parseInt(s_end.substring(12,14));
			}
			catch (IndexOutOfBoundsException ex)
			{
				// ignore
			}
		}
		catch (Exception ex)
		{
			throw new Exception("JspCybus.getTimeDiff("+s_start+","+s_end+")\r\n"+ex.getMessage());
		}

		Calendar cal=Calendar.getInstance();

		cal.set(i_start_year,i_start_month-1,i_start_day,i_start_hour,i_start_min,i_start_sec);
		l_start=cal.getTime().getTime();

		cal.set(i_end_year,i_end_month-1,i_end_day,i_end_hour,i_end_min,i_end_sec);
		l_end=cal.getTime().getTime();

		l_gap=l_end-l_start;

		int consultTime = (int)(l_gap/1000);

		int si = consultTime/3600;	//시간 셋팅
		int bun = (consultTime - si * 3600 )/ 60; //분 셋팅
		int cho = consultTime - (si * 3600 + bun * 60);

		if(si != 0 ) {
			time = time + si+ "시간";
		}
		if(bun != 0 ) {
			time = time + bun+"분";
		}
		if(cho !=0) {
			time = time + cho+ "초";
		}

		return time;
	}
	
	/**********************************************************
	* 입력받은 초를 시간/분/초로 변환.
	* @param : String sTime(Input Value)
	* @return : String returnTime(Output Value)
	**********************************************************/
	public static String setTime(String sTime) {
		String returnTime = "";
		if (sTime == null || sTime.equals("0") || sTime.equals("")){
			returnTime = "0";
			return returnTime;
		}
		int time=0, min=0, sec=0;

	  String st = "";
	  String sm = "";
	  String ss = "";

	  time = Integer.parseInt(sTime)/3600;
	  min = Integer.parseInt(sTime)%3600/60;
	  sec = Integer.parseInt(sTime)%3600%60%60;

	  st = String.valueOf(time);
	  sm = String.valueOf(min);
	  ss = String.valueOf(sec);

	  if (st.length() == 1){
	  	st = "0"+st;
	  }

	  if(sm.length() == 1){
	  	sm = "0"+sm;
	  }

	  if(ss.length() == 1){
	  	ss = "0"+ss;
	  }

	  returnTime = st+":"+sm+":"+ss;

	  return returnTime;
	}
}

