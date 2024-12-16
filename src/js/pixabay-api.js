import axios from 'axios';

const API_KEY = '47416764-2d3f1aece90e621ecf55ea406';
const URL = 'https://pixabay.com/api/';

export async function back(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  const answer = await axios.get(URL, { params });
  return answer.data;
}
