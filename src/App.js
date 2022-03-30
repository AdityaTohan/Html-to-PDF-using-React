import React, { useRef } from "react";
import { render } from "react-dom";
import { useReactToPrint } from "react-to-print";
import './App.css'
import Form from './Form'

class App extends React.Component {

    render()
     {
        return (
            <Form/>
        );
    }
}

const Print = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div style={{padding:"150px"}}>
            <App ref={componentRef} />
            <button className="btn btn-primary float-right" onClick={handlePrint}>Export To PDF</button>
        </div>
    );
};

render(<Print />, document.querySelector("#footer"));


export default App;
