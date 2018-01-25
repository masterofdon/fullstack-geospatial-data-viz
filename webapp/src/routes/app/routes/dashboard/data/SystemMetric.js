import Randomizer from '../util/randomizer';

class SystemMetric {

    constructor(value,info){
        this.id = Randomizer.RandomNumeric(10);
        this.value = value;
        this.info = info;
    }
}

module.exports = SystemMetric;