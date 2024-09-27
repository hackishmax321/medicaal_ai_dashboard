import axios from 'axios';
import { handleErrors } from './error_handling';
import variables from '../assets/data/env'; 

const path = `${variables.SERVER_URL}/api/messages`;
var message_list = [];

class MessagesService {
  // Get all messages
  async getAllMessages() {
    message_list = [];
    await axios
      .get(path)
      .then((response) => {
        response.data.forEach((msg) => {
          message_list.push(msg);
        });
      })
      .catch(handleErrors);
    return message_list;
  }

  // Get a message by ID
  async getMessageById(id) {
    var message = null;
    await axios
      .get(`${path}/find/${id}`)
      .then((response) => {
        message = response.data;
      })
      .catch(handleErrors);
    return message;
  }

  // Get messages by sender ID
  async getMessagesBySender(senderId) {
    message_list = [];
    await axios
      .get(`${path}/sender/${senderId}`)
      .then((response) => {
        response.data.forEach((msg) => {
          if (msg.sender === senderId) message_list.push(msg);
        });
      })
      .catch(handleErrors);
    return message_list;
  }

  // Get messages by receiver ID
  async getMessagesByReceiver(receiverId) {
    message_list = [];
    await axios
      .get(`${path}/receiver/${receiverId}`)
      .then((response) => {
        response.data.forEach((msg) => {
          if (msg.receiver === receiverId) message_list.push(msg);
        });
      })
      .catch(handleErrors);
    return message_list;
  }

  // Create a new message
  async createMessage(message) {
    console.log("KKKK");
    console.log(message)
    await axios
      .post(`${path}`, message)
      .then((response) => {
        if (response.data) {
          console.log("Message created!");
        } else {
          alert("Error occurred while creating the message.");
        }
      })
      .catch(handleErrors);
  }

  // Update a message by ID
  async updateMessage(id, message) {
    await axios
      .patch(`${path}/${id}`, message)
      .then(() => {
        console.log("Message updated!");
      })
      .catch(handleErrors);
  }

  // Delete a message by ID
  async deleteMessage(id) {
    await axios
      .delete(`${path}/${id}`)
      .then(() => {
        console.log("Message deleted!");
      })
      .catch(handleErrors);
  }

  // Mark message as read by ID
  async markMessageAsRead(id) {
    await axios
      .patch(`${path}/read/${id}`)
      .then(() => {
        console.log("Message marked as read!");
      })
      .catch(handleErrors);
  }
}

export default new MessagesService();
