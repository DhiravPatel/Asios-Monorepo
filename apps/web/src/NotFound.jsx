import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 text-center">
            <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Page not found</h2>
            <p className="mt-2 text-sm text-gray-600">
              Sorry, we couldn't find the page you're looking for.
            </p>
            <div className="mt-6">
              <Link to="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                Go back home
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>    
        </div>
      )
}

export default NotFound