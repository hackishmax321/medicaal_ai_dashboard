import axios from 'axios';
import {handleErrors} from './error_handling';
import varaiables from '../assets/data/env';

const path = varaiables.SERVER_URL  + "/api/pharmacists";
var pharmacist_list = [];

class PharmacistsService {
    

    async getPharmacists(){
        pharmacist_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                pharmacist_list.push(doc);
            });
        }).catch(handleErrors);
        return pharmacist_list;
    }

    async getPharmacistsOfBank(bank){
        pharmacist_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(bank==doc.bank)
                pharmacist_list.push(doc);
            });
        }).catch(handleErrors);
        return pharmacist_list;
    }

    async getPharmacistsByType(type){
        pharmacist_list = [];
        await axios.get(path).then((response)=>{
            
            response.data.forEach(doc=>{
                if(doc.type==type) pharmacist_list.push(doc);
            });
        }).catch(handleErrors);
        return pharmacist_list;
    }

    async getPharmacist(id){
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


    async addPharmacist(pharmacist){

        await axios.post(`${path}`, pharmacist).then((response)=>{
            if(response.data){
                // alert("pharmacist is created!");
            } else {
                alert("Error Occured check your Email which should be uniq");
            }
            
        }).catch(handleErrors);
        console.log("Pharmacist Entered!");
    }

    async updatePharmacist(id, pharmacist){
        await axios.patch(`${path}/${id}`, pharmacist).then((response)=>{

        }).catch(handleErrors);
    }

    async deletePharmacist(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
    }

    
}

export default new PharmacistsService();