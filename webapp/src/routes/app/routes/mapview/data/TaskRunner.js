import RandomUtil from '../util/RandomUtil';
var _ = {};
_.isFunction = function(obj) {
    return !!(obj && obj.constructor && obj.call && obj.apply);
};

export default class TaskRunner {

    constructor(){
        console.log();
    }

    createNewTask(callable){
        if(!_isFunction(callable)){
            console.log("Not a function");
            throw new Error("Parameter not a function");
        }
        var task = new Task();
        task.setFunction(callable);
        task.setId(RandomUtil.RandomAlphaNumeric());
    }
} 