import 'css/Skills.css';
import {
  C,
  Dart,
  Html5,
  CssThree,
  Javascript,
  Typescript,
  Python,
  ReactJs,
  Vuedotjs,
  Flutter,
  Visualstudiocode,
  Eclipseide,
  Androidstudio,
  Git,
  Github,
  Sourcetree,
  Mysql,
  Notion,
} from '@icons-pack/react-simple-icons';
import { faJava } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SkillArea from 'components/SkillArea';

const Skills = () => {
  const languageIcons: JSX.Element[] = [
    <C size={95} color='#A8B9CC' />,
    <FontAwesomeIcon icon={faJava} size='5x' style={{ color: '#F89820' }} />,
    <Dart size={95} color='#0175C2' />,
    <Html5 size={95} color='#E34F26' />,
    <CssThree size={95} color='#1572B6' />,
    <Javascript size={95} color='#F7DF1E' />,
    <Typescript size={95} color='#3178C6' />,
    <Python size={95} color='#3776AB' />,
  ];
  const libraryAndFrameworkIcons: JSX.Element[] = [
    <ReactJs size={95} color='#61DAFB' />,
    <Vuedotjs size={95} color='#4FC08D' />,
    <Flutter size={95} color='#02569B' />,
  ];
  const editorAndIDE: JSX.Element[] = [
    <Visualstudiocode size={95} color='#007ACC' />,
    <Eclipseide size={95} color='#2C2255' />,
    <Androidstudio size={95} color='#3DDC84' />,
  ];
  const versionControl: JSX.Element[] = [
    <Git size={95} color='#F05032' />,
    <Github size={95} color='#3E3B3B' />,
    <Sourcetree size={95} color='#0052CC' />,
  ];
  const DB: JSX.Element[] = [<Mysql size={95} color='#4479A1' />];
  const communication: JSX.Element[] = [<Notion size={95} color='#FFFFFF' />];
  return (
    <div id='area-container'>
      <SkillArea title='Language' icons={languageIcons} />
      <div>
        <SkillArea
          title='Library & Framework'
          icons={libraryAndFrameworkIcons}
        />
        <SkillArea title='Editor & IDE' icons={editorAndIDE} />
        <SkillArea title='Version Control' icons={versionControl} />
      </div>
      <div>
        <SkillArea title='DB' icons={DB} />
        <SkillArea title='Communication' icons={communication} />
      </div>
    </div>
  );
};

export default Skills;
