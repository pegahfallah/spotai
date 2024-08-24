import axios from 'axios';

const fetchPlaylistTracks = async (playlistId: string, token: string) => {
  try {
    const response = await axios.get('/api/get-playlist-tracks', {
      params: {
        playlistId,
        token,
      },
    });
    return response.data.tracks;
  } catch (error) {
    console.error('Error fetching playlist tracks:', error);
    return null;
  }
};
