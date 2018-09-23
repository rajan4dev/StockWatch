import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';
import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

class AddStockAlert extends Component {
    state = {
        msData: {},
        selectedMarket: "NSE",
        currentStockPrice: null
    };

    handleMarketChange =async (event) => {
        await this.setState({selectedMarket: event.target.value});
        this.getCurrentStockPrice();
    };

    componentDidMount() {
        this.getCurrentStockPrice();
    }

    getCurrentStockPrice = () => {
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${this.state.selectedMarket}:YESBANK&apikey=RF6MHI9CKTIV696L`)
            .then(res => {
                const msData = res.data;
                this.setState({msData:msData,
                    currentStockPrice:msData['Global Quote']['05. price']
                });
            });
    };

    render() {
        const {msData, currentStockPrice, selectedMarket} = this.state;
        return (
            <div>
                <div className="company-name">
                    Company Name Here
                </div>
                <form>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel className="select-label">Exchange</ControlLabel>

                        <FormControl value={selectedMarket} onChange={this.handleMarketChange}
                                     style={{maxWidth: "max-content"}} className="select" componentClass="select"
                                     placeholder="select">
                            <option value="NSE">NSE</option>
                            <option value="BSE">BSE</option>
                        </FormControl>
                    </FormGroup>
                </form>
                {/*  <div>
                    selected market: {selectedMarket}
                </div>*/}

                <div className="company-symbol">
                    {selectedMarket}: {
                    msData &&
                    msData['Global Quote'] &&
                    msData['Global Quote']['01. symbol'] ?
                        msData['Global Quote']['01. symbol'] :
                        "Symbol Here"
                }
                </div>
                <div>
                    {
                        currentStockPrice?currentStockPrice:"Nothing Yet"
                    }
                </div>
            </div>
        );
    }
}

export default AddStockAlert;
