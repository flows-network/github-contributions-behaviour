import {BehaviorSubject} from 'rxjs';
const userSubject = new BehaviorSubject(null);//user information we got from GitHub
export default {
    sign,
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

async function logout(): Promise<boolean> {
    let result = await fetch('/api/logout');
    return result.status === 200;
}