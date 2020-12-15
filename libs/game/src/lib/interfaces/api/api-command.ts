export interface ApiCommand {
  name: string;
  description: {
    en: string;
    de: string;
  };
  category: string;
  subCategory: string;
  params: ApiCommandParam[];
  return: {
    name: string;
    description: {
      en: string;
      de: string;
    };
  };
  code: string[];
}

export interface ApiCommandParam {
  name: string;
  offset: number;
  description?: string;
  optional?: boolean;
}
