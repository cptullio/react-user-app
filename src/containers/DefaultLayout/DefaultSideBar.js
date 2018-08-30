import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import CustomerSideBar from '../../components/customerSideBar'



const propTypes = {
    children: PropTypes.node,
};

const defaultProps = {};

class DefaultSideBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle = function toggle(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
    };

    render() {

        // eslint-disable-next-line
        const { children, ...attributes } = this.props;
        
        return (
            <React.Fragment>
                <div className="sidebar">
                    <PerfectScrollbar className="sidebar-nav" suppressScrollX={true}>
                        <nav className="sidebar-nav">
                            <ul className="nav">
                                <li className="nav-title">My Experience</li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/general">
                                        <i className="nav-icon cui-speedometer"></i> General
                                    </NavLink>
                                </li>
                                <CustomerSideBar></CustomerSideBar>
                            </ul>
                        </nav>
                    </PerfectScrollbar>
                </div>
            </React.Fragment>
        );
    }
}

DefaultSideBar.propTypes = propTypes;
DefaultSideBar.defaultProps = defaultProps;

export default DefaultSideBar;
