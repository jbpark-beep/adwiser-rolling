(function() {
    var currentScript = document.currentScript || (function() {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    var imgUrl = currentScript.getAttribute('data-img');
    var linkUrl = currentScript.getAttribute('data-link');
    var width = currentScript.getAttribute('data-width') || '970';
    var height = currentScript.getAttribute('data-height') || '96';
    var bannerId = currentScript.getAttribute('data-id') || Math.random().toString(36).substr(2, 9);

    if (!imgUrl) return; 

    var styleId = 'adwiser-style-' + bannerId;
    if (!document.getElementById(styleId)) {
        var style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
            .adw-container-${bannerId} {
                position: relative;
                width: ${width}px;
                height: ${height}px;
                overflow: hidden;
                margin: 0 auto;
            }
            .adw-link-${bannerId} {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
                text-decoration: none;
            }
            .adw-img-${bannerId} {
                width: 100%;
                height: 100%;
                object-fit: fill;
                border: 0;
            }
            /* 1. 고급스러운 대각선 광택 효과 */
            .adw-container-${bannerId}::after {
                content: '';
                position: absolute;
                top: 0;
                left: -150%;
                width: 50%;
                height: 100%;
                background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%);
                transform: skewX(-25deg);
                animation: adwShine-${bannerId} 3.5s infinite ease-in-out;
            }
            /* 2. 가상 가독성 CTA 버튼 오버레이 */
            .adw-btn-${bannerId} {
                position: absolute;
                right: 15px;
                bottom: calc(50% - 15px); /* 세로 중앙 정렬 */
                transform: translateY(50%);
                background-color: #ff3b30; /* 정열의 레드 (원하는 색상 변경 가능) */
                color: #ffffff;
                padding: 6px 14px;
                font-size: 12px;
                font-weight: bold;
                border-radius: 20px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.2);
                animation: adwPulse-${bannerId} 1.5s infinite ease-in-out;
                font-family: sans-serif;
                pointer-events: none; /* 클릭은 배너 전체가 먹히도록 설정 */
            }
            /* 애니메이션 정의 */
            @keyframes adwShine-${bannerId} {
                0% { left: -150%; }
                15% { left: 150%; }
                100% { left: 150%; }
            }
            @keyframes adwPulse-${bannerId} {
                0% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
                50% { transform: scale(1.08); box-shadow: 0 6px 12px rgba(255,59,48,0.5); }
                100% { transform: scale(1); box-shadow: 0 4px 6px rgba(0,0,0,0.2); }
            }
        `;
        document.head.appendChild(style);
    }

    var targetZone = document.getElementById('adwiser_zone_' + bannerId);
    if (targetZone) {
        targetZone.innerHTML = `
            <div class="adw-container-${bannerId}">
                <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="adw-link-${bannerId}">
                    <img src="${imgUrl}" class="adw-img-${bannerId}" alt="광고">
                    <div class="adw-btn-${bannerId}">자세히 보기 ➔</div>
                </a>
            </div>
        `;
    }
})();