package com.api.batch;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.transaction.annotation.Transactional;

import com.api.model.contract.ContractList;
import com.api.service.ContractListService;
import com.api.util.DateUtil;

//@Component
@Transactional(rollbackFor=Exception.class)
public class ChannelContractChange {
	private Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	private ContractListService contractListService;
	
    @Scheduled(cron = "0 0 10 * * *")
    public void channelContractChange() throws Exception{
        try{

        	log.info("ChanneContractChange Batch Start");
        	
        	String fileName = "btv.txt";
        	String filePath = "D:\\btv\\";
        	String backupPath = "D:\\btv\\back\\";

        	//파일 객체 생성
            File file = new File(filePath + fileName);
            //입력 스트림 생성
            FileReader filereader = new FileReader(file);
            //입력 버퍼 생성
            BufferedReader bufReader = new BufferedReader(filereader);

            ContractList contractList = new ContractList();
            
            String line = "";
            while((line = bufReader.readLine()) != null){
            	contractList.setChannelCustomerNumber(line.substring(0,10).trim());
            	contractList.setChannelOrderNumber(line.substring(10,20).trim());
            	contractList.setChannelProductId(line.substring(20,30).trim());
            	contractList.setChangeType(line.substring(30,50).trim());
            	contractList.setChangeDateTime(line.substring(50,70).trim());
            	contractList.setChannelId("BTV");
            	contractList.setAuditId("ChannelContractChangeBatch");
                
                //채널계약변경 테이블에 insert
                contractListService.insertChannelContractChange(contractList);
            }
            //.readLine()은 끝에 개행문자를 읽지 않는다.
            
            //채널계약변경 테이블 처리여부 처리중 update
            contractListService.updateChannelContractChangeProcess(contractList);
            
            //계약테이블 상태 종료 update
            contractListService.updateContractChannelState(contractList);
            
            //채널계약변경 테이블 처리여부 완료 update
            contractListService.updateChannelContractChangeDone(contractList);
            
            bufReader.close();
            
            //파일 이동
            File moveFile = new File(filePath + fileName);
            moveFile.renameTo(new File(backupPath + fileName + "." + DateUtil.getDate("yyyyMMddHHmmss")));
            
        } catch (FileNotFoundException e) {
            throw e;
        } catch (IOException e){
            throw e;
        } catch (Exception e) {
            throw e;
        } finally {
        	log.info("ChanneContractChange Batch End");
        }
    }

}