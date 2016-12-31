import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import AppNavDrawer from './AppNavDrawer';

class App extends Component {
    static propTypes = {
        children: PropTypes.node,
        location: PropTypes.object,
        width: PropTypes.number.isRequired
    };
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };
    static childContextTypes = {
        muiTheme: PropTypes.object,
    };
    state = {
        navDrawerOpen: false
    };

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    }

    componentWillMount() {
        this.setState({
            muiTheme: getMuiTheme(),
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({
            muiTheme: newMuiTheme,
        });
    }

    handleChangeList = (event, value) => {
        this.context.router.push(value);
        this.setState({
            navDrawerOpen: false,
        });
    };

    handleTouchTapLeftIconButton = (event) => {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen
        });
    };

    handleChangeRequestNavDrawer = (open) => {
        this.setState({
            navDrawerOpen: open,
        });
    };

    getStyles = () => ({});

    render() {
        const {
            location,
            router,
            width,
        } = this.props;
        let {
            navDrawerOpen,
        } = this.state;
        let showMenuIconButton = true;
        const title =
            router.isActive('/roomba') ? 'DJ Roomba' :
                router.isActive('/about') ? 'About' : null;
        if (width === LARGE && title !== null) {
            navDrawerOpen = true;
            showMenuIconButton = false;
        }
        const styles = this.getStyles();
        return (
            <div>
                <AppBar
                    zDepth={0}
                    onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                    showMenuIconButton={showMenuIconButton}
                />
                <AppNavDrawer
                    applicationName="Jarvis"
                    docked={true}
                    location={location}
                    open={navDrawerOpen}
                    width={200}
                    onChangeList={this.handleChangeList}
                    onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
                />
                {this.props.children}
            </div>
        );
    }
}
export default withWidth()(App);
