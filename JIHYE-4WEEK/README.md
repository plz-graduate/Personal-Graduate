# 지혜 작업


## 4주차
### 21학번 기준 졸업요건으로 출력해봄

![image](https://github.com/plz-graduate/Personal-Graduate/assets/129932517/fe2eb68c-1abf-4047-8a0e-4700bc0131d0)


1. data/informationConvergence.json에20~24학번의 기필, 전필 데이터를 학정번호와 함께 저장

2. json 데이터를 fetch로 호출하여 수강/성적 조회 페이지에서 수강했는지 확인
   
     ->지정된 학번(ex.21)의 값들만 불러옴
   
     -> 과목명이 아닌 '학정 번호'로 비교 (수강했으나 성적이 F or NP일 경우 '수강 필요'로 표기)
