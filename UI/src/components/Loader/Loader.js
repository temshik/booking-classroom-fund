import loaderImg from "../../images/loader.gif";
import ReactDOM from "react-dom";
import './Loader.scss'

const Loader = () => {
  return ReactDOM.createPortal(
    <div className={'wrapper'}>
      <div className={'loader'}>
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>,
    document.getElementById("loader")
  );
};

export default Loader;