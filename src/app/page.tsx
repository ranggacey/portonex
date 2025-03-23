"use client";
import Head from "next/head";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    // Animasi Ketik & Hapus
    const texts = [
      "Rangga Figo Hidayat",
      "Junior Web Developer",
      "Learner & Coder",
    ];
    let index = 0,
      charIndex = 0,
      isDeleting = false;
    const typingElement = document.getElementById("typing-text");
    function typeText() {
      if (!typingElement) return;
      const currentText = texts[index];
      if (!isDeleting) {
        charIndex++;
        typingElement.textContent = currentText.substring(0, charIndex);
        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeText, 2000);
          return;
        }
      } else {
        charIndex--;
        typingElement.textContent = currentText.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          index = (index + 1) % texts.length;
        }
      }
      setTimeout(typeText, isDeleting ? 50 : 150);
    }
    typeText();

    // Toggle Mobile Menu
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const sidebar = document.getElementById("mobileSidebar");
    const overlay = document.getElementById("overlay");
    const sidebarClose = document.getElementById("sidebarClose");
    function toggleSidebar() {
      sidebar?.classList.toggle("active");
      overlay?.classList.toggle("active");
    }
    mobileMenuBtn?.addEventListener("click", toggleSidebar);
    sidebarClose?.addEventListener("click", toggleSidebar);
    overlay?.addEventListener("click", toggleSidebar);

    // Dropdown Toggle Mobile
    document.querySelectorAll(".dropdown-toggle").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        const dropdownId = this.getAttribute("data-dropdown");
        const dropdown = dropdownId ? document.getElementById(`${dropdownId}Dropdown`) : null;
        const isOpen = dropdown?.classList.contains("active");
        document.querySelectorAll(".sidebar-dropdown").forEach((d) => {
          d.classList.remove("active");
          const icon = d.previousElementSibling?.querySelector("i");
          icon?.classList.remove("fa-chevron-up");
        });
        if (!isOpen && dropdown) {
          dropdown.classList.add("active");
          const icon = this.querySelector("i");
          icon?.classList.add("fa-chevron-up");
        }
      });
    });

    // Close dropdown when clicking outside mobile menu
    document.addEventListener("click", (e) => {
      if (
        !(e.target as HTMLElement).closest(".dropdown-item") &&
        !(e.target as HTMLElement).closest(".mobile-menu-btn")
      ) {
        document.querySelectorAll(".sidebar-dropdown").forEach((d) => {
          d.classList.remove("active");
          const icon = d.previousElementSibling?.querySelector("i");
          icon?.classList.remove("fa-chevron-up");
        });
      }
    });

    // Smooth Scroll untuk anchor link
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = this.getAttribute("href");
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            window.scrollTo({
              top:
                target.getBoundingClientRect().top +
                window.pageYOffset -
                (document.querySelector(".navbar")?.clientHeight || 0),
              behavior: "smooth",
            });
          }
        }
        if (sidebar?.classList.contains("active")) toggleSidebar();
      });
    });

    // Intersection Observer untuk animasi scroll
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    document.querySelectorAll(".hero-content, section").forEach((el) => {
      observer.observe(el);
    });

    // Efek interaktif background hero mengikuti pergerakan mouse
    const heroSection = document.querySelector(".hero");
    heroSection?.addEventListener("mousemove", function (e) {
      const { offsetX, offsetY } = e;
      const xPercent =
        (offsetX / (heroSection as HTMLElement).clientWidth) * 100;
      const yPercent =
        (offsetY / (heroSection as HTMLElement).clientHeight) * 100;
      (heroSection as HTMLElement).style.backgroundPosition = `${xPercent}% ${yPercent}%`;
    });

    // Efek kursor mengikuti pergerakan mouse (trail)
    const mouseMoveHandler = (e: MouseEvent) => {
      const trail = document.createElement("div");
      trail.classList.add("trail");
      trail.style.left = e.pageX + "px";
      trail.style.top = e.pageY + "px";
      document.body.appendChild(trail);
      setTimeout(() => {
        trail.remove();
      }, 20000);
    };
    document.addEventListener("mousemove", mouseMoveHandler);

    // Cleanup
    return () => {
      mobileMenuBtn?.removeEventListener("click", toggleSidebar);
      sidebarClose?.removeEventListener("click", toggleSidebar);
      overlay?.removeEventListener("click", toggleSidebar);
      document.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rangga Figo Hidayat - Portfolio</title>
        {/* CDN untuk Font Awesome & Devicon */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </Head>
      <style jsx global>{`
        /* Reset & Variabel */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: "Inter", system-ui, sans-serif;
        }
        :root {
          --primary: #ffffff;
          --secondary: #000000;
          --accent: rgb(203, 244, 251);
          --nav-height: 70px;
          --sidebar-width: 280px;
        }
        body {
          background: var(--secondary);
          color: var(--primary);
          overflow-x: hidden;
        }
        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--nav-height);
          background: var(--secondary);
          display: flex;
          align-items: center;
          padding: 0 5%;
          z-index: 1000;
          border-bottom: 1px solid var(--accent);
        }
        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }
        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          font-weight: 700;
        }
        .logo-text {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary);
        }
        .nav-desktop {
          display: flex;
          margin-left: auto;
          gap: 2rem;
          align-items: center;
        }
        .nav-desktop > ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
        }
        .nav-item {
          position: relative;
          padding: 12px 0;
        }
        .nav-link {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          padding: 8px 12px;
          border-radius: 8px;
        }
        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .nav-link i {
          font-size: 0.8rem;
          transition: transform 0.3s ease;
        }
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          background: var(--secondary);
          min-width: 240px;
          padding: 1rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          top: calc(100% + 5px);
        }
        .dropdown-menu a {
          display: block;
          padding: 0.8rem 1rem;
          color: var(--primary);
          text-decoration: none;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .dropdown-menu a:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--primary);
          font-size: 1.5rem;
          cursor: pointer;
          margin-left: auto;
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: -100%;
          width: var(--sidebar-width);
          height: 100vh;
          background: var(--secondary);
          padding: 2rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 2000;
          overflow-y: auto;
        }
        .sidebar.active {
          left: 0;
        }
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .sidebar-close {
          background: none;
          border: none;
          color: var(--primary);
          font-size: 1.5rem;
          cursor: pointer;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          color: var(--primary);
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .dropdown-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sidebar-dropdown {
          max-height: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          padding-left: 1rem;
        }
        .sidebar-dropdown.active {
          max-height: 500px;
        }
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1500;
        }
        .overlay.active {
          opacity: 1;
          visibility: visible;
        }
        .hero {
          position: relative;
          min-height: 100vh;
          padding-top: var(--nav-height);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          padding: 0 5%;
          background: url("your-background-image-url.jpg") center/cover no-repeat;
          overflow: hidden;
        }
        .hero::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        .hero-content.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .profile-img {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          border: 4px solid var(--accent);
          box-shadow: 0 0 20px var(--accent);
          margin-bottom: 1rem;
          animation: float 6s ease-in-out infinite;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .typing-container {
          min-height: 80px;
          margin-bottom: 1rem;
        }
        #typing-text {
          font-size: 2.8rem;
          font-weight: 700;
          color: var(--accent);
          border-right: 2px solid var(--accent);
          white-space: nowrap;
          overflow: hidden;
          text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent);
        }
        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: var(--primary);
          text-shadow: 0 0 5px var(--accent);
        }
        .btn-primary {
          background: var(--accent);
          color: var(--secondary);
          padding: 0.8rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: #e0e0e0;
          transform: scale(1.05);
        }
        .tech {
          padding: 4rem 5%;
          text-align: center;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        .tech.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .tech .section-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
          color: var(--primary);
          text-shadow: 0 0 5px var(--accent);
        }
        .tech-stack {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: transform 0.3s ease, filter 0.3s ease;
          cursor: pointer;
        }
        .tech-item:hover {
          transform: translateY(-5px) scale(1.05);
          filter: drop-shadow(0 0 10px var(--accent));
        }
        .tech-icon {
          font-size: 3rem;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }
        section {
          padding: 4rem 5%;
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease-out;
        }
        section.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .section-title {
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2rem;
          font-weight: 700;
          color: var(--primary);
          text-shadow: 0 0 5px var(--accent);
        }
        .about,
        .projects,
        .contact {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .projects ul {
          list-style: none;
          margin-top: 2rem;
          text-align: left;
          padding: 0 1rem;
        }
        .projects li {
          margin-bottom: 1rem;
        }
        footer {
          background: var(--secondary);
          padding: 2rem 5%;
          text-align: center;
          border-top: 1px solid var(--accent);
        }
        footer p {
          font-size: 0.9rem;
          color: var(--primary);
        }
        /* Media Query untuk Mobile */
        @media (max-width: 1024px) {
          .nav-desktop {
            display: none;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .sidebar {
            width: 100%;
            max-width: 320px;
          }
          .hero-content h1 {
            font-size: 2.5rem;
          }
          .hero-content p {
            font-size: 1rem;
          }
          #typing-text {
            font-size: 2rem;
          }
          .profile-img {
            width: 150px;
            height: 150px;
          }
        }
      `}</style>
      <header>
        <nav className="navbar">
          <a href="#" className="logo-wrapper">
            <div className="logo-icon">R</div>
            <span className="logo-text">Ranggacey</span>
          </a>
          <div className="nav-desktop">
            <ul>
              <li className="nav-item">
                <a href="#hero" className="nav-link">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">
                  About
                </a>
              </li>
              <li className="nav-item dropdown">
                <a href="#" className="nav-link">
                  Projects <i className="fas fa-chevron-down"></i>
                </a>
                <div className="dropdown-menu">
                  <a href="#">Web Development</a>
                  <a href="#">Mobile Apps</a>
                  <a href="#">UI/UX Design</a>
                </div>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <button className="mobile-menu-btn" id="mobileMenuBtn">
            <i className="fas fa-bars"></i>
          </button>
        </nav>
        <div className="sidebar" id="mobileSidebar">
          <div className="sidebar-header">
            <a href="#" className="logo-wrapper">
              <div className="logo-icon">R</div>
              <span className="logo-text">Ranggacey</span>
            </a>
            <button className="sidebar-close" id="sidebarClose">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <nav className="sidebar-nav">
            <a href="#hero" className="sidebar-link">
              Home
            </a>
            <a href="#about" className="sidebar-link">
              About
            </a>
            <div className="dropdown-item">
              <a
                href="#"
                className="sidebar-link dropdown-toggle"
                data-dropdown="projects"
              >
                Projects <i className="fas fa-chevron-down"></i>
              </a>
              <div className="sidebar-dropdown" id="projectsDropdown">
                <a href="#" className="sidebar-link">
                  Web Development
                </a>
                <a href="#" className="sidebar-link">
                  Mobile Apps
                </a>
                <a href="#" className="sidebar-link">
                  UI/UX Design
                </a>
              </div>
            </div>
            <a href="#contact" className="sidebar-link">
              Contact
            </a>
          </nav>
        </div>
        <div className="overlay" id="overlay"></div>
      </header>
      <main>
        <section className="hero" id="hero">
          <div className="hero-content">
            <img
              src="rangga.png"
              alt="Rangga Figo Hidayat"
              className="profile-img"
            />
            <div className="typing-container">
              <h1>
                <span id="typing-text"></span>
              </h1>
            </div>
            <p>
              Hi, I'm Rangga Figo Hidayat – a Junior Web Developer passionate about modern,
              responsive & interactive websites.
            </p>
            <a href="#about" className="btn-primary">
              Discover More
            </a>
          </div>
        </section>
        <section className="about" id="about">
          <h2 className="section-title">About Me</h2>
          <p>
            Saya adalah seorang Junior Web Developer yang selalu haus akan pengetahuan baru.
            Meskipun pengalaman saya masih terbatas, saya bersemangat untuk belajar dan mengembangkan
            skill dalam menciptakan website modern dan interaktif. Saya menguasai dasar-dasar HTML, CSS,
            dan JavaScript serta sedang mendalami PHP dan Laravel.
          </p>
        </section>
        <section className="projects" id="projects">
          <h2 className="section-title">Projects</h2>
          <p>
            Berikut adalah beberapa projek yang telah saya kerjakan sebagai bagian dari proses pembelajaran
            dan pengembangan skill:
          </p>
          <ul
            style={{
              listStyle: "none",
              marginTop: "2rem",
              textAlign: "left",
              maxWidth: "800px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <li style={{ marginBottom: "1rem" }}>
              <strong>Portfolio Website</strong> – Website portofolio pribadi menggunakan HTML, CSS,
              dan JavaScript.
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Landing Page Produk</strong> – Halaman promosi produk digital dengan desain interaktif.
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <strong>Web App Sederhana</strong> – Aplikasi web menggunakan PHP dan MySQL sebagai backend.
            </li>
          </ul>
        </section>
        <section className="tech" id="tech">
          <h2 className="section-title">Tech Stack</h2>
          <p>Saya familiar dengan berbagai teknologi berikut:</p>
          <div className="tech-stack">
            <div className="tech-item">
              <i className="devicon-html5-plain tech-icon"></i>
              <span>HTML5</span>
            </div>
            <div className="tech-item">
              <i className="devicon-css3-plain tech-icon"></i>
              <span>CSS3</span>
            </div>
            <div className="tech-item">
              <i className="devicon-javascript-plain tech-icon"></i>
              <span>JavaScript</span>
            </div>
            <div className="tech-item">
              <i className="devicon-php-plain tech-icon"></i>
              <span>PHP</span>
            </div>
            <div className="tech-item">
              <i className="devicon-laravel-plain tech-icon"></i>
              <span>Laravel</span>
            </div>
          </div>
        </section>
        <section className="contact" id="contact">
          <h2 className="section-title">Contact</h2>
          <p>
            Jika kamu memiliki pertanyaan atau ingin bekerja sama, jangan ragu untuk menghubungi saya!
          </p>
          <button
            className="btn-primary"
            onClick={() =>
              (window.location.href =
                "mailto:ranggadanceyong@gmail.com?subject=Portfolio Inquiry")
            }
          >
            Contact Me
          </button>
        </section>
      </main>
      <footer>
        <p>&copy; 2025 Ranggacey. All rights reserved.</p>
      </footer>
    </>
  );
}
