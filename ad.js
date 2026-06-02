(function() {
    // 1. 현재 실행 중인 스크립트 태그를 찾아서 시스템이 넘겨준 데이터(이미지, 링크 등)를 읽습니다.
    var currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    var imgUrl = currentScript.getAttribute('data-img');
    var linkUrl = currentScript.getAttribute('data-link');
    var width = currentScript.getAttribute('data-width') || '970';
    var height = currentScript.getAttribute('data-height') || '96';
    var bannerId = currentScript.getAttribute('data-id') || Math.random().toString(36).substr(2, 9);

    // 이미지 주소가 없으면 에러 방지를 위해 실행을 중단합니다.
    if (!imgUrl) return; 

    // 2. 화면에 애니메이션 효과(CSS)를 자동으로 심어주는 코드입니다.
    var styleId = 'adwiser-style-' + bannerId;
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            /* 광고가 노출될 전체 틀 (지면 크기로 고정하고 삐져나온 부분은 숨김) */
            .adw-wrapper-${bannerId} {
                position: relative;
                width: ${width}px;
                height: ${height}px;
                overflow: hidden;
                margin: 0 auto;
                background-color: transparent;
            }
            /* 움직이는 슬라이더 박스 */
            .adw-slider-${bannerId} {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                /* 5초 동안 무한 반복 작동 (슬라이드 1초 + 3초 멈춤 + 나가는 슬라이드 1초) */
                animation: adwSlideAnim-${bannerId} 5s infinite ease-in-out;
            }
            .adw-slider-${bannerId} a {
                display: block;
                width: 100%;
                height: 100%;
            }
            .adw-slider-${bannerId} img {
                width: 100%;
                height: 100%;
                object-fit: fill;
                border: 0;
            }
            /* 우에서 좌로 이동하고 3초간 멈추는 애니메이션 정의 */
            @keyframes adwSlideAnim-${bannerId} {
                0% { transform: translateX(100%); }    /* 0초: 오른쪽 화면 밖에 대기 */
                10% { transform: translateX(0); }       /* 0.5초: 화면 중앙으로 부드럽게 진입 */
                70% { transform: translateX(0); }       /* 3.5초까지 중앙에서 가만히 멈춤 (3초간 정지) */
                80% { transform: translateX(-100%); }   /* 4.0초: 왼쪽 화면 밖으로 탈출 */
                100% { transform: translateX(-100%); }  /* 5.0초까지 대기 후 다시 처음(오른쪽)으로 돌아가 반복 */
            }
        `;
        document.head.appendChild(style);
    }

    // 3. 시스템 마스터 템플릿에 만들어둔 <div id="adwiser_zone_..."> 자리를 찾아 광고를 집어넣습니다.
    var targetZone = document.getElementById('adwiser_zone_' + bannerId);
    if (targetZone) {
        var adHtml = `
            <div class="adw-wrapper-${bannerId}">
                <div class="adw-slider-${bannerId}">
                    <a href="${linkUrl}" target="_blank" rel="noopener noreferrer">
                        <img src="${imgUrl}" alt="광고">
                    </a>
                </div>
            </div>
        `;
        targetZone.innerHTML = adHtml;
    }
})();