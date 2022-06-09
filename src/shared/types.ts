export type SearchParams = {
  items: string[];
  extensions: string[];
};

export type CommentParams = {
  enabled: boolean;
  start: string;
  end: string;
};

export type PartialSearchParams = Partial<SearchParams>;

export type PartialCommentParams = Partial<CommentParams>;

type CommonListingParams = {
  root: string;
  output: string;
  paddings: number;
  encoding: string;
  strict: boolean;
};

export type ListingParams = CommonListingParams & {
  comment: CommentParams;
  ignore: SearchParams;
  only: SearchParams;
};

export type PartialListingParams = Partial<CommonListingParams> & {
  comment?: PartialCommentParams;
  ignore?: PartialSearchParams;
  only?: PartialSearchParams;
};

export type PartialConfig = {
  params?: PartialListingParams[];
};
