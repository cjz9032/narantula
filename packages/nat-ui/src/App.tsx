import alinks from "@narantula/backend/public/output.csv";
import "./App.css";

function App() {
  return (
    <>
      <ul>
        {(
          alinks as {
            text: string;
            url: string;
          }[]
        ).map((link) => (
          <li>
            <a target="_blank" href={link.url}>{link.text}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
