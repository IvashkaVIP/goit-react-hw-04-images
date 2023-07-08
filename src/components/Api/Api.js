import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/?';
const API_KEY = '36802166-6c141fd6d6e9c8442c873b534';
const PER_PAGE = 12;

export async function getImages (searchQery='cat', page='1') {
//  https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
    
    try {
        const a = `q=${searchQery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
        const resp = await axios(a);

        console.log(a);
        console.log(resp);
    }
    catch (error) {
        handlerError(error);

    }
    finally {

    }
    
}

export function handlerError(error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);

  //alert('there`s something wrong, please see the messages in the console');
}


