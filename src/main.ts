import './styles/style.css'
import { Scene } from './scenes/Scene.ts'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { resumeData } from './data/resume.ts'
import { ResumeSection } from './components/ResumeSection.ts'
import { showEyeIntro } from "./components/EyeIntro";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Create main container
const app = document.querySelector<HTMLDivElement>('#app')!
app.innerHTML = `
  <div class="container">
    <div class="hero-section">
      <div class="content">
        <h1 class="title">${resumeData.personalInfo.name}</h1>
        <p class="subtitle">${resumeData.personalInfo.title}</p>
        <p class="scroll-hint">Scroll down!</p>
      </div>
      <div id="scene-container"></div>
    </div>
    
    <div class="scroll-sections" id="resume-sections">
      <!-- Resume sections will be dynamically generated here -->
    </div>
  </div>
`

// Initialize 3D scene
const sceneContainer = document.querySelector<HTMLDivElement>('#scene-container')!
const scene = new Scene(sceneContainer)

// Ensure scene is not garbage collected
// @ts-ignore
window.__scene = scene

// Create resume sections dynamically
const resumeContainer = document.querySelector<HTMLDivElement>('#resume-sections')!
const sections = ['about', 'skills', 'experience', 'education', 'projects', 'contact']

sections.forEach(sectionType => {
  new ResumeSection(resumeContainer, sectionType)
})

// Add initial animations
gsap.from('.title', {
  opacity: 0,
  y: 100,
  duration: 1.5,
  ease: 'power4.out'
})

gsap.from('.subtitle', {
  opacity: 0,
  y: 50,
  duration: 1.5,
  delay: 0.5,
  ease: 'power4.out'
})

gsap.from('.scroll-hint', {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 1,
  ease: 'power2.out'
})

// Add scroll-triggered animations for resume sections
gsap.utils.toArray('.resume-section').forEach((section: any) => {
  gsap.from(section, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  })
})

// Add staggered animations for skill tags
gsap.utils.toArray('.skill-tag').forEach((tag: any, index: number) => {
  gsap.from(tag, {
    opacity: 0,
    scale: 0,
    duration: 0.3,
    delay: index * 0.05,
    ease: 'back.out(1.7)',
    scrollTrigger: {
      trigger: tag,
      start: 'top 90%',
      toggleActions: 'play none none reverse'
    }
  })
})

// Add timeline animations for experience
gsap.utils.toArray('.timeline-item').forEach((item: any, index: number) => {
  gsap.from(item, {
    opacity: 0,
    x: -50,
    duration: 0.6,
    delay: index * 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: item,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
})

// Add project card animations
gsap.utils.toArray('.project-card').forEach((card: any, index: number) => {
  gsap.from(card, {
    opacity: 0,
    y: 30,
    duration: 0.6,
    delay: index * 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    }
  })
})

// Show the intro, then load the main app
showEyeIntro(() => {
  // Redirect to main page (or initialize your Three.js scene)
  // For redirect:
  // window.location.href = "/main.html"; // or your main route

  // If you want to just show your main content:
  document.getElementById("app")!.style.display = "block";
});
