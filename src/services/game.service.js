import axios from 'axios';
import {handleErrors} from './error_handling';
import variables from '../assets/data/env';

const path = variables.SERVER_URL + "/api/games";
var games_list = [];

class GamesService {

    async getAllGames(){
        games_list = [];
        await axios.get(path).then((response) => {
            response.data.forEach(game => {
                games_list.push(game);
            });
        }).catch(handleErrors);
        return games_list;
    }

    async getGameById(id){
        var game = null;
        await axios.get(`${path}/find/${id}`).then((response) => {
            game = response.data;
        }).catch(handleErrors);
        return game;
    }

    async getGamesByUser(userId){
        games_list = [];
        await axios.get(`${path}/user/${userId}`).then((response) => {
            response.data.forEach(game => {
                if(userId === game.user)
                    games_list.push(game);
            });
        }).catch(handleErrors);
        return games_list;
    }

    async getGamesByDoctor(doctorId){
        games_list = [];
        await axios.get(`${path}/doctor/${doctorId}`).then((response) => {
            response.data.forEach(game => {
                if(doctorId === game.doctor)
                    games_list.push(game);
            });
        }).catch(handleErrors);
        return games_list;
    }

    async getLatestGameByUser(userId){
        var latestGame = null;
        await axios.get(`${path}/latest/user/${userId}`).then((response) => {
            latestGame = response.data;
        }).catch(handleErrors);
        return latestGame;
    }

    async createGame(game){
        await axios.post(`${path}`, game).then((response) => {
            if (response.data) {
                console.log("Game created successfully!");
            } else {
                alert("Error occurred. Please check the game data.");
            }
        }).catch(handleErrors);
    }

    async updateGame(id, game){
        await axios.patch(`${path}/${id}`, game).then((response) => {
            console.log("Game updated successfully!");
        }).catch(handleErrors);
    }

    async deleteGame(id){
        await axios.delete(`${path}/${id}`).then((response) => {
            console.log("Game deleted successfully!");
        }).catch(handleErrors);
    }
}

export default new GamesService();
