import 'css/SkillArea.css';

const SkillArea = ({
  title,
  icons,
}: {
  title: string;
  icons: JSX.Element[];
}) => {
  return (
    <div id='container'>
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
