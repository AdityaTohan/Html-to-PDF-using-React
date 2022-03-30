import React, {useState,useEffect} from "react";


function Form(){

    const [user, setUser] = useState([]);
    useEffect(() => {
                async function fetchMyAPI() {
                    let response = await fetch('https://jsonplaceholder.typicode.com/users')
                    response = await response.json()
                    setUser(response)
                }
                fetchMyAPI()

    },[]);

    console.log(user[1]?.email)

    return(
    <div className="container" style={{padding: "20px", width: "75%"}}>
        <div id="divToPrint">
            <div style={{textAlign: "center"}}>
                <div style={{padding: "0px"}}>Choice Payment Services</div>
                <div style={{padding: "0px"}}>PO Box 232138</div>
                <div style={{padding: "0px"}}>Las Vegas, NV 89105</div>
                <div style={{padding: "0px"}}>Toll Free: 1-855-918-1806</div>
                <div style={{padding: "0px"}}>Support@choicepayshelp.zendesk.com</div>
                <div> </div>
            </div>

            <h3 style={{textAlign: "center"}}><u>Modification Agreement</u></h3>
            <h3 style={{textAlign: "center", padding: "10px"}}>(<u>Closed end loans</u>)</h3>

            <div>Agreement Date:</div>
            <div><b><u>Consumer Information</u></b></div>
            <div>Account #:</div>
            <div>
                <table style={{width: "100%"}}>
                    <tr>
                        <td>Name: {user[1]?.email}</td>
                        <td>Phone:</td>
                    </tr>
                    <tr>
                        <td style={{paddingBottom: "50px"}}>Address:</td>
                        <td style={{paddingBottom: "50px"}}>Email:</td>
                    </tr>
                </table>
            </div>
            <div><b><u>Modification Information</u></b></div>
            <div>Payment Date Deferred:</div>
            <div>Date of Next Payment:</div>
            <div>Term Remaining:</div>
            <div>By signing this Agreement, you understand and agree that this is a one-time payment deferment, interest
                will continue to accrue on the deferred payment, and the missed payment will be added to the end of the
                loan which will extend your term loan by one month. You also agree that all other provisions of the
                original Loan Agreement with Medallion Bank offered by Choice remain in full force and effect and are
                still enforceable.
            </div>
            <div>I have read and understand the above information and agree to the terms.</div>
            <div style={{paddingTop: "40px"}}>
                <span>Signature</span>________________________________________________________ <span
                style={{float: "right"}}>Date___________________________</span>
            </div>
            <div><h1>_______________________________________________________</h1></div>
            <div style={{textAlign: "center"}}><b>***For Office Use Only***</b></div>
            <div>Agent Signature___________________________________________________ <span
                style={{float: "right"}}>Date___________________________</span></div>
            <div>Manager Signature________________________________________________ <span
                style={{float: "right"}}>Date___________________________</span></div>
        </div>
    </div>
    );
}

export default Form;






