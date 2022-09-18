import 'css/SkillArea.css';

const SkillArea = ({
  title,
  icons,
}: {
  title: string;
  icons: JSX.Element[];
}) => {
  if (icons.length === 1) {
    icons.unshift(<div></div>);
    icons.push(<div></div>);
  }
  return (
    <div>
      <div id='title'>{title}</div>
      <div id='grid-container'>
        {icons.map((icon, index) => {
          return <div key={index}>{icon}</div>;
        })}
      </div>
    </div>
  );
};

export default SkillArea;
