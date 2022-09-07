import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Pagination {
  @Field()
  totalCount: number
  @Field()
  hasMore: boolean
  @Field(_type => Date, { nullable: true })
  cursor?: Date
}