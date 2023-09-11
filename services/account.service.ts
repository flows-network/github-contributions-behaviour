import {BehaviorSubject} from 'rxjs';
const userSubject = new BehaviorSubject(null);//user information we got from GitHub
import {fetchWrapper} from '../utils';
export default {
    sign,
    signByGoogle,
    user: userSubject.asObservable(),
    logout
}

async function sign(code: string): Promise<boolean> {
    let result = await fetch(`/api/sign?code=${code}`);
    if (result.status === 200) {
        userSubject.next(await result.json());
        return true;
    }
    return false;
}

async function signByGoogle(code: string): Promise<boolean> {
    let result = await fetchWrapper.post(`/api/signByGoogle`,code);
    if (result.status === 200) {
        userSubject.next(await result.json());
        return true;
    }
    return false;
}

async function logout(): Promise<boolean> {
    let result = await fetch('/api/logout');
    return result.status === 200;
}