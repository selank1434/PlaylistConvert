export interface SpotifyPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height?: number;
      url: string;
      width?: number;
    }[];
    name: string;
    owner: {
      display_name: string;
      external_urls: {
        [key: string]: string;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
    };
    primary_color: null | string;
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string;
      total: number;
    };
    type: string;
    uri: string;
  }
  

  export interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      // Add other thumbnail sizes if applicable
    };
    channelTitle: string;
    // Add other properties based on the actual structure of the snippet object
  }
  
  export interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  export interface PlaylistItem {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
  }
  




  export interface PlaylistListResponse {
    kind: 'youtube#playlistListResponse';
    etag: string;
    nextPageToken: string;
    pageInfo: {
      totalResults: number;
      resultsPerPage: number;
    };
    items: PlaylistItem[];
  }







  export interface PlaylistItemListResponse {
    kind: 'youtube#playlistItemListResponse';
    etag: string;
    items: PlaylistListItem[];
    pageInfo: {
      // Add pageInfo properties if needed
    };
  }
  
  export interface PlaylistListItem {
    etag: string;
    id: string;
    kind: string;
    snippet: {
        channelId: string;
        channelTitle: string;
        description: string;
        playlistId: string;
        position: number;
        publishedAt: string;
        resourceId: {
          kind: string;
          videoId: string;
        };
        thumbnails: {
          default: {
            url: string;
            width: number;
            height: number;
          };
          medium: {
            url: string;
            width: number;
            height: number;
          };
          high: {
            url: string;
            width: number;
            height: number;
          };
          standard: {
            url: string;
            width: number;
            height: number;
          };
          maxres: {
            url: string;
            width: number;
            height: number;
          };
        };
        title: string;
        videoOwnerChannelId: string;
        videoOwnerChannelTitle: string;
      }
      
    };
  
export interface nesscarySpotifyTrackInfo {
    uri: string
}