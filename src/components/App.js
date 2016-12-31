import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
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

    getTitle = () => (
        this.props.router.isActive('/roomba')
            ? 'DJ Roomba'
            : this.props.router.isActive('/about')
                ? 'About'
                : null
    );

    isNavDrawerOpen = () => this.props.width === LARGE && this.getTitle() !== null;

    getStyles = () => ({
        content: {
            height: '100vh',
            margin: this.isNavDrawerOpen() ? '-64px 0 0 200px' : '-64px 0 0 0',
            padding: `${64+24}px 24px 24px 24px`,
        }
    });

    render() {
        const {
            location,
        } = this.props;
        let {
            navDrawerOpen,
        } = this.state;

        let showMenuIconButton = true;

        if (this.isNavDrawerOpen()) {
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
                    applicationName="Lucy"
                    docked={true}
                    location={location}
                    open={navDrawerOpen}
                    width={200}
                    onChangeList={this.handleChangeList}
                    onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
                />
                <Paper style={styles.content}>
                    {this.props.children}
                </Paper>
            </div>
        );
    }
}
export default withWidth()(App);
