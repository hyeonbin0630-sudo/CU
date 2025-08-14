 $(function () {
      // 상품 데이터
      const products = [
        { id: 1, category: "전체상품", subcategory: "간편식사", name: "베이컨에그모닝머핀", price: 3700, img: "image/product1.png", popular: 50, date: "2025-07-10" },
        { id: 2, category: "전체상품", subcategory: "즉석요리", name: "일본식마제소바", price: 5200, img: "image/product2.png", popular: 120, date: "2025-06-15" },
        { id: 3, category: "전체상품", subcategory: "과자류", name: "피자앤치즈베이글칩", price: 1800, img: "image/food20.jpg", popular: 90, date: "2025-05-20" },
        { id: 4, category: "전체상품", subcategory: "즉석요리", name: "3단맥스숯불바베큐", price: 3600, img: "image/food11.jpg", popular: 80, date: "2025-07-01" },
        { id: 5, category: "행사상품", subcategory: "과자류", name: "캐리비안치킨", price: 4000, img: "image/food21.jpg", popular: 60, date: "2025-06-01" },
        { id: 6, category: "행사상품", subcategory: "음료", name: "아메캔200ml", price: 1500, img: "image/food22.png", popular: 130, date: "2025-07-12" },
        { id: 7, category: "CU전용 상품", subcategory: "생활용품", name: "뉴리뉴멀티355ml", price: 4500, img: "image/food23.jpg", popular: 40, date: "2025-05-25" },
        { id: 8, category: "CU전용 상품", subcategory: "아이스크림", name: "구구콘", price: 2500, img: "image/food8.jpg", popular: 110, date: "2025-07-14" }
      ];

      // 상태 변수
      let currentCategory = "전체상품";
      let currentSubcategory = "";
      let currentSort = ""; // ""(기본), "price", "popular", "date"

      // 장바구니 배열
      let cart = [];

      // 상품 리스트 렌더링 함수
      function renderProducts() {
        const $list = $('.product_list');
        $list.empty();

        // 필터링
        let filtered = products.filter(p => {
          const categoryMatch = (currentCategory === "전체상품") || (p.category === currentCategory);
          const subcatMatch = currentSubcategory === "" || p.subcategory === currentSubcategory;
          return categoryMatch && subcatMatch;
        });

        // 정렬
        if (currentSort === "price") filtered.sort((a, b) => a.price - b.price);
        else if (currentSort === "popular") filtered.sort((a, b) => b.popular - a.popular);
        else if (currentSort === "date") filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (filtered.length === 0) {
          $list.html('<p style="padding:20px; text-align:center;">상품이 없습니다.</p>');
          return;
        }

        filtered.forEach(item => {
          const $card = $(`
            <figure class="product_card" data-id="${item.id}">
              <img src="${item.img}" alt="${item.name}">
              <figcaption>
                <p class="product_name">${item.name}</p>
                <p class="product_price">${item.price.toLocaleString()}원</p>
              </figcaption>
            </figure>
          `);
          $list.append($card);
        });
      }

      // 장바구니 팝업 렌더링
      function renderCart() {
        const $cartItems = $('#cart_items');
        const $cartEmpty = $('#cart_empty');
        $cartItems.empty();

        if (cart.length === 0) {
          $cartEmpty.show();
          return;
        } else {
          $cartEmpty.hide();
        }

        cart.forEach(item => {
          $cartItems.append(`
            <li style="margin-bottom:10px;">
              ${item.name} (${item.count}개) - ${item.price.toLocaleString()}원
            </li>
          `);
        });
      }

      // 초기 렌더링
      renderProducts();

      // 카테고리 클릭 이벤트
      $('.category_list li').click(function (e) {
        e.preventDefault();
        $('.category_list li').removeClass('selected');
        $(this).addClass('selected');
        currentCategory = $(this).text();
        currentSubcategory = "";
        $('.category_filter_list button').removeClass('active');
        renderProducts();
      });

      // 서브카테고리 클릭 이벤트
      $('.category_filter_list button').click(function () {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          currentSubcategory = "";
        } else {
          $('.category_filter_list button').removeClass('active');
          $(this).addClass('active');
          currentSubcategory = $(this).text();
        }
        renderProducts();
      });

      // 가격순 인기순 최신순 드롭다운 생성 및 위치조정
      const $filterBtn = $('.filter_search button').eq(0); // 필터 아이콘 버튼

      // 드롭다운 메뉴 추가
      if ($('#sort_dropdown').length === 0) {
        $('.filter_search').append(`
          <div id="sort_dropdown" style="
            display:none;
            position:absolute;
            background:#fff;
            border:1px solid #ccc;
            border-radius:6px;
            box-shadow:0 3px 6px rgba(0,0,0,0.15);
            z-index:1000;
            width:120px;
          ">
            <ul style="list-style:none; margin:0; padding:5px 0;">
              <li class="sort_option" data-sort="price" style="padding:8px 15px; cursor:pointer;">가격순</li>
              <li class="sort_option" data-sort="popular" style="padding:8px 15px; cursor:pointer;">인기순</li>
              <li class="sort_option" data-sort="date" style="padding:8px 15px; cursor:pointer;">최신순</li>
              <li class="sort_option" data-sort="" style="padding:8px 15px; cursor:pointer;">기본순</li>
            </ul>
          </div>
        `);
      }

      // 드롭다운 위치 조정 함수
      function positionDropdown() {
        const offset = $filterBtn.offset();
        const height = $filterBtn.outerHeight();
        $('#sort_dropdown').css({
          top: offset.top + height + 5,
          left: offset.left
        });
      }

      // 필터 아이콘 클릭 시 드롭다운 토글
      $filterBtn.click(function (e) {
        e.stopPropagation();
        positionDropdown();
        $('#sort_dropdown').toggle();
      });

      // 드롭다운 옵션 클릭
      $(document).on('click', '.sort_option', function () {
        const sortType = $(this).data('sort');
        currentSort = sortType;

        let textMap = {
          'price': '가격순',
          'popular': '인기순',
          'date': '최신순',
          '': '기본순'
        };
        $('.filter2').html(`${textMap[sortType]} <i class="fa-solid fa-chevron-down"></i>`);

        renderProducts();
        $('#sort_dropdown').hide();
      });

      // 문서 클릭 시 드롭다운 숨기기
      $(document).click(function () {
        $('#sort_dropdown').hide();
      });
// 장바구니 렌더링 함수
function renderCart() {
  const $cartItems = $('#cart_items');
  $cartItems.empty();

  if (cart.length === 0) {
    $cartItems.html('<p>장바구니가 비어있습니다.</p>');
    return;
  }

  cart.forEach(item => {
    $cartItems.append(`
      <div style="margin-bottom:10px; border-bottom:1px solid #ddd; padding-bottom:5px;">
        <strong>${item.name}</strong><br>
        수량: ${item.count} 개<br>
        가격: ${(item.price * item.count).toLocaleString()}원
      </div>
    `);
  });
}

// 장바구니 아이콘 클릭 이벤트
$('#cart_btn').click(function (e) {
  e.preventDefault();
  renderCart();
  $('#cart_popup').fadeIn(200);
  $('#cart_overlay').fadeIn(200);
});

// 닫기 버튼 클릭 이벤트
$('#close_cart').click(function () {
  $('#cart_popup').fadeOut(200);
  $('#cart_overlay').fadeOut(200);
});

// 팝업 배경 클릭해도 닫기
$('#cart_overlay').click(function () {
  $('#cart_popup').fadeOut(200);
  $('#cart_overlay').fadeOut(200);
});

      // (필요시) 상품 클릭 시 장바구니 담기 기능은 제거했습니다 (요청대로)
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
    });