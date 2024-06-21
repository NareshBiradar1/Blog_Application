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

    async updatePost(slug , {title , content , featuredImage , status , userId}){
        try{
            return await this.databases.createDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                slug
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appWriteDatabaseId,
                conf.appWriteCollectionId,
                queries
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appWriteBucketId,
                ID.unique(),
                file
            )
        }
        catch(error){
            console.log(error);
        }
    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appWriteBucketId,
                fileId
            )
            return true;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    getFilePreview(fileId){
        try{
            return this.bucket.getFilePreview(
                conf.appWriteBucketId,
                fileId
            )
        }
        catch(error){
            console.log(error);
        }
    }
    
}

const dataBaseService = new DataBaseService();
export default dataBaseService ; 
