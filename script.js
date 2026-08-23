const canvas = document.getElementById("signalCanvas");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("site-nav");

if (navToggle && navLinks) {
  function setNavOpen(open) {
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    navLinks.classList.toggle("is-open", open);
  }

  navToggle.addEventListener("click", () => {
    setNavOpen(navToggle.getAttribute("aria-expanded") !== "true");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setNavOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) {
      setNavOpen(false);
    }
  });
}

if (canvas && !prefersReducedMotion) {
  const context = canvas.getContext("2d");
  const paths = [];
  const pointCount = 34;

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    createPaths(width, height);
  }

  function createPaths(width, height) {
    paths.length = 0;
    const originX = width * 0.52;
    const originY = height * 0.58;

    for (let index = 0; index < pointCount; index += 1) {
      const side = index % 2 === 0 ? -1 : 1;
      const endX = originX + side * (width * (0.18 + Math.random() * 0.28));
      const endY = height * (0.22 + Math.random() * 0.58);
      const bend = height * (0.12 + Math.random() * 0.32);

      paths.push({
        phase: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.0025,
        color: Math.random() > 0.52 ? "57, 207, 226" : "224, 189, 119",
        width: 0.65 + Math.random() * 1.1,
        start: { x: originX, y: originY },
        control: {
          x: originX + side * width * (0.08 + Math.random() * 0.16),
          y: originY - bend
        },
        end: { x: endX, y: endY }
      });
    }
  }

  function draw(time) {
    if (document.hidden) {
      requestAnimationFrame(draw);
      return;
    }

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);

    const glow = context.createRadialGradient(width * 0.52, height * 0.58, 0, width * 0.52, height * 0.58, width * 0.28);
    glow.addColorStop(0, "rgba(224, 189, 119, 0.22)");
    glow.addColorStop(0.32, "rgba(57, 207, 226, 0.08)");
    glow.addColorStop(1, "rgba(57, 207, 226, 0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    paths.forEach((path) => {
      const pulse = (Math.sin(time * path.speed + path.phase) + 1) / 2;
      const alpha = 0.12 + pulse * 0.34;
      const moving = 0.22 + pulse * 0.64;

      context.beginPath();
      context.moveTo(path.start.x, path.start.y);
      context.quadraticCurveTo(path.control.x, path.control.y, path.end.x, path.end.y);
      context.strokeStyle = `rgba(${path.color}, ${alpha})`;
      context.lineWidth = path.width;
      context.stroke();

      const particle = quadraticPoint(path.start, path.control, path.end, moving);
      context.beginPath();
      context.arc(particle.x, particle.y, 1.6 + pulse * 1.8, 0, Math.PI * 2);
      context.fillStyle = `rgba(${path.color}, ${0.28 + pulse * 0.46})`;
      context.fill();
    });

    requestAnimationFrame(draw);
  }

  function quadraticPoint(start, control, end, progress) {
    const inverse = 1 - progress;
    return {
      x: inverse * inverse * start.x + 2 * inverse * progress * control.x + progress * progress * end.x,
      y: inverse * inverse * start.y + 2 * inverse * progress * control.y + progress * progress * end.y
    };
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(draw);
}
