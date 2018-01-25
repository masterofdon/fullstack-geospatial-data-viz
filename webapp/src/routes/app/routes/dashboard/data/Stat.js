import Randomizer from '../util/randomizer';
class Stat {
    constructor(value,unit,info,icon,color){
        this.id = Randomizer.RandomNumeric();
        this.value = value;
        this.unit = unit;
        this.info = info;
        this.icon = icon;
        this.color = color;
    }
}

module.exports = Stat;