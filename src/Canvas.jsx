import { useState, useRef, useEffect } from 'react'
import { ReactSketchCanvas } from "react-sketch-canvas"
import { Switch } from 'antd';
import Eraser from './icons/Eraser';
import Pencil from './icons/Pencil';

export default function Canvas(props) {

const selectedUrl = props.selectedUrl

const canvasRef = useRef(null);
const [eraseMode, setEraseMode] = useState(false);
const [strokeWidth, setStrokeWidth] = useState(5);
const [eraserWidth, setEraserWidth] = useState(10);
const [strokeColor, setStrokeColor] = useState("#000000");
const [backgroundImage, setBackgroundImage] = useState();


useEffect(() => {
  console.log('url changed')
  handleClearClick()

}, [selectedUrl])


const handleEraserClick = () => {
  setEraseMode(true);
  canvasRef.current?.eraseMode(true);
};
const handlePenClick = () => {
  setEraseMode(false);
  canvasRef.current?.eraseMode(false);
};
const handleStrokeColorChange = (event) => {
  setStrokeColor(event.target.value)
}
const handleStrokeWidthChange = (event) => {
  setStrokeWidth(event.target.value)
}
const handleEraserWidthChange = (event) => {
  setEraserWidth(event.target.value)
}
const handleUndoClick = () => {
  canvasRef.current?.undo();
};
const handleRedoClick = () => {
  canvasRef.current?.redo();
};
const handleClearClick = () => {
  canvasRef.current?.clearCanvas();
};


function toggleSwitch(checked) {
  // console.log(`toggling to ${checked}`)
  checked ? console.log('true') : console.log('false')
  checked ? handlePenClick() : handleEraserClick()
}


return (
  <div>
    <div className='menu'>
      <div className='menu-button-container'>
          <div className='switch-container'>
            <Switch 
                  className='switch'
                  defaultChecked 
                  onChange={toggleSwitch} 
                  checkedChildren={"DRAWING"}
                  unCheckedChildren={"ERASING"}
            />
          </div>

          <label htmlFor="color">Color</label>
            <input
              type="color"
              value={strokeColor}
              onChange={handleStrokeColorChange}
          />


      <div className='button-group'>

          <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handleUndoClick}
            >
              Undo
          </button>
          <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handleRedoClick}
            >
              Redo
          </button>
          <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={handleClearClick}
            >
              Clear
          </button>



      </div>


          


      </div>

      <br></br>

      <div className='menu-slider-container'>

        <div className='stroke'>
          <label htmlFor="strokeWidth" className="form-label">
            Stroke Width
          </label>
            <input
              type="range"
              className="form-range"
              min="1"
              max="20"
              step="1"
              id="strokeWidth"
              value={strokeWidth}
              onChange={handleStrokeWidthChange}
            />

        </div>

        <div className='eraser'>
          <label htmlFor="eraserWidth" className="form-label">
              Eraser Width
          </label>
            <input
              // disabled={!eraseMode}
              type="range"
              className="form-range"
              min="1"
              max="20"
              step="1"
              id="eraserWidth"
              value={eraserWidth}
              onChange={handleEraserWidthChange}
            />


        </div>


        
        <br></br>
        


      </div>

        <br></br>

    </div>


  <div className='canvas-container'>

  <ReactSketchCanvas 
    className='canvas'
    ref={canvasRef}
    height="450px"
    canvasColor="transparent"
    strokeColor={strokeColor}
    strokeWidth={strokeWidth}
    eraserWidth={eraserWidth}
    backgroundImage={selectedUrl}
    preserveBackgroundImageAspectRatio="xMidYMid"
  />

  </div>


</div>
)

}
