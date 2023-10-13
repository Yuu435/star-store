document.addEventListener('DOMContentLoaded', () => {

    // scroll event
    const wrapMenuTop = document.querySelector('.wrap-menu-top');
    const wrapMainMenu = document.querySelector('.wrap-main-menu');

    window.addEventListener('scroll',()=>{
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            wrapMenuTop.style.display = 'none';
            wrapMainMenu.style.height = '65px';
          } else {
            wrapMenuTop.style.display = 'flex';
          }
    })


    // Sidenav push mobile.start 
    const barbtn = document.querySelector(".button-menu");
    const sidenav = document.querySelector(".sidenav");
    const mainContent = document.querySelector(".main-content");
    const overlay = document.querySelector(".color-overlay");
    const closeBtn = document.querySelector(".closeBtn");

    barbtn.addEventListener("click", () => {
        sidenav.classList.toggle("sidenav-open");
        mainContent.classList.toggle("main-content-push");
        if (sidenav.classList.contains("sidenav-open")) {
            overlay.style.display = "block";
        } else {
            overlay.style.display = "none";
        }
    })
    closeBtn.addEventListener("click", () => {
        sidenav.classList.remove("sidenav-open");
        mainContent.classList.remove("main-content-push");
        overlay.style.display = "none";
    });
    overlay.addEventListener('click', () => {
        sidenav.classList.remove("sidenav-open");
        mainContent.classList.remove("main-content-push");
        overlay.style.display = "none";
    })


    // Owl Carousel./start
    $(document).ready(function () {
        $('.owl-carousel').owlCarousel({
            loop: true,
            margin: 0,
            nav: false,
            dots: true,
            autoplay: true,
            autoPlayTimeout: .3,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1
                }
            }
        });
    });


});



