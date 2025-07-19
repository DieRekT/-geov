/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

beforeEach(() => {
  // Reset the DOM before each test
  document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  
  // Clear the module cache to ensure fresh initialization
  jest.resetModules();
  
  // Mock timer functions
  jest.useFakeTimers();
  
  // Initialize modules
  require('../public/js/sidebar.js');
  require('../public/js/calendar.js');
});

describe('Sidebar Navigation', () => {
  test('shows map view by default', () => {
    const mapContainer = document.querySelector('#map-container');
    const otherContainers = [
      document.querySelector('#calendar-container'),
      document.querySelector('#logbook-container'),
      document.querySelector('#settings-container')
    ];

    expect(mapContainer.classList.contains('hidden')).toBe(false);
    otherContainers.forEach(container => {
      expect(container.classList.contains('hidden')).toBe(true);
    });
  });

  test('switches views when clicking tabs', () => {
    const tabs = ['map', 'calendar', 'logbook', 'settings'];
    
    tabs.forEach(tabName => {
      const tab = document.querySelector(`#tab-${tabName}`);
      tab.click();

      tabs.forEach(otherTab => {
        const container = document.querySelector(`#${otherTab}-container`);
        if (otherTab === tabName) {
          expect(container.classList.contains('hidden')).toBe(false);
        } else {
          expect(container.classList.contains('hidden')).toBe(true);
        }
      });
    });
  });
});

describe('Clock & Calendar', () => {
  test('updates clock every second', () => {
    const clock = document.querySelector('#clock');
    expect(clock).not.toBeNull();
    
    // Mock current time
    const mockDate = new Date('2025-07-20T12:34:56');
    jest.setSystemTime(mockDate);
    
    // Advance time by 1 second
    jest.advanceTimersByTime(1000);
    
    // Clock should show time in HH:MM:SS format
    expect(clock.textContent).toMatch(/\d{2}:\d{2}:\d{2}/);
  });
  
  test('opens calendar modal on clock click', () => {
    const clock = document.querySelector('#clock');
    const calendarModal = document.querySelector('#calendar-modal');
    
    expect(clock).not.toBeNull();
    expect(calendarModal).not.toBeNull();
    expect(calendarModal.classList.contains('hidden')).toBe(true);
    
    // Click the clock to open calendar
    clock.click();
    expect(calendarModal.classList.contains('hidden')).toBe(false);
  });
  
  test('closes calendar modal when clicking close button', () => {
    const clock = document.querySelector('#clock');
    const calendarModal = document.querySelector('#calendar-modal');
    const closeBtn = document.querySelector('.close-button');
    
    // Open modal
    clock.click();
    expect(calendarModal.classList.contains('hidden')).toBe(false);
    
    // Click close button
    closeBtn.click();
    expect(calendarModal.classList.contains('hidden')).toBe(true);
  });
  
  test('displays calendar dates', () => {
    const clock = document.querySelector('#clock');
    const calendarDates = document.querySelector('#calendar-dates');
    
    // Set mock date
    const mockDate = new Date('2025-07-20');
    jest.setSystemTime(mockDate);
    
    // Open calendar
    clock.click();
    
    // Should show days
    const dateCells = calendarDates.children;
    expect(dateCells.length).toBeGreaterThan(28); // Any month has at least 28 days
  });
});
