import { Buffer } from 'buffer';


function FileUpload({setFile}) {
    async function handleFileUpload(event) {
        const fileUpload = await event.target.files[0].arrayBuffer();
        const file ={
            type: event.target.files[0].type,
            file: Buffer.from(fileUpload).toString('base64'),
            imageUrl: event.target.files[0].type.includes('pdf') ? "/public/document-icon.png" : URL.createObjectURL(event.target.files[0])
        }
        console.log("File uploaded:", file)
        setFile(file)
    }
    return (
        <div>
            <section>
                <h2>Get Started</h2>
                <input type="file" accept=".pdf, .png, .jpg, .jpeg"
                onChange={ handleFileUpload } />
                <p>Upload a PDF document or image to get started.</p>
            </section>
        </div>
    )
}

export default FileUpload
