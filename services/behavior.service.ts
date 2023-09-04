import {fetchWrapper} from '../utils';

export default {
    saveBehavior,
    getBehavior

}

async function saveBehavior(owner:string,repo:string,id:string) {
    return await fetchWrapper.post(`/api/_saveBehavior?owner=${owner}&repo=${repo}&id=${id}`);
}

async function getBehavior(id:string) {
    return await fetchWrapper.get(`/api/_getBehavior?behaviorId=${id}`);
}