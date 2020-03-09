package com.api.util;
 
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
 
/**
 * </p> 엑셀 생성 유틸리티 </p>
 */
public class SXSSFExcelUtil {

    private Logger log = LoggerFactory.getLogger(getClass());
    
    private SXSSFWorkbook workbook;
    private Sheet sheet;
    private Row row;
    private Cell cell;
    private int rowNo = 0;
    private CellStyle headStyle;
    private CellStyle bodyStyle;
    
    public SXSSFExcelUtil() {
        workbook = new SXSSFWorkbook();
    }
    
    public void createSheet(String sheetName) {
    	
    	sheet = workbook.createSheet(sheetName);
    	
    	headStyle = workbook.createCellStyle();

    	headStyle.setBorderTop(BorderStyle.THIN);
    	headStyle.setBorderBottom(BorderStyle.THIN);
    	headStyle.setBorderLeft(BorderStyle.THIN);
    	headStyle.setBorderRight(BorderStyle.THIN);
    	
    	headStyle.setFillForegroundColor(HSSFColorPredefined.GREY_25_PERCENT.getIndex());
    	headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    	
    	headStyle.setAlignment(HorizontalAlignment.CENTER);
    	
    	Font font = workbook.createFont();
    	font.setBold(true);
    	font.setFontName("맑은 고딕");
    	font.setFontHeightInPoints((short)10);
    	headStyle.setFont(font);

    	bodyStyle = workbook.createCellStyle();

    	bodyStyle.setBorderTop(BorderStyle.THIN);
    	bodyStyle.setBorderBottom(BorderStyle.THIN);
    	bodyStyle.setBorderLeft(BorderStyle.THIN);
    	bodyStyle.setBorderRight(BorderStyle.THIN);

    	Font bodyfont = workbook.createFont();
    	bodyfont.setBold(false);
    	bodyfont.setFontName("맑은 고딕");
    	bodyfont.setFontHeightInPoints((short)10);
    	bodyStyle.setFont(bodyfont);
    }

    public void createRow() {
        row = sheet.createRow(rowNo++);
    }
    
    public void setCellValue(String headerYn, int colNo, String value) {
	    cell = row.createCell(colNo);
	    if ("Y".equals(headerYn)) {
	    	cell.setCellStyle(headStyle);
	    } else {
	    	cell.setCellStyle(bodyStyle);
	    }
	    cell.setCellValue(value);
    }
	
    public void write(OutputStream output) {
        try {
            workbook.write(output);
        } catch (IOException e) {
            log.error("엑셀 WRITE중 에러 발생하였습니다.", e);
        } finally {
            if (output != null)
                try {
                    output.close();
                    workbook.close();
                    workbook.dispose();
                } catch (IOException e) {
                    log.error("엑셀 WRITE중 에러 발생하였습니다.", e);
                }
        }
    }
    
    public void write(File file) {
        FileOutputStream fs = null;
        try {
            // File.createTempFile(prefix, suffix);
            fs = new FileOutputStream(file);
            workbook.write(fs);
        } catch (IOException e) {
            log.error("엑셀 WRITE중 에러 발생하였습니다.",e);
        } finally {
            if (fs != null)
                try {
                    fs.close();
                } catch (IOException e) {
                    log.error("엑셀 WRITE중 에러 발생하였습니다.",e);
                }
        }
    }
}