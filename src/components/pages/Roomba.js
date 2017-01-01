import React, {Component, PropTypes} from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import NetworkWifi from 'material-ui/svg-icons/device/network-wifi';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';

class Roomba extends Component {
    static propTypes = {
        cleaningSpaces: PropTypes.arrayOf(PropTypes.string)
    };
    static defaultProps = {
        cleaningSpaces: [
            'kitchen',
            'living room',
            'downstairs'
        ]
    };

    state = {
        stepIndex: 0,
        roombaName: '',
        roombaAddress: '',
        roombaCleaningSpaces: {},
        roombas: []
    };

    handleNext = () => {
        const {stepIndex} = this.state;
        let newStepIndex = stepIndex + 1;
        const finished = stepIndex >= 2;
        if (finished) {
            this.saveRoomba();
            newStepIndex = 0;
        }
        this.setState({
            stepIndex: newStepIndex,
            finished,
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    newRoomba = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            roombaId: 'Roomba:NULL',
            roombaName: '',
            roombaAddress: '',
            roombaCleaningSpaces: {}
        });
    };

    updateRoomba = (field) => (evt, newValue) => this.setState({
        [field]: newValue
    });

    toggleSpace = (space) => (evt, isChecked) => this.setState({
        roombaCleaningSpaces: {
            ...this.state.roombaCleaningSpaces,
            [space]: isChecked
        }
    });

    saveRoomba = () => {
        this.setState({
            roombas: this.state.roombas.concat([
                {
                    name: this.state.roombaName,
                    address: this.state.roombaAddress,
                    spaces: this.state.roombaCleaningSpaces
                }
            ])
        })
    };

    selectedSpaces = () => Object.keys(this.state.roombaCleaningSpaces)
        .filter((key) => this.state.roombaCleaningSpaces[key]);

    renderStepActions = (isValid) => (step) => {
        const {stepIndex} = this.state;

        return (
            <div style={{margin: '12px 0'}}>
                <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    disabled={!isValid}
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
    };

    getStyles = () => ({
        toggleContainer: {
            maxWidth: 250
        },
        toggle: {
            marginBottom: 16
        }
    });

    render() {
        const {
            cleaningSpaces
        } = this.props;
        const {
            stepIndex,
            roombaName,
            roombaAddress,
            roombas
        } = this.state;
        const styles = this.getStyles();

        const hasRoombas = roombas.length > 0;
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
                                    {roombas.map((roomba, index) => (
                                        <ListItem
                                            key={index}
                                            primaryText={`${roomba.name} (${roombaAddress})`}
                                            rightIcon={<NetworkWifi color="green" />}
                                        />
                                    ))}
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
                                onTouchTap={this.newRoomba}
                            />
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Roomba Name and Address</StepLabel>
                        <StepContent>
                            <p>Give your roomba an identifiable name and its IP address on your local network.</p>
                            <TextField
                                floatingLabelText="Roomba Name"
                                fullWidth
                                hintText="enter a uniquely identifiable name for your roomba"
                                value={roombaName}
                                onChange={this.updateRoomba('roombaName')}
                            />
                            <br />
                            <TextField
                                floatingLabelText="Roomba IP Address"
                                fullWidth
                                hintText="enter the IP address for your roomba"
                                value={roombaAddress}
                                onChange={this.updateRoomba('roombaAddress')}
                            />
                            {this.renderStepActions((this.state.roombaName !== '' && this.state.roombaAddress !== ''))(1)}
                        </StepContent>
                    </Step>
                    <Step>
                        <StepLabel>Cleaning spaces</StepLabel>
                        <StepContent>
                            <p>
                                Assign your roomba to one or more living spaces. Any associated roomba(s) will be
                                directed to begin cleaning when telling Lucy to clean their associated living space.
                            </p>
                            <div style={styles.toggleContainer}>
                                {cleaningSpaces.map((space, index) => (
                                    <Toggle
                                        label={space}
                                        key={index}
                                        style={styles.toggle}
                                        onToggle={this.toggleSpace(space)}
                                    />
                                ))}
                            </div>
                            {this.renderStepActions(this.selectedSpaces().length > 0)(2)}
                        </StepContent>
                    </Step>
                </Stepper>

            </div>
        );
    }
}
export default Roomba;
