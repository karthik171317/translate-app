import { useEffect, useState, useContext } from "react";
import { LanguageInputContext, LanguageOutputContext } from "../LanguageContext"
import { TranslateClient, TranslateTextCommand } from "@aws-sdk/client-translate";

function Translate() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [clearTimeoutFunc, setClearTimeoutFunc] = useState();
    const [languageInputCode] = useContext(LanguageInputContext);
    const [languageOutputCode] = useContext(LanguageOutputContext);
    const client = new TranslateClient({
        region: "us-east-1", // or your preferred AWS region
        credentials: {
            accessKeyId: import.meta.env.VITE_AWS_KEY,
            secretAccessKey: import.meta.env.REACT_APP_AWS_SECRET,
        },
    });

    async function translate(sourceLang, targetLang) {
        const command = new TranslateTextCommand({
            SourceLanguageCode: sourceLang,
            TargetLanguageCode: targetLang,
            Text: input,
        });
        try {
            const response = await client.send(command);
            setOutput(response.TranslatedText);
        } catch (err) {
            console.error("Translation error:", err);
        }
    }
    const translateTheContent = (e) => {
        setInput(e.target.value);
        clearTimeout(clearTimeoutFunc);
        setClearTimeoutFunc(setTimeout(()=>{
            translate(languageInputCode,languageOutputCode);
        },1000));
    }

    useEffect(() => {
        input
        languageInputCode;
        languageOutputCode;
    }, [input,languageInputCode,languageOutputCode])

    return (<>
        {/* <p>{input}</p> */}
        {/* <textarea onChange={(e) => translateTheContent(e)} value={input}></textarea> */}
         <div className="flex items-start gap-4 w-full flex-col md:flex-row">
            <div className="flex flex-col gap-2 w-full relative">
                <textarea placeholder="Enter text" className="resize-none w-full h-40 p-4 rounded-md bg-gray-900 text-white placeholder-gray-400 resize-none focus:outline-none" onChange={(e) => translateTheContent(e)} value={input}/>
            </div>

            {/* Right: Output box */}
            <div className="w-full">
                <textarea placeholder="Translation" className="cursor-default w-full resize-none h-40 p-4 rounded-md bg-gray-800 text-gray-300" value={output} readOnly/>
            </div>
         </div>
    </>)
}

export default Translate;