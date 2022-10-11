import type {
  QueryParameters,
  AssetDocument,
  UpdateResponse,
  UnitDocument,
  UserDocument,
  CompanyDocument,
} from "../types/collections";
import type { CreateRequestBody, UpdateOne } from "../types/asset";
import type { Request, Response } from "express";

import * as unitRepository from "../repositories/unit.repository";
import * as error from "./../middlewares/helpers/errors.middleware";
import * as repository from "./../repositories/asset.repository";
import * as util from "./../utils/queries.util";

import AppLog from "../events/AppLog";
import { NonNullAssetDocument } from "../types/collections";

export async function create(_req: Request, res: Response) {
  const { _id: unit_id }: NonNullable<UnitDocument> = res.locals.result;
  const company: NonNullable<CompanyDocument> = res.locals.company;
  const body: CreateRequestBody = res.locals.body;
  const user_id = res.locals.user_id;

  const user = await util.findById({ id: user_id, model: "User" });

  if (!user) error.notFound("User");

  body.owner = user as NonNullable<UserDocument>;
  const pushAssetData = await repository.create(body);
  await unitRepository.pushAsset({
    id: unit_id.toString(),
    asset: pushAssetData,
    company,
  });

  AppLog({ type: "Controller", text: "Asset created" });
  return res.sendStatus(201);
}

export async function searchAll(_req: Request, res: Response) {
  const queries: QueryParameters = res.locals.query;
  const assets = await util.searchAll({ queries, model: "Asset" });

  AppLog({ type: "Controller", text: "Assets searched" });
  return res.status(200).send(assets);
}

export async function searchById(_req: Request, res: Response) {
  const asset: NonNullAssetDocument = res.locals.result;

  AppLog({ type: "Controller", text: "Sent Asset" });
  return res.status(200).send(asset);
}

export async function update(_req: Request, res: Response) {
  const company: NonNullable<CompanyDocument> = res.locals.company;
  const body: UpdateOne = res.locals.body;
  const asset_id = res.locals.param;
  const result = res.locals.result;
  const unit = res.locals.unit;

  const response: UpdateResponse = {
    message: "Asset updated",
  };

  const update = await repository.updateOne({
    asset_id,
    company,
    body,
    unit,
  });

  if (!update) error.assetNotFound();

  const unchangedAsset = __iterateKeyValues(body, result);

  if (unchangedAsset) response.message = "No changes detected";
  else {
    for (const [key, value] of Object.entries(body)) {
      if (!value || value === result[key]) continue;

      response.detail = {
        ...response.detail,
        [key]: {
          previous: result[key],
          current: value,
        },
      };
    }
  }

  AppLog({ type: "Controller", text: "Asset updated" });
  return res.status(200).send(response);

  function __iterateKeyValues(
    body: UpdateOne,
    result: NonNullable<AssetDocument>,
  ) {
    return Object.entries(body).every(([key, value]) => {
      return value === result[key as keyof NonNullable<AssetDocument>];
    });
  }
}

export async function deleteOne(_req: Request, res: Response) {
  const company = res.locals.company;
  const id = res.locals.param;
  const unit = res.locals.unit;

  await repository.deleteOne({ id, company, unit });

  AppLog({ type: "Controller", text: "Asset deleted" });
  return res.sendStatus(200);
}
