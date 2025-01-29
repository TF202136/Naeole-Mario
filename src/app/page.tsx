import { Button } from "react-bootstrap";
import Navigation from "./components/navbar/navigation";
export default function HomePage() {
  return (
    <div>
      <Navigation />
      <Button variant="primary">Clique Aqui</Button>
    </div>
  );
}

