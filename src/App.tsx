import 'css/App.css';
import Main from 'components/main';
function App() {
  const navigtions: boolean[] = Array(4).fill(false);
  const components: JSX.Element[] = [<Main />];

  return (
    <>
      <header>
        {navigtions.map((isSelected, index) => (
          <div>this is test</div>
        ))}
      </header>
      <main>{components.map((component) => component)}</main>
    </>
  );
}

export default App;
