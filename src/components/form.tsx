import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLanguages, fetchRandomJoke } from '../redux/jokeSlice';

import './form.css';

const JockForm: React.FC = () => {
    const categories = [
        "Any",
        "Misc",
        "Programming",
        "Dark",
        "Pun",
        "Spooky",
        "Christmas"
    ]
    const [category, setCategory] = useState('Programming');
    const [language, setLanguage] = useState('en');
    const { joke, loading, error, languages } = useSelector((state: RootState) => state.joke);


    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchLanguages());
    }, [dispatch]);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(event.target.value);
    };

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('First Dropdown:', category);
        console.log('Second Dropdown:', language);
        dispatch(fetchRandomJoke(language, category));
    };


    return (<>
        <div className="form-container">
            <form onSubmit={handleSubmit} className="dropdown-form">
                <div className="form-group">
                    <label htmlFor="firstDropdown">Categories:</label>
                    <select id="firstDropdown" value={category} onChange={handleCategoryChange}>
                        {categories.map((category: any) => (
                            <option value={category} key={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="secondDropdown">Second Dropdown</label>
                    <select id="secondDropdown" value={language} onChange={handleLanguageChange}>
                        {languages.map((language: any) => (
                            <option value={language.code} key={language.code}>{language.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Show</button>
            </form>
            {joke && <p className='info-text'>{joke}</p>}
            {loading && <p className='loading-text'>Loading...</p>}
            {error && <p className='error-text'>{error}</p>}
        </div>
    </>
    );
}

export default JockForm;
