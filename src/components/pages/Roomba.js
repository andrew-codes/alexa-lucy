import React, {Component, PropTypes} from 'react';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import NetworkWifi from 'material-ui/svg-icons/device/network-wifi';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import {connectModule} from 'redux-modules';
import {List, ListItem} from 'material-ui/List';
import {Step, Stepper, StepLabel, StepContent} from 'material-ui/Stepper';
import ReduxModule from './../../redux-modules/Roomba';
import {getRoombas, getSelectedRoomba} from './../../selectors/Roomba';

const selector = state => ({
    roombas: getRoombas(state),
    selectedRoomba: getSelectedRoomba(state),
});

@connectModule(selector, ReduxModule)
class Roomba extends Component {
    static propTypes = {
        cleaningSpaces: PropTypes.arrayOf(PropTypes.string),
        roombas: PropTypes.arrayOf(PropTypes.shape({
            oid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            spaces: PropTypes.arrayOf(PropTypes.string).isRequired,
        })).isRequired,
        selectedRoomba: PropTypes.shape({
            oid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            address: PropTypes.string.isRequired,
            spaces: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        actions: PropTypes.shape({
            update: PropTypes.func.isRequired,
            save: PropTypes.func.isRequired,
        }).isRequired
    };
    static defaultProps = {
        cleaningSpaces: [
            'kitchen',
            'living room',
            'downstairs'
        ]
    };
    state = {
        isValid: true,
        stepIndex: 0,
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

    isStepValid = (stepIndex) => {
        if (stepIndex === 0) {
            return false;
        }
        if (stepIndex === 1) {
            return this.props.selectedRoomba.name !== '' && this.props.selectedRoomba.address !== '';
        }
        return true;
    };

    newRoomba = () => {
        const {stepIndex} = this.state;
        this.props.actions.create();
        this.setState({
            stepIndex: stepIndex + 1,
            isValid: this.isStepValid(0),
        });
    };

    updateRoomba = (field, stepIndex) => (evt, newValue) => {
        this.props.actions.update({
            oid: this.props.selectedRoomba.oid,
            [field]: newValue,
        });
        this.setState({
            isValid: this.isStepValid(stepIndex),
        });
    };

    toggleSpace = (space) => (evt, isChecked) => this.props.actions.updateCleaningSpace({
        oid: this.props.selectedRoomba.oid,
        space,
        add: isChecked
    });

    saveRoomba = () => this.props.actions.save();

    renderBackButton = (step) => step > 0 && (
        <FlatButton
            label="Back"
            disabled={this.props.stepIndex === 0 || !this.state.isValid}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
        />
    );

    renderStepActions = (step) => {
        const {
            isValid,
            stepIndex
        } = this.state;

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
                {this.renderBackButton(step)}
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
            cleaningSpaces,
            roombas,
            selectedRoomba,
        } = this.props;
        const {
            stepIndex,
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
                                            primaryText={`${roomba.name} (cleans ${roomba.spaces.join(', ')})`}
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
                                value={selectedRoomba.name}
                                onChange={this.updateRoomba('name', 1)}
                            />
                            <br />
                            <TextField
                                floatingLabelText="Roomba IP Address"
                                fullWidth
                                hintText="enter the IP address for your roomba"
                                value={selectedRoomba.address}
                                onChange={this.updateRoomba('address', 1)}
                            />
                            {this.renderStepActions(1)}
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
                                        toggled={Boolean(selectedRoomba.spaces.find((roombaSpace) => roombaSpace === space))}
                                        onToggle={this.toggleSpace(space)}
                                    />
                                ))}
                            </div>
                            {this.renderStepActions(2)}
                        </StepContent>
                    </Step>
                </Stepper>

            </div>
        );
    }
}
export default Roomba;
