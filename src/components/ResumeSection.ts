import { resumeData } from '../data/resume';

export class ResumeSection {
  private element: HTMLElement;

  constructor(container: HTMLElement, sectionType: string) {
    this.element = document.createElement('section');
    this.element.className = 'resume-section';
    this.element.setAttribute('data-section', sectionType);
    
    this.renderSection(sectionType);
    container.appendChild(this.element);
  }

  private renderSection(sectionType: string): void {
    switch (sectionType) {
      case 'about':
        this.renderAbout();
        break;
      case 'skills':
        this.renderSkills();
        break;
      case 'experience':
        this.renderExperience();
        break;
      case 'education':
        this.renderEducation();
        break;
      case 'projects':
        this.renderProjects();
        break;
      case 'contact':
        this.renderContact();
        break;
    }
  }

  private renderAbout(): void {
    this.element.innerHTML = `
      <div class="section-content">
        <h2>About Me</h2>
        <div class="about-content">
          <div class="profile-info">
            <h3>${resumeData.personalInfo.name}</h3>
            <p class="title">${resumeData.summary}</p>
            <p class="summary"> Still a student, always a builder — creating smart, human-focused tech from classroom to real-world.</p>
          </div>
        </div>
      </div>
    `;
  }

  private renderSkills(): void {
    function getSkillLabelAndLevel(item: any): { label: string, level: number } {
      if (typeof item === 'string') return { label: item, level: 80 };
      if (typeof item === 'object' && item !== null) {
        return {
          label: item.name || item.label || '',
          level: typeof item.level === 'number' ? item.level : 80
        };
      }
      return { label: String(item), level: 80 };
    }
    this.element.innerHTML = `
      <div class="section-content">
        <h2>Skills & Expertise</h2>
        <div class="skills-dynamic-grid">
          <div class="skill-category">
            <h3>Technical Skills</h3>
            <div class="skill-bars">
              ${resumeData.skills.technical.map(skill => {
                const { label, level } = getSkillLabelAndLevel(skill);
                return `
                  <div class="skill-bar-row" data-level="${level}">
                    <span class="skill-bar-label">${label}</span>
                    <div class="skill-bar-bg">
                      <div class="skill-bar-fill" data-width="${level}"></div>
                      <div class="skill-bar-glow"></div>
                    </div>
                    <span class="skill-bar-percentage">${level}%</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          <div class="skill-category">
            <h3>Tools & Technologies</h3>
            <div class="skill-bars">
              ${resumeData.skills.tools.map(tool => {
                const { label, level } = getSkillLabelAndLevel(tool);
                return `
                  <div class="skill-bar-row" data-level="${level}">
                    <span class="skill-bar-label">${label}</span>
                    <div class="skill-bar-bg">
                      <div class="skill-bar-fill" data-width="${level}"></div>
                      <div class="skill-bar-glow"></div>
                    </div>
                    <span class="skill-bar-percentage">${level}%</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          <div class="skill-category">
            <h3>Languages</h3>
            <div class="skill-bars">
              ${resumeData.skills.languages.map(lang => {
                const { label, level } = getSkillLabelAndLevel(lang);
                return `
                  <div class="skill-bar-row" data-level="${level}">
                    <span class="skill-bar-label">${label}</span>
                    <div class="skill-bar-bg">
                      <div class="skill-bar-fill" data-width="${level}"></div>
                      <div class="skill-bar-glow"></div>
                    </div>
                    <span class="skill-bar-percentage">${level}%</span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    `;

    // Animate skill bars after rendering
    this.animateSkillBars();
  }

  private animateSkillBars(): void {
    // Use Intersection Observer to animate only when section comes into view
    const skillsSection = this.element.querySelector('.skills-dynamic-grid');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start animations when skills section is visible
          this.startSkillBarAnimations();
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, {
      threshold: 0.3, // Trigger when 30% of the section is visible
      rootMargin: '0px 0px -50px 0px' // Start animation slightly before fully in view
    });

    observer.observe(skillsSection);
  }

  private startSkillBarAnimations(): void {
    const skillBars = this.element.querySelectorAll('.skill-bar-row');
    
    skillBars.forEach((bar, index) => {
      const fill = bar.querySelector('.skill-bar-fill') as HTMLElement;
      const percentage = bar.querySelector('.skill-bar-percentage') as HTMLElement;
      const level = parseInt(bar.getAttribute('data-level') || '80');
      
      // Animate the fill width
      setTimeout(() => {
        fill.style.width = `${level}%`;
        
        // Animate percentage number
        let current = 0;
        const increment = level / 30; // Complete in 30 steps
        const timer = setInterval(() => {
          current += increment;
          if (current >= level) {
            current = level;
            clearInterval(timer);
          }
          percentage.textContent = `${Math.round(current)}%`;
        }, 50);
      }, index * 150); // Stagger the animations with longer delay
    });
  }

  private renderExperience(): void {
    this.element.innerHTML = `
      <div class="section-content">
        <h2>Professional Experience</h2>
        <div class="timeline">
          ${resumeData.experience.map(exp => `
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p class="timeline-meta">${exp.duration} • ${exp.location}</p>
                <ul class="timeline-description">
                  ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderEducation(): void {
    this.element.innerHTML = `
      <div class="section-content">
        <h2>Education</h2>
        <div class="education-grid">
          ${resumeData.education.map(edu => `
            <div class="education-item">
              <h3>${edu.degree}</h3>
              <h4>${edu.institution}</h4>
              <p class="education-meta">${edu.duration} • ${edu.location}</p>
              ${edu.gpa ? `<p class="gpa">GPA: ${edu.gpa}</p>` : ''}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderProjects(): void {
    this.element.innerHTML = `
      <div class="section-content">
        <h2>Featured Projects</h2>
        <div class="projects-grid">
          ${resumeData.projects.map(project => `
            <div class="project-card">
              <div class="project-header">
                <h3>${project.name}</h3>
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
              </div>
              <p class="project-description">${project.description}</p>
              <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
              <ul class="project-features">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private renderContact(): void {
    this.element.innerHTML = `
      <div class="section-content">
        <h2>Get In Touch</h2>
        <div class="contact-info">
          <div class="contact-item">
            <span class="contact-icon">📧</span>
            <a href="mailto:${resumeData.personalInfo.email}">${resumeData.personalInfo.email}</a>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📱</span>
            <a href="tel:${resumeData.personalInfo.phone}">${resumeData.personalInfo.phone}</a>
          </div>
          <div class="contact-item">
            <span class="contact-icon">📍</span>
            <span>${resumeData.personalInfo.location}</span>
          </div>
          <div class="contact-item">
            <span class="contact-icon">💼</span>
            <a href="${resumeData.personalInfo.linkedin}" target="_blank">LinkedIn</a>
          </div>
          <div class="contact-item">
            <span class="contact-icon">🐙</span>
            <a href="${resumeData.personalInfo.github}" target="_blank">GitHub</a>
          </div>
        </div>
        <div class="slideshow-trigger stylish-slideshow-trigger"></div>
        <div class="slideshow-modal fullscreen-slideshow-modal" style="display:none;">
          <div class="slideshow-overlay"></div>
          <img class="slideshow-image" src="" alt="Slideshow" />
        </div>
      </div>
    `;

    // --- Slideshow logic ---
    const images = [
      "trip1.jpg",
      "trip2.jpg",
      "trip3.jpg",
      "trip4.jpg",
      "gym1.jpg",
      "gym2.jpg",
      "gym3.jpg",
      "gym4.jpg"
    ].map(name => `src/assets/images/${name}`);

    const trigger = this.element.querySelector('.slideshow-trigger') as HTMLDivElement;
    const modal = this.element.querySelector('.slideshow-modal') as HTMLDivElement;
    const overlay = this.element.querySelector('.slideshow-overlay') as HTMLDivElement;
    const img = this.element.querySelector('.slideshow-image') as HTMLImageElement;

    let current = 0;
    let autoSlideInterval: number | null = null;
    let isTransitioning = false;

    function showImage(idx: number, direction: 'left' | 'right' = 'right') {
      if (isTransitioning) return;
      isTransitioning = true;
      const oldImg = img.cloneNode(true) as HTMLImageElement;
      oldImg.src = img.src;
      oldImg.classList.remove('show');
      oldImg.classList.add('slideshow-image-old');
      modal.appendChild(oldImg);

      // Set up new image
      img.src = images[idx];
      img.classList.remove('show');
      img.style.visibility = 'hidden';

      // Wait for image to load
      img.onload = () => {
        img.style.visibility = '';
        img.classList.add('show');
        img.classList.add(direction === 'right' ? 'slide-in-right' : 'slide-in-left');
        setTimeout(() => {
          img.classList.remove('slide-in-right', 'slide-in-left');
        }, 700);
      };

      // Animate old image out
      if (oldImg.src) {
        oldImg.classList.add(direction === 'right' ? 'slide-out-left' : 'slide-out-right');
        setTimeout(() => {
          oldImg.remove();
          isTransitioning = false;
        }, 700);
      } else {
        isTransitioning = false;
      }
    }

    function openModal() {
      modal.style.display = 'flex';
      showImage(current);
      setTimeout(() => modal.classList.add('active'), 10);
      startAutoSlide();
    }

    function closeModal() {
      modal.classList.remove('active');
      setTimeout(() => modal.style.display = 'none', 400);
      stopAutoSlide();
    }

    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = window.setInterval(() => {
        const prev = current;
        current = (current + 1) % images.length;
        showImage(current, 'right');
      }, 2500);
    }

    function stopAutoSlide() {
      if (autoSlideInterval !== null) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    trigger.onclick = openModal;
    overlay.onclick = closeModal;

    // --- Email popup logic ---
    const emailCard = this.element.querySelector('.contact-item a[href^="mailto:"]')?.parentElement as HTMLDivElement;

    // Create popup elements
    const popup = document.createElement('div');
    popup.className = 'email-popup stylish-email-popup';
    popup.style.display = 'none';
    popup.innerHTML = `
      <div class="email-popup-overlay"></div>
      <div class="email-popup-content">
        <button class="email-popup-close">&times;</button>
        <h3>Send a Message</h3>
        <input type="text" class="email-popup-name" placeholder="Your Name" />
        <textarea class="email-popup-message" placeholder="Your Message"></textarea>
        <button class="email-popup-send stylish-send-btn">Send</button>
        <div class="email-popup-status"></div>
      </div>
    `;
    document.body.appendChild(popup);

    // Show popup on email card click
    emailCard.onclick = (e) => {
      e.preventDefault();
      popup.style.display = 'flex';
      setTimeout(() => popup.classList.add('active'), 10);
    };

    // Close popup
    (popup.querySelector('.email-popup-close') as HTMLButtonElement).onclick = () => {
      popup.classList.remove('active');
      setTimeout(() => popup.style.display = 'none', 400);
    };
    (popup.querySelector('.email-popup-overlay') as HTMLDivElement).onclick = () => {
      popup.classList.remove('active');
      setTimeout(() => popup.style.display = 'none', 400);
    };

    // Send email logic (using EmailJS API as in your reference)
    (popup.querySelector('.email-popup-send') as HTMLButtonElement).onclick = async () => {
      const name = (popup.querySelector('.email-popup-name') as HTMLInputElement).value.trim();
      const message = (popup.querySelector('.email-popup-message') as HTMLTextAreaElement).value.trim();
      const statusDiv = popup.querySelector('.email-popup-status') as HTMLDivElement;

      if (!name || !message) {
        statusDiv.textContent = "Please fill in both fields.";
        statusDiv.style.color = "#ff4d4f";
        return;
      }

      statusDiv.textContent = "Sending...";
      statusDiv.style.color = "#00eaff";

      try {
        const apiUrl = 'https://api.emailjs.com/api/v1.0/email/send';
        const requestBody = JSON.stringify({
          service_id: "your_service_id",
          template_id: "your_template_id",
          user_id: "your_user_id",
          template_params: {
            name: name,
            message: message,
          }
        });

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Origin": window.location.origin,
            "Content-Type": "application/json",
          },
          body: requestBody,
        });

        if (response.status === 200) {
          statusDiv.textContent = "Your Message Has Been Submitted Successfully!";
          statusDiv.style.color = "#00eaff";
          (popup.querySelector('.email-popup-name') as HTMLInputElement).value = "";
          (popup.querySelector('.email-popup-message') as HTMLTextAreaElement).value = "";
        } else {
          statusDiv.textContent = "Failed to send your message. Please try again later.";
          statusDiv.style.color = "#ff4d4f";
        }
      } catch (error) {
        statusDiv.textContent = "Failed to send your message. Please try again later.";
        statusDiv.style.color = "#ff4d4f";
      }
    };
  }

  public getElement(): HTMLElement {
    return this.element;
  }
} 