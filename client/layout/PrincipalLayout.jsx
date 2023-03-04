import React from 'react';
import {useRouter} from 'next/router';
import DefaultLayout from './DefaultLayout';
import { ArrowLeft } from 'react-feather';

function PrincipalLayout({children, title, className, header, color, backHref}) {

  const router = useRouter();

  const style = { color };

  return (
    <DefaultLayout className="default">
        <header className={'headerContainer ' + className}>
            <div className='infoContainer'>
                <ArrowLeft color={color} width={32} height={32} onClick={()=> {
                  backHref ? router.push(backHref) : router.back()
                }}/>
                <h1 style={style}>{title}</h1>
            </div>
            {header}
        </header>
        <div style={{
          width: "100%",
          padding: "12px 12px", 
          boxSizing: "border-box",
        }}>
          {children}
        </div>
    </DefaultLayout>
  )
}

export default PrincipalLayout