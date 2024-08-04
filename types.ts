import { Comment, CommentReaction, Deal } from "@prisma/client";

export interface DealBase extends Deal {
  user: {
    username: string;
  };
}

export interface CommentBase extends Comment {
  user: {
    username: string;
  };
}

export interface DealWithComments extends DealBase {
  comments?: Comment[];
  commentCount?: number;
}

export interface CommentWithLikes extends CommentBase {
  reactions: CommentReaction[];
  childComments?: CommentWithChildren[];
}

export interface CommentWithChildren extends CommentBase {
  childComments?: CommentWithChildren[];
}

export interface FormData {
  link: string;
  title: string;
  description: string;
  category: string;
  imageUrls: string[];
  startDate?: Date;
  endDate?: Date;
  categoryId: string;
  price: number;
  nextBestPrice: number;
  promoCode?: string;
  shippingPrice: number;
}

export interface DealLinkFormValues {
  link: string;
}

export interface DealDescriptionFormValues {
  description: string;
}

export interface DealFinalFormValues {
  startDate?: Date;
  endDate?: Date;
  categoryId: string;
}
