import { Client, Account, ID } from "appwrite";
import conf from "../conf.js";

class AuthService{
    client;
    account;

    constructor(){
        this.client = new Client()
        .setEndpoint(conf.appWriteUrl) 
        .setProject(conf.appWriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({email , password , name}){
        try{
            const userAccount = await account.create(ID.unique() , email , password , name);
            if(userAccount){
                return this.login(email , password);
            }
            else return userAccount
            
        }
        catch(error){
            console.log(error);
        }
    }

    async login({email , password}){
        try{
           return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){
            throw error;
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
            console.log(" error in authservice :: getcurrentuser "+error)
        }
        return null;
    }

    async logout(){
        try{
            await this.account.deleteSessions();
        }
        catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;