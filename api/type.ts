export interface Res<T> {
  errcode: number;
  data: T;
  msg?: "";
}

// 文章列表项
export interface Article {
  id: number;
  home_column_id: number;
  home_category_id: string;
  title: string;
  summary: string;
  thumbnails: Thumbnail[];
  widget_items: any[];
  widget_config: any[];
  ad_config: AdConfig;
  item_template: string;
  published_at_timestamp: number;
  published_at_gmt: string;
  published_at_human: string;
  published_at: string;
  sort: number;
  is_recommended: number;
  redirectable: Redirectable;
  tag: number;
  tag_str: string;
  tag_style: string;
  source_from: string;
}

// 缩略图
export interface Thumbnail {
  src: string;
  width: string;
  height: string;
  id: string;
}

// 广告配置
export interface AdConfig {
  ad_position_title: string;
  ad_position_key: string;
  ad_position_style: string;
}

// 重定向配置
export interface Redirectable {
  redirect_type: string;
  redirectable_type: string;
  redirectable_id: string;
  redirect_url: string;
}

// 分页链接
export interface PaginationLinks {
  first: string;
  last: string;
  prev: string;
  next: string;
}

// 分页元数据链接项
export interface PaginationLinkItem {
  url: string;
  label: string;
  active: boolean;
}

// 分页元数据
export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLinkItem[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

// 文章列表响应数据
export interface ArticleListData {
  data: Article[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

// 文章列表完整响应类型
export type ArticleListResponse = Res<ArticleListData>;
