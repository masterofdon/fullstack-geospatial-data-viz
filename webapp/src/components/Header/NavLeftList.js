import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { hashHistory } from 'react-router';
import Divider from 'material-ui/Divider';

const HeaderIconButtonStyle = {
  width: '60px',
  height: '60px'
};

const listItemStyle = {
  paddingLeft: '40px' // 36 + 16, algin with sub list
};

class NavLeftList extends React.Component {

  handleChange = (event, value) => {
    hashHistory.push(value);
  }

  render() {
    return (
      <ul className="list-unstyled list-inline">
        <li className="list-inline-item">
          <IconMenu
            iconButtonElement={<IconButton
              style={HeaderIconButtonStyle}
              className="md-button header-btn">
              <i className="material-icons">notifications_none</i>
              <span className="badge">3</span>
            </IconButton>}
            onChange={this.handleChange}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            menuStyle={{minWidth: '250px'}}
                    >
          </IconMenu>
        </li>
      </ul>
    );
  }
}

module.exports = NavLeftList;
