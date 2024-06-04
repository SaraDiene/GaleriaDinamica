document.addEventListener('DOMContentLoaded', function () {
    const imageInput = document.getElementById('imageInput');
    const addImageButton = document.getElementById('addImageButton');
    const imageContainer = document.getElementById('imageContainer');

    // Verificar localStorage e exibir imagens
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(image => addImageToGallery(image));

    addImageButton.addEventListener('click', function () {
        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const imageData = {
                    src: reader.result,
                    name: file.name
                };
                addImageToGallery(imageData);
                saveImageToLocalStorage(imageData);
            };
            reader.readAsDataURL(file);
        }
    });

    function addImageToGallery(imageData) {
        const img = document.createElement('img');
        img.src = imageData.src;
        img.alt = imageData.name;
        img.classList.add('imageItem');

        img.addEventListener('click', function () {
            removeImageFromGallery(img);
            removeImageFromLocalStorage(imageData);
        });

        imageContainer.appendChild(img);
    }

    function removeImageFromGallery(img) {
        imageContainer.removeChild(img);
    }

    function saveImageToLocalStorage(imageData) {
        images.push(imageData);
        localStorage.setItem('images', JSON.stringify(images));
    }

    function removeImageFromLocalStorage(imageData) {
        const index = images.findIndex(img => img.src === imageData.src);
        if (index !== -1) {
            images.splice(index, 1);
            localStorage.setItem('images', JSON.stringify(images));
        }
    }
});
