import Chance from 'chance';

import Post, {getStaticPaths, getStaticProps} from '../../../pages/posts/[id]';
import {getPostData} from '../../../lib/posts';


const chance = new Chance();

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
            }
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
});