import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DropdownItem } from 'reactstrap';

const sylvieScreensMenuItemsAuthenticated = () => (
  <>
    <MenuItem icon="user" to="/simulateur-prime" data-cy="settings">
      <Translate contentKey="premium-simulator.screen-header-title">Simulateur</Translate>
    </MenuItem>
  </>
);

export const SylvieScreensMenu = ({ isAuthenticated = false }) => (
  <NavDropdown icon="user" name={translate('sylvie-screens.menu-title')} id="sylvie-menu" data-cy="sylvieMenu">
    {isAuthenticated && sylvieScreensMenuItemsAuthenticated()}
  </NavDropdown>
);

export default SylvieScreensMenu;
