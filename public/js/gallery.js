document.addEventListener('DOMContentLoaded', () => {
    const photoGrid = document.getElementById('photo-grid');
    const uploadForm = document.getElementById('upload-form');
    const uploadStatus = document.getElementById('upload-status');
    const fileInput = document.getElementById('file-input');
    
    let lightGalleryInstance = null;

    const fetchAndDisplayMedia = async () => {
        try {
            const response = await fetch('/api/images');
            if (!response.ok) throw new Error('Network response was not ok');
            
            const files = await response.json();

            if (lightGalleryInstance) {
                lightGalleryInstance.destroy();
            }
            
            photoGrid.innerHTML = '';

            if (files.length === 0) {
                photoGrid.innerHTML = '<p>Our gallery is empty! Add our first memory.</p>';
                return;
            }

            files.forEach(filename => {
                const fullPath = `/uploads/${filename}`;
                
                const galleryItem = document.createElement('a');
                galleryItem.className = 'grid-item';
                galleryItem.href = fullPath;

                const img = document.createElement('img');
                img.src = fullPath;
                img.alt = 'A beautiful memory';
                img.loading = 'lazy';
                galleryItem.appendChild(img);
                
                photoGrid.appendChild(galleryItem);
            });

            lightGalleryInstance = lightGallery(photoGrid, {
                selector: '.grid-item',
                speed: 500,
                download: false
            });

        } catch (error) {
            console.error('Error fetching media:', error);
            photoGrid.innerHTML = '<p>Could not load our memories. Please try again later.</p>';
        }
    };

    // Convert HEIC to JPEG using Canvas (works on Safari!)
    async function convertHeicToJpeg(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            img.onload = function() {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
                
                canvas.toBlob((blob) => {
                    if (blob) {
                        const newFile = new File(
                            [blob],
                            file.name.replace(/\.(heic|heif)$/i, '.jpg'),
                            { type: 'image/jpeg' }
                        );
                        resolve(newFile);
                    } else {
                        reject(new Error('Canvas conversion failed'));
                    }
                }, 'image/jpeg', 0.9);
            };
            
            img.onerror = function() {
                reject(new Error('Failed to load HEIC image'));
            };
            
            img.src = URL.createObjectURL(file);
        });
    }

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const files = fileInput.files; // Get ALL files
        if (files.length === 0) {
            uploadStatus.textContent = 'Please select at least one photo!';
            uploadStatus.style.color = 'orange';
            return;
        }

        uploadStatus.textContent = `⬆️ Uploading ${files.length} photo${files.length > 1 ? 's' : ''}...`;
        uploadStatus.style.color = 'blue';

        let successCount = 0;
        let failCount = 0;

        // Loop through ALL selected files
        for (let i = 0; i < files.length; i++) {
            let fileToUpload = files[i];
            
            try {
                // Check if it's HEIC/HEIF and convert using Canvas
                if (/\.(heic|heif)$/i.test(fileToUpload.name)) {
                    uploadStatus.textContent = `🔄 Converting photo ${i + 1}/${files.length}...`;
                    
                    try {
                        console.log('Starting HEIC conversion for:', fileToUpload.name);
                        fileToUpload = await convertHeicToJpeg(fileToUpload);
                        console.log('✅ HEIC conversion successful!');
                    } catch (error) {
                        console.error("HEIC Conversion Error:", error);
                        failCount++;
                        continue; // Skip this file and move to next
                    }
                }
                
                // Upload the file (original or converted)
                uploadStatus.textContent = `⬆️ Uploading photo ${i + 1}/${files.length}...`;
                
                const formData = new FormData();
                formData.append('myImage', fileToUpload);
                
                const response = await fetch('/upload', { 
                    method: 'POST', 
                    body: formData 
                });
                
                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.msg || 'Upload failed');
                }

                successCount++;
                console.log(`✅ Uploaded: ${fileToUpload.name}`);
                
            } catch (error) {
                console.error(`❌ Failed to upload ${fileToUpload.name}:`, error);
                failCount++;
            }
        }

        // Show final status
        if (successCount > 0 && failCount === 0) {
            uploadStatus.textContent = `✨ Successfully uploaded ${successCount} photo${successCount > 1 ? 's' : ''}!`;
            uploadStatus.style.color = 'green';
        } else if (successCount > 0 && failCount > 0) {
            uploadStatus.textContent = `⚠️ Uploaded ${successCount} photo${successCount > 1 ? 's' : ''}, ${failCount} failed`;
            uploadStatus.style.color = 'orange';
        } else {
            uploadStatus.textContent = `❌ Upload failed for all ${failCount} photo${failCount > 1 ? 's' : ''}`;
            uploadStatus.style.color = 'red';
        }
        
        // Reset form
        uploadForm.reset();
        
        // Reload gallery after 1.5 seconds if any succeeded
        if (successCount > 0) {
            setTimeout(() => {
                fetchAndDisplayMedia();
                uploadStatus.textContent = '';
            }, 1500);
        }
    });

    // Load gallery when page loads
    fetchAndDisplayMedia();
});