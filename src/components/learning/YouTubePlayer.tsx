import React from 'react';
import ReactPlayer from 'react-player/youtube';

interface YouTubePlayerProps {
  url: string;
  onProgress: (progress: { played: number }) => void;
  onEnded: () => void;
}

export function YouTubePlayer({ url, onProgress, onEnded }: YouTubePlayerProps) {
  return (
    <div className="aspect-video">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        onProgress={onProgress}
        onEnded={onEnded}
        config={{
          youtube: {
            playerVars: {
              modestbranding: 1,
              rel: 0
            }
          }
        }}
      />
    </div>
  );
}