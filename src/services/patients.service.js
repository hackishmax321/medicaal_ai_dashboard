import axios from 'axios';
import {handleErrors} from './error_handling';
import varaiables from '../assets/data/env';

const path = varaiables.SERVER_URL  + "/api/patients";
var patient_list = [];

class PatientsService {
    

    async getPatients(){
        patient_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                patient_list.push(doc);
            });
        }).catch(handleErrors);
        return patient_list;
    }

    async getPatientsOfBank(bank){
        patient_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(bank==doc.bank)
                patient_list.push(doc);
            });
        }).catch(handleErrors);
        return patient_list;
    }

    async getPatientsByType(type){
        patient_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(doc.type==type) patient_list.push(doc);
            });
        }).catch(handleErrors);
        return patient_list;
    }

    async getpatient(id){
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


    async addpatient(patient){

        await axios.post(`${path}`, patient).then((response)=>{
            if(response.data){
                // alert("patient is created!");
            } else {
                alert("Error Occured check your Email which should be uniq");
            }
            
        }).catch(handleErrors);
        console.log("patient Entered!");
    }

    async updatepatient(id, patient){
        await axios.patch(`${path}/${id}`, patient).then((response)=>{

        }).catch(handleErrors);
    }

    async deletepatient(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
    }

    
}

export default new PatientsService();