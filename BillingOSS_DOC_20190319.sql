-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.3.7-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- openbill 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `openbill` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `openbill`;

create user IF NOT EXISTS 'openbill_dev'@'%' identified by 'billing!Q';
grant all privileges on openbill.* to 'openbill_dev'@'%'; 

-- 테이블 openbill.address 구조 내보내기
CREATE TABLE IF NOT EXISTS `address` (
  `addressid` varchar(50) NOT NULL,
  `zipcode` varchar(50) DEFAULT NULL,
  `baseaddress` varchar(50) DEFAULT NULL,
  `detailaddress` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`addressid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.address:~1,703 rows (대략적) 내보내기
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;

-- 테이블 openbill.addressid_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `addressid_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 openbill.addressid_seq:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `addressid_seq` DISABLE KEYS */;
INSERT INTO `addressid_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(1009000, 1000000, 9999999, 1000000, 1, 1000, 0, 0);
/*!40000 ALTER TABLE `addressid_seq` ENABLE KEYS */;

-- 테이블 openbill.article 구조 내보내기
CREATE TABLE IF NOT EXISTS `article` (
  `articlenum` int(11) NOT NULL AUTO_INCREMENT,
  `articlesubject` varchar(200) DEFAULT NULL,
  `articlecontent` varchar(1000) DEFAULT NULL,
  `writedate` varchar(80) DEFAULT NULL,
  `viewyn` varchar(2) DEFAULT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`articlenum`)
) ENGINE=MyISAM AUTO_INCREMENT=6000042 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.article:1 rows 내보내기
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` (`articlenum`, `articlesubject`, `articlecontent`, `writedate`, `viewyn`, `providernumber`, `auditid`) VALUES
	(6000041, '빌링오픈소스 데모 버젼입니다', '자유롭게 테스트하세요.', '2018-11-15', 'N', 1000000, NULL);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

-- 테이블 openbill.attach_file 구조 내보내기
CREATE TABLE IF NOT EXISTS `attach_file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_name` varchar(260) DEFAULT NULL,
  `save_file_path` varchar(300) DEFAULT NULL,
  `content_type` varchar(100) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `reg_date` timestamp NULL DEFAULT NULL,
  `reg_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.attach_file:~7 rows (대략적) 내보내기
/*!40000 ALTER TABLE `attach_file` DISABLE KEYS */;
/*!40000 ALTER TABLE `attach_file` ENABLE KEYS */;

-- 테이블 openbill.authority 구조 내보내기
CREATE TABLE IF NOT EXISTS `authority` (
  `username` varchar(20) DEFAULT NULL,
  `authority_name` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.authority:~3 rows (대략적) 내보내기
/*!40000 ALTER TABLE `authority` DISABLE KEYS */;
INSERT INTO `authority` (`username`, `authority_name`) VALUES
	('cusonar', 'ADMIN'),
	('cusonar', 'USER'),
	('abc', 'USER');
/*!40000 ALTER TABLE `authority` ENABLE KEYS */;

-- 테이블 openbill.business 구조 내보내기
CREATE TABLE IF NOT EXISTS `business` (
  `businessregistraionnumber` varchar(50) NOT NULL,
  `businessname` varchar(50) DEFAULT NULL,
  `representativename` varchar(50) DEFAULT NULL,
  `residentregistrationnumber` varchar(50) DEFAULT NULL,
  `businessaddressid` varchar(50) DEFAULT NULL,
  `businesstype` varchar(50) DEFAULT NULL,
  `businessitem` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`businessregistraionnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.business:~5 rows (대략적) 내보내기
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
INSERT INTO `business` (`businessregistraionnumber`, `businessname`, `representativename`, `residentregistrationnumber`, `businessaddressid`, `businesstype`, `businessitem`, `auditid`, `auditdatetime`) VALUES
	('6628500197', '닥터노아', '박근우', '', '', '', '', '', '2019-03-04 14:00:01');
/*!40000 ALTER TABLE `business` ENABLE KEYS */;

-- 테이블 openbill.channelcontract 구조 내보내기
CREATE TABLE IF NOT EXISTS `channelcontract` (
  `providernumber` int(11) NOT NULL COMMENT '업체번호',
  `channelid` varchar(50) NOT NULL COMMENT '채널ID',
  `productordernumber` varchar(50) NOT NULL COMMENT '상품주문번호',
  `ordernumber` varchar(50) NOT NULL COMMENT '주문번호',
  `registrationdatetime` varchar(50) DEFAULT NULL COMMENT '등록일시',
  `processstate` varchar(50) DEFAULT NULL COMMENT '처리상태',
  `customername` varchar(50) DEFAULT NULL COMMENT '구매자명',
  `customeremail` varchar(50) DEFAULT NULL COMMENT '주문자 이메일',
  `customerid` varchar(50) DEFAULT NULL COMMENT '구매자ID',
  `customertype` varchar(50) DEFAULT NULL COMMENT '회원구분',
  `sex` varchar(50) DEFAULT NULL COMMENT '성별',
  `deliverycustomername` varchar(50) DEFAULT NULL COMMENT '수취인명',
  `deliveryphonenumber1` varchar(50) DEFAULT NULL COMMENT '수취인연락처1',
  `deliveryphonenumber2` varchar(50) DEFAULT NULL COMMENT '수취인연락처2',
  `deliveryaddress` varchar(100) DEFAULT NULL COMMENT '배송지',
  `customerphonenumber` varchar(50) DEFAULT NULL COMMENT '구매자연락처',
  `deliveryzipcode` varchar(50) DEFAULT NULL COMMENT '우편번호',
  `orderstate` varchar(50) DEFAULT NULL COMMENT '주문상태',
  `orderdetailstate` varchar(50) DEFAULT NULL COMMENT '주문세부상태',
  `ordertype` varchar(50) DEFAULT NULL COMMENT '주문유형',
  `orderaddinfo` varchar(50) DEFAULT NULL COMMENT '주문추가정보',
  `orderdatetime` varchar(50) DEFAULT NULL COMMENT '주문일시',
  `productnumber` varchar(50) DEFAULT NULL COMMENT '상품번호',
  `productname` varchar(500) DEFAULT NULL COMMENT '상품명',
  `optioninfo` varchar(500) DEFAULT NULL COMMENT '옵션정보',
  `quantity` varchar(50) DEFAULT NULL COMMENT '수량',
  `priceamount` varchar(50) DEFAULT NULL COMMENT '상품가격',
  `totalamount` varchar(50) DEFAULT NULL COMMENT '상품별 총 주문금액',
  `addproductname` varchar(50) DEFAULT NULL COMMENT '추가상품',
  `productdescription1` varchar(50) DEFAULT NULL COMMENT '각인 문구 1',
  `productdescription2` varchar(50) DEFAULT NULL COMMENT '각인 문구 2',
  `productdescription3` varchar(50) DEFAULT NULL COMMENT '각인 문구 3',
  `productdescription4` varchar(50) DEFAULT NULL COMMENT '각인 문구 4',
  `productdescription5` varchar(50) DEFAULT NULL COMMENT '각인 문구 5',
  `bigissuequantity` varchar(50) DEFAULT NULL COMMENT '빅이슈권수',
  `paymentdate` varchar(50) DEFAULT NULL COMMENT '결제일',
  `paymentmethod` varchar(50) DEFAULT NULL COMMENT '결제수단',
  `bankname` varchar(50) DEFAULT NULL COMMENT '은행/카드사',
  `cardexpirationdate` varchar(50) DEFAULT NULL COMMENT '카드유효기간',
  `paymentnumber` varchar(50) DEFAULT NULL COMMENT '결제번호',
  `paymentname` varchar(50) DEFAULT NULL COMMENT '결제자명',
  `discountamount` varchar(50) DEFAULT NULL COMMENT '주문 할인액',
  `paymentamount` varchar(50) DEFAULT NULL COMMENT '결제금액',
  `deliverymethod` varchar(50) DEFAULT NULL COMMENT '배송방법',
  `deliverycompany` varchar(50) DEFAULT NULL COMMENT '택배사',
  `trackingnumber` varchar(50) DEFAULT NULL COMMENT '송장번호',
  `deliverydate` varchar(50) DEFAULT NULL COMMENT '발송일',
  `deliverychargetype` varchar(50) DEFAULT NULL COMMENT '배송비 유형',
  `deliverychargeamount` varchar(50) DEFAULT NULL COMMENT '배송비 합계',
  `deliveryremark` varchar(50) DEFAULT NULL COMMENT '배송메세지',
  `enddate` varchar(50) DEFAULT NULL COMMENT '종료일',
  `contractterm` varchar(50) DEFAULT NULL COMMENT '이용기간(월)',
  `deliverycycle` varchar(50) DEFAULT NULL COMMENT '배송주기',
  `deliverycount` varchar(50) DEFAULT NULL COMMENT '배송횟수',
  `deliveryday` varchar(50) DEFAULT NULL COMMENT '배송일',
  `deliverytype` varchar(50) DEFAULT NULL COMMENT '배송유형',
  `totaldeliverycount` varchar(50) DEFAULT NULL COMMENT '전체 발송회차',
  `currentdeliverycount` varchar(50) DEFAULT NULL COMMENT '현재발송회차',
  `remark` varchar(50) DEFAULT NULL COMMENT '메모',
  `etcitem1` varchar(50) DEFAULT NULL COMMENT '기타항목1',
  `etcitem2` varchar(50) DEFAULT NULL COMMENT '기타항목2',
  `etcitem3` varchar(50) DEFAULT NULL COMMENT '기타항목3',
  `etcitem4` varchar(50) DEFAULT NULL COMMENT '기타항목4',
  `etcitem5` varchar(50) DEFAULT NULL COMMENT '기타항목5',
  `etcitem6` varchar(50) DEFAULT NULL COMMENT '기타항목6',
  `etcitem7` varchar(50) DEFAULT NULL COMMENT '기타항목7',
  `etcitem8` varchar(50) DEFAULT NULL COMMENT '기타항목8',
  `etcitem9` varchar(50) DEFAULT NULL COMMENT '기타항목9',
  `etcitem10` varchar(50) DEFAULT NULL COMMENT '기타항목10',
  `etcitem11` varchar(50) DEFAULT NULL COMMENT '기타항목11',
  `etcitem12` varchar(50) DEFAULT NULL COMMENT '기타항목12',
  `etcitem13` varchar(50) DEFAULT NULL COMMENT '기타항목13',
  `etcitem14` varchar(50) DEFAULT NULL COMMENT '기타항목14',
  `etcitem15` varchar(50) DEFAULT NULL COMMENT '기타항목15',
  `etcitem16` varchar(50) DEFAULT NULL COMMENT '기타항목16',
  `etcitem17` varchar(50) DEFAULT NULL COMMENT '기타항목17',
  `etcitem18` varchar(50) DEFAULT NULL COMMENT '기타항목18',
  `etcitem19` varchar(50) DEFAULT NULL COMMENT '기타항목19',
  `etcitem20` varchar(50) DEFAULT NULL COMMENT '기타항목20',
  `etcitem21` varchar(50) DEFAULT NULL COMMENT '기타항목21',
  `etcitem22` varchar(50) DEFAULT NULL COMMENT '기타항목22',
  `etcitem23` varchar(50) DEFAULT NULL COMMENT '기타항목23',
  `etcitem24` varchar(50) DEFAULT NULL COMMENT '기타항목24',
  `etcitem25` varchar(50) DEFAULT NULL COMMENT '기타항목25',
  `etcitem26` varchar(50) DEFAULT NULL COMMENT '기타항목26',
  `etcitem27` varchar(50) DEFAULT NULL COMMENT '기타항목27',
  `etcitem28` varchar(50) DEFAULT NULL COMMENT '기타항목28',
  `etcitem29` varchar(50) DEFAULT NULL COMMENT '기타항목29',
  `etcitem30` varchar(50) DEFAULT NULL COMMENT '기타항목30',
  `etcitem31` varchar(50) DEFAULT NULL COMMENT '기타항목31',
  `etcitem32` varchar(50) DEFAULT NULL COMMENT '기타항목32',
  `etcitem33` varchar(50) DEFAULT NULL COMMENT '기타항목33',
  `etcitem34` varchar(50) DEFAULT NULL COMMENT '기타항목34',
  `etcitem35` varchar(50) DEFAULT NULL COMMENT '기타항목35',
  `etcitem36` varchar(50) DEFAULT NULL COMMENT '기타항목36',
  `etcitem37` varchar(50) DEFAULT NULL COMMENT '기타항목37',
  `etcitem38` varchar(50) DEFAULT NULL COMMENT '기타항목38',
  `etcitem39` varchar(50) DEFAULT NULL COMMENT '기타항목39',
  `etcitem40` varchar(50) DEFAULT NULL COMMENT '기타항목40',
  `etcitem41` varchar(50) DEFAULT NULL COMMENT '기타항목41',
  `etcitem42` varchar(50) DEFAULT NULL COMMENT '기타항목42',
  `etcitem43` varchar(50) DEFAULT NULL COMMENT '기타항목43',
  `etcitem44` varchar(50) DEFAULT NULL COMMENT '기타항목44',
  `etcitem45` varchar(50) DEFAULT NULL COMMENT '기타항목45',
  `etcitem46` varchar(50) DEFAULT NULL COMMENT '기타항목46',
  `etcitem47` varchar(50) DEFAULT NULL COMMENT '기타항목47',
  `etcitem48` varchar(50) DEFAULT NULL COMMENT '기타항목48',
  `etcitem49` varchar(50) DEFAULT NULL COMMENT '기타항목49',
  `etcitem50` varchar(50) DEFAULT NULL COMMENT '기타항목50',
  `auditid` varchar(50) DEFAULT NULL COMMENT '수정자',
  `auditdateitme` date DEFAULT NULL COMMENT '수정일시',
  PRIMARY KEY (`providernumber`,`channelid`,`productordernumber`,`ordernumber`),
  KEY `channelcontract_idx1` (`providernumber`,`registrationdatetime`,`processstate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.channelcontract:~600 rows (대략적) 내보내기
/*!40000 ALTER TABLE `channelcontract` DISABLE KEYS */;
/*!40000 ALTER TABLE `channelcontract` ENABLE KEYS */;

-- 테이블 openbill.codegroup 구조 내보내기
CREATE TABLE IF NOT EXISTS `codegroup` (
  `codegroupid` varchar(50) NOT NULL,
  `codegroupname` varchar(50) DEFAULT NULL,
  `codegroupdescription` varchar(50) DEFAULT NULL,
  `domainid` varchar(50) DEFAULT NULL,
  `codelength` int(11) DEFAULT NULL,
  `supercodegroupid` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`codegroupid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.codegroup:~47 rows (대략적) 내보내기
/*!40000 ALTER TABLE `codegroup` DISABLE KEYS */;
INSERT INTO `codegroup` (`codegroupid`, `codegroupname`, `codegroupdescription`, `domainid`, `codelength`, `supercodegroupid`, `auditid`, `auditdatetime`) VALUES
	('adjustcancleerrorreason', '조정취소불가사유', NULL, NULL, NULL, NULL, NULL, NULL),
	('adjustrequestreasoncode', '조정요청사유코드', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 16:57:51'),
	('adjuststatecode', '조정상태코드', NULL, NULL, NULL, NULL, 'KDH', '2018-08-03 00:19:08'),
	('cardcorporationcode', '카드사', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 17:40:43'),
	('CATEGORY', '상담내용분류', NULL, NULL, NULL, NULL, NULL, '2018-09-06 14:11:11'),
	('CHANNEL', '채널', '채널', '', 7, '', '', '2019-02-28 17:04:24'),
	('CHANNELBIGISSUE', '빅이슈코리아채널', '빅이슈코리아채널', '10000002', 15, 'PROVIDERCHANNEL', '', '2019-03-04 11:24:49'),
	('CHANNELDOCTORNOAH', '닥터노아채널', '닥터노아채널', '10000001', 17, 'PROVIDERCHANNEL', '', '2019-03-04 11:24:49'),
	('CHANNELUPLOADITEM', '채널별업로드항목', '채널별업로드항목', '', 17, '', '', '2019-02-28 17:04:24'),
	('CHARACTERISTIC', '고객특성', NULL, NULL, NULL, NULL, NULL, '2018-09-06 14:11:15'),
	('CONTRACTSTATE', '계약상태', NULL, NULL, NULL, NULL, NULL, '2018-09-06 14:11:17'),
	('coupontypecd', '쿠폰유형', NULL, NULL, NULL, NULL, NULL, '2018-09-19 10:22:44'),
	('couponusetypecd', '쿠폰사용유형', NULL, NULL, NULL, NULL, NULL, '2018-09-19 10:22:42'),
	('CUSTOMERTYPE', '고객유형', NULL, NULL, NULL, NULL, NULL, '2018-09-06 14:11:18'),
	('DELIVERYCHARGETYPE', '배송비유형', '배송비유형', '', 18, '', '', '2019-03-12 15:48:21'),
	('DELIVERYCOMPANY', '배송업체', '배송업체', '', 15, '', '', '2019-02-28 17:04:24'),
	('DELIVERYCYCLE', '배송주기', '배송주기', '', 13, '', '', '2019-03-12 15:48:21'),
	('DELIVERYPRODUCTNAME', '닥터노아이지어드민상품명', '닥터노아이지어드민상품명', '', 19, '', '', '2019-03-19 11:06:38'),
	('DELIVERYSTATE', '배송상태', '배송상태', '', 13, '', '', '2019-03-11 19:04:03'),
	('DELIVERYTYPE', '배송유형', '배송유형', '', 12, '', '', '2019-03-11 19:04:03'),
	('DISCOUNTSTATE', '할인상태', NULL, NULL, NULL, NULL, NULL, '2018-09-06 14:11:20'),
	('DISCOUNTTYPE', '할인유형', NULL, NULL, NULL, NULL, 'TEST', '2018-07-27 17:08:08'),
	('errorreasoncode', '오류사유코드', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 17:08:01'),
	('INBOUNDPATH', '상담경로', NULL, NULL, NULL, NULL, NULL, '2018-09-06 14:11:24'),
	('invoiceclassificationcode', '청구구분코드', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 16:58:10'),
	('invoicecycle', '청구주기', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 16:57:51'),
	('ONETIMEFEETYPE', '일회성요금유형', NULL, NULL, NULL, NULL, 'TEST', '2018-07-27 17:08:10'),
	('paymentmethodcode', '수납방법코드', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 17:01:07'),
	('paymentstatecode', '결제상태코드', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 16:57:50'),
	('paymenttypecode', '수납유형코드', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 17:00:44'),
	('PRODUCTSTATE', '상품상태', NULL, NULL, NULL, NULL, NULL, '2018-09-19 10:22:45'),
	('PRODUCTTYPE', '상품유형', NULL, NULL, NULL, NULL, 'TEST', '2018-07-27 17:08:11'),
	('PROVIDERCHANNEL', '업체별채널', '업체별채널', '', 15, '', '', '2019-03-04 11:24:49'),
	('refundreasoncode', '환불사유코드', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 17:08:18'),
	('revenuetypecode', '매출유형코드', NULL, NULL, NULL, NULL, '강현구', '2018-08-01 17:01:25'),
	('SEXTYPE', '성별', NULL, NULL, NULL, NULL, NULL, '2018-09-06 14:11:30'),
	('SUSPENDREASON', '정지사유', 'contract 테이블의 정지사유', NULL, NULL, NULL, 'TEST', '2018-07-27 17:08:12'),
	('TERMINATIONREASON', '해지사유', 'contract 테이블의 해지사유', NULL, NULL, NULL, 'TEST', '2018-07-27 17:08:13'),
	('UPLOADITEM29CM', '업로드항목29cm', '업로드항목29cm', '29CM', 14, 'CHANNELUPLOADITEM', '', '2019-02-28 17:04:24'),
	('UPLOADITEMHAGO', '업로드항목고도몰', '업로드항목고도몰', 'HAGO', 14, 'CHANNELUPLOADITEM', '', '2019-02-28 17:04:24'),
	('UPLOADITEMHAGO2', '업로드항목고도몰(빅이슈)', '업로드항목고도몰(빅이슈)', 'HAGO', 15, 'CHANNELUPLOADITEM', '', '2019-03-08 14:26:52'),
	('UPLOADITEMHANDAILIVART', '업로드항목현대리바트', '업로드항목현대리바트', 'HANDAILIVART', 22, 'CHANNELUPLOADITEM', '', '2019-02-28 17:04:24'),
	('UPLOADITEMHAPPYNARAE', '업로드항목행복나래', '업로드항목행복나래', 'HAPPYNARAE', 20, 'CHANNELUPLOADITEM', '', '2019-02-28 17:04:24'),
	('UPLOADITEMIDUS', '업로드항목아이디어스', '업로드항목아이디어스', 'IDUS', 14, 'CHANNELUPLOADITEM', '', '2019-02-28 17:04:24'),
	('UPLOADITEMNAVERPAY', '업로드항목네이버페이', '업로드항목네이버페이', 'NAVERPAY', 18, 'CHANNELUPLOADITEM', '', '2019-02-28 17:04:24'),
	('UPLOADITEMREGULARDELIVERY', '업로드항목정기배송', '업로드항목정기배송', 'REGULARDELIVERY', 25, 'CHANNELUPLOADITEM', '', '2019-03-08 14:26:52'),
	('UPLOADITEMSIXSHOP', '업로드항목식스샵', '업로드항목식스샵', 'SIXSHOP', 17, 'CHANNELUPLOADITEM', '', '2019-02-28 17:04:24'),
	('UPLOADITEMTHEMAGAZINE', '업로드항목더매거진', '업로드항목더매거진', 'THEMAGAZINE', 21, 'CHANNELUPLOADITEM', '', '2019-03-08 14:26:52');
/*!40000 ALTER TABLE `codegroup` ENABLE KEYS */;

-- 테이블 openbill.codegroupdetail 구조 내보내기
CREATE TABLE IF NOT EXISTS `codegroupdetail` (
  `codegroupid` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `codename` varchar(50) DEFAULT NULL,
  `codedescription` varchar(50) DEFAULT NULL,
  `sortingorder` int(11) DEFAULT NULL,
  `effectstartdatetime` varchar(50) DEFAULT NULL,
  `effectenddatetime` varchar(50) DEFAULT NULL,
  `subcodegroupid` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`codegroupid`,`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.codegroupdetail:~438 rows (대략적) 내보내기
/*!40000 ALTER TABLE `codegroupdetail` DISABLE KEYS */;
INSERT INTO `codegroupdetail` (`codegroupid`, `code`, `codename`, `codedescription`, `sortingorder`, `effectstartdatetime`, `effectenddatetime`, `subcodegroupid`, `auditid`, `auditdatetime`) VALUES
	('adjusstrequetreasoncode', '9999', '기타', NULL, 4, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:16:05'),
	('adjustcancleerrorreason', '00', '조정취소가능', NULL, NULL, '20180701', '99991231', NULL, '김도희', '2018-08-06 14:15:37'),
	('adjustcancleerrorreason', '01', '수납완료되어 조정처리 불가', NULL, NULL, '20180701', '99991231', NULL, '김도희', '2018-08-06 14:15:39'),
	('adjustcancleerrorreason', '02', '조정내역과 청구내역간 불일치로 조정불가', NULL, NULL, '20180701', '99991231', NULL, '김도희', '2018-08-06 14:15:39'),
	('adjustcancleerrorreason', '03', '조정금액과 청구금액간 불일치로 조정불가', NULL, NULL, '20180701', '99991231', NULL, '김도희', '2018-08-06 14:15:39'),
	('adjustrequestreasoncode', '0001', '단순불만', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:15:16'),
	('adjustrequestreasoncode', '0002', '과다청구', NULL, 2, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:15:39'),
	('adjustrequestreasoncode', '0003', '서비스불만', NULL, 3, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:16:05'),
	('adjustrequestreasoncode', '9999', '기타', NULL, 9, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:16:27'),
	('adjuststatecode', 'APLY', '조정완료', NULL, NULL, '20180701', '99991231', NULL, 'KDH', '2018-08-03 00:20:36'),
	('adjuststatecode', 'CANCLE', '조정취소', NULL, NULL, '20180701', '99991231', NULL, 'KDH', '2018-08-03 00:21:03'),
	('adjuststatecode', 'REQUEST', '조정요청', NULL, NULL, '20180701', '99991231', NULL, 'KDH', '2018-08-03 00:20:07'),
	('cardcorporationcode', '01', '삼성카드', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:41:51'),
	('cardcorporationcode', '06', 'BC카드', NULL, 6, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:41:51'),
	('CATEGORY', 'DELIVERY', '배송문의', NULL, 6, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CATEGORY', 'INVOICE', '결제문의', NULL, 4, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CATEGORY', 'PRODUCT', '상품문의', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CHANNEL', '29CM', '29cm', '29cm', 2, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('CHANNEL', 'HAGO', 'hago(고도몰)', 'hago(고도몰)', 4, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('CHANNEL', 'HANDAILIVART', '현대라바트', '현대라바트', 6, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('CHANNEL', 'HAPPYNARAE', '행복나래', '행복나래', 7, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('CHANNEL', 'IDUS', '아이디어스', '아이디어스', 5, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('CHANNEL', 'NAVERPAY', '네이버페이', '네이버페이', 1, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('CHANNEL', 'REGULARDELIVERY', '정기배송', '정기배송', 8, '20190101', '9991231', '', '', '2019-03-08 14:27:55'),
	('CHANNEL', 'SIXSHOP', '식스샵', '식스샵', 3, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('CHANNEL', 'THEMAGAZINE', '더매거진', '더매거진', 9, '20190101', '9991231', '', '', '2019-03-08 14:27:55'),
	('CHANNELBIGISSUE', 'UPLOADITEMHAGO2', 'hago(고도몰)', 'hago(고도몰)', 2, '20190101', '9991231', '', '', '2019-03-08 14:36:02'),
	('CHANNELBIGISSUE', 'UPLOADITEMNAVERPAY', '네이버페이', '네이버페이', 1, '20190101', '9991231', '', '', '2019-03-08 14:36:02'),
	('CHANNELBIGISSUE', 'UPLOADITEMTHEMAGAZINE', '더매거진', '더매거진', 3, '20190101', '9991231', '', '', '2019-03-08 14:36:02'),
	('CHANNELDOCTORNOAH', 'UPLOADITEM29CM', '29cm', '29cm', 2, '20190101', '9991231', '', '', '2019-03-08 14:29:57'),
	('CHANNELDOCTORNOAH', 'UPLOADITEMHAGO', 'hago(고도몰)', 'hago(고도몰)', 4, '20190101', '9991231', '', '', '2019-03-08 14:29:57'),
	('CHANNELDOCTORNOAH', 'UPLOADITEMNAVERPAY', '네이버페이', '네이버페이', 1, '20190101', '9991231', '', '', '2019-03-08 14:29:57'),
	('CHANNELDOCTORNOAH', 'UPLOADITEMREGULARDELIVERY', '정기배송', '정기배송', 8, '20190101', '9991231', '', '', '2019-03-08 14:29:57'),
	('CHANNELDOCTORNOAH', 'UPLOADITEMSIXSHOP', '식스샵', '식스샵', 3, '20190101', '9991231', '', '', '2019-03-08 14:29:57'),
	('CHARACTERISTIC', 'AGGRESSIVE', '공격적인고객', NULL, 4, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CHARACTERISTIC', 'GENEROUS', '보통고객', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CHARACTERISTIC', 'GENTLE', '신사적고객', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CHARACTERISTIC', 'KIND', '친절한고객', NULL, 3, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CHARACTERISTIC', 'RUDE', '무례한고객', NULL, 5, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CONTRACTSTATE', 'ACTIVATION', '사용중', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CONTRACTSTATE', 'SUSPEND', '정지', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CONTRACTSTATE', 'TERMINATION', '해지', NULL, 3, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('coupontype', 'COUPONCOUNT', '쿠폰횟수형', NULL, 1, '20180901', '99991231', NULL, 'KHG', '2018-09-19 10:20:51'),
	('coupontype', 'COUPONPRICE', '쿠폰금액형', NULL, 1, '20180901', '99991231', NULL, 'KHG', '2018-09-19 10:20:51'),
	('couponusetype', 'DEDUCT', '차감', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-09-19 10:23:33'),
	('couponusetype', 'REGIST', '등록', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-09-19 10:23:33'),
	('CUSTOMERTYPE', 'CORPORATION', '회사', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('CUSTOMERTYPE', 'PERSON', '개인', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('DELIVERYCHARGETYPE', 'DEFERREDPAYMENT', '후불', '주', 3, '20190101', '9991231', '', '', '2019-03-12 15:50:24'),
	('DELIVERYCHARGETYPE', 'FREE', '무료', '주', 3, '20190101', '9991231', '', '', '2019-03-12 15:50:24'),
	('DELIVERYCHARGETYPE', 'PREPAYMENT', '선불', '주', 3, '20190101', '9991231', '', '', '2019-03-12 15:50:24'),
	('DELIVERYCOMPANY', 'EZADMIN', '이지어드민', '이지어드민', 2, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('DELIVERYCOMPANY', 'POSTOFFICE', '우체국', '우체국', 1, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('DELIVERYCYCLE', 'MONTH', '월', NULL, NULL, '20180701', '99991231', NULL, NULL, NULL),
	('DELIVERYCYCLE', 'OTHERMONTH', '격월', '격월', 1, '20190101', '9991231', '', '', '2019-03-12 15:50:24'),
	('DELIVERYCYCLE', 'WEEK', '주', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME1', '대나무', '닥터노아 대나무 칫솔', 1, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME10', '닥터노아 대나무 옻칠 칫솔', '닥터노아 옻칠 칫솔', 10, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME2', '닥터노아 대나무 칫솔 휴대용 세트', '닥터노아 대나무 칫솔 휴대용 세트', 2, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME3', '닥터노아 옻칠 칫솔 휴대용 세트', '닥터노아 옻칠 칫솔 휴대용 세트', 3, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME4', '닥터노아 대나무 칫솔', '닥터노아 대나무 칫솔', 4, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME5', '닥터노아 옻칠 칫솔', '닥터노아 옻칠 칫솔', 5, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME6', '닥터노아 안전한치약 30g', '닥터노아 안전한 치약', 6, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME7', '못생겼지만 가격이 사랑스러운 대나무 칫솔(단품)', '닥터노아 못난이 칫솔', 7, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME8', '닥터노아 대나무 옻칠 칫솔 (단품)', '닥터노아 옻칠 칫솔', 8, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYPRODUCTNAME', 'PRODUCTNAME9', '닥터노아 대나무 옻칠 칫솔 (3set)', '닥터노아 옻칠 칫솔', 9, '20190101', '9991231', '', '', '2019-03-19 11:06:16'),
	('DELIVERYSTATE', 'BEFORE', '배송전', '배송전', 1, '20190101', '9991231', '', '', '2019-03-11 19:04:32'),
	('DELIVERYSTATE', 'CANCEL', '취소', '배송취소', 3, '20190101', '9991231', '', '', '2019-03-11 19:04:32'),
	('DELIVERYSTATE', 'DEFER', '보류', '배송보류', 4, '20190101', '9991231', '', '', '2019-03-11 19:04:32'),
	('DELIVERYSTATE', 'DONE', '완료', '배송완료', 2, '20190101', '9991231', '', '', '2019-03-11 19:04:32'),
	('DELIVERYTYPE', 'PARCEL', '택배', '택배', 2, '20190101', '9991231', '', '', '2019-03-11 19:04:32'),
	('DELIVERYTYPE', 'POST', '우편', '우편', 1, '20190101', '9991231', '', '', '2019-03-11 19:04:32'),
	('DISCOUNTSTATE', 'LEAVE', '종료', NULL, 4, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('DISCOUNTSTATE', 'OPERATION', '적용가능', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('DISCOUNTSTATE', 'SUSPEND', '적용중단', NULL, 3, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('DISCOUNTSTATE', 'WAITING', '할인출시전', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('DISCOUNTTYPE', 'AMOUNT', '정액할인', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('DISCOUNTTYPE', 'DELIVERY', '배송비할인', NULL, 3, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:40'),
	('DISCOUNTTYPE', 'ETC', '기타', NULL, 50, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:39'),
	('DISCOUNTTYPE', 'RATE', '정률할인', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:38'),
	('DISCOUNTTYPE', 'SETUPCOST', '설치비할인', NULL, 4, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:37'),
	('errorreasoncode', '000', '정상', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:34:36'),
	('errorreasoncode', '001', '카드한도초과', NULL, 2, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:35:48'),
	('errorreasoncode', '002', '비밀번호오류', NULL, 3, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:35:48'),
	('errorreasoncode', '003', '생년월일오류', NULL, 4, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:35:48'),
	('errorreasoncode', '999', '기타', NULL, 999, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:35:48'),
	('INBOUNDPATH', 'EMAIL', 'E-mail', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('INBOUNDPATH', 'PHONE', '전화', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('INBOUNDPATH', 'SNS', 'SNS', NULL, 3, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('INBOUNDPATH', 'VISIT', '방문', NULL, 4, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('invoiceclassificationcode', '000', '정기청구분', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:17:14'),
	('invoiceclassificationcode', '006', '조정', NULL, 2, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:17:47'),
	('invoicecycle', 'MONTH', '월', NULL, 1, '20180701', '99991231', NULL, NULL, '2018-08-01 21:17:56'),
	('invoicecycle', 'WEEK', '주', NULL, 2, '20180701', '99991231', NULL, NULL, '2018-08-01 21:17:54'),
	('ONETIMEFEETYPE', 'DELIVERY', '배송비', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:36'),
	('ONETIMEFEETYPE', 'SETUPCOST', '설치비', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:36'),
	('paymentmethodcode', '11PAY', '11pay', NULL, 4, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:21:13'),
	('paymentmethodcode', '11PAYA', '11pay(정기결제)', NULL, 5, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:21:13'),
	('paymentmethodcode', 'BANK', '계좌이체', NULL, 3, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:20:16'),
	('paymentmethodcode', 'CARD', '카드', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:19:20'),
	('paymentmethodcode', 'CASH', '현금', NULL, 2, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:19:53'),
	('paymentmethodcode', 'KAKAOPAY', 'KAKAOPAY', NULL, 6, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:21:13'),
	('paymentmethodcode', 'PAYPAL', 'paypal', NULL, 6, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:21:13'),
	('paymentmethodcode', 'PREPAY', '선납대체', NULL, 7, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:21:13'),
	('paymentstatecode', '0000', '요금생성', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:13:27'),
	('paymentstatecode', '1000', '결제완료', NULL, 2, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:14:17'),
	('paymentstatecode', '2000', '환불처리', NULL, 3, '20180701', '99991231', NULL, NULL, NULL),
	('paymentstatecode', '9999', '결제오류', NULL, 9, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:14:46'),
	('paymenttypecode', 'ERROR', '결제오류', NULL, 3, '20180701', '99991231', NULL, '강현구', NULL),
	('paymenttypecode', 'PAYMENT', '요금수납', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:18:21'),
	('paymenttypecode', 'REFUND', '환불처리', NULL, 2, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:18:45'),
	('PRODUCTSTATE', 'LEAVE', '판매종료', NULL, 4, NULL, NULL, NULL, NULL, NULL),
	('PRODUCTSTATE', 'OPERATION', '판매가능', NULL, 2, NULL, NULL, NULL, NULL, NULL),
	('PRODUCTSTATE', 'SUSPEND', '판매중단', NULL, 3, NULL, NULL, NULL, NULL, NULL),
	('PRODUCTSTATE', 'WAITING', '상품출시전', NULL, 1, NULL, NULL, NULL, NULL, NULL),
	('PRODUCTTYPE', 'COUPONCOUNT', '쿠폰횟수형', NULL, 4, '20180701', '99991231', NULL, NULL, NULL),
	('PRODUCTTYPE', 'COUPONPRICE', '쿠폰금액형', NULL, 3, '20180701', '99991231', NULL, NULL, NULL),
	('PRODUCTTYPE', 'ETC', '기타', NULL, 50, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:34'),
	('PRODUCTTYPE', 'NORMAL', '일반', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:33'),
	('PRODUCTTYPE', 'PACKAGE', '패키지', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:32'),
	('RECURRINGINVOICEYN', 'N', '선납', NULL, NULL, '20180701', '99991231', NULL, 'TEST', '2018-09-06 15:54:32'),
	('RECURRINGINVOICEYN', 'Y', '정기결제', NULL, NULL, '20180701', '99991231', NULL, 'TEST', '2018-09-06 15:53:40'),
	('refundreasoncode', '001', '단순변심', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:37:37'),
	('refundreasoncode', '002', '상품불만', NULL, 2, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:37:37'),
	('refundreasoncode', '003', '카드변경', NULL, 3, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:37:37'),
	('refundreasoncode', '999', '기타', NULL, 999, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:37:37'),
	('revenuetypecode', '001', '상품', NULL, 1, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:31:26'),
	('revenuetypecode', '002', '배송료', NULL, 2, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:31:51'),
	('revenuetypecode', '003', '할인', NULL, 3, '20180701', '99991231', NULL, '강현구', '2018-08-01 17:32:16'),
	('SEXTYPE', 'FEMALE', '여', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('SEXTYPE', 'MALE', '남', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:41'),
	('SUSPENDREASON', 'BUSINESSTRIP', '출장', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:30'),
	('SUSPENDREASON', 'ETC', '기타', NULL, 50, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:28'),
	('SUSPENDREASON', 'TRAVEL', '해외여행', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:26'),
	('TERMINATIONREASON', 'DISSATISFACTION', '서비스불만족', NULL, 1, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:25'),
	('TERMINATIONREASON', 'ETC', '기타', NULL, 50, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:24'),
	('TERMINATIONREASON', 'IMMIGRATION', '이민', NULL, 2, '20180701', '99991231', NULL, 'TEST', '2018-07-27 17:07:22'),
	('UPLOADITEM29CM', 'customername', '주문자명', '주문자명', 5, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'customerphonenumber', '주문자연락처', '주문자연락처', 6, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'deliveryaddress', '배송주소', '배송주소', 11, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'deliverycustomername', '수령자명', '수령자명', 7, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'deliverydate', '출고예정일', '출고예정일', 16, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'deliveryphonenumber1', '수령자연락처', '수령자연락처', 8, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'deliveryphonenumber2', '수령자추가연락처', '수령자추가연락처', 9, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'deliveryremark', '배송유의사항', '배송유의사항', 12, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'deliveryzipcode', '우편번호', '우편번호', 10, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'etcitem1', '판매처', '판매처', 2, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'etcitem2', '출고요청일', '출고요청일', 14, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'etcitem3', '지연사유', '지연사유', 15, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'etcitem4', '브랜드명', '브랜드명', 17, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'etcitem5', '상품코드', '상품코드', 18, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'etcitem6', '업체상품명', '업체상품명', 20, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'etcitem7', '직접입력형 옵션명', '직접입력형 옵션명', 22, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'optioninfo', '옵션명', '옵션명', 21, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'orderdatetime', '주문일', '주문일', 3, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'ordernumber', '주문번호', '주문번호', 1, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'orderstate', '주문상태', '주문상태', 13, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'paymentamount', '총금액', '총금액', 25, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'paymentdate', '결제완료일', '결제완료일', 4, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'productname', '상품명', '상품명', 19, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'quantity', '수량', '수량', 24, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEM29CM', 'totalamount', '판매가', '판매가', 23, '20190101', '9991231', '', '', '2019-03-19 16:33:57'),
	('UPLOADITEMHAGO', 'customeremail', '주문자 e-mail', '주문자 e-mail', 11, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'customername', '주문자 이름', '주문자 이름', 10, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'customerphonenumber', '주문자 핸드폰 번호', '주문자 핸드폰 번호', 13, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'deliveryaddress', '수취인 전체주소', '수취인 전체주소', 21, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'deliverychargeamount', '총 배송 금액', '총 배송 금액', 7, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'deliverycustomername', '수취인 이름', '수취인 이름', 14, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'deliveryphonenumber1', '수취인 핸드폰 번호', '수취인 핸드폰 번호', 16, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'deliveryphonenumber2', '수취인 전화번호', '수취인 전화번호', 15, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'deliveryremark', '주문시 남기는 글', '주문시 남기는 글', 22, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'deliveryzipcode', '수취인 우편번호', '수취인 우편번호', 18, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem1', '주문 채널', '주문 채널', 4, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem10', '총 결제금액(해외상점)', '총 결제금액(해외상점)', 26, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem11', '총 품목금액(해외상점)', '총 품목금액(해외상점)', 27, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem12', '총 배송금액(해외상점)', '총 배송금액(해외상점)', 28, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem13', 'PG승인 금액', 'PG승인 금액', 29, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem2', '총 사은품 정보', '총 사은품 정보', 8, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem3', '주문자 전화번호', '주문자 전화번호', 12, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem4', '수취인 구 우편번호 (6자리)', '수취인 구 우편번호 (6자리)', 17, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem5', '수취인 주소', '수취인 주소', 19, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem6', '수취인 나머지 주소', '수취인 나머지 주소', 20, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem7', '수취인 안심번호', '수취인 안심번호', 23, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem8', '상점구분', '상점구분', 24, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'etcitem9', '주문 상품명(해외상점)', '주문 상품명(해외상점)', 25, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'orderdatetime', '주문일자', '주문일자', 9, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'ordernumber', '주문 번호', '주문 번호', 1, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'paymentamount', '총 결제 금액', '총 결제 금액', 5, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'productname', '주문 상품명', '주문 상품명', 2, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'quantity', '주문 품목 개수', '주문 품목 개수', 3, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO', 'totalamount', '총 품목 금액', '총 품목 금액', 6, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAGO2', 'customeremail', '이메일', '이메일', 6, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'customerid', '주문자아이디', '주문자아이디', 4, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'customername', '주문자명', '주문자명', 3, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'customerphonenumber', '주문자핸드폰', '주문자핸드폰', 8, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'deliveryaddress', '주소', '주소', 16, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'deliverycustomername', '받는분이름', '받는분이름', 9, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'deliverydate', '배송일', '배송일', 27, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'deliveryphonenumber1', '받는분핸드폰', '받는분핸드폰', 11, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'deliveryphonenumber2', '받는분전화번호', '받는분전화번호', 10, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'deliveryremark', '배송메세지', '배송메세지', 19, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'deliveryzipcode', '우편번호', '우편번호', 13, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem1', '주문자전화번호', '주문자전화번호', 7, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem10', '배송완료일', '배송완료일', 29, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem11', '입금자', '입금자', 30, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem2', '받는분안심번호', '받는분안심번호', 12, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem3', '(구)우편번호', '(구)우편번호', 14, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem4', '(새)우편번호', '(새)우편번호', 15, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem5', '(구)지번주소', '(구)지번주소', 17, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem6', '(신)도로명주소', '(신)도로명주소', 18, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem7', '배송코드', '배송코드', 24, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem8', '착불여부', '착불여부', 26, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'etcitem9', '어바웃쿠폰', '어바웃쿠폰', 28, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'orderdatetime', '주문일자', '주문일자', 22, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'ordernumber', '주문번호', '주문번호', 2, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'orderstate', '주문상태', '주문상태', 23, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'paymentamount', '결제금액', '결제금액', 21, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'paymentmethod', '결제수단', '결제수단', 20, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'productname', '상품명', '상품명', 5, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'productordernumber', '번호', '번호', 1, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHAGO2', 'trackingnumber', '송장번호', '송장번호', 25, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMHANDAILIVART', 'customername', '주문자명', '주문자명', 18, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'deliverycustomername', '인수자', '인수자', 19, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'deliverydate', '배송시작일', '배송시작일', 23, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'deliveryphonenumber1', '인수자휴대폰', '인수자휴대폰', 21, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'deliveryphonenumber2', '인수자전화', '인수자전화', 20, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'deliveryremark', '요청사항', '요청사항', 13, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem1', '상점명', '상점명', 2, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem10', '희망배송일', '희망배송일', 24, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem11', '발주접수일', '발주접수일', 25, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem12', '배송완료예정일', '배송완료예정일', 26, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem13', '주문수량', '주문수량', 28, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem14', '조직1', '조직1', 29, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem2', '지역구분', '지역구분', 3, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem3', '모델명', '모델명', 9, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem4', '배송업체', '배송업체', 11, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem5', '주문요청사항', '주문요청사항', 14, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem6', '축하카드문구', '축하카드문구', 15, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem7', '축하카드타입', '축하카드타입', 16, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem8', '공급업체', '공급업체', 17, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'etcitem9', '배송의뢰일', '배송의뢰일', 22, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'optioninfo', '옵션명', '옵션명', 8, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'orderdatetime', '주문일자', '주문일자', 5, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'ordernumber', '주문번호', '주문번호', 4, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'orderstate', '배송상태', '배송상태', 27, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'productname', '상품명', '상품명', 7, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'productnumber', '상품코드', '상품코드', 6, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'productordernumber', '순번', '순번', 1, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'quantity', '실주문수량', '실주문수량', 10, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHANDAILIVART', 'trackingnumber', '운송장번호', '운송장번호', 12, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'customername', '주문자', '주문자', 6, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'deliveryaddress', '배송주소', '배송주소', 17, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'deliverycustomername', '수령자', '수령자', 22, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'deliverymethod', '배송방법', '배송방법', 15, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'deliveryphonenumber1', '휴대폰번호', '휴대폰번호', 21, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'deliveryphonenumber2', '전화번호', '전화번호', 20, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'deliveryzipcode', '우편번호', '우편번호', 19, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem1', '고객사', '고객사', 3, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem10', '전체사유', '전체사유', 24, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem11', '발주시담당자메모', '발주시담당자메모', 27, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem2', '사업장', '사업장', 4, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem3', '부서명', '부서명', 5, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem4', '가맹점', '가맹점', 11, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem5', 'TYPE', 'TYPE', 12, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem6', 'MRO담당자', 'MRO담당자', 14, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem7', '배송요청일', '배송요청일', 16, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem8', '배송예정일', '배송예정일', 18, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'etcitem9', '개별사유', '개별사유', 23, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'orderdatetime', '주문일자', '주문일자', 1, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'ordernumber', '발주번호', '발주번호', 2, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'orderstate', '진행상태', '진행상태', 25, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'priceamount', '단가', '단가', 9, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'productname', '품목(규격)/제조사/모델명', '품목(규격)/제조사/모델명', 7, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'productnumber', '상품코드', '상품코드', 13, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'quantity', '수량', '수량', 8, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'totalamount', '금액', '금액', 10, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMHAPPYNARAE', 'trackingnumber', '송장번호', '송장번호', 26, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'customername', '주문자', '주문자', 13, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'customerphonenumber', '주문자 전화번호', '주문자 전화번호', 14, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'deliveryaddress', '주소', '주소', 17, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'deliverychargeamount', '배송비', '배송비', 10, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'deliverycustomername', '받는분', '받는분', 15, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'deliveryphonenumber1', '전화번호', '전화번호', 18, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'deliveryremark', '요청사항', '요청사항', 6, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'deliveryzipcode', '우편번호', '우편번호', 16, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'etcitem1', '회원메모', '회원메모', 7, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'etcitem2', '주문메모', '주문메모', 8, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'etcitem3', '도서산간', '도서산간', 11, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'etcitem4', '후원', '후원', 12, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'optioninfo', '옵션', '옵션', 4, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'ordernumber', '주문번호', '주문번호', 1, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'orderstate', '주문상태', '주문상태', 2, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'paymentamount', '결제금액', '결제금액', 9, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'productname', '작품명', '작품명', 3, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMIDUS', 'quantity', '수량', '수량', 5, '20190101', '9991231', '', '', '2019-02-28 17:06:44'),
	('UPLOADITEMNAVERPAY', 'customerid', '구매자ID', '구매자ID', 9, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'customername', '구매자명', '구매자명', 3, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'customerphonenumber', '구매자연락처', '구매자연락처', 37, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliveryaddress', '배송지', '배송지', 36, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliverychargeamount', '배송비 합계', '배송비 합계', 32, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliverychargetype', '배송비 유형', '배송비 유형', 31, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliverycompany', '택배사', '택배사', 5, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliverycustomername', '수취인명', '수취인명', 10, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliverydate', '발송일', '발송일', 7, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliverymethod', '배송방법', '배송방법', 4, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliveryphonenumber1', '수취인연락처1', '수취인연락처1', 34, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliveryphonenumber2', '수취인연락처2', '수취인연락처2', 35, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliveryremark', '배송메세지', '배송메세지', 39, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'deliveryzipcode', '우편번호', '우편번호', 38, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'discountamount', '주문 할인액', '주문 할인액', 43, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem1', '결제위치', '결제위치', 13, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem10', '송장출력일', '송장출력일', 29, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem11', '배송비 형태', '배송비 형태', 30, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem12', '배송비 할인액', '배송비 할인액', 33, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem13', '몰관리코드', '몰관리코드', 40, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem14', '결제 구분', '결제 구분', 41, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem15', '네이버페이 포인트 결제액', '네이버페이 포인트 결제액', 45, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem16', '(구)체크아웃 적립금 결제액', '(구)체크아웃 적립금 결제액', 46, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem17', '환불정산액 결제액', '환불정산액 결제액', 47, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem18', '매출코드', '매출코드', 48, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem19', '결제수수료', '결제수수료', 49, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem2', '상품종류', '상품종류', 17, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem20', '정산예정금액', '정산예정금액', 50, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem21', '결제번호', '결제번호', 52, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem22', '개인통관고유부호', '개인통관고유부호', 54, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem23', '유입경로', '유입경로', 55, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem24', '판매자 상품코드', '판매자 상품코드', 56, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem25', '옵션관리코드', '옵션관리코드', 57, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem26', '(수취인연락처1)', '(수취인연락처1)', 58, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem27', '(수취인연락처2)', '(수취인연락처2)', 59, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem28', '(우편번호)', '(우편번호)', 60, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem29', '(기본주소)', '(기본주소)', 61, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem3', '옵션코드', '옵션코드', 19, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem30', '(상세주소)', '(상세주소)', 62, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem31', '(구매자연락처)', '(구매자연락처)', 63, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem4', '옵션가격', '옵션가격', 22, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem5', '상품별 할인액', '상품별 할인액', 23, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem6', '가맹점 부담 할인액', '가맹점 부담 할인액', 24, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem7', '발주확인일', '발주확인일', 26, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem8', '발송기한', '발송기한', 27, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'etcitem9', '발송처리일', '발송처리일', 28, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'optioninfo', '옵션정보', '옵션정보', 18, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'orderaddinfo', '주문추가정보', '주문추가정보', 51, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'orderdatetime', '주문일시', '주문일시', 53, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'orderdetailstate', '주문세부상태', '주문세부상태', 12, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'ordernumber', '주문번호', '주문번호', 2, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'orderstate', '주문상태', '주문상태', 11, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'ordertype', '주문유형', '주문유형', 14, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'paymentamount', '일반 결제수단 결제액', '일반 결제수단 결제액', 44, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'paymentdate', '결제일', '결제일', 8, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'paymentmethod', '결제수단', '결제수단', 42, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'priceamount', '상품가격', '상품가격', 21, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'productname', '상품명', '상품명', 16, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'productnumber', '상품번호', '상품번호', 15, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'productordernumber', '상품주문번호', '상품주문번호', 1, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'quantity', '수량', '수량', 20, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'totalamount', '상품별 총 주문금액', '상품별 총 주문금액', 25, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMNAVERPAY', 'trackingnumber', '송장번호', '송장번호', 6, '20190101', '9991231', '', '', '2019-03-08 14:32:03'),
	('UPLOADITEMREGULARDELIVERY', 'addproductname', '추가 상품', '추가 상품', 15, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'bankname', '은행/카드사', '은행/카드사', 25, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'bigissuequantity', '빅이슈 권수', '빅이슈 권수', 14, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'cardexpirationdate', '카드 유효기간 (월/년)', '카드 유효기간 (월/년)', 26, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'currentdeliverycount', '회차', '회차', 20, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'customeremail', '이메일', '이메일', 17, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'customertype', '회원 구분', '회원 구분', 4, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'deliveryaddress', '주소', '주소', 2, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'deliverycustomername', '이름', '이름', 5, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'deliveryday', '발송일', '발송일', 18, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'deliveryphonenumber1', '휴대폰 번호', '휴대폰 번호', 3, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'deliveryremark', '배송 시 요청사항', '배송 시 요청사항', 16, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'deliveryzipcode', '우편번호', '우편번호', 1, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'etcitem1', '최근 발송 날짜', '최근 발송 날짜', 19, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'etcitem2', '결제상태', '결제상태', 23, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'etcitem3', '결제자 휴대폰 번호', '결제자 휴대폰 번호', 29, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'etcitem4', '실명 번호', '실명 번호', 30, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'etcitem5', '입력일', '입력일', 32, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'etcitem6', '탈퇴', '탈퇴', 35, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'optioninfo', '각인여부', '각인여부', 34, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'orderdatetime', '신청일', '신청일', 31, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'paymentamount', '금액', '금액', 21, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'paymentdate', '납부일', '납부일', 22, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'paymentmethod', '납부 방법', '납부 방법', 24, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'paymentname', '결제자명', '결제자명', 27, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'paymentnumber', '결제 번호', '결제 번호', 28, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'productdescription1', '각인 문구 1', '각인 문구 1', 9, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'productdescription2', '각인 문구 2', '각인 문구 2', 10, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'productdescription3', '각인 문구 3', '각인 문구 3', 11, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'productdescription4', '각인 문구 4', '각인 문구 4', 12, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'productdescription5', '각인 문구 5', '각인 문구 5', 13, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'productname', '상품', '상품', 7, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'quantity', '수량', '수량', 8, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'remark', '비고', '비고', 33, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMREGULARDELIVERY', 'sex', '성별', '성별', 6, '20190101', '9991231', '', '', '2019-03-18 19:32:56'),
	('UPLOADITEMSIXSHOP', 'customeremail', '주문자 이메일', '주문자 이메일', 6, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'customerid', '주문자 아이디', '주문자 아이디', 5, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'customername', '주문자 이름', '주문자 이름', 3, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'customerphonenumber', '주문자 휴대폰 번호', '주문자 휴대폰 번호', 4, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'deliveryaddress', '배송지 주소', '배송지 주소', 10, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'deliverychargeamount', '배송비', '배송비', 18, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'deliverycustomername', '배송지 이름', '배송지 이름', 7, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'deliveryphonenumber1', '배송지 휴대폰 번호', '배송지 휴대폰 번호', 8, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'deliveryremark', '배송 시 요청 사항', '배송 시 요청 사항', 13, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'deliveryzipcode', '우편번호', '우편번호', 9, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'discountamount', '총 할인 금액', '총 할인 금액', 24, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem1', '품목명', '품목명', 11, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem10', '상품 부분 취소 전 배송비', '상품 부분 취소 전 배송비', 26, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem11', '상품 부분 취소 전 사용한 적립금', '상품 부분 취소 전 사용한 적립금', 27, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem12', '상품 부분 취소 전 적립될 적립금', '상품 부분 취소 전 적립될 적립금', 28, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem13', '상품 부분 취소 전 쿠폰 할인 금액', '상품 부분 취소 전 쿠폰 할인 금액', 29, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem14', '상품 부분 취소 전 할인 코드 할인 금액', '상품 부분 취소 전 할인 코드 할인 금액', 30, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem15', '상품 부분 취소 전 총 할인 금액', '상품 부분 취소 전 총 할인 금액', 31, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem16', '입금받을 계좌 정보', '입금받을 계좌 정보', 34, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem17', '입금자', '입금자', 35, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem18', '입금 기한', '입금 기한', 36, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem19', '에스크로', '에스크로', 37, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem2', '주문 품목 개수', '주문 품목 개수', 12, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem20', 'PG거래번호', 'PG거래번호', 38, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem21', '환불 계좌', '환불 계좌', 39, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem22', '취소/반품 상품 수량', '취소/반품 상품 수량', 40, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem23', '취소/반품 사유', '취소/반품 사유', 41, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem24', '추가 옵션 정보', '추가 옵션 정보', 46, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem25', '작성형 옵션 정보', '작성형 옵션 정보', 47, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem26', '상품별 결제 금액', '상품별 결제 금액', 48, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem27', '주문 수량과 관계없이 고정된 추가 옵션 추가 금액', '주문 수량과 관계없이 고정된 추가 옵션 추가 금액', 49, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem28', '상품별 주문 상태', '상품별 주문 상태', 50, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem3', '부분 취소 금액', '부분 취소 금액', 15, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem4', '부분 취소 후 잔액', '부분 취소 후 잔액', 16, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem5', '사용한 적립금', '사용한 적립금', 20, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem6', '적립될 적립금', '적립될 적립금', 21, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem7', '쿠폰 할인 금액', '쿠폰 할인 금액', 22, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem8', '할인 코드 할인 금액', '할인 코드 할인 금액', 23, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'etcitem9', '상품 부분 취소 전 상품 합계 금액', '상품 부분 취소 전 상품 합계 금액', 25, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'optioninfo', '상품 옵션 정보', '상품 옵션 정보', 45, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'orderdatetime', '주문 일자', '주문 일자', 32, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'ordernumber', '주문번호', '주문번호', 1, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'orderstate', '주문 상태', '주문 상태', 2, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'paymentamount', '결제 금액', '결제 금액', 14, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'paymentmethod', '결제 방법', '결제 방법', 33, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'productname', '상품 이름', '상품 이름', 42, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'productnumber', '상품 코드', '상품 코드', 43, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'quantity', '수량', '수량', 44, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'remark', '메모', '메모', 51, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'totalamount', '상품 합계 금액', '상품 합계 금액', 17, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMSIXSHOP', 'trackingnumber', '송장번호', '송장번호', 19, '20190101', '9991231', '', '', '2019-03-08 14:33:19'),
	('UPLOADITEMTHEMAGAZINE', 'deliveryaddress', '수령인 주소(전체)', '수령인 주소(전체)', 8, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'deliverycustomername', '수령인', '수령인', 4, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'deliveryphonenumber1', '수령인 휴대전화', '수령인 휴대전화', 5, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'deliveryphonenumber2', '수령인 전화번호', '수령인 전화번호', 6, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'deliveryremark', '배송메시지', '배송메시지', 9, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'deliveryzipcode', '수령인 우편번호', '수령인 우편번호', 7, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'optioninfo', '상품옵션', '상품옵션', 2, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'paymentamount', '상품구매금액', '상품구매금액', 10, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'productname', '주문상품명', '주문상품명', 1, '20190101', '9991231', '', '', '2019-03-08 14:34:07'),
	('UPLOADITEMTHEMAGAZINE', 'quantity', '수량', '수량', 3, '20190101', '9991231', '', '', '2019-03-08 14:34:07');
/*!40000 ALTER TABLE `codegroupdetail` ENABLE KEYS */;

-- 테이블 openbill.contract 구조 내보내기
CREATE TABLE IF NOT EXISTS `contract` (
  `connumber` int(11) NOT NULL AUTO_INCREMENT,
  `customernumber` int(11) DEFAULT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `paymentinformationnumber` int(11) DEFAULT NULL,
  `contractstate` varchar(50) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL COMMENT '가입기간(월기준)',
  `subscribedatetime` varchar(50) DEFAULT NULL COMMENT '가입일자',
  `effectstartdatetime` varchar(50) DEFAULT NULL COMMENT '유효시작일(서비스시작일)',
  `effectenddatetime` varchar(50) DEFAULT NULL COMMENT '유효종료일(서비스종료일)',
  `terminationreason` varchar(50) DEFAULT NULL,
  `suspenddatetime` varchar(50) DEFAULT NULL,
  `suspendreason` varchar(50) DEFAULT NULL,
  `recurringdeliveryyn` varchar(50) DEFAULT NULL,
  `deliverycycle` varchar(50) DEFAULT NULL,
  `deliverytimes` int(11) DEFAULT NULL,
  `deliveryremark` varchar(50) DEFAULT NULL,
  `deliverystartdatetime` varchar(50) DEFAULT NULL COMMENT '최초배송시작일/최초 결제시작일. 유효시작일과 동일값',
  `deliverytotalcount` int(11) DEFAULT NULL COMMENT '총배송횟수',
  `deliveryremaincount` int(11) DEFAULT NULL COMMENT '잔여배송횟수',
  `recurringinvoiceyn` varchar(50) DEFAULT NULL COMMENT 'Y:정기결제 N:선납',
  `invoicecycle` varchar(50) DEFAULT NULL,
  `lastinvoicedatetime` varchar(50) DEFAULT NULL,
  `nextinvoicedatetime` varchar(50) DEFAULT NULL COMMENT '다음청구일자. 처음계약 생성시에는 최초배송시작일과 동일한값, 그 이후에는 요금계산시 마다 다음청구주기에 따라 변경됨',
  `lastchangedatetime` varchar(50) DEFAULT NULL,
  `deliveryday` varchar(50) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `channelid` varchar(50) DEFAULT NULL,
  `channelordernumber` varchar(50) DEFAULT NULL,
  `channelproductordernumber` varchar(50) DEFAULT NULL,
  `registrationdatetime` varchar(50) DEFAULT NULL,
  `deliverycustomernumber` varchar(50) DEFAULT NULL,
  `deliverytype` varchar(50) DEFAULT NULL,
  `deliverycompany` varchar(50) DEFAULT NULL,
  `deliverychargeamount` int(11) DEFAULT NULL,
  `deliverychargetype` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`connumber`),
  KEY `contract_idx1` (`providernumber`,`registrationdatetime`,`channelid`)
) ENGINE=InnoDB AUTO_INCREMENT=51003013 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.contract:~636 rows (대략적) 내보내기
/*!40000 ALTER TABLE `contract` DISABLE KEYS */;
/*!40000 ALTER TABLE `contract` ENABLE KEYS */;

-- 테이블 openbill.contractdiscount 구조 내보내기
CREATE TABLE IF NOT EXISTS `contractdiscount` (
  `connumber` int(11) NOT NULL,
  `discountid` varchar(50) NOT NULL,
  `discounttype` varchar(50) DEFAULT NULL,
  `discountvalue` int(11) DEFAULT NULL,
  `discountorder` int(11) DEFAULT NULL COMMENT '할인순서, 기본적으로 정률적용 후 정액적용함',
  `effectstartdatetime` varchar(50) DEFAULT NULL,
  `effectenddatetime` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`connumber`,`discountid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.contractdiscount:~13 rows (대략적) 내보내기
/*!40000 ALTER TABLE `contractdiscount` DISABLE KEYS */;
/*!40000 ALTER TABLE `contractdiscount` ENABLE KEYS */;

-- 테이블 openbill.contractonetimefee 구조 내보내기
CREATE TABLE IF NOT EXISTS `contractonetimefee` (
  `connumber` int(11) NOT NULL,
  `onetimefeeid` varchar(50) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `effectstartdatetime` varchar(50) DEFAULT NULL,
  `effectenddatetime` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`connumber`,`onetimefeeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.contractonetimefee:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `contractonetimefee` DISABLE KEYS */;
/*!40000 ALTER TABLE `contractonetimefee` ENABLE KEYS */;

-- 테이블 openbill.contractproduct 구조 내보내기
CREATE TABLE IF NOT EXISTS `contractproduct` (
  `connumber` int(11) NOT NULL,
  `productid` varchar(50) NOT NULL,
  `producttype` varchar(50) DEFAULT NULL,
  `packageid` varchar(50) DEFAULT NULL,
  `packagepricereferenceyn` varchar(50) DEFAULT NULL,
  `packagevarietyyn` varchar(50) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `effectstartdatetime` varchar(50) DEFAULT NULL,
  `effectenddatetime` varchar(50) DEFAULT NULL,
  `productname` varchar(500) DEFAULT NULL,
  `productoption` varchar(500) DEFAULT NULL,
  `productdescription1` varchar(100) DEFAULT NULL,
  `productdescription2` varchar(100) DEFAULT NULL,
  `productdescription3` varchar(100) DEFAULT NULL,
  `productdescription4` varchar(100) DEFAULT NULL,
  `productdescription5` varchar(100) DEFAULT NULL,
  `bigissuequantity` varchar(50) DEFAULT NULL,
  `addproductname` varchar(500) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`connumber`,`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.contractproduct:~632 rows (대략적) 내보내기
/*!40000 ALTER TABLE `contractproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `contractproduct` ENABLE KEYS */;

-- 테이블 openbill.counsellinghistory 구조 내보내기
CREATE TABLE IF NOT EXISTS `counsellinghistory` (
  `customernumber` int(11) NOT NULL,
  `counsellingdate` varchar(50) NOT NULL,
  `counsellingtime` varchar(50) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `inboundpath` varchar(50) DEFAULT NULL,
  `memo` varchar(2000) DEFAULT NULL,
  `createuser` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  `invoicenumber` int(11) DEFAULT NULL,
  `invoicedate` varchar(50) DEFAULT NULL,
  `connumber` int(11) DEFAULT NULL,
  `answer` varchar(2000) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`customernumber`,`counsellingdate`,`counsellingtime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.counsellinghistory:~4 rows (대략적) 내보내기
/*!40000 ALTER TABLE `counsellinghistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `counsellinghistory` ENABLE KEYS */;

-- 테이블 openbill.couponbalance 구조 내보내기
CREATE TABLE IF NOT EXISTS `couponbalance` (
  `providernumber` int(11) unsigned NOT NULL,
  `customernumber` int(11) unsigned NOT NULL,
  `coupontype` varchar(50) NOT NULL DEFAULT '',
  `couponbalance` int(11) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`providernumber`,`customernumber`,`coupontype`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- 테이블 데이터 openbill.couponbalance:~4 rows (대략적) 내보내기
/*!40000 ALTER TABLE `couponbalance` DISABLE KEYS */;
/*!40000 ALTER TABLE `couponbalance` ENABLE KEYS */;

-- 테이블 openbill.couponusehistory 구조 내보내기
CREATE TABLE IF NOT EXISTS `couponusehistory` (
  `providernumber` int(11) unsigned NOT NULL,
  `customernumber` int(11) unsigned NOT NULL,
  `coupontype` varchar(50) NOT NULL DEFAULT '',
  `usedatetime` varchar(50) NOT NULL DEFAULT '',
  `couponusetype` varchar(50) DEFAULT NULL,
  `useamount` int(11) DEFAULT NULL,
  `usehistory` varchar(2000) DEFAULT '',
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`providernumber`,`customernumber`,`coupontype`,`usedatetime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='쿠폰사용이력';

-- 테이블 데이터 openbill.couponusehistory:~20 rows (대략적) 내보내기
/*!40000 ALTER TABLE `couponusehistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `couponusehistory` ENABLE KEYS */;

-- 테이블 openbill.customer 구조 내보내기
CREATE TABLE IF NOT EXISTS `customer` (
  `customernumber` int(11) NOT NULL AUTO_INCREMENT,
  `customername` varchar(50) DEFAULT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `sex` varchar(50) DEFAULT NULL,
  `birthday` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phonenumber` varchar(50) DEFAULT NULL,
  `addressid` varchar(50) DEFAULT NULL,
  `deliveryaddressid` varchar(50) DEFAULT NULL,
  `customertype` varchar(50) DEFAULT NULL,
  `createdate` varchar(50) DEFAULT NULL,
  `currentdate` varchar(50) DEFAULT NULL,
  `deletedate` varchar(50) DEFAULT NULL,
  `cellphonenumber` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`customernumber`),
  KEY `customername` (`customername`,`birthday`,`phonenumber`)
) ENGINE=InnoDB AUTO_INCREMENT=31005650 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.customer:~1,206 rows (대략적) 내보내기
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;

-- 테이블 openbill.customercharacteristic 구조 내보내기
CREATE TABLE IF NOT EXISTS `customercharacteristic` (
  `customernumber` int(11) NOT NULL,
  `createdate` varchar(50) NOT NULL,
  `createtime` varchar(50) NOT NULL,
  `characteristic` varchar(50) DEFAULT NULL,
  `memo` varchar(2000) DEFAULT NULL,
  `createuser` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`customernumber`,`createdate`,`createtime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.customercharacteristic:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `customercharacteristic` DISABLE KEYS */;
/*!40000 ALTER TABLE `customercharacteristic` ENABLE KEYS */;

-- 테이블 openbill.deliverychargestandarddata 구조 내보내기
CREATE TABLE IF NOT EXISTS `deliverychargestandarddata` (
  `providerNumber` int(11) NOT NULL,
  `deliveryCompany` varchar(50) CHARACTER SET latin1 NOT NULL,
  `startDate` varchar(50) CHARACTER SET latin1 NOT NULL,
  `endDate` varchar(50) CHARACTER SET latin1 NOT NULL,
  `deliveryChargeAmount` int(11) NOT NULL DEFAULT 0,
  `auditId` varchar(50) CHARACTER SET latin1 NOT NULL,
  `auditDateTime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`providerNumber`,`deliveryCompany`,`startDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.deliverychargestandarddata:~2 rows (대략적) 내보내기
-- /*!40000 ALTER TABLE `deliverychargestandarddata` DISABLE KEYS */;
-- INSERT INTO `deliverychargestandarddata` (`providerNumber`, `deliveryCompany`, `startDate`, `endDate`, `deliveryChargeAmount`, `auditId`, `auditDateTime`) VALUES
-- 	(10000001, 'postoffice', '20190101', '999991231', 0, '', '2019-03-04 11:29:50'),
-- 	(10000002, 'ezadmin', '20190101', '999991231', 0, '', '2019-03-04 11:29:50');
-- /*!40000 ALTER TABLE `deliverychargestandarddata` ENABLE KEYS */;

-- 테이블 openbill.deliverydetail 구조 내보내기
CREATE TABLE IF NOT EXISTS `deliverydetail` (
  `deliverynumber` int(11) NOT NULL AUTO_INCREMENT COMMENT '배송번호, 자동증가',
  `connumber` int(11) DEFAULT NULL,
  `customernumber` int(11) DEFAULT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `invoicenumber` int(11) DEFAULT NULL,
  `invoicedate` varchar(50) DEFAULT NULL,
  `deliverydate` varchar(50) DEFAULT NULL COMMENT '배송일자',
  `deliverystate` varchar(50) DEFAULT NULL COMMENT '배송상태',
  `deliverydatetime` date DEFAULT NULL COMMENT '배송완료일시',
  `deliveryremark` varchar(50) DEFAULT NULL COMMENT '배송관련메모',
  `deliverycustomernumber` varchar(50) DEFAULT NULL,
  `deliverycompany` varchar(50) DEFAULT NULL,
  `deliveryChargeAmount` int(11) DEFAULT NULL,
  `deliverychargetype` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` date DEFAULT NULL,
  PRIMARY KEY (`deliverynumber`),
  KEY `deliverydetail_idx1` (`providernumber`,`deliverydate`,`deliverycompany`)
) ENGINE=InnoDB AUTO_INCREMENT=9034826 DEFAULT CHARSET=utf8 COMMENT='배송상세';

-- 테이블 데이터 openbill.deliverydetail:~6,507 rows (대략적) 내보내기
/*!40000 ALTER TABLE `deliverydetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `deliverydetail` ENABLE KEYS */;

-- 테이블 openbill.discount 구조 내보내기
CREATE TABLE IF NOT EXISTS `discount` (
  `discountid` varchar(50) NOT NULL,
  `discountname` varchar(50) DEFAULT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `discounttype` varchar(50) DEFAULT NULL COMMENT 'rate(정률), amount(정액) 등등',
  `discountstate` varchar(50) DEFAULT NULL,
  `subscribestartdatetime` varchar(50) DEFAULT NULL,
  `subscribeenddatetime` varchar(50) DEFAULT NULL,
  `discountvalue` int(11) DEFAULT NULL,
  `discountorder` int(11) DEFAULT NULL COMMENT '할인순서, 기본적으로 정률적용 후 정액적용함',
  `discountdescription` varchar(50) DEFAULT NULL,
  `beforediscountid` varchar(50) DEFAULT NULL,
  `exposureyn` varchar(50) DEFAULT NULL,
  `lastchangedatetime` varchar(50) DEFAULT NULL,
  `discounttype2` varchar(50) DEFAULT NULL COMMENT '가입기간, 수량, 프로모션기간에 따른 할인유형',
  `discounttype2value` varchar(50) DEFAULT NULL COMMENT '가입기간, 수량 값을 등록',
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`discountid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.discount:~15 rows (대략적) 내보내기
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;

-- 테이블 openbill.discountid_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `discountid_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 openbill.discountid_seq:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `discountid_seq` DISABLE KEYS */;
INSERT INTO `discountid_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(1005000, 1000000, 9999999, 1000000, 1, 1000, 0, 0);
/*!40000 ALTER TABLE `discountid_seq` ENABLE KEYS */;

-- 테이블 openbill.download 구조 내보내기
CREATE TABLE IF NOT EXISTS `download` (
  `attach_id` int(11) NOT NULL,
  `purpose` varchar(200) DEFAULT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `reg_user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.download:~26 rows (대략적) 내보내기
/*!40000 ALTER TABLE `download` DISABLE KEYS */;
/*!40000 ALTER TABLE `download` ENABLE KEYS */;

-- 테이블 openbill.employee 구조 내보내기
CREATE TABLE IF NOT EXISTS `employee` (
  `employeenumber` int(11) NOT NULL AUTO_INCREMENT,
  `employeename` varchar(50) DEFAULT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `organizationnumber` int(11) DEFAULT NULL,
  `effectstartdatetime` varchar(50) DEFAULT NULL,
  `effectenddatetime` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`employeenumber`)
) ENGINE=InnoDB AUTO_INCREMENT=20000007 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.employee:~9 rows (대략적) 내보내기
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` (`employeenumber`, `employeename`, `providernumber`, `organizationnumber`, `effectstartdatetime`, `effectenddatetime`, `auditid`, `auditdatetime`) VALUES
	(20000001, '닥터노아1', 10000001, NULL, '20190101', '99991231', '', '2019-03-19 18:23:03'),
	(20000002, '닥터노아2', 10000002, NULL, '20190101', '99991231', '', '2019-03-19 18:23:03'),
	(20000003, '닥터노아3', 10000001, NULL, '20190101', '99991231', '', '2019-03-19 18:23:03'),
	(20000004, '닥터노아4', 10000002, NULL, '20190101', '99991231', '', '2019-03-19 18:23:03'),
	(20000005, '닥터노아5', 10000002, NULL, '20190101', '99991231', '', '2019-03-19 18:23:03');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;

-- 테이블 openbill.invoice 구조 내보내기
CREATE TABLE IF NOT EXISTS `invoice` (
  `providernumber` int(11) NOT NULL,
  `invoicenumber` int(11) NOT NULL,
  `invoicedate` varchar(50) NOT NULL,
  `connumber` int(11) NOT NULL,
  `prepayyn` varchar(10) NOT NULL DEFAULT 'N',
  `paymentinformationnumber` int(11) NOT NULL,
  `customernumber` int(11) NOT NULL,
  `totalinvoiceamount` int(50) NOT NULL DEFAULT 0,
  `adjustamount` int(50) NOT NULL DEFAULT 0,
  `invoiceamount` int(50) NOT NULL DEFAULT 0,
  `collectionbalanceamount` int(50) NOT NULL DEFAULT 0,
  `collectioncloseyn` varchar(50) NOT NULL DEFAULT 'N',
  `recurringpaymentyn` varchar(50) NOT NULL DEFAULT 'Y',
  `paymentstatecode` varchar(50) NOT NULL DEFAULT '0000',
  `auditid` varchar(50) NOT NULL,
  `auditdatetime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`providernumber`,`invoicenumber`,`invoicedate`,`connumber`,`prepayyn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.invoice:~63 rows (대략적) 내보내기
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;

-- 테이블 openbill.invoiceadjust 구조 내보내기
CREATE TABLE IF NOT EXISTS `invoiceadjust` (
  `providernumber` int(11) NOT NULL,
  `invoicenumber` int(11) NOT NULL,
  `invoicedate` varchar(50) NOT NULL,
  `connumber` int(11) NOT NULL,
  `paymentinformationnumber` int(11) NOT NULL,
  `customernumber` int(11) NOT NULL,
  `revenueitemcode` varchar(50) NOT NULL,
  `adjustdate` varchar(50) NOT NULL,
  `adjustclassificationcode` varchar(50) NOT NULL,
  `adjuststatecode` varchar(50) NOT NULL,
  `adjustamount` int(50) NOT NULL DEFAULT 0,
  `adjustrequestreasoncode` varchar(50) DEFAULT NULL,
  `adjustrequestcontent` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) NOT NULL,
  `auditdatetime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`providernumber`,`invoicenumber`,`invoicedate`,`connumber`,`paymentinformationnumber`,`customernumber`,`revenueitemcode`,`adjustdate`,`adjustclassificationcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.invoiceadjust:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `invoiceadjust` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoiceadjust` ENABLE KEYS */;

-- 테이블 openbill.invoicecalculation 구조 내보내기
CREATE TABLE IF NOT EXISTS `invoicecalculation` (
  `providernumber` int(11) NOT NULL,
  `invoicenumber` int(11) DEFAULT NULL,
  `connumber` int(11) NOT NULL,
  `paymentinformationnumber` int(11) DEFAULT NULL,
  `customernumber` int(11) NOT NULL,
  `prepayyn` varchar(10) NOT NULL DEFAULT 'N',
  `revenueitemcode` varchar(50) NOT NULL,
  `invoiceclassificationcode` varchar(50) NOT NULL,
  `invoicedate` varchar(50) NOT NULL,
  `invoicestartdate` varchar(50) NOT NULL,
  `invoiceenddate` varchar(50) NOT NULL,
  `totinvoiceday` int(11) NOT NULL,
  `invoiceaplyday` int(11) NOT NULL,
  `invoiceamount` int(50) NOT NULL DEFAULT 0,
  `collectionbalanceamount` int(50) NOT NULL DEFAULT 0,
  `auditid` varchar(50) CHARACTER SET latin1 NOT NULL,
  `auditdatetime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`providernumber`,`connumber`,`customernumber`,`revenueitemcode`,`invoiceclassificationcode`,`invoicedate`,`prepayyn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.invoicecalculation:~117 rows (대략적) 내보내기
/*!40000 ALTER TABLE `invoicecalculation` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoicecalculation` ENABLE KEYS */;

-- 테이블 openbill.invoicedetail 구조 내보내기
CREATE TABLE IF NOT EXISTS `invoicedetail` (
  `providernumber` int(11) NOT NULL,
  `invoicenumber` int(11) DEFAULT NULL,
  `invoicedate` varchar(50) NOT NULL,
  `connumber` int(11) NOT NULL,
  `paymentinformationnumber` int(11) NOT NULL,
  `customernumber` int(11) NOT NULL,
  `prepayyn` varchar(10) NOT NULL DEFAULT 'N',
  `revenueitemcode` varchar(50) NOT NULL,
  `invoiceclassificationcode` varchar(50) NOT NULL,
  `invoiceItemamount` int(50) NOT NULL DEFAULT 0,
  `collectionbalanceamount` int(50) NOT NULL DEFAULT 0,
  `auditid` varchar(50) NOT NULL,
  `auditdatetime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`providernumber`,`invoicedate`,`connumber`,`paymentinformationnumber`,`customernumber`,`revenueitemcode`,`invoiceclassificationcode`,`prepayyn`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.invoicedetail:~115 rows (대략적) 내보내기
/*!40000 ALTER TABLE `invoicedetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoicedetail` ENABLE KEYS */;

-- 테이블 openbill.invoicenumber_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `invoicenumber_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 openbill.invoicenumber_seq:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `invoicenumber_seq` DISABLE KEYS */;
INSERT INTO `invoicenumber_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(7004000, 7000000, 7999999, 7000000, 1, 1000, 0, 0);
/*!40000 ALTER TABLE `invoicenumber_seq` ENABLE KEYS */;

-- 테이블 openbill.login 구조 내보내기
CREATE TABLE IF NOT EXISTS `login` (
  `loginid` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `employeenumer` int(11) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `createdate` datetime DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  `isAccountNonExpired` int(11) DEFAULT NULL,
  `isAccountNonLocked` int(11) DEFAULT NULL,
  `isCredentialsNonExpired` int(11) DEFAULT NULL,
  `isEnabled` int(11) DEFAULT NULL,
  PRIMARY KEY (`loginid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.login:~11 rows (대략적) 내보내기
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` (`loginid`, `password`, `employeenumer`, `email`, `createdate`, `auditid`, `auditdatetime`, `isAccountNonExpired`, `isAccountNonLocked`, `isCredentialsNonExpired`, `isEnabled`) VALUES
	('doc1', '$2a$10$43l13m6oYzRIKLqrqVxi.OzBBH9MS6Tgn6dsGu2OuEEPnxMmT5qUa', 20000001, '', '2019-01-01 00:00:00', '', '2019-03-19 18:23:03', 1, 1, 1, 1),
	('doc2', '$2a$10$43l13m6oYzRIKLqrqVxi.OzBBH9MS6Tgn6dsGu2OuEEPnxMmT5qUa', 20000003, '', '2019-01-01 00:00:00', '', '2019-03-19 18:23:03', 1, 1, 1, 1),
	('doc3', '$2a$10$43l13m6oYzRIKLqrqVxi.OzBBH9MS6Tgn6dsGu2OuEEPnxMmT5qUa', 20000003, '', '2019-01-01 00:00:00', '', '2019-03-19 18:23:03', 1, 1, 1, 1),
	('doc4', '$2a$10$43l13m6oYzRIKLqrqVxi.OzBBH9MS6Tgn6dsGu2OuEEPnxMmT5qUa', 20000003, '', '2019-01-01 00:00:00', '', '2019-03-19 18:23:03', 1, 1, 1, 1),
	('doc5', '$2a$10$43l13m6oYzRIKLqrqVxi.OzBBH9MS6Tgn6dsGu2OuEEPnxMmT5qUa', 20000003, '', '2019-01-01 00:00:00', '', '2019-03-19 18:23:03', 1, 1, 1, 1);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;

-- 테이블 openbill.notice 구조 내보내기
CREATE TABLE IF NOT EXISTS `notice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `reg_date` timestamp NULL DEFAULT NULL,
  `reg_user_id` int(11) DEFAULT NULL,
  `read_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.notice:~8 rows (대략적) 내보내기
/*!40000 ALTER TABLE `notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `notice` ENABLE KEYS */;

-- 테이블 openbill.onetimefee 구조 내보내기
CREATE TABLE IF NOT EXISTS `onetimefee` (
  `onetimefeeid` varchar(50) NOT NULL,
  `onetimefeename` varchar(50) DEFAULT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `onetimefeetype` varchar(50) DEFAULT NULL,
  `onetimefeestate` varchar(50) DEFAULT NULL,
  `subscribestartdatetime` varchar(50) DEFAULT NULL,
  `subscribeenddatetime` varchar(50) DEFAULT NULL,
  `priceamount` int(11) DEFAULT NULL,
  `taxobjectyn` varchar(50) DEFAULT NULL,
  `onetimefeedescription` varchar(50) DEFAULT NULL,
  `beforeonetimefeeid` varchar(50) DEFAULT NULL,
  `suspendpriceamount` int(11) DEFAULT NULL,
  `exposureyn` varchar(50) DEFAULT NULL,
  `lastchangedatetime` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`onetimefeeid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.onetimefee:~2 rows (대략적) 내보내기
/*!40000 ALTER TABLE `onetimefee` DISABLE KEYS */;
/*!40000 ALTER TABLE `onetimefee` ENABLE KEYS */;

-- 테이블 openbill.onetimefeeid_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `onetimefeeid_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 openbill.onetimefeeid_seq:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `onetimefeeid_seq` DISABLE KEYS */;
INSERT INTO `onetimefeeid_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(1000000, 1000000, 9999999, 1000000, 1, 1000, 0, 0);
/*!40000 ALTER TABLE `onetimefeeid_seq` ENABLE KEYS */;

-- 테이블 openbill.ordernumber_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `ordernumber_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 openbill.ordernumber_seq:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `ordernumber_seq` DISABLE KEYS */;
INSERT INTO `ordernumber_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(1004000, 1000000, 9999999, 1000000, 1, 1000, 0, 0);
/*!40000 ALTER TABLE `ordernumber_seq` ENABLE KEYS */;

-- 테이블 openbill.organization 구조 내보내기
CREATE TABLE IF NOT EXISTS `organization` (
  `organizationnumber` int(11) NOT NULL AUTO_INCREMENT,
  `organizationname` varchar(50) DEFAULT NULL,
  `superorganizationnumber` int(11) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` int(11) DEFAULT NULL,
  PRIMARY KEY (`organizationnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=4000000 DEFAULT CHARSET=latin1;

-- 테이블 데이터 openbill.organization:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `organization` DISABLE KEYS */;
/*!40000 ALTER TABLE `organization` ENABLE KEYS */;

-- 테이블 openbill.paymenthistory 구조 내보내기
CREATE TABLE IF NOT EXISTS `paymenthistory` (
  `providernumber` int(11) NOT NULL,
  `invoicenumber` int(11) NOT NULL,
  `connumber` int(11) NOT NULL,
  `paymentdatetime` varchar(50) NOT NULL,
  `paymenttypecode` varchar(50) NOT NULL,
  `paymentownername` varchar(50) DEFAULT NULL,
  `paymentamount` int(11) NOT NULL DEFAULT 0,
  `paymentmethodcode` varchar(50) NOT NULL,
  `refundyn` varchar(50) NOT NULL,
  `cardcorporationcode` varchar(50) DEFAULT NULL,
  `cardapprovenumber` varchar(50) DEFAULT NULL,
  `recurringpaymentyn` varchar(50) NOT NULL,
  `errorreasoncode` varchar(50) DEFAULT NULL,
  `refundreasoncode` varchar(50) DEFAULT NULL,
  `etc` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) NOT NULL,
  `auditdatetime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`providernumber`,`invoicenumber`,`connumber`,`paymentdatetime`,`paymenttypecode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.paymenthistory:~25 rows (대략적) 내보내기
/*!40000 ALTER TABLE `paymenthistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymenthistory` ENABLE KEYS */;

-- 테이블 openbill.paymentinformation 구조 내보내기
CREATE TABLE IF NOT EXISTS `paymentinformation` (
  `paymentinformationnumber` int(11) NOT NULL AUTO_INCREMENT,
  `customernumber` int(11) DEFAULT NULL,
  `paymentmethod` varchar(50) DEFAULT NULL,
  `deliveryaddressid` varchar(50) DEFAULT NULL,
  `invoicedeliverytype` varchar(50) DEFAULT NULL,
  `invoiceemail` varchar(50) DEFAULT NULL,
  `invoicephonenumber` varchar(50) DEFAULT NULL,
  `invoiceaddressid` varchar(50) DEFAULT NULL,
  `paymentday` varchar(50) DEFAULT NULL,
  `cardcorporationcode` varchar(50) DEFAULT NULL,
  `cardexpirationdate` varchar(50) DEFAULT NULL,
  `paymentamount` varchar(50) DEFAULT NULL,
  `cardnumber` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`paymentinformationnumber`)
) ENGINE=InnoDB AUTO_INCREMENT=60003054 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.paymentinformation:~647 rows (대략적) 내보내기
/*!40000 ALTER TABLE `paymentinformation` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentinformation` ENABLE KEYS */;

-- 테이블 openbill.paymentstandarddata 구조 내보내기
CREATE TABLE IF NOT EXISTS `paymentstandarddata` (
  `providerNumber` int(11) NOT NULL,
  `standardId` varchar(50) NOT NULL,
  `standardName` varchar(50) NOT NULL,
  `standardValue` varchar(50) NOT NULL,
  `standardValueDetail` varchar(50) DEFAULT NULL,
  `startDate` varchar(50) NOT NULL,
  `endDate` varchar(50) NOT NULL,
  `auditId` varchar(50) NOT NULL,
  `auditDateTime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`providerNumber`,`standardId`,`standardName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.paymentstandarddata:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `paymentstandarddata` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentstandarddata` ENABLE KEYS */;

-- 테이블 openbill.pgpaymentlist 구조 내보내기
CREATE TABLE IF NOT EXISTS `pgpaymentlist` (
  `tid` varchar(200) NOT NULL,
  `providernumber` int(11) NOT NULL,
  `invoicenumber` int(11) NOT NULL,
  `invoicedate` varchar(50) NOT NULL,
  `connumber` int(11) NOT NULL,
  `paymentamount` int(11) NOT NULL DEFAULT 0,
  `auditid` varchar(50) NOT NULL DEFAULT '0',
  `auditdatetime` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.pgpaymentlist:~126 rows (대략적) 내보내기
/*!40000 ALTER TABLE `pgpaymentlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `pgpaymentlist` ENABLE KEYS */;

-- 테이블 openbill.product 구조 내보내기
CREATE TABLE IF NOT EXISTS `product` (
  `productid` varchar(50) NOT NULL,
  `productname` varchar(50) DEFAULT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `producttype` varchar(50) DEFAULT NULL,
  `productstate` varchar(50) DEFAULT NULL,
  `subscribestartdatetime` varchar(50) DEFAULT NULL,
  `subscribeenddatetime` varchar(50) DEFAULT NULL,
  `recurringdeliveryyn` varchar(50) DEFAULT NULL,
  `priceamount` int(11) DEFAULT NULL,
  `taxobjectyn` varchar(50) DEFAULT NULL,
  `packageyn` varchar(50) NOT NULL DEFAULT 'N',
  `packagepricereferenceyn` varchar(50) DEFAULT NULL,
  `packagevarietyyn` varchar(50) DEFAULT NULL,
  `packagepricebandwidth` varchar(50) DEFAULT NULL,
  `productdescription` varchar(50) DEFAULT NULL,
  `beforeproductid` varchar(50) DEFAULT NULL,
  `suspendpriceamount` int(11) DEFAULT NULL,
  `exposureyn` varchar(50) DEFAULT NULL,
  `lastchangedatetime` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.product:~30 rows (대략적) 내보내기
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- 테이블 openbill.productid_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `productid_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 openbill.productid_seq:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `productid_seq` DISABLE KEYS */;
INSERT INTO `productid_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(1006000, 1000000, 9999999, 1000000, 1, 1000, 0, 0);
/*!40000 ALTER TABLE `productid_seq` ENABLE KEYS */;

-- 테이블 openbill.productpackage 구조 내보내기
CREATE TABLE IF NOT EXISTS `productpackage` (
  `packageid` varchar(50) NOT NULL,
  `providernumber` int(11) DEFAULT NULL,
  `mainproductid` varchar(50) NOT NULL,
  `compositionproductid` varchar(50) NOT NULL,
  `effectstartdatetime` varchar(50) DEFAULT NULL,
  `effectenddatetime` varchar(50) DEFAULT NULL,
  `lasthistoryyn` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`packageid`,`mainproductid`,`compositionproductid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.productpackage:~24 rows (대략적) 내보내기
/*!40000 ALTER TABLE `productpackage` DISABLE KEYS */;
/*!40000 ALTER TABLE `productpackage` ENABLE KEYS */;

-- 테이블 openbill.productpackageid_seq 구조 내보내기
CREATE TABLE IF NOT EXISTS `productpackageid_seq` (
  `next_not_cached_value` bigint(21) NOT NULL,
  `minimum_value` bigint(21) NOT NULL,
  `maximum_value` bigint(21) NOT NULL,
  `start_value` bigint(21) NOT NULL COMMENT 'start value when sequences is created or value if RESTART is used',
  `increment` bigint(21) NOT NULL COMMENT 'increment value',
  `cache_size` bigint(21) unsigned NOT NULL,
  `cycle_option` tinyint(1) unsigned NOT NULL COMMENT '0 if no cycles are allowed, 1 if the sequence should begin a new cycle when maximum_value is passed',
  `cycle_count` bigint(21) NOT NULL COMMENT 'How many cycles have been done'
) ENGINE=InnoDB SEQUENCE=1;

-- 테이블 데이터 openbill.productpackageid_seq:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `productpackageid_seq` DISABLE KEYS */;
INSERT INTO `productpackageid_seq` (`next_not_cached_value`, `minimum_value`, `maximum_value`, `start_value`, `increment`, `cache_size`, `cycle_option`, `cycle_count`) VALUES
	(1001000, 1000000, 9999999, 1000000, 1, 1000, 0, 0);
/*!40000 ALTER TABLE `productpackageid_seq` ENABLE KEYS */;

-- 테이블 openbill.provider 구조 내보내기
CREATE TABLE IF NOT EXISTS `provider` (
  `providernumber` int(11) NOT NULL AUTO_INCREMENT,
  `providername` varchar(50) DEFAULT NULL,
  `businessregistrationnumber` varchar(50) DEFAULT NULL,
  `createdate` varchar(50) DEFAULT NULL,
  `currentdate` varchar(50) DEFAULT NULL,
  `deletedate` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`providernumber`)
) ENGINE=InnoDB AUTO_INCREMENT=10000003 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.provider:~5 rows (대략적) 내보내기
/*!40000 ALTER TABLE `provider` DISABLE KEYS */;
INSERT INTO `provider` (`providernumber`, `providername`, `businessregistrationnumber`, `createdate`, `currentdate`, `deletedate`, `auditid`, `auditdatetime`) VALUES
	(10000001, '닥터노아', '6628500197', '20190101', '', '', '', '2019-03-04 11:29:50');
/*!40000 ALTER TABLE `provider` ENABLE KEYS */;

-- 테이블 openbill.qna 구조 내보내기
CREATE TABLE IF NOT EXISTS `qna` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `question` varchar(2000) NOT NULL,
  `answer` varchar(2000) DEFAULT NULL,
  `reg_date` timestamp NULL DEFAULT NULL,
  `reg_user_id` int(11) DEFAULT NULL,
  `upd_date` timestamp NULL DEFAULT NULL,
  `upd_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.qna:~19 rows (대략적) 내보내기
/*!40000 ALTER TABLE `qna` DISABLE KEYS */;
/*!40000 ALTER TABLE `qna` ENABLE KEYS */;

-- 테이블 openbill.salesreport 구조 내보내기
CREATE TABLE IF NOT EXISTS `salesreport` (
  `providernumber` int(11) NOT NULL,
  `standarddate` varchar(50) NOT NULL,
  `revenuetypecode` varchar(50) NOT NULL,
  `revenueitemcode` varchar(50) NOT NULL,
  `revenuecount` int(11) NOT NULL DEFAULT 0,
  `revenueamount` int(11) NOT NULL DEFAULT 0,
  `auditid` varchar(50) NOT NULL,
  `auditdatetime` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`providernumber`,`standarddate`,`revenuetypecode`,`revenueitemcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.salesreport:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `salesreport` DISABLE KEYS */;
/*!40000 ALTER TABLE `salesreport` ENABLE KEYS */;

-- 테이블 openbill.solution 구조 내보내기
CREATE TABLE IF NOT EXISTS `solution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `content` varchar(2000) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `attach_id` int(11) DEFAULT NULL,
  `reg_date` timestamp NULL DEFAULT NULL,
  `reg_user_id` int(11) DEFAULT NULL,
  `upd_date` timestamp NULL DEFAULT NULL,
  `upd_user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.solution:~7 rows (대략적) 내보내기
/*!40000 ALTER TABLE `solution` DISABLE KEYS */;
/*!40000 ALTER TABLE `solution` ENABLE KEYS */;

-- 테이블 openbill.taxbillbusiness 구조 내보내기
CREATE TABLE IF NOT EXISTS `taxbillbusiness` (
  `taxbillbusinessregistrationnumber` varchar(50) NOT NULL,
  `businessname` varchar(50) DEFAULT NULL,
  `representativename` varchar(50) DEFAULT NULL,
  `opendate` varchar(50) DEFAULT NULL,
  `residentregistrationnumber` varchar(50) DEFAULT NULL,
  `businessaddressid` varchar(50) DEFAULT NULL,
  `businesstype` varchar(50) DEFAULT NULL,
  `businessitem` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`taxbillbusinessregistrationnumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.taxbillbusiness:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `taxbillbusiness` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxbillbusiness` ENABLE KEYS */;

-- 테이블 openbill.taxbillbusinesscustomerrelationhistory 구조 내보내기
CREATE TABLE IF NOT EXISTS `taxbillbusinesscustomerrelationhistory` (
  `taxbillbusinessregistrationnumber` varchar(50) NOT NULL,
  `customernumber` int(11) NOT NULL,
  `effectstartdatetime` varchar(50) DEFAULT NULL,
  `effectenddatetime` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`taxbillbusinessregistrationnumber`,`customernumber`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.taxbillbusinesscustomerrelationhistory:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `taxbillbusinesscustomerrelationhistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxbillbusinesscustomerrelationhistory` ENABLE KEYS */;

-- 테이블 openbill.taxbillisuehistory 구조 내보내기
CREATE TABLE IF NOT EXISTS `taxbillisuehistory` (
  `taxbillisuenumber` int(11) NOT NULL AUTO_INCREMENT,
  `taxbillbusinessregistrationnumber` int(11) DEFAULT NULL,
  `taxbillisuedate` varchar(50) DEFAULT NULL,
  `invoicedate` varchar(50) DEFAULT NULL,
  `supplyprice` int(11) DEFAULT NULL,
  `valueaddtaxamount` int(11) DEFAULT NULL,
  `businessaddressid` varchar(50) DEFAULT NULL,
  `supplybusinessnumber` varchar(50) DEFAULT NULL,
  `auditid` varchar(50) DEFAULT NULL,
  `auditdatetime` datetime DEFAULT NULL,
  PRIMARY KEY (`taxbillisuenumber`)
) ENGINE=InnoDB AUTO_INCREMENT=8000000 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.taxbillisuehistory:~0 rows (대략적) 내보내기
/*!40000 ALTER TABLE `taxbillisuehistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxbillisuehistory` ENABLE KEYS */;

-- 테이블 openbill.test_role 구조 내보내기
CREATE TABLE IF NOT EXISTS `test_role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `yn` varchar(1) NOT NULL DEFAULT 'N',
  `role_name` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `regi_date` datetime DEFAULT NULL,
  `upde_date` datetime DEFAULT NULL,
  PRIMARY KEY (`role_id`,`yn`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `test_user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1235 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.test_role:~6 rows (대략적) 내보내기
/*!40000 ALTER TABLE `test_role` DISABLE KEYS */;
INSERT INTO `test_role` (`role_id`, `yn`, `role_name`, `user_id`, `regi_date`, `upde_date`) VALUES
	(3, 'N', 'ADMIN', 6, NULL, NULL),
	(4, 'N', 'ADMIN', 7, NULL, NULL),
	(5, 'N', 'USER', 8, NULL, NULL),
	(6, 'N', 'ADMIN', 10, NULL, NULL),
	(123, 'N', NULL, NULL, NULL, NULL),
	(1234, 'Y', NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `test_role` ENABLE KEYS */;

-- 테이블 openbill.test_user 구조 내보내기
CREATE TABLE IF NOT EXISTS `test_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `login_id` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `regi_date` datetime DEFAULT NULL,
  `upde_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.test_user:~10 rows (대략적) 내보내기
/*!40000 ALTER TABLE `test_user` DISABLE KEYS */;
INSERT INTO `test_user` (`user_id`, `login_id`, `username`, `password`, `email`, `token`, `regi_date`, `upde_date`) VALUES
	(1, '1111', '3333', '$2a$10$zAGvgZMpn/VnNBeDT7KQ5OgPxt371ly/RNF.3Z69PfKDz.Ic4OuSq', 'milse@nate.com', NULL, '2018-08-02 17:29:32', '2018-08-02 17:29:32'),
	(2, '5555', '7777', '$2a$10$eanAQpBvK/sdwOBtidYpdOK5YYrAFe4Lks.eR4sUO7qGpxZrYV3RG', 'nada@nate.com', NULL, '2018-08-02 17:32:36', '2018-08-02 17:32:36'),
	(3, '2323', '2323', '$2a$10$xhqcyLR5GCq8Htzz84x9y.T0lCe0xdPXtVu5mncw8bSnRjyLHVMH2', '23@3', NULL, '2018-08-06 07:29:57', '2018-08-06 07:29:57'),
	(4, 'user1', 'user1', '$2a$10$opiy8CyFOkWat/QsXxKxI.w82njuKGJyJIn1eXrTFwQMp9ijXoAOi', 'user1@na.com', NULL, '2018-08-06 07:30:28', '2018-08-06 07:30:28'),
	(6, 'mangil', '위례건물주', '$2a$10$43l13m6oYzRIKLqrqVxi.OzBBH9MS6Tgn6dsGu2OuEEPnxMmT5qUa', 'mangil@sk.com', NULL, '2018-08-06 09:16:21', '2018-08-06 09:16:21'),
	(7, 'khy', '김헌영', '$2a$10$c.wmp7M4KNvLqUO0un1VA.qFRWSJa9V4Gu.0wuVzCtO/BFq87WyPG', 'shoutkhy@naver.com', NULL, '2018-08-06 09:51:17', '2018-08-06 09:51:17'),
	(8, 'khy1', '김헌영_User', '$2a$10$8HvWOLyXm0iiR9KVIrqb3eZKacGPslvAErMU2DILkT.FuD9irSOGK', 'khy_User@nate.com', NULL, '2018-08-06 09:53:30', '2018-08-06 09:53:30'),
	(9, 'pilgyu', '정필교', '$2a$10$PtixpR9HiEc18lroEaRueONX95KkxzIkmVdoz9dsh1ddH80.FOB3m', 'kkk@kkk.com', NULL, '2018-08-06 21:14:29', '2018-08-06 21:14:29'),
	(10, 'jh', '정훈', '$2a$10$DwfoTm0VbNw9OI7GqrV5.OkQFAgRFUZ5m36vbRmcY.NlNT.iP6WYa', 'jh@naver.com', NULL, '2018-08-07 01:54:25', '2018-08-07 01:54:25'),
	(11, '', '', '$2a$10$ZoIWg6x6CeIf5sOB0smGPet0KCJiGo4RIE8C36951B0qaQpk3woGq', '', NULL, '2018-08-13 02:47:10', '2018-08-13 02:47:10');
/*!40000 ALTER TABLE `test_user` ENABLE KEYS */;

-- 테이블 openbill.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `company` varchar(100) DEFAULT NULL,
  `role` varchar(10) NOT NULL DEFAULT 'USER',
  `terms_agree_yn` char(1) NOT NULL,
  `info_use_agree_yn` char(1) NOT NULL,
  `info_policy_agree_yn` char(1) NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `upd_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `authcode` varchar(100) DEFAULT NULL,
  `authstatus` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- 테이블 데이터 openbill.user:~18 rows (대략적) 내보내기
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `email`, `password`, `phone`, `name`, `company`, `role`, `terms_agree_yn`, `info_use_agree_yn`, `info_policy_agree_yn`, `reg_date`, `upd_date`, `authcode`, `authstatus`) VALUES
	(9, 'nadana@nate.com', '713bcaa2470b5d38eec391003bbaa6f3a8e91f3317fcd61d6e88e7b48048b8ab', '01012341234', '관리자', '아무거나', 'ADMIIN', 'Y', 'Y', 'Y', '2018-11-08 11:32:53', '2018-08-21 00:51:08', NULL, NULL),
	(11, 'milseda@nate.com', 'd767193f0567576c44ecd371a9247719b36657d2f987a0ab868d09f03f8bdd85', '01012341234', '홍길동', 'DTOL', 'USER', 'Y', 'Y', 'Y', '2018-11-08 14:46:13', '2018-08-21 02:16:50', NULL, NULL),
	(12, 'ara@nate.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '01012341234', '임꺽정', '디투엘', 'ADMIN', 'Y', 'Y', 'Y', '2018-11-14 14:06:06', '2018-08-21 14:33:27', NULL, 'Y'),
	(13, 'manager@openbss.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '01012341234', '관리자', 'openbss', 'ADMIN', 'Y', 'Y', 'Y', '2018-11-08 11:32:55', '2018-08-27 00:16:49', NULL, NULL),
	(14, 'nayana@nate.com', 'ceaa28bba4caba687dc31b1bbe79eca3c70c33f871f1ce8f528cf9ab5cfd76dd', '01012341234', '판매자', '나다나', 'USER', 'Y', 'Y', 'Y', '2018-11-08 11:32:55', '2018-09-19 00:05:16', NULL, NULL),
	(22, 'nada@sk.com', 'f1b820ecda74efb910d5e57615be63146803b62c149dd88c5d2d4c75caa65255', '010123445678', '김대표', 'SK', 'USER', 'Y', 'Y', 'Y', '2018-11-13 16:59:19', '2018-10-10 16:29:11', 'VhtGvGiaccPFXEE6sKSzqLI117KtWM8VnrFIeci2LquYgDlgJL', 'Y'),
	(23, 'nanana@nate.com', '4fa08a8d6320989de068d5c1798d1e0cd4765b90dffae094132240cfae9181f5', '01012341234', '이대표', '내맘대로', 'USER', 'Y', 'Y', 'Y', '2018-11-08 16:18:48', '2018-11-05 16:16:39', 'qTWUESjBg9UxtSfqk939Sw7If46s51c9DnJW3AYiCLW5q53E6a', NULL),
	(24, 'casepencil@naver.com', 'fde10e8399ae6442b29a400c52b8b3c54d0b0405f4d5260ef26364c2cd915348', '01012341234', '정대표', 'SK', 'USER', 'Y', 'Y', 'Y', '2018-11-08 11:33:01', '2018-11-06 10:40:28', '7kY5jLzJZLwPDLMd7CnTYl3hWiHHj9ZDC0EukCLIqdqYH6UTym', NULL),
	(25, 'rgntr@naver.com', 'c70422f63d733dcbe6e32f5bc41e7bd9ad7cd403c53a972fd3df8b9abb1f6413', '', '홍길1', '', 'USER', 'Y', 'Y', 'Y', '2018-11-14 14:13:00', '2018-11-08 14:51:48', 'Y2I7Bfpj8V5JHF00NQ7DKjC9ZCUo4aUFAEzXqCqeumo3qGC9EY', NULL),
	(30, 'casepencil@sk.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '', '필교', '', 'USER', 'Y', 'Y', 'Y', '2018-11-09 15:39:52', '2018-11-09 10:14:17', 'WYbVrowmwoUUgMwVInmSKgSVPVrhjblhu6lNcXj4IDp351lId6', 'Y'),
	(31, 'milsehope@nate.com', 'e0162844ef56e100b2bf557b8893c2a939248c612c0a2645130252fa9a6b0d55', '', '상주', '', 'USER', 'Y', 'Y', 'Y', '2018-11-13 16:03:56', '2018-11-12 10:24:32', '8zU8hqgmgllw77Ld43UMGQ19MF6ypm3MKfI3lLGoFxpMu2etdh', 'Y'),
	(32, 'hhan0418@sk.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '01045303758', '한만길', 'SK', 'USER', 'Y', 'Y', 'Y', '2018-11-14 09:07:32', '2018-11-13 17:00:01', 'V9JcBDoMz6OO2M7nYDEu59dPMiow5R8mVCaqsqe8mDpfgX5vSW', 'Y'),
	(33, 'hardkkh7@naver.com', '4d31575349a94f34dd3dbe5a70451021dc90316a6856fa1dfe4cc23e703f09fd', '01049396132', '김강현', 'SK', 'USER', 'Y', 'Y', 'Y', '2018-11-14 08:22:56', '2018-11-14 08:21:42', 'cKgU3nYJfqnQJnpUMzyUB31xx6F5CvTmg2ZvU1SnnFiIR275nZ', 'Y'),
	(34, 'rgntr2@naver.com', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', '01049396132', '김강현', 'SK', 'USER', 'Y', 'Y', 'Y', '2018-11-14 08:49:20', '2018-11-14 08:49:20', 'LrAFxF7ROjeHKdN1zRioBj8vqxAcFOOxu0pYo9NLM10y8fj1Mo', NULL),
	(35, 'rgntr3@naver.com', '6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b', '1', 'u', '1', 'USER', 'Y', 'Y', 'Y', '2018-11-14 08:50:59', '2018-11-14 08:50:59', '3Ysez1C97yAXAgGtcgfpzNrTKHC0RkeaBIRM1Vhll6PwviwXxQ', NULL),
	(37, 'kim@sk.com', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', '01098765432', '김철수', '', 'USER', 'Y', 'Y', 'Y', '2018-11-15 15:36:56', '2018-11-15 15:36:56', 'xHJIRC23audf2JWh6f0SlJkNnAWTdab9k1cN43vq7uMgVy5mLA', NULL),
	(39, 'chul@sk.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '01098765432', '김철수', '', 'USER', 'Y', 'Y', 'Y', '2018-11-15 15:37:31', '2018-11-15 15:37:31', 'T8MqVumPilsTSzfVybhBjuXtgabDHTtoVKxjm8NnwmIPGqbYum', NULL),
	(40, 'rlaehgml125@gmail.com', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '01055555555', '김영희', '', 'USER', 'Y', 'Y', 'Y', '2018-11-15 15:58:23', '2018-11-15 15:39:12', 'ewj4AwqWWl87m46aKlqL6dKv2FUT06dB7k3km4FTq8yu5p3ukE', 'Y');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
