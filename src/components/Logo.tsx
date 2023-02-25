import React from 'react'

const Logo = () => {
  return (
    <div className="flex items-center justify-center py-24 ">
      <div
        className="spinner-border items-center animate-spin                     
        transition duration-1000
        block w-8 h-8 rounded-full m-12"
        role="status"
      >
        <img
          src="https://ojkprgyzivdeqwjymnvn.supabase.co/storage/v1/object/sign/admin/Components/logo.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhZG1pbi9Db21wb25lbnRzL2xvZ28uc3ZnIiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcwNTA2ODIwLCJleHAiOjE5ODU4NjY4MjB9.eK6Q4dwfLv-BVCrdpt4uaMDz5XG--wXbck0thnEGSDg"
          width="40"
        />
      </div>
    </div>
  )
}

export default Logo
