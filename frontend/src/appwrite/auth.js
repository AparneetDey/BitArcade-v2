import conf from "../conf/conf.js"
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    async createAccount({ email, password, username }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, username);

            if (userAccount) {
                //Call login method
                this.logIn({email, password})
            } else {
                throw new Error('Error creating account');
            }
        } catch (error) {
            throw error;
        }
    }

    async logIn({ email, password }) {
        try {
            const userAccount = await this.account.createEmailPasswordSession(
                email,
                password
            );

            console.log(userAccount)

            return true;
        } catch (error) {
            console.log('Appwrite Service :: Log In Error ::',error);
        }

        return false;
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Appwrite Service :: Fetching User Error :: No User Found');
        }
        return null;
    }

    async logOut() {
        try {
            await this.account.deleteSession('current');
            return true;
        } catch (error) {
            console.log('Appwrite Service :: Log Out Error ::',error);
        }
        return false;
    }

    async deleteAccount() {
        try {
            await this.account.delete();
            return true;
        } catch (error) {
            throw error;
        }
        return false;
    }
}

const authservice = new AuthService();

export default authservice;