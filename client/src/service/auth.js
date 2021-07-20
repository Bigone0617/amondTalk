export default class AuthService {
    constructor(http, tokenStorage) {
      this.http = http;
      this.tokenStorage = tokenStorage;
    }
  
    async signup(id, pw, userName, email, url) {
      const data = await this.http.fetch('/auth/signUp', {
        method: 'POST',
        body: JSON.stringify({
          id,
          pw,
          userName,
          email,
          url,
        }),
      });
      this.tokenStorage.saveToken(data.token);
      return data;
    }
  
    async login(id, pw) {
      const data = await this.http.fetch('/auth/signIn', {
        method: 'POST',
        body: JSON.stringify({ id, pw }),
      });
      this.tokenStorage.saveToken(data.token);
      return data;
    }

    async updateUser(id, userName, email, url) {
      const data = await this.http.fetch('/auth/updateUser', {
        method: 'PUT',
        body: JSON.stringify({id, userName, email, url}),
      });

      return data;
    }
  
    async me() {
      const token = this.tokenStorage.getToken();
      return this.http.fetch('/auth/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    async getAllUsers() {
      const token = this.tokenStorage.getToken();
      return this.http.fetch('/auth/allUsers', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      })
    }
  
    async logout() {
      this.tokenStorage.clearToken();
    }
  }
  