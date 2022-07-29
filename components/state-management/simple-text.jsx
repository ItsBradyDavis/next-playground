import utilStyles from '../../styles/utils.module.css';
import {useStateManagement} from '../hooks/state-management-hook';
import {useState} from 'react';
import {StateManagementTab} from '../../enums/state-management-tab';

const SimpleText = () => {
    const {userEntries, addUserEntry, tab} = useStateManagement();
    const [value, setValue] = useState('');

    return (
        (tab === StateManagementTab.TEXT ? (
            <section className={utilStyles.headingMd}>
                <p className={utilStyles.headingMd}>
                    {'This page serves as a rudimentary example of using react context to manage the state of a higher level component.'}
                </p>
                <p>{'The simplest example allows us to save user input onto the state.'}</p>
                <div>
                    <form onSubmit={(event) => {
                        event.preventDefault();
                        console.log('value', value);
                        addUserEntry(value);
                        setValue('');
                    }}>
                        <input
                            type={'text'}
                            name={'userInput'}
                            value={value}
                            onChange={(event) => {
                                setValue(event.target.value);
                            }}
                        ></input>
                        <input type={'submit'} value={'Submit'}/>
                    </form>

                </div>
                <ul>
                    {
                        userEntries.map((userEntry) => {
                            return (
                                <li>
                                    {userEntry}
                                </li>
                            )

                        })
                    }
                </ul>
            </section>
        ) : (
            <></>
        ))
    );
};


export default SimpleText;