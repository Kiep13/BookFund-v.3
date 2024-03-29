import axios from 'axios';

import { connection } from '@core/connection';
import { AuthProviders } from '@core/enums';
import { IAuthResponse, IFacebookAuthTokens, IFacebookUser } from '@core/interfaces';
import { environment } from '@environments/environment';
import { AccountEntity } from '@entities/account.entity';
import { folderService } from '@services/folder.service';
import { tokenService } from '@services/token.service';
import { SocialAuthService } from '@services/social-auth.service';

class FacebookService extends SocialAuthService {
  protected authProvider: AuthProviders = AuthProviders.FACEBOOK;

  public async login(code: string): Promise<IAuthResponse> {
    const facebookTokens: IFacebookAuthTokens = await this.getTokens(code);

    const user: IFacebookUser = await this.getUser(facebookTokens.access_token);

    const candidate = await connection.manager.getRepository(AccountEntity).findOne({
      email: user.email,
      provider: this.authProvider
    });

    const account = candidate ? await this.synchronize(candidate.id, user) : await this.register(user);

    const tokens = tokenService.generateTokens({
      id: account.id,
      email: account.email,
      name: account.name,
      surname: account.surname,
      image: account.image,
      role: account.role,
      provider: account.provider
    });

    return {
      account,
      ...tokens
    }
  }

  protected async register(user: IFacebookUser): Promise<AccountEntity> {
    const accountEntity = new AccountEntity();

    accountEntity.email = user.email;
    accountEntity.name = user.first_name;
    accountEntity.surname = user.last_name;
    accountEntity.image = user.picture?.data.url;
    accountEntity.provider = this.authProvider;

    await connection.manager.save(accountEntity);
    await folderService.createDefaultFolder(accountEntity);

    return accountEntity;
  }

  protected async synchronize(accountId: number, user: IFacebookUser): Promise<AccountEntity> {
    const accountEntity = await connection.manager.findOne(AccountEntity, accountId);

    accountEntity.email = user.email;
    accountEntity.name = user.first_name;
    accountEntity.surname = user.last_name;
    accountEntity.image = user.picture?.data.url;

    return connection.manager.save(accountEntity);
  }

  protected getTokens(code: string): Promise<IFacebookAuthTokens> {
    const options = {
      client_id: environment.facebookClientId,
      client_secret: environment.facebookClientSecret,
      redirect_uri: `${environment.clientUrl}/auth/${this.authProvider}`,
      code
    }

    return axios.get('https://graph.facebook.com/v13.0/oauth/access_token', {
      params: options
    }).then((response) => response.data);
  }

  protected getUser(accessToken: string): Promise<IFacebookUser> {
    return axios.get('https://graph.facebook.com/me', {
      params: {
        access_token: accessToken,
        fields: ['id', 'email', 'first_name', 'last_name', 'picture.height(300)'].join(',')
      }
    }).then((response) => response.data);
  }
}

export const facebookService = new FacebookService();
