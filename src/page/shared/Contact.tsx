import BackgroundImage from "../assets/background.png";

const Contact = () => {
  return (
    <div
      className='sign-in__wrapper'
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div>
        <h1>Hi How are you?</h1>
      </div>
    </div>
  );
};

export default Contact;
