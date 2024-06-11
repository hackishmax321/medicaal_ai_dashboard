import axios from 'axios';
import {handleErrors} from './error_handling';
import varaiables from '../assets/data/env';

const path = varaiables.SERVER_URL  + "/api/lab-assistants";
var labAssistant_list = [];

class LabAssistantsService {
    

    async getLabAssistants(){
        labAssistant_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                labAssistant_list.push(doc);
            });
        }).catch(handleErrors);
        return labAssistant_list;
    }

    async getLabAssistantsOfBank(bank){
        labAssistant_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(bank==doc.bank)
                labAssistant_list.push(doc);
            });
        }).catch(handleErrors);
        return labAssistant_list;
    }

    async getLabAssistantsByType(type){
        labAssistant_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(doc.type==type) labAssistant_list.push(doc);
            });
        }).catch(handleErrors);
        return labAssistant_list;
    }

    async getLabAssistant(id){
        var obj = null;
        await axios.get(`${path}/find/${id}`).then((response)=>{
            
            obj =  response.data;
            console.log(obj);
            // response.data.forEach(doc=>{
            //     return doc;
            // });
        }).catch(handleErrors);
        return obj;
    }


    async addLabAssistant(labAssistant){

        await axios.post(`${path}`, labAssistant).then((response)=>{
            if(response.data){
                // alert("labAssistant is created!");
            } else {
                alert("Error Occured check your Email which should be uniq");
            }
            
        }).catch(handleErrors);
        console.log("LabAssistant Entered!");
    }

    async updateLabAssistant(id, labAssistant){
        await axios.patch(`${path}/${id}`, labAssistant).then((response)=>{

        }).catch(handleErrors);
    }

    async deleteLabAssistant(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
    }

    
}

export default new LabAssistantsService();