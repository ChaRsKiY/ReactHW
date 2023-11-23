import {FC, useEffect, useState} from 'react';

const App: FC = () => {
    const [originalText, setOriginalText] = useState<string>('');
    const [transliteratedText, setTransliteratedText] = useState<string>('');

    const transliterate = (text: string): string => {
        const transliterationMap: Record<string, string> = {
            а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh',
            з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o',
            п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts',
            ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu',
            я: 'ya',
        };

        return text.split('').map(char => transliterationMap[char.toLowerCase()] || char).join('');
    };

    useEffect(() => {
        const result = transliterate(originalText);
        setTransliteratedText(result);
    }, [originalText]);

    return (
        <div className='margin'>
            <h1>Транслитерация текста</h1>

            <label htmlFor="originalText">Оригинальный текст:</label>
            <textarea
                id="originalText"
                placeholder="Введите текст..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
            ></textarea>

            <label htmlFor="transliteratedText">Транслитерированный текст:</label>
            <textarea
                id="transliteratedText"
                readOnly
                value={transliteratedText}
            ></textarea>
        </div>
    );
};

export default App;
