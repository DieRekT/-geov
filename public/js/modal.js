// Modal functionality - Stage 5
let currentFindCoordinates = null;

function initModal() {
  const modal = document.getElementById('add-find-modal');
  const form = document.getElementById('add-find-form');
  const closeBtn = modal.querySelector('.close-button');
  const cancelBtn = document.getElementById('cancel-find');
  const photoInput = document.getElementById('find-photo');
  const photoPreview = document.getElementById('photo-preview');

  // Close modal handlers
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Photo upload preview
  photoInput.addEventListener('change', handlePhotoUpload);

  // Form submission
  form.addEventListener('submit', handleFormSubmit);
}

function openAddFindModal(lat, lng) {
  const modal = document.getElementById('add-find-modal');
  const latInput = document.getElementById('find-lat');
  const lngInput = document.getElementById('find-lng');
  
  // Store coordinates
  currentFindCoordinates = { lat, lng };
  
  // Populate coordinate fields
  latInput.value = lat.toFixed(6);
  lngInput.value = lng.toFixed(6);
  
  // Reset form
  document.getElementById('add-find-form').reset();
  latInput.value = lat.toFixed(6);
  lngInput.value = lng.toFixed(6);
  
  // Clear photo preview
  const photoPreview = document.getElementById('photo-preview');
  photoPreview.innerHTML = '';
  photoPreview.classList.add('hidden');
  
  // Show modal
  modal.classList.remove('hidden');
  
  // Focus on first input
  document.getElementById('find-name').focus();
}

function closeModal() {
  const modal = document.getElementById('add-find-modal');
  modal.classList.add('hidden');
  currentFindCoordinates = null;
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  const preview = document.getElementById('photo-preview');
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.innerHTML = `
        <img src="${e.target.result}" alt="Photo preview" class="preview-image">
        <button type="button" class="remove-photo" onclick="removePhoto()">Remove</button>
      `;
      preview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = '';
    preview.classList.add('hidden');
  }
}

function removePhoto() {
  const photoInput = document.getElementById('find-photo');
  const photoPreview = document.getElementById('photo-preview');
  
  photoInput.value = '';
  photoPreview.innerHTML = '';
  photoPreview.classList.add('hidden');
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const findData = {
    name: formData.get('findName'),
    latitude: parseFloat(formData.get('latitude')),
    longitude: parseFloat(formData.get('longitude')),
    notes: formData.get('notes'),
    tags: formData.get('tags') ? formData.get('tags').split(',').map(tag => tag.trim()) : [],
    photo: formData.get('photo'),
    timestamp: new Date().toISOString()
  };
  
  // For now, just log the data and show success message
  console.log('New find saved:', findData);
  
  // Show success message
  alert(`Find "${findData.name}" saved successfully!\n\nCoordinates: ${findData.latitude}, ${findData.longitude}\nTags: ${findData.tags.join(', ')}`);
  
  // Close modal
  closeModal();
  
  // In a real app, this would save to a database or local storage
  // For now, we'll just demonstrate the functionality
}

// Make openAddFindModal globally available for the map
window.openAddFindModal = openAddFindModal;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModal);
} else {
  initModal();
}
