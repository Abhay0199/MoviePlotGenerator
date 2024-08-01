import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

const App = () => {
    const [movieName, setMovieName] = useState('');
    const [moviePlot, setMoviePlot] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:2410/api/movie-plot', { movieName });
            setMoviePlot(response.data.plot);
            setShowPopup(true);
        } catch (error) {
            console.error('Error fetching movie plot:', error);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div className="container">
            <h1 className="text-center my-4">Movie Plot Generator</h1>
            <form onSubmit={handleSubmit} className="text-center">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter movie name"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={handleClosePopup}>&times;</span>
                        <h2>Movie Plot</h2>
                        <p>{moviePlot}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
