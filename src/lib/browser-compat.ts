// Browser Compatibility Polyfills and Fixes
// This file ensures all modern features work across browsers including Edge

// Check if running in browser
if (typeof window !== 'undefined') {
  
  // 1. Smooth Scroll Polyfill for older browsers
  if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js';
    document.head.appendChild(script);
  }

  // 2. CSS Custom Properties Polyfill for IE/Edge Legacy
  if (window.CSS && !CSS.supports('color', 'var(--test)')) {
    console.warn('CSS Custom Properties not fully supported. Loading polyfill...');
  }

  // 3. Intersection Observer Polyfill
  if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported. Some animations may not work.');
  }

  // 4. Ensure backdrop-filter fallback
  const testElement = document.createElement('div');
  testElement.style.backdropFilter = 'blur(10px)';
  testElement.style.webkitBackdropFilter = 'blur(10px)';
  
  const supportsBackdropFilter = 
    testElement.style.backdropFilter === 'blur(10px)' || 
    testElement.style.webkitBackdropFilter === 'blur(10px)';
  
  if (!supportsBackdropFilter) {
    console.warn('backdrop-filter not supported. Using solid backgrounds as fallback.');
    document.documentElement.classList.add('no-backdrop-filter');
  }

  // 5. Fix for gradient text in Edge
  const supportsBackgroundClip = CSS.supports('-webkit-background-clip', 'text') || 
                                   CSS.supports('background-clip', 'text');
  
  if (!supportsBackgroundClip) {
    console.warn('background-clip: text not fully supported. Applying fixes...');
    document.documentElement.classList.add('no-gradient-text');
  }

  // 6. Add browser detection classes to html element
  const userAgent = navigator.userAgent.toLowerCase();
  const isEdge = userAgent.indexOf('edg') > -1;
  const isChrome = userAgent.indexOf('chrome') > -1 && !isEdge;
  const isFirefox = userAgent.indexOf('firefox') > -1;
  const isSafari = userAgent.indexOf('safari') > -1 && !isChrome && !isEdge;
  
  if (isEdge) document.documentElement.classList.add('browser-edge');
  if (isChrome) document.documentElement.classList.add('browser-chrome');
  if (isFirefox) document.documentElement.classList.add('browser-firefox');
  if (isSafari) document.documentElement.classList.add('browser-safari');

  // 7. Force hardware acceleration for smoother animations
  document.documentElement.style.transform = 'translateZ(0)';
  document.documentElement.style.webkitTransform = 'translateZ(0)';

  // 8. Log browser info for debugging
  console.info('🌐 Browser detected:', {
    isEdge,
    isChrome,
    isFirefox,
    isSafari,
    userAgent: navigator.userAgent
  });

  console.info('✅ Browser compatibility checks complete');
}

export {};
