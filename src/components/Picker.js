import React from 'react';
import PropTypes from 'prop-types';

const Picker = ({value,onChange,options})=>(
    <span>
        <h1>{value}</h1>
        <select onChange={e=>onChange(e.target.value)} value={value}>
            {options.map(option=>(
                <option value={option} key={option}>{option}</option>
            ))}
        </select>
    </span>
)

Picker.propTypes = {
    options:PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired
}

export default Picker;

// 通过class声明组件
// class Picker extends React.Component{
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return (
//         )
//     }
// }

