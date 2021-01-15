export interface FAQs   {
  id: number,
  created_at: Date,
  updated_at: Date,
  question: string,
  answer: string,
  position: number,
  active: boolean
}

export interface FAQsList {
  results: FAQs[];
  count: number;
  next: string;
  previous: string;
}
