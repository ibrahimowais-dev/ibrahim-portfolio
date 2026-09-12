/* =========================================================
   EMAILJS INITIALIZATION
========================================================= */
(function () {
    emailjs.init({
        publicKey: "pzaRfwqI8Hx3EXsfm",
    });
})();

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
   CONTACT FORM HANDLER (EmailJS Integration)
========================================================= */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerText : "Send Message";

        const formData = new FormData(contactForm);
        
        const templateParams = {
            from_name: formData.get("from_name"),
            from_email: formData.get("from_email"),
            subject: formData.get("subject"),
            message: formData.get("message")
        };

        if (!templateParams.from_name || !templateParams.from_email || !templateParams.subject || !templateParams.message) {
            alert("Please fill in all required fields.");
            return;
        }

        if (submitBtn) {
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
        }

        const serviceID = "service_opwy5v1";

        const templateID = "template_go6ehmw";

        emailjs.send(serviceID, templateID, templateParams)
            .then((response) => {
                console.log("SUCCESS!", response.status, response.text);
                alert("Your message has been submitted successfully!");
                contactForm.reset();
            })
            .catch((error) => {
                console.error("EmailJS Error Details:", error);
                alert("Failed to send message: " + (error.text || error.status || "Check Console"));
            })
            .finally(() => {
                if (submitBtn) {
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                }
            });
    });
}