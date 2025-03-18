import '../../../src/app/globals.css'
import  {MoralisProvider} from 'react-moralis'
import React from 'react'

const app = ({Component,pagesProps}) => {
  return (
    <MoralisProvider>
        serveurl={process.env.NEXT_PUBLIC_MORALIS_SERVER}
        appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
          <Component {...pagesProps}/>
    </MoralisProvider>
  )  
}

export default app
