import React, { useState, useEffect } from 'react';
import "./App.css";


function App() {
  const [location, setLocation] = useState(null);
  const [residents, setResidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/location/3')
      .then((response) => response.json())
      .then((data) => {
        setLocation(data);
        if (data.residents) {
          fetchResidents(data.residents);
        }
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    if (residents.length > 0) {
      const startIndex = (currentPage - 1) * 6;
      const endIndex = startIndex + 6;
      setDisplayedResidents(residents.slice(startIndex, endIndex));
    }
  }, [currentPage, residents]);

  const [displayedResidents, setDisplayedResidents] = useState([]);

  const fetchResidents = (residentUrls) => {
    Promise.all(residentUrls.map((url) => fetch(url).then((response) => response.json())))
      .then((residentData) => {
        setResidents(residentData);
      })
      .catch((error) => console.error('Error:', error));
  };

  const totalPages = Math.ceil(residents.length / 6);

  return (
    <div className='App'>
      <h1>Rick and Morty Location</h1>
      {location ? (
        <div>
          <div className="residents">
            {displayedResidents.length > 0 ? (
              displayedResidents.map((resident) => (
                <div key={resident.id} className="resident">
                  <img src={resident.image} alt={resident.name} />
                  <p>Name: {resident.name}</p>
                  <p>Species: {resident.species}</p>
                  <p>Gender: {resident.gender}</p>
                </div>
              ))
            ) : (
              <p>No residents found.</p>
            )}
          </div>
          <div className="pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
