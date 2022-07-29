import {useStateManagement} from '../hooks/state-management-hook';
import {StateManagementTab} from '../../enums/state-management-tab';


const NavLinks = () => {
    const {setTab} = useStateManagement();

    return (
        <div>
            <button onClick={() => {
                setTab(StateManagementTab.TEXT)
            }}>
                {'Text Example'}
            </button>
            <button onClick={() => {
                setTab(StateManagementTab.API)
            }}>
                {'API Example'}
            </button>
        </div>
    )
};

export default NavLinks;