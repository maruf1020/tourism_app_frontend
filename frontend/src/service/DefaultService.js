
import { ClientEnum } from '../config/ClientEnum';



export default class DefaultService {
    static instance = DefaultService.instance || new DefaultService()

    getHeader() {
        return {
            headers: {
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
        }
    }

    defaultResponse() {
        return {
            status: false,
            responseMessage: ClientEnum.RESPONSE_CONNECTION_ERROR
        }
    }



    async awaitSomeTime(timeToWaitInMilli) {
        await new Promise(r => setTimeout(r, timeToWaitInMilli));
    }
}

