import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DogList = () => {
    const [dogs, setDogs] = useState([]);         // List of dogs
    const [selectedDog, setSelectedDog] = useState(null); // Details of selected dog
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch all dogs for user when component mounts
        const fetchDogs = async () => {
            try {
                const res = await axios.get('/api/animals/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDogs(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDogs();
    }, [token]);

    const viewDetails = async (dogId) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/animals/${dogId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedDog(res.data);
        } catch (err) {
            alert('Failed to load dog details');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading dog details...</p>;

    return (


        // <div>
        //     <h1>Your Dogs</h1>
        //     {Array.isArray(dogs) ? (
        //         dogs.map(dog => (
        //             <li key={dog._id}>
        //                 {dog.name} ({dog.breed})
        //                 <button onClick={() => viewDetails(dog._id)}>View Details</button>
        //             </li>
        //         ))
        //     ) : (
        //         <p>No dogs available</p>
        //     )}

        // add code
          <div>
  <h1>Your Dogs</h1>
  {Array.isArray(dogs) && dogs.length > 0 ? (
    <ul>
      {dogs.map(dog => (
        <li key={dog._id}>
          {dog.name} ({dog.breed})
          <button onClick={() => viewDetails(dog._id)}>View Details</button>
        </li>
      ))}
    </ul>
  ) : (
    <p>No dogs available</p>
  )}
    {/* addcode end */}



            {selectedDog && (
                <div className="dog-details">
                    <h2>{selectedDog.name} Details</h2>
                    <p>Species: {selectedDog.species}</p>
                    <p>Breed: {selectedDog.breed}</p>
                    <p>Age: {selectedDog.age} years</p>
                    <p>Gender: {selectedDog.gender}</p>
                    <p>Weight: {selectedDog.weight}</p>
                    <p>Health Issues: {selectedDog.healthIssues?.join(', ')}</p>

                    {/* Show consultation history */}
                    <h3>Consultation History</h3>
                    {selectedDog.consultationHistory?.length > 0 ? (
                        selectedDog.consultationHistory.map(c => (
                            <div key={c.id}>
                                <p>Date: {c.date}</p>
                                <p>Doctor: {c.doctor}</p>
                                <p>Diagnosis: {c.diagnosis}</p>
                                <p>Treatment: {c.treatment}</p>
                                <p>Notes: {c.notes}</p>
                                <p>Next Visit: {c.nextVisit}</p>
                            </div>
                        ))
                    ) : (
                        <p>No consultation history available</p>
                    )}

                    {/* Vaccination Records */}
                    <h3>Vaccination Records</h3>
                    {selectedDog.vaccinationRecords?.length > 0 ? (
                        selectedDog.vaccinationRecords.map(v => (
                            <div key={v.id}>
                                <p>Vaccine: {v.vaccine}</p>
                                <p>Given: {v.given}</p>
                                <p>Due: {v.due}</p>
                                <p>Status: {v.status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No vaccination records available</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DogList;