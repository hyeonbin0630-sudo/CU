$(function () {
  // 햄버거 메뉴 열기
  $('.menu_icon').on('click', function (e) {
    e.preventDefault();
    $('#hamburger').addClass('open');
    $('body').addClass('menu-open'); // body 클래스 추가
  });

  // 햄버거 메뉴 닫기
  $('.menu_close').on('click', function () {
    $('#hamburger').removeClass('open');
    $('body').removeClass('menu-open'); // body 클래스 제거
  });

  // 서브메뉴 토글
  $('#hamburger_gnb > ul > li > a').on('click', function (e) {
    e.preventDefault();

    const $submenu = $(this).next('.submenu');
    const isOpen = $submenu.is(':visible');

    // 모든 서브메뉴 닫고 아이콘 초기화
    $('#hamburger_gnb .submenu').slideUp(300);
    $('#hamburger_gnb > ul > li > a').removeClass('active');

    if (!isOpen) {
      // 여는 부분에 swing 애니메이션 적용
      $submenu.stop(true, true).slideDown(400, 'swing');
      $(this).addClass('active');
    }
  }); // 서브메뉴 토글 닫기
  
  // Quick Menu 셀렉트 박스 기능
  $('#quickMenu').on('change', function() {
    const selectedValue = $(this).val();
    
    if (selectedValue) {
      // 실제 구현에서는 해당 페이지로 이동
      switch(selectedValue) {
        case 'consult':
          alert('입점상담 페이지로 이동합니다.');
          break;
        case 'ad':
          alert('제휴/광고 문의 페이지로 이동합니다.');
          break;
        case 'store':
          alert('매장찾기 페이지로 이동합니다.');
          break;
        case 'order':
          alert('발주 및 배송데이터 페이지로 이동합니다.');
          break;
        case 'tax':
          alert('전자세금계산서 페이지로 이동합니다.');
          break;
        case 'owner':
          alert('점주인증 페이지로 이동합니다.');
          break;
        case 'staff':
          alert('임직원인증 페이지로 이동합니다.');
          break;
        default:
          break;
      }
      
      // 선택 초기화
      $(this).val('');
    }
  });
}); // 여기 닫는 괄호와 세미콜론 꼭 추가