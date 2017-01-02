import Drawer from 'material-ui/Drawer';
import React, {Component, PropTypes} from 'react';
import {List, ListItem, makeSelectable} from 'material-ui/List';

const SelectableList = makeSelectable(List);

class AppNavDrawer extends Component {
    static propTypes = {
        applicationName: PropTypes.string,
        docked: PropTypes.bool.isRequired,
        location: PropTypes.object.isRequired,
        open: PropTypes.bool.isRequired,
        style: PropTypes.object,
        width: PropTypes.number,
        onChangeList: PropTypes.func.isRequired,
        onRequestChangeNavDrawer: PropTypes.func.isRequired
    };

    static defaultProps = {
        width: 300
    };

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
    };

    handleTouchTapHeader = () => {
        this.context.router.push('/');
        this.props.onRequestChangeNavDrawer(false);
    };

    getStyles = () => ({
        logo: {
            cursor: 'pointer',
            fontSize: 24,
            marginBottom: 6,
            padding: 16
        },
    });

    render() {
        const {
            applicationName,
            docked,
            location,
            open,
            width,
            onChangeList,
            onRequestChangeNavDrawer
        } = this.props;
        const styles = this.getStyles();
        return (
            <Drawer
                docked={docked}
                open={open}
                width={width}
                onRequestChange={onRequestChangeNavDrawer}
            >
                <div
                    onTouchTap={this.handleTouchTapHeader}
                    style={styles.logo}
                >
                    {applicationName}
                </div>
                <SelectableList
                    value={location.pathname}
                    onChange={onChangeList}
                >
                    <ListItem primaryText="DJ Roomba" value="/roomba" />
                    <ListItem primaryText="about" value="/about" />
                </SelectableList>
            </Drawer>
        );
    }
}
export default AppNavDrawer;
