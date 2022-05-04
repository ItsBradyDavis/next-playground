import Chance from 'chance';
import * as RTL from '@testing-library/react';
import '@testing-library/jest-dom'

import Home, {getStaticProps} from '../pages';
import {getSortedPostsData} from '../lib/posts';
import Date from '../components/date';

jest.mock('../components/date', () => ({dateString}) => (
    <div>{`${dateString}`}</div>
));
jest.mock('../lib/posts');


const chance = new Chance();

describe('index', () => {
    let allPostsData;

    beforeEach(() => {
        console.log('in be');
        allPostsData = chance.n(() => ({
            date: chance.date(),
            id: chance.natural(),
            title: chance.string()
        }), chance.d6());
        console.log('allPostsData', allPostsData);

        getSortedPostsData.mockReturnValue(allPostsData);
    });

    describe('getStaticProps',  () => {
        test('should return posts data', async () => {
            const result = await getStaticProps();

            expect(getSortedPostsData).toHaveBeenCalledTimes(1);

            expect(result).toStrictEqual({
                props: {
                    allPostsData
                }
            });
        });
    });
    
    describe('component', () => {
        const renderComponent = () => RTL.render(<Home allPostsData={allPostsData}/>);

        afterEach(() => {
            RTL.cleanup();
        });

        test('should render intro section', () => {
            const {getByTestId} = renderComponent();

            expect(getByTestId('intro-section')).toBeInTheDocument();
        });

        test('should render each post', () => {
            const {getByText} = renderComponent();

            allPostsData.forEach((post) => {
                expect(getByText(post.title)).toBeInTheDocument();
                expect(getByText(post.date)).toBeInTheDocument();
            })
        });
    });
});