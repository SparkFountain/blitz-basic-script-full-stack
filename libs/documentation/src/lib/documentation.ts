export interface GeneralCategory {
  title: string;
  icon: string;
  path: string;
}

export interface KeywordCategory {
  path: string;
  title: string;
  description: string;
}

export interface CommandCategory {
  path: string;
  title: string;
  description: string;
}

export interface CommandPreview {
  name: string;
  description: string;
}

export interface Breadcrumb {
  title: string;
  path: string;
}

export interface NavigationElement {
  title: string;
  path: string;
}

export interface Command {
  name: string;
  params: CommandParam[];
  description: string;
  infos: string;
  return: {
    name: string;
    description: string;
  };
  code: string; // TODO: consider string array as well
}

export interface CommandParam {
  name: string;
  description: string;
  optional: boolean;
}
