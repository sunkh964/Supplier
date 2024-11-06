# 병원 기능 관리 구현 3차 팀 프로젝트
1. ✨[프로젝트 소개](#-프로젝트-소개)
2. 📌[주요 목표 및 구현 기능](#-주요-목표-및-구현-기능)
3. 🔧[기능 소개](#-기능-소개)
   - [수주관리](#수주관리)
   - [출하관리](#출하관리)
   - [매출관리](#매출관리)
4. 👬[팀원 및 역할](#-팀원-및-역할)

</br>

## ✨ 프로젝트 소개
![깃허브용_3_그린의약품](https://github.com/user-attachments/assets/41933feb-9977-4039-9b78-d8c7daa015f8)
React를 이용해 병원에 의료용품을 납품하는 가상의 공급사 '그린 의약품'의 웹 사이트 구현

</br>

## 📌 주요 목표 및 구현 기능
1. **공급사 관점 의료용품 출하 서비스** 구현
   - 공급사 → 병원: 
     - 병원 측의 주문서 확인
     - 주문서의 상세 내역과 공급사 측 재고 비교
     - 배송 현황 업데이트
2. 1차 프로젝트인 <u>**[병원 입고 관리 웹 페이지](https://github.com/sunkh964/Team3)**</u>와 연동
   - 병원 → 공급사:
     -  병원에서 공급사에 물품 발주 신청
     -  배송 완료 시 공급사 측에 수령 여부 전달
3. 매출 현황 관리
   - 연간 매출의 시각화
   - 병원 측의 제품 별 주문량 파악, 재고 부족 사전 방지

</br>

- 수주관리
  - [x] 수주 목록
  - [x] 주문서 상세 조회
- 출하관리
  - [x] 주문서 관리 및 배송 상태 변경
  - [x] 개별 주문 관리 및 배송 상태 변경
- 매출관리
  - [x] 매출액, 주문량, 고객 수 통계
  - [x] 연간 매출 현황 그래프 및 표
  - [x] 제품 별 주문량 그래프

<br>

## 🔧 기능 소개
> 모든 GIF는 '새 탭에서 이미지 열기' 등의 방법으로 확대하여 열람하는 것을 추천 드립니다.

<br>

### 수주관리
| 로그인 및 수주관리 | 병원 측 발주 + 공급사 측 수주 |
| --- | --- |
| ![3_로그인및수주관리](https://github.com/user-attachments/assets/ddbf1bb9-9f77-4097-9f9b-738ef5b5d8cb) | ![3_발주및수주](https://github.com/user-attachments/assets/ec90a8fb-905b-41fb-85e7-10dcee7fc8b6) |
| // 설명 | // 설명 |

<br>

### 출하관리
| 주문서 정렬 및 검색 | 주문서 출하 |
| --- | --- |
| ![3_주문서정렬및검색](https://github.com/user-attachments/assets/335d1327-08a0-40de-8e32-ed699e7a88ab) | ![3_주문서출하](https://github.com/user-attachments/assets/71bab562-55a2-4cd7-9f71-6f931599b123) |
| // 설명 | // 설명 |

| 상세품목 정렬 및 검색 | 상세품목 상태 일치 |
| --- | --- |
| ![3_세부품목정렬및검색](https://github.com/user-attachments/assets/a20f6d5e-531e-4e3e-8672-1204a2c453bf) | ![3_세부품목상태일치](https://github.com/user-attachments/assets/fcb039f7-8b87-48af-93d5-b271550a2e4f) |
| // 설명 | // 설명 |

<br>

### 매출관리
| 연간 매출 | 제품 별 주문량 |
| --- | --- |
| ![3_매출그래프](https://github.com/user-attachments/assets/d63fafe3-c104-4b74-9ad5-1bf7f7feba7a) | ![3_주문량그래프](https://github.com/user-attachments/assets/6b7094e4-d0fb-4a05-b5ca-d37e4e80519f) |
| // 설명 | // 설명 |

<br>

## 👬 팀원 및 역할
- [<u>노현경</u>](https://github.com/nohk1113) - 멤버 기능, 수주관리
- [<u>한선경</u>](https://github.com/sunkh964)  - UI 디자인 및 설계, 매출관리
- [<u>정다영</u>](https://github.com/da9630jj) - 병원 입고 관리 페이지와의 연동, 발주 프로세스
- [<u>이도원</u>](https://github.com/nubbp) - 출하관리, 배송 프로세스
