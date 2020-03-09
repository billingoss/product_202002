Billing OSS 오픈을 대비하여
소스 배포 과정을 정리해서 공유 드립니다.
문의사항 있으시면 전달 부탁 드립니다.

감사합니다.
gitHub 수정 업로드 테스트

---------------------------------------------------------------------------------------------------
이 모든 것이 단 5분
---------------------------------------------------------------------------------------------------


---------------------------------------------------------------------------------------------------
파일질라
---------------------------------------------------------------------------------------------------
클라우드 Z -> local

sftp -> 174.37.46.109
openbill
qlffld505!

로컬 사이트


리포트 사이트    /home/openbill/BILLLETTER/운영/20190731


다운로드
billing-service-billingOss-7777.jar
billing-service-billingOss-8888.jar
;

---------------------------------------------------------------------------------------------------
AWS S3
---------------------------------------------------------------------------------------------------
AWS에 jar배포를 위해 S3 저장소로 미리 전송해야 합니다.

local -> S3  


https://189703733859.signin.aws.amazon.com/console
appadmin
qlffld505!

전체 서비스 -> 스토리지 -> S3
S3 버킷 -> billingoss -> source -> 기존 업로드 파일 마우스 오버 후 마우스 오른쪽 버튼으로 팝업 메뉴 호출 -> 삭제
업로드 -> 파일 추가 -> 업로드할 파일 선택 -> 열기 -> 다음 -> 다음 -> 다음 -> 업로드

업로드 할 파일 위치
;

---------------------------------------------------------------------------------------------------
WAS server
---------------------------------------------------------------------------------------------------

1. Bastion Host 접속

Bastion Host
IP
13.125.119.144
ID
appadmin
PW
appadmin -> qlffld505!


2. WAS 접속

ssh openbill@was1
qlffld505!


3. 웹서비스 종료
ps -ef | grep billing 

kill $(ps aux |awk '/billing/ {print $2}')

ps -ef | grep billing 


4. jar 파일 교체( S3에서 가져옴)
ls -rlt /appbin/backoffice
ls -rlt /appbin/billletter

rm /appbin/backoffice/billing-service-billingOss-7777.jar
rm /appbin/billletter/billing-service-billingOss-8888.jar

ls -rlt /appbin/backoffice
ls -rlt /appbin/billletter

aws s3 cp s3://billingoss/source/billing-service-billingOss-7777.jar /appbin/backoffice
aws s3 cp s3://billingoss/source/billing-service-billingOss-8888.jar /appbin/billletter


5. 웹서비스 기동(로그 관리를 위하 서비스별 로그 위치에서 기동함)

ls -rlt /appbin/backoffice
ls -rlt /appbin/billletter

cd /applog/backoffice
nohup java -jar /appbin/backoffice/billing-service-billingOss-7777.jar &

cd /applog/billletter
nohup java -jar /appbin/billletter/billing-service-billingOss-8888.jar &

ps -ef | grep billing
;

 

 