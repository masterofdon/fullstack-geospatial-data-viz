const isNull = (r) => (r == null || r === 'undefined');

class Randomizer {

    static RandomNumeric(length){
        if(isNull(length)){
            length = 10;
        }
        var chars = '0123456789';
        return _randomCharacters(length,chars);
    }

    static RandomAlphaNumeric(length){
        if(isNull(length)){
            length = 10;
        }
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return _randomCharacters(length,chars);
    }

}

function _randomCharacters(length,chars){
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];    
    return result;
}

module.exports = Randomizer;