import { FC } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import ChatWindow from './components/elements/chat-window';
import LoginModal from './components/elements/login-modal';
import NewChatModal from './components/elements/new-chat-modal';
import { useTypedSelector } from './hooks/use-typed-selector';
import './styles/app.scss';

const App: FC = () => {
  const { isAuth, isNewChat } = useTypedSelector(state => state.userReducer);

  return (
    <div className="app">
      <ChatWindow />
      {isAuth
        ? (isNewChat && <NewChatModal />)
        : <LoginModal />
      }
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="colored"
        transition={Flip}
      />
    </div>
  );
};

export default App;

