export type ArticleItemType = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTime: string;
  category: string;
  coverImage: string;
  featured?: boolean;
  excerpt: string;
};

export type ArticleSectionType = {
  heading: string;
  paragraphs: string[];
  quote?: string;
};

export type ArticleDetailType = ArticleItemType & {
  intro: string;
  sections: ArticleSectionType[];
  conclusion?: string;
  relatedArticleSlugs: string[];
};
