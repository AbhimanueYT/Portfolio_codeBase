import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from "gsap";

export class Eye extends THREE.Group {
  private eyeModel?: THREE.Object3D;
  private loadingOverlay?: HTMLDivElement;
  private loadingText?: HTMLDivElement;

  constructor() {
    super();
    this.showLoadingOverlay();
    this.loadEyeModel();
  }

  private showLoadingOverlay() {
    // Only create one overlay per Eye instance
    if (this.loadingOverlay) return;
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(40,40,48,0.92)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '100000';
    overlay.style.transition = 'opacity 0.5s';
    overlay.style.pointerEvents = 'all';

    // Minimal spinner
    const spinner = document.createElement('div');
    spinner.style.width = '36px';
    spinner.style.height = '36px';
    spinner.style.border = '3px solid #bbb';
    spinner.style.borderTop = '3px solid #888';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'eye-spin 0.8s linear infinite';
    spinner.style.marginRight = '16px';

    // Minimal loading text
    const text = document.createElement('div');
    text.style.color = '#bbb';
    text.style.fontSize = '1.1rem';
    text.style.fontWeight = '400';
    text.style.letterSpacing = '1px';
    text.style.textShadow = 'none';
    text.textContent = 'Loading... 0%';

    // Flex row for spinner and text
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.appendChild(spinner);
    row.appendChild(text);
    overlay.appendChild(row);

    // Add spinner keyframes if not present
    if (!document.getElementById('eye-spin-keyframes')) {
      const style = document.createElement('style');
      style.id = 'eye-spin-keyframes';
      style.textContent = `@keyframes eye-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
      document.head.appendChild(style);
    }

    document.body.appendChild(overlay);
    this.loadingOverlay = overlay;
    this.loadingText = text;
  }

  private updateLoadingProgress(percent: number) {
    if (this.loadingText) {
      this.loadingText.textContent = `Loading... ${Math.round(percent)}%`;
    }
  }

  private hideLoadingOverlay() {
    if (this.loadingOverlay) {
      this.loadingOverlay.style.opacity = '0';
      setTimeout(() => {
        this.loadingOverlay?.remove();
        this.loadingOverlay = undefined;
        this.loadingText = undefined;
      }, 500);
    }
  }

  private async loadEyeModel(): Promise<void> {
    // List of all assets to preload
    const assets = [
      // Images
      'src/assets/images/Eye_icon.png',
      'src/assets/images/trip2.jpg',
      'src/assets/images/trip1.jpg',
      'src/assets/images/gym3.jpg',
      'src/assets/images/trip3.jpg',
      'src/assets/images/trip4.jpg',
      'src/assets/images/gym4.jpg',
      'src/assets/images/gym2.jpg',
      'src/assets/images/gym1.jpg',
      'src/assets/images/Eye.jpg',
      // Audio
      'src/assets/audio/audio.mp3',
      // // Models (JSON)
      // 'src/assets/models/Eyes.glb.json',
      // 'src/assets/models/Eye7.glb.json',
      // 'src/assets/models/eye.glb.json',
      // 'src/assets/models/eye2.obj.json',
    ];

    let loaded = 0;
    const total = assets.length + 1; // +1 for the GLB model
    const updateAllProgress = () => {
      this.updateLoadingProgress((loaded / total) * 100);
    };

    // Preload images
    const imagePromises = assets.filter(a => a.match(/\.jpg$|\.png$/)).map(src => {
      return new Promise<void>(resolve => {
        const img = new window.Image();
        img.onload = img.onerror = () => { loaded++; updateAllProgress(); resolve(); };
        img.src = src;
      });
    });
    // Preload audio
    const audioPromises = assets.filter(a => a.match(/\.mp3$/)).map(src => {
      return new Promise<void>(resolve => {
        const audio = new window.Audio();
        audio.oncanplaythrough = audio.onerror = () => { loaded++; updateAllProgress(); resolve(); };
        audio.src = src;
      });
    });
    // Preload JSON models
    const jsonPromises = assets.filter(a => a.match(/\.json$/)).map(src => {
      return fetch(src).then(r => { loaded++; updateAllProgress(); }).catch(() => { loaded++; updateAllProgress(); });
    });

    // Wait for all assets except the GLB model
    await Promise.all([...imagePromises, ...audioPromises, ...jsonPromises]);

    // Now load the GLB model and update progress as it loads
    try {
      const loader = new GLTFLoader();
      loader.load(
        'src/scenes/scene.glb',
        (gltf) => {
          this.add(gltf.scene);
          this.eyeModel = gltf.scene;
          this.eyeModel.scale.set(2, 2, 2);
          this.eyeModel.position.set(0, 0, 0);
          this.eyeModel.rotation.y = Math.PI*1.5;
          loaded++;
          updateAllProgress();
          this.hideLoadingOverlay();
          console.log('Eye model loaded successfully:', gltf);
        },
        (progress) => {
          if (progress.lengthComputable) {
            // Show progress for the last asset
            const percent = (progress.loaded / progress.total) * (100 / total) + (loaded / total) * 100;
            this.updateLoadingProgress(percent);
          }
        },
        (error) => {
          console.error('Error loading GLB/GLTF model:', error);
          loaded++;
          updateAllProgress();
          this.hideLoadingOverlay();
          this.createFallbackEye();
        }
      );
    } catch (error) {
      console.error('Error initializing GLTFLoader:', error);
      loaded++;
      updateAllProgress();
      this.hideLoadingOverlay();
      this.createFallbackEye();
    }
  }

  private createFallbackEye(): void {
    // Create a realistic eye using basic geometries
    const eyeGroup = new THREE.Group();
    // Main eyeball (white part)
    const eyeballGeometry = new THREE.SphereGeometry(1, 32, 32);
    const eyeballMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.0,
      transparent: true,
      opacity: 0.9
    });
    const eyeball = new THREE.Mesh(eyeballGeometry, eyeballMaterial);
    eyeGroup.add(eyeball);
    // Iris (colored part)
    const irisGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const irisMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a4a6b, // Dark blue iris
      roughness: 0.3,
      metalness: 0.1
    });
    const iris = new THREE.Mesh(irisGeometry, irisMaterial);
    iris.position.z = 0.8;
    eyeGroup.add(iris);
    // Pupil (black center)
    const pupilGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const pupilMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.0,
      metalness: 0.0
    });
    const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupil.position.z = 0.95;
    eyeGroup.add(pupil);
    // Add some veins on the eyeball
    const veinGeometry = new THREE.SphereGeometry(1.02, 32, 32);
    const veinMaterial = new THREE.MeshStandardMaterial({
      color: 0xff6666,
      transparent: true,
      opacity: 0.3,
      wireframe: true
    });
    const veins = new THREE.Mesh(veinGeometry, veinMaterial);
    eyeGroup.add(veins);
    this.add(eyeGroup);
    this.eyeModel = eyeGroup;
    // Scale and position the eye appropriately
    this.eyeModel.scale.set(2, 2, 2);
    this.eyeModel.position.set(0, 0, 0);              
    // Rotate 180 degrees on Y axis for initial position
    this.eyeModel.rotation.y = Math.PI*1.5;
    this.hideLoadingOverlay();
  }

  public animateOnScroll(scrollProgress: number): void {
    if (this.eyeModel) {
      // Start from the initial rotation position and add scroll-based rotation
      const baseRotationY = Math.PI * 1.5; // Initial position
      const scrollRotationY = scrollProgress * Math.PI * 2;
      const rotationY = baseRotationY + scrollRotationY;
      const rotationX = Math.sin(scrollProgress * Math.PI * 4) * 0.3;
      
      gsap.to(this.eyeModel.rotation, {
        x: rotationX,
        y: rotationY,
        duration: 0.5,
        ease: 'power2.out'
      });

      // Scale the eye based on scroll
      const scale = 1 + Math.sin(scrollProgress * Math.PI * 2) * 0.2;
      gsap.to(this.eyeModel.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }

  public update(): void {
    if (this.eyeModel) {
      // Subtle breathing animation
      const breathingScale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
      this.eyeModel.scale.setScalar(breathingScale);
      // Subtle rotation
      this.eyeModel.rotation.y += 0.001;
    }
  }
} 