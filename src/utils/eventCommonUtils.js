/**
 * 节流
 * @param event function
 * @param time number
 */
export const throttle = (fun, delay)=>{
    // let timer = null;
    // return (value)=>{
    //     if(!timer){
    //         timer = setTimeout(() => {
    //             event(value);
    //             timer = null;
    //         }, time);
    //     }
    // }
        let last, deferTimer
        return function (args) {
            let that = this
            let _args = arguments
            let now = +new Date()
            if (last && now < last + delay) {
                clearTimeout(deferTimer)
                deferTimer = setTimeout(function () {
                    last = now
                    fun.apply(that, _args)
                }, delay)
            }else {
                last = now
                fun.apply(that,_args)
            }
        }
}
/**
 * 防抖
 * @param fn
 * @param wait
 * @returns
 */
export const antiShake = (fn, wait)=>{
    let timeOut = null;
    return (value) =>{
        if(timeOut) clearTimeout(timeOut);
        timeOut = setTimeout(fn(value), wait);
    }
}