import { writeFile } from 'fs/promises';

export async function uploadFile(file: any, destination: string = 'random') {
    try {
        if (!file) {
            return console.log('No file received')
        }

        // Extract the file extension
        const match = file.match(/data:image\/(.*);base64,/);
        const extension = match ? match[1] : '';

        // Check if the file extension is allowed
        const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp'];
        if (!allowedExtensions.includes(extension)) {
            return console.log('File type not allowed')
        }

        // Remove the "data:image/png;base64," part of the string
        const base64Data = file.replace(/^data:image\/\w+;base64,/, "");

        // Convert the base64 string to a Buffer
        const buffer = Buffer.from(base64Data, 'base64');


        // Check if the file size is under 1mb
        const fileSizeInKB = buffer.length / 1024;
        if (fileSizeInKB > 1024) {
            return console.log('File size exceeds 1024KB')
        }

        // Generate a unique filename using the current timestamp
        const filename = `${Date.now()}.${extension}`;
        const path = `./public/images/${destination}/${filename}`;
        await writeFile(path, buffer);
        return filename;

    } catch (error) {
        console.error(error);
        return null;
    }
}