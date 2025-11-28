/**Swiper, IntersectionObserver, Custom Navigation, and Progress Bar Logic Integrated Script**/
// 1. mySwiper 변수를 전역 또는 상위 스코프에 선언
let mySwiper = null;
document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.querySelector('.page_bar');
    const webSection = document.querySelector('#web');
    // --------------------------------------------------------
    // A. Web Section Swiper 초기화 및 이벤트 연결
    // --------------------------------------------------------
    mySwiper = new Swiper('#web .swiper', {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        loop: true,
        autoHeight: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        // 커스텀 네비게이션 버튼 연결
        navigation: {
            nextEl: '#nextBtn',
            prevEl: '#prevBtn',
        },
        // 이벤트 핸들러
        on: {
            //위치 2: 슬라이더 초기화 시 진행률 업데이트 호출
            init: function () {
                updateProgressBar(this);
                startIntroAnimation(); // 다른 애니메이션 시작 함수
            },
            //위치 3: 슬라이드가 바뀐 후 진행률 업데이트 호출
            slideChangeTransitionEnd: function () {
                updateProgressBar(this);
            },
        }
    });
    //슬라이더 컨테이너 요소 변수로 작성
    const swiperContainer = document.querySelector('#web .swiper');
    //마우스를 올렸을 때 자동 재생 멈춤
    swiperContainer.addEventListener('mouseenter', function(){
        mySwiper.autoplay.stop(); 
    })

    // --------------------------------------------------------
    // B. IntersectionObserver 로직 (스크롤 감지 및 자동 재생 제어)
    // --------------------------------------------------------
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (mySwiper) {
                if (entry.isIntersecting) {
                    mySwiper.autoplay.start();
                    console.log('Swiper Autoplay 시작');
                } else {
                    mySwiper.autoplay.stop();
                    console.log('Swiper Autoplay 정지');
                }
            }
        });
    }, {
        threshold: 0.1
    });
    if (webSection) {
        observer.observe(webSection);
    }
    // --------------------------------------------------------
    // C. 커스텀 진행률 바 업데이트 함수 정의 (위치 1)
    // --------------------------------------------------------
    function updateProgressBar(swiperInstance) {
        // 루프 모드 사용 시, 실제 슬라이드 개수(duplicate 제외)와 realIndex를 사용
        const totalRealSlides = swiperInstance.slides.filter(s => !s.classList.contains('swiper-slide-duplicate')).length;
        const realIndex = swiperInstance.realIndex;
        // 진행률 계산: (현재 인덱스 + 1) / 전체 슬라이드 개수 * 100
        const progressWidth = ((realIndex + 1) / totalRealSlides) * 100;
        // 진행률 바 업데이트. 이 부분의 CSS transition 덕분에 부드럽게 채워집니다.
        if (progressBar) {
            progressBar.style.width = `${progressWidth}%`;
        }
    }
    // --------------------------------------------------------
    // D. 기타 초기화 함수 및 다른 Swiper (기존 코드 유지)
    // --------------------------------------------------------
    function startIntroAnimation() {
        // ... (Intro 섹션 애니메이션 로직) ...
    }
    new Swiper('#grophics .swiper', {
        // ... (Graphics Swiper 옵션) ...
        slidesPerView: 'auto',
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        // ...
    });
});