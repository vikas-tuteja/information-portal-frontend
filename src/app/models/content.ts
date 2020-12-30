export interface Content {
    id: number;
    created_at: Date;
    event_date: Date;
    slug: string;
    title: string;
    summary: string;
    summaryimage: string;
    views: number;
    author: string;
  }

export interface Contents {
    results: Content[];
    count: number;
    next: string;
    previous: string;
  }