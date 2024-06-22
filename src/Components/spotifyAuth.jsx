import axios from 'axios';
import queryString from 'query-string';

const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const clientSecret = 'YOUR_SPOTIFY_CLIENT_SECRET';
const redirectUri = 'http://localhost:3000/callback';

export const getAuthUrl = () => {
  const scopes = [
    'user-read-private',
    'user-read-email',
  ];
  return `https://accounts.spotify.com/authorize?${queryString.stringify({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scopes.join(' '),
  })}`;
};

export const getToken = async (code) => {
  const response = await axios.post('https://accounts.spotify.com/api/token', queryString.stringify({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
  }), {
    headers: {
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const getAccessToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', queryString.stringify({
    grant_type: 'client_credentials',
  }), {
    headers: {
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data.access_token;
};
