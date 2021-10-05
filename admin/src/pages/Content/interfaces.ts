export interface ILesson {
  id: string;
  title: string;
  description: string;
  text_content: string;
  video_url: string;
}

export interface ISchoolClassLesson {
  id: string;
  lesson: ILesson;
  school_class_id: string;
  public_at: string;
}
