import Head from 'next/head';
import Layout, {siteTitle} from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from '../lib/posts';

const getStaticProps = async () =>{
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    }
}

const Home = ({allPostsData}) => {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>Hello! My name is Brady Davis. I've been professionally developing software since 2014, and I am currently a full stack developing consultant at Source Allies. Feel free to contact me on <a href={'https://www.linkedin.com/in/brady-davis-14080589/'}>LinkedIn</a> My areas of expertise include:</p>
                <ul>
                    <li>Frontend & Backend development using NodeJs stack, including Next, React, React Native, and GraphQl</li>
                    <li>Flash AS3 Web & Mobile application development</li>
                    <li>Video Game development using Unity & C#</li>
                    <li>Test Driven Development and Unit Testing Frameworks</li>
                    <li>Vb.NET and C# .NET application development.</li>
                </ul>
                <p></p>
                <p>
                    (This is a sample website - you’ll be building a site like this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            {title}
                            <br />
                            {id}
                            <br />
                            {date}
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
};

export {getStaticProps};

export default Home;
