import React from "react";
import "./printdata.css"

export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData,"printTableData")
        var printBodyData = this.props.printTableData.map((printdata,index)=>{
            return(
                <tr>
              <td>{index+1}</td>
              <td>{printdata.CustomerName}</td>
              <td>{printdata.Packagename}</td>
              <td>{printdata.Session}</td>
              <td>{printdata.CancelDate}</td>
              <td>{printdata.Time}</td>

            </tr>
            )
        })

      return (
          <div className="printtabledata">
              <div className="printDataTitle">Cancelled Appointments</div>
        <table>
          <thead>
            <th>S.No</th>
            <th>Customer</th>
            <th>Package Name</th>
            <th>Session</th>
            <th>Cancelled Date</th>
            <th>Time</th>
           
          </thead>
          <tbody>
          {printBodyData}
          </tbody>
        </table>
        </div>
      );
    }
  }