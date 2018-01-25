import React ,{Component} from 'react';

class BoxContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {size , title, children} = this.props;

        return (
            <div className={"col-xl-" + size}>
                <div className="box box-transparent">
                    <div className="box-header">{title}</div>
                    <div className="box-body">
                        {children}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = BoxContainer;