// Initialize sidebar navigation
function initSidebar() {
  const tabs = ['map', 'calendar', 'logbook', 'settings'];
  
  function showView(selectedTab) {
    // Update tab active states and container visibility
    tabs.forEach(tabName => {
      const tab = document.querySelector(`#tab-${tabName}`);
      const container = document.querySelector(`#${tabName}-container`);
      
      if (tab && container) {
        if (tabName === selectedTab) {
          tab.classList.add('active');
          container.classList.remove('hidden');
        } else {
          tab.classList.remove('active');
          container.classList.add('hidden');
        }
      }
    });
  }
  
  // Set up click handlers for each tab
  tabs.forEach(tabName => {
    const tab = document.querySelector(`#tab-${tabName}`);
    if (tab) {
      tab.addEventListener('click', () => showView(tabName));
    }
  });
  
  // Show map view by default
  showView('map');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar();
}