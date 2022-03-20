import { Request, Response } from 'express';

import { connection } from '@core/connection';
import { REFRESH_TOKEN_COOKIE_NAME, TOKEN_DURATION } from '@core/constants';
import { ResponseStatuses } from '@core/enums';
import { IAuthResponse } from '@core/interfaces';
import { AccountEntity } from '@entities/account.entity';
import { ApiError } from '@exceptions/api-error';
import { googleService, facebookService, githubService, tokenService } from '@services/index';

class AuthController {
  public async signInViaGoogle(request: Request, response: Response, next: Function): Response {
    try {
      const code = request.query.code;

      const authResponse: IAuthResponse = await googleService.login(code);

      response.cookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, {
        maxAge: TOKEN_DURATION,
        httpOnly: true
      });

      return response.status(ResponseStatuses.STATUS_OK).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  public async signInViaFacebook(request: Request, response: Response, next: Function): Response {
    try {
      const code = request.query.code;
      const authResponse: IAuthResponse = await facebookService.login(code);

      response.cookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, {
        maxAge: TOKEN_DURATION,
        httpOnly: true
      });

      return response.status(ResponseStatuses.STATUS_OK).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  public async singInViaGitHub(request: Request, response: Response, next: Function): Response {
    try {
      const code = request.query.code;
      const authResponse: IAuthResponse = await githubService.login(code);

      response.cookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, {
        maxAge: TOKEN_DURATION,
        httpOnly: true
      });

      return response.status(ResponseStatuses.STATUS_OK).json(authResponse);
    } catch (error) {
      next(error);
    }
  }

  public async refresh(request, response, next): Response {
    try {
      const { refreshToken } = request.cookies;

      if(!refreshToken) {
        throw ApiError.UnauthorizedError();
      }

      const accountData = await tokenService.validateRefreshToken(refreshToken);

      if(!accountData) {
        throw ApiError.UnauthorizedError();
      }

      const account = await connection.manager.findOne(AccountEntity, {
        email: accountData.email,
        provider: accountData.provider
      });

      if(account) {
        throw ApiError.UnauthorizedError();
      }

      const tokens = tokenService.generateTokens({
        email: account.email,
        name: account.name,
        surname: account.surname,
        image: account.image,
        role: account.role,
        provider: account.provider
      });

      const authResponse: IAuthResponse = {
        ...tokens,
        account
      };

      response.cookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, {
        maxAge: TOKEN_DURATION,
        httpOnly: true
      });

      return response.status(ResponseStatuses.STATUS_OK).json(authResponse);
    } catch (e) {
      next(e);
    }
  }

  public async logout(request, response, next): Response {
    try {
      response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

      return response.status(ResponseStatuses.STATUS_OK).json();
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();