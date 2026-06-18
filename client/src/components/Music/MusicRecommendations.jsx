import { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { FaPlay, FaPause, FaSpotify, FaYoutube } from 'react-icons/fa';
import './MusicRecommendations.css';

// Placeholder data (will be replaced with API data)
const placeholderPlaylists = {
  sunny: [
    {
      id: 1,
      title: 'Summer Vibes',
      description: 'Upbeat tracks perfect for sunny days',
      image: 'https://images.unsplash.com/photo-1534196511436-921a4e99f297?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'Spotify',
      link: 'https://open.spotify.com',
      tracks: [
        { name: 'Happy', artist: 'Pharrell Williams' },
        { name: 'Walking on Sunshine', artist: 'Katrina & The Waves' },
        { name: 'Good Vibrations', artist: 'The Beach Boys' }
      ]
    },
    {
      id: 2,
      title: 'Beach Party',
      description: 'Dance hits for your beach day',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'YouTube',
      link: 'https://youtube.com',
      tracks: [
        { name: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee' },
        { name: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake' },
        { name: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' }
      ]
    }
  ],
  rainy: [
    {
      id: 1,
      title: 'Rainy Day Acoustics',
      description: 'Soothing acoustic tracks for rainy weather',
      image: 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'Spotify',
      link: 'https://open.spotify.com',
      tracks: [
        { name: 'Skinny Love', artist: 'Bon Iver' },
        { name: 'The A Team', artist: 'Ed Sheeran' },
        { name: 'Banana Pancakes', artist: 'Jack Johnson' }
      ]
    },
    {
      id: 2,
      title: 'Chill Jazz',
      description: 'Relaxing jazz for rainy afternoons',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'YouTube',
      link: 'https://youtube.com',
      tracks: [
        { name: 'Take Five', artist: 'Dave Brubeck' },
        { name: 'So What', artist: 'Miles Davis' },
        { name: 'Autumn Leaves', artist: 'Bill Evans Trio' }
      ]
    }
  ],
  cloudy: [
    {
      id: 1,
      title: 'Indie Mood',
      description: 'Indie tracks for cloudy days',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'Spotify',
      link: 'https://open.spotify.com',
      tracks: [
        { name: 'Sweater Weather', artist: 'The Neighbourhood' },
        { name: 'Midnight City', artist: 'M83' },
        { name: '1901', artist: 'Phoenix' }
      ]
    },
    {
      id: 2,
      title: 'Chill Electronic',
      description: 'Ambient electronic music for cloudy skies',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'YouTube',
      link: 'https://youtube.com',
      tracks: [
        { name: 'Strobe', artist: 'Deadmau5' },
        { name: 'Flim', artist: 'Aphex Twin' },
        { name: 'Dayvan Cowboy', artist: 'Boards of Canada' }
      ]
    }
  ],
  default: [
    {
      id: 1,
      title: 'Top Hits',
      description: 'Current popular tracks',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'Spotify',
      link: 'https://open.spotify.com',
      tracks: [
        { name: 'Blinding Lights', artist: 'The Weeknd' },
        { name: 'Dance Monkey', artist: 'Tones and I' },
        { name: 'Don\'t Start Now', artist: 'Dua Lipa' }
      ]
    },
    {
      id: 2,
      title: 'Chill Mix',
      description: 'Relaxing tracks for any mood',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      platform: 'YouTube',
      link: 'https://youtube.com',
      tracks: [
        { name: 'Sunday Morning', artist: 'Maroon 5' },
        { name: 'Watermelon Sugar', artist: 'Harry Styles' },
        { name: 'Circles', artist: 'Post Malone' }
      ]
    }
  ]
};

const MusicRecommendations = ({ recommendations }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [playingTrack, setPlayingTrack] = useState(null);
  
  // Use API recommendations if available, otherwise use placeholder data
  const getPlaylists = () => {
    if (recommendations && recommendations.length > 0) {
      return recommendations;
    }
    
    // Use placeholder data based on weather
    // In a real app, this would come from the weather context
    const weather = 'default'; // Could be 'sunny', 'rainy', 'cloudy', etc.
    return placeholderPlaylists[weather] || placeholderPlaylists.default;
  };
  
  const playlists = getPlaylists();
  
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
    setPlayingTrack(null);
  };
  
  const handleBackClick = () => {
    setSelectedPlaylist(null);
    setPlayingTrack(null);
  };
  
  const togglePlay = (track) => {
    if (playingTrack === track) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(track);
    }
  };
  
  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'spotify':
        return <FaSpotify />;
      case 'youtube':
        return <FaYoutube />;
      default:
        return <BsMusicNoteBeamed />;
    }
  };

  return (
    <Card className="dashboard-card music-card">
      <Card.Header className="dashboard-card-header">
        <h4 className="dashboard-card-title">
          <BsMusicNoteBeamed /> Music Recommendations
        </h4>
      </Card.Header>
      <Card.Body className="dashboard-card-body">
        {selectedPlaylist ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="playlist-detail"
          >
            <Button 
              variant="outline-primary" 
              size="sm" 
              onClick={handleBackClick}
              className="mb-3"
            >
              ← Back to playlists
            </Button>
            
            <div className="playlist-detail-content">
              <div className="playlist-detail-image">
                <img src={selectedPlaylist.image} alt={selectedPlaylist.title} />
                <div className="playlist-platform">
                  {getPlatformIcon(selectedPlaylist.platform)}
                </div>
              </div>
              <div className="playlist-detail-info">
                <h3>{selectedPlaylist.title}</h3>
                <p className="playlist-description">{selectedPlaylist.description}</p>
                
                <div className="playlist-tracks">
                  <h5>Tracks:</h5>
                  <ul className="track-list">
                    {selectedPlaylist.tracks.map((track, index) => (
                      <li key={index} className="track-item">
                        <div className="track-info">
                          <span className="track-name">{track.name}</span>
                          <span className="track-artist">{track.artist}</span>
                        </div>
                        <Button 
                          variant="link" 
                          className="track-play-btn"
                          onClick={() => togglePlay(track)}
                        >
                          {playingTrack === track ? <FaPause /> : <FaPlay />}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant="primary" 
                  className="mt-3"
                  href={selectedPlaylist.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in {selectedPlaylist.platform}
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div>
            <p className="recommendation-intro">
              Weather-appropriate music to enhance your mood:
            </p>
            
            <Row className="playlist-grid">
              {playlists.map((playlist) => (
                <Col key={playlist.id} md={6} className="mb-3">
                  <motion.div
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div 
                      className="playlist-card" 
                      onClick={() => handlePlaylistClick(playlist)}
                    >
                      <div className="playlist-image">
                        <img src={playlist.image} alt={playlist.title} />
                        <div className="playlist-platform">
                          {getPlatformIcon(playlist.platform)}
                        </div>
                      </div>
                      <div className="playlist-content">
                        <h5 className="playlist-title">{playlist.title}</h5>
                        <p className="playlist-description">{playlist.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MusicRecommendations;
