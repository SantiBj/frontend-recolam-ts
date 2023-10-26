import * as CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../../Config';


export function encrypt(data: string | number) {
    const encryptData = CryptoJS.AES.encrypt(String(data), SECRET_KEY).toString()
    return encryptData.replace(/\//g, '_')
}

export function decrypt(dataEncrypt: string) {
    const dataReceived = dataEncrypt.replace(/_/g, "/")
    return CryptoJS.AES.decrypt(dataReceived, SECRET_KEY).toString(CryptoJS.enc.Utf8)
}