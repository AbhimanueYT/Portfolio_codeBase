import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Eye } from '../components/Eye.ts';
import gsap from 'gsap';

export class Scene {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private eye: Eye;
  private scrollProgress: number = 0;
  private backgroundParticles?: THREE.Points;
  private lights: THREE.Light[] = [];

  constructor(container: HTMLElement) {
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 8);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
    container.appendChild(this.renderer.domElement);

    // Controls setup - disable for background effect
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.enabled = false; // Disable manual controls

    // Add lights
    this.setupLights();

    // Add background particles
    this.createBackgroundParticles();

    // Add eyeball
    this.eye = new Eye();
    this.eye.position.set(0, 0, 0);
    this.scene.add(this.eye);

    // Handle window resize
    window.addEventListener('resize', () => this.onWindowResize(container));

    // Add scroll event listener
    this.setupScrollListener();

    // Start animation loop
    this.animate();
  }

  private setupLights(): void {
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    this.scene.add(ambientLight);
    this.lights.push(ambientLight);

    // Main spotlight for dramatic effect
    const spotLight = new THREE.SpotLight(0x646cff, 2.0);
    spotLight.position.set(5, 5, 5);
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 0.2;
    spotLight.castShadow = true;
    this.scene.add(spotLight);
    this.lights.push(spotLight);

    // Fill light for detail
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-3, 3, 3);
    this.scene.add(fillLight);
    this.lights.push(fillLight);

    // Rim light for edge definition
    const rimLight = new THREE.DirectionalLight(0x9f9fff, 0.8);
    rimLight.position.set(0, 0, -5);
    this.scene.add(rimLight);
    this.lights.push(rimLight);

    // Add a subtle point light for extra depth
    const pointLight = new THREE.PointLight(0xff4444, 0.5, 10);
    pointLight.position.set(2, -2, 2);
    this.scene.add(pointLight);
    this.lights.push(pointLight);
  }

  private createBackgroundParticles(): void {
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      colors[i * 3] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
      colors[i * 3 + 2] = 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6
    });

    this.backgroundParticles = new THREE.Points(geometry, material);
    this.scene.add(this.backgroundParticles);
  }

  private setupScrollListener(): void {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress (0 to 1)
      this.scrollProgress = Math.min(scrollTop / (documentHeight - windowHeight), 1);
      
      // Animate the eyeball based on scroll
      this.eye.animateOnScroll(this.scrollProgress);
      
      // Animate camera based on scroll
      this.animateCameraOnScroll();
      
      // Animate lights based on scroll
      this.animateLightsOnScroll();
    });
  }

  private animateCameraOnScroll(): void {
    // More dramatic camera movement for the eye
    const targetX = Math.sin(this.scrollProgress * Math.PI * 2) * 4;
    const targetY = Math.sin(this.scrollProgress * Math.PI * 4) * 3;
    const targetZ = 8 + Math.sin(this.scrollProgress * Math.PI * 2) * 3;

    gsap.to(this.camera.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 0.8,
      ease: 'power3.out'
    });

    // Camera rotation to look at the eye
    const targetRotationY = this.scrollProgress * Math.PI * 0.8;
    const targetRotationX = Math.sin(this.scrollProgress * Math.PI * 2) * 0.2;
    
    gsap.to(this.camera.rotation, {
      x: targetRotationX,
      y: targetRotationY,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  private animateLightsOnScroll(): void {
    // Animate spotlight around the eye
    if (this.lights[1]) {
      const spotLight = this.lights[1] as THREE.SpotLight;
      const intensity = 2.0 + Math.sin(this.scrollProgress * Math.PI * 4) * 0.8;
      spotLight.intensity = intensity;
      
      // Move spotlight in a circle around the eye
      const angle = this.scrollProgress * Math.PI * 2;
      spotLight.position.x = Math.cos(angle) * 6;
      spotLight.position.z = Math.sin(angle) * 6;
      spotLight.position.y = 5 + Math.sin(this.scrollProgress * Math.PI * 3) * 2;
    }

    // Animate rim light intensity
    if (this.lights[3]) {
      const rimLight = this.lights[3] as THREE.DirectionalLight;
      rimLight.intensity = 0.8 + Math.sin(this.scrollProgress * Math.PI * 3) * 0.4;
    }

    // Animate point light
    if (this.lights[4]) {
      const pointLight = this.lights[4] as THREE.PointLight;
      pointLight.intensity = 0.5 + Math.sin(this.scrollProgress * Math.PI * 2) * 0.3;
    }
  }

  private onWindowResize(container: HTMLElement): void {
    this.camera.aspect = container.clientWidth / container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(container.clientWidth, container.clientHeight);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    
    // Animate background particles
    if (this.backgroundParticles) {
      this.backgroundParticles.rotation.y += 0.001;
      this.backgroundParticles.rotation.x += 0.0005;
    }

    // Update eyeball animation
    this.eye.update();

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // Method to add objects to the scene
  public add(object: THREE.Object3D): void {
    this.scene.add(object);
  }

  // Method to get scroll progress
  public getScrollProgress(): number {
    return this.scrollProgress;
  }
} 