import axios from 'axios';
import { ServerConfig } from '../config/ServerConfig';
import { ClientEnum } from '../config/ClientEnum';
import DefaultService from '../service/DefaultService'


export default class UserService {
    static instance = UserService.instance || new UserService()

    async setUser(user, apiMethod) {
        let retry = 0
        console.log(user);
        while (retry++ < 2) {
            try {
                const setUserRequest = user
                var setUserResponse


                switch (apiMethod) {
                    case ClientEnum.INSERT:
                        setUserResponse = await axios.post(
                            ServerConfig.url.API_URL + "/add_user/",
                            setUserRequest,
                            DefaultService.instance.getHeader()
                        );
                        break;
                    default:
                        console.log("nothing is set user in userservice");
                }
                console.log(setUserResponse.data.responseMessage)
                switch (setUserResponse.data.responseMessage) {
                    case ClientEnum.RESPONSE_SUCCESS:
                        return setUserResponse.data
                    default:
                        break
                }
            } catch (error) {
                console.log('Error in setUser in services/UserService.js')
                console.log(error)
            }

        }
        return DefaultService.instance.defaultResponse()
    }
    async setLocation(location) {
        let retry = 0

        while (retry++ < 2) {
            try {
                const setLocationRequest = location
                var setLocationResponse


                setLocationResponse = await axios.post(
                    ServerConfig.url.API_URL + "/admin_add_hotel/",
                    setLocationRequest,
                    DefaultService.instance.getHeader()
                );

                switch (setLocationResponse.data.responseMessage) {
                    case ClientEnum.RESPONSE_SUCCESS:
                        return setLocationResponse.data
                    default:
                        break
                }
            } catch (error) {
                console.log('Error in setLocation in services/UserService.js')
                console.log(error)
            }

        }
        return DefaultService.instance.defaultResponse()
    }
    async setReview(review) {
        let retry = 0

        while (retry++ < 2) {
            try {
                const setReviewRequest = review
                var setReviewResponse


                setReviewResponse = await axios.post(
                    ServerConfig.url.API_URL + "/set_hotel_review/",
                    setReviewRequest,
                    DefaultService.instance.getHeader()
                );

                switch (setReviewResponse.data.responseMessage) {
                    case ClientEnum.RESPONSE_SUCCESS:
                        return setReviewResponse.data
                    default:
                        break
                }
            } catch (error) {
                console.log('Error in setLocation in services/UserService.js')
                console.log(error)
            }
            return DefaultService.instance.defaultResponse()

        }




    }
}

