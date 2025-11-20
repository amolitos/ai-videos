export interface ApiVideoData {
  aspect_ratio: { name: string };
  scenes: any[];
  track: any;
  template?: any;
}

export const fetchVideoById = async (
  apiUrl: string,
  videoId: string,
  token?: string
): Promise<ApiVideoData> => {
  const url = `${apiUrl}/api/v1.0/videos/${videoId}?template&voice_chunks`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Error fetching video data: ${response.statusText}`);
  }

  return response.json();
};
