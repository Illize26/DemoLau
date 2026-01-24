document.addEventListener("DOMContentLoaded", () => {
    gsap.from(".slide", {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });
});