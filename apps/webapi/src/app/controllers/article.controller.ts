import { Request, Response } from 'express';
import { URL } from 'url';
const read  = require('node-readability');

import { connection } from '@core/connection';
import { URL_CONTENT_FILE_EXTENSION } from '@core/constants';
import { ResponseStatuses, SortDirections } from '@core/enums';
import { IListApiView, ISearchOptions } from '@core/interfaces';
import { ParseError } from '@exceptions/parse-error';
import { ArticleEntity } from '@entities/article.entity';
import { fileService } from '@services/file.service';

class ArticleController {
  public async createArticle(request: Request, response: Response, next: Function): Response {
    try {
      const url = new URL(request.body.url);

      read(url.href, async function(err, article, meta) {
        if(!article.content || err) {
          return next(ParseError.ParseFailed());
        }

        const fileName = await fileService.createFile(article.content, URL_CONTENT_FILE_EXTENSION);

        const articleEntity = new ArticleEntity();
        articleEntity.title = article.title;
        articleEntity.isRedirecting = request.body.isRedirecting;
        articleEntity.exactUrl = url.href;
        articleEntity.hostUrl = url.hostname;
        articleEntity.folder = request.body.folder;
        articleEntity.contentFileUrl = fileName;

        await connection.manager.save(articleEntity);

        article.close();

        return response.status(ResponseStatuses.STATUS_CREATED).json(articleEntity);
      });
    } catch (error) {
      next(error)
    }
  }

  public async getArticles(request: Request, response: Response, next: Function): Response {
    try {
      const requestParams: ISearchOptions = request.query;

      const baseRequestConfigurations = () => connection.createQueryBuilder(ArticleEntity, 'article')
        .leftJoinAndSelect('article.folder', 'folder')
        .addSelect('article.id', 'id')
        .addSelect('article.title', 'title')
        .addSelect('article.isRedirecting', 'isRedirecting')
        .addSelect('article.exactUrl', 'exactUrl')
        .addSelect('article.hostUrl', 'hostUrl')
        .addSelect('article.createdAt', 'createdAt')
        .orderBy(`\"${requestParams.orderBy || 'createdAt'}\"`, requestParams.order || SortDirections.ASC)
        .where(`\"title\" LIKE \'%${requestParams.searchTerm || ''}%\'`)
        .andWhere(`\"folder\".\"id\" = :accountId`, {accountId: +requestParams.keyId});

      const articles = await baseRequestConfigurations()
        .limit(+requestParams.pageSize)
        .offset(+requestParams.pageSize * (+requestParams.page || 0))
        .getRawMany();

      const count = await baseRequestConfigurations().getCount();

      const result: IListApiView<ArticleEntity> = {
        data: articles,
        count: count
      }

      return response.status(ResponseStatuses.STATUS_OK).json(result);
    } catch (error) {
      next(error)
    }
  }
}

export const articleController = new ArticleController();
