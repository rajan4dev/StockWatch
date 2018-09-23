import React, {Component} from 'react';
import axios from 'axios';
import '../App.css';
import Icon from '@material-ui/core/Icon';

class AddStockAlert extends Component {
    state = {
        msData: {}
    };

    componentDidMount() {
        axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=NSE:YESBANK&apikey=RF6MHI9CKTIV696L`)
            .then(res => {
                const msData = res.data;
                this.setState({msData});
            })
    }

    render() {
        const {msData} = this.state;
        return (
            <div>
                <Icon>star</Icon>
                <div className="company-name">
                    Company Name Here
                </div>
                <div className="company-symbol">
                    NASDAQ: {
                    msData &&
                    msData['Global Quote'] &&
                    msData['Global Quote']['01. symbol'] ?
                        msData['Global Quote']['01. symbol'] :
                        "Symbol Here"
                }
                </div>
                <div>
                    {
                        msData &&
                        msData['Global Quote'] &&
                        msData['Global Quote']['05. price'] ?
                            msData['Global Quote']['05. price'] :
                            "Current Price Here"
                    }
                </div>
            </div>
        );
    }
}

export default AddStockAlert;
