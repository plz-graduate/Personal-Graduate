// 테이블 생성 및 페이지에 삽입하는 함수
function createAndInsertTable(data, completedCourses) {
  // 테이블 요소 생성
  const table = document.createElement('table');
  table.style.width = '100%';
  table.style.marginTop = '20px';

  // 테이블 헤더 생성
  const thead = document.createElement('thead');
  table.appendChild(thead);

  // 헤더 행 생성
  const headerRow = document.createElement('tr');
  thead.appendChild(headerRow);

  // 헤더 셀 생성
  const headers = ['학정번호', '과목명', '분류', '수강여부'];
  headers.forEach(headerText => {
    const headerCell = document.createElement('th');
    headerCell.textContent = headerText;
    headerCell.style.textAlign = 'center';
    headerRow.appendChild(headerCell);
  });

  // 테이블 본문 생성
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  // JSON 데이터를 통해 테이블 행 생성
  Object.keys(data.requiredCourses).forEach(category => {
    data.requiredCourses[category].forEach(course => {
      const courseID = course.id;
      const courseStatus = completedCourses[courseID] ? 
                           (completedCourses[courseID] === 'F' || completedCourses[courseID] === 'NP' ? "수강 필요" : "수강함") : 
                           "수강 필요";

      const row = document.createElement('tr');
      const idCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const categoryCell = document.createElement('td');
      const statusCell = document.createElement('td');

      idCell.textContent = course.id;
      nameCell.textContent = course.name;
      categoryCell.textContent = category;
      statusCell.textContent = courseStatus;

      [idCell, nameCell, categoryCell, statusCell].forEach(cell => {
        cell.style.textAlign = 'center';
        row.appendChild(cell);
      });

      tbody.appendChild(row);
    });
  });

  // .tablegw 클래스를 가진 첫 번째 요소를 찾아 그 다음 위치에 테이블 삽입
  const insertionPoint = document.querySelector('.tablegw');
  if (insertionPoint) {
    insertionPoint.parentNode.insertBefore(table, insertionPoint.nextSibling);
  } else {
    document.body.appendChild(table);
  }
}



// 수강 성적 페이지에서 수강 완료 과목의 학정번호와 성적을 추출하는 함수
function extractCompletedCourses() {
  const completedCourses = {};
  const rows = document.querySelectorAll('.AType tbody tr');
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    if (cells.length > 5) { // 성적이 포함된 셀에 접근하기 전에 충분한 셀이 있는지 확인
      const courseID = cells[0].textContent.trim().split('-')[2];
      const grade = cells[5].textContent.trim(); // 성적이 6번째 셀에 있다고 가정
    completedCourses[courseID] = grade;
  }});
  console.log(completedCourses);
  return completedCourses;
  
}


// 취득학점 정보 추출 및 남은 학점 계산
function calculateRemainingCredits() {
  // 취득학점 정보가 있는 테이블 선택 (두 번째 '.tablegw')
  const creditInfoTable = document.querySelectorAll('.tablegw')[1];
  if (!creditInfoTable) {
    console.error("취득학점 정보 테이블을 찾을 수 없습니다.");
    return { major: 0, nonMajor: 0 }; // 오류 시 기본 값 반환
  }

  // 취득학점 정보 추출
  const rows = creditInfoTable.querySelectorAll('tbody tr')[0].cells; // 첫 번째 행의 셀들 선택
  const majorCredits = parseInt(rows[8].textContent, 10) || 0; // 전공 취득학점
  const nonMajorCredits = parseInt(rows[9].textContent, 10) || 0; // 교양 취득학점

  // 졸업 요건 학점 (전공 60학점 이상, 전공 제외 73학점 이상 필요)
  const graduationRequirements = { major: 60, nonMajor: 73 };

  // 남은 학점 계산
  const remainingCredits = {
    major: Math.max(0, graduationRequirements.major - majorCredits),
    nonMajor: Math.max(0, graduationRequirements.nonMajor - nonMajorCredits)
  };

  return remainingCredits; // 계산된 남은 학점 객체 반환
}




// 남은 학점 표시
function displayRemainingCredits(data, completedCourses) {
  const remainingCreditsInfo = calculateRemainingCredits(); // 남은 학점 계산 함수 호출 결과

  // 남은 학점 정보를 표시할 요소 생성
  const remainingCreditsDiv = document.createElement('div');
  remainingCreditsDiv.style.marginTop = '20px'; // 상단 여백 설정
  remainingCreditsDiv.innerHTML = `
    <strong>남은 학점 정보</strong>
    <p>전공 필요 학점: ${remainingCreditsInfo.major}학점</p>
    <p>교양 및 기타 필요 학점: ${remainingCreditsInfo.nonMajor}학점</p>
  `;

  // 테이블이 삽입된 후 해당 요소를 .tablegw 클래스를 가진 첫 번째 요소 바로 다음 위치에 삽입
  const table = document.querySelector('.tablegw + table'); // 수강 여부 테이블 선택
  if (table) {
    table.parentNode.insertBefore(remainingCreditsDiv, table.nextSibling);
  } else {
    console.error('수강 여부 테이블을 찾을 수 없습니다.');
  }
}


// JSON 파일 로드 및 테이블 생성 실행
fetch(chrome.runtime.getURL('data/informationConvergence.json'))
  .then(response => response.json())
  .then(data => {
    const completedCourses = extractCompletedCourses(); // 수강 완료 과목 정보 추출
    createAndInsertTable(data, completedCourses); // 테이블 생성 및 삽입

    // 남은 학점 계산 및 표시 로직 실행
    const remainingCredits = calculateRemainingCredits(); // 남은 학점 계산
    displayRemainingCredits(data, completedCourses, remainingCredits); // 남은 학점 정보 표시
  })
  .catch(error => console.error('Error loading JSON:', error));