import axios from 'axios';
import { handleErrors } from './error_handling';
import variables from '../assets/data/env';

const path = variables.SERVER_URL + "/api/documents";
var document_list = [];

class DocumentService {

    // Get all documents
    async getDocuments() {
        document_list = [];
        await axios.get(path).then((response) => {
            response.data.forEach(doc => {
                document_list.push(doc);
            });
        }).catch(handleErrors);
        return document_list;
    }

    // Get document by ID
    async getDocument(id) {
        let obj = null;
        await axios.get(`${path}/find/${id}`).then((response) => {
            obj = response.data;
        }).catch(handleErrors);
        return obj;
    }

    // Get documents by session
    async getDocumentsBySession(sessionId) {
        document_list = [];
        await axios.get(`${path}/session/${sessionId}`).then((response) => {
            response.data.forEach(doc => {
                document_list.push(doc);
            });
        }).catch(handleErrors);
        return document_list;
    }

    // Get documents with preview logic (image or icon)
    async getDocumentsWithPreview() {
        document_list = [];
        await axios.get(`${path}/preview`).then((response) => {
            response.data.forEach(doc => {
                document_list.push(doc);
            });
        }).catch(handleErrors);
        return document_list;
    }

    // Add a new document
    async addDocument(document) {
        await axios.post(`${path}`, document).then((response) => {
            if (response.data) {
                console.log("Document created successfully!");
            } else {
                alert("Error occurred. Check the data.");
            }
        }).catch(handleErrors);
    }

    // Update an existing document by ID
    async updateDocument(id, document) {
        await axios.patch(`${path}/${id}`, document).then((response) => {
            console.log("Document updated successfully!");
        }).catch(handleErrors);
    }

    // Delete a document by ID
    async deleteDocument(id) {
        await axios.delete(`${path}/${id}`).then((response) => {
            console.log("Document deleted successfully!");
        }).catch(handleErrors);
    }
}

export default new DocumentService();
