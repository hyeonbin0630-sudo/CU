$(function () {
  const eventData = {
    "진행중": [
      {
        title: "CU 여름 한정 할인 행사",
        period: "기간: 2025.07.10 ~ 2025.08.05",
        image: "image/Event_card4.png",
        alt: "아이스크림 이벤트"
      },
      {
        title: "친환경으로 지구 구하기",
        period: "기간: 2025.07.16 ~ 2025.08.21",
        image: "image/Event_card1.png",
        alt: "친환경 이벤트 이미지"
      }
    ],
    "종료": [
      {
        title: "숨은 금 25돈을 찾아라!",
        period: "기간: 2025.05.16 ~ 2025.06.21",
        image: "image/Event_card2.png",
        alt: "금 찾기 이벤트"
      },

    ],
    "참여완료": [

    ]
  };

  function renderCards(status) {
    const container = $('#event_cards_container');
    container.empty();

    if (!eventData[status] || eventData[status].length === 0) {
      container.append('<p>해당 이벤트가 없습니다.</p>');
      return;
    }

    eventData[status].forEach(event => {
      const card = `
        <section class="event-card">
          <div class="event-container">
            <div class="event-label">Event</div>
            <h2 class="event-title">${event.title}</h2>
          </div>
          <p class="event-period">${event.period}</p>
          <div class="event-image">
            <img src="${event.image}" alt="${event.alt}" />
          </div>
        </section>
      `;
      container.append(card);
    });
  }

  // 처음엔 진행중 이벤트만 보이게
  renderCards("진행중");

  // 버튼 클릭 시 해당 상태 이벤트 보여주기
  $('#event_status .status').click(function () {
    $('#event_status .status').removeClass('selected');
    $(this).addClass('selected');

    const selected = $(this).data('filter');
    renderCards(selected);
  });
  
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
});