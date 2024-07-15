import { useEffect, useState } from "react";
import "./App.css";
import Videos from "./components/videos"; // Make sure the path and casing are correct

function App() {
  const [ytVideo, setYtVideo] = useState([]);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await fetch("http://localhost:80/api/video/posts");
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json(); // Parse the response as JSON
        setYtVideo(data);
      } catch (err) {
        console.error('Fetch error: ', err);
      }
    }
    
    fetchVideos();
  }, []);

  return (
    <div className="app">
      <div className="app__videos">
        {ytVideo.length > 0 ? (
          ytVideo.map((vid) => (
            <Videos
              key={vid._id}
              id={vid._id}
              src={vid.url}
              channel={vid.channel}
              description={vid.description}
              like={vid.likes}
              dislike={vid.dislike}
              share={vid.shares}
              comment={vid.comment}
            />
          ))
        ) : (
          <p>Loading videos...</p>
        )}
      </div>
    </div>
  );
}

export default App;
