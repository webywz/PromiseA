class Promise {
    constructor(excutor) {
        this.status = 'pending';
        this.value = undefined;
        this.fulfilledAry = [];
        this.rejectedAry = [];

        //=>成功和失败执行的方法
        let resolve = result => {

            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'fulfilled';
                this.value = result;
                this.fulfilledAry.forEach(item => item(result));
            }, 0);
        };

        let reject = reason => {
            let timer = setTimeout(() => {
                clearTimeout(timer);
                if (this.status !== 'pending') return;
                this.status = 'rejected';
                this.value = reason;
                this.rejectedAry.forEach(item => item(reason));
            }, 0);
        };

        //=>捕获异常信息
        try {
            excutor(resolve, reject);
        } catch (e) {
            reject(e);
        }
    }

    //=>THEN：原型上的方法,供实例调取使用
    then(fulfilledCallBack, rejectedCallBack) {
        this.fulfilledAry.push(fulfilledCallBack);
        this.rejectedAry.push(rejectedCallBack);
    }
}

module.exports = Promise;