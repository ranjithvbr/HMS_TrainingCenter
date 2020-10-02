import React from "react";
import Button from "@material-ui/core/Button";
import "./PaymentMethod.css";
import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";
import Left from "../../Images/back.svg";
import Right from "../../Images/right.svg";
import Atm from "../../Images/atm.png";
import Labelbox from "../../helpers/labelbox/labelbox";
import { NavLink } from "react-router-dom";

export default class PaymentMethod extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="PaymentMethod">
        <div className="option_container">
          <div>
            <p className="select_text">
              Select Option to Pay <span className="option_amt">2500 KWD</span>
            </p>
          </div>
          <div>
            <Button className="cancelpay_button">Cancel Payment</Button>
          </div>
        </div>
        <div className="payment_method_container">
          <p className="select_pay_text">Please Select a Payment Method</p>
          <Divider light className="select_divider" />
          <Grid container className="saved_cards_container">
            <Grid item xs={12} md={5} className="payment_method_child">
              <p className="saved_cards">Saved Cards</p>
              <div className="saved_cards_parent">
                <img src={Right} />
                <div className="debit_container">
                  <div className="debit_child">
                    <img src={Atm} className="deb_img" />
                  </div>
                </div>
                <div className="pay_carddetails">
                  <h1 style={{ fontSize: "32px" }}>**** **** **** 3118</h1>
                  <div className="pay_carddate">
                    <span>08/18</span>
                    <span style={{ marginLeft: "30px" }}>07/23</span>
                  </div>
                  <h4>K.KHADIJA</h4>
                </div>
                <img src={Left} />
              </div>
            </Grid>
            <Grid item xs={6} md={5}>
              <div className="payment_method">
                <div>
                  <p style={{ color: "#82AE3F" }}>Credit / Debit Card</p>
                  <p>Wallet</p>
                  <p>Knet</p>
                </div>
                <div className="divider_line"></div>
                <div className="payment_method_list">
                  <Labelbox type="text" labelname="Card Number" />
                  <Labelbox type="text" labelname="Card Holder Name" />
                  <Grid container>
                    <Grid item md={8} sm={5}>
                      <div className="select_expiry_date">
                        <Labelbox
                          type="select"
                          labelname="Expiry Date"
                          value="05"
                        />
                        <span className="select_labelbox">
                          <Labelbox type="select" value="2010" />
                        </span>
                      </div>
                    </Grid>
                    <Grid item md={4} sm={5}>
                      <div className="payment_ccv">
                        <Labelbox type="number" labelname="CVV" />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={2}>
              <div className="summery_div">
                <p className="summery_text">Summary</p>
                <div className="sub_total_div">
                  <p>SubTotal</p>
                  <span>2500</span>
                </div>
                <Divider />
                <div className="sub_total_div">
                  <p>SubTotal</p>
                  <span>2500</span>
                </div>
              </div>
            </Grid>
          </Grid>
          <div className="pay_now_container">
            <Button
              className="pay_now_button"
              component={NavLink}
              to="/Home/paymentreceived"
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
