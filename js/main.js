/* =========================================================
   NAVIGATION
========================================================= */

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".content-section");


/* =========================================================
   SMOOTH NAVIGATION
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) {
            return;
        }

        const targetSection = document.querySelector(targetId);

        if (!targetSection) {
            return;
        }

        event.preventDefault();

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});


/* =========================================================
   SCROLL SPY
   Navbar active state is controlled by scroll position
========================================================= */

const updateActiveNav = () => {

    const scrollPosition = window.scrollY;

    let currentSection = "about";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop - 180 &&
            scrollPosition < sectionTop + sectionHeight - 180
        ) {
            currentSection = section.id;
        }

    });


    navLinks.forEach((link) => {

        const targetId = link.getAttribute("href");

        link.classList.toggle(
            "active",
            targetId === `#${currentSection}`
        );

    });

};


/* =========================================================
   SCROLL EVENT
========================================================= */

window.addEventListener(
    "scroll",
    updateActiveNav,
    {
        passive: true
    }
);


/* =========================================================
   INITIAL NAVIGATION STATE
========================================================= */

updateActiveNav();


/* =========================================================
   SCROLL TO TOP BUTTON
========================================================= */

const scrollTopBtn = document.getElementById("scrollTopBtn");


const toggleScrollTopButton = () => {

    if (window.scrollY > 400) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

};


window.addEventListener(
    "scroll",
    toggleScrollTopButton,
    {
        passive: true
    }
);


scrollTopBtn.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        /*
            The form is currently front-end only.
            Later you can connect it to:
            Formspree / EmailJS / Backend API / PHP / Node.js
        */

        const formData = new FormData(contactForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const subject = formData.get("subject");
        const message = formData.get("message");


        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {
            return;
        }


        console.log({
            name,
            email,
            subject,
            message
        });


        alert("Your message has been submitted successfully!");

        contactForm.reset();

    }
);