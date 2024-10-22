import axios from 'axios';
import { handleErrors } from './error_handling';
import variables from '../assets/data/env';

const path = variables.SERVER_URL + "/api/chats";
var session_list = [];

class ChatSessionService {

    // Get all chat sessions
    async getSessions() {
        session_list = [];
        await axios.get(path).then((response) => {
            response.data.forEach(session => {
                session_list.push(session);
            });
        }).catch(handleErrors);
        return session_list;
    }

    // Get chat session by ID
    async getSession(id) {
        let obj = null;
        await axios.get(`${path}/find/${id}`).then((response) => {
            obj = response.data;
        }).catch(handleErrors);
        return obj;
    }

    // Get chat sessions by user name
    async getSessionsByName(name) {
        session_list = [];
        await axios.get(`${path}/name/${name}`).then((response) => {
            response.data.forEach(session => {
                session_list.push(session);
            });
        }).catch(handleErrors);
        return session_list;
    }

    async getSessionsByNameOnlyRelate(name, doctor) {
        session_list = [];
        await axios.get(`${path}/name/${name}`).then((response) => {
            response.data.forEach(session => {
                session_list.push(session);
            });
        }).catch(handleErrors);
        return session_list;
    }

    // Get chat sessions with keyword summary
    async getSessionsWithKeywordSummary() {
        session_list = [];
        await axios.get(`${path}/summary`).then((response) => {
            response.data.forEach(session => {
                session_list.push(session);
            });
        }).catch(handleErrors);
        return session_list;
    }

    // Add a new chat session
    async addSession(session) {
        await axios.post(`${path}`, session).then((response) => {
            if (response.data) {
                console.log("Chat session created successfully!");
            } else {
                alert("Error occurred. Check the data.");
            }
        }).catch(handleErrors);
    }

    // Update an existing chat session by ID
    async updateSession(id, session) {
        await axios.patch(`${path}/${id}`, session).then((response) => {
            console.log("Chat session updated successfully!");
        }).catch(handleErrors);
    }

    // Delete a chat session by ID
    async deleteSession(id) {
        await axios.delete(`${path}/${id}`).then((response) => {
            console.log("Chat session deleted successfully!");
        }).catch(handleErrors);
    }
}

export default new ChatSessionService();
