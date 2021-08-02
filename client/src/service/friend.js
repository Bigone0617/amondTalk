export default class FriendService {
    constructor(http, tokenStorage, socket) {
        this.http = http;
        this.tokenStorage = tokenStorage;
        this.socket = socket;
      }

      async getAllFriends(userID) {
        const token = this.tokenStorage.getToken();
        return this.http.fetch(`/friend/getAllFriends/${userID}`, {
            method:'GET',
            headers: { Authorization: `Bearer ${token}` },
        });
      }

      async addFriend(datas) {
        const data = await this.http.fetch('/friend/addFriend', {
            method: 'POST',
            body: JSON.stringify({
              userID: datas.userID,
              friendID: datas.friendID
            })
        });
        return data;
      }

      // 친구인지 아닌지 확인
      async findById(datas) {
        const token = this.tokenStorage.getToken();
        return this.http.fetch(`/friend/findById/${datas.userID}/${datas.friendID}`, {
            method:'GET',
            headers: { Authorization: `Bearer ${token}` },
        })
      }

      // 채팅 만들기
      async createChatRoom(userID, friendID) {
        const data = await this.http.fetch('/friend/createChatRoom', {
          method: 'PUT',
          body: JSON.stringify({userID, friendID})
        });

        return data;
      }

      // 이미 채팅중인지 확인
      async getRoomID(userID, friendID) {
        const token = this.tokenStorage.getToken();
        const roomID = await this.http.fetch(`/friend/getRoomID/${userID}/${friendID}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        return roomID;
      }

      // 나의 채팅창 가져오기
      async getAllChatRooms(userID) {
        const allChatRooms = await this.http.fetch(`/friend/getAllChatRooms/${userID}`,{
          method: 'GET',
        });

        return allChatRooms;
      }
}