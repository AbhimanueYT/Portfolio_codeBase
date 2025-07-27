import gsap from "gsap";

export function showEyeIntro(onComplete: () => void) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "linear-gradient(135deg, #181a20 0%, #23262f 100%)";
  overlay.style.backdropFilter = "blur(2px)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "9999";
  overlay.style.overflow = "hidden";

  // Create eye image
  const eye = document.createElement("img");
  eye.src = "src/assets/images/Eye.jpg";
  eye.alt = "Eye";
  eye.title = "Main page";
  eye.style.width = "260px";
  eye.style.height = "260px";
  eye.style.borderRadius = "50%";
//   eye.style.boxShadow = "0 4px 32px 0 #00eaff33, 0 0 0 2px #fff2";
  eye.style.objectFit = "cover";
  eye.style.transition = "box-shadow 0.3s";
  eye.style.cursor = "pointer";
  eye.style.filter = "contrast(1) saturate(0.5) drop-shadow(0 0 12px #00eaff55)";

  // Futuristic scanline effect (more subtle)
  const scanline = document.createElement("div");
  scanline.style.position = "absolute";
  scanline.style.top = "0";
  scanline.style.left = "0";
  scanline.style.width = "100vw";
  scanline.style.height = "100vh";
  scanline.style.pointerEvents = "none";
  scanline.style.background = "repeating-linear-gradient(180deg, transparent, transparent 10px, #00eaff08 12px, transparent 14px)";
  scanline.style.opacity = "0.3";

  // Create speaker icon (minimalist)
  const speaker = document.createElement("button");
  speaker.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="5 9 9 9 13 5 13 19 9 15 5 15 5 9"></polygon>
      <path d="M17 9a4 4 0 0 1 0 6"></path>
      <path d="M19 5a8 8 0 0 1 0 14"></path>
    </svg>
  `;
  speaker.title = "With music";
  speaker.style.position = "static";
  speaker.style.margin = "0";
  speaker.style.background = "rgba(36,37,42,0.7)";
  speaker.style.border = "none";
  speaker.style.borderRadius = "50%";
  speaker.style.padding = "10px";
  speaker.style.cursor = "pointer";
  speaker.style.boxShadow = "0 2px 8px 0 #00eaff22";
  speaker.style.zIndex = "10000";
  speaker.style.transition = "background 0.2s, box-shadow 0.2s";
  speaker.onmouseenter = () => {
    speaker.style.background = "#23262f";
    speaker.style.boxShadow = "0 2px 16px 0 #00eaff44";
  };
  speaker.onmouseleave = () => {
    speaker.style.background = "rgba(36,37,42,0.7)";
    speaker.style.boxShadow = "0 2px 8px 0 #00eaff22";
  };

  // Create scroll down icon (double chevron down, minimalist)
  const auto = document.createElement("button");
  auto.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="7 13 12 18 17 13"></polyline>
      <polyline points="7 6 12 11 17 6"></polyline>
    </svg>
  `;
  auto.title = "Auto-scroll with music";
  auto.style.position = "static";
  auto.style.margin = "0";
  auto.style.background = "rgba(36,37,42,0.7)";
  auto.style.border = "none";
  auto.style.borderRadius = "50%";
  auto.style.padding = "10px";
  auto.style.cursor = "pointer";
  auto.style.boxShadow = "0 2px 8px 0 #00eaff22";
  auto.style.zIndex = "10000";
  auto.style.transition = "background 0.2s, box-shadow 0.2s";
  auto.onmouseenter = () => {
    auto.style.background = "#23262f";
    auto.style.boxShadow = "0 2px 16px 0 #00eaff44";
  };
  auto.onmouseleave = () => {
    auto.style.background = "rgba(36,37,42,0.7)";
    auto.style.boxShadow = "0 2px 8px 0 #00eaff22";
  };

  // Create a container for the icons below the eye
  const iconContainer = document.createElement("div");
  iconContainer.style.display = "flex";
  iconContainer.style.gap = "200px";
  iconContainer.style.position = "absolute";
  iconContainer.style.top = "calc(50% + 270px)"; // 170px below the center (eye is 260px tall)
  iconContainer.style.left = "50%";
  iconContainer.style.transform = "translate(-50%, 0)";
  iconContainer.style.zIndex = "10001";

  // Add icons to the container
  iconContainer.appendChild(speaker);
  iconContainer.appendChild(auto);

  // Add elements
  overlay.appendChild(eye);
  overlay.appendChild(scanline);
  overlay.appendChild(iconContainer);
  document.body.appendChild(overlay);

  // Animate in
  gsap.fromTo(
    eye,
    { scale: 0.7, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
  );
  gsap.fromTo(
    scanline,
    { opacity: 0 },
    { opacity: 0.3, duration: 1.2, ease: "power3.out" }
  );
  gsap.fromTo(
    speaker,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, delay: 0.5, ease: "back.out(1.7)" }
  );
  gsap.fromTo(
    auto,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, delay: 0.7, ease: "back.out(1.7)" }
  );

  // Animate scanline movement
  gsap.to(scanline, {
    backgroundPositionY: "100px",
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "sine.inOut"
  });

  // Audio element
  const audio = document.createElement("audio");
  audio.src = "src/assets/audio/audio.mp3"; // Use /audio.mp3 if in public, or adjust path as needed
  audio.loop = true;

  // Disable scroll on intro
  const originalOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  // On click: animate out and call onComplete
  function exitIntro() {
    gsap.to(eye, {
      scale: 1.2,
      opacity: 0,
      duration: 0.7,
      ease: "power3.in"
    });
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.7,
      delay: 0.3,
      onComplete: () => {
        overlay.remove();
        document.body.style.overflow = originalOverflow; // Restore scroll
        onComplete();
      }
    });
  }

  eye.onclick = () => {
    gsap.to(eye, {
      filter: "contrast(1.1) saturate(1)",
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: exitIntro
    });
  };

  speaker.onclick = () => {
    audio.play();
    gsap.to(eye, {
      filter: "contrast(1.1) saturate(1)",
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: exitIntro
    });
  };

  // Auto-scroll logic
  let autoScrollActive = false;
  let autoScrollRAF: number | null = null;

  function autoScrollStep() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollY < maxScroll) {
      window.scrollBy(0, 1); // Minimal speed: 1px per frame
      autoScrollRAF = requestAnimationFrame(autoScrollStep);
    } else {
      autoScrollActive = false;
      autoScrollRAF = null;
      exitIntro();
    }
  }

  auto.onclick = () => {
    audio.play();
    
    // First scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Wait for scroll to top to complete, then start auto-scroll
    setTimeout(() => {
      autoScrollActive = true;
      autoScrollStep();
    }, 1000); // Wait 1 second for smooth scroll to complete
    
    gsap.to(eye, {
      filter: "contrast(1.1) saturate(1)",
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: exitIntro
    });
  };

  // Utility: Add ripple effect to a button
  function addRippleEffect(button: HTMLButtonElement) {
    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.addEventListener("click", function (e) {
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height) * 1.5;
      ripple.style.position = "absolute";
      ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.background = "rgba(0,234,255,0.25)";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";
      ripple.style.transform = "scale(0)";
      ripple.style.opacity = "1";
      ripple.style.transition = "transform 0.5s, opacity 0.7s";
      ripple.className = "ripple-effect";
      button.appendChild(ripple);
      setTimeout(() => {
        ripple.style.transform = "scale(1)";
        ripple.style.opacity = "0";
      }, 10);
      setTimeout(() => {
        ripple.remove();
      }, 700);
    });
  }

   // Heartbeat glow effect for the eye
  const eyeGlow = document.createElement("div");
  eyeGlow.style.position = "absolute";
  eyeGlow.style.top = "50%";
  eyeGlow.style.left = "50%";
  eyeGlow.style.transform = "translate(-50%, -50%)";
  eyeGlow.style.width = "258px";   // Reduced from 320px
  eyeGlow.style.height = "258px";  // Reduced from 320px
  eyeGlow.style.borderRadius = "50%";
  eyeGlow.style.pointerEvents = "none";
  eyeGlow.style.zIndex = "2";
  eyeGlow.style.boxShadow = "0 0 32px 8px rgba(255, 255, 255, 0.8), 0 0 0 0 rgba(119, 0, 255, 0.33)"; // Reduced blur and spread
  overlay.appendChild(eyeGlow);

  // Animate heartbeat glow for the eye
  gsap.to(eyeGlow, {
    boxShadow: "0 0 48px 16px rgba(255, 255, 255, 0.8), 0 0 0 0 #00eaff00", // Reduced blur and spread
    repeat: -1,
    yoyo: true,
    duration: 0.7,
    ease: "power1.inOut"
  });

  // Heartbeat glow effect for icons
  function addHeartbeatGlow(icon: HTMLButtonElement) {
    const glow = document.createElement("div");
    // glow.style.position = "absolute";
    // glow.style.left = "50%";
    // glow.style.top = "50%";
    // glow.style.transform = "translate(-50%, -50%)";
    // glow.style.width = "60px";
    // glow.style.height = "60px";
    // glow.style.borderRadius = "50%";
    glow.style.pointerEvents = "none";
    glow.style.zIndex = "-1";
    // glow.style.boxShadow = "0 0 24px 6px #00eaff55, 0 0 0 0 #00eaff00";
    icon.style.position = "relative";
    icon.appendChild(glow);

    gsap.to(glow, {
      boxShadow: "0 0 36px 16px rgba(255, 255, 255, 0.8), 0 0 0 0 #00eaff00",
      repeat: -1,
      yoyo: true,
      duration: 0.7,
      ease: "power1.inOut"
    });
  }

  // Add ripple effect to icons
  addRippleEffect(speaker);
  addRippleEffect(auto);

  // Add heartbeat glow to icons
  addHeartbeatGlow(speaker);
  addHeartbeatGlow(auto);
} 