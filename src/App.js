import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
// import jsPDF from "jspdf";
//import { Form } from "./Form";

class App extends React.Component {

    printDocument() {

        // var doc=new jsPDF('divToPrint');
        // doc.save('form.pdf')
        const pdfTable = document.getElementById('divToPrint');
        var html = htmlToPdfmake(pdfTable.innerHTML);
        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();
    }


    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            isError: false
        }
    }


    async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        if (response.ok) {
            const users = await response.json()
            this.setState({ users, isLoading: false })
        } else {
            this.setState({ isError: true, isLoading: false })
        }
    }
    // renderTableHeader = () => {
    //     return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr}</th>)
    // }
    // renderTableRows = () => {
    //     return this.state.users.map(user => {
    //         return (
    //             <tr key={user.id}>
    //                 <td>{user.firstName}</td>
    //                 <td>{user.lastName}</td>
    //                 <td>{user.userName}</td>
    //                 <td>{user.email}</td>
    //                 <td>{user.password}</td>
    //             </tr>
    //         )
    //     })
    // }


    render() {
        const { users, isLoading, isError } = this.state

        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error</div>
        }

        return users.length > 0
            ? (
                <div style={{padding:"100px"}}>
                    <div id="divToPrint">
                        {/*<table className="table">*/}
                        {/*    <thead className="thead-dark">*/}
                        {/*    <tr>*/}
                        {/*        {this.renderTableHeader()}*/}
                        {/*    </tr>*/}
                        {/*    </thead>*/}
                        {/*    <tbody>*/}
                        {/*        {this.renderTableRows()}*/}
                        {/*    </tbody>*/}
                        {/*</table>*/}
                        <p>Choice Payment Services</p>
                        <p>PO Box 232138</p>
                        <p>Las Vegas, NV 89105</p>
                        <p >Toll Free:  1-855-918-1806</p>
                        <p >Support@choicepayshelp.zendesk.com</p>
                        <h1 ><u>Modification Agreement</u></h1>
                        <h1 >(<u>Closed end loans</u>)</h1>
                        <p>Agreement Date:</p>
                        <p><b><i>Consumer Information</i></b></p>
                        <p>Account #:</p>
                        <p>Phone:</p>
                        <p>Address:</p>
                        <p>Email:</p>
                        <p><b><u>Modification Information</u></b></p>
                        <p>Payment Date Deferred:</p>
                        <p>Date of Next Payment</p>
                        <p>Term Remaining:</p>
                        <p>By signing this Agreement, you understand and agree that this is a one-time payment deferment, interest will continue to accrue on the deferred payment, and the missed payment will be added to the end of the loan which will extend your term loan by one month. You also agree that all other provisions of the original Loan Agreement with Medallion Bank offered by Choice remain in full force and effect and are still enforceable.</p>
                        <p>I have read and understand the above information and agree to the terms.</p>
                        <p>Signature____________________________________________________ Date___________________________</p>
                        <h1>_____________________________________________________________________________</h1>
                        <p ><b>***For Office Use Only***</b></p>
                        <p>Agent Signature_______________________________________________ Date___________________________</p>
                        <p>Manager Signature_________________________________________ Date___________________________</p>

                    </div>
                    <button className="btn btn-primary float-right" onClick={this.printDocument}>Export To PDF</button>
                </div>

            ) : (
                <div>
                    No users.
                </div>
            )

    }
}


export default App;
