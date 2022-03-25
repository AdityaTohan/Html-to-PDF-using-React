import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

class App extends React.Component {

    printDocument() {


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
    renderTableHeader = () => {
        return Object.keys(this.state.users[0]).map(attr => <th key={attr}>{attr}</th>)
    }
    renderTableRows = () => {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.userName}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                </tr>
            )
        })
    }


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
                <div className="App container mt-5">
                    <div id="divToPrint">
                        <table className="table">
                            <thead className="thead-dark">
                            <tr>
                                {this.renderTableHeader()}
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderTableRows()}
                            </tbody>
                        </table>

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
