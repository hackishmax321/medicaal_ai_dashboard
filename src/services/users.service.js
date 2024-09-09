import axios from 'axios';
import EventEmitter from '../utils/EventEmitter';
// import Cookie from "jwt-decode";
// import jwt from "universal-cookie";
import {handleErrors} from './error_handling';
import varaiables from '../assets/data/env';

const path = varaiables.SERVER_URL  + "/api/auth";
const users_path = varaiables.SERVER_URL  + "/api/patients";
var user_list = [];

class UserService {
    async getUserByUsername(username, password){
        let success = false;
        await axios.post(`${path}/sign-in`, {username, password}).then((response)=>{
            console.log(response);
            if(response.data.accessToken&&response.data.approved===true){
                success = true;
                // Load Session
                localStorage.setItem('username', username);
                localStorage.setItem('name', response.data.name || response.data.namefullName);
                localStorage.setItem('role', response.data.role);
                localStorage.setItem('id', response.data._id);
                localStorage.setItem('avatar', response.data.avatar||'https://cdn-icons-png.flaticon.com/512/1533/1533506.png');
                EventEmitter.emit("loginCompleted", {logged: true});

            } else {
                
            }
        }).catch((error)=> {
            success = false;
        });
        return success;
    }

    async getUsers(){
        user_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                user_list.push(doc);
            });
            // console.log(user_list);
            // return user_list;
        }).catch(handleErrors);
        return user_list;
    }

    async getUser(id){
        var obj = null;
        await axios.get(`${users_path}/find/${id}`).then((response)=>{
            
            obj =  response.data;
            console.log(obj);
            // response.data.forEach(doc=>{
            //     return doc;
            // });
        }).catch(handleErrors);
        return obj;
    }


    async addUser(user){
        await axios.post(`${users_path}`, user).then((response)=>{
            console.log(response);
            if(response.data){
                EventEmitter.emit("registerCompleted", {registered: true});
            } else {
                alert("Error Occured check your Email which should be uniq");
            }
            
        }).catch(handleErrors);
        console.log("User Entered!");
    }

    async updateUser(id, user){
        await axios.put(`${users_path}/${id}`, user).then((response)=>{

        }).catch(handleErrors);
    }

    async deleteUser(id){
        await axios.delete(`${users_path}/${id}`).then((response)=>{

        }).catch(handleErrors);
    }

    
}

export default new UserService();