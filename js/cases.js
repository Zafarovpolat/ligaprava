// Cases page functionality
document.addEventListener("DOMContentLoaded", function () {
  const casesGrid = document.getElementById("casesGrid");
  const caseItems = Array.from(document.querySelectorAll(".cases__item"));
  const filterButtons = document.querySelectorAll(".cases__filter-btn");
  const prevBtn = document.getElementById("prevCase");
  const nextBtn = document.getElementById("nextCase");

  let currentFilter = "all";
  let currentPage = 0;

  function getItemsPerPage() {
    const width = window.innerWidth;
    if (width <= 900) return Infinity; // Disable slider
    if (width <= 1080) return 4;
    return 6;
  }

  let itemsPerPage = getItemsPerPage();
  let visibleItems = [...caseItems];

  function updateSlider() {
    // Filter items based on current category
    visibleItems = caseItems.filter((item) => {
      const category = item.getAttribute("data-category");
      return currentFilter === "all" || category === currentFilter;
    });

    const isSliderDisabled = itemsPerPage === Infinity;

    if (isSliderDisabled) {
      // Show all filtered items
      caseItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (currentFilter === "all" || category === currentFilter) {
          item.style.display = "flex";
          item.classList.add("fade-in");
        } else {
          item.style.display = "none";
          item.classList.remove("fade-in");
        }
      });
      return; // Skip pagination logic
    }

    const totalPages = Math.ceil(visibleItems.length / itemsPerPage);

    // Ensure currentPage is within bounds
    if (currentPage >= totalPages) currentPage = Math.max(0, totalPages - 1);

    // Hide all items first
    caseItems.forEach((item) => {
      item.style.display = "none";
      item.classList.remove("fade-in");
    });

    // Show items for the current page
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = visibleItems.slice(start, end);

    pageItems.forEach((item, index) => {
      item.style.display = "flex";
      // Staggered fade-in
      setTimeout(() => {
        item.classList.add("fade-in");
      }, index * 50);
    });

    // Update nav buttons state
    if (prevBtn) prevBtn.disabled = currentPage === 0;
    if (nextBtn)
      nextBtn.disabled = currentPage >= totalPages - 1 || totalPages <= 1;
  }

  // Filter clicks
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      currentFilter = this.getAttribute("data-filter");
      currentPage = 0; // Reset to first page on filter change

      animateTransition();
    });
  });

  // Nav clicks
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        animateTransition();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      const totalPages = Math.ceil(visibleItems.length / itemsPerPage);
      if (currentPage < totalPages - 1) {
        currentPage++;
        animateTransition();
      }
    });
  }

  function animateTransition() {
    if (!casesGrid) return;
    casesGrid.classList.add("fade-out");
    setTimeout(() => {
      updateSlider();
      casesGrid.classList.remove("fade-out");
    }, 300);
  }

  // Handle resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const newItemsPerPage = getItemsPerPage();
      if (newItemsPerPage !== itemsPerPage) {
        // Re-calculate current page to keep context if possible
        if (itemsPerPage !== Infinity && newItemsPerPage !== Infinity) {
            const firstVisibleIndex = currentPage * itemsPerPage;
            itemsPerPage = newItemsPerPage;
            currentPage = Math.floor(firstVisibleIndex / itemsPerPage);
        } else {
            itemsPerPage = newItemsPerPage;
            currentPage = 0;
        }
        updateSlider();
      }
    }, 200);
  });

  // Initial load
  updateSlider();
});
