import styles from './index.css';
import { Button } from 'antd';

const electron = window.electron;
const { ipcRenderer } = electron;

ipcRenderer.on('ping-reply', (event, arg) => {
  console.log(arg);
})

export default function () {

  const printHello = () => {
    ipcRenderer.send('ping');
  }

  const closeWindow = () => {
    window.close();
  };

  return (
    <div className={styles.normal}>
      <Button onClick={closeWindow}>Close Window!</Button>
      <Button onClick={printHello}>Print Info</Button>
    </div>
  );
}
