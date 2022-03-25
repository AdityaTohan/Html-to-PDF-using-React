import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

class App extends React.Component {

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
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
          </tr>
      )
    })
  }
    printDocument() {

        const doc = new jsPDF();

        const pdfTable = document.getElementById('divToPrint');
        var html = htmlToPdfmake(pdfTable.innerHTML);

        const documentDefinition = { content: html };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(documentDefinition).open();

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
            <table>
              <thead>
              <tr>
                {this.renderTableHeader()}
              </tr>
              </thead>
              <tbody>
              {this.renderTableRows()}
              </tbody>
            </table>

        ) : (
            <div>
              No users.
            </div>
        )

  }
}


export default App;
