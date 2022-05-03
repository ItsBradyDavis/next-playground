import Head from 'next/head';
import Link from 'next/link';
import Layout, {siteTitle} from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import {getSortedPostsData} from '../lib/posts';
import Date from '../components/date';

const getStaticProps = async () =>{
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    }
};

const Home = ({allPostsData}) => {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section data-testid="intro-section" className={utilStyles.headingMd}>
                <p>Hello! My name is Brady Davis. I've been professionally developing software since 2014, and I am currently a full stack developing consultant at Source Allies. Feel free to contact me on <a href={'https://www.linkedin.com/in/brady-davis-14080589/'}>LinkedIn.</a> My areas of expertise include:</p>
                <ul>
                    <li>Frontend & Backend development using NodeJs stack, including Next, React, React Native, and GraphQl</li>
                    <li>Flash AS3 Web & Mobile application development</li>
                    <li>Video Game development using Unity & C#</li>
                    <li>Test Driven Development and Unit Testing Frameworks</li>
                    <li>Vb.NET and C# .NET application development.</li>
                </ul>
                <p></p>

            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
};

export {getStaticProps};

export default Home;
