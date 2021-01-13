export interface ContentDetail {
  id: number;
  created_at: Date;
  event_date: Date;
  name: string;
  slug: string;
  title: string;
  content: string;
  summary: string;
  summary_image: string;
  views: 0,
  active: true,
  author: string;
  is_fake: boolean;
}

export interface Contents {
  results: ContentDetail[];
  count: number;
  next: string;
  previous: string;
}

export interface Audio {
  id: number;
  created_at: Date;
  event_date: Date;
  slug: string;
  title: string;
  summary: string;
  summary_image: string;
  views: number;
  author: string;
  audio_file: string;
  size: number;
  filetype: string;
  album_name: string;
  singer_name: string;
  duration: string;
}

export interface AudioLibrary {
  results: Audio[];
  count: number;
  next: string;
  previous: string;
}

export interface SearchItem {
  title: string;
  sub_category__name: string;
  href: string;
}

export interface SearchList {
  results: SearchItem[];
  count: number;
}