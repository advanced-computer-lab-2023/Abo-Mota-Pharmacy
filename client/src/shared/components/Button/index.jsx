import './styles.css';
const Button = ({type, children, forgetPass , ...probs}) => {
  const childs = children ? children : '';
  const forgetPassClass = forgetPass ? 'forgot-password' : 'custom-button';
  return (
    <div className='button-container'>
      <button className={`${forgetPassClass}`} type={type} {...probs} >
          {!forgetPass ? <div className='button-content'>
            {childs}
          </div> : childs}
      </button>
    </div>
  );
};

export default Button;