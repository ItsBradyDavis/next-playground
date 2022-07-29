import {useStateManagement} from '../hooks/state-management-hook';
import {useEffect, useState} from 'react';
import {StateManagementTab} from '../../enums/state-management-tab';
import utilStyles from '../../styles/utils.module.css';
import fetch from 'cross-fetch';

const ApiExample = () => {
    const {tab, dogImageUrl, setDogImageUrl} = useStateManagement();
    const [shouldFetch, setShouldFetch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (shouldFetch && !isLoading) {
            setShouldFetch(false);
            setIsLoading(true);

            fetch('https://dog.ceo/api/breeds/image/random').then((response) => {
                return response.json();
            }).then((dog) => {
                setDogImageUrl(dog.message);
                setIsLoading(false);
            })
        }
    })

    return (
        (tab === StateManagementTab.API ? (
            <section className={utilStyles.headingMd}>
                <p className={utilStyles.headingMd}>
                    {'Here we are still on the same page, though in a different view through state management with context. The changes made in our text example persist, as will any changes made on this view.'}
                </p>
                <p>{'This example lets us call an API to fetch a picture of a dog, and save it onto our context.'}</p>
                <div>
                    <button
                        onClick={() => {
                            if(!shouldFetch) {
                                setShouldFetch(true);
                            }
                        }}
                    >
                        {'Fetch me a dog!'}
                    </button>
                </div>
                {
                    dogImageUrl ? (
                            <img src={dogImageUrl} />
                        ) :
                        (<></>)
                }
            </section>
        ) : (<></>))
    )
};

export default ApiExample;