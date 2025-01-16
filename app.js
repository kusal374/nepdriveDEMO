// App.js

import React, { useEffect, useState } from 'react';
import supabase from './supabaseClient'; // Import the Supabase client

function App() {
  const [rides, setRides] = useState([]); // State to store rides data

  useEffect(() => {
    // Function to handle new ride inserts
    const handleInserts = (payload) => {
      console.log('New ride inserted:', payload.new);
      setRides((prevRides) => [...prevRides, payload.new]); // Update the state with the new ride
    };

    // Subscribe to INSERT events for the 'rides' table
    const subscription = supabase
      .channel('rides')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'rides' }, handleInserts)
      .subscribe();

    // Cleanup subscription when component unmounts
    return () => {
      supabase.removeSubscription(subscription);
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Ride Updates</h1>
      <ul>
        {rides.map((ride, index) => (
          <li key={index}>
            {ride.driver_name} - {ride.destination}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
