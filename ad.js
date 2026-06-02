(function() {
    // 임대 시스템의 코드 변형을 방지하기 위해 글로벌 바구니(Cache) 데이터를 읽습니다.
    window.adwCache = window.adwCache || [];
    if (window.adwCache.length === 0) return;

    // 바구니에서 가장 먼저 대기 중인 광고 데이터를 꺼냅니다.
    var config = window.adwCache.shift();

    var images = config.images.filter(Boolean);
    var linkUrl = config.link;
    var width = config.width || '970';
    var height = config.height || '96';
    var bannerId = config.id || Math.random().toString(36).substr(2, 9);

    if (images.length === 0) return;

    // 슬라이더 스타일(CSS) 자동 생성
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
            .adw-m-track-${bannerId} {
                display: flex;
                width: ${images.length * 100}%;
                height: 100%;
                transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
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

    // 광고가 그려질 고유 구역 타겟팅
    var targetZone = document.getElementById('adwiser_zone_multi_' + bannerId);
    if (!targetZone) return; // 자리를 못 찾으면 에러 방지를 위해 종료

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

    // 롤링 작동 타이머 (2초 대기 후 슬라이드)
    var track = targetZone.querySelector('.adw-m-track-' + bannerId);
    var currentIndex = 0;

    setInterval(function() {
        currentIndex = (currentIndex + 1) % images.length;
        var movePercent = currentIndex * (100 / images.length);
        if (track) {
            track.style.transform = 'translateX(-' + movePercent + '%)';
        }
    }, 2600);
})();
