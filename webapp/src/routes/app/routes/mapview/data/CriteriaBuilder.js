const OPNAMES = [
    'contains',
    'not_contains',
    'equals',
    'not_equals',
    'lt',
    'gt',
    'lte',
    'gte'
]

const OPCODES = [
    'wildcard',
    'wildcard',
    'match',
    'match',
    'range',
    'range',
    'range',
    'range'
]

const isNull = (r) => (r == null || r === 'undefined');
// [{op : contains , name : data.author , value : 'br' }]
export function criteriaBuilder(criteria,size,from){
    if(isNull(criteria) ){
        throw new Error("Error in critiria");
    }
    var criterion = {};
    criterion.from = from || 0;
    criterion.size = size || 10;
    criterion.query = {};
    criterion.query.bool = {};
    criterion.sort = [{'data.timestamp' : { order : "desc"}}];

    for(var i = 0;i < criteria.length;i++){
        var incCriterion = criteria[i];
        if(incCriterion.op.startsWith('not_')){
            criterion.query.bool.must_not = criterion.query.bool.must_not || [];
            criterionBuilder(criterion.query.bool.must_not,incCriterion);
        }else {
            criterion.query.bool.must = criterion.query.bool.must || [];
            criterionBuilder(criterion.query.bool.must,incCriterion);
        }
    }
    return criterion;
}

export function criterionBuilder(incarray,p_criterion){
    var index;
    for(index =0;index < OPNAMES.length; index++){
        if(p_criterion.op === OPNAMES[index]){
            break;
        }
    }
    var code = OPCODES[index];
    var value = {};
    var returnobj;
    if(code === 'range'){
        returnobj = addRange(p_criterion.name,p_criterion.op,p_criterion.value);
    } else if(code ==='wildcard'){
        returnobj = addWildcard(p_criterion.name,p_criterion.value);
    }
    else if(code === 'match'){
        returnobj = addMatch(p_criterion.name,p_criterion.value);
    }
    incarray.push(returnobj);
}

function addMatch(field,value){
    var x = {};
    x.match = {};
    x.match[field] = value;
    return x;
}

function addWildcard(field,value){
    var x = {};
    x.wildcard = {};
    x.wildcard[field] = {value : '*' + value + '*'};
    return x;
}

function addRange(field,op,value){
    var x = {};
    x.range = {};
    x.range[field] = {};
    x.range[field][op] = value;
    return x;
}