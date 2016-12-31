import React, {Component, PropTypes} from 'react';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import NetworkWifi from 'material-ui/svg-icons/device/network-wifi';

class Roomba extends Component {
    static propTypes = {};

    state = {
        stepIndex: 0
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    renderStepActions = (step) => {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onTouchTap={this.handleNext}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onTouchTap={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    render() {
        const {
            stepIndex
        } = this.state;

        const hasRoombas = true;
        return (
            <div>
                <header>
                    <h2>DJ Roomba Setup</h2>
                </header>

                <Stepper activeStep={stepIndex} orientation="vertical">
                    <Step>
                        <StepLabel>Select or Add a New Roomba</StepLabel>
                        <StepContent>
                            <p>
                                Each Roomba you add will have its own name, IP address and a living space it is
                                responsible
                                for cleaning.
                            </p>
                            {hasRoombas && [
                                <List key="roomba-list">
                                    <ListItem
                                        primaryText="Roomba 1"
                                        rightIcon={<NetworkWifi color="green" />}
                                    />
                                </List>,
                                <Divider
                                    key="roomba-list-divider"
                                    style={{marginBottom: 24}}
                                />
                            ]}
                            <RaisedButton
                                label="New Roomba"
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                style={{marginRight: 12}}
                            />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad group</StepLabel>
                        <StepContent>
                            <p>An ad group contains one or more ads which target a shared set of keywords.</p>
                            {this.renderStepActions(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Create an ad</StepLabel>
                        <StepContent>
                            <p>
                                Try out different ad text to see what brings in the most customers,
                                and learn how to enhance your ads using features like ad extensions.
                                If you run into any problems with your ads, find out how to tell if
                                they're running and how to resolve approval issues.
                            </p>
                            {this.renderStepActions(0)}
                        </StepContent>
                    </Step>
                </Stepper>

            </div>
        );
    }
}
export default Roomba;
