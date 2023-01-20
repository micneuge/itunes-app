export interface Album {
  category: Category;
  id: Id;
  'im:artist': Artist;
  'im:contentType': ContentType;
  'im:image': Image[];
  'im:itemCount': StringLabel;
  'im:name': StringLabel;
  'im:price': Price;
  'im:releaseDate': ReleaseDate;
  link: Link;
  rights: StringLabel;
  title: StringLabel;
}

interface Category {
  attributes: {
    'im:id': string;
    label: string;
    scheme: string;
    term: string;
  };
}

interface Id extends StringLabel {
  attributes: { 'im:id': string };
}

interface Artist extends StringLabel {
  attributes: {
    href: string;
  };
}

interface ContentType {
  attributes: ContentTypeAttributes;
  'im:contentType': { attributes: ContentTypeAttributes };
}

interface ContentTypeAttributes {
  term: string;
  label: string;
}

interface Image extends StringLabel {
  attributes: {
    height: string;
  };
}

interface Price extends StringLabel {
  attributes: {
    amount: string;
    currency: string;
  };
}

interface ReleaseDate extends StringLabel {
  attributes: {
    label: string;
  };
}

interface Link {
  attributes: {
    href: string;
    rel: string;
    type: string;
  };
}

interface StringLabel {
  label: string;
}
