import React from 'react'
import { ToastContainer } from 'react-toastify'

const Toaster = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            theme="light"
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            icon={true}
            style={{ width: 'fit-content' }}
        />
    )
}

export default Toaster
