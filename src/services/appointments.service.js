import axios from 'axios';
import {handleErrors} from './error_handling';
import varaiables from '../assets/data/env';

const path = varaiables.SERVER_URL + "/api/sessions";
var appointment_list = [];

class AppointmentsService {
    

    async getAppointments(){
        appointment_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                appointment_list.push(doc);
            });
        }).catch(handleErrors);
        return appointment_list;
    }

    async getAppointmentsOfPatient(user){
        appointment_list = [];
        await axios.get(`${path}/patient/${user}`).then((response)=>{
            
            response.data.forEach(doc=>{
                if(user==doc.user)
                appointment_list.push(doc);
            });
        }).catch(handleErrors);
        return appointment_list;
    }

    async getAppointmentsOfDoctor(user){
        appointment_list = [];
        await axios.get(`${path}/doctor/${user}`).then((response)=>{
            
            response.data.forEach(doc=>{
                if(user==doc.doctor)
                appointment_list.push(doc);
            });
        }).catch(handleErrors);
        return appointment_list;
    }

    async getAppointmentsByType(type){
        appointment_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(doc.type==type) appointment_list.push(doc);
            });
        }).catch(handleErrors);
        return appointment_list;
    }

    async getAppointment(id){
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


    async addAppointment(appointment){

        await axios.post(`${path}`, appointment).then((response)=>{
            if(response.data){
                // alert("appointment is created!");
            } else {
                alert("Error Occured check your Email which should be uniq");
            }
            
        }).catch(handleErrors);
        console.log("Appointment Entered!");
    }

    async updateAppointment(id, appointment){
        await axios.patch(`${path}/${id}`, appointment).then((response)=>{

        }).catch(handleErrors);
    }

    async deleteAppointment(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
    }

    
}

export default new AppointmentsService();