import Chance from 'chance';
import * as RTL from '@testing-library/react';
import '@testing-library/jest-dom'

import Post, {getStaticPaths, getStaticProps} from '../../../pages/posts/[id]';
import {getAllPostIds, getPostData} from '../../../lib/posts';

const chance = new Chance();
jest.mock('../../../lib/posts');
jest.mock('../../../components/date', () => ({dateString}) => (
    <div>{`${dateString}`}</div>
));

describe('Post [id]', () => {
    describe('getStaticProps', () => {
        let params,
            expectedPostData;

        beforeEach(() => {
            params = {
                id: chance.string()
            };

            expectedPostData = {
                [chance.word()]: chance.string()
            };

            getPostData.mockResolvedValue(expectedPostData);
        });

        test('should get post data & return it on props', async () => {
            const result = await getStaticProps({params});

            expect(getPostData).toHaveBeenCalledTimes(1);
            expect(getPostData).toHaveBeenCalledWith(params.id);

            expect(result).toStrictEqual({
                props: {
                    postData: expectedPostData
                }
            });
        });
    });

    describe('getStaticPaths', () => {
        let expectedPostIds;

        beforeEach(() => {
            expectedPostIds = chance.n(chance.string, chance.d6());

            getAllPostIds.mockReturnValue(expectedPostIds);
        });

        test('should get paths & return it with fallback false', async () => {
            const result = await getStaticPaths();

            expect(getAllPostIds).toHaveBeenCalledTimes(1);

            expect(result).toStrictEqual({
                fallback: false,
                paths: expectedPostIds
            })
        });
    });

    describe('Component', () => {
        let postData;

        const renderComponent = () => RTL.render(<Post postData={postData}/>);

        beforeEach(() => {
            postData = {
                contentHtml: chance.string(),
                date: chance.date(),
                title: chance.string()
            }
        });

        afterEach(() => {
            RTL.cleanup();
        });

        test('should render title, date, and set content HTML', () => {
            const {getByText} = renderComponent();

            expect(getByText(postData.title)).toBeInTheDocument();
            expect(getByText(`${postData.date}`)).toBeInTheDocument();
            expect(getByText(postData.contentHtml)).toBeInTheDocument();
        });
    });
});