// 1. mySwiper 변수를 DOMContentLoaded 함수 바깥 (전역 또는 상위 스코프)에 선언합니다.
// 초기에는 null로 설정하고, 나중에 초기화합니다.
let mySwiper = null;

document.addEventListener('DOMContentLoaded', function () {
    // 2. Swiper 초기화 시, 위에서 선언한 mySwiper 변수에 할당합니다.
    mySwiper = new Swiper('#web .swiper', {
        // 필수 옵션
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,

        // 자동 재생 옵션
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },

        // 필요한 경우 페이지네이션 (점), 네비게이션 (화살표) 등 추가 가능
        pagination: {
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    // 3. IntersectionObserver 코드를 DOMContentLoaded 내부로 이동하거나,
    // (현재처럼 외부에 두려면) mySwiper가 초기화된 후에 Observer 로직이 실행되도록 순서를 조정합니다.

    // 스크롤 감지 및 자동 재생 제어 로직
    const webSection = document.querySelector('#web');

    // mySwiper가 초기화되었는지 확인 후 Observer를 설정합니다. (DOMContentLoaded 안에서는 보장됨)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // mySwiper가 null이 아닌지 확인하여 에러 방지
            if (mySwiper) {
                if (entry.isIntersecting) {
                    // web 화면이 보일 때 -> 자동 재생 시작
                    mySwiper.autoplay.start();
                    console.log('Swiper Autoplay 시작');
                } else {
                    // web 화면이 안 보일 때 -> 자동 재생 정지
                    mySwiper.autoplay.stop();
                    console.log('Swiper Autoplay 정지');
                }
            }
        });
    }, {
        // 옵션: 뷰포트에 50% 이상 들어왔을 때를 기준으로 하고 싶다면 threshold: 0.5 추가 가능
    });
    // 관찰 시작
    if (webSection) {
        observer.observe(webSection);
    }
});
