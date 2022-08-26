import React from 'react';
import pic from "/53.jpg";
import { Button } from '@arco-design/web-react';

function App() {
  return (
    <>
      <Button type="primary">Hello Arco</Button>
      <img src={pic} alt="" />
    </>
  );
}

export default App;