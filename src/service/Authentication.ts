import PocketBase from '@tobicrain/pocketbase';

export class AuthenticationService {
  private client: PocketBase;
  public redirect_url: string;

  constructor(client: PocketBase) {
    this.client = client;
    this.redirect_url = '';
  }

  async getListAuthMethods() {
    return await this.client.users.listAuthMethods();
  }

  async getDataAuth() {
    await this.client.users.authViaOAuth2('google', 'CODE', 'VERIFIER', 'REDIRECT_URL');
  }
  async AuthWithOauth(provider: string, code: string, verifier: string) {
    await this.client.users.authViaOAuth2(provider, code, verifier, this.redirect_url);
  }

  async AuthWithEmail(email: string, password: string) {
    await this.client.users.authViaEmail(email, password);
  }

  async RegisterWithEmail(email: string, password: string) {
    await this.client.users.create({
      email: email,
      password: password,
      passwordConfirm: password,
    });
  }

  async getUserData(id: string, token: string) {
    const headers = new Headers();
    headers.append('Authorization', 'user ' + token);
    return await this.client.users.getOne(id);
  }
}
