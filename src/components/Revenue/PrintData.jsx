import React from "react";
import "./printdata.css";
export default class PrintData extends React.Component {
    render() {
        console.log(this.props.printTableData, "printTableData")

        var printBodyData = this.props.printTableData && this.props.printTableData.map((printdata, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td>{printdata.customer}</td>
                    <td>{printdata.category}</td>
                    <td>{printdata.package}</td>
                    <td>{printdata.bookedDate}</td>
                    <td>{printdata.cost}</td>
                    <td>{printdata.cash}</td>
                    <td>{printdata.card}</td>
                    <td>{printdata.wallet}</td>
                    <td>{printdata.totalCharge}</td>
                </tr>
            )
        })


        return (
            <div className="printtabledata">
                <div className="printDataTitle">Revenue Details</div>
                <table>
                    <thead>
                        <th>S.No</th>
                        <th>Customer</th>
                        <th>Category</th>
                        <th>Package</th>
                        <th>Booked Date</th>
                        <th>Cost</th>
                        <th>Cash</th>
                        <th>Card</th>
                        <th>Wallet</th>
                        <th>Total Charge</th>
                    </thead>
                    <tbody>
                        {printBodyData}
                    </tbody>
                </table>
            </div>
        );
    }
}