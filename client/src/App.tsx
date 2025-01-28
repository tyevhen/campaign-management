import "./App.css";
import CampaignsTable from "./components/CampaignsTable";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Layout>
      <CampaignsTable/>
    </Layout>
  );
};

export default App;
