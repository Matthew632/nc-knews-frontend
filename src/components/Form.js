import React from 'react';

const Form = (props) => {
    const { types } = props;
    return (<form><label for={`add${types}`}>{`Add ${types}:`}</label>
        <textarea name={`add${types}`}></textarea>
        <input type="submit" value="Add"></input>
    </form>)
}

export default Form;