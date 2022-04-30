
import { useHistory } from 'react-router-dom';
import './splashPage.css';

const SplashPage = () => {

    const history = useHistory();

    const signUp = (e) => {
        e.preventDefault();
        history.push('/sign-up');
    };

    const login = (e) => {
        e.preventDefault();
        history.push('/login');
    };

    return (
        <div id='page'>
            <div id='asdf'>
                <h1>Welcome to PettIt</h1>
                <p>Pettit is a place where you can see all the creatures you want to pet!</p>
                <div id='buttons'>
                    <button className='btn' onClick={signUp}>Sign Upppppppppp</button>
                    <button className='btn' onClick={login}>Login</button>
                </div>
            </div>
        </div>
    );
};
export default SplashPage;