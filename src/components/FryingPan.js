import "./fryingPanStyles.css";

const FryingPan = () => {
  return (
    <div id='cooking'>
      <div className='bubble'></div>
      <div className='bubble'></div>
      <div className='bubble'></div>
      <div className='bubble'></div>
      <div className='bubble'></div>
      <div id='area'>
        <div id='sides'>
          <div id='pan'></div>
          <div id='handle'></div>
        </div>
        <div id='pancake'>
          <div id='pastry'></div>
        </div>
      </div>
    </div>
  );
};

export default FryingPan;
