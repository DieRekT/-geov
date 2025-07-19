function initCalendar() {
  const clock = document.querySelector('#clock');
  const modal = document.querySelector('#calendar-modal');
  const closeBtn = modal.querySelector('.close-button');
  const calendarDates = document.querySelector('#calendar-dates');
  const currentMonthEl = document.querySelector('#current-month');
  const prevMonthBtn = document.querySelector('#prev-month');
  const nextMonthBtn = document.querySelector('#next-month');

  let currentDate = new Date();

  // Update clock display
  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // Initialize and start clock
  updateClock();
  setInterval(updateClock, 1000);

  // Calendar functions
  function updateCalendar(date = new Date()) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Update month/year display
    currentMonthEl.textContent = date.toLocaleString('default', { 
      month: 'long', 
      year: 'numeric' 
    });

    // Clear existing dates
    calendarDates.innerHTML = '';

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty cells for days before first of month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      calendarDates.appendChild(emptyDay);
    }

    // Add calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement('div');
      dayEl.textContent = day;
      if (day === new Date().getDate() && 
          month === new Date().getMonth() && 
          year === new Date().getFullYear()) {
        dayEl.style.backgroundColor = '#e0e0e0';
        dayEl.style.borderRadius = '50%';
      }
      calendarDates.appendChild(dayEl);
    }
  }

  // Event Listeners
  clock.addEventListener('click', (e) => {
    modal.classList.remove('hidden');
    updateCalendar(currentDate);
    e.stopPropagation();
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Close modal when clicking outside
  document.addEventListener('click', (e) => {
    if (modal.contains(e.target) && e.target !== modal) return;
    modal.classList.add('hidden');
  });

  // Month navigation
  prevMonthBtn.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    updateCalendar(currentDate);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    updateCalendar(currentDate);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCalendar);
} else {
  initCalendar();
}
