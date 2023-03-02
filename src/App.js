import "./App.css";
import MainMap from "./components/MainMap";
import FeatureForm from "./components/FeatureForm";
import SchoolsProvider from "./components/SchoolsProvider";

function App() {
  return (
    <SchoolsProvider>
      <FeatureForm />
      <MainMap />
    </SchoolsProvider>
  );
}

export default App;
