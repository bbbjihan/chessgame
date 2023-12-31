import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalFonts } from './styles/fonts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <GlobalStyle />
    <GlobalFonts />
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);