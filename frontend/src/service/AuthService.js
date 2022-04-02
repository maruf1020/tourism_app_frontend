import axios from 'axios';
import { ServerConfig } from '../config/ServerConfig';
import { ClientEnum } from '../config/ClientEnum';



export default class AuthService {
    static instance = AuthService.instance || new AuthService()

    async userLogin(email, password) {
        let retry = 0

        while (retry++ < 2) {
            try {
                const loginUserRequest = {
                    email: email,
                    password: password
                }

                const loginUserResponse = await axios.post(ServerConfig.url.API_URL +
                    '/user_sign_in/', loginUserRequest)

                switch (loginUserResponse.data.responseMessage) {
                    case ClientEnum.RESPONSE_SUCCESS:
                        console.log("loginUserResponse")

                        return loginUserResponse.data
                    case false:
                        break;
                    default:
                        break
                }
            } catch (error) {
                console.log('Error in userLogin in services/AuthService.js')
                console.log(error)
                retry++
            }

        }
        return AuthService.instance.defaultResponse()
    }

    async adminLogin(email, password) {
        let retry = 0

        while (retry++ < 2) {
            console.log(email);
            try {
                const loginAdminRequest = {
                    email: email,
                    password: password
                }

                const loginAdminResponse = await axios.post(ServerConfig.url.API_URL +
                    '/admin_sign_in/', loginAdminRequest)

                switch (loginAdminResponse.data.responseMessage) {
                    case ClientEnum.RESPONSE_SUCCESS:

                        return loginAdminResponse.data
                    case false:
                        break;
                    default:
                        break
                }
            } catch (error) {
                console.log('Error in userLogin in services/AuthService.js')
                console.log(error)
                retry++
            }

        }
        return AuthService.instance.defaultResponse()
    }



    defaultResponse() {
        return {
            status: false,
            responseMessage: ClientEnum.RESPONSE_CONNECTION_ERROR
        }
    }
}

