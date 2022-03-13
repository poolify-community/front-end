import { combineReducers } from 'redux';
import vaultReducer from 'features/Vaults/redux/reducer';
import connectorReducer from 'libs/hooks/useConnector/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  vault: vaultReducer,
  connector: connectorReducer
};

export default combineReducers(reducerMap);
