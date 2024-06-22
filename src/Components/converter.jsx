import React, { useState } from 'react';
import { getAccessToken } from './spotifyAuth';

const Converter = () => {
  const [songLink, setSongLink] = useState('');
  const [songDetails, setSongDetails] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [showFullLyrics, setShowFullLyrics] = useState(false);
  const [quality, setQuality] = useState('normal');

  const fetchSongDetails = async () => {
    try {
      const accessToken = await getAccessToken();
      const songId = songLink.split('/').pop().split('?')[0]; // Extract song ID from URL
      const response = await fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const details = {
        artistName: data.artists[0].name,
        songName: data.name,
        publishDate: data.album.release_date,
        songDuration: new Date(data.duration_ms).toISOString().substr(11, 8),
        coverImage: data.album.images[0].url,
      };
      setSongDetails(details);

      // Fetch lyrics
      const lyricsResponse = await fetch(`https://api.lyrics.ovh/v1/${details.artistName}/${details.songName}`);
      const lyricsData = await lyricsResponse.json();
      setLyrics(lyricsData.lyrics || '');
      setShowFullLyrics(false); // Reset show full lyrics
    } catch (error) {
      console.error('Failed to fetch song details:', error.message);
    }
  };

  const handleDownload = () => {
    if (!songDetails) return;

    const songData = `
      Artist Name: ${songDetails.artistName}
      Song Name: ${songDetails.songName}
      Publish Date: ${songDetails.publishDate}
      Song Duration: ${songDetails.songDuration}
      Quality: ${quality}
      Lyrics:
      ${lyrics}
    `;

    const blob = new Blob([songData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${songDetails.artistName} - ${songDetails.songName}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleToggleLyrics = () => {
    setShowFullLyrics(!showFullLyrics);
  };

  return (
    <div className="mx-auto p-4 flex flex-col items-center bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Spotify Song Downloader</h1>
      <div className="mb-4 w-full max-w-md">
        <input
          type="text"
          value={songLink}
          onChange={(e) => setSongLink(e.target.value)}
          placeholder="Enter Spotify song link"
          className="border p-2 w-full"
        />
        <button
          onClick={fetchSongDetails}
          className="bg-blue-500 text-white p-2 mt-2 w-full"
        >
          Search
        </button>
      </div>

      {songDetails && (
        <div className="border p-4 rounded w-full max-w-md flex flex-col items-center">
          <div className="flex flex-col md:flex-row items-center mb-4 w-full">
            <img src={songDetails.coverImage} alt="Cover" className="w-32 h-32 mb-4 md:mb-0 md:mr-4" />
            <div>
              <p><strong>Artist Name:</strong> {songDetails.artistName}</p>
              <p><strong>Song Name:</strong> {songDetails.songName}</p>
              <p><strong>Publish Date:</strong> {songDetails.publishDate}</p>
              <p><strong>Song Duration:</strong> {songDetails.songDuration}</p>
            </div>
          </div>
          {lyrics && (
            <>
              <p><strong>Lyrics:</strong></p>
              <pre className="whitespace-pre-wrap text-left mb-4">
                {showFullLyrics ? lyrics : `${lyrics.substring(0, 100)}...`}
              </pre>
              <button
                onClick={handleToggleLyrics}
                className="bg-gray-500 text-white p-1 mt-2"
              >
                {showFullLyrics ? 'Show Less' : 'Show More'}
              </button>
            </>
          )}

          <div className="mt-4 w-full">
            <label htmlFor="quality" className="block mb-2">Select Quality:</label>
            <select
              id="quality"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="low">Low Quality</option>
              <option value="normal">Normal Quality</option>
              <option value="high">High Quality</option>
            </select>
          </div>

          <div className="flex justify-center mt-4 w-full">
            <button
              onClick={handleDownload}
              className="bg-green-500 text-white p-2 w-full"
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
