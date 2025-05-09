export interface ISubmitReview {
  rating: number;
  text: string;
}

export interface IReview {
  client: {
    id: string;
    first_name: string;
    last_name: string;
  };
  worker: {
    id: string;
    first_name: string;
    last_name: string;
  };
  job: {
    id: string;
    status: string;
    service: {
      title: string;
      description: string;
      location: string;
      id: string;
    };
  };
  id: string;
  reviewer_id: string;
  worker_id: string;
  job_id: string;
  rating: number;
  text: string;
  is_flagged: boolean;
  created_at: string;
  updated_at: string;
}

export interface IWorkerSummary {
  average_rating: number;
  total_reviews: number;
}
