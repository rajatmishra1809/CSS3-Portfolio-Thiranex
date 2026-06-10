// Client-side theme dynamic synchronization routine for Rajat Mishra Portfolio
(function() {
  const moonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  const sunSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;

  function updateToggleButtonIcons() {
    const isDark = document.documentElement.classList.contains('dark') || document.documentElement.getAttribute('data-theme') === 'dark';
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    
    buttons.forEach(button => {
      // If we are currently in dark mode, we present the SUN icon to switch to light mode
      // If we are currently in light mode, we present the MOON icon to switch to dark mode
      button.innerHTML = isDark ? sunSvg : moonSvg;
      button.setAttribute('aria-label', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    });
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    localStorage.setItem('rajat-portfolio-theme', newTheme);
    updateToggleButtonIcons();
    
    // Announce for assistive clients
    const announcer = document.getElementById('live-announcement');
    if (announcer) {
      announcer.textContent = `Theme updated to ${newTheme} mode.`;
    }
  }

  // Bind events once elements are parsed
  window.addEventListener('DOMContentLoaded', () => {
    updateToggleButtonIcons();
    
    // Support multiple toggle buttons if they exist
    document.body.addEventListener('click', (e) => {
      const toggleBtn = e.target.closest('.theme-toggle-btn');
      if (toggleBtn) {
        toggleTheme();
      }
    });
  });
})();
