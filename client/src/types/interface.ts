/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react";
import { TypeOfFileList } from "./type";

interface IImgUploaderProps {
  steps?: IInputStepSection[];
  imgName: string;
  currentIndex?: number;
  imgUrl: string;
  stepImgFiles?: TypeOfFileList[];
  setStepImgFiles?: Dispatch<SetStateAction<TypeOfFileList[]>>;
  setImgName?: Dispatch<SetStateAction<string>>;
}

interface IStepMakerProps {
  // setEditResponse?: Dispatch<SetStateAction<IEditResponseData | undefined>>;
  // editResponse?: IEditResponseData | undefined;
  directDatas: IInputStepSection[];
  setDirectDatas: Dispatch<SetStateAction<IInputStepSection[]>>;
  stepImgFiles: TypeOfFileList[];
  setStepImgFiles: Dispatch<SetStateAction<TypeOfFileList[]>>;
  // clickEvent?: (orderValue: string) => Promise<void> | void;
}

interface IStepSetProps {
  idx: number;
  text: string;
  imgUrl: string;
  steps: IInputStepSection[];
  stepImgFiles: TypeOfFileList[];
  setStepImgFiles: Dispatch<SetStateAction<TypeOfFileList[]>>;
  directDatas: IInputStepSection[];
  setDirectDatas: Dispatch<SetStateAction<IInputStepSection[]>>;
}

interface IResponseImgProps {
  contentType?: string;
  createData?: string;
  fileName: string;
  fileSize?: number;
  id: number;
  modDate?: string;
  originFileName?: string;
}

interface IItemProps {
  id: number;
  title: string;
  imgThumbNailUrl: string;
  stars: string;
  tags: ITagProps[];
  createDate: string;
  bookmarked: boolean;
  reviewCount: number;
}

interface IRecipeDataProps {
  mainData?: IItemProps[];
  searchData?: IItemProps[];
  setSearchSortBy?: React.Dispatch<React.SetStateAction<string>>;
}

interface ICategory {
  rice?: string;
  noddle?: string;
  dessert?: string;
  beverage?: string;
  etc?: string;
}

interface ICategoryProps {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

interface IIconProps {
  img: string;
  alt: string;
  text: string;
  link: string;
  clickEvent: (categoryValue: string) => void;
}

interface IRemoveBtnProps {
  removeHandler: (idx: number) => void;
  idx: number;
}

interface IPostResponceProps {
  id: number;
  title: string;
  bookmarked: boolean;
  body: string;
  imgThumbNailUrl?: string;
  category: string;
  stars: string;
  views: number;
  createDate: string;
  modifyDate: string;
  tags: ITagProps[];
  owner: IPostUserProps;
  directions: IPostDirectionsProps[];
  ingredients: IInputIngredientSection[];
}

interface IPostUserProps {
  userId: number;
  name: string;
  imgProfileUrl?: null;
  followed: boolean;
}

interface IPostCategoryProps {
  category: string;
  stars: string;
  views: number;
  createDate: string;
  bookmarked: boolean;
  tags: ITagProps[];
}

interface IPostDirectionsProps {
  index?: number;
  imgDirectionUrl?: string;
  body: string;
}

interface IUser {
  id: number;
  name: string;
  bio: string;
  email: string;
  imgProfileUrl: string;
}

interface IUserData {
  user: IUser;
  followerCount: number;
  followingCount: number;
  imgProfileUrl: string;
}

interface IMyRecipeData {
  recipeData: IItemProps[];
}

interface IReviewData {
  body: string;
  createDate: string;
  id: number;
  stars: number;
  recipeId: number;
  recipeTitle: string;
  recipeImgThumbNail: string;
}

interface IReviewProps {
  reviewData: IReviewData[];
}

interface IBookMarkProps {
  bookMarkData: IBookMarkData[];
}

interface IBookMarkData {
  id: number;
  title: string;
  ownerNickName: string;
  imgThumbNailUrl: string;
  createDate: string;
  tags: ITagProps[];
}

interface IFollowProps {
  followData: IFollowData[];
}

interface IFollowData {
  id: number;
  name: string;
  imgProfileUrl: string;
  userId: number;
}

interface IFollowingProps {
  followingData: IFollowData[];
  setFollowingData: React.Dispatch<React.SetStateAction<any[]>>;
}

interface IStarProps {
  starClicked?: boolean[];
  setStarClicked?: React.Dispatch<React.SetStateAction<boolean[]>>;
}

/** ----------------- Recipe 등록 / 수정 페이지 관련 interface ----------------- */
interface IRecipeData {
  inputTexts: IEditResponseData;
  thumbNail: TypeOfFileList;
  stepImgFiles: TypeOfFileList | [];
}

interface IEditResponseData {
  title: string;
  body: string;
  category: string;
  ingredients: IInputIngredientSection[];
  directions: IInputStepSection[];
  tags: ITagProps[];
}

// 첫번째 영역 관련
interface IRadioBtnProps {
  name: string;
  data: string;
  icon: string;
  checked: boolean;
}

interface IThumbNailProps {
  isMypage?: boolean;
  setProfileImageFile?: Dispatch<SetStateAction<TypeOfFileList>>;
  resThumbNailImgUrl?: string;
}

// 두번째 영역 관련(재료)
interface IInputIngredientSection {
  index: number;
  name: string;
  amount: string;
  isEssential: boolean;
}

interface IIngredientSetProps {
  idx: number;
  ingredient: IInputIngredientSection;
}

// 세번째 영역 관련(순서)
interface IInputStepSection {
  imgDirectionUrl: string;
  body: string;
  index: number;
  isUploaded: boolean;
}

// 네번째 영역 관련(태그)
interface ITagProps {
  id?: number;
  name: string;
}

interface ITagWithBtnProps {
  id: number;
  tagValue: string;
}

// 삭제예정
interface IRecipeTemp {
  body: string;
  title: string;
}

export type {
  IThumbNailProps,
  IImgUploaderProps,
  IStepMakerProps,
  IResponseImgProps,
  IIngredientSetProps,
  IStepSetProps,
  IItemProps,
  ITagProps,
  IRecipeDataProps,
  IRadioBtnProps,
  ICategory,
  ICategoryProps,
  IIconProps,
  ITagWithBtnProps,
  IRemoveBtnProps,
  IInputStepSection,
  IPostResponceProps,
  IInputIngredientSection,
  IPostDirectionsProps,
  IPostUserProps,
  IPostCategoryProps,
  IEditResponseData,
  IUserData,
  IMyRecipeData,
  IReviewProps,
  IBookMarkProps,
  IFollowProps,
  IFollowingProps,
  IStarProps,
  IRecipeData,
  IRecipeTemp, // 삭제예정
};
