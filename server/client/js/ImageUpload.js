export let ImageUpload = {
    init: () => {
        let input = document.getElementById('image-upload');
        input.addEventListener('change', (event) => {
            let file = event.target.files[0];
            ImageUpload.generatePreview(file);
        });
    },
    generatePreview: (file) => {
        let reader = new FileReader();
        reader.onloadend = () => {
            let img = document.createElement('img');
            img.style.width = '17rem';
            img.style.height = '15rem';
            img.src = reader.result;
            document.querySelector('#image-preview').appendChild(img);
        };
        reader.readAsDataURL(file);
    },
    getImageList: async () => {
        // TODO: GET list of images from S3
        return await new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://s3.amazonaws.com/image-upload-bucket/');
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.send();
        });
    },
    getImage: async () => {
        // TODO: GET image from S3
        let images = await ImageUpload.getImageList();
        images.forEach((url) => {
            const image = ImageUpload.download(url);
            ImageUpload.generatePreview(image);
        });
        return image;
    },
    upload: async () => {
        // TODO: POST image to S3
        return await new Promise((resolve, reject) => {
            let file = document.querySelector('#image-upload').files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(file);
        });
    },
    download: async (url) => {
        // TODO: GET image from S3
        return await new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.onload = () => {
                resolve(xhr.response);
            };
            xhr.send();
        });
    },
};
