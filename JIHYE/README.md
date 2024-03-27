# 지혜 작업


## 3주차
![image](https://github.com/plz-graduate/Personal-Graduate/assets/129932517/f16542bc-fbe7-4f83-a82d-2e8d66e52e5b)



<img width="676" alt="image" src="https://github.com/plz-graduate/Personal-Graduate/assets/136612437/8a02dfb8-8137-4922-b32a-05824d93e97f">

1. data/informationConvergence.json에 필수 과목과 학정번호 저장

2. json 데이터를 fetch로 호출하여 수강/성적 조회 페이지에서 수강했는지 확인 -> 과목명이 아닌 '학정 번호'로 비교 (수강했으나 성적이 F or NP일 경우 '수강 필요'로 표기)

3. 취득학점을 기준으로 졸업까지 남은 학점 알려주기
-> 두번째 tablegw클래스의 취득학점을 추출하여 졸업까지 몇 학점을 더 들어야되는지 띄움

4. 균형교양 3영역 만족하는지 확인( 캡쳐본 맨 위)
   - if문으로 균영교양 파트에서 학점이 3이상이면 count++
   - 전체파트를 다 돌고 count>=3이면 균형교양 3영역 만족 출력
   - count<3 이면 실패! 출력
