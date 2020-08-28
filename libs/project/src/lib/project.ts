export interface Project {
  title: string;
  author: string;
  description: string;
  license: License;
  imageUrl: string;
}

export type License = 'MIT' | 'CC0';
