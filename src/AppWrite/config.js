import conf from '../conf.js';
import { Client, Databases , ID , Storage , Query } from "appwrite";

class DataBaseService{
    client;
    databases;
    bucket;

    constructor(){
        this.client = new Client()
        .setEndpoint(conf.appWriteUrl) 
        .setProject(conf.appWriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title , slug , content , featuredImage , status , userId}){
        try{
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
            console.log(error);
        }
    }
}

const dataBaseService = new DataBaseService();
export default dataBaseService ; 
