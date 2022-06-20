import { useRouter } from 'next/router';
import Nav from 'lib/components/Nav';
import useFunction from 'lib/hooks/useFunction';
import Layout from 'lib/Layout';
import FunctionOverview from 'lib/pages/function/FunctionOverview';
import FunctionSettings from 'lib/pages/function/FunctionSettings';
import FunctionDeployments from 'lib/pages/function/FunctionDeployments';
import FunctionLogs from 'lib/pages/function/FunctionLogs';
import FunctionLinks from 'lib/components/FunctionLinks';
import Button from 'lib/components/Button';

const Function = () => {
  const {
    query: { functionId },
  } = useRouter();

  const { data: func } = useFunction(functionId as string);

  return (
    <Layout title={`Function ${func.name}`} titleStatus="success" rightItem={<FunctionLinks func={func} />}>
      <Nav defaultValue="overview">
        <Nav.List rightItem={<Button href={`/playground/${func.id}`}>Playground</Button>}>
          <Nav.Link value="overview">Overview</Nav.Link>
          <Nav.Link value="deployments">Deployments</Nav.Link>
          <Nav.Link value="logs">Logs</Nav.Link>
          <Nav.Link value="settings">Settings</Nav.Link>
        </Nav.List>
        <Nav.Content value="overview">
          <FunctionOverview func={func} />
        </Nav.Content>
        <Nav.Content value="deployments">
          <FunctionDeployments func={func} />
        </Nav.Content>
        <Nav.Content value="logs">
          <FunctionLogs func={func} />
        </Nav.Content>
        <Nav.Content value="settings">
          <FunctionSettings func={func} />
        </Nav.Content>
      </Nav>
    </Layout>
  );
};

export default Function;
