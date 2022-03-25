import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      user:[],
      isLoading:false,
      isError:false
    }
  }

  //api calling
  async componentDidMount(){
    this.setState({isLoading:true})

    const response = await fetch("https://jasonplaceholder.typicode.com/users")

    if(response.ok) {
      const users = await response.json()
      console.log(users)
      this.state({users, isLoading: false})
    }
    else{
      this.setState({isError:true,isLoading:false})
    }
  }

  printDocument() {

    const doc = new jsPDF();

    const pdfTable = document.getElementById('divToPrint');
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(documentDefinition).open();

  }

  renderTableHeader = () => {
    return Object.keys(this.state.users[0]).map(attr => <th key={attr}>

        </th>)
  }

  renderTableRows = () => {
    return this.state.users.map(user => {
      return(
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
      )
    })
  }

  render() {

    const{users,isLoading,isError}=this.state

    if(isLoading){
      return <div>Loading..</div>
    }

    if(isError){
      return <div>Error...</div>
    }


    return (
        <div className="App container mt-5">

          <div id="divToPrint">
            <h2>Table to PDF</h2>

            <table className="table">
              <thead className="thead-dark">
              <tr>
                {this.renderTableHeader()}
              </tr>
              </thead>
              <tbody>
              <tr>
                {this.renderTableRows()}
              </tr>
              </tbody>
            </table>

          </div>

          <button class="btn btn-primary float-right" onClick={this.printDocument}>Export To PDF</button>
        </div>
    )
  };
}


export default App;
