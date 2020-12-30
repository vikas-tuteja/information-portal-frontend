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
}

export interface Content {
    id: number;
    created_at: Date;
    event_date: Date;
    slug: string;
    title: string;
    summary: string;
    summary_image: string;
    views: number;
    author: string;
  }

export interface Contents {
    results: Content[];
    count: number;
    next: string;
    previous: string;
  }