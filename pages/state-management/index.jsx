import Layout, {} from '../../components/Layout';
import Head from 'next/head';
import SimpleText from '../../components/state-management/simple-text';
import {StateManagementProvider} from '../../components/hooks/state-management-hook';
import NavLinks from '../../components/state-management/nav-links';
import ApiExample from '../../components/state-management/api-example';

const StateManagement = () => {
    return (
        <Layout>
            <StateManagementProvider>
                <Head>
                    <title>{'React Context Example'}</title>
                </Head>
                <SimpleText />
                <ApiExample />
                <NavLinks />
            </StateManagementProvider>
        </Layout>
    )
};

export default StateManagement;