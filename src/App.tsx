import "./App.css";
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input";

function App() {
  return (
    <>
      <div className="text-lg text-blue-600">Hello</div>
      <Button>Button</Button>
      <Button variant={"outline"}>Button</Button>
      <Input />
    </>
  );
}

export default App;
