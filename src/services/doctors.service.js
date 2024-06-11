import axios from 'axios';
import {handleErrors} from './error_handling';
import varaiables from '../assets/data/env';

const path = varaiables.SERVER_URL  + "/api/doctors";
var doctor_list = [];

class DoctorsService {
    

    async getDoctors(){
        doctor_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                doctor_list.push(doc);
            });
        }).catch(handleErrors);
        return doctor_list;
    }

    async getDoctorsOfBank(bank){
        doctor_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(bank==doc.bank)
                doctor_list.push(doc);
            });
        }).catch(handleErrors);
        return doctor_list;
    }

    async getDoctorsByType(type){
        doctor_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(doc.type==type) doctor_list.push(doc);
            });
        }).catch(handleErrors);
        return doctor_list;
    }

    async getDoctor(id){
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


    async addDoctor(doctor){

        await axios.post(`${path}`, doctor).then((response)=>{
            if(response.data){
                // alert("doctor is created!");
            } else {
                alert("Error Occured check your Email which should be uniq");
            }
            
        }).catch(handleErrors);
        console.log("Doctor Entered!");
    }

    async updateDoctor(id, doctor){
        await axios.patch(`${path}/${id}`, doctor).then((response)=>{

        }).catch(handleErrors);
    }

    async deleteDoctor(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
    }

    
}

export default new DoctorsService();