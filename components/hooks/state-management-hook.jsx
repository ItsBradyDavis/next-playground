import * as React from 'react';
import {StateManagementTab} from '../../enums/state-management-tab';

const StateManagementContext = React.createContext();

const StateManagementProvider = ({children}) => {
    const [userEntries, setUserEntries] = React.useState([]);
    const [dogImageUrl, setDogImageUrl] = React.useState('');
    const [tab, setTab] = React.useState(StateManagementTab.TEXT)

    const addUserEntry = (userEntry) => {
        setUserEntries([...userEntries, userEntry])
    }

    const value = {
        userEntries,
        addUserEntry,
        tab,
        setTab,
        dogImageUrl,
        setDogImageUrl
    };

    return <StateManagementContext.Provider value={value}>{children}</StateManagementContext.Provider>
};

const useStateManagement = () => {
    const context = React.useContext(StateManagementContext);
    if (context === undefined) {
        throw new Error('useStateManagement must be used within a StateManagementProvider');
    }

    return context;
}

export {
    StateManagementProvider,
    useStateManagement
};