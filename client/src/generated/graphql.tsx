import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type AddBrandInput = {
  brand: Scalars['String'];
  img: Scalars['String'];
};

export type AddCategoryInput = {
  category: Scalars['String'];
  img: Scalars['String'];
  type: Scalars['String'];
};

export type AddImgInput = {
  img: Scalars['String'];
};

export type AddProductInput = {
  addOptions: Array<AddProductOptionInput>;
  brandId: Scalars['String'];
  categoryId: Scalars['String'];
  name: Scalars['String'];
  path: Scalars['String'];
};

export type AddProductOptionInput = {
  addImgs: Array<AddImgInput>;
  addPrices: Array<AddProductPriceInput>;
  name: Scalars['String'];
  valueIds: Array<Scalars['String']>;
};

export type AddProductPriceInput = {
  colorId: Scalars['String'];
  note: Scalars['String'];
  optionId?: InputMaybe<Scalars['String']>;
  price: Scalars['Float'];
  type?: InputMaybe<PriceType>;
};

export type BrandMutationResponse = IMutationResponse & {
  __typename?: 'BrandMutationResponse';
  brands?: Maybe<Array<Brands>>;
  code: Scalars['Float'];
  fieldErrors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type Brands = {
  __typename?: 'Brands';
  id: Scalars['String'];
  img: Imgs;
  name: Scalars['String'];
};

export type Categories = {
  __typename?: 'Categories';
  attributes: Array<ProductAttributes>;
  createAt: Scalars['DateTime'];
  id: Scalars['ID'];
  img: Imgs;
  name: Scalars['String'];
  news: Array<News>;
  products: Array<Products>;
  type: TypeCategories;
};

export type CategoryMutationResponse = IMutationResponse & {
  __typename?: 'CategoryMutationResponse';
  categories?: Maybe<Array<Categories>>;
  code: Scalars['Float'];
  fieldErrors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  pagination?: Maybe<Pagination>;
  success: Scalars['Boolean'];
};

export enum Condition {
  Stoking = 'STOKING',
  Stop = 'STOP',
  Waiting = 'WAITING'
}

export type Contents = {
  __typename?: 'Contents';
  id: Scalars['String'];
  title: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type IMutationResponse = {
  code: Scalars['Float'];
  fieldErrors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type ImgMutationResponse = IMutationResponse & {
  __typename?: 'ImgMutationResponse';
  code: Scalars['Float'];
  fieldError?: Maybe<Array<FieldError>>;
  fieldErrors?: Maybe<Array<FieldError>>;
  img?: Maybe<Imgs>;
  imgs?: Maybe<Array<Imgs>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export enum ImgOf {
  Icon = 'ICON',
  News = 'NEWS',
  Product = 'PRODUCT',
  User = 'USER'
}

export type Imgs = {
  __typename?: 'Imgs';
  Of: ImgOf;
  id: Scalars['String'];
  name: Scalars['String'];
  src: Scalars['String'];
  type: Scalars['String'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addAttribute: ProductAttributeMutationResponse;
  addBrand: BrandMutationResponse;
  addCategory: CategoryMutationResponse;
  addProduct: ProductMutationResponse;
  deleteProduct: Scalars['Boolean'];
  login: UserMutationResponse;
  logout: Scalars['Boolean'];
  register: UserMutationResponse;
  uploadImg: ImgMutationResponse;
};


export type MutationAddAttributeArgs = {
  attribute: Scalars['String'];
};


export type MutationAddBrandArgs = {
  addBrandInput: AddBrandInput;
};


export type MutationAddCategoryArgs = {
  addCategoryInput: AddCategoryInput;
};


export type MutationAddProductArgs = {
  productOptionInput: AddProductInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationUploadImgArgs = {
  file: Scalars['Upload'];
};

export type News = {
  __typename?: 'News';
  category: Categories;
  content: Contents;
  id: Scalars['String'];
  img: Imgs;
  path: Paths;
  title: Scalars['String'];
  top: Scalars['Float'];
};

export type Pagination = {
  __typename?: 'Pagination';
  cursor?: Maybe<Scalars['DateTime']>;
  hasMore: Scalars['Boolean'];
  totalCount: Scalars['Float'];
};

export type Paths = {
  __typename?: 'Paths';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum PriceType {
  Default = 'DEFAULT',
  HistoricalCost = 'HISTORICAL_COST',
  Increase = 'INCREASE',
  Raise = 'RAISE',
  Sale = 'SALE'
}

export type ProductAttributeMutationResponse = IMutationResponse & {
  __typename?: 'ProductAttributeMutationResponse';
  attributes?: Maybe<Array<ProductAttributes>>;
  code: Scalars['Float'];
  fieldErrors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type ProductAttributes = {
  __typename?: 'ProductAttributes';
  id: Scalars['String'];
  name: Scalars['String'];
  values: Array<ProductValues>;
};

export type ProductColorMutationResponse = IMutationResponse & {
  __typename?: 'ProductColorMutationResponse';
  code: Scalars['Float'];
  color?: Maybe<Array<ProductColors>>;
  fieldErrors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type ProductColors = {
  __typename?: 'ProductColors';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ProductMutationResponse = IMutationResponse & {
  __typename?: 'ProductMutationResponse';
  categoryId?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  fieldErrors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  pagination?: Maybe<Pagination>;
  products?: Maybe<Array<Products>>;
  success: Scalars['Boolean'];
};

export type ProductOptions = {
  __typename?: 'ProductOptions';
  condition: Condition;
  createAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imgs: Array<Imgs>;
  name: Scalars['String'];
  prices: Array<ProductPrices>;
  values: Array<ProductValues>;
};

export type ProductPrices = {
  __typename?: 'ProductPrices';
  color: ProductColors;
  createAt: Scalars['DateTime'];
  id: Scalars['String'];
  note: Scalars['String'];
  price: Scalars['Float'];
  type: PriceType;
};

export type ProductValues = {
  __typename?: 'ProductValues';
  attribute: ProductAttributes;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Products = {
  __typename?: 'Products';
  brand: Brands;
  category: Categories;
  categoryId: Scalars['String'];
  createAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  options: Array<ProductOptions>;
  path: Paths;
};

export type Query = {
  __typename?: 'Query';
  categories: CategoryMutationResponse;
  hello: Scalars['String'];
  me?: Maybe<Users>;
  productAttributes: ProductAttributeMutationResponse;
  productColors: ProductColorMutationResponse;
  productsByCategoryId: ProductMutationResponse;
  showBrands: BrandMutationResponse;
  showImgs: ImgMutationResponse;
  showProducts: ProductMutationResponse;
};


export type QueryCategoriesArgs = {
  cursor?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryProductAttributesArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
};


export type QueryProductsByCategoryIdArgs = {
  categoryId?: InputMaybe<Scalars['String']>;
  cursor?: InputMaybe<Scalars['DateTime']>;
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryShowImgsArgs = {
  of?: InputMaybe<ImgOf>;
};

export type RegisterInput = {
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  rePassword?: InputMaybe<Scalars['String']>;
  theme?: InputMaybe<Scalars['String']>;
};

export enum TypeCategories {
  News = 'NEWS',
  Product = 'PRODUCT'
}

export type UserMutationResponse = IMutationResponse & {
  __typename?: 'UserMutationResponse';
  accessToken?: Maybe<Scalars['String']>;
  code: Scalars['Float'];
  fieldErrors?: Maybe<Array<FieldError>>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
  user?: Maybe<Users>;
};

export type Users = {
  __typename?: 'Users';
  avatar: Scalars['String'];
  createAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  theme: Scalars['String'];
  updateAt: Scalars['DateTime'];
};

export type BrandInfoFragment = { __typename?: 'Brands', name: string, id: string };

export type CategoryInfoFragment = { __typename?: 'Categories', name: string, type: TypeCategories, id: string, img: { __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf } };

export type CategoryMutationResponseFragment = { __typename?: 'CategoryMutationResponse', code: number, message: string, success: boolean, categories?: Array<{ __typename?: 'Categories', name: string, type: TypeCategories, id: string, img: { __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf } }> | null, pagination?: { __typename?: 'Pagination', cursor?: any | null, hasMore: boolean, totalCount: number } | null };

export type FieldErrorInfoFragment = { __typename?: 'FieldError', name: string, message?: string | null, code?: string | null };

export type ImgInfoFragment = { __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf };

export type ImgMutationResponseFragment = { __typename?: 'ImgMutationResponse', code: number, success: boolean, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null, img?: { __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf } | null };

export type PaginationFragment = { __typename?: 'Pagination', cursor?: any | null, hasMore: boolean, totalCount: number };

export type PathInfoFragment = { __typename?: 'Paths', name: string, id: string };

export type ProductAttributeInfoFragment = { __typename?: 'ProductAttributes', name: string, id: string, values: Array<{ __typename?: 'ProductValues', name: string, id: string }> };

export type ProductInfoFragment = { __typename?: 'Products', name: string, id: string, createAt: any, brand: { __typename?: 'Brands', name: string }, options: Array<{ __typename?: 'ProductOptions', id: string, name: string, prices: Array<{ __typename?: 'ProductPrices', price: number, type: PriceType, note: string, color: { __typename?: 'ProductColors', name: string } }>, values: Array<{ __typename?: 'ProductValues', name: string, id: string }>, imgs: Array<{ __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf }> }>, category: { __typename?: 'Categories', name: string }, path: { __typename?: 'Paths', name: string } };

export type ProductMutationResponseFragment = { __typename?: 'ProductMutationResponse', code: number, message: string, success: boolean, categoryId?: string | null, products?: Array<{ __typename?: 'Products', name: string, id: string, createAt: any, brand: { __typename?: 'Brands', name: string }, options: Array<{ __typename?: 'ProductOptions', id: string, name: string, prices: Array<{ __typename?: 'ProductPrices', price: number, type: PriceType, note: string, color: { __typename?: 'ProductColors', name: string } }>, values: Array<{ __typename?: 'ProductValues', name: string, id: string }>, imgs: Array<{ __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf }> }>, category: { __typename?: 'Categories', name: string }, path: { __typename?: 'Paths', name: string } }> | null, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null, pagination?: { __typename?: 'Pagination', cursor?: any | null, hasMore: boolean, totalCount: number } | null };

export type ProductOptionInfoFragment = { __typename?: 'ProductOptions', id: string, name: string, prices: Array<{ __typename?: 'ProductPrices', price: number, type: PriceType, note: string, color: { __typename?: 'ProductColors', name: string } }>, values: Array<{ __typename?: 'ProductValues', name: string, id: string }>, imgs: Array<{ __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf }> };

export type ProductPriceInfoFragment = { __typename?: 'ProductPrices', price: number, type: PriceType, note: string, color: { __typename?: 'ProductColors', name: string } };

export type ProductValueInfoFragment = { __typename?: 'ProductValues', name: string, id: string };

export type UserInfoFragment = { __typename?: 'Users', id: string, avatar: string, email: string, theme: string };

export type UserMutationResponseFragment = { __typename?: 'UserMutationResponse', code: number, message: string, success: boolean, user?: { __typename?: 'Users', id: string, avatar: string, email: string, theme: string } | null, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null };

export type AddProductMutationVariables = Exact<{
  productOptionInput: AddProductInput;
}>;


export type AddProductMutation = { __typename?: 'Mutation', addProduct: { __typename?: 'ProductMutationResponse', code: number, message: string, success: boolean, categoryId?: string | null, products?: Array<{ __typename?: 'Products', name: string, id: string, createAt: any, brand: { __typename?: 'Brands', name: string }, options: Array<{ __typename?: 'ProductOptions', id: string, name: string, prices: Array<{ __typename?: 'ProductPrices', price: number, type: PriceType, note: string, color: { __typename?: 'ProductColors', name: string } }>, values: Array<{ __typename?: 'ProductValues', name: string, id: string }>, imgs: Array<{ __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf }> }>, category: { __typename?: 'Categories', name: string }, path: { __typename?: 'Paths', name: string } }> | null, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null, pagination?: { __typename?: 'Pagination', cursor?: any | null, hasMore: boolean, totalCount: number } | null } };

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserMutationResponse', code: number, message: string, success: boolean, user?: { __typename?: 'Users', id: string, avatar: string, email: string, theme: string } | null, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserMutationResponse', code: number, success: boolean, message: string, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null } };

export type UploadImgMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadImgMutation = { __typename?: 'Mutation', uploadImg: { __typename?: 'ImgMutationResponse', code: number, success: boolean, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null, img?: { __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf } | null } };

export type BrandQueryVariables = Exact<{ [key: string]: never; }>;


export type BrandQuery = { __typename?: 'Query', showBrands: { __typename?: 'BrandMutationResponse', code: number, message: string, success: boolean, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null, brands?: Array<{ __typename?: 'Brands', name: string, id: string }> | null } };

export type CategoryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['DateTime']>;
}>;


export type CategoryQuery = { __typename?: 'Query', categories: { __typename?: 'CategoryMutationResponse', code: number, message: string, success: boolean, categories?: Array<{ __typename?: 'Categories', name: string, type: TypeCategories, id: string, img: { __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf } }> | null, pagination?: { __typename?: 'Pagination', cursor?: any | null, hasMore: boolean, totalCount: number } | null } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type ImgsQueryVariables = Exact<{
  of?: InputMaybe<ImgOf>;
}>;


export type ImgsQuery = { __typename?: 'Query', showImgs: { __typename?: 'ImgMutationResponse', code: number, success: boolean, message: string, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null, imgs?: Array<{ __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf }> | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', id: string, avatar: string, email: string, theme: string } | null };

export type ProductAttributesQueryVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type ProductAttributesQuery = { __typename?: 'Query', productAttributes: { __typename?: 'ProductAttributeMutationResponse', code: number, success: boolean, message: string, attributes?: Array<{ __typename?: 'ProductAttributes', name: string, id: string, values: Array<{ __typename?: 'ProductValues', name: string, id: string }> }> | null } };

export type ProductColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductColorsQuery = { __typename?: 'Query', productColors: { __typename?: 'ProductColorMutationResponse', code: number, success: boolean, message: string, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null, color?: Array<{ __typename?: 'ProductColors', name: string, id: string }> | null } };

export type ProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['DateTime']>;
  categoryId?: InputMaybe<Scalars['String']>;
}>;


export type ProductsQuery = { __typename?: 'Query', productsByCategoryId: { __typename?: 'ProductMutationResponse', code: number, message: string, success: boolean, categoryId?: string | null, products?: Array<{ __typename?: 'Products', name: string, id: string, createAt: any, brand: { __typename?: 'Brands', name: string }, options: Array<{ __typename?: 'ProductOptions', id: string, name: string, prices: Array<{ __typename?: 'ProductPrices', price: number, type: PriceType, note: string, color: { __typename?: 'ProductColors', name: string } }>, values: Array<{ __typename?: 'ProductValues', name: string, id: string }>, imgs: Array<{ __typename?: 'Imgs', name: string, type: string, id: string, src: string, Of: ImgOf }> }>, category: { __typename?: 'Categories', name: string }, path: { __typename?: 'Paths', name: string } }> | null, fieldErrors?: Array<{ __typename?: 'FieldError', name: string, message?: string | null, code?: string | null }> | null, pagination?: { __typename?: 'Pagination', cursor?: any | null, hasMore: boolean, totalCount: number } | null } };

export const BrandInfoFragmentDoc = gql`
    fragment brandInfo on Brands {
  name
  id
}
    `;
export const ImgInfoFragmentDoc = gql`
    fragment imgInfo on Imgs {
  name
  type
  id
  src
  Of
}
    `;
export const CategoryInfoFragmentDoc = gql`
    fragment categoryInfo on Categories {
  name
  type
  id
  img {
    ...imgInfo
  }
}
    ${ImgInfoFragmentDoc}`;
export const PaginationFragmentDoc = gql`
    fragment pagination on Pagination {
  cursor
  hasMore
  totalCount
}
    `;
export const CategoryMutationResponseFragmentDoc = gql`
    fragment categoryMutationResponse on CategoryMutationResponse {
  code
  message
  success
  categories {
    ...categoryInfo
  }
  pagination {
    ...pagination
  }
}
    ${CategoryInfoFragmentDoc}
${PaginationFragmentDoc}`;
export const FieldErrorInfoFragmentDoc = gql`
    fragment fieldErrorInfo on FieldError {
  name
  message
  code
}
    `;
export const ImgMutationResponseFragmentDoc = gql`
    fragment imgMutationResponse on ImgMutationResponse {
  code
  success
  fieldErrors {
    ...fieldErrorInfo
  }
  img {
    ...imgInfo
  }
}
    ${FieldErrorInfoFragmentDoc}
${ImgInfoFragmentDoc}`;
export const PathInfoFragmentDoc = gql`
    fragment pathInfo on Paths {
  name
  id
}
    `;
export const ProductAttributeInfoFragmentDoc = gql`
    fragment productAttributeInfo on ProductAttributes {
  name
  id
  values {
    name
    id
  }
}
    `;
export const ProductPriceInfoFragmentDoc = gql`
    fragment productPriceInfo on ProductPrices {
  price
  type
  color {
    name
  }
  note
}
    `;
export const ProductValueInfoFragmentDoc = gql`
    fragment productValueInfo on ProductValues {
  name
  id
}
    `;
export const ProductOptionInfoFragmentDoc = gql`
    fragment productOptionInfo on ProductOptions {
  id
  name
  prices {
    ...productPriceInfo
  }
  values {
    ...productValueInfo
  }
  imgs {
    ...imgInfo
  }
}
    ${ProductPriceInfoFragmentDoc}
${ProductValueInfoFragmentDoc}
${ImgInfoFragmentDoc}`;
export const ProductInfoFragmentDoc = gql`
    fragment productInfo on Products {
  name
  id
  createAt
  brand {
    name
  }
  options {
    ...productOptionInfo
  }
  category {
    name
  }
  path {
    name
  }
}
    ${ProductOptionInfoFragmentDoc}`;
export const ProductMutationResponseFragmentDoc = gql`
    fragment productMutationResponse on ProductMutationResponse {
  code
  message
  success
  products {
    ...productInfo
  }
  categoryId
  fieldErrors {
    ...fieldErrorInfo
  }
  pagination {
    ...pagination
  }
}
    ${ProductInfoFragmentDoc}
${FieldErrorInfoFragmentDoc}
${PaginationFragmentDoc}`;
export const UserInfoFragmentDoc = gql`
    fragment userInfo on Users {
  id
  avatar
  email
  theme
}
    `;
export const UserMutationResponseFragmentDoc = gql`
    fragment userMutationResponse on UserMutationResponse {
  code
  message
  success
  user {
    ...userInfo
  }
  fieldErrors {
    ...fieldErrorInfo
  }
}
    ${UserInfoFragmentDoc}
${FieldErrorInfoFragmentDoc}`;
export const AddProductDocument = gql`
    mutation AddProduct($productOptionInput: AddProductInput!) {
  addProduct(productOptionInput: $productOptionInput) {
    ...productMutationResponse
  }
}
    ${ProductMutationResponseFragmentDoc}`;
export type AddProductMutationFn = Apollo.MutationFunction<AddProductMutation, AddProductMutationVariables>;

/**
 * __useAddProductMutation__
 *
 * To run a mutation, you first call `useAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductMutation, { data, loading, error }] = useAddProductMutation({
 *   variables: {
 *      productOptionInput: // value for 'productOptionInput'
 *   },
 * });
 */
export function useAddProductMutation(baseOptions?: Apollo.MutationHookOptions<AddProductMutation, AddProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductMutation, AddProductMutationVariables>(AddProductDocument, options);
      }
export type AddProductMutationHookResult = ReturnType<typeof useAddProductMutation>;
export type AddProductMutationResult = Apollo.MutationResult<AddProductMutation>;
export type AddProductMutationOptions = Apollo.BaseMutationOptions<AddProductMutation, AddProductMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    ...userMutationResponse
  }
}
    ${UserMutationResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    code
    success
    message
    fieldErrors {
      ...fieldErrorInfo
    }
  }
}
    ${FieldErrorInfoFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadImgDocument = gql`
    mutation UploadImg($file: Upload!) {
  uploadImg(file: $file) {
    ...imgMutationResponse
  }
}
    ${ImgMutationResponseFragmentDoc}`;
export type UploadImgMutationFn = Apollo.MutationFunction<UploadImgMutation, UploadImgMutationVariables>;

/**
 * __useUploadImgMutation__
 *
 * To run a mutation, you first call `useUploadImgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImgMutation, { data, loading, error }] = useUploadImgMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadImgMutation(baseOptions?: Apollo.MutationHookOptions<UploadImgMutation, UploadImgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadImgMutation, UploadImgMutationVariables>(UploadImgDocument, options);
      }
export type UploadImgMutationHookResult = ReturnType<typeof useUploadImgMutation>;
export type UploadImgMutationResult = Apollo.MutationResult<UploadImgMutation>;
export type UploadImgMutationOptions = Apollo.BaseMutationOptions<UploadImgMutation, UploadImgMutationVariables>;
export const BrandDocument = gql`
    query Brand {
  showBrands {
    code
    message
    success
    fieldErrors {
      ...fieldErrorInfo
    }
    brands {
      ...brandInfo
    }
  }
}
    ${FieldErrorInfoFragmentDoc}
${BrandInfoFragmentDoc}`;

/**
 * __useBrandQuery__
 *
 * To run a query within a React component, call `useBrandQuery` and pass it any options that fit your needs.
 * When your component renders, `useBrandQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBrandQuery({
 *   variables: {
 *   },
 * });
 */
export function useBrandQuery(baseOptions?: Apollo.QueryHookOptions<BrandQuery, BrandQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BrandQuery, BrandQueryVariables>(BrandDocument, options);
      }
export function useBrandLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BrandQuery, BrandQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BrandQuery, BrandQueryVariables>(BrandDocument, options);
        }
export type BrandQueryHookResult = ReturnType<typeof useBrandQuery>;
export type BrandLazyQueryHookResult = ReturnType<typeof useBrandLazyQuery>;
export type BrandQueryResult = Apollo.QueryResult<BrandQuery, BrandQueryVariables>;
export const CategoryDocument = gql`
    query Category($limit: Int, $cursor: DateTime) {
  categories(cursor: $cursor, limit: $limit) {
    ...categoryMutationResponse
  }
}
    ${CategoryMutationResponseFragmentDoc}`;

/**
 * __useCategoryQuery__
 *
 * To run a query within a React component, call `useCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoryQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useCategoryQuery(baseOptions?: Apollo.QueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
      }
export function useCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CategoryQuery, CategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CategoryQuery, CategoryQueryVariables>(CategoryDocument, options);
        }
export type CategoryQueryHookResult = ReturnType<typeof useCategoryQuery>;
export type CategoryLazyQueryHookResult = ReturnType<typeof useCategoryLazyQuery>;
export type CategoryQueryResult = Apollo.QueryResult<CategoryQuery, CategoryQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const ImgsDocument = gql`
    query Imgs($of: ImgOf) {
  showImgs(of: $of) {
    code
    success
    message
    fieldErrors {
      ...fieldErrorInfo
    }
    imgs {
      ...imgInfo
    }
  }
}
    ${FieldErrorInfoFragmentDoc}
${ImgInfoFragmentDoc}`;

/**
 * __useImgsQuery__
 *
 * To run a query within a React component, call `useImgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useImgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImgsQuery({
 *   variables: {
 *      of: // value for 'of'
 *   },
 * });
 */
export function useImgsQuery(baseOptions?: Apollo.QueryHookOptions<ImgsQuery, ImgsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ImgsQuery, ImgsQueryVariables>(ImgsDocument, options);
      }
export function useImgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ImgsQuery, ImgsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ImgsQuery, ImgsQueryVariables>(ImgsDocument, options);
        }
export type ImgsQueryHookResult = ReturnType<typeof useImgsQuery>;
export type ImgsLazyQueryHookResult = ReturnType<typeof useImgsLazyQuery>;
export type ImgsQueryResult = Apollo.QueryResult<ImgsQuery, ImgsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...userInfo
  }
}
    ${UserInfoFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProductAttributesDocument = gql`
    query ProductAttributes($categoryId: String!) {
  productAttributes(categoryId: $categoryId) {
    code
    success
    message
    attributes {
      ...productAttributeInfo
    }
  }
}
    ${ProductAttributeInfoFragmentDoc}`;

/**
 * __useProductAttributesQuery__
 *
 * To run a query within a React component, call `useProductAttributesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAttributesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAttributesQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useProductAttributesQuery(baseOptions: Apollo.QueryHookOptions<ProductAttributesQuery, ProductAttributesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductAttributesQuery, ProductAttributesQueryVariables>(ProductAttributesDocument, options);
      }
export function useProductAttributesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductAttributesQuery, ProductAttributesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductAttributesQuery, ProductAttributesQueryVariables>(ProductAttributesDocument, options);
        }
export type ProductAttributesQueryHookResult = ReturnType<typeof useProductAttributesQuery>;
export type ProductAttributesLazyQueryHookResult = ReturnType<typeof useProductAttributesLazyQuery>;
export type ProductAttributesQueryResult = Apollo.QueryResult<ProductAttributesQuery, ProductAttributesQueryVariables>;
export const ProductColorsDocument = gql`
    query ProductColors {
  productColors {
    code
    success
    message
    fieldErrors {
      ...fieldErrorInfo
    }
    color {
      name
      id
    }
  }
}
    ${FieldErrorInfoFragmentDoc}`;

/**
 * __useProductColorsQuery__
 *
 * To run a query within a React component, call `useProductColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductColorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductColorsQuery(baseOptions?: Apollo.QueryHookOptions<ProductColorsQuery, ProductColorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductColorsQuery, ProductColorsQueryVariables>(ProductColorsDocument, options);
      }
export function useProductColorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductColorsQuery, ProductColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductColorsQuery, ProductColorsQueryVariables>(ProductColorsDocument, options);
        }
export type ProductColorsQueryHookResult = ReturnType<typeof useProductColorsQuery>;
export type ProductColorsLazyQueryHookResult = ReturnType<typeof useProductColorsLazyQuery>;
export type ProductColorsQueryResult = Apollo.QueryResult<ProductColorsQuery, ProductColorsQueryVariables>;
export const ProductsDocument = gql`
    query Products($limit: Int, $cursor: DateTime, $categoryId: String) {
  productsByCategoryId(categoryId: $categoryId, cursor: $cursor, limit: $limit) {
    ...productMutationResponse
  }
}
    ${ProductMutationResponseFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;