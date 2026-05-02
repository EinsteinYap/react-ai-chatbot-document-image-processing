import { useState, useEffect } from "react";
import { geminiModel } from "../../firebase/config.js"
import Loader from "./loader";

function Summary({ file }) {


    
    const [summary, setSummary] = useState("");
    const [status, setStatus] = useState("idle");

    async function getSummary() {
        setStatus("loading");
        try {
            const result = await geminiModel.generateContent([
                {
                    inlineData: {
                        data: file.file,
                        mimeType: file.type
                    },
                },
                `Summarize the document
                in one short paragraph (less than 100 words).
                Use Just plain text, no markdown or html tags.`
            ]);
            setStatus("succeeded");
            setSummary(result.response.text);
        }
        catch (error) {
            console.error("Error fetching summary:", error);
            setStatus("error");
        }
    }

    useEffect(() => {
        if (status === "idle") {
            const fetchSummary = async () => {
                await getSummary();
            };
            fetchSummary();
        }
    }, [status]);

    return (
        <section className="summary">
        <img src={file.imageUrl} alt="Uploaded file preview" className="file-preview" />
            <h2>Summary</h2>
            {status === "loading" ? <Loader /> : status === "succeeded" ? <p>{summary}</p> : status === "error" ? <p>Failed to fetch summary. Please try again.</p> : ''}


        </section>
    );
}



export default Summary