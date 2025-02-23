const embedEngine = {
    init() {
        embedEngine.binds();
    },
    binds() {
        let scrollToTopBtn = document.querySelector(".scrollup");
        document.querySelectorAll(".embed-button").forEach((e) => {
            e.addEventListener("click", embedEngine.embedBox);
        });

        const menuBtnRef = document.querySelector("[data-menu-button]");
        const mobileMenuRef = document.querySelector("[data-menu]");
        const expanded =
            menuBtnRef.getAttribute("aria-expanded") === "true" || false;

        menuBtnRef.addEventListener("click", () => {
            menuBtnRef.classList.toggle("is-open");
            menuBtnRef.setAttribute("aria-expanded", !expanded);

            mobileMenuRef.classList.toggle("is-open");
            document.body.classList.toggle("is-open");
        });
        mobileMenuRef.addEventListener("click", () => {
            menuBtnRef.classList.toggle("is-open");
            menuBtnRef.setAttribute("aria-expanded", !expanded);

            mobileMenuRef.classList.toggle("is-open");
            document.body.classList.toggle("is-open");
        });

        window.onscroll = function () {
            scrollFunction();
        };

        function scrollFunction() {
            if (
                document.body.scrollTop > 466 ||
                document.documentElement.scrollTop > 466
            ) {
                document.querySelector(".nav").classList.add("nav--sticky");
                scrollToTopBtn.classList.add("showBtn");
            } else {
                document.querySelector(".nav").classList.remove("nav--sticky");
                scrollToTopBtn.classList.remove("showBtn");
            }
        }
        function scrollToTop() {
            document.querySelector(".hero").scrollTo({
                top: 0,
                behavior: "smooth",
            });
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        }
        scrollToTopBtn.addEventListener("click", scrollToTop);
    },
};
document.addEventListener("DOMContentLoaded", embedEngine.init);
