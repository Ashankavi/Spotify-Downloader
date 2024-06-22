import React, { useState } from 'react';
import { getAccessToken } from './spotifyAuth';

const Converter = () => {
  const [songLink, setSongLink] = useState('');
  const [songDetails, setSongDetails] = useState(null);
  const [quality, setQuality] = useState('normal');

  const clientId = 'cbc8a8dbbe9f446b9d188753558b8d7c';
  const clientSecret = 'f48773fc12244d53933ffcf1f614abcb';

  const fetchSongDetails = async () => {
    const accessToken = await getAccessToken(clientId, clientSecret);
    const songId = songLink.split('/').pop().split('?')[0]; // Extract song ID from URL
    const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    const details = {
      artistName: data.artists[0].name,
      publishDate: data.album.release_date,
      songDuration: new Date(data.duration_ms).toISOString().substr(11, 8),
      coverImage: data.album.images[0].url,
    };
    setSongDetails(details);
  };

  const handleDownload = () => {
    // Placeholder for download functionality
    alert(`Downloading in ${quality} quality...`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Spotify Song Downloader</h1>
      <div className="mb-4">
        <input
          type="text"
          value={songLink}
          onChange={(e) => setSongLink(e.target.value)}
          placeholder="Enter Spotify song link"
          className="border p-2 w-full"
        />
        <button
          onClick={fetchSongDetails}
          className="bg-blue-500 text-white p-2 mt-2"
        >
          Search
        </button>
      </div>

      {songDetails && (
        <div className="border p-4 rounded">
          <img src={songDetails.coverImage} alt="Cover" className="w-32 h-32 mb-4" />
          <p><strong>Artist Name:</strong> {songDetails.artistName}</p>
          <p><strong>Publish Date:</strong> {songDetails.publishDate}</p>
          <p><strong>Song Duration:</strong> {songDetails.songDuration}</p>

          <div className="mt-4">
            <label htmlFor="quality" className="block mb-2">Select Quality:</label>
            <select
              id="quality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="border p-2"
            >
              <option value="low">Low Quality</option>
              <option value="normal">Normal Quality</option>
              <option value="high">High Quality</option>
            </select>
          </div>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownload}
              className="bg-green-500 text-white p-2"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Converter;
