type Link = {
  text: string;
  path: string;
  isSimpleLink?: boolean;
  icon?: string;
  hasIconAndText?: boolean;
};

type FooterSectionData = {
  title: string;
  path?: string;
  id?: string | number;
  links: Link[];
};

export type { Link, FooterSectionData };
