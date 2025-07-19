/**
 * @jest-environment jsdom
 */
const fs = require('fs');
const path = require('path');

beforeAll(() => {
  document.body.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
  require('../public/js/sidebar.js'); // load your modules as needed
});

test('sidebar toggles views', () => {
  // example: verify that clicking a tab shows the right container
  const mapTab = document.querySelector('#tab-map');
  const calendarContainer = document.querySelector('#calendar-container');
  mapTab.click();
  expect(calendarContainer.classList).toContain('hidden');
});
