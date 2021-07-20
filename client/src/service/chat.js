export default class ChatService {
    constructor(http, tokenStorage, socket) {
        this.http = http;
        this.tokenStorage = tokenStorage;
        this.socket = socket;
    }

    async getMyChats(userID) {
        return this.http.fetch('/chat/getMyChat', {
            method: 'GET',
            headers: this.getHeaders(),
            body: JSON.stringify({userID})
        });
    }

    async getAllChats() {
        return this.http.fetch('/chat/getAllChat', {
            method: 'GET',
            headers: this.getHeaders(),
        });
    }

    async postChat(text, userID, userName) {
        return this.http.fetch('/chat/createChat', {
            method: 'POST',
            headers: this.getHeaders(),
            body: JSON.stringify({ text, userID, userName }),
        });
    }

    async deleteChat(chatID) {
        return this.http.fetch('/chat/deleteChat', {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({chatID})
        });
    }

    async updateUserName(userID, userName){
        return this.http.fetch('/chat/updateUserName', {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({userID, userName})
        })
    }

    getHeaders() {
        const token = this.tokenStorage.getToken();
        return {
            Authorization: `Bearer ${token}`,
        };
    }

    onSync(callback) {
        return this.socket.onSync('chats', callback);
    }
}