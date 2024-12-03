export function getYouTubeId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function validateYouTubeUrl(url: string): boolean {
  return Boolean(getYouTubeId(url));
}

export function formatYouTubeUrl(url: string): string {
  const videoId = getYouTubeId(url);
  return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
}

export function getYouTubeThumbnail(url: string): string {
  const videoId = getYouTubeId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
}