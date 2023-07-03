import { ReactElement } from 'react';
import { LoadingBG, LoadingIcon } from './style';

const Loading = (): ReactElement => {
  return (
    <>
    <LoadingBG>
      <LoadingIcon/>
    </LoadingBG>
    </>
  )
}

export default Loading;