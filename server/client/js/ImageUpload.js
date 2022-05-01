export let ImageUpload = {
    init: () => {
        ImageUpload.getImages();
        let input = document.getElementById('image-upload');
        // ENHENCE: image name should be an uuid
        let desc = '';
        document.getElementById('img-text').addEventListener('keyup', () => {
            desc = document.querySelector('#img-text').value;
        });
        input.addEventListener('submit', async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const _files = input.querySelector('input[type=file]');
            if (
                _files?.files !== undefined &&
                _files?.files?.length > 0 &&
                event.defaultPrevented
            ) {
                let file = _files.files[0];
                const fileDesc = desc;
                ImageUpload.generatePreview(file, fileDesc);
                ImageUpload.upload(file, fileDesc);
            } else alert('No file selected');
        });
    },
    generatePreview: (file, fileDesc) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            ImageUpload.imageAppendToPreview(reader.result, fileDesc);
        };
        reader.readAsDataURL(file);
    },
    getImageList: async () => {
        return await new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', '/api/aws/images');
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.send();
        });
    },
    getImages: async () => {
        let images = await ImageUpload.getImageList();
        images = await JSON.parse(images).data;
        images.forEach(async (image) => {
            const url = await image.image_url;
            const _image = await ImageUpload.download(url);
            ImageUpload.imageAppendToPreview(_image, image.description);
        });
    },
    upload: async (file, desc) => {
        let reader = new FileReader();
        reader.onloadend = async () => {
            let formData = new FormData();
            formData.append('image', reader.result);
            formData.append('description', desc);
            formData.append('image_name', file.name);
            await fetch('/api/aws/image', {
                method: 'POST',
                body: formData,
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    return data;
                })
                .then((data) => {
                    if (data.ok) {
                        alert('Image uploaded successfully');
                    }
                });
        };
        reader.readAsDataURL(file);
    },
    download: async (url) => {
        return await fetch(url, {
            cache: 'no-cache',
        })
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                return data;
            });
    },
    dataUriToImage: (dataUri) => {
        let image = new Image();
        image.src = dataUri;
        document.querySelector('#image-preview').appendChild(image);
        return image;
    },
    imageAppendToPreview: (image, desc) => {
        let img = document.createElement('img');
        let imgDesc = document.createElement('img-desc');
        const br = document.createElement('br');
        const hr = document.createElement('hr');
        img.style.width = '17rem';
        img.style.height = '15rem';
        img.src = image;
        imgDesc.innerHTML += `照片描述: ${desc}`;
        document.querySelector('#image-preview').appendChild(imgDesc);
        document.querySelector('#image-preview').appendChild(br);
        document.querySelector('#image-preview').appendChild(img);
        document.querySelector('#image-preview').appendChild(hr);
    },
};
