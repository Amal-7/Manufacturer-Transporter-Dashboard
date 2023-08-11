
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import Login from './components/Login.js'
import SignUp from './components/SignUp.js';
import Transporter from './components/landingPage/Transporter.js';
import TransporterPage from './Pages/TransporterPage.js';
import Manufacturer from './components/landingPage/Manufacturer.js';
import ManufacturerPage from './Pages/ManufacturerPage.js';
import TranportItem from './components/forms/TransportItem.js';
import Home from './Pages/Home.js';
import store, { persistor } from './utils/redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
import OrderDetails from './components/OrderDetails.js';
import ChatScreen from './components/chat/ChatScreen.js';
import Error from './Pages/Error.js';

const AppLayout  = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
        <div>
            <Outlet />
        </div>
        </PersistGate>
        </Provider>
        
    )
}

const appRouter = createBrowserRouter([
    {
        path : '/' , 
        element : <AppLayout /> ,
        errorElement : <Error /> ,
        children : [
            {
                path : '/' ,
                element : <Home />
            },
            {
                path : '/signup' ,
                element : <SignUp />
            },
            {
                path : '/transporter' ,
                element : <TransporterPage /> ,
                children : [
                    {
                        path : '' , 
                        element : <Transporter />
                    },
                    {
                        path : 'login',
                        element : <Login user={'transporter'} />
                    },
                    {
                        path : 'reply/:orderId' ,
                        element : <ChatScreen  user={'transporter'}/>
                    },
                    {
                        path : 'orderDetails/:orderId',
                        element : <OrderDetails user={'transporter'} />
                    }
                ]
            },
            {
                path : '/manufacturer' ,
                element : <ManufacturerPage /> ,
                children : [
                    {
                        path : '' ,
                        element : <Manufacturer />
                    }, 
                    {
                        path : 'login',
                        element : <Login user={'manufacturer'} />
                    },
                    {
                        path : 'reply/:orderId' ,
                        element : <ChatScreen user={'manufacturer'} />
                    },
                    {
                        path : 'transport' ,
                        element : <TranportItem />
                    },
                    {
                        path :'orderDetails/:orderId',
                        element : <OrderDetails user={'manufacturer'} />
                    }
                ]
            }
        ]
    }
])



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<RouterProvider router={appRouter} />)