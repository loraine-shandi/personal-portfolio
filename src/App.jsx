import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
    const navbar = document.getElementById('navbar');
    const hero = document.querySelector('.hero');
    const skillTags = document.querySelectorAll('.skill-tag');

    // Mobile Menu Toggle
    const toggleMenu = () => {
      mobileMenuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    mobileMenuToggle?.addEventListener('click', toggleMenu);

    // Close on mobile nav link click
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });

    // Close when clicking outside
    const handleClickOutside = (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    };
    document.addEventListener('click', handleClickOutside);

    // Escape key
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Navbar Scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Parallax Effect
    let ticking = false;
    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
      }
      ticking = false;
    };
    const onParallaxScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onParallaxScroll);

    // Animate on scroll (Intersection Observer)
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -80px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    const portfolioObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.portfolio-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate');
            }, index * 150);
          });
        }
      });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    const portfolioSection = document.querySelector('.portfolio-grid');
    if (portfolioSection) {
      portfolioObserver.observe(portfolioSection);
    }

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });

    // Skill tag hover effect
    skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        tag.style.transform = 'translateY(-2px) scale(1.05)';
      });
      tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn?.textContent;

    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!submitBtn) return;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.style.background = 'linear-gradient(135deg, #94a3b8, #64748b)';

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        submitBtn.style.transform = 'scale(1.05)';
        setTimeout(() => {
          submitBtn.style.transform = 'scale(1)';
        }, 200);

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 2000);
    });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', onParallaxScroll);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
  {/* Navigation */}
  <nav id="navbar">
    <div className="nav-container">
      <div className="logo">Personal Portfolio</div>
      <ul className="nav-links">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#portfolio">Portfolio</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="mobile-menu-toggle" id="mobileMenuToggle">
        <div className="hamburger" />
        <div className="hamburger" />
        <div className="hamburger" />
      </div>
    </div>
  </nav>
  {/* Mobile Menu */}
  <div className="mobile-menu" id="mobileMenu">
    <ul className="mobile-nav-links">
      <li>
        <a href="#home">Home</a>
      </li>
      <li>
        <a href="#about">About</a>
      </li>
      <li>
        <a href="#portfolio">Portfolio</a>
      </li>
      <li>
        <a href="#contact">Contact</a>
      </li>
    </ul>
  </div>
  {/* Hero Section */}
  <section id="home" className="hero">
    <div className="floating-shapes">
      <div className="shape shape-1" />
      <div className="shape shape-2" />
      <div className="shape shape-3" />
      <div className="shape shape-4" />
      <div className="shape shape-5" />
      <div className="shape shape-6" />
    </div>
    <div className="hero-content">
      <div className="hero-subtitle">UI/UX</div>
      <h1>Learning, Designing, and Growing</h1>
      <p className="subtitle">
        I’m a beginner UI/UX designer passionate about learning and improving my craft. 
        I enjoy creating designs that make digital experiences smoother and more enjoyable for users.
      </p>
      <a href="#portfolio" className="cta-button">
        Explore My Work
      </a>
    </div>
    <div
      className="scroll-indicator"
      onclick="document.getElementById('about').scrollIntoView()"
    />
  </section>
  {/* About Section */}
  <section id="about" className="about">
    <div className="container">
      <h2 className="section-title fade-in">About Me</h2>
      <div className="about-content">
        <div className="about-image slide-in-left" />
        <div className="about-text slide-in-right">
          <h3>Passionate about creating meaningful digital experiences</h3>
          <p>
            I’m a third-year Bachelor of Science in Information Systems student who loves technology, creativity, and learning new things. 
            My studies have helped me understand both the technical and business sides of computing — including programming, web development, and digital design.
          </p>
          <p>
            I have basic knowledge of some programming languages and tools, and I’m
          continually working on improving my technical and soft skills. While I once
          dreamed of becoming an engineering student, my experiences in the Information
          Systems program have taught me the importance of adaptability, problem-solving,
          and teamwork in creating innovative digital solutions.
          </p>
          <p>
            As an aspiring professional, I am eager to further develop my leadership and
          documentation skills while collaborating with others to design and implement
          efficient, user-centered systems. I believe that learning is a lifelong process,
          and I strive to grow with every challenge I encounter.
          </p>
          <h4>Connect with Me</h4>
            <div className="skills">
              <a
                href="https://github.com/loraine-shandi"
                target="_blank"
                rel="noopener noreferrer"
                className="skill-tag"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shandi-belen-3a5566302"
                target="_blank"
                rel="noopener noreferrer"
                className="skill-tag"
              >
                LinkedIn
              </a>
              <a
                href="mailto:shandiloraine@gmail.com"
                className="skill-tag"
              >
                Email
              </a>
            
            </div>

          {/* <div className="skills">
            <span className="skill-tag">UI/UX Design</span>
            <span className="skill-tag">Web Development</span>
            <span className="skill-tag">Brand Identity</span>
            <span className="skill-tag">Motion Graphics</span>
            <span className="skill-tag">Prototyping</span>
            <span className="skill-tag">Design Systems</span>
          </div> */}
        </div>
      </div>
    </div>
  </section>
  {/* Portfolio Section */}
  <section id="portfolio" className="portfolio">
    <div className="container">
      <h2 className="section-title fade-in">Featured Work</h2>
      <div className="portfolio-grid">
        <div className="portfolio-item">
          <div className="portfolio-image" />
          <div className="portfolio-content">
            <h4>Attendance Monitoring</h4>
            <p>
              The Instructor-Centered Classroom Monitoring System helps teachers manage attendance and records digitally. 
              It gives instructors control, lets students view updates, and 
              keeps records organized and transparent while saving time and paper.
            </p>
            
          </div>
        </div>
        <div className="portfolio-item">
          <div className="portfolio-image" />
          <div className="portfolio-content">
            <h4>Personal Task Management</h4>
            <p>
              The Personal Task Management System helps users organize and track their daily tasks and goals.
              It allows adding, editing, and marking tasks as complete, helping manage time efficiently. 
              The system promotes productivity by keeping all tasks in one place and reminding users of deadlines.
            </p>
            
          </div>
        </div>
       
      </div>
    </div>
  </section>
  {/* Contact Section */}
  <section id="contact" className="contact">
    <div className="contact-floating-shapes">
      <div className="contact-shape contact-shape-1" />
      <div className="contact-shape contact-shape-2" />
      <div className="contact-shape contact-shape-3" />
      <div className="contact-shape contact-shape-4" />
      <div className="contact-shape contact-shape-5" />
      <div className="contact-shape contact-shape-6" />
    </div>
    <div className="container">
      <div className="contact-content">
        <h2 className="section-title fade-in">Let's Work Together</h2>
        <p className="fade-in">
          Ready to bring your vision to life? Let's discuss how we can create
          something amazing together. I'm always excited to take on new
          challenges and collaborate on innovative projects.
        </p>
        <form className="contact-form fade-in">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your full name"
                required=""
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required=""
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="What's this about?"
              required=""
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={6}
              placeholder="Tell me about your project..."
              required=""
              defaultValue={""}
            />
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-left">
          <p>© 2025 Personal Shape. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Use</a>
          <a href="#sitemap">Sitemap</a>
          <a
            href="https://templatemo.com"
            target="_blank"
            rel="noopener nofollow"
          >
            Provided by TemplateMo
          </a>
        </div>
      </div>
    </div>
  </footer>
</>

  );
}

export default App;
