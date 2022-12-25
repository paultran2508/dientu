import { ImgMutationResponse } from './../../types/mutations/ImgMutationResponse';
import { FileUpload } from 'graphql-upload';
import { buffer } from 'stream/consumers';
import { Arg, Ctx, Mutation, Query } from 'type-graphql';
import { createBaseResolver, TypeEntityExtension } from "../abstract/BaseResolver";
import { ImgOf, Imgs, ImgType } from './../../entities/Imgs';
import { Context } from './../../types/Context';
import { FieldError } from './../../types/mutations/FieldError';
import { HandleErrorResponse } from '../exceptions/HandleErrorResult';

const ImgBase = createBaseResolver({ entity: Imgs, name: "category" })

// @Resolver(_of => Categories)
export class ImgResolver extends ImgBase {

  entityExtensions: TypeEntityExtension<Imgs, keyof Imgs>[] = [];
  setErrors: FieldError[] = [];

  @Query(() => ImgMutationResponse)
  async showImgs(
    @Arg("of", _type => ImgOf, { nullable: true }) of?: ImgOf
  ): Promise<ImgMutationResponse> {
    try {
      const imgData = await Imgs.find({
        where: { Of: of }
      })
      return this._return({
        imgs: imgData
      })
    } catch (error) {
      return this.catchQuery(error)
    }
  }



  @Mutation(_return => ImgMutationResponse)
  async uploadImg(
    @Arg("file", () => require('graphql-upload/GraphQLUpload.js')) file: FileUpload,
    @Arg("of", () => ImgOf) of: ImgOf,

    @Ctx() { }: Context
  ): Promise<ImgMutationResponse> {
    try {
      const exiting = await Imgs.findOneBy({ name: file.filename })
      if (exiting) {
        this.setErrors = [{ name: "img", message: "anh nay da ton tai !!!", code: "422" }]
        throw new HandleErrorResponse()
      }

      const res = await require('imgbb-uploader')({
        apiKey: "a6941ddb71c5a2eab66d344616c7ca3d",
        base64string: (await buffer(file.createReadStream())).toString("base64"),
        name: file.filename,

      })

      if (!res.display_url) {
        this.setErrors = [{ name: "img", message: "upload thất bại !!!", code: "406" }]
        throw new HandleErrorResponse()
      }
      const imgData = await Imgs.save({
        name: file.filename,
        Of: of,
        type: ImgType.JPG,
        src: res.display_url
      })

      return this._return({
        img: imgData
      })
    } catch (error) {
      console.log(error)
      return this.catchQuery(error)
    }
  }

}