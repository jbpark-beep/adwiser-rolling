(function() {
    var currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    // 1. 최대 3개까지의 이미지 주소와 링크를 받아옵니다.
    var img1 = currentScript.getAttribute('data-img1');
    var img2 = currentScript.getAttribute('data-img2');
    var img3 = currentScript.getAttribute('data-img3');
    var linkUrl = currentScript.getAttribute('data-link');
    var width = currentScript.getAttribute('data-width') || '970';
    var height = currentScript.getAttribute('data-height') || '96';
    var bannerId = currentScript.getAttribute('data-id') || Math.random().toString(36).substr(2, 9);

    // 유효한 이미지들만 배열에 담습니다.
    var images = [img1, img2, img3].filter(Boolean);
    if (images.length === 0) return;

    // 2. 슬라이더 스타일(CSS) 자동 생성
    var styleId = 'adwiser-multi-style-' + bannerId;
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .adw-m-wrap-${bannerId} {
                position: relative;
                width: ${width}px;
                height: ${height}px;
                overflow: hidden;
                margin: 0 auto;
            }
            /* 이미지들을 가로로 길게 이어 붙이는 기차 트랙 */
            .adw-m-track-${bannerId} {
                display: flex;
                width: ${images.length * 100}%;
                height: 100%;
                transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1); /* 부드러운 감속 슬라이드 */
            }
            .adw-m-slide-${bannerId} {
                width: ${100 / images.length}%;
                height: 100%;
            }
            .adw-m-slide-${bannerId} a {
                display: block;
                width: 100%;
                height: 100%;
            }
            .adw-m-slide-${bannerId} img {
                width: 100%;
                height: 100%;
                object-fit: fill;
                border: 0;
            }
        `;
        document.head.appendChild(style);
    }

    // 3. 화면에 롤링 지면 그리기
    var targetZone = document.getElementById('adwiser_zone_multi_' + bannerId);
    if (!targetZone) {
        // 만약 타겟 div가 없으면 스크립트 바로 위에 생성
        targetZone = document.createElement('div');
        targetZone.id = 'adwiser_zone_multi_' + bannerId;
        currentScript.parentNode.insertBefore(targetZone, currentScript);
    }

    var slidesHtml = images.map(function(img) {
        return `
            <div class="adw-m-slide-${bannerId}">
                <a href="${linkUrl}" target="_blank" rel="noopener noreferrer">
                    <img src="${img}" alt="광고">
                </a>
            </div>
        `;
    }).join('');

    targetZone.innerHTML = `
        <div class="adw-m-wrap-${bannerId}">
            <div class="adw-m-track-${bannerId}">${slidesHtml}</div>
        </div>
    `;

    // 4. 2초 대기 후 우 -> 좌 슬라이딩 타이머 로직
    var track = targetZone.querySelector('.adw-m-track-' + bannerId);
    var currentIndex = 0;

    setInterval(function() {
        // 다음 이미지 인덱스 계산 (마지막 이미지 다음엔 다시 0번으로)
        currentIndex = (currentIndex + 1) % images.length;
        // 기차 트랙을 왼쪽으로 밀어버림
        var movePercent = currentIndex * (100 / images.length);
        track.style.transform = 'translateX(-' + movePercent + '%)';
    }, 2600); // 2초 정지 + 0.6초 슬라이딩 시간
})();
