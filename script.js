document.addEventListener("DOMContentLoaded", () => {
    const photoForm = document.getElementById('photo-form');
    if (photoForm) {
        photoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const photoInput = document.getElementById('photo');
            const photoFile = photoInput.files[0];

            if (photoFile) {
                // Simulating upload by storing in localStorage (you may replace this with actual backend storage)
                const photoData = {
                    name: photoFile.name,
                    url: URL.createObjectURL(photoFile) // Generate a temporary URL for display
                };

                let photos = JSON.parse(localStorage.getItem('photos')) || [];
                photos.push(photoData);
                localStorage.setItem('photos', JSON.stringify(photos));

                alert('Photo uploaded successfully!');

                // Clear input field after upload
                photoInput.value = '';

                // Display uploaded photo in gallery immediately
                displayPhotos();
            } else {
                alert('Please select a photo to upload.');
            }
        });
    }

    if (window.location.pathname.includes('photo-gallery.html')) {
        displayPhotos();
    }
});

function displayPhotos() {
    const photoList = document.getElementById('photo-list');
    const photos = JSON.parse(localStorage.getItem('photos')) || [];

    if (photos.length === 0) {
        photoList.innerHTML = '<p>No photos uploaded yet.</p>';
    } else {
        photoList.innerHTML = photos.map(photo => `
            <div class="photo-item">
                <img src="${photo.url}" alt="${photo.name}">
                <h3>${photo.name}</h3>
            </div>
        `).join('');
    }
}
