// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Timeline from './components/Timeline';
import Intro from './components/Intro';

function App() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get('https://arthurfrost.qflo.co.za/php/getTimeline.php')
            .then((response) => {
              console.log('Axios Response:', response);
              setJsonData(response.data);
            })
            .catch((error) => {
              console.error('Error fetching timeline data:', error);
            });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="container mt-5">
        {jsonData && (
            <div>
              <Intro introText={jsonData.Body[0].About} />
              <Timeline timelineData={jsonData.Timeline} />
            </div>
        )}
      </div>
  );
}

export default App;