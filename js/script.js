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
  }); // 누락된 닫는 괄호 추가

  // 메인 상품 탭 메뉴 기능
  $('#menu_wrap ul li').on('click', function(e) {
    e.preventDefault();
    
    // 모든 탭에서 selected 클래스 제거
    $('#menu_wrap ul li').removeClass('selected');
    
    // 클릭된 탭에 selected 클래스 추가
    $(this).addClass('selected');
    
    // 탭에 따른 상품 데이터 (실제로는 AJAX로 불러올 수 있음)
    const tabIndex = $(this).index();
    updateProductDisplay(tabIndex);
  });

  // 상품 데이터 (통합된 버전)
  const productData = [
    // 1+1 상품
    [
      { icon: '1plus1_icon.png', image: 'menu1.jpg', title: '쇼콜라생크림<br>케잌', price: '3,300원' },
      { icon: '1plus1_icon.png', image: 'menu2.jpg', title: '매콤기름떡볶이', price: '3,600원' },
      { icon: '1plus1_icon.png', image: 'food4.jpg', title: '천하장사50g', price: '2,400원' },
      { icon: '1plus1_icon.png', image: 'food5.jpg', title: '키커바', price: '1,000원' }
    ],
    // 2+1 상품
    [
      { icon: '2plus1_icon.png', image: 'food6.jpg', title: '딸기미니컵', price: '5,900원' },
      { icon: '2plus1_icon.png', image: 'food7.jpg', title: '리콜라허브레몬', price: '3,000원' },
      { icon: '2plus1_icon.png', image: 'food8.jpg', title: '구구콘', price: '2,500원' }
    ],
    // CU전용 상품
    [
      { image: 'food9.jpg', title: '치치버거', price: '3,000원' },
      {  image: 'food10.jpg', title: '케이준치킨샌드', price: '2,800원' },
      { image: 'food11.jpg', title: '동원리챔앤참치김치', price: '5,500원' }
    ],
    // 핫이슈 상품
    [
      {  image: 'food12.jpg', title: '김치볶음참치마요', price: '1,600원' },
      {  image: 'food13.jpg', title: '더건강저당닭가슴', price: '2,900원' },
      {  image: 'food14.jpg', title: '왕자핑복숭아요거트', price: '1,900원' }
    ]
  ];

  // 상품 표시 업데이트 함수
  function updateProductDisplay(tabIndex) {
    const products = productData[tabIndex] || productData[0];
    const $menuImg = $('#menu_img');
    
    // 화면 전환 애니메이션
    $menuImg.fadeOut(200, function() {
      // 기존 상품 카드들 제거 (화살표 버튼 제외)
      $menuImg.find('.menu_card').remove();
      
      // 새로운 상품들 추가
products.slice(0, 2).forEach((product, index) => {
  const iconImg = product.icon ? `<img src="image/${product.icon}" alt="상품 아이콘" class="icn_icon">` : '';
  const $card = $(`
    <a href="product.html" class="menu_card">
      ${iconImg}
      <figure>
        <img src="image/${product.image}" alt="${product.title.replace(/<br>/g, ' ')}" class="menu_thumb">
        <span class="menu_title">${product.title}</span>
        <span class="menu_price">${product.price}</span>
      </figure>
    </a>
  `);

  if (index === 0) {
    $menuImg.find('.menu_arrow.left').after($card);
  } else {
    $menuImg.find('.menu_card').last().after($card);
  }
});
      
      $menuImg.fadeIn(200);
    });
    
    // 슬라이더 인덱스 초기화
    currentProductIndex = 0;
  }

  // 상품 슬라이더 기능
  let currentProductIndex = 0;

  // 상품 슬라이더 화살표 클릭
  $('.menu_arrow.left').on('click', function() {
    const activeTabIndex = $('#menu_wrap ul li.selected').index();
    const products = productData[activeTabIndex] || productData[0];
    
    if (currentProductIndex > 0) {
      currentProductIndex--;
      updateSliderDisplay(products, currentProductIndex);
    }
  });

  $('.menu_arrow.right').on('click', function() {
    const activeTabIndex = $('#menu_wrap ul li.selected').index();
    const products = productData[activeTabIndex] || productData[0];
    
    if (currentProductIndex < products.length - 2) {
      currentProductIndex++;
      updateSliderDisplay(products, currentProductIndex);
    }
  });

function updateSliderDisplay(products, startIndex) {
  const $menuImg = $('#menu_img');

  // 기존 카드들 먼저 제거 (애니메이션 없이 확실하게)
  $menuImg.find('.menu_card').remove();

  // 새로 보여줄 2개 상품 데이터
  const displayProducts = products.slice(startIndex, startIndex + 2);

displayProducts.forEach((product, index) => {
  const iconImg = product.icon ? `<img src="image/${product.icon}" alt="상품 아이콘" class="icn_icon">` : '';
  const $card = $(`
    <a href="product.html" class="menu_card" style="display: none;">
      ${iconImg}
      <figure>
        <img src="image/${product.image}" alt="${product.title.replace(/<br>/g, ' ')}" class="menu_thumb">
        <span class="menu_title">${product.title}</span>
        <span class="menu_price">${product.price}</span>
      </figure>
    </a>
  `);

  if (index === 0) {
    $menuImg.find('.menu_arrow.left').after($card);
  } else {
    $menuImg.find('.menu_card').last().after($card);
  }

  $card.fadeIn(150);
});
}
  // Best Pick 슬라이더 기능
  const bestProducts = [
    { image: 'hamburger.jpg', name: '3단맥스숯불바베큐', price: '3,600원' },
    { image: 'food1.jpg', name: '짜파게티닭갈비김밥', price: '3,300원' },
    { image: 'food2.jpg', name: '잔슨빌오리진핫도그', price: '4,000원' },
    { image: 'food3.jpg', name: '동원뉴고추참치김밥', price: '3,100원' }
  ];

  let currentBestIndex = 0;

  $('#Best_pick .arrow.left').on('click', function() {
    if (currentBestIndex > 0) {
      currentBestIndex--;
      updateBestPick();
    }
  });

  $('#Best_pick .arrow.right').on('click', function() {
    if (currentBestIndex < bestProducts.length - 1) {
      currentBestIndex++;
      updateBestPick();
    }
  });

  function updateBestPick() {
    const product = bestProducts[currentBestIndex];
    const $bestSlider = $('.best_slider');
    
    $bestSlider.find('img').fadeOut(200, function() {
      $(this).attr('src', `image/${product.image}`).attr('alt', product.name);
      $(this).fadeIn(200);
    });
    
    $bestSlider.find('.product_name').fadeOut(200, function() {
      $(this).text(product.name).fadeIn(200);
    });
    
    $bestSlider.find('.product_price').fadeOut(200, function() {
      $(this).text(product.price).fadeIn(200);
    });
  }

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

  // 페이지 로드 시 초기 설정
  function initializePage() {
    // 첫 번째 탭 활성화
    $('#menu_wrap ul li').first().addClass('selected');
    
    // 초기 상품 표시
    updateProductDisplay(0);
    
    // 스크롤 방지를 위한 CSS 추가
    $('<style>').prop('type', 'text/css').html(`
      body.menu-open {
        overflow: hidden;
        position: fixed;
        width: 100%;
      }
      
      #top.fixed-header {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        z-index: 100;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
    `).appendTo('head');
  }

  // 초기화 실행
  initializePage();

  // 터치 이벤트 지원 (모바일)
  let touchStartX = 0;
  let touchEndX = 0;

  $('#menu_img').on('touchstart', function(e) {
    touchStartX = e.originalEvent.touches[0].clientX;
  });

  $('#menu_img').on('touchend', function(e) {
    touchEndX = e.originalEvent.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // 왼쪽으로 스와이프 (다음 상품)
        $('.menu_arrow.right').click();
      } else {
        // 오른쪽으로 스와이프 (이전 상품)
        $('.menu_arrow.left').click();
      }
    }
  }

  // 키보드 접근성 향상
  $(document).on('keydown', function(e) {
    // ESC 키로 햄버거 메뉴 닫기
    if (e.keyCode === 27 && $('#hamburger').hasClass('open')) {
      $('#hamburger').removeClass('open');
      $('body').removeClass('menu-open');
    }
  });
});