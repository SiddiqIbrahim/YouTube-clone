import React, { useEffect, useState } from "react";
import "./Playvideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import user_profile from "../../assets/user_profile.jpg";
import { APT_KEY, value_converter } from "../../data";
import moment from "moment";
import { useParams } from "react-router-dom";

const Playvideo = () => {
  const {videoId} = useParams()
  
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([])
  // Fetch video details
  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${APT_KEY}`;
      const res = await fetch(videoDetails_url);
      const data = await res.json();
      setApiData(data.items?.[0] || null);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // Fetch channel details
  const fetchChannelData = async (channelId) => {
    try {
      const channelData_url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${APT_KEY}`;
      const res = await fetch(channelData_url);
      const data = await res.json();
      setChannelData(data.items?.[0] || null);
      //fetching Comment Data
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResult=50&videoId=${videoId}&key=${APT_KEY}`
      await fetch(comment_url).then(res=> res.json()) .then(data => setCommentData(data.items))
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  // Fetch video on mount
  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  // Fetch channel after video data loads
  useEffect(() => {
    if (apiData?.snippet?.channelId) {
      fetchChannelData(apiData.snippet.channelId);
    }
  }, [apiData]);

  if (!apiData) {
    return (
      <div className="play-video">
        <h3>Loading video...</h3>
      </div>
    );
  }

  return (
    <div className="play-video">
      {/* YouTube Video */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        title={apiData.snippet?.title}
      ></iframe>

      {/* Video Info */}
      <div className="play-video-info">
        <h3>{apiData.snippet?.title || "Title unavailable"}</h3>
        <p>
          {value_converter(apiData.statistics?.viewCount || 0)} Views &bull;{" "}
          {moment(apiData.snippet?.publishedAt).fromNow()}
        </p>

        <div className="video-actions">
          <span>
            <img src={like} alt="like" />{" "}
            {value_converter(apiData.statistics?.likeCount || 0)}
          </span>
          <span>
            <img src={dislike} alt="dislike" />
          </span>
          <span>
            <img src={share} alt="share" /> Share
          </span>
          <span>
            <img src={save} alt="save" /> Save
          </span>
        </div>
      </div>

      <hr />

      {/* Channel Info */}
      <div className="vid-description">
        <div className="publisher">
          <img
            src={
              channelData?.snippet?.thumbnails?.default?.url ||
              apiData.snippet?.thumbnails?.default?.url ||
              user_profile
            }
            alt="Channel thumbnail"
          />
          <div>
            <p>{apiData.snippet?.channelTitle}</p>
            <span>
              {channelData
                ? `${value_converter(
                    channelData.statistics?.subscriberCount || 0
                  )} Subscribers`
                : "Loading..."}
            </span>
          </div>
          <button>Subscribe</button>
        </div>

        <p>{apiData.snippet?.description?.slice(0, 250)}</p>
        <p>Subscribe The Greatview to Watch More Random Photos</p>
        <hr />

        <h4>
          {value_converter(apiData.statistics?.commentCount || 0)} Comments
        </h4>
        {commentData.map((item,index) => {
            return(
               <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User profile" />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
                </h3>
                <p> {item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="like" /> <span> {value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="dislike" />
                </div>
              </div>
            </div>
            )
        })}                                       
      </div>
    </div>
  );
};

export default Playvideo;
