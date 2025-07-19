// Map functionality - Stage 4
let map;
let currentMarker = null;

function initMap() {
  // Initialize the map
  map = L.map('map').setView([39.8283, -98.5795], 4); // Center of USA as default

  // Add tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Try to get user's location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        map.setView([lat, lng], 13);
        
        // Add a marker for user's location
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup('Your current location')
          .openPopup();
      },
      (error) => {
        console.log('Geolocation error:', error);
        // Keep default view if geolocation fails
      }
    );
  }

  // Add click handler for dropping pins
  map.on('click', onMapClick);

  // Set up the "Drop a Pin" button
  const addPinBtn = document.getElementById('add-pin-btn');
  if (addPinBtn) {
    addPinBtn.addEventListener('click', togglePinMode);
  }
}

let pinModeActive = false;

function togglePinMode() {
  const addPinBtn = document.getElementById('add-pin-btn');
  pinModeActive = !pinModeActive;
  
  if (pinModeActive) {
    addPinBtn.textContent = '❌ Cancel Pin';
    addPinBtn.classList.add('active');
    map.getContainer().style.cursor = 'crosshair';
  } else {
    addPinBtn.textContent = '➕ Drop a Pin';
    addPinBtn.classList.remove('active');
    map.getContainer().style.cursor = '';
  }
}

function onMapClick(e) {
  if (!pinModeActive) return;
  
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;
  
  // Remove existing marker if any
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }
  
  // Add new marker
  currentMarker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`
      <div class="pin-popup">
        <h4>New Find Location</h4>
        <p><strong>Coordinates:</strong><br>
        Lat: ${lat.toFixed(6)}<br>
        Lng: ${lng.toFixed(6)}</p>
        <button onclick="openAddFindModal(${lat}, ${lng})" class="btn-primary">
          Add Find Details
        </button>
      </div>
    `)
    .openPopup();
  
  // Reset pin mode
  togglePinMode();
}

// Function to open the Add Find modal - now implemented in Stage 5
function openAddFindModal(lat, lng) {
  // This function is now implemented in modal.js
  // It's made globally available via window.openAddFindModal
  if (window.openAddFindModal) {
    window.openAddFindModal(lat, lng);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMap);
} else {
  initMap();
}
