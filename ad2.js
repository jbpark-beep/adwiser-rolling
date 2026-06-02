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
            /* 3D 효과를 주기 위한 부모 공간 설정 */
            .adw-tilt-wrap-${bannerId} {
                width: ${width}px;
                height: ${height}px;
                margin: 0 auto;
                perspective: 1000px; /* 입체감 깊이 */
            }
            .adw-tilt-container-${bannerId} {
                position: relative;
                width: 100%;
                height: 100%;
                transition: transform 0.15s ease-out;
                transform-style: preserve-3d;
                box-shadow: 0 5px 15px rgba(0,0,0,0.08);
            }
            .adw-tilt-link-${bannerId} {
                display: block;
                width: 100%;
                height: 100%;
            }
            .adw-tilt-img-${bannerId} {
                width: 100%;
                height: 100%;
                object-fit: fill;
                border: 0;
                display: block;
            }
        `;
        document.head.appendChild(style);
    }

    var targetZone = document.getElementById('adwiser_zone_' + bannerId);
    if (targetZone) {
        targetZone.innerHTML = `
            <div class="adw-tilt-wrap-${bannerId}">
                <div class="adw-tilt-container-${bannerId}">
                    <a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="adw-tilt-link-${bannerId}">
                        <img src="${imgUrl}" class="adw-tilt-img-${bannerId}" alt="광고">
                    </a>
                </div>
            </div>
        `;

        // 마우스 움직임 감지 실시간 입체 제어
        var card = targetZone.querySelector('.adw-tilt-container-' + bannerId);
        if (card) {
            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var x = e.clientX - rect.left; // 가로축 마우스 위치
                var y = e.clientY - rect.top;  // 세로축 마우스 위치
                
                var xc = rect.width / 2;
                var yc = rect.height / 2;
                
                // 기울기 각도 계산 (너무 휙휙 돌지 않게 숫자로 나눕니다)
                var angleX = (yc - y) / (yc / 6); 
                var angleY = (x - xc) / (xc / 8);
                
                card.style.transform = 'rotateX(' + angleX + 'deg) rotateY(' + angleY + 'deg) scale(1.02)';
            });

            // 마우스가 나가면 부드럽게 원상복구
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            });
        }
    }
})();
