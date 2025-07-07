import axios from 'axios';

// Example usage of axios to make a GET request
axios.get('http://localhost:5000/api/someEndpoint')
  .then((response) => {
    console.log('Data:', response.data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
