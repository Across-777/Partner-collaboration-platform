import React from 'react'
import BreadContext from '../BreadContext/index'

export default class BreadContent extends React.Component {
    render() {
        return (
            <div >
                <BreadContext.Consumer>
                    {value =>
                        value
                    }
                </BreadContext.Consumer>
                <div>{this.props.children}</div>
            </div>
        )

    }
}