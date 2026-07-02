document.addEventListener('DOMContentLoaded', function () {

  // ============================================
  // 1. Process every h2–h6 (will work even if no id exists)
  // ============================================
  document.querySelectorAll('h2, h3, h4, h5, h6').forEach(heading => {

    // Already wrapped? Skip.
    if (heading.querySelector('.heading-link')) return;

    // --- Build a slug from the visible heading text ---
    // (we exclude the chain icon if it somehow exists, but it doesn't yet)
    const rawText = heading.textContent.trim();
    const slug = rawText
      .toLowerCase()
      .replace(/\s+/g, '-')           // spaces → dashes
      .replace(/[^\w\-]+/g, '')      // remove everything except letters, digits, dashes
      .replace(/^-+|-+$/g, '');      // trim leading/trailing dashes

    // --- Give the heading this slug as its id (overwrites any existing id) ---
    heading.id = slug;

    // --- Save content, then wrap inside an anchor ---
    const content = heading.innerHTML;
    const a = document.createElement('a');
    a.href = '#' + slug;
    a.className = 'heading-link';
    a.innerHTML = `<span class="chain-icon">🔗</span>${content}`;

    // --- Click behaviour: the anchor already sets window.location.hash ---
    // No extra listener needed – the browser does exactly what you asked:
    // it replaces the current hash with #slug and scrolls to heading.id == slug.

    heading.innerHTML = '';
    heading.appendChild(a);
  });

  // ============================================
  // 2. TOC sidebar active‑state (unchanged logic)
  // ============================================
  const sections = document.querySelectorAll('h2[id], h3[id]');
  const tocItems = document.querySelectorAll('.toc-item');

  if (sections.length && tocItems.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const index = Array.from(sections).indexOf(entry.target);
        if (index === -1) return;
        if (entry.isIntersecting) {
          tocItems.forEach(item => item.classList.remove('active'));
          tocItems[index].classList.add('active');
        }
      });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
  }

  // ============================================
  // 3. Chain‑icon visibility (hide on very narrow screens)
  // ============================================
  function updateChainVisibility() {
    const isVeryNarrow = window.innerWidth <= 400;
    document.querySelectorAll('.chain-icon').forEach(icon => {
      icon.style.display = isVeryNarrow ? 'none' : '';
    });
  }

  updateChainVisibility();
  window.addEventListener('resize', updateChainVisibility);

});