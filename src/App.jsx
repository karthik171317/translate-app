import { useState, useEffect } from 'react'
import './App.css'
import Translate from './components/Translate'
import { LanguageInputContext, LanguageOutputContext } from "./LanguageContext"
import Select from './components/Select'
import { languages } from "./json/language.json"



function App() {
    const [inputLanguage, setInputLanguage] = useState('en');
    const [outputLanguage, setOutputLanguage] = useState('ta');


    useEffect(() => {
    }, [inputLanguage, outputLanguage])

    const changeInputLanguage = (e) => {
        setInputLanguage(e.target.value)
    }
    const changeOutputLanguage = (e) => {
        setOutputLanguage(e.target.value)
    }
    const languageOptions = Object.entries(languages).map(([label, value]) => ({
        label,
        value
    }));


    return (
        <>
            <LanguageInputContext.Provider value={[inputLanguage, setInputLanguage]}>
                <LanguageOutputContext.Provider value={[outputLanguage, setOutputLanguage]}>
                    <nav className="w-full bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow">
                        <div className="text-xl font-bold tracking-wide">
                            🌍 Translate
                        </div>
                        <div className="text-sm italic text-gray-300 hidden sm:block">
                            "Breaking language barriers, one word at a time."
                        </div>
                    </nav>
                    <div className='w-full'>
                        <div className="flex gap-4 p-4 flex-col items-center md:w-[75%] lg:w-[50%] m-auto mt-40">
                            <div className="flex items-center justify-center gap-3 w-full flex-col md:flex-row">
                                <Select className="bg-transparent border border-gray-600 text-blue-400 px-4 py-2 rounded-md focus:outline-none w-full" value={inputLanguage} options={languageOptions} onChange={changeInputLanguage} />
                                <Select className="bg-transparent border border-gray-600 text-blue-400 px-4 py-2 rounded-md focus:outline-none w-full" value={outputLanguage} options={languageOptions} onChange={changeOutputLanguage} />
                            </div>
                            <Translate />
                        </div>
                    </div>

                </LanguageOutputContext.Provider>
            </LanguageInputContext.Provider>
        </>
    )
}

export default App;
