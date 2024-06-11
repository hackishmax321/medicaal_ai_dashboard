import axios from 'axios';
import {handleErrors} from './error_handling';
import varaiables from '../assets/data/env';

const path = varaiables.SERVER_URL  + "/api/records";
var record_list = [];

class RecordsService {
    

    async getRecords(){
        record_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                record_list.push(doc);
            });
        }).catch(handleErrors);
        return record_list;
    }

    async getRecordsOfPatient(id){
        record_list = [];
        await axios.get(`${path}/ofPatient/${id}`).then((response)=>{
            
            response.data.forEach(doc=>{
                record_list.push(doc);
            });
        }).catch(handleErrors);
        return record_list;
    }

    async getRecordsOfDoctor(id){
        record_list = [];
        await axios.get(`${path}`).then((response)=>{
            
            response.data.forEach(doc=>{
                if(doc.issuedBy==id) record_list.push(doc);
            });
        }).catch(handleErrors);
        return record_list;
    }

    async getRecordsByType(type){
        record_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(doc.type==type) record_list.push(doc);
            });
        }).catch(handleErrors);
        return record_list;
    }

    async getRecord(id){
        var obj = null;
        await axios.get(`${path}/${id}`).then((response)=>{
            
            obj =  response.data;
            console.log(obj);
            // response.data.forEach(doc=>{
            //     return doc;
            // });
        }).catch(handleErrors);
        return obj;
    }


    async addRecord(record){

        await axios.post(`${path}`, record).then((response)=>{
            if(response.data){
                // alert("record is created!");
            } else {
                alert("Error Occured check your Email which should be uniq");
            }
            
        }).catch(handleErrors);
        console.log("Record Entered!");
    }

    async updateRecord(id, record){
        await axios.patch(`${path}/${id}`, record).then((response)=>{

        }).catch(handleErrors);
    }

    async deleteRecord(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
    }

    
}

export default new RecordsService();